# Move auth/users tables BACK from identity to core.
# Identity schema should only contain identity app tables (users, user_team_map).
# Auth and users app tables belong in core.
# Uses INSERT...SELECT for speed. atomic=False to avoid long transaction locks.

from django.db import migrations


def move_tables_back_to_core(apps, schema_editor):
    from django.db import connections
    # Use default connection - same DB, can access all schemas
    conn = connections["default"]
    with conn.cursor() as c:
        _do_move(c)


def _do_move(c):
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
            c.execute(f"SELECT 1 FROM identity.{t} LIMIT 1")
        except Exception:
            continue
        try:
            c.execute(f"DROP TABLE IF EXISTS core.{t} CASCADE")
            c.execute(
                f"CREATE TABLE core.{t} "
                f"(LIKE identity.{t} INCLUDING DEFAULTS INCLUDING INDEXES)"
            )
            c.execute(f"INSERT INTO core.{t} SELECT * FROM identity.{t}")
        except Exception as e:
            raise RuntimeError(f"Failed on {t}: {e}") from e
    drop_order = [
        "users_featurepermission", "users_monitoredsite", "users_useractivity",
        "users_usercorporateprofile", "users_userprofile",
        "django_admin_log", "django_session",
        "auth_user_user_permissions", "auth_user_groups", "auth_group_permissions",
        "auth_user", "auth_group", "auth_permission", "django_content_type",
    ]
    for t in drop_order:
        try:
            c.execute(f"DROP TABLE IF EXISTS identity.{t} CASCADE")
        except Exception as e:
            raise RuntimeError(f"Failed dropping identity.{t}: {e}") from e


def noop_reverse(apps, schema_editor):
    pass


class Migration(migrations.Migration):

    atomic = False

    dependencies = [
        ("core", "0024_compliance_policy_tables_to_compliance"),
    ]

    operations = [
        migrations.RunPython(move_tables_back_to_core, noop_reverse),
    ]
