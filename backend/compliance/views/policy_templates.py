"""
Policy Template API: list templates, apply template to create CompliancePolicy.
"""
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from compliance.models import PolicyTemplate, CompliancePolicy, ComplianceControl, CompliancePolicyFrameworkMapping, ComplianceFramework
from users.permission_classes import HasFeaturePermission


@api_view(["GET"])
@permission_classes([IsAuthenticated, HasFeaturePermission("compliance.policies.view")])
def policy_templates_list(request):
    """
    List policy templates (generic, not org-scoped). Same templates for all users.
    Query params: framework_code
    """
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
@permission_classes([IsAuthenticated, HasFeaturePermission("compliance.policies.create")])
def policy_create_from_template(request, template_id):
    """
    Apply a policy template to create a new CompliancePolicy.
    Resolves mapped_control_codes to control UUIDs and sets control_ids.
    """
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

    # Generate unique policy_id (template.policy_code may already exist)
    base_id = template.policy_code
    policy_id = base_id
    suffix = 0
    while CompliancePolicy.objects.filter(policy_id=policy_id).exists():
        suffix += 1
        policy_id = f"{base_id}-{suffix}"

    policy_code_id = template.policy_template_code_id

    policy = CompliancePolicy.objects.create(
        policy_code_id=policy_code_id,
        policy_id=policy_id,
        name=template.name,
        description=template.description or "",
        type="governance",
        category="security",
        status=template.policy_status_default or "draft",
        approval_status="pending",
        version=template.config_version_default or "1.0",
        content=template.description or "",
        summary=template.description[:500] if template.description else "",
        control_ids=control_ids,
        created_by=request.user,
        updated_by=request.user,
        generated_from={"policy_template_id": str(template.id), "policy_template_code_id": template.policy_template_code_id},
        generation_method="template",
    )

    # Link to SOC2 framework if it exists
    try:
        fw = ComplianceFramework.objects.filter(name__icontains="SOC2").first()
        if fw:
            CompliancePolicyFrameworkMapping.objects.create(
                policy=policy,
                framework_id=fw.id,
                framework_name=fw.name,
            )
    except Exception:
        pass

    from compliance.serializers import CompliancePolicySerializer
    serializer = CompliancePolicySerializer(policy)
    return Response(serializer.data, status=status.HTTP_201_CREATED)
