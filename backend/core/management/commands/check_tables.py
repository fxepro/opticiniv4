"""
Compare Django model tables (expected) vs actual database tables.
Usage: python manage.py check_tables
"""
from django.apps import apps
from django.core.management.base import BaseCommand
from django.db import connections, router


def get_expected_tables():
    """Get (schema, table) for each model based on db router."""
    result = []
    for model in apps.get_models():
        db = router.db_for_write(model)
        if db is None:
            db = "default"
        # Map db alias to schema
        schema_map = {
            "default": "public",
            "core": "core",
            "org": "org",
            "compliance": "compliance",
            "evidence": "evidence",
            "audit": "audit",
            "discovery": "discovery",
            "identity": "identity",
            "change": "change",
            "cost": "cost",
            "risk": "risk",
            "monitoring": "monitoring",
            "reports": "reports",
        }
        schema = schema_map.get(db, db)
        table = model._meta.db_table
        result.append((schema, table, f"{model._meta.app_label}.{model.__name__}"))
    return result


def get_actual_tables(cursor):
    cursor.execute("""
        SELECT table_schema, table_name
        FROM information_schema.tables
        WHERE table_schema NOT IN ('pg_catalog', 'information_schema', 'pg_toast')
    """)
    return set((row[0], row[1]) for row in cursor.fetchall())


class Command(BaseCommand):
    help = "Compare expected vs actual tables"

    def handle(self, *args, **options):
        with connections["default"].cursor() as c:
            actual = get_actual_tables(c)

        expected = get_expected_tables()
        expected_set = set((s, t) for s, t, _ in expected)
        model_by_table = {(s, t): m for s, t, m in expected}

        missing = expected_set - actual
        extra = actual - expected_set

        self.stdout.write("=== MISSING (expected but not in DB) ===")
        for schema, table in sorted(missing):
            model = model_by_table.get((schema, table), "?")
            self.stdout.write(f"  {schema}.{table}  ({model})")

        self.stdout.write("\n=== EXTRA (in DB but not in Django models) ===")
        for schema, table in sorted(extra):
            self.stdout.write(f"  {schema}.{table}")

        self.stdout.write(f"\nExpected: {len(expected_set)} | Actual: {len(actual)} | Missing: {len(missing)} | Extra: {len(extra)}")
