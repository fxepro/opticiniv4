"""
Source of truth for role: auth_user_groups (user_id, group_id).
We write the user's group_id here when assigning role; permission logic reads from here.
"""

from django.contrib.auth.models import Group

ROLE_GROUP_NAMES = ['Admin', 'Agency', 'Executive', 'Director', 'Manager', 'Analyst', 'Auditor', 'Viewer']


def normalize_role(value):
    """Return role string lowercase, or None. Used when frontend sends role name."""
    if value is None or (isinstance(value, str) and not value.strip()):
        return None
    return value.strip().lower()


def _role_name_to_group_id(role_name):
    """Resolve role name (e.g. manager) to Group id. Returns None if not found."""
    if not role_name or not isinstance(role_name, str) or not role_name.strip():
        return None
    cap = role_name.strip().capitalize()
    g = Group.objects.filter(name__in=ROLE_GROUP_NAMES, name__iexact=cap).first()
    return g.id if g else None


def sync_user_groups_to_role(user, group_id):
    """
    Set user's single role in auth_user_groups by group_id.
    Removes user from all role groups, adds user to this group_id.
    """
    if group_id is None:
        return
    group = Group.objects.filter(id=group_id, name__in=ROLE_GROUP_NAMES).first()
    if not group:
        return
    to_remove = list(user.groups.filter(name__in=ROLE_GROUP_NAMES))
    for g in to_remove:
        user.groups.remove(g)
    user.groups.add(group)


def set_user_role_by_group_id(user, group_id):
    """Set user's role to this group_id (auth_user_groups). Optionally keep profile.role in sync."""
    sync_user_groups_to_role(user, group_id)
    try:
        profile = user.profile
        group = Group.objects.filter(id=group_id).first()
        if group:
            profile.role = group.name.lower()
            profile.save(update_fields=['role'])
    except Exception:
        pass


def set_user_role_by_name(user, role_name):
    """Resolve role name to group_id and set (for when frontend sends role not role_id)."""
    gid = _role_name_to_group_id(role_name)
    if gid is not None:
        set_user_role_by_group_id(user, gid)
