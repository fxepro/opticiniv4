from django.utils import timezone
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Q

from compliance.models import ComplianceAudit, ComplianceAuditFrameworkMapping, AuditStatusHistory
from compliance.serializers import ComplianceAuditSerializer, ComplianceAuditListSerializer
from users.permission_classes import HasFeaturePermission


def _get_org_id(request):
    profile = getattr(request.user, "profile", None)
    return getattr(profile, "organization_id", None) if profile else None


class ComplianceAuditViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, HasFeaturePermission("compliance.frameworks.view")]

    def get_serializer_class(self):
        return ComplianceAuditListSerializer if self.action == "list" else ComplianceAuditSerializer

    def get_queryset(self):
        qs = ComplianceAudit.objects.all().prefetch_related(
            "framework_mappings", "findings", "auditors", "status_history"
        ).order_by("-start_date")

        org_id = _get_org_id(self.request)
        if org_id:
            qs = qs.filter(organization_id=org_id)

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
        """Auto-set organization_id, created_by, and record initial status history."""
        import uuid as uuid_module
        org_id = _get_org_id(self.request)
        audit = serializer.save(
            organization_id=org_id,
            created_by=self.request.user,
            status=ComplianceAudit.STATUS_PLANNED,
        )
        AuditStatusHistory.objects.create(
            audit=audit,
            from_status="",
            to_status=ComplianceAudit.STATUS_PLANNED,
            changed_by=self.request.user,
            notes="Audit created",
        )

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)

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
            if not audit.summary.strip() or not audit.conclusion.strip():
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
            changed_by=request.user,
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
