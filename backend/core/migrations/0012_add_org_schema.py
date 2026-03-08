# Add org schema for organizational structure (personnel, departments, roles).
# See docs/Database design/Org Schema.

from django.db import migrations

SQL = "CREATE SCHEMA IF NOT EXISTS org;"
REVERSE_SQL = "DROP SCHEMA IF EXISTS org CASCADE;"


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0011_compliance_add_control_templates_evidence_templates_assignments_tasks"),
    ]

    operations = [
        migrations.RunSQL(SQL, REVERSE_SQL),
    ]
