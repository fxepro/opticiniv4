import logging

from django.db import DatabaseError
from django.db.models import Q, Count
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from compliance.models import (
    ComplianceFramework,
    ControlRequirementMapping,
    ControlHealth,
    OrganizationFramework,
    Requirement,
    RequirementPointOfFocus,
)
from compliance.serializers import ComplianceFrameworkSerializer
from users.permission_classes import HasFeaturePermission


def _get_org_id(request):
    """Current user's organization_id from profile, or None."""
    if not getattr(request, "user", None) or not request.user.is_authenticated:
        return None
    try:
        profile = request.user.profile
    except Exception:
        profile = None
    return getattr(profile, "organization_id", None) if profile else None


def _control_counts_by_framework():
    """Distinct control count per framework via control_requirement_mappings -> requirement -> framework_version -> framework."""
    try:
        qs = (
            ControlRequirementMapping.objects.values("requirement__framework_version__framework_id")
            .annotate(count=Count("control_id", distinct=True))
        )
        return {str(r["requirement__framework_version__framework_id"]): r["count"] for r in qs if r.get("requirement__framework_version__framework_id")}
    except Exception:
        return {}


@api_view(["GET"])
@permission_classes([IsAuthenticated, HasFeaturePermission("compliance.frameworks.view")])
def list_frameworks(request):
    """List frameworks. Only return frameworks enabled for the current org (Account > Frameworks). No org or none enabled => empty list."""
    logger = logging.getLogger(__name__)
    try:
        queryset = ComplianceFramework.objects.all()
        org_id = _get_org_id(request)
        if org_id is not None:
            enabled_framework_ids = set(
                OrganizationFramework.objects.filter(organization_id=org_id, enabled=True)
                .values_list("framework_id", flat=True)
            )
        else:
            enabled_framework_ids = set()
        queryset = queryset.filter(id__in=enabled_framework_ids)
        search = request.GET.get("search", "").strip()
        if search:
            queryset = queryset.filter(Q(name__icontains=search) | Q(code__icontains=search) | Q(description__icontains=search))
        category = request.GET.get("category", "").strip()
        if category and category != "all":
            queryset = queryset.filter(category=category)
        status_filter = request.GET.get("status", "").strip()
        if status_filter and status_filter != "all":
            queryset = queryset.filter(status=status_filter)
        enabled_filter = request.GET.get("enabled", "").strip()
        if enabled_filter and enabled_filter != "all":
            queryset = queryset.filter(enabled=(enabled_filter.lower() in ("true", "enabled")))
        queryset = queryset.order_by("name")
        serializer = ComplianceFrameworkSerializer(queryset, many=True)
        data = list(serializer.data)
        counts = _control_counts_by_framework()
        for item in data:
            item["total_controls"] = counts.get(str(item["id"]), 0)
        return Response(data, status=status.HTTP_200_OK)
    except Exception as e:
        logger.exception("list_frameworks failed: %s", e)
        return Response([], status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([IsAuthenticated, HasFeaturePermission("compliance.frameworks.view")])
def get_framework(request, framework_id):
    try:
        framework = ComplianceFramework.objects.get(id=framework_id)
        serializer = ComplianceFrameworkSerializer(framework)
        data = serializer.data
        counts = _control_counts_by_framework()
        data["total_controls"] = counts.get(str(framework_id), 0)
        return Response(data, status=status.HTTP_200_OK)
    except ComplianceFramework.DoesNotExist:
        return Response({"error": "Framework not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(["POST"])
@permission_classes([IsAuthenticated, HasFeaturePermission("compliance.frameworks.edit")])
def create_framework(request):
    serializer = ComplianceFrameworkSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(created_by=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT", "PATCH"])
@permission_classes([IsAuthenticated, HasFeaturePermission("compliance.frameworks.edit")])
def update_framework(request, framework_id):
    try:
        framework = ComplianceFramework.objects.get(id=framework_id)
        serializer = ComplianceFrameworkSerializer(framework, data=request.data, partial=(request.method == "PATCH"))
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except ComplianceFramework.DoesNotExist:
        return Response({"error": "Framework not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(["GET"])
@permission_classes([IsAuthenticated, HasFeaturePermission("compliance.frameworks.view")])
def framework_detail(request, framework_id):
    """Framework detail for accordion: metrics + requirements with full text, paraphrase, pof, mapped controls, etc."""
    try:
        framework = ComplianceFramework.objects.get(id=framework_id)
    except ComplianceFramework.DoesNotExist:
        return Response({"error": "Framework not found"}, status=status.HTTP_404_NOT_FOUND)
    requirements_qs = Requirement.objects.filter(framework_version__framework_id=framework_id).order_by("sort_order", "code")
    total_requirements = requirements_qs.count()
    requirement_ids_with_mapping = set(
        ControlRequirementMapping.objects.filter(requirement__framework_version__framework_id=framework_id)
        .values_list("requirement_id", flat=True)
        .distinct()
    )
    requirements_covered_count = len(requirement_ids_with_mapping)
    requirements_covered_pct = round(100 * requirements_covered_count / total_requirements, 1) if total_requirements else 0
    primary_per_req = (
        ControlRequirementMapping.objects.filter(
            requirement__framework_version__framework_id=framework_id,
            primary_control_flag=True,
        )
        .values_list("requirement_id", flat=True)
        .distinct()
    )
    primary_control_coverage_count = len(set(primary_per_req))
    primary_control_coverage_pct = round(100 * primary_control_coverage_count / total_requirements, 1) if total_requirements else 0
    # Control health for requirement header (primary control status)
    control_ids = list(
        ControlRequirementMapping.objects.filter(requirement__framework_version__framework_id=framework_id)
        .values_list("control_id", flat=True)
        .distinct()
    )
    health_qs = ControlHealth.objects.filter(control_id__in=control_ids).values_list("control_id", "current_status")
    health_by_control_id = {str(cid): status for cid, status in health_qs}

    def _health_display(status):
        if status == "healthy":
            return "🟢 Healthy"
        if status == "warn":
            return "🟡 Warn"
        if status == "breach":
            return "🔴 Failing"
        return "⚪ Not evaluated"

    requirements_list = []
    for req in requirements_qs.prefetch_related("points_of_focus", "control_mappings__control"):
        pof = [
            {"id": str(p.id), "pof_code": p.pof_code, "pof_text": p.pof_text, "sort_order": p.sort_order}
            for p in req.points_of_focus.all()
        ]
        mapped = []
        primary_mapping = None
        for m in req.control_mappings.all():
            if m.primary_control_flag:
                primary_mapping = m
            mapped.append({
                "control_id": m.control.control_id,
                "control_name": m.control.name,
                "coverage": m.coverage or "",
                "primary_control_flag": m.primary_control_flag,
            })
        if primary_mapping is None and mapped:
            primary_mapping = req.control_mappings.first()
        coverage_display = (primary_mapping.coverage if primary_mapping else "") or (mapped[0]["coverage"] if mapped else "")
        if coverage_display:
            coverage_display = coverage_display.upper()
        primary_control_id = primary_mapping.control.control_id if primary_mapping else ""
        primary_control_name = primary_mapping.control.name if primary_mapping else ""
        primary_control_uuid = str(primary_mapping.control.id) if primary_mapping else None
        requirement_health = health_by_control_id.get(primary_control_uuid, "unknown") if primary_control_uuid else "unknown"
        requirements_list.append({
            "id": str(req.id),
            "code": req.code,
            "title": req.title or "",
            "statement": req.statement or "",
            "statement_paraphrase": req.statement_paraphrase or "",
            "requirement_level": req.requirement_level or "",
            "points_of_focus": pof,
            "mapped_controls": mapped,
            "coverage_display": coverage_display or "—",
            "primary_control_id": primary_control_id,
            "primary_control_name": primary_control_name,
            "controls_mapped_count": len(mapped),
            "requirement_health": requirement_health,
            "requirement_health_display": _health_display(requirement_health),
            # TODO: derive from control evidence + control_health for mapped controls
            "evidence_completeness": "—",
            "monitoring_status": "—",
        })
    counts = _control_counts_by_framework()
    data = {
        "id": str(framework.id),
        "name": framework.name,
        "code": framework.code,
        "total_requirements": total_requirements,
        "requirements_covered_count": requirements_covered_count,
        "requirements_covered_pct": requirements_covered_pct,
        "controls_mapped": counts.get(str(framework_id), 0),
        "primary_control_coverage_count": primary_control_coverage_count,
        "primary_control_coverage_pct": primary_control_coverage_pct,
        # Framework model has failing_controls not failing_requirements; use it for "failing" count
        "failing_requirements": getattr(framework, "failing_requirements", framework.failing_controls),
        "not_evaluated_requirements": max(0, total_requirements - requirements_covered_count),
        "requirements": requirements_list,
    }
    return Response(data, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([IsAuthenticated, HasFeaturePermission("compliance.frameworks.view")])
def framework_stats(request):
    logger = logging.getLogger(__name__)
    try:
        org_id = _get_org_id(request)
        if org_id is not None:
            framework_ids = set(
                OrganizationFramework.objects.filter(organization_id=org_id, enabled=True).values_list("framework_id", flat=True)
            )
        else:
            framework_ids = set()
        queryset = ComplianceFramework.objects.filter(id__in=framework_ids)
        total = queryset.count()
        enabled = total
        ready = queryset.filter(status="ready").count()
        with_score = queryset.filter(compliance_score__gt=0)
        avg_compliance = round(sum(f.compliance_score for f in with_score) / with_score.count()) if with_score.exists() else 0
        return Response({"total": total, "enabled": enabled, "ready": ready, "avgCompliance": avg_compliance}, status=status.HTTP_200_OK)
    except Exception as e:
        logger.exception("framework_stats failed: %s", e)
        return Response({"total": 0, "enabled": 0, "ready": 0, "avgCompliance": 0}, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([IsAuthenticated, HasFeaturePermission("compliance.frameworks.view")])
def frameworks_catalog(request):
    """List all frameworks with enabled_for_org for current user's organization (Account > Frameworks)."""
    logger = logging.getLogger(__name__)
    try:
        queryset = ComplianceFramework.objects.all().order_by("name")
        serializer = ComplianceFrameworkSerializer(queryset, many=True)
        data = list(serializer.data)
    except Exception as e:
        logger.exception("frameworks_catalog: serialize frameworks failed: %s", e)
        return Response({"error": "Failed to load frameworks.", "detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    try:
        counts = _control_counts_by_framework()
    except Exception:
        counts = {}
    org_id = _get_org_id(request)
    enabled_for_org = set()
    if org_id is not None:
        try:
            enabled_for_org = set(
                OrganizationFramework.objects.filter(organization_id=org_id, enabled=True).values_list("framework_id", flat=True)
            )
        except Exception as e:
            logger.warning("frameworks_catalog: load org enabled failed: %s", e)
    for item in data:
        item["total_controls"] = counts.get(str(item["id"]), 0)
        item["enabled_for_org"] = str(item["id"]) in {str(eid) for eid in enabled_for_org}
    return Response(data, status=status.HTTP_200_OK)


@api_view(["PATCH"])
@permission_classes([IsAuthenticated, HasFeaturePermission("compliance.frameworks.edit")])
def set_framework_org_enabled(request, framework_id):
    """Enable or disable a framework for the current organization (Account > Frameworks)."""
    logger = logging.getLogger(__name__)
    org_id = _get_org_id(request)
    if org_id is None:
        return Response(
            {"error": "No organization set for this account. Set organization in your profile or account settings."},
            status=status.HTTP_400_BAD_REQUEST,
        )
    try:
        framework = ComplianceFramework.objects.get(id=framework_id)
    except ComplianceFramework.DoesNotExist:
        return Response({"error": "Framework not found"}, status=status.HTTP_404_NOT_FOUND)
    enabled = request.data.get("enabled", True)
    try:
        obj, _ = OrganizationFramework.objects.update_or_create(
            organization_id=org_id,
            framework=framework,
            defaults={"enabled": bool(enabled)},
        )
        return Response({"id": str(obj.id), "framework_id": str(framework_id), "enabled": obj.enabled}, status=status.HTTP_200_OK)
    except DatabaseError as e:
        logger.exception("set_framework_org_enabled: %s", e)
        return Response(
            {"error": "organization_frameworks table missing or schema issue. Run: python manage.py migrate compliance --database=compliance"},
            status=status.HTTP_503_SERVICE_UNAVAILABLE,
        )
