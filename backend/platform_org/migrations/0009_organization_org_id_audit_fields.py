"""
Add org_id (customer-facing 3+ digit ID starting at 100),
created_by, changed_by, changed_at to organizations.
Uses raw SQL since the table was created via RunSQL, not CreateModel.
"""
from django.db import migrations


SQL_FORWARD = """
-- Add org_id column (nullable first for backfill)
ALTER TABLE org.organizations
    ADD COLUMN IF NOT EXISTS org_id INTEGER UNIQUE;

-- Backfill existing rows with sequential IDs starting at 100
WITH numbered AS (
    SELECT id, ROW_NUMBER() OVER (ORDER BY created_at) + 99 AS new_org_id
    FROM org.organizations
    WHERE org_id IS NULL
)
UPDATE org.organizations
SET org_id = numbered.new_org_id
FROM numbered
WHERE org.organizations.id = numbered.id;

-- Make org_id NOT NULL
ALTER TABLE org.organizations
    ALTER COLUMN org_id SET NOT NULL;

-- Add audit trail columns
ALTER TABLE org.organizations
    ADD COLUMN IF NOT EXISTS created_by UUID,
    ADD COLUMN IF NOT EXISTS changed_by UUID,
    ADD COLUMN IF NOT EXISTS changed_at TIMESTAMP WITH TIME ZONE;

-- Create sequence for auto-assigning org_id to new rows
CREATE SEQUENCE IF NOT EXISTS org.organizations_org_id_seq
    START WITH 100 OWNED BY org.organizations.org_id;

-- Advance the sequence past any existing org_ids
SELECT setval(
    'org.organizations_org_id_seq',
    GREATEST(COALESCE((SELECT MAX(org_id) FROM org.organizations), 99), 99) + 1,
    false
);

-- Set default so new inserts auto-get an org_id
ALTER TABLE org.organizations
    ALTER COLUMN org_id SET DEFAULT nextval('org.organizations_org_id_seq');
"""

SQL_REVERSE = """
ALTER TABLE org.organizations
    DROP COLUMN IF EXISTS org_id,
    DROP COLUMN IF EXISTS created_by,
    DROP COLUMN IF EXISTS changed_by,
    DROP COLUMN IF EXISTS changed_at;
DROP SEQUENCE IF EXISTS org.organizations_org_id_seq;
"""


class Migration(migrations.Migration):

    dependencies = [
        ("platform_org", "0008_countries_to_org"),
    ]

    operations = [
        migrations.RunSQL(SQL_FORWARD, SQL_REVERSE),
    ]
