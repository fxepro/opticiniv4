"""
Compliance Monitoring API: control assertions, metric snapshots, control health, threshold breaches.
"""
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.db.models import Count, Q
from django.utils import timezone
from datetime import timedelta

from compliance.models import (
    AssertionTemplate,
    ComplianceControl,
    ComplianceControlFrameworkMapping,
    ControlAssertion,
    MetricSnapshot,
    ControlHealth,
    ComplianceFramework,
    Requirement,
    ControlRequirementMapping,
)
from users.permission_classes import HasFeaturePermission


@api_view(["GET"])
@permission_classes([IsAuthenticated, HasFeaturePermission("compliance.monitoring.view")])
def monitoring_dashboard(request):
    """
    Dashboard summary: assertions count, snapshots summary, control health, threshold breaches.
    """
    assertions_count = ControlAssertion.objects.filter(is_enabled=True).count()
    snapshots_recent = MetricSnapshot.objects.filter(
        measured_at__gte=timezone.now() - timedelta(days=7)
    ).count()
    snapshots_pass = MetricSnapshot.objects.filter(
        measured_at__gte=timezone.now() - timedelta(days=7),
        status="pass",
    ).count()
    snapshots_fail = MetricSnapshot.objects.filter(
        measured_at__gte=timezone.now() - timedelta(days=7),
        status="fail",
    ).count()

    health_stats = ControlHealth.objects.values("current_status").annotate(count=Count("control_id"))
    health_by_status = {h["current_status"]: h["count"] for h in health_stats}
    healthy_count = health_by_status.get("healthy", 0)
    warn_count = health_by_status.get("warn", 0)
    breach_count = health_by_status.get("breach", 0)
    unknown_count = health_by_status.get("unknown", 0)

    breaches = MetricSnapshot.objects.filter(status="fail").select_related(
        "assertion__control"
    ).order_by("-measured_at")[:20]
    breach_list = [
        {
            "id": str(b.id),
            "assertion_id": str(b.assertion_id),
            "assertion_name": b.assertion.assertion_name if b.assertion else None,
            "control_id": str(b.assertion.control_id) if b.assertion else None,
            "control_name": b.assertion.control.name if b.assertion else None,
            "measured_value": float(b.measured_value) if b.measured_value else None,
            "measured_at": b.measured_at.isoformat() if b.measured_at else None,
            "deviation": float(b.deviation) if b.deviation else None,
            "source_system": b.source_system or "",
        }
        for b in breaches
    ]

    return Response({
        "assertions_count": assertions_count,
        "snapshots_recent": snapshots_recent,
        "snapshots_pass": snapshots_pass,
        "snapshots_fail": snapshots_fail,
        "control_health": {
            "healthy": healthy_count,
            "warn": warn_count,
            "breach": breach_count,
            "unknown": unknown_count,
            "total": healthy_count + warn_count + breach_count + unknown_count,
        },
        "breaches_recent": breach_list,
    })


@api_view(["GET"])
@permission_classes([IsAuthenticated, HasFeaturePermission("compliance.monitoring.view")])
def monitoring_assertions(request):
    """List control assertions with control info, last_value, and status from latest snapshot."""
    assertions = (
        ControlAssertion.objects.filter(is_enabled=True)
        .select_related("control")
        .order_by("control__control_id", "metric_key")
    )
    control_id = request.query_params.get("control_id")
    if control_id:
        assertions = assertions.filter(control_id=control_id)

    data = []
    for a in assertions:
        latest = MetricSnapshot.objects.filter(assertion_id=a.id).order_by("-measured_at").first()
        data.append({
            "id": str(a.id),
            "assertion_name": a.assertion_name,
            "metric_key": a.metric_key,
            "operator": a.operator,
            "threshold_value": float(a.threshold_value) if a.threshold_value else None,
            "evaluation_frequency": a.evaluation_frequency,
            "severity": a.severity or "medium",
            "control_id": str(a.control_id),
            "control_name": a.control.name if a.control else None,
            "control_code": a.control.control_id if a.control else None,
            "last_value": float(latest.measured_value) if latest and latest.measured_value else None,
            "last_status": latest.status if latest else None,
            "last_measured_at": latest.measured_at.isoformat() if latest and latest.measured_at else None,
        })
    return Response(data)


@api_view(["GET"])
@permission_classes([IsAuthenticated, HasFeaturePermission("compliance.monitoring.view")])
def assertions_list(request):
    """
    Assertions sub-module: list ALL assertions (enabled + disabled) for browse/configure.
    Feeds into Monitoring.
    Query params: control_id, control_code (search), framework_id, policy_id, connector (source_system),
                  status (pass/fail/no_data), enabled, assertion_type (config/iam/vuln/attestation).
    """
    assertions = (
        ControlAssertion.objects.all()
        .select_related("control")
        .order_by("control__control_id", "metric_key")
    )
    control_id = request.query_params.get("control_id")
    if control_id:
        assertions = assertions.filter(control_id=control_id)
    control_code = request.query_params.get("control_code", "").strip()
    if control_code:
        assertions = assertions.filter(control__control_id__icontains=control_code)
    framework_id = request.query_params.get("framework_id")
    if framework_id:
        control_ids = ComplianceControlFrameworkMapping.objects.filter(
            framework_id=framework_id
        ).values_list("control_id", flat=True)
        assertions = assertions.filter(control_id__in=control_ids)
    policy_id = request.query_params.get("policy_id")
    if policy_id:
        from compliance.models import CompliancePolicy
        try:
            policy = CompliancePolicy.objects.get(id=policy_id)
            if policy.control_ids:
                assertions = assertions.filter(control_id__in=policy.control_ids)
        except CompliancePolicy.DoesNotExist:
            pass
    enabled_param = request.query_params.get("enabled")
    if enabled_param is not None:
        if str(enabled_param).lower() in ("true", "1", "yes"):
            assertions = assertions.filter(is_enabled=True)
        elif str(enabled_param).lower() in ("false", "0", "no"):
            assertions = assertions.filter(is_enabled=False)
    assertion_type = request.query_params.get("assertion_type", "").strip().lower()
    if assertion_type:
        try:
            assertions = assertions.filter(assertion_type__iexact=assertion_type)
        except Exception:
            pass  # assertion_type column may not exist if migration not run

    data = []
    connector_filter = request.query_params.get("connector", "").strip()
    status_filter = request.query_params.get("status", "").strip().lower()

    for a in assertions:
        latest = MetricSnapshot.objects.filter(assertion_id=a.id).order_by("-measured_at").first()
        source_system = latest.source_system if latest else ""
        last_status = latest.status if latest else None

        # Connector filter: match source_system from latest snapshot
        if connector_filter and source_system.lower() != connector_filter.lower():
            continue
        # Status filter: pass / fail / no_data (no_data = no snapshot or na/error)
        if status_filter:
            if status_filter == "pass" and last_status != "pass":
                continue
            if status_filter == "fail" and last_status != "fail":
                continue
            if status_filter == "no_data" and last_status and last_status not in ("na", "error"):
                continue  # has data (pass/fail), exclude

        from compliance.models import CompliancePolicy
        policy_linked = None
        try:
            p = CompliancePolicy.objects.filter(control_ids__contains=[a.control_id]).values("policy_id", "name").first()
            if p:
                policy_linked = p.get("policy_id")
        except Exception:
            pass

        atype = "config"
        try:
            atype = (getattr(a, "assertion_type", None) or "config").lower()
        except Exception:
            pass

        data.append({
            "id": str(a.id),
            "assertion_name": a.assertion_name,
            "metric_key": a.metric_key,
            "operator": a.operator,
            "threshold_value": float(a.threshold_value) if a.threshold_value else None,
            "evaluation_frequency": a.evaluation_frequency,
            "severity": a.severity or "medium",
            "assertion_type": atype,
            "is_enabled": a.is_enabled,
            "control_id": str(a.control_id),
            "control_name": a.control.name if a.control else None,
            "control_code": a.control.control_id if a.control else None,
            "policy": policy_linked,
            "last_value": float(latest.measured_value) if latest and latest.measured_value else None,
            "last_status": last_status,
            "last_measured_at": latest.measured_at.isoformat() if latest and latest.measured_at else None,
            "connector": source_system or None,
        })
    return Response(data)


@api_view(["GET"])
@permission_classes([IsAuthenticated, HasFeaturePermission("compliance.monitoring.view")])
def assertion_detail(request, assertion_id):
    """Get single assertion with policy, latest snapshot, and summary stats."""
    try:
        a = ControlAssertion.objects.select_related("control", "assertion_template").get(id=assertion_id)
    except ControlAssertion.DoesNotExist:
        return Response({"error": "Assertion not found"}, status=status.HTTP_404_NOT_FOUND)

    latest = MetricSnapshot.objects.filter(assertion_id=a.id).order_by("-measured_at").first()
    from compliance.models import CompliancePolicy
    policy_linked = None
    policy_name = None
    try:
        p = CompliancePolicy.objects.filter(control_ids__contains=[a.control_id]).values("policy_id", "name").first()
        if p:
            policy_linked = p.get("policy_id")
            policy_name = p.get("name")
    except Exception:
        pass

    # Pass rate last 30/90 days
    since_30 = timezone.now() - timedelta(days=30)
    since_90 = timezone.now() - timedelta(days=90)
    snapshots_30 = MetricSnapshot.objects.filter(assertion_id=a.id, measured_at__gte=since_30)
    snapshots_90 = MetricSnapshot.objects.filter(assertion_id=a.id, measured_at__gte=since_90)
    pass_30 = snapshots_30.filter(status="pass").count()
    pass_90 = snapshots_90.filter(status="pass").count()
    total_30 = snapshots_30.count()
    total_90 = snapshots_90.count()

    # Template UI defaults for accordion (when no live data)
    template_ui_defaults = None
    if a.assertion_template_id:
        t = a.assertion_template
        template_ui_defaults = {
            "overview_rendered_sentence_example": t.overview_rendered_sentence_example or "",
            "overview_policy_code": t.overview_policy_code or "",
            "overview_status_default": t.overview_status_default or "",
            "overview_last_run_default": t.overview_last_run_default or "",
            "overview_last_value_default": t.overview_last_value_default or "",
            "config_scope_display": t.config_scope_display or "",
            "config_threshold_display": t.config_threshold_display or "",
            "config_frequency_display": t.config_frequency_display or "",
            "config_connector_display": t.config_connector_display or "",
            "history_30d_pass_rate_default": t.history_30d_pass_rate_default or "",
            "history_90d_pass_rate_default": t.history_90d_pass_rate_default or "",
            "evidence_auto_generated_type": t.evidence_auto_generated_type or "",
            "evidence_auto_generated_status_default": t.evidence_auto_generated_status_default or "",
            "evidence_90_day_report_type": t.evidence_90_day_report_type or "",
            "evidence_90_day_report_status_default": t.evidence_90_day_report_status_default or "",
        }

    return Response({
        "id": str(a.id),
        "assertion_name": a.assertion_name,
        "metric_key": a.metric_key,
        "operator": a.operator,
        "threshold_value": float(a.threshold_value) if a.threshold_value else None,
        "evaluation_frequency": a.evaluation_frequency,
        "severity": a.severity or "medium",
        "assertion_type": (getattr(a, "assertion_type", None) or "config").lower(),
        "is_enabled": a.is_enabled,
        "control_id": str(a.control_id),
        "control_name": a.control.name if a.control else None,
        "control_code": a.control.control_id if a.control else None,
        "policy": policy_linked,
        "policy_name": policy_name,
        "last_value": float(latest.measured_value) if latest and latest.measured_value else None,
        "last_status": latest.status if latest else None,
        "last_measured_at": latest.measured_at.isoformat() if latest and latest.measured_at else None,
        "connector": latest.source_system if latest else None,
        "pass_rate_30": round((pass_30 / total_30) * 100) if total_30 else None,
        "pass_rate_90": round((pass_90 / total_90) * 100) if total_90 else None,
        "total_snapshots_30": total_30,
        "total_snapshots_90": total_90,
        "template_ui_defaults": template_ui_defaults,
    })


@api_view(["GET"])
@permission_classes([IsAuthenticated, HasFeaturePermission("compliance.monitoring.view")])
def assertion_templates_list(request):
    """
    List assertion templates (Layer A library). Generic, not org-scoped — same templates for all users.
    Used to browse and create assertions from templates.
    Query params: framework_code, connector, assertion_type.
    """
    templates = AssertionTemplate.objects.select_related("control").order_by(
        "framework_code_id", "assertion_template_code_id"
    )
    framework_code = request.query_params.get("framework_code", "").strip()
    if framework_code:
        templates = templates.filter(framework_code_id__iexact=framework_code)
    connector = request.query_params.get("connector", "").strip()
    if connector:
        templates = templates.filter(requires_connectors__contains=[connector])
    assertion_type = request.query_params.get("assertion_type", "").strip()
    if assertion_type:
        templates = templates.filter(assertion_type__iexact=assertion_type)

    data = []
    for t in templates:
        data.append({
            "id": str(t.id),
            "assertion_template_code_id": t.assertion_template_code_id,
            "name": t.name,
            "description_human": t.description_human or "",
            "rendered_sentence_template": t.rendered_sentence_template or "",
            "control_id": str(t.control_id) if t.control_id else None,
            "control_code": t.control.control_id if t.control else None,
            "control_name": t.control.name if t.control else None,
            "assertion_type": t.assertion_type or "config",
            "resource_type": t.resource_type or "",
            "metric_key": t.metric_key,
            "default_threshold_operator": t.default_threshold_operator or ">=",
            "default_threshold_value": float(t.default_threshold_value) if t.default_threshold_value is not None else None,
            "default_eval_frequency": t.default_eval_frequency or "daily",
            "requires_connectors": list(t.requires_connectors) if t.requires_connectors else [],
            "framework_code_id": t.framework_code_id or "",
            "severity_default": t.severity_default or "medium",
            "scope_default_json": t.scope_default_json or {},
            "evidence_artifact_type": t.evidence_artifact_type or "",
            "notes": t.notes or "",
            "overview_rendered_sentence_example": t.overview_rendered_sentence_example or "",
            "overview_policy_code": t.overview_policy_code or "",
            "overview_status_default": t.overview_status_default or "",
            "overview_last_run_default": t.overview_last_run_default or "",
            "overview_last_value_default": t.overview_last_value_default or "",
            "config_scope_display": t.config_scope_display or "",
            "config_threshold_display": t.config_threshold_display or "",
            "config_frequency_display": t.config_frequency_display or "",
            "config_connector_display": t.config_connector_display or "",
            "history_30d_pass_rate_default": t.history_30d_pass_rate_default or "",
            "history_90d_pass_rate_default": t.history_90d_pass_rate_default or "",
            "evidence_auto_generated_type": t.evidence_auto_generated_type or "",
            "evidence_auto_generated_status_default": t.evidence_auto_generated_status_default or "",
            "evidence_90_day_report_type": t.evidence_90_day_report_type or "",
            "evidence_90_day_report_status_default": t.evidence_90_day_report_status_default or "",
        })
    return Response(data)


@api_view(["GET"])
@permission_classes([IsAuthenticated, HasFeaturePermission("compliance.monitoring.view")])
def assertions_filter_options(request):
    """Return filter options for Assertions page: frameworks, connectors (source_system), policies."""
    frameworks = list(
        ComplianceFramework.objects.filter(enabled=True)
        .order_by("name")
        .values("id", "name", "code")
    )
    connectors = list(
        MetricSnapshot.objects.exclude(source_system="")
        .values_list("source_system", flat=True)
        .distinct()
        .order_by("source_system")
    )
    from compliance.models import CompliancePolicy
    policies = list(
        CompliancePolicy.objects.all().order_by("policy_id").values("id", "policy_id", "name")[:100]
    )
    return Response({
        "frameworks": [{"id": str(f["id"]), "name": f["name"], "code": f.get("code", "")} for f in frameworks],
        "connectors": list(connectors),
        "policies": [{"id": str(p["id"]), "policy_id": p["policy_id"], "name": p.get("name", "")} for p in policies],
    })


@api_view(["POST"])
@permission_classes([IsAuthenticated, HasFeaturePermission("compliance.edit")])
def assertion_create(request):
    """Create a new control assertion. Control → Assertion → Metric → Threshold."""
    control_id = request.data.get("control_id")
    assertion_name = request.data.get("assertion_name")
    metric_key = request.data.get("metric_key")
    operator = request.data.get("operator")
    threshold_value = request.data.get("threshold_value")
    evaluation_frequency = request.data.get("evaluation_frequency", "daily")

    if not control_id:
        return Response({"error": "control_id is required"}, status=status.HTTP_400_BAD_REQUEST)
    if not assertion_name:
        return Response({"error": "assertion_name is required"}, status=status.HTTP_400_BAD_REQUEST)
    if not metric_key:
        return Response({"error": "metric_key is required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        control = ComplianceControl.objects.get(id=control_id)
    except ComplianceControl.DoesNotExist:
        return Response({"error": "Control not found"}, status=status.HTTP_404_NOT_FOUND)

    operator = operator or ">="
    metric_key = (metric_key or "").strip().replace(" ", "_").upper()[:100] or "METRIC"

    from decimal import Decimal
    threshold_val = None
    if threshold_value is not None:
        try:
            threshold_val = Decimal(str(threshold_value))
        except (TypeError, ValueError):
            pass

    assertion = ControlAssertion.objects.create(
        control=control,
        assertion_name=assertion_name.strip(),
        metric_key=metric_key,
        operator=operator,
        threshold_value=threshold_val,
        evaluation_frequency=evaluation_frequency,
        severity=request.data.get("severity", "medium"),
        assertion_type=(request.data.get("assertion_type") or "config").lower(),
    )
    return Response({
        "id": str(assertion.id),
        "assertion_name": assertion.assertion_name,
        "metric_key": assertion.metric_key,
        "control_id": str(assertion.control_id),
        "control_code": control.control_id,
    }, status=status.HTTP_201_CREATED)


@api_view(["GET"])
@permission_classes([IsAuthenticated, HasFeaturePermission("compliance.monitoring.view")])
def monitoring_snapshots(request):
    """List metric snapshots (recent)."""
    days = int(request.query_params.get("days", 7))
    since = timezone.now() - timedelta(days=days)
    snapshots = (
        MetricSnapshot.objects.filter(measured_at__gte=since)
        .select_related("assertion__control")
        .order_by("-measured_at")[:100]
    )
    assertion_id = request.query_params.get("assertion_id")
    if assertion_id:
        snapshots = MetricSnapshot.objects.filter(
            assertion_id=assertion_id, measured_at__gte=since
        ).select_related("assertion__control").order_by("-measured_at")[:50]

    data = [
        {
            "id": str(s.id),
            "assertion_id": str(s.assertion_id),
            "assertion_name": s.assertion.assertion_name if s.assertion else None,
            "control_id": str(s.assertion.control_id) if s.assertion else None,
            "control_name": s.assertion.control.name if s.assertion else None,
            "measured_value": float(s.measured_value) if s.measured_value else None,
            "measured_at": s.measured_at.isoformat() if s.measured_at else None,
            "status": s.status,
            "deviation": float(s.deviation) if s.deviation else None,
            "source_system": s.source_system or "",
        }
        for s in snapshots
    ]
    return Response(data)


@api_view(["GET"])
@permission_classes([IsAuthenticated, HasFeaturePermission("compliance.monitoring.view")])
def monitoring_control_health(request):
    """List control health status. Includes assertions count. Derives from assertion results when no ControlHealth record."""
    health_records = (
        ControlHealth.objects.select_related("control")
        .order_by("current_status", "control__control_id")
    )
    status_filter = request.query_params.get("status")
    if status_filter:
        health_records = health_records.filter(current_status=status_filter)

    data = []
    for h in health_records:
        assertions_count = ControlAssertion.objects.filter(control_id=h.control_id, is_enabled=True).count()
        latest_snap = (
            MetricSnapshot.objects.filter(assertion__control_id=h.control_id)
            .order_by("-measured_at")
            .first()
        )
        data.append({
            "control_id": str(h.control_id),
            "control_name": h.control.name if h.control else None,
            "control_code": h.control.control_id if h.control else None,
            "current_status": h.current_status,
            "health_score": float(h.health_score) if h.health_score else None,
            "last_evaluated_at": h.last_evaluated_at.isoformat() if h.last_evaluated_at else None,
            "breach_since": h.breach_since.isoformat() if h.breach_since else None,
            "assertions_count": assertions_count,
            "last_snapshot_at": latest_snap.measured_at.isoformat() if latest_snap and latest_snap.measured_at else None,
        })

    # Include controls with assertions but no ControlHealth record (derive status from snapshots)
    controls_with_assertions = set(
        ControlAssertion.objects.filter(is_enabled=True).values_list("control_id", flat=True)
    )
    health_control_ids = {h.control_id for h in health_records}
    missing = controls_with_assertions - health_control_ids
    for cid in missing:
        try:
            control = ComplianceControl.objects.get(id=cid)
        except ComplianceControl.DoesNotExist:
            continue
        snapshots = MetricSnapshot.objects.filter(assertion__control_id=cid).order_by("-measured_at")
        latest = snapshots.first()
        if latest:
            derived_status = "breach" if latest.status == "fail" else ("warn" if latest.status == "error" else "healthy")
        else:
            derived_status = "unknown"
        assertions_count = ControlAssertion.objects.filter(control_id=cid, is_enabled=True).count()
        data.append({
            "control_id": str(cid),
            "control_name": control.name,
            "control_code": control.control_id,
            "current_status": derived_status,
            "health_score": None,
            "last_evaluated_at": latest.measured_at.isoformat() if latest and latest.measured_at else None,
            "breach_since": None,
            "assertions_count": assertions_count,
            "last_snapshot_at": latest.measured_at.isoformat() if latest and latest.measured_at else None,
        })
    data.sort(key=lambda x: (x["current_status"], x["control_code"] or ""))
    return Response(data)


@api_view(["GET"])
@permission_classes([IsAuthenticated, HasFeaturePermission("compliance.monitoring.view")])
def monitoring_breaches(request):
    """List threshold breaches (failing metric snapshots)."""
    try:
        breaches = (
            MetricSnapshot.objects.filter(status="fail")
            .select_related("assertion__control")
            .order_by("-measured_at")
        )
        control_id = request.query_params.get("control_id")
        if control_id:
            breaches = breaches.filter(assertion__control_id=control_id)
        assertion_id = request.query_params.get("assertion_id")
        if assertion_id:
            breaches = breaches.filter(assertion_id=assertion_id)
        breaches = breaches[:100]

        data = [
            {
                "id": str(b.id),
                "assertion_id": str(b.assertion_id),
                "assertion_name": b.assertion.assertion_name if b.assertion else None,
                "metric_key": b.assertion.metric_key if b.assertion else None,
                "threshold_value": float(b.assertion.threshold_value) if b.assertion and b.assertion.threshold_value is not None else None,
                "operator": b.assertion.operator if b.assertion else None,
                "control_id": str(b.assertion.control_id) if b.assertion else None,
                "control_name": b.assertion.control.name if b.assertion and b.assertion.control else None,
                "measured_value": float(b.measured_value) if b.measured_value is not None else None,
                "measured_at": b.measured_at.isoformat() if b.measured_at else None,
                "deviation": float(b.deviation) if b.deviation is not None else None,
                "source_system": b.source_system or "",
            }
            for b in breaches
        ]
        return Response(data)
    except Exception as e:
        import logging
        logger = logging.getLogger(__name__)
        logger.exception("monitoring_breaches error: %s", e)
        return Response(
            {"error": str(e), "detail": "Failed to load breaches"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated, HasFeaturePermission("compliance.monitoring.view")])
def monitoring_continuous_compliance(request):
    """
    Continuous Compliance rollup by framework: Framework | Requirements Healthy | Controls Healthy.
    Requirement health = primary control health. Primary control fails → requirement fails.
    """
    health_by_control = {str(h.control_id): h.current_status for h in ControlHealth.objects.all()}

    frameworks = ComplianceFramework.objects.filter(enabled=True).order_by("name")
    rollup = []
    for fw in frameworks:
        fw_version_ids = list(fw.versions.values_list("id", flat=True))
        requirements = Requirement.objects.filter(framework_version_id__in=fw_version_ids)
        total_reqs = requirements.count()
        total_controls = 0
        healthy_reqs = 0
        healthy_controls = 0

        for req in requirements:
            primary = ControlRequirementMapping.objects.filter(
                requirement_id=req.id, primary_control_flag=True
            ).select_related("control").first()
            if not primary:
                primary = ControlRequirementMapping.objects.filter(requirement_id=req.id).select_related("control").first()
            if primary:
                total_controls += 1
                cid = str(primary.control_id)
                status = health_by_control.get(cid, "unknown")
                if status in ("healthy", "warn"):
                    healthy_controls += 1
                    healthy_reqs += 1
                elif status == "breach":
                    pass
                else:
                    healthy_reqs += 1

        rollup.append({
            "framework_id": str(fw.id),
            "framework_name": fw.name,
            "framework_code": fw.code,
            "requirements_total": total_reqs,
            "requirements_healthy": healthy_reqs,
            "controls_total": total_controls,
            "controls_healthy": healthy_controls,
        })
    return Response(rollup)


@api_view(["PATCH", "PUT"])
@permission_classes([IsAuthenticated, HasFeaturePermission("compliance.edit")])
def assertion_update(request, assertion_id):
    """Update assertion (full update for PUT, partial for PATCH)."""
    try:
        assertion = ControlAssertion.objects.select_related("control").get(id=assertion_id)
    except ControlAssertion.DoesNotExist:
        return Response({"error": "Assertion not found"}, status=status.HTTP_404_NOT_FOUND)

    from decimal import Decimal

    if request.method == "PUT" or any(k in request.data for k in ("assertion_name", "metric_key", "operator", "threshold_value", "evaluation_frequency", "severity", "is_enabled", "assertion_type")):
        if "assertion_name" in request.data:
            assertion.assertion_name = (request.data.get("assertion_name") or "").strip() or assertion.assertion_name
        if "is_enabled" in request.data:
            assertion.is_enabled = bool(request.data.get("is_enabled"))
        if "metric_key" in request.data:
            mk = (request.data.get("metric_key") or "").strip().replace(" ", "_").upper()[:100]
            if mk:
                assertion.metric_key = mk
        if "operator" in request.data:
            assertion.operator = request.data.get("operator") or assertion.operator
        if "threshold_value" in request.data:
            tv = request.data.get("threshold_value")
            assertion.threshold_value = Decimal(str(tv)) if tv is not None and tv != "" else None
        if "evaluation_frequency" in request.data:
            assertion.evaluation_frequency = request.data.get("evaluation_frequency") or assertion.evaluation_frequency
        if "severity" in request.data:
            assertion.severity = request.data.get("severity") or assertion.severity
        if "assertion_type" in request.data:
            assertion.assertion_type = (request.data.get("assertion_type") or "config").lower()
        assertion.save()

    return Response({
        "id": str(assertion.id),
        "assertion_name": assertion.assertion_name,
        "metric_key": assertion.metric_key,
        "operator": assertion.operator,
        "threshold_value": float(assertion.threshold_value) if assertion.threshold_value else None,
    })


@api_view(["PATCH"])
@permission_classes([IsAuthenticated, HasFeaturePermission("compliance.edit")])
def assertion_update_threshold(request, assertion_id):
    """Tune threshold for an assertion (if allowed)."""
    try:
        assertion = ControlAssertion.objects.get(id=assertion_id)
    except ControlAssertion.DoesNotExist:
        return Response({"error": "Assertion not found"}, status=status.HTTP_404_NOT_FOUND)

    threshold_value = request.data.get("threshold_value")
    operator = request.data.get("operator")
    if threshold_value is not None:
        assertion.threshold_value = threshold_value
    if operator:
        assertion.operator = operator
    assertion.save()
    return Response({
        "id": str(assertion.id),
        "threshold_value": float(assertion.threshold_value) if assertion.threshold_value else None,
        "operator": assertion.operator,
    })


@api_view(["PATCH"])
@permission_classes([IsAuthenticated, HasFeaturePermission("compliance.edit")])
def snapshot_override(request, snapshot_id):
    """Override snapshot result (if allowed). Sets status to pass/na."""
    try:
        snapshot = MetricSnapshot.objects.get(id=snapshot_id)
    except MetricSnapshot.DoesNotExist:
        return Response({"error": "Snapshot not found"}, status=status.HTTP_404_NOT_FOUND)

    new_status = request.data.get("status")
    if new_status not in ("pass", "na"):
        return Response(
            {"error": "Override status must be 'pass' or 'na'"},
            status=status.HTTP_400_BAD_REQUEST,
        )
    snapshot.status = new_status
    snapshot.save()
    return Response({
        "id": str(snapshot.id),
        "status": snapshot.status,
    })
