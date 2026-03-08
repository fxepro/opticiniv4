"""
Permission Utilities for RBAC.

Source of truth for user's role: auth_user_groups (user_id, group_id).
We get the user's group_id from user.groups, then use that Group's permissions.
No role name matching (Manager/manager etc.) - we use group_id.
"""

from django.contrib.auth.models import User, Permission, Group
from .models import UserProfile

# Role groups (auth_group ids / names). Used to filter which group is "the" role group per user.
ROLE_GROUP_NAMES = ['Admin', 'Agency', 'Executive', 'Director', 'Manager', 'Analyst', 'Auditor', 'Viewer']


def _get_user_role_group(user):
    """
    Get the user's role Group from auth_user_groups (user.groups).
    Returns the Group object (with id) or None. Uses group_id, not role name.
    """
    return user.groups.filter(name__in=ROLE_GROUP_NAMES).first()


def has_permission(user, permission_code):
    """
    Check if user has a specific permission.
    Uses user's group_id from auth_user_groups -> Group -> permissions.
    """
    if user.is_superuser:
        return True
    group = _get_user_role_group(user)
    if not group:
        return False
    permission_codename = permission_code.replace('.', '_')
    from django.contrib.contenttypes.models import ContentType
    from .permission_models import FeaturePermission
    try:
        content_type = ContentType.objects.get_for_model(FeaturePermission)
        perm = Permission.objects.get(codename=permission_codename, content_type=content_type)
        return group.permissions.filter(id=perm.id).exists()
    except Permission.DoesNotExist:
        return group.permissions.filter(codename=permission_codename).exists()


def _get_permissions_from_role(user):
    """
    Get permission codes from the user's role Group (from auth_user_groups, i.e. user.groups).
    Uses group_id, not profile.role.
    """
    group = _get_user_role_group(user)
    if not group:
        return []
    from .permission_models import FeaturePermission
    permission_codes = []
    for perm in group.permissions.all():
        try:
            feature_perm = FeaturePermission.objects.get(django_permission=perm)
            permission_codes.append(feature_perm.code)
        except FeaturePermission.DoesNotExist:
            permission_codes.append(perm.codename.replace('_', '.'))
    return permission_codes


def get_user_permissions(user):
    """Superusers get all; else user's permissions from auth_user_groups -> Group (by group_id)."""
    if user.is_superuser:
        from .permission_models import FeaturePermission
        return list(FeaturePermission.objects.values_list('code', flat=True))
    return _get_permissions_from_role(user)


def get_user_permissions_for_navigation(user):
    """Same as get_user_permissions; nav uses auth_user_groups -> group_id -> permissions."""
    return _get_permissions_from_role(user)


def filter_navigation_by_permissions(navigation_structure, user_permissions):
    """Filter navigation structure based on user permissions."""
    filtered_sections = []
    for section in navigation_structure.get('sections', []):
        section_permission = section.get('permission')
        if section_permission and section_permission not in user_permissions:
            continue
        filtered_items = []
        for item in section.get('items', []):
            item_permission = item.get('permission')
            if item_permission and item_permission in user_permissions:
                filtered_items.append(item)
        if filtered_items:
            section_copy = section.copy()
            section_copy['items'] = filtered_items
            filtered_sections.append(section_copy)
    result = navigation_structure.copy()
    result['sections'] = filtered_sections
    return result
