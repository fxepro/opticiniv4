# Idempotent: drop public compliance/evidence/audit tables if they still exist (single source of truth in schemas).

from django.db import migrations

# Drop in reverse dependency order. Use IF EXISTS so safe to run multiple times.
SQL = """
DROP TABLE IF EXISTS public.compliance_audit_framework_mappings CASCADE;
DROP TABLE IF EXISTS public.compliance_audit_auditors CASCADE;
DROP TABLE IF EXISTS public.compliance_audit_findings CASCADE;
DROP TABLE IF EXISTS public.compliance_audits CASCADE;
DROP TABLE IF EXISTS public.compliance_evidence_control_mappings CASCADE;
DROP TABLE IF EXISTS public.compliance_evidence CASCADE;
DROP TABLE IF EXISTS public.compliance_control_evidence_requirements CASCADE;
DROP TABLE IF EXISTS public.compliance_control_framework_mappings CASCADE;
DROP TABLE IF EXISTS public.compliance_controls CASCADE;
DROP TABLE IF EXISTS public.compliance_frameworks CASCADE;
"""


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0009_drop_public_compliance_evidence_audit_tables"),
    ]

    operations = [
        migrations.RunSQL(SQL, migrations.RunSQL.noop),
    ]
