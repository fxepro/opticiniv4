# Create org.organizations, org.teams, org.environments, org.org_connectors,
# org.org_connector_module_scope, org.organization_regions.
# Org-scoped data moves from core schema to org schema.

from django.db import migrations

SQL = """
CREATE TABLE org.organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    tier VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE org.teams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES org.organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL
);
CREATE INDEX ON org.teams (organization_id);

CREATE TABLE org.environments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES org.organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL
);
CREATE INDEX ON org.environments (organization_id);

CREATE TABLE org.org_connectors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL,
    name VARCHAR(255) NOT NULL,
    connector_type VARCHAR(64) NOT NULL,
    governance_set SMALLINT NOT NULL DEFAULT 3,
    config JSONB DEFAULT '{}',
    credentials_ref VARCHAR(255) DEFAULT '',
    last_synced_at TIMESTAMP WITH TIME ZONE,
    status VARCHAR(32) DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);
CREATE INDEX org_connect_organiz_98edd7_idx ON org.org_connectors (organization_id, connector_type);

CREATE TABLE org.org_connector_module_scope (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_connector_id UUID NOT NULL REFERENCES org.org_connectors(id) ON DELETE CASCADE,
    module VARCHAR(64) NOT NULL,
    UNIQUE(org_connector_id, module)
);
CREATE INDEX org_connect_org_con_5236ab_idx ON org.org_connector_module_scope (org_connector_id, module);

CREATE TABLE org.organization_regions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL,
    country_id UUID NOT NULL REFERENCES core.countries(id) ON DELETE RESTRICT,
    name VARCHAR(255) NOT NULL,
    primary_contact_name VARCHAR(255) DEFAULT '',
    primary_contact_email VARCHAR(255) DEFAULT '',
    address TEXT DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    UNIQUE(organization_id, country_id)
);
CREATE INDEX organizatio_organiz_a52f2f_idx ON org.organization_regions (organization_id);
"""

REVERSE_SQL = """
DROP TABLE IF EXISTS org.organization_regions CASCADE;
DROP TABLE IF EXISTS org.org_connector_module_scope CASCADE;
DROP TABLE IF EXISTS org.org_connectors CASCADE;
DROP TABLE IF EXISTS org.environments CASCADE;
DROP TABLE IF EXISTS org.teams CASCADE;
DROP TABLE IF EXISTS org.organizations CASCADE;
"""


class Migration(migrations.Migration):

    dependencies = [
        ("platform_org", "0005_ensure_department_code"),
    ]

    operations = [
        migrations.RunSQL(SQL, REVERSE_SQL),
    ]
