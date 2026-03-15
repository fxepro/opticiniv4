"""
Multi-tenant: Add FK from audit.audits.organization_id to org.organizations(id).
Enforces that every audit belongs to a valid org. ON DELETE SET NULL for legacy nulls.
Skips if audit.audits or org.organizations does not exist (bootstrap order).
"""
from django.db import migrations


SQL_FORWARD = """
-- Multi-tenant: audit.audits.organization_id -> org.organizations(id)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'audit' AND table_name = 'audits')
       AND EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'org' AND table_name = 'organizations')
       AND NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_audits_organization')
    THEN
        ALTER TABLE audit.audits
            ADD CONSTRAINT fk_audits_organization
            FOREIGN KEY (organization_id)
            REFERENCES org.organizations(id)
            ON DELETE SET NULL;
    END IF;
END $$;
"""

SQL_REVERSE = """
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'audit' AND table_name = 'audits') THEN
        ALTER TABLE audit.audits DROP CONSTRAINT IF EXISTS fk_audits_organization;
    END IF;
END $$;
"""


class Migration(migrations.Migration):

    dependencies = [
        ("compliance", "0020_audit_lifecycle"),
    ]

    operations = [
        migrations.RunSQL(SQL_FORWARD, SQL_REVERSE),
    ]
