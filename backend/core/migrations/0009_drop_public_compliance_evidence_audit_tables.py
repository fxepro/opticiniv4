# Drop public compliance/evidence/audit tables after cutover to schema tables (single source of truth).

from django.db import migrations

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
        ("core", "0008_copy_compliance_evidence_audit_to_schemas"),
    ]

    operations = [
        migrations.RunSQL(SQL, migrations.RunSQL.noop),
    ]
