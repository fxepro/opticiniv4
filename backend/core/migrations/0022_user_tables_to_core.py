# Move user/auth tables from public to core schema.
# Core becomes the home for all user and auth data.

from django.db import migrations


def move_tables_to_core(apps, schema_editor):
    if schema_editor.connection.alias != "core":
        return
    from django.db import connections
    conn = connections["core"]
    with conn.cursor() as c:
        # Create core tables from public (LIKE without FKs - we'll rely on core schema)
        tables = [
            "django_content_type",  # Parent for auth_permission
            "auth_permission",
            "auth_group",
            "auth_user",
            "auth_user_groups",
            "auth_user_user_permissions",
            "auth_group_permissions",
            "django_session",
            "django_admin_log",
            "users_userprofile",
            "users_useractivity",
            "users_usercorporateprofile",
            "users_monitoredsite",
            "users_featurepermission",
        ]
        for t in tables:
            try:
                c.execute(
                    f"CREATE TABLE IF NOT EXISTS core.{t} "
                    f"(LIKE public.{t} INCLUDING DEFAULTS INCLUDING INDEXES)"
                )
            except Exception:
                pass
        # Copy data (order matters for FKs - parents first)
        for t in tables:
            try:
                c.execute(f"INSERT INTO core.{t} SELECT * FROM public.{t}")
            except Exception:
                pass
        # Add FK constraints for core schema
        _add_core_fks(c)
        # Drop public tables (children before parents)
        drop_order = [
            "users_featurepermission", "users_monitoredsite", "users_useractivity",
            "users_usercorporateprofile", "users_userprofile",
            "django_admin_log", "django_session",
            "auth_user_user_permissions", "auth_user_groups", "auth_group_permissions",
            "auth_user", "auth_group", "auth_permission", "django_content_type",
        ]
        for t in drop_order:
            try:
                c.execute(f"DROP TABLE IF EXISTS public.{t} CASCADE")
            except Exception:
                pass


def _add_core_fks(c):
    """Add FK constraints within core schema."""
    fks = [
        ("auth_permission", "content_type_id", "django_content_type", "id"),
        ("auth_user_groups", "user_id", "auth_user", "id"),
        ("auth_user_groups", "group_id", "auth_group", "id"),
        ("auth_user_user_permissions", "user_id", "auth_user", "id"),
        ("auth_user_user_permissions", "permission_id", "auth_permission", "id"),
        ("auth_group_permissions", "group_id", "auth_group", "id"),
        ("auth_group_permissions", "permission_id", "auth_permission", "id"),
        ("django_admin_log", "user_id", "auth_user", "id"),
        ("django_admin_log", "content_type_id", "django_content_type", "id"),
        ("users_userprofile", "user_id", "auth_user", "id"),
        ("users_useractivity", "user_id", "auth_user", "id"),
        ("users_usercorporateprofile", "user_id", "auth_user", "id"),
        ("users_monitoredsite", "user_id", "auth_user", "id"),
        ("users_featurepermission", "django_permission_id", "auth_permission", "id"),
    ]
    for table, col, ref_table, ref_col in fks:
        try:
            c.execute(
                f"ALTER TABLE core.{table} "
                f"ADD CONSTRAINT {table}_{col}_fkey "
                f"FOREIGN KEY ({col}) REFERENCES core.{ref_table}({ref_col}) "
                f"ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED"
            )
        except Exception:
            pass


def noop_reverse(apps, schema_editor):
    pass


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0021_drop_public_discovery_asset_tables"),
    ]

    operations = [
        migrations.RunPython(move_tables_to_core, noop_reverse),
    ]
