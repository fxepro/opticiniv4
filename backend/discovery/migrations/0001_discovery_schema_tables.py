# Create discovery schema tables per Platform design DB.
# Depends on core.0001 (schemas exist). Tables created in schema discovery via RunSQL.

from django.db import migrations

SQL = """
CREATE TABLE discovery.accounts (
    id UUID PRIMARY KEY,
    organization_id UUID NOT NULL,
    name VARCHAR(255) NOT NULL,
    provider VARCHAR(64) NOT NULL,
    external_id VARCHAR(255) NOT NULL DEFAULT ''
);
CREATE INDEX ON discovery.accounts (organization_id);

CREATE TABLE discovery.connectors (
    id UUID PRIMARY KEY,
    organization_id UUID NOT NULL,
    name VARCHAR(255) NOT NULL,
    connector_type VARCHAR(64) NOT NULL,
    last_sync_at TIMESTAMP WITH TIME ZONE
);
CREATE INDEX ON discovery.connectors (organization_id);

CREATE TABLE discovery.assets (
    id UUID PRIMARY KEY,
    organization_id UUID NOT NULL,
    name VARCHAR(512) NOT NULL,
    asset_type VARCHAR(64) NOT NULL,
    environment_id UUID,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);
CREATE INDEX ON discovery.assets (organization_id);

CREATE TABLE discovery.asset_attributes (
    id UUID PRIMARY KEY,
    asset_id UUID NOT NULL REFERENCES discovery.assets(id) ON DELETE CASCADE,
    key VARCHAR(255) NOT NULL,
    value TEXT NOT NULL DEFAULT ''
);

CREATE TABLE discovery.asset_relationships (
    id UUID PRIMARY KEY,
    source_asset_id UUID NOT NULL REFERENCES discovery.assets(id) ON DELETE CASCADE,
    target_asset_id UUID NOT NULL REFERENCES discovery.assets(id) ON DELETE CASCADE,
    relationship_type VARCHAR(64) NOT NULL
);

CREATE TABLE discovery.asset_versions (
    id UUID PRIMARY KEY,
    asset_id UUID NOT NULL REFERENCES discovery.assets(id) ON DELETE CASCADE,
    version INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE discovery.asset_changes (
    id UUID PRIMARY KEY,
    asset_id UUID NOT NULL REFERENCES discovery.assets(id) ON DELETE CASCADE,
    change_type VARCHAR(64) NOT NULL,
    detected_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    risk_score NUMERIC(5,2)
);

CREATE TABLE discovery.asset_ownership (
    id UUID PRIMARY KEY,
    asset_id UUID NOT NULL REFERENCES discovery.assets(id) ON DELETE CASCADE,
    team_id UUID,
    user_id UUID
);

CREATE TABLE discovery.asset_tags (
    id UUID PRIMARY KEY,
    asset_id UUID NOT NULL REFERENCES discovery.assets(id) ON DELETE CASCADE,
    key VARCHAR(255) NOT NULL,
    value VARCHAR(512) NOT NULL DEFAULT ''
);

CREATE TABLE discovery.raw_assets (
    id UUID PRIMARY KEY,
    organization_id UUID NOT NULL,
    connector_id UUID,
    external_id VARCHAR(255) NOT NULL,
    ingested_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);
CREATE INDEX ON discovery.raw_assets (organization_id);
"""

REVERSE_SQL = """
DROP TABLE IF EXISTS discovery.raw_assets CASCADE;
DROP TABLE IF EXISTS discovery.asset_tags CASCADE;
DROP TABLE IF EXISTS discovery.asset_ownership CASCADE;
DROP TABLE IF EXISTS discovery.asset_changes CASCADE;
DROP TABLE IF EXISTS discovery.asset_versions CASCADE;
DROP TABLE IF EXISTS discovery.asset_relationships CASCADE;
DROP TABLE IF EXISTS discovery.asset_attributes CASCADE;
DROP TABLE IF EXISTS discovery.assets CASCADE;
DROP TABLE IF EXISTS discovery.connectors CASCADE;
DROP TABLE IF EXISTS discovery.accounts CASCADE;
"""


class Migration(migrations.Migration):

    initial = True
    dependencies = [
        ("core", "0001_create_platform_schemas"),
    ]

    operations = [
        migrations.RunSQL(SQL, REVERSE_SQL),
    ]
