"""
Drop compliance/evidence/audit tables from public schema (single source of truth is in compliance/evidence/audit schemas).
Run: python manage.py drop_public_compliance_tables
Safe to run multiple times (IF EXISTS). Use --dry-run to only list tables.
"""
from django.core.management.base import BaseCommand
from django.db import connection


TABLES = [
    "compliance_audit_framework_mappings",
    "compliance_audit_auditors",
    "compliance_audit_findings",
    "compliance_audits",
    "compliance_evidence_control_mappings",
    "compliance_evidence",
    "compliance_control_evidence_requirements",
    "compliance_control_framework_mappings",
    "compliance_controls",
    "compliance_frameworks",
]


class Command(BaseCommand):
    help = "Drop compliance/evidence/audit tables from public schema (data lives in compliance/evidence/audit schemas)."

    def add_arguments(self, parser):
        parser.add_argument(
            "--dry-run",
            action="store_true",
            help="Only list tables in public and in schemas; do not drop.",
        )

    def handle(self, *args, **options):
        dry_run = options["dry_run"]
        with connection.cursor() as cursor:
            # List tables in public
            cursor.execute("""
                SELECT tablename FROM pg_tables
                WHERE schemaname = 'public' AND tablename IN %s
                ORDER BY tablename
            """, (tuple(TABLES),))
            in_public = [r[0] for r in cursor.fetchall()]

            # List tables in compliance / evidence / audit
            cursor.execute("""
                SELECT schemaname, tablename FROM pg_tables
                WHERE schemaname IN ('compliance', 'evidence', 'audit')
                ORDER BY schemaname, tablename
            """)
            in_schemas = cursor.fetchall()

        self.stdout.write("Tables in public (to drop): " + (", ".join(in_public) if in_public else "none"))
        self.stdout.write("Tables in compliance/evidence/audit: " + str(len(in_schemas)))
        for schema, table in in_schemas:
            self.stdout.write("  %s.%s" % (schema, table))

        if dry_run:
            self.stdout.write(self.style.WARNING("Dry run: no tables dropped."))
            return

        if not in_public:
            self.stdout.write(self.style.SUCCESS("No public compliance/evidence/audit tables to drop."))
            return

        with connection.cursor() as cursor:
            for table in TABLES:
                cursor.execute("DROP TABLE IF EXISTS public.%s CASCADE" % table)
                self.stdout.write("Dropped public.%s" % table)
        self.stdout.write(self.style.SUCCESS("Done. Public tables dropped."))
