"""
Fix auth_user and users_userprofile id sequences when out of sync (causes "null value in column id" on INSERT).
Run after pg_restore, data imports, or when bulk user creation fails with null id.
Usage: python manage.py fix_auth_user_sequence
"""
from django.core.management.base import BaseCommand
from django.db import connections


def _ensure_sequence(cursor, table_name, schema="core"):
    qualified = f"{schema}.{table_name}"
    cursor.execute("SELECT pg_get_serial_sequence(%s, 'id')", [qualified])
    row = cursor.fetchone()
    seq = row[0] if row else None
    seq_name = f"{schema}.{table_name}_id_seq"
    if not seq:
        cursor.execute(
            f"CREATE SEQUENCE IF NOT EXISTS {seq_name} OWNED BY {qualified}.id"
        )
        cursor.execute(
            f"ALTER TABLE {qualified} ALTER COLUMN id SET DEFAULT nextval(%s::regclass)",
            [seq_name],
        )
        seq = seq_name
    cursor.execute(f"SELECT COALESCE(MAX(id), 0) FROM {qualified}")
    max_id = cursor.fetchone()[0]
    cursor.execute("SELECT setval(%s, %s, true)", [seq, max_id])
    return max_id + 1


class Command(BaseCommand):
    help = "Reset auth_user and users_userprofile id sequences (fixes null id constraint violation)"

    def handle(self, *args, **options):
        conn = connections["core"]
        with conn.cursor() as c:
            for table in ["auth_user", "users_userprofile", "auth_user_groups"]:
                next_id = _ensure_sequence(c, table)
                self.stdout.write(
                    self.style.SUCCESS(f"{table}: next id will be {next_id}")
                )
