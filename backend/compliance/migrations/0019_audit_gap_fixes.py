"""
Audit schema gap fixes:
  - audit_framework_mappings: add framework_version_id, framework_version_name
  - audit_findings: add requirement_id, requirement_code, exception_id (+ indexes)

Uses SeparateDatabaseAndState so Django only updates its model state (no ORM DDL).
All physical DDL runs via RunPython on the 'audit' database alias only.
"""
from django.db import migrations, models


def add_audit_columns(apps, schema_editor):
    if schema_editor.connection.alias != "audit":
        return
    with schema_editor.connection.cursor() as cursor:
        cursor.execute("""
            ALTER TABLE audit_framework_mappings
                ADD COLUMN IF NOT EXISTS framework_version_id UUID NULL,
                ADD COLUMN IF NOT EXISTS framework_version_name VARCHAR(100) NOT NULL DEFAULT '';
        """)
        cursor.execute("""
            ALTER TABLE audit_findings
                ADD COLUMN IF NOT EXISTS requirement_id UUID NULL,
                ADD COLUMN IF NOT EXISTS requirement_code VARCHAR(50) NOT NULL DEFAULT '',
                ADD COLUMN IF NOT EXISTS exception_id UUID NULL;
        """)
        cursor.execute(
            "CREATE INDEX IF NOT EXISTS audit_findings_requirement_id_idx ON audit_findings (requirement_id);"
        )
        cursor.execute(
            "CREATE INDEX IF NOT EXISTS audit_findings_exception_id_idx ON audit_findings (exception_id);"
        )


def noop_reverse(apps, schema_editor):
    pass


class Migration(migrations.Migration):

    dependencies = [
        ("compliance", "0018_seed_policy_templates_from_csv"),
    ]

    operations = [
        # Update Django model state only — no DB DDL (tables live in 'audit' schema DB)
        migrations.SeparateDatabaseAndState(
            database_operations=[],
            state_operations=[
                migrations.AddField(
                    model_name="complianceauditframeworkmapping",
                    name="framework_version_id",
                    field=models.UUIDField(null=True, blank=True),
                ),
                migrations.AddField(
                    model_name="complianceauditframeworkmapping",
                    name="framework_version_name",
                    field=models.CharField(max_length=100, blank=True),
                ),
                migrations.AddField(
                    model_name="complianceauditfinding",
                    name="requirement_id",
                    field=models.UUIDField(null=True, blank=True),
                ),
                migrations.AddField(
                    model_name="complianceauditfinding",
                    name="requirement_code",
                    field=models.CharField(max_length=50, blank=True),
                ),
                migrations.AddField(
                    model_name="complianceauditfinding",
                    name="exception_id",
                    field=models.UUIDField(null=True, blank=True),
                ),
            ],
        ),
        # Real DDL on the audit database
        migrations.RunPython(add_audit_columns, noop_reverse),
    ]
