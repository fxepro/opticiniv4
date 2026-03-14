import logging
from django.utils import timezone
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Q

from compliance.models import ComplianceAudit, ComplianceAuditFrameworkMapping, AuditStatusHistory
from compliance.serializers import ComplianceAuditSerializer, ComplianceAuditListSerializer
from users.permission_classes import HasAnyFeaturePermission

logger = logging.getLogger(__name__)


def _get_org_id(request):
    profile = getattr(request.user, "profile", None)
    return getattr(profile, "organization_id", None) if profile else None


class ComplianceAuditViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, HasAnyFeaturePermission("compliance.frameworks.view", "compliance.audit_hub.view")]

    def create(self, request, *args, **kwargs):
        """Override to log 500s for debugging audit creation failures."""
        try:
            return super().create(request, *args, **kwargs)
        except Exception as e:
            logger.exception("ComplianceAuditViewSet.create failed: %s", e)
            return Response(
                {"error": str(e), "detail": "Failed to create audit. Check server logs for full traceback."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def list(self, request, *args, **kwargs):
        """Override to catch and log 500s for debugging."""
        try:
            resp = super().list(request, *args, **kwargs)
            data = resp.data
            count = len(data) if isinstance(data, list) else len(data.get("results", [])) if isinstance(data, dict) else 0
            logger.info("ComplianceAuditViewSet.list returning %s audits", count)
            return resp
        except Exception as e:
            logger.exception("ComplianceAuditViewSet.list failed: %s", e)
            return Response(
                {"error": "Failed to load audits. Check server logs for details."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def get_serializer_class(self):
        return ComplianceAuditListSerializer if self.action == "list" else ComplianceAuditSerializer

    def get_queryset(self):
        try:
            qs = ComplianceAudit.objects.all().prefetch_related(
                "framework_mappings", "findings", "auditors", "status_history",
                "control_test_plans", "control_test_plans__instances__samples", "control_test_plans__instances__exceptions",
            ).order_by("-start_date")
        except Exception as e:
            logger.warning("Audit prefetch failed, using base queryset: %s", e)
            qs = ComplianceAudit.objects.all().order_by("-start_date")

        org_id = _get_org_id(self.request)
        if org_id:
            qs = qs.filter(organization_id=org_id)
        else:
            qs = qs.none()  # No org assigned — show nothing

        status_filter = self.request.query_params.get("status")
        if status_filter:
            qs = qs.filter(status=status_filter)
        type_filter = self.request.query_params.get("type")
        if type_filter:
            qs = qs.filter(type=type_filter)
        search = self.request.query_params.get("search")
        if search:
            qs = qs.filter(
                Q(audit_id__icontains=search) |
                Q(name__icontains=search) |
                Q(description__icontains=search)
            )
        return qs

    def perform_create(self, serializer):
        """Multi-tenant: require org. Set organization_id, created_by, record status history."""
        org_id = _get_org_id(self.request)
        if not org_id:
            from rest_framework.exceptions import ValidationError
            raise ValidationError(
                "No organization assigned. Assign this user to an organization before creating audits."
            )
        user_id = self.request.user.id
        audit = serializer.save(
            organization_id=org_id,
            created_by_id=user_id,
            status=ComplianceAudit.STATUS_PLANNED,
        )
        AuditStatusHistory.objects.create(
            audit=audit,
            from_status="",
            to_status=ComplianceAudit.STATUS_PLANNED,
            changed_by_id=user_id,
            notes="Audit created",
        )

    def perform_update(self, serializer):
        serializer.save(updated_by_id=self.request.user.id)

    @action(detail=True, methods=["post"], url_path="transition")
    def transition(self, request, pk=None):
        """
        POST /api/compliance/audits/{id}/transition/
        Body: { "to_status": "in_progress", "notes": "..." }

        Allowed transitions:
          planned         → in_progress | cancelled
          in_progress     → evidence_review | cancelled
          evidence_review → findings_review
          findings_review → completed   (requires summary + conclusion)
          completed       → (none)
          cancelled       → (none)

        Side effects:
          in_progress     → sets start_date if unset
          evidence_review → sets evidence_locked=True, evidence_freeze_date=now()
          findings_review → computes findings counts
          completed       → sets completed_at=now()
        """
        audit = self.get_object()
        to_status = (request.data.get("to_status") or "").strip()
        notes = (request.data.get("notes") or "").strip()

        if not to_status:
            return Response({"error": "to_status is required."}, status=status.HTTP_400_BAD_REQUEST)

        allowed = ComplianceAudit.ALLOWED_TRANSITIONS.get(audit.status, [])
        if to_status not in allowed:
            return Response(
                {
                    "error": f"Transition from '{audit.status}' to '{to_status}' is not allowed.",
                    "allowed": allowed,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Guard: completed requires summary + conclusion
        if to_status == ComplianceAudit.STATUS_COMPLETED:
            summary = (audit.summary or "").strip()
            conclusion = (audit.conclusion or "").strip()
            if not summary or not conclusion:
                return Response(
                    {"error": "summary and conclusion must be set before completing an audit."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        from_status = audit.status
        now = timezone.now()

        # Apply side effects per target status
        if to_status == ComplianceAudit.STATUS_IN_PROGRESS and not audit.start_date:
            audit.start_date = now

        if to_status == ComplianceAudit.STATUS_EVIDENCE_REVIEW:
            audit.evidence_locked = True
            audit.evidence_freeze_date = now

        if to_status == ComplianceAudit.STATUS_FINDINGS_REVIEW:
            _recompute_findings_counts(audit)

        if to_status == ComplianceAudit.STATUS_COMPLETED:
            audit.completed_at = now

        audit.status = to_status
        audit.save()

        AuditStatusHistory.objects.create(
            audit=audit,
            from_status=from_status,
            to_status=to_status,
            changed_by_id=request.user.id,
            notes=notes,
        )

        serializer = ComplianceAuditSerializer(audit, context={"request": request})
        return Response(serializer.data)


def _recompute_findings_counts(audit):
    """Recompute finding severity counters from audit_findings."""
    findings = audit.findings.all()
    audit.findings_count = findings.count()
    audit.critical_findings = findings.filter(severity="critical").count()
    audit.high_findings = findings.filter(severity="high").count()
    audit.medium_findings = findings.filter(severity="medium").count()
    audit.low_findings = findings.filter(severity="low").count()
