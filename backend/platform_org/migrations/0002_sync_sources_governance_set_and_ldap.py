# Add governance_set (Set 1) and ldap to org.sync_sources. See Account Governance Rules.

from django.db import migrations

# Add column; then extend source_type check to include 'ldap'.
# PostgreSQL may name the check constraint sync_sources_source_type_check (table_column_check).
SQL = """
ALTER TABLE org.sync_sources
    ADD COLUMN IF NOT EXISTS governance_set SMALLINT NOT NULL DEFAULT 1;

ALTER TABLE org.sync_sources
    DROP CONSTRAINT IF EXISTS sync_sources_source_type_check;

ALTER TABLE org.sync_sources
    ADD CONSTRAINT sync_sources_source_type_check
    CHECK (source_type IN ('okta', 'azure_ad', 'workday', 'csv', 'manual', 'ldap'));
"""

# Reverse: drop new column and restore original check (without ldap).
REVERSE_SQL = """
ALTER TABLE org.sync_sources DROP COLUMN IF EXISTS governance_set;

ALTER TABLE org.sync_sources DROP CONSTRAINT IF EXISTS sync_sources_source_type_check;
ALTER TABLE org.sync_sources
    ADD CONSTRAINT sync_sources_source_type_check
    CHECK (source_type IN ('okta', 'azure_ad', 'workday', 'csv', 'manual'));
"""


class Migration(migrations.Migration):

    dependencies = [
        ("platform_org", "0001_org_schema_tables"),
    ]

    operations = [
        migrations.RunSQL(SQL, REVERSE_SQL),
    ]
