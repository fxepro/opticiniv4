# Move user/auth tables from core to identity schema.
# Identity becomes the home for auth, users, sessions, contenttypes, admin.

from django.db import migrations


def move_tables_to_identity(apps, schema_editor):
    from django.db import connections
    id_conn = connections["identity"]
    core_conn = connections["core"]
    with id_conn.cursor() as id_c:
        with core_conn.cursor() as core_c:
            tables = [
                "django_content_type",
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
                    id_c.execute(
                        f"CREATE TABLE IF NOT EXISTS identity.{t} "
                        f"(LIKE core.{t} INCLUDING DEFAULTS INCLUDING INDEXES)"
                    )
                except Exception:
                    pass
            for t in tables:
                try:
                    core_c.execute(f"SELECT 1 FROM core.{t} LIMIT 1")
                except Exception:
                    continue
                core_c.execute(f"SELECT * FROM core.{t}")
                rows = core_c.fetchall()
                if not rows:
                    continue
                cols = [d[0] for d in core_c.description]
                placeholders = ",".join(["%s"] * len(cols))
                col_list = ",".join(cols)
                for row in rows:
                    try:
                        id_c.execute(
                            f"INSERT INTO identity.{t} ({col_list}) VALUES ({placeholders})",
                            row,
                        )
                    except Exception:
                        pass
            _add_identity_fks(id_c)
            for t in [
                "users_featurepermission", "users_monitoredsite", "users_useractivity",
                "users_usercorporateprofile", "users_userprofile",
                "django_admin_log", "django_session",
                "auth_user_user_permissions", "auth_user_groups", "auth_group_permissions",
                "auth_user", "auth_group", "auth_permission", "django_content_type",
            ]:
                try:
                    core_c.execute(f"DROP TABLE IF EXISTS core.{t} CASCADE")
                except Exception:
                    pass


def _add_identity_fks(c):
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
                f"ALTER TABLE identity.{table} "
                f"ADD CONSTRAINT {table}_{col}_fkey "
                f"FOREIGN KEY ({col}) REFERENCES identity.{ref_table}({ref_col}) "
                f"ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED"
            )
        except Exception:
            pass


def noop_reverse(apps, schema_editor):
    pass


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0022_user_tables_to_core"),
    ]

    operations = [
        migrations.RunPython(move_tables_to_identity, noop_reverse),
    ]
