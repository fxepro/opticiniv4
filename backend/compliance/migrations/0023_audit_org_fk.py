"""
Multi-tenant: Add FK from audit.audits.organization_id to org.organizations(id).
Enforces that every audit belongs to a valid org. ON DELETE SET NULL for legacy nulls.
"""
from django.db import migrations


SQL_FORWARD = """
-- Multi-tenant: audit.audits.organization_id -> org.organizations(id)
-- Enforces audit belongs to valid org. Nulls allowed (legacy).
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'fk_audits_organization'
    ) THEN
        ALTER TABLE audit.audits
            ADD CONSTRAINT fk_audits_organization
            FOREIGN KEY (organization_id)
            REFERENCES org.organizations(id)
            ON DELETE SET NULL;
    END IF;
END $$;
"""

SQL_REVERSE = """
ALTER TABLE audit.audits DROP CONSTRAINT IF EXISTS fk_audits_organization;
"""


class Migration(migrations.Migration):

    dependencies = [
        ("compliance", "0020_audit_lifecycle"),
    ]

    operations = [
        migrations.RunSQL(SQL_FORWARD, SQL_REVERSE),
    ]
