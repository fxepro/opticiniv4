"""List schemas and core tables."""
from django.core.management.base import BaseCommand
from django.db import connections


class Command(BaseCommand):
    def handle(self, *args, **options):
        with connections["default"].cursor() as c:
            c.execute("""
                SELECT schema_name FROM information_schema.schemata
                WHERE schema_name NOT IN ('pg_catalog','information_schema','pg_toast')
                ORDER BY 1
            """)
            self.stdout.write("Schemas: " + ", ".join(r[0] for r in c.fetchall()))
            c.execute("""
                SELECT table_schema, table_name FROM information_schema.tables
                WHERE table_schema IN ('core', 'public')
                ORDER BY 1, 2
            """)
            for s, t in c.fetchall():
                self.stdout.write(f"  {s}.{t}")
