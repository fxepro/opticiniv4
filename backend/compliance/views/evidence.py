from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Q
from compliance.models import ComplianceEvidence, ComplianceEvidenceControlMapping, ComplianceAudit
from compliance.serializers import ComplianceEvidenceSerializer, ComplianceEvidenceListSerializer
from users.permission_classes import HasFeaturePermission


def _check_evidence_freeze(audit_id):
    """Return an error Response if the audit linked to this evidence is frozen, else None."""
    if not audit_id:
        return None
    try:
        import uuid as uuid_module
        audit = ComplianceAudit.objects.get(id=uuid_module.UUID(str(audit_id)))
        if audit.evidence_locked:
            return Response(
                {"error": "Evidence is frozen for this audit. No new evidence can be added after the freeze date."},
                status=status.HTTP_403_FORBIDDEN,
            )
    except (ComplianceAudit.DoesNotExist, ValueError):
        pass
    return None


class ComplianceEvidenceViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, HasFeaturePermission("compliance.evidence.view")]

    def get_serializer_class(self):
        return ComplianceEvidenceListSerializer if self.action == "list" else ComplianceEvidenceSerializer

    def get_queryset(self):
        qs = ComplianceEvidence.objects.all().order_by("-created_at")
        cid = self.request.query_params.get("control_id")
        if cid:
            ids = ComplianceEvidenceControlMapping.objects.filter(control_id=cid).values_list("evidence_id", flat=True)
            qs = qs.filter(id__in=ids)
        fid = self.request.query_params.get("framework_id")
        if fid:
            ids = ComplianceEvidenceControlMapping.objects.filter(framework_id=fid).values_list("evidence_id", flat=True)
            qs = qs.filter(id__in=ids)
        src = self.request.query_params.get("source")
        if src:
            qs = qs.filter(source=src)
        st = self.request.query_params.get("status")
        if st:
            qs = qs.filter(status=st)
        search = self.request.query_params.get("search")
        if search:
            qs = qs.filter(Q(evidence_id__icontains=search) | Q(name__icontains=search) | Q(description__icontains=search))
        return qs

    def create(self, request, *args, **kwargs):
        audit_id = request.data.get("audit_id")
        err = _check_evidence_freeze(audit_id)
        if err:
            return err
        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        # Check freeze on the existing record's audit_id, and on any new audit_id being set
        instance = self.get_object()
        for aid in {instance.audit_id, request.data.get("audit_id")}:
            err = _check_evidence_freeze(aid)
            if err:
                return err
        return super().update(request, *args, **kwargs)
