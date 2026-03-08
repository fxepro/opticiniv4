"""
Standalone command to move auth/users tables from identity to core.
Run: python manage.py move_user_tables_to_core
Then: python manage.py migrate core 0025_user_tables_back_to_core --database=core --fake
"""
from django.core.management.base import BaseCommand
from django.db import connections


class Command(BaseCommand):
    help = "Move auth/users tables from identity to core schema"

    def handle(self, *args, **options):
        self.stdout.write("Getting connection...")
        conn = connections["default"]
        self.stdout.write("Getting cursor...")
        c = conn.cursor()
        self.stdout.write("Starting migration...")
        try:
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
                    self.stdout.write(f"  Skip {t} (not in identity)")
                    continue
                self.stdout.write(f"  Moving {t}...")
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
                    self.stdout.write(f"  Dropped identity.{t}")
                except Exception as e:
                    raise RuntimeError(f"Failed dropping identity.{t}: {e}") from e
        finally:
            c.close()
        self.stdout.write(self.style.SUCCESS("Done. Run: python manage.py migrate core 0025_user_tables_back_to_core --database=core --fake"))
