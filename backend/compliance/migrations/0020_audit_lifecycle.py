"""
Audit lifecycle:
  - Add audit_status_history table (audit schema)
  - Add choices constraints to ComplianceAudit.type and .status (model-level only)

Uses SeparateDatabaseAndState so Django only updates its model state (no ORM DDL).
All physical DDL runs via RunPython on the 'audit' database alias only.
"""
from django.db import migrations, models
import django.db.models.deletion
import uuid


def create_audit_status_history(apps, schema_editor):
    if schema_editor.connection.alias != "audit":
        return
    with schema_editor.connection.cursor() as cursor:
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS audit_status_history (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                audit_id UUID NOT NULL REFERENCES audits(id) ON DELETE CASCADE,
                from_status VARCHAR(20) NOT NULL DEFAULT '',
                to_status VARCHAR(20) NOT NULL,
                changed_by_id INTEGER NULL,
                notes TEXT NOT NULL DEFAULT '',
                changed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
            );
        """)
        cursor.execute(
            "CREATE INDEX IF NOT EXISTS audit_status_history_audit_idx ON audit_status_history (audit_id);"
        )
        cursor.execute(
            "CREATE INDEX IF NOT EXISTS audit_status_history_changed_at_idx ON audit_status_history (changed_at);"
        )


def noop_reverse(apps, schema_editor):
    pass


class Migration(migrations.Migration):

    dependencies = [
        ("compliance", "0019_audit_gap_fixes"),
    ]

    operations = [
        # Update Django model state only — no DB DDL
        migrations.SeparateDatabaseAndState(
            database_operations=[],
            state_operations=[
                migrations.AlterField(
                    model_name="complianceaudit",
                    name="type",
                    field=models.CharField(
                        max_length=30,
                        choices=[
                            ("internal", "Internal"),
                            ("external", "External"),
                            ("readiness", "Readiness"),
                            ("surveillance", "Surveillance"),
                        ],
                    ),
                ),
                migrations.AlterField(
                    model_name="complianceaudit",
                    name="status",
                    field=models.CharField(
                        max_length=20,
                        default="planned",
                        choices=[
                            ("planned", "Planned"),
                            ("in_progress", "In Progress"),
                            ("evidence_review", "Evidence Review"),
                            ("findings_review", "Findings Review"),
                            ("completed", "Completed"),
                            ("cancelled", "Cancelled"),
                        ],
                    ),
                ),
                migrations.CreateModel(
                    name="AuditStatusHistory",
                    fields=[
                        ("id", models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, serialize=False)),
                        ("from_status", models.CharField(max_length=20, blank=True)),
                        ("to_status", models.CharField(max_length=20)),
                        ("notes", models.TextField(blank=True)),
                        ("changed_at", models.DateTimeField(auto_now_add=True)),
                        (
                            "audit",
                            models.ForeignKey(
                                db_column="audit_id",
                                on_delete=django.db.models.deletion.CASCADE,
                                related_name="status_history",
                                to="compliance.complianceaudit",
                            ),
                        ),
                        (
                            "changed_by",
                            models.ForeignKey(
                                null=True,
                                blank=True,
                                on_delete=django.db.models.deletion.SET_NULL,
                                related_name="audit_status_changes",
                                to="auth.user",
                            ),
                        ),
                    ],
                    options={
                        "db_table": "audit_status_history",
                        "ordering": ["changed_at"],
                    },
                ),
            ],
        ),
        # Real DDL on the audit database
        migrations.RunPython(create_audit_status_history, noop_reverse),
    ]
