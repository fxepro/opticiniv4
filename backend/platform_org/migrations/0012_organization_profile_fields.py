"""
Add full org profile columns to organizations table.
"""
from django.db import migrations


SQL_FORWARD = """
ALTER TABLE org.organizations
    ADD COLUMN IF NOT EXISTS legal_name VARCHAR(255) NOT NULL DEFAULT '',
    ADD COLUMN IF NOT EXISTS display_name VARCHAR(255) NOT NULL DEFAULT '',
    ADD COLUMN IF NOT EXISTS primary_domain VARCHAR(255) NOT NULL DEFAULT '',
    ADD COLUMN IF NOT EXISTS secondary_domains TEXT NOT NULL DEFAULT '',
    ADD COLUMN IF NOT EXISTS physical_address TEXT NOT NULL DEFAULT '',
    ADD COLUMN IF NOT EXISTS industry VARCHAR(120) NOT NULL DEFAULT '',
    ADD COLUMN IF NOT EXISTS jurisdiction_country VARCHAR(10) NOT NULL DEFAULT '',
    ADD COLUMN IF NOT EXISTS jurisdiction_state VARCHAR(10) NOT NULL DEFAULT '',
    ADD COLUMN IF NOT EXISTS timezone VARCHAR(64) NOT NULL DEFAULT 'UTC+00:00',
    ADD COLUMN IF NOT EXISTS currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    ADD COLUMN IF NOT EXISTS fiscal_year_start_month SMALLINT NOT NULL DEFAULT 1,
    ADD COLUMN IF NOT EXISTS primary_contact_name VARCHAR(255) NOT NULL DEFAULT '',
    ADD COLUMN IF NOT EXISTS primary_contact_email VARCHAR(255) NOT NULL DEFAULT '',
    ADD COLUMN IF NOT EXISTS billing_contact_email VARCHAR(255) NOT NULL DEFAULT '',
    ADD COLUMN IF NOT EXISTS security_contact_email VARCHAR(255) NOT NULL DEFAULT '',
    ADD COLUMN IF NOT EXISTS data_residency_region VARCHAR(64) NOT NULL DEFAULT '',
    ADD COLUMN IF NOT EXISTS default_environment_id UUID,
    ADD COLUMN IF NOT EXISTS enforce_mfa BOOLEAN NOT NULL DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS sso_enabled BOOLEAN NOT NULL DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS status VARCHAR(20) NOT NULL DEFAULT 'active';
"""

SQL_REVERSE = """
ALTER TABLE org.organizations
    DROP COLUMN IF EXISTS legal_name,
    DROP COLUMN IF EXISTS display_name,
    DROP COLUMN IF EXISTS primary_domain,
    DROP COLUMN IF EXISTS secondary_domains,
    DROP COLUMN IF EXISTS physical_address,
    DROP COLUMN IF EXISTS industry,
    DROP COLUMN IF EXISTS jurisdiction_country,
    DROP COLUMN IF EXISTS jurisdiction_state,
    DROP COLUMN IF EXISTS timezone,
    DROP COLUMN IF EXISTS currency,
    DROP COLUMN IF EXISTS fiscal_year_start_month,
    DROP COLUMN IF EXISTS primary_contact_name,
    DROP COLUMN IF EXISTS primary_contact_email,
    DROP COLUMN IF EXISTS billing_contact_email,
    DROP COLUMN IF EXISTS security_contact_email,
    DROP COLUMN IF EXISTS data_residency_region,
    DROP COLUMN IF EXISTS default_environment_id,
    DROP COLUMN IF EXISTS enforce_mfa,
    DROP COLUMN IF EXISTS sso_enabled,
    DROP COLUMN IF EXISTS status;
"""


class Migration(migrations.Migration):

    dependencies = [
        ("platform_org", "0011_states_seed"),
    ]

    operations = [
        migrations.RunSQL(SQL_FORWARD, SQL_REVERSE),
    ]
