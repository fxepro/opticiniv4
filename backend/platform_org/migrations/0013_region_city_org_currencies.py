"""
Add city column to organization_regions.
Create org_currencies table for per-org enabled currencies.
"""
from django.db import migrations


SQL_FORWARD = """
-- Add city to organization_regions
ALTER TABLE org.organization_regions
    ADD COLUMN IF NOT EXISTS city VARCHAR(255) NOT NULL DEFAULT '';

-- Org-enabled currencies
CREATE TABLE IF NOT EXISTS org.org_currencies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL,
    currency_id UUID NOT NULL REFERENCES org.currencies(id) ON DELETE RESTRICT,
    is_default BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    UNIQUE(organization_id, currency_id)
);
CREATE INDEX IF NOT EXISTS org_curr_org_id_idx ON org.org_currencies (organization_id);
"""

SQL_REVERSE = """
DROP TABLE IF EXISTS org.org_currencies CASCADE;
ALTER TABLE org.organization_regions DROP COLUMN IF EXISTS city;
"""


class Migration(migrations.Migration):

    dependencies = [
        ("platform_org", "0012_organization_profile_fields"),
    ]

    operations = [
        migrations.RunSQL(SQL_FORWARD, SQL_REVERSE),
    ]
