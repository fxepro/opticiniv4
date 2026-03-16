"""
Permission API Views for RBAC

API endpoints for permission checking and navigation.
"""

import logging

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import Group
from .permission_utils import has_permission, get_user_permissions, get_user_permissions_for_navigation, filter_navigation_by_permissions
from .permission_classes import HasFeaturePermission
from .models import UserProfile
from .navigation_data import NAV_APPS_FROM_DOC


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_permissions(request):
    """
    Check if user has specific permissions.
    
    Query params:
        permissions: Comma-separated list of permission codes to check
    
    Returns:
        {
            "permissions": {
                "site_audit.view": true,
                "users.view": false
            }
        }
    """
    permission_codes = request.GET.get('permissions', '').split(',')
    permission_codes = [p.strip() for p in permission_codes if p.strip()]
    
    if not permission_codes:
        return Response(
            {'error': 'No permissions specified'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    results = {}
    for code in permission_codes:
        results[code] = has_permission(request.user, code)
    
    return Response({'permissions': results})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_permissions(request):
    """
    Get all permissions for the current user.
    
    Returns:
        {
            "permissions": ["site_audit.view", "performance.view", ...]
        }
    """
    permissions = get_user_permissions(request.user)
    return Response({'permissions': permissions})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_navigation(request):
    """
    Get navigation structure filtered by user's permissions.
    
    Returns:
        Navigation structure with sections and items filtered by permissions
    """
    import logging
    logger = logging.getLogger(__name__)
    
    # CRITICAL DEBUG: Log user info
    logger.info(f"=== NAVIGATION REQUEST ===")
    logger.info(f"User: {request.user.username}")
    logger.info(f"is_superuser: {request.user.is_superuser}")
    logger.info(f"is_staff: {request.user.is_staff}")
    logger.info(f"is_authenticated: {request.user.is_authenticated}")
    
    # Superuser: full nav (bypass). Others: nav from auth_user_groups (group_id) so sidebar matches matrix.
    if request.user.is_superuser:
        user_permissions_list = get_user_permissions(request.user)
    else:
        user_permissions_list = get_user_permissions_for_navigation(request.user)
    profile_role = getattr(getattr(request.user, 'profile', None), 'role', None)
    has_account = 'account.overview.view' in user_permissions_list
    has_admin = 'users.view' in user_permissions_list
    logger.info(
        "Nav permissions: user=%s is_superuser=%s profile.role=%s perm_count=%s has_account=%s has_admin=%s",
        request.user.username,
        request.user.is_superuser,
        profile_role,
        len(user_permissions_list),
        has_account,
        has_admin,
    )
    
    # Define navigation structure. Home first (landing page, free access for all), then Discovery, etc.
    navigation_structure = {
        "sections": [
            {
                "id": "home",
                "title": "Home",
                "icon": "Home",
                "items": [
                    {
                        "id": "home_overview",
                        "title": "Overview",
                        "href": "/workspace/home",
                        "icon": "LayoutDashboard",
                        "permission": "workspace.overview.view"
                    }
                ]
            },
            {
                "id": "discovery",
                "title": "Discovery",
                "icon": "Search",
                "items": [
                    {
                        "id": "discovery_overview",
                        "title": "Overview",
                        "href": "/workspace/discovery/overview",
                        "icon": "LayoutDashboard",
                        "permission": "discovery.overview.view"
                    },
                    {
                        "id": "discovery_asset_inventory",
                        "title": "Asset Inventory",
                        "href": "/workspace/discovery/asset-inventory",
                        "icon": "Server",
                        "permission": "discovery.asset_inventory.view"
                    }
                ]
            },
            {
                "id": "health",
                "title": "Health",
                "icon": "Activity",
                "items": [
                    {
                        "id": "health_overview",
                        "title": "Overview",
                        "href": "/workspace/health/overview",
                        "icon": "LayoutDashboard",
                        "permission": "health.overview.view"
                    }
                ]
            },
            {
                "id": "performance",
                "title": "Performance",
                "icon": "Gauge",
                "items": [
                    {
                        "id": "performance_overview",
                        "title": "Overview",
                        "href": "/workspace/performance/overview",
                        "icon": "LayoutDashboard",
                        "permission": "performance.overview.view"
                    }
                ]
            },
            {
                "id": "security",
                "title": "Security",
                "icon": "Shield",
                "items": [
                    {
                        "id": "security_overview",
                        "title": "Overview",
                        "href": "/workspace/security/overview",
                        "icon": "LayoutDashboard",
                        "permission": "security.overview.view"
                    }
                ]
            },
            {
                "id": "configuration",
                "title": "Configuration",
                "icon": "Settings",
                "items": [
                    {
                        "id": "configuration_overview",
                        "title": "Overview",
                        "href": "/workspace/configuration/overview",
                        "icon": "LayoutDashboard",
                        "permission": "configuration.overview.view"
                    }
                ]
            },
            {
                "id": "compliance",
                "title": "Compliance",
                "icon": "ShieldCheck",
                "items": [
                    {
                        "id": "compliance_overview",
                        "title": "Overview",
                        "href": "/workspace/compliance/overview",
                        "icon": "LayoutDashboard",
                        "permission": "compliance.overview.view"
                    },
                    {
                        "id": "compliance_chat",
                        "title": "Chat",
                        "href": "/workspace/compliance/chat",
                        "icon": "MessageSquare",
                        "permission": "compliance.chat.view"
                    },
                    {
                        "id": "compliance_frameworks",
                        "title": "Frameworks",
                        "href": "/workspace/compliance/frameworks",
                        "icon": "ShieldCheck",
                        "permission": "compliance.frameworks.view"
                    },
                    {
                        "id": "compliance_controls",
                        "title": "Controls",
                        "href": "/workspace/compliance/controls",
                        "icon": "Shield",
                        "permission": "compliance.controls.view"
                    },
                    {
                        "id": "compliance_assertions",
                        "title": "Assertions",
                        "href": "/workspace/compliance/controls/assertions",
                        "icon": "CheckCircle2",
                        "permission": "compliance.controls.view"
                    },
                    {
                        "id": "compliance_evidence",
                        "title": "Evidence",
                        "href": "/workspace/compliance/evidence",
                        "icon": "FileText",
                        "permission": "compliance.evidence.view"
                    },
                    {
                        "id": "compliance_monitoring",
                        "title": "Monitoring",
                        "href": "/workspace/compliance/monitoring",
                        "icon": "Activity",
                        "permission": "compliance.monitoring.view"
                    },
                    {
                        "id": "compliance_policies",
                        "title": "Policies",
                        "href": "/workspace/compliance/policies",
                        "icon": "FileText",
                        "permission": "compliance.policies.view"
                    },
                    {
                        "id": "compliance_audits",
                        "title": "Audits",
                        "href": "/workspace/compliance/audits",
                        "icon": "Search",
                        "permission": "compliance.audits.view"
                    },
                    {
                        "id": "compliance_reports",
                        "title": "Reports",
                        "href": "/workspace/compliance/reports",
                        "icon": "BarChart3",
                        "permission": "compliance.reports.view"
                    },
                    {
                        "id": "compliance_tools",
                        "title": "Tools",
                        "href": "/workspace/compliance/tools",
                        "icon": "Settings",
                        "permission": "compliance.tools.view"
                    },
                    {
                        "id": "compliance_audit_hub",
                        "title": "Audit Hub",
                        "href": "/workspace/compliance/audit-hub",
                        "icon": "ShieldCheck",
                        "permission": "compliance.audit_hub.view"
                    }
                ]
            },
            {
                "id": "evidence",
                "title": "Evidence",
                "icon": "FileText",
                "items": [
                    {
                        "id": "evidence_overview",
                        "title": "Overview",
                        "href": "/workspace/evidence/overview",
                        "icon": "LayoutDashboard",
                        "permission": "evidence.overview.view"
                    }
                ]
            },
            {
                "id": "change",
                "title": "Change",
                "icon": "TrendingUp",
                "items": [
                    {
                        "id": "change_overview",
                        "title": "Overview",
                        "href": "/workspace/change/overview",
                        "icon": "LayoutDashboard",
                        "permission": "change.overview.view"
                    }
                ]
            },
            {
                "id": "cost",
                "title": "Cost",
                "icon": "BarChart3",
                "items": [
                    {
                        "id": "cost_overview",
                        "title": "Overview",
                        "href": "/workspace/cost/overview",
                        "icon": "LayoutDashboard",
                        "permission": "cost.overview.view"
                    }
                ]
            },
            {
                "id": "risk",
                "title": "Risk",
                "icon": "AlertTriangle",
                "items": [
                    {
                        "id": "risk_overview",
                        "title": "Overview",
                        "href": "/workspace/risk/overview",
                        "icon": "LayoutDashboard",
                        "permission": "risk.overview.view"
                    }
                ]
            },
            {
                "id": "user_features",
                "title": "My Tools",
                "icon": "Tool",
                "items": [
                    {
                        "id": "user_features_overview",
                        "title": "Overview",
                        "href": "/workspace/performance/overview",
                        "icon": "LayoutDashboard",
                        "permission": "user_features.overview.view"
                    },
                    {
                        "id": "site_audit",
                        "title": "Site Audit",
                        "href": "/workspace/site-audit",
                        "icon": "Search",
                        "permission": "site_audit.view"
                    },
                    {
                        "id": "performance",
                        "title": "Performance",
                        "href": "/workspace/performance",
                        "icon": "Gauge",
                        "permission": "performance.view"
                    },
                    {
                        "id": "monitoring",
                        "title": "Monitoring",
                        "href": "/workspace/monitoring",
                        "icon": "TrendingUp",
                        "permission": "monitoring.view"
                    },
                    {
                        "id": "reports",
                        "title": "Reports",
                        "href": "/workspace/reports",
                        "icon": "BarChart3",
                        "permission": "reports.view"
                    },
                    {
                        "id": "ai_health",
                        "title": "AI Monitoring",
                        "href": "/workspace/ai-health",
                        "icon": "Cpu",
                        "permission": "ai_health.view"
                    },
                    {
                        "id": "database_monitoring",
                        "title": "Database Monitoring",
                        "href": "/workspace/database-monitoring",
                        "icon": "Database",
                        "permission": "database_monitoring.view"
                    },
                    {
                        "id": "security_monitoring",
                        "title": "Security Monitoring",
                        "href": "/workspace/security-monitoring",
                        "icon": "Shield",
                        "permission": "security_monitoring.view"
                    },
                    {
                        "id": "security_audit",
                        "title": "Security Audit",
                        "href": "/workspace/security-audit",
                        "icon": "ShieldCheck",
                        "permission": "security_monitoring.view"
                    },
                    {
                        "id": "api_monitoring_user",
                        "title": "API Monitoring",
                        "href": "/workspace/api-monitoring-user",
                        "icon": "Network",
                        "permission": "api_monitoring_user.view"
                    },
                    {
                        "id": "seo_monitoring",
                        "title": "SEO Monitoring",
                        "href": "/workspace/seo-monitoring",
                        "icon": "Globe",
                        "permission": "seo_monitoring.view"
                    },
                    {
                        "id": "settings",
                        "title": "Settings",
                        "href": "/workspace/settings",
                        "icon": "Settings",
                        "permission": "profile.edit"
                    }
                ]
            },
            {
                "id": "collateral",
                "title": "Collateral",
                "icon": "GraduationCap",
                "items": [
                    {
                        "id": "collateral_overview",
                        "title": "Overview",
                        "href": "/workspace/collateral",
                        "icon": "LayoutDashboard",
                        "permission": "collateral.overview.view"
                    },
                    {
                        "id": "collateral_main",
                        "title": "Learning & Resources",
                        "href": "/workspace/collateral",
                        "icon": "GraduationCap",
                        "permission": "collateral.view"
                    }
                ]
            },
            {
                "id": "integrations",
                "title": "Integrations",
                "icon": "Plug",
                "items": [
                    {
                        "id": "integrations_overview",
                        "title": "Overview",
                        "href": "/workspace/integrations",
                        "icon": "LayoutDashboard",
                        "permission": "integrations.overview.view"
                    },
                    {
                        "id": "google_analytics",
                        "title": "Google Analytics",
                        "href": "/workspace/google-analytics",
                        "icon": "TrendingUp",
                        "permission": "google_analytics.view"
                    },
                    {
                        "id": "wordpress",
                        "title": "WordPress",
                        "href": "/workspace/wordpress",
                        "icon": "Package",
                        "permission": "wordpress.view"
                    },
                    {
                        "id": "communication",
                        "title": "Communication",
                        "href": "/workspace/communication",
                        "icon": "MessageSquare",
                        "permission": "communication.view"
                    }
                ]
            },
            {
                "id": "admin_features",
                "title": "Administration",
                "icon": "Shield",
                "permission": "users.view",
                "items": [
                    {
                        "id": "admin_overview",
                        "title": "Overview",
                        "href": "/workspace/admin-overview",
                        "icon": "LayoutDashboard",
                        "permission": "admin_features.overview.view"
                    },
                    {
                        "id": "users",
                        "title": "User Management",
                        "href": "/workspace/users",
                        "icon": "Users",
                        "permission": "users.view"
                    },
                    {
                        "id": "roles",
                        "title": "Role Management",
                        "href": "/workspace/roles",
                        "icon": "Shield",
                        "permission": "roles.view"
                    },
                    {
                        "id": "analytics",
                        "title": "Analytics",
                        "href": "/workspace/analytics",
                        "icon": "BarChart3",
                        "permission": "analytics.view"
                    },
                    {
                        "id": "api_monitoring",
                        "title": "API Monitoring",
                        "href": "/workspace/api-monitoring",
                        "icon": "Network",
                        "permission": "api_monitoring.view"
                    },
                    {
                        "id": "tools_management",
                        "title": "Tools Management",
                        "href": "/workspace/tools-management",
                        "icon": "Wrench",
                        "permission": "tools.view"
                    },
                    {
                        "id": "themes",
                        "title": "Theme Manager",
                        "href": "/workspace/themes",
                        "icon": "Palette",
                        "permission": "themes.view"
                    },
                    {
                        "id": "feedback",
                        "title": "Feedback",
                        "href": "/workspace/feedback",
                        "icon": "MessageSquare",
                        "permission": "feedback.view"
                    },
                    {
                        "id": "messages",
                        "title": "Messages",
                        "href": "/workspace/messages",
                        "icon": "Inbox",
                        "permission": "feedback.view"
                    },
                    {
                        "id": "financials",
                        "title": "Financials",
                        "href": "/workspace/financials",
                        "icon": "CreditCard",
                        "permission": "financials.view"
                    },
                    {
                        "id": "marketing",
                        "title": "Marketing & Deals",
                        "href": "/workspace/marketing",
                        "icon": "TrendingUp",
                        "permission": "marketing.view"
                    },
                    {
                        "id": "affiliates",
                        "title": "Affiliates",
                        "href": "/workspace/affiliates",
                        "icon": "Users",
                        "permission": "affiliates.view"
                    },
                    {
                        "id": "blogging",
                        "title": "Blogging",
                        "href": "/workspace/blogging",
                        "icon": "FileText",
                        "permission": "blog.view"
                    },
                    {
                        "id": "collateral_management",
                        "title": "Collateral",
                        "href": "/workspace/collateral-management",
                        "icon": "GraduationCap",
                        "permission": "users.view"
                    },
                    {
                        "id": "admin_settings",
                        "title": "System Settings",
                        "href": "/workspace/system-settings",
                        "icon": "Settings",
                        "permission": "settings.view"
                    },
                    {
                        "id": "versioning",
                        "title": "Versioning",
                        "href": "/workspace/versioning",
                        "icon": "Tag",
                        "permission": "settings.view"
                    },
                    {
                        "id": "multi_language",
                        "title": "Multi-Language",
                        "href": "/workspace/multi-language",
                        "icon": "Globe",
                        "permission": "users.view"
                    },
                    {
                        "id": "multi_currency",
                        "title": "Multi-Currency",
                        "href": "/workspace/multi-currency",
                        "icon": "CircleDollarSign",
                        "permission": "users.view"
                    },
                    {
                        "id": "multi_location",
                        "title": "Multi-Location",
                        "href": "/workspace/multi-location",
                        "icon": "MapPin",
                        "permission": "users.view"
                    },
                    {
                        "id": "security",
                        "title": "Site Security",
                        "href": "/workspace/security",
                        "icon": "Lock",
                        "permission": "users.view"
                    }
                ]
            },
            {
                "id": "account",
                "title": "Account",
                "icon": "Building2",
                "permission": "account.overview.view",
                "items": [
                    {
                        "id": "account_overview",
                        "title": "Overview",
                        "href": "/workspace/account",
                        "icon": "LayoutDashboard",
                        "permission": "account.overview.view"
                    },
                    {
                        "id": "account_organization",
                        "title": "Organization",
                        "href": "/workspace/account/organization",
                        "icon": "Building2",
                        "permission": "account.overview.view"
                    },
                    {
                        "id": "account_personnel",
                        "title": "People",
                        "href": "/workspace/account/personnel",
                        "icon": "Contact",
                        "permission": "account.overview.view"
                    },
                    {
                        "id": "account_users_access",
                        "title": "Users & Access",
                        "href": "/workspace/account/users-access",
                        "icon": "Users",
                        "permission": "account.overview.view"
                    },
                    {
                        "id": "account_financials",
                        "title": "Financials",
                        "href": "/workspace/account/financials",
                        "icon": "CreditCard",
                        "permission": "account.billing.view"
                    },
                    {
                        "id": "account_subscription",
                        "title": "Subscription",
                        "href": "/workspace/account/subscription",
                        "icon": "Receipt",
                        "permission": "account.billing.view"
                    },
                    {
                        "id": "account_billing_history",
                        "title": "Billing History",
                        "href": "/workspace/account/billing-history",
                        "icon": "FileText",
                        "permission": "account.billing.view"
                    },
                    {
                        "id": "account_data_retention",
                        "title": "Data & Retention",
                        "href": "/workspace/account/data-retention",
                        "icon": "Database",
                        "permission": "account.overview.view"
                    },
                    {
                        "id": "account_frameworks",
                        "title": "Frameworks",
                        "href": "/workspace/account/frameworks",
                        "icon": "BookOpen",
                        "permission": "account.overview.view"
                    },
                    {
                        "id": "account_audit_compliance",
                        "title": "Audit & Compliance",
                        "href": "/workspace/account/audit-compliance",
                        "icon": "ShieldCheck",
                        "permission": "account.overview.view"
                    },
                    {
                        "id": "account_integrations",
                        "title": "Integrations & APIs",
                        "href": "/workspace/account/integrations",
                        "icon": "Plug",
                        "permission": "account.overview.view"
                    },
                    {
                        "id": "account_notifications",
                        "title": "Notifications & Alerts",
                        "href": "/workspace/account/notifications",
                        "icon": "Bell",
                        "permission": "account.overview.view"
                    },
                    {
                        "id": "account_support_legal",
                        "title": "Support & Legal",
                        "href": "/workspace/account/support-legal",
                        "icon": "HelpCircle",
                        "permission": "account.overview.view"
                    }
                ]
            }
        ],
        "quickActions": [
            {
                "id": "new_audit",
                "title": "New Site Audit",
                "href": "/workspace/site-audit?new=true",
                "icon": "Plus",
                "permission": "site_audit.create"
            }
        ]
    }

    # Merge in additional submodules from NAV_APPS_FROM_DOC so the sidebar
    # shows all documented sub-sections for the major apps.
    sections_by_id = {s.get("id"): s for s in navigation_structure.get("sections", [])}
    nav_apps = {"discovery", "health", "security", "configuration", "evidence", "change", "cost", "risk"}

    for app in NAV_APPS_FROM_DOC:
        app_id = app.get("id")
        if app_id not in nav_apps:
            continue
        section = sections_by_id.get(app_id)
        if not section:
            continue
        existing_ids = {item.get("id") for item in section.get("items", [])}
        for it in app.get("items", []):
            item_id = it.get("id")
            # Skip if ID missing, already present, or is the overview (we already have explicit overview entries)
            if not item_id or item_id in existing_ids or item_id.endswith("_overview"):
                continue
            # Derive a permission code from app + item id, e.g.
            # discovery_network -> discovery.network.view
            suffix = item_id[len(app_id) + 1 :] if item_id.startswith(app_id + "_") else item_id
            base_code = f"{app_id}.{suffix.replace('_', '.')}"
            permission_code = f"{base_code}.view"
            section.setdefault("items", []).append(
                {
                    "id": item_id,
                    "title": it.get("title", item_id),
                    "href": it.get("path") or it.get("href") or "",
                    "icon": it.get("icon", "LayoutDashboard"),
                    "permission": permission_code,
                }
            )

    # Do NOT replace with entire doc sections here: we keep the core structure
    # (with explicit permissions) and only extend it with additional items.

    # Always filter navigation by role permissions so sidebar matches matrix (Manager has no Account/Admin),
    # but superusers should see ALL links regardless of permissions.
    if request.user.is_superuser:
        filtered_navigation = navigation_structure
    else:
        filtered_navigation = filter_navigation_by_permissions(
            navigation_structure,
            user_permissions_list,
        )
    logger.debug(
        "Filtered navigation sections: %d",
        len(filtered_navigation.get("sections", [])),
    )
    for section in filtered_navigation.get("sections", []):
        logger.debug(
            "Section: %s, Items: %d",
            section.get("id"),
            len(section.get("items", [])),
        )
        for item in section.get("items", []):
            logger.debug(
                    "  Item: %s (%s) - Permission: %s",
                    item.get("id"),
                    item.get("title"),
                    item.get("permission"),
                )

    # CRITICAL: Log what's actually being returned
    sections_returned = [s.get("id") for s in filtered_navigation.get("sections", [])]
    logger.error("FINAL RESPONSE - Sections being returned: %s", sections_returned)
    compliance_in_response = "compliance" in sections_returned
    logger.error("Compliance in final response: %s", compliance_in_response)
    if not compliance_in_response:
        logger.error("COMPLIANCE MISSING FROM FINAL RESPONSE!")
        logger.error(
            "All sections in navigation_structure: %s",
            [s.get("id") for s in navigation_structure.get("sections", [])],
        )
        logger.error(
            "All sections in filtered_navigation: %s",
            sections_returned,
        )

    return Response(filtered_navigation)


def _build_navigation_structure_for_matrix():
    """Build the navigation structure used by the sidebar matrix. Shared by get and update."""
    return {
        "sections": [
            {
                "id": "home",
                "title": "Home",
                "icon": "Home",
                "items": [
                    {
                        "id": "home_overview",
                        "title": "Overview",
                        "href": "/workspace/home",
                        "icon": "LayoutDashboard",
                        "permission": "workspace.overview.view"
                    }
                ]
            },
            {
                "id": "discovery",
                "title": "Discovery",
                "icon": "Search",
                "items": [
                    {
                        "id": "discovery_overview",
                        "title": "Overview",
                        "href": "/workspace/discovery/overview",
                        "icon": "LayoutDashboard",
                        "permission": "discovery.overview.view"
                    },
                    {
                        "id": "discovery_asset_inventory",
                        "title": "Asset Inventory",
                        "href": "/workspace/discovery/asset-inventory",
                        "icon": "Server",
                        "permission": "discovery.asset_inventory.view"
                    }
                ]
            },
            {
                "id": "health",
                "title": "Health",
                "icon": "Activity",
                "items": [
                    {
                        "id": "health_overview",
                        "title": "Overview",
                        "href": "/workspace/health/overview",
                        "icon": "LayoutDashboard",
                        "permission": "health.overview.view"
                    }
                ]
            },
            {
                "id": "performance",
                "title": "Performance",
                "icon": "Gauge",
                "items": [
                    {
                        "id": "performance_overview",
                        "title": "Overview",
                        "href": "/workspace/performance/overview",
                        "icon": "LayoutDashboard",
                        "permission": "performance.overview.view"
                    }
                ]
            },
            {
                "id": "security",
                "title": "Security",
                "icon": "Shield",
                "items": [
                    {
                        "id": "security_overview",
                        "title": "Overview",
                        "href": "/workspace/security/overview",
                        "icon": "LayoutDashboard",
                        "permission": "security.overview.view"
                    }
                ]
            },
            {
                "id": "configuration",
                "title": "Configuration",
                "icon": "Settings",
                "items": [
                    {
                        "id": "configuration_overview",
                        "title": "Overview",
                        "href": "/workspace/configuration/overview",
                        "icon": "LayoutDashboard",
                        "permission": "configuration.overview.view"
                    }
                ]
            },
            {
                "id": "compliance",
                "title": "Compliance",
                "icon": "ShieldCheck",
                "items": [
                    {
                        "id": "compliance_overview",
                        "title": "Overview",
                        "href": "/workspace/compliance/overview",
                        "icon": "LayoutDashboard",
                        "permission": "compliance.overview.view"
                    },
                    {
                        "id": "compliance_chat",
                        "title": "Chat",
                        "href": "/workspace/compliance/chat",
                        "icon": "MessageSquare",
                        "permission": "compliance.chat.view"
                    },
                    {
                        "id": "compliance_frameworks",
                        "title": "Frameworks",
                        "href": "/workspace/compliance/frameworks",
                        "icon": "ShieldCheck",
                        "permission": "compliance.frameworks.view"
                    },
                    {
                        "id": "compliance_controls",
                        "title": "Controls",
                        "href": "/workspace/compliance/controls",
                        "icon": "Shield",
                        "permission": "compliance.controls.view"
                    },
                    {
                        "id": "compliance_assertions",
                        "title": "Assertions",
                        "href": "/workspace/compliance/controls/assertions",
                        "icon": "CheckCircle2",
                        "permission": "compliance.controls.view"
                    },
                    {
                        "id": "compliance_evidence",
                        "title": "Evidence",
                        "href": "/workspace/compliance/evidence",
                        "icon": "FileText",
                        "permission": "compliance.evidence.view"
                    },
                    {
                        "id": "compliance_monitoring",
                        "title": "Monitoring",
                        "href": "/workspace/compliance/monitoring",
                        "icon": "Activity",
                        "permission": "compliance.monitoring.view"
                    },
                    {
                        "id": "compliance_policies",
                        "title": "Policies",
                        "href": "/workspace/compliance/policies",
                        "icon": "FileText",
                        "permission": "compliance.policies.view"
                    },
                    {
                        "id": "compliance_audits",
                        "title": "Audits",
                        "href": "/workspace/compliance/audits",
                        "icon": "Search",
                        "permission": "compliance.audits.view"
                    },
                    {
                        "id": "compliance_reports",
                        "title": "Reports",
                        "href": "/workspace/compliance/reports",
                        "icon": "BarChart3",
                        "permission": "compliance.reports.view"
                    },
                    {
                        "id": "compliance_tools",
                        "title": "Tools",
                        "href": "/workspace/compliance/tools",
                        "icon": "Settings",
                        "permission": "compliance.tools.view"
                    },
                    {
                        "id": "compliance_audit_hub",
                        "title": "Audit Hub",
                        "href": "/workspace/compliance/audit-hub",
                        "icon": "ShieldCheck",
                        "permission": "compliance.audit_hub.view"
                    }
                ]
            },
            {
                "id": "evidence",
                "title": "Evidence",
                "icon": "FileText",
                "items": [
                    {
                        "id": "evidence_overview",
                        "title": "Overview",
                        "href": "/workspace/evidence/overview",
                        "icon": "LayoutDashboard",
                        "permission": "evidence.overview.view"
                    }
                ]
            },
            {
                "id": "change",
                "title": "Change",
                "icon": "TrendingUp",
                "items": [
                    {
                        "id": "change_overview",
                        "title": "Overview",
                        "href": "/workspace/change/overview",
                        "icon": "LayoutDashboard",
                        "permission": "change.overview.view"
                    }
                ]
            },
            {
                "id": "cost",
                "title": "Cost",
                "icon": "DollarSign",
                "items": [
                    {
                        "id": "cost_overview",
                        "title": "Overview",
                        "href": "/workspace/cost/overview",
                        "icon": "LayoutDashboard",
                        "permission": "cost.overview.view"
                    }
                ]
            },
            {
                "id": "risk",
                "title": "Risk",
                "icon": "AlertTriangle",
                "items": [
                    {
                        "id": "risk_overview",
                        "title": "Overview",
                        "href": "/workspace/risk/overview",
                        "icon": "LayoutDashboard",
                        "permission": "risk.overview.view"
                    }
                ]
            },
            {
                "id": "user_features",
                "title": "My Tools",
                "icon": "Tool",
                "items": [
                    {
                        "id": "user_features_overview",
                        "title": "Overview",
                        "href": "/workspace/tools/overview",
                        "icon": "LayoutDashboard",
                        "permission": "user_features.overview.view"
                    },
                    {
                        "id": "site_audit",
                        "title": "Site Audit",
                        "href": "/workspace/site-audit",
                        "icon": "Search",
                        "permission": "site_audit.view"
                    },
                    {
                        "id": "performance",
                        "title": "Performance",
                        "href": "/workspace/performance",
                        "icon": "Gauge",
                        "permission": "performance.view"
                    },
                    {
                        "id": "monitoring",
                        "title": "Monitoring",
                        "href": "/workspace/monitoring",
                        "icon": "TrendingUp",
                        "permission": "monitoring.view"
                    },
                    {
                        "id": "reports",
                        "title": "Reports",
                        "href": "/workspace/reports",
                        "icon": "BarChart3",
                        "permission": "reports.view"
                    },
                    {
                        "id": "ai_health",
                        "title": "AI Monitoring",
                        "href": "/workspace/ai-health",
                        "icon": "Cpu",
                        "permission": "ai_health.view"
                    },
                    {
                        "id": "database_monitoring",
                        "title": "Database Monitoring",
                        "href": "/workspace/database-monitoring",
                        "icon": "Database",
                        "permission": "database_monitoring.view"
                    },
                    {
                        "id": "security_monitoring",
                        "title": "Security Monitoring",
                        "href": "/workspace/security-monitoring",
                        "icon": "Shield",
                        "permission": "security_monitoring.view"
                    },
                    {
                        "id": "security_audit",
                        "title": "Security Audit",
                        "href": "/workspace/security-audit",
                        "icon": "ShieldCheck",
                        "permission": "security_monitoring.view"
                    },
                    {
                        "id": "api_monitoring_user",
                        "title": "API Monitoring",
                        "href": "/workspace/api-monitoring-user",
                        "icon": "Network",
                        "permission": "api_monitoring_user.view"
                    },
                    {
                        "id": "seo_monitoring",
                        "title": "SEO Monitoring",
                        "href": "/workspace/seo-monitoring",
                        "icon": "Globe",
                        "permission": "seo_monitoring.view"
                    },
                    {
                        "id": "settings",
                        "title": "Settings",
                        "href": "/workspace/settings",
                        "icon": "Settings",
                        "permission": "profile.edit"
                    }
                ]
            },
            {
                "id": "collateral",
                "title": "Collateral",
                "icon": "GraduationCap",
                "items": [
                    {
                        "id": "collateral_overview",
                        "title": "Overview",
                        "href": "/workspace/collateral",
                        "icon": "LayoutDashboard",
                        "permission": "collateral.overview.view"
                    },
                    {
                        "id": "collateral_main",
                        "title": "Learning & Resources",
                        "href": "/workspace/collateral",
                        "icon": "GraduationCap",
                        "permission": "collateral.view"
                    }
                ]
            },
            {
                "id": "integrations",
                "title": "Integrations",
                "icon": "Plug",
                "items": [
                    {
                        "id": "integrations_overview",
                        "title": "Overview",
                        "href": "/workspace/integrations",
                        "icon": "LayoutDashboard",
                        "permission": "integrations.overview.view"
                    },
                    {
                        "id": "google_analytics",
                        "title": "Google Analytics",
                        "href": "/workspace/google-analytics",
                        "icon": "TrendingUp",
                        "permission": "google_analytics.view"
                    },
                    {
                        "id": "wordpress",
                        "title": "WordPress",
                        "href": "/workspace/wordpress",
                        "icon": "Package",
                        "permission": "wordpress.view"
                    },
                    {
                        "id": "communication",
                        "title": "Communication",
                        "href": "/workspace/communication",
                        "icon": "MessageSquare",
                        "permission": "communication.view"
                    }
                ]
            },
            {
                "id": "admin_features",
                "title": "Administration",
                "icon": "Shield",
                "permission": "users.view",
                "items": [
                    {
                        "id": "admin_overview",
                        "title": "Overview",
                        "href": "/workspace/admin-overview",
                        "icon": "LayoutDashboard",
                        "permission": "admin_features.overview.view"
                    },
                    {
                        "id": "users",
                        "title": "User Management",
                        "href": "/workspace/users",
                        "icon": "Users",
                        "permission": "users.view"
                    },
                    {
                        "id": "roles",
                        "title": "Role Management",
                        "href": "/workspace/roles",
                        "icon": "Shield",
                        "permission": "roles.view"
                    },
                    {
                        "id": "analytics",
                        "title": "Analytics",
                        "href": "/workspace/analytics",
                        "icon": "BarChart3",
                        "permission": "analytics.view"
                    },
                    {
                        "id": "api_monitoring",
                        "title": "API Monitoring",
                        "href": "/workspace/api-monitoring",
                        "icon": "Network",
                        "permission": "api_monitoring.view"
                    },
                    {
                        "id": "tools_management",
                        "title": "Tools Management",
                        "href": "/workspace/tools-management",
                        "icon": "Wrench",
                        "permission": "tools.view"
                    },
                    {
                        "id": "themes",
                        "title": "Theme Manager",
                        "href": "/workspace/themes",
                        "icon": "Palette",
                        "permission": "themes.view"
                    },
                    {
                        "id": "feedback",
                        "title": "Feedback",
                        "href": "/workspace/feedback",
                        "icon": "MessageSquare",
                        "permission": "feedback.view"
                    },
                    {
                        "id": "messages",
                        "title": "Messages",
                        "href": "/workspace/messages",
                        "icon": "Inbox",
                        "permission": "feedback.view"
                    },
                    {
                        "id": "financials",
                        "title": "Financials",
                        "href": "/workspace/financials",
                        "icon": "CreditCard",
                        "permission": "financials.view"
                    },
                    {
                        "id": "marketing",
                        "title": "Marketing & Deals",
                        "href": "/workspace/marketing",
                        "icon": "TrendingUp",
                        "permission": "marketing.view"
                    },
                    {
                        "id": "affiliates",
                        "title": "Affiliates",
                        "href": "/workspace/affiliates",
                        "icon": "Users",
                        "permission": "affiliates.view"
                    },
                    {
                        "id": "blogging",
                        "title": "Blogging",
                        "href": "/workspace/blogging",
                        "icon": "FileText",
                        "permission": "blog.view"
                    },
                    {
                        "id": "collateral_management",
                        "title": "Collateral",
                        "href": "/workspace/collateral-management",
                        "icon": "GraduationCap",
                        "permission": "users.view"
                    },
                    {
                        "id": "admin_settings",
                        "title": "System Settings",
                        "href": "/workspace/system-settings",
                        "icon": "Settings",
                        "permission": "settings.view"
                    },
                    {
                        "id": "versioning",
                        "title": "Versioning",
                        "href": "/workspace/versioning",
                        "icon": "Tag",
                        "permission": "settings.view"
                    },
                    {
                        "id": "multi_language",
                        "title": "Multi-Language",
                        "href": "/workspace/multi-language",
                        "icon": "Globe",
                        "permission": "users.view"
                    },
                    {
                        "id": "multi_currency",
                        "title": "Multi-Currency",
                        "href": "/workspace/multi-currency",
                        "icon": "CircleDollarSign",
                        "permission": "users.view"
                    },
                    {
                        "id": "multi_location",
                        "title": "Multi-Location",
                        "href": "/workspace/multi-location",
                        "icon": "MapPin",
                        "permission": "users.view"
                    },
                    {
                        "id": "security",
                        "title": "Site Security",
                        "href": "/workspace/security",
                        "icon": "Lock",
                        "permission": "users.view"
                    }
                ]
            },
            {
                "id": "account",
                "title": "Account",
                "icon": "Building2",
                "permission": "account.overview.view",
                "items": [
                    {
                        "id": "account_overview",
                        "title": "Overview",
                        "href": "/workspace/account",
                        "icon": "LayoutDashboard",
                        "permission": "account.overview.view"
                    },
                    {
                        "id": "account_organization",
                        "title": "Organization",
                        "href": "/workspace/account/organization",
                        "icon": "Building2",
                        "permission": "account.overview.view"
                    },
                    {
                        "id": "account_personnel",
                        "title": "People",
                        "href": "/workspace/account/personnel",
                        "icon": "Contact",
                        "permission": "account.overview.view"
                    },
                    {
                        "id": "account_users_access",
                        "title": "Users & Access",
                        "href": "/workspace/account/users-access",
                        "icon": "Users",
                        "permission": "account.overview.view"
                    },
                    {
                        "id": "account_financials",
                        "title": "Financials",
                        "href": "/workspace/account/financials",
                        "icon": "CreditCard",
                        "permission": "account.billing.view"
                    },
                    {
                        "id": "account_subscription",
                        "title": "Subscription",
                        "href": "/workspace/account/subscription",
                        "icon": "Receipt",
                        "permission": "account.billing.view"
                    },
                    {
                        "id": "account_billing_history",
                        "title": "Billing History",
                        "href": "/workspace/account/billing-history",
                        "icon": "FileText",
                        "permission": "account.billing.view"
                    },
                    {
                        "id": "account_data_retention",
                        "title": "Data & Retention",
                        "href": "/workspace/account/data-retention",
                        "icon": "Database",
                        "permission": "account.overview.view"
                    },
                    {
                        "id": "account_frameworks",
                        "title": "Frameworks",
                        "href": "/workspace/account/frameworks",
                        "icon": "BookOpen",
                        "permission": "account.overview.view"
                    },
                    {
                        "id": "account_audit_compliance",
                        "title": "Audit & Compliance",
                        "href": "/workspace/account/audit-compliance",
                        "icon": "ShieldCheck",
                        "permission": "account.overview.view"
                    },
                    {
                        "id": "account_integrations",
                        "title": "Integrations & APIs",
                        "href": "/workspace/account/integrations",
                        "icon": "Plug",
                        "permission": "account.overview.view"
                    },
                    {
                        "id": "account_notifications",
                        "title": "Notifications & Alerts",
                        "href": "/workspace/account/notifications",
                        "icon": "Bell",
                        "permission": "account.overview.view"
                    },
                    {
                        "id": "account_support_legal",
                        "title": "Support & Legal",
                        "href": "/workspace/account/support-legal",
                        "icon": "HelpCircle",
                        "permission": "account.overview.view"
                    }
                ]
            }
        ]
    }


def _get_sidebar_managed_permission_codes():
    """
    Return the set of permission codes that are managed by the sidebar matrix.
    Used when updating: we MERGE (preserve non-sidebar perms) instead of replacing.
    """
    from .permission_models import FeaturePermission
    import copy

    navigation_structure = copy.deepcopy(_build_navigation_structure_for_matrix())
    sections_by_id = {s.get("id"): s for s in navigation_structure.get("sections", [])}
    matrix_apps = {"discovery", "health", "security", "configuration", "evidence", "change", "cost", "risk"}

    for app in NAV_APPS_FROM_DOC:
        app_id = app.get("id")
        if app_id not in matrix_apps:
            continue
        section = sections_by_id.get(app_id)
        if not section:
            continue
        existing_ids = {item.get("id") for item in section.get("items", [])}
        for it in app.get("items", []):
            item_id = it.get("id")
            if not item_id or item_id in existing_ids or item_id.endswith("_overview"):
                continue
            suffix = item_id[len(app_id) + 1 :] if item_id.startswith(app_id + "_") else item_id
            base_code = f"{app_id}.{suffix.replace('_', '.')}"
            permission_code = f"{base_code}.view"
            section.setdefault("items", []).append({
                "id": item_id,
                "title": it.get("title", item_id),
                "href": it.get("path") or it.get("href") or "",
                "icon": it.get("icon", "LayoutDashboard"),
                "permission": permission_code,
            })

    managed_codes = set()
    for section in navigation_structure.get("sections", []):
        for item in section.get("items", []):
            item_permission = item.get("permission", "")
            if not item_permission:
                continue
            base_code = item_permission.rsplit(".", 1)[0] if "." in item_permission else item_permission
            feature_perms = FeaturePermission.objects.filter(code__startswith=base_code + ".")
            for fp in feature_perms:
                if ".view" in fp.code:
                    managed_codes.add(fp.code)
                elif ".create" in fp.code:
                    managed_codes.add(fp.code)
                elif ".edit" in fp.code:
                    managed_codes.add(fp.code)
                elif ".delete" in fp.code:
                    managed_codes.add(fp.code)
            if not feature_perms:
                managed_codes.add(item_permission)
    return managed_codes


@api_view(['GET'])
@permission_classes([IsAuthenticated, HasFeaturePermission('roles.view')])
def get_sidebar_matrix(request):
    """
    Get sidebar matrix showing View/Edit/Both access for all roles.
    
    Returns matrix data with permission breakdown per role per sidebar item.
    """
    from django.contrib.auth.models import Group
    from .permission_models import FeaturePermission

    # Get all roles (system + custom). Exclude Superuser - manageable only via Django admin/CLI.
    ROLE_ORDER = ['Admin', 'Agency', 'Executive', 'Director', 'Manager', 'Analyst', 'Auditor', 'Viewer']
    ROLE_HIDDEN_FROM_UI = 'Superuser'

    def role_sort_key(group):
        if group.name in ROLE_ORDER:
            return (0, ROLE_ORDER.index(group.name))
        return (1, group.name.lower())

    all_groups = sorted(
        Group.objects.exclude(name__iexact=ROLE_HIDDEN_FROM_UI),
        key=role_sort_key
    )

    navigation_structure = _build_navigation_structure_for_matrix()

    SYSTEM_ROLES = ['Admin', 'Agency', 'Executive', 'Director', 'Manager', 'Analyst', 'Auditor', 'Viewer']
    roles_data = []
    for group in all_groups:
        roles_data.append({
            "id": group.id,
            "name": group.name,
            "is_system_role": group.name in SYSTEM_ROLES
        })

    # Build sidebar items with role access
    sidebar_items = []

    # Merge in additional submodules from NAV_APPS_FROM_DOC so the role matrix
    # can assign permissions for all documented sub-sections of the major apps.
    sections_by_id = {s.get("id"): s for s in navigation_structure.get("sections", [])}
    matrix_apps = {"discovery", "health", "security", "configuration", "evidence", "change", "cost", "risk"}

    for app in NAV_APPS_FROM_DOC:
        app_id = app.get("id")
        if app_id not in matrix_apps:
            continue
        section = sections_by_id.get(app_id)
        if not section:
            continue
        existing_ids = {item.get("id") for item in section.get("items", [])}
        for it in app.get("items", []):
            item_id = it.get("id")
            # Skip if ID missing, already present, or is the overview (we already have explicit overview entries)
            if not item_id or item_id in existing_ids or item_id.endswith("_overview"):
                continue
            # Derive a permission code from app + item id, e.g.
            # discovery_network -> discovery.network.view
            suffix = item_id[len(app_id) + 1 :] if item_id.startswith(app_id + "_") else item_id
            base_code = f"{app_id}.{suffix.replace('_', '.')}"
            permission_code = f"{base_code}.view"
            section.setdefault("items", []).append(
                {
                    "id": item_id,
                    "title": it.get("title", item_id),
                    "href": it.get("path") or it.get("href") or "",
                    "icon": it.get("icon", "LayoutDashboard"),
                    "permission": permission_code,
                }
            )
    
    # Debug: Log compliance section processing
    import logging
    logger = logging.getLogger(__name__)
    compliance_section_found = False
    
    for section in navigation_structure.get('sections', []):
        if section.get('id') == 'compliance':
            compliance_section_found = True
            logger.info(f"Processing compliance section with {len(section.get('items', []))} items")
        
        for item in section.get('items', []):
            # Get required permissions for this item
            item_permission = item.get('permission', '')
            
            # Determine what permissions this item needs (view, create, edit, delete)
            required_permissions = {}
            if item_permission:
                # Base permission (e.g., "site_audit.view")
                base_code = item_permission.rsplit('.', 1)[0] if '.' in item_permission else item_permission
                
                # Check what permission types exist for this feature
                feature_perms = FeaturePermission.objects.filter(code__startswith=base_code + '.')
                for fp in feature_perms:
                    if '.view' in fp.code:
                        required_permissions['view'] = fp.code
                    elif '.create' in fp.code:
                        required_permissions['create'] = fp.code
                    elif '.edit' in fp.code:
                        required_permissions['edit'] = fp.code
                    elif '.delete' in fp.code:
                        required_permissions['delete'] = fp.code
                
                # If no feature perms found, use the base permission
                if not required_permissions:
                    required_permissions['view'] = item_permission
            
            # Get role access for this item
            role_access = {}
            for group in all_groups:
                # Get all permissions for this role
                role_perms = group.permissions.all()
                role_permission_codes = []
                
                for perm in role_perms:
                    try:
                        fp = FeaturePermission.objects.get(django_permission=perm)
                        role_permission_codes.append(fp.code)
                    except FeaturePermission.DoesNotExist:
                        # Fallback
                        code = perm.codename.replace('_', '.')
                        role_permission_codes.append(code)
                
                # Check which permissions this role has for this item
                access = {
                    "view": False,
                    "create": False,
                    "edit": False,
                    "delete": False
                }
                
                for perm_type, perm_code in required_permissions.items():
                    if perm_code in role_permission_codes:
                        access[perm_type] = True
                
                # Generate display value
                display_parts = []
                if access['view']:
                    display_parts.append('V')
                if access['create']:
                    display_parts.append('C')
                if access['edit']:
                    display_parts.append('E')
                if access['delete']:
                    display_parts.append('D')
                
                display = '+'.join(display_parts) if display_parts else '-'
                
                role_access[str(group.id)] = {
                    **access,
                    "display": display
                }
            
            sidebar_items.append({
                "id": item.get('id'),
                "title": item.get('title'),
                "section": section.get('id'),
                "section_title": section.get('title'),
                "required_permissions": required_permissions,
                "href": item.get('href'),
                "role_access": role_access
            })
            
            # Debug: Log compliance items
            if section.get('id') == 'compliance':
                logger.info(f"Added compliance item: {item.get('id')} ({item.get('title')}) with {len(required_permissions)} required permissions")
    
    # Debug: Verify compliance items were added
    compliance_items_count = len([item for item in sidebar_items if item.get('section') == 'compliance'])
    logger.info(f"Total compliance items in sidebar_items: {compliance_items_count}")
    if compliance_section_found and compliance_items_count == 0:
        logger.warning("Compliance section found but no items were added!")
    
    # Calculate summary
    summary = {
        "total_items": len(sidebar_items),
        "role_counts": {}
    }
    
    for group in all_groups:
        accessible_count = 0
        for item in sidebar_items:
            access = item['role_access'].get(str(group.id), {})
            if access.get('display') != '-':
                accessible_count += 1
        
        summary["role_counts"][str(group.id)] = accessible_count
    
    return Response({
        "roles": roles_data,
        "sidebar_items": sidebar_items,
        "summary": summary
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated, HasFeaturePermission('roles.edit')])
def update_sidebar_matrix(request):
    """
    Update permissions for a role based on matrix changes.
    Expects: { role_id, permission_codes: [] }
    Allows updates for both system and custom roles (permissions can be changed, but system roles cannot be renamed/deleted).
    """
    from django.contrib.auth.models import Group, Permission
    from django.db import transaction
    from .permission_models import FeaturePermission
    
    role_id = request.data.get('role_id')
    permission_codes = request.data.get('permission_codes', [])
    
    if role_id is None or role_id == '':
        return Response(
            {'error': 'role_id is required'},
            status=status.HTTP_400_BAD_REQUEST
        )
    try:
        role_id = int(role_id)
    except (TypeError, ValueError):
        return Response(
            {'error': 'role_id must be an integer (group id)'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        role = Group.objects.get(id=role_id)
        if role.name == 'Superuser':
            return Response(
                {'error': 'Superuser role can only be managed via Django admin or CLI.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        # System roles CAN have their permissions edited, they just can't be renamed or deleted
        # This is the correct behavior - permissions should be editable for all roles
        
        from django.contrib.contenttypes.models import ContentType

        content_type = ContentType.objects.get_for_model(FeaturePermission)

        # CRITICAL: MERGE with existing permissions instead of replacing.
        # The frontend only sends sidebar-matrix permission codes. Non-sidebar perms
        # (roles.edit, users.view, etc.) must be preserved or we strip admin access.
        sidebar_managed_codes = _get_sidebar_managed_permission_codes()
        current_perms = list(role.permissions.all())
        current_codes = set()
        for perm in current_perms:
            try:
                fp = FeaturePermission.objects.get(django_permission=perm)
                current_codes.add(fp.code)
            except FeaturePermission.DoesNotExist:
                current_codes.add(perm.codename.replace('_', '.'))
        other_codes = current_codes - sidebar_managed_codes
        final_codes = other_codes | set(permission_codes)

        # Get or create FeaturePermission + Django Permission for each final code
        django_perms = []
        seen_perm_ids = set()
        for code in final_codes:
            fp = FeaturePermission.objects.filter(code=code).first()
            if not fp:
                codename = code.replace('.', '_')
                perm, _ = Permission.objects.get_or_create(
                    codename=codename,
                    content_type=content_type,
                    defaults={'name': code.replace('_', ' ').title()}
                )
                fp, _ = FeaturePermission.objects.get_or_create(
                    code=code,
                    defaults={'name': perm.name, 'category': 'workspace', 'django_permission': perm}
                )
                if not fp.django_permission_id:
                    fp.django_permission = perm
                    fp.save(update_fields=['django_permission'])
            perm = fp.django_permission if fp.django_permission else None
            if not perm:
                codename = fp.code.replace('.', '_')
                perm, _ = Permission.objects.get_or_create(
                    codename=codename,
                    content_type=content_type,
                    defaults={'name': fp.name}
                )
                fp.django_permission = perm
                fp.save()
            if perm.id not in seen_perm_ids:
                seen_perm_ids.add(perm.id)
                django_perms.append(perm)

        # Capture before state for audit
        before_sidebar = sorted(current_codes & sidebar_managed_codes)
        after_sidebar = sorted(set(permission_codes))
        added = sorted(set(permission_codes) - current_codes)
        removed = sorted((current_codes & sidebar_managed_codes) - set(permission_codes))

        # Update role permissions
        with transaction.atomic():
            role.permissions.set(django_perms)
            role.refresh_from_db()

        # Audit log: who changed what, when
        audit_log = logging.getLogger('users.audit')
        audit_log.info(
            'ROLE_PERMISSIONS_UPDATE role_id=%s role_name=%s user_id=%s user=%s added=%s removed=%s',
            role_id, role.name,
            getattr(request.user, 'id', None), getattr(request.user, 'username', 'unknown'),
            added, removed,
            extra={
                'role_id': role_id,
                'role_name': role.name,
                'user_id': getattr(request.user, 'id', None),
                'username': getattr(request.user, 'username', 'unknown'),
                'before_sidebar': before_sidebar,
                'after_sidebar': after_sidebar,
                'added': added,
                'removed': removed,
            }
        )
        
        # Return updated role data
        return Response({
            'message': 'Permissions updated successfully',
            'role_id': role.id,
            'role_name': role.name,
            'permission_count': len(django_perms)
        })
        
    except Group.DoesNotExist:
        return Response(
            {'error': f'Role with id {role_id} not found'},
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return Response(
            {'error': f'Error updating role: {str(e)}'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

