"""
List all tables in the database by schema.
Usage: python manage.py show_tables
"""
from django.core.management.base import BaseCommand
from django.db import connections


class Command(BaseCommand):
    help = "List all tables in the database by schema"

    def handle(self, *args, **options):
        with connections["default"].cursor() as c:
            c.execute("""
                SELECT table_schema, table_name
                FROM information_schema.tables
                WHERE table_schema NOT IN ('pg_catalog', 'information_schema', 'pg_toast')
                ORDER BY table_schema, table_name
            """)
            rows = c.fetchall()

        by_schema = {}
        for schema, table in rows:
            by_schema.setdefault(schema, []).append(table)

        for schema in sorted(by_schema.keys()):
            tables = sorted(by_schema[schema])
            self.stdout.write(f"\n{schema} ({len(tables)} tables):")
            for t in tables:
                self.stdout.write(f"  - {t}")

        self.stdout.write(f"\nTotal: {len(rows)} tables in {len(by_schema)} schemas")
