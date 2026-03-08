from django.urls import path, include
from rest_framework.routers import DefaultRouter
from compliance.views.frameworks import (
    list_frameworks,
    get_framework,
    create_framework,
    update_framework,
    framework_stats,
    framework_detail,
    frameworks_catalog,
    set_framework_org_enabled,
)
from compliance.views.controls import ComplianceControlViewSet, compliance_chat
from compliance.views.evidence import ComplianceEvidenceViewSet
from compliance.views.reports import ComplianceReportViewSet
from compliance.views.tools import ComplianceToolViewSet
from compliance.views.policies import (
    CompliancePolicyViewSet,
    policy_templates_list,
    policy_create_from_template,
)
from compliance.views.audits import ComplianceAuditViewSet
from compliance.views.monitoring import (
    monitoring_dashboard,
    monitoring_assertions,
    monitoring_snapshots,
    monitoring_control_health,
    monitoring_breaches,
    monitoring_continuous_compliance,
    assertions_list,
    assertion_detail,
    assertions_filter_options,
    assertion_templates_list,
    assertion_create,
    assertion_update,
    assertion_update_threshold,
    snapshot_override,
)

router = DefaultRouter()
router.register(r"controls", ComplianceControlViewSet, basename="compliance-control")
router.register(r"evidence", ComplianceEvidenceViewSet, basename="compliance-evidence")
router.register(r"reports", ComplianceReportViewSet, basename="compliance-report")
router.register(r"policies", CompliancePolicyViewSet, basename="compliance-policy")
router.register(r"audits", ComplianceAuditViewSet, basename="compliance-audit")

tools_router = DefaultRouter()
tools_router.register(r"", ComplianceToolViewSet, basename="compliance-tool")

urlpatterns = [
    path("api/compliance/frameworks/", list_frameworks, name="list_frameworks"),
    path("api/compliance/frameworks/stats/", framework_stats, name="framework_stats"),
    path("api/compliance/frameworks/create/", create_framework, name="create_framework"),
    path("api/compliance/frameworks/<uuid:framework_id>/", get_framework, name="get_framework"),
    path("api/compliance/frameworks/<uuid:framework_id>/detail/", framework_detail, name="framework_detail"),
    path("api/compliance/frameworks/<uuid:framework_id>/update/", update_framework, name="update_framework"),
    path("api/compliance/frameworks/catalog/", frameworks_catalog, name="frameworks_catalog"),
    path("api/compliance/frameworks/<uuid:framework_id>/org-enabled/", set_framework_org_enabled, name="set_framework_org_enabled"),
    path("api/compliance/chat/", compliance_chat, name="compliance_chat"),
    path("api/compliance/assertions/", assertions_list, name="assertions_list"),
    path("api/compliance/assertions/<uuid:assertion_id>/", assertion_detail, name="assertion_detail"),
    path("api/compliance/assertions/filter-options/", assertions_filter_options, name="assertions_filter_options"),
    path("api/compliance/assertion-templates/", assertion_templates_list, name="assertion_templates_list"),
    path("api/compliance/policy-templates/", policy_templates_list, name="policy_templates_list"),
    path("api/compliance/policies/from-template/<uuid:template_id>/", policy_create_from_template, name="policy_create_from_template"),
    path("api/compliance/monitoring/dashboard/", monitoring_dashboard, name="monitoring_dashboard"),
    path("api/compliance/monitoring/assertions/", monitoring_assertions, name="monitoring_assertions"),
    path("api/compliance/monitoring/snapshots/", monitoring_snapshots, name="monitoring_snapshots"),
    path("api/compliance/monitoring/control-health/", monitoring_control_health, name="monitoring_control_health"),
    path("api/compliance/monitoring/breaches/", monitoring_breaches, name="monitoring_breaches"),
    path("api/compliance/monitoring/continuous/", monitoring_continuous_compliance, name="monitoring_continuous_compliance"),
    path("api/compliance/monitoring/assertions/create/", assertion_create, name="assertion_create"),
    path("api/compliance/monitoring/assertions/<uuid:assertion_id>/threshold/", assertion_update_threshold, name="assertion_update_threshold"),
    path("api/compliance/monitoring/assertions/<uuid:assertion_id>/", assertion_update, name="assertion_update"),
    path("api/compliance/monitoring/snapshots/<uuid:snapshot_id>/override/", snapshot_override, name="snapshot_override"),
    path("api/compliance/", include(router.urls)),
    path("api/compliance/tools/", include(tools_router.urls)),
]
