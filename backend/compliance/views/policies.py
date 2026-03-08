import uuid

from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from compliance.models import (
    CompliancePolicy,
    CompliancePolicyFrameworkMapping,
    ComplianceControl,
    ComplianceFramework,
    PolicyTemplate,
)
from compliance.serializers import CompliancePolicySerializer, CompliancePolicyListSerializer
from users.permission_classes import HasFeaturePermission


@api_view(["GET"])
@permission_classes([IsAuthenticated, HasFeaturePermission("compliance.frameworks.view")])
def policy_templates_list(request):
    """List policy templates (generic, not org-scoped). Query param: framework_code."""
    templates = PolicyTemplate.objects.all().order_by("policy_template_code_id")
    framework_code = request.query_params.get("framework_code", "").strip()
    if framework_code:
        templates = templates.filter(framework_default__iexact=framework_code)

    data = []
    for t in templates:
        data.append({
            "id": str(t.id),
            "policy_template_code_id": t.policy_template_code_id,
            "policy_code": t.policy_code,
            "name": t.name,
            "description": t.description or "",
            "framework_default": t.framework_default or "",
            "policy_status_default": t.policy_status_default or "",
            "review_frequency": t.review_frequency or "",
            "owner_role_default": t.owner_role_default or "",
            "overview_status_default": t.overview_status_default or "",
            "overview_last_reviewed_default": t.overview_last_reviewed_default or "",
            "config_scope_default": t.config_scope_default or "",
            "config_version_default": t.config_version_default or "",
            "history_90d_review_activity_default": t.history_90d_review_activity_default or "",
            "evidence_policy_document_default": t.evidence_policy_document_default or "",
            "evidence_review_record_default": t.evidence_review_record_default or "",
            "mapped_control_codes": list(t.mapped_control_codes) if t.mapped_control_codes else [],
        })
    return Response(data)


@api_view(["POST"])
@permission_classes([IsAuthenticated, HasFeaturePermission("compliance.frameworks.view")])
def policy_create_from_template(request, template_id):
    """Create CompliancePolicy from PolicyTemplate. Resolves mapped_control_codes to control UUIDs."""
    try:
        template = PolicyTemplate.objects.get(id=template_id)
    except PolicyTemplate.DoesNotExist:
        return Response({"error": "Template not found"}, status=status.HTTP_404_NOT_FOUND)

    # Resolve control codes to UUIDs
    control_ids = []
    if template.mapped_control_codes:
        controls = ComplianceControl.objects.filter(
            control_id__in=template.mapped_control_codes
        ).values_list("id", flat=True)
        control_ids = list(controls)

    # Get or create SOC2 framework for mapping
    framework = ComplianceFramework.objects.filter(code__iexact="SOC2").first()
    framework_ids = [str(framework.id)] if framework else []

    policy_id = f"POL-{uuid.uuid4().hex[:8].upper()}"

    policy = CompliancePolicy.objects.create(
        policy_code_id=template.policy_template_code_id,
        policy_id=policy_id,
        name=template.name,
        description=template.description or "",
        type="security",
        category="security",
        status=template.policy_status_default or "draft",
        approval_status="pending",
        version=template.config_version_default or "1.0",
        content="",
        summary="",
        created_by=request.user,
        updated_by=request.user,
        control_ids=control_ids,
    )

    for fw_id in framework_ids:
        try:
            fw = ComplianceFramework.objects.get(id=fw_id)
            CompliancePolicyFrameworkMapping.objects.create(
                policy=policy,
                framework_id=fw.id,
                framework_name=fw.name,
            )
        except ComplianceFramework.DoesNotExist:
            pass

    serializer = CompliancePolicySerializer(policy)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


class CompliancePolicyViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, HasFeaturePermission("compliance.frameworks.view")]

    def get_serializer_class(self):
        return CompliancePolicyListSerializer if self.action == "list" else CompliancePolicySerializer

    def get_queryset(self):
        return CompliancePolicy.objects.all().prefetch_related("framework_mappings").order_by("-updated_at")
