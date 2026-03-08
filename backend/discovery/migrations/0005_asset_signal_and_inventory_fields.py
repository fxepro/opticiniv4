# Asset Inventory Improvements: add signal and inventory fields to discovery.assets.
# See docs/Database design/Discovery-Schema-Tables-and-Columns.md.

from django.db import migrations

SQL = """
ALTER TABLE discovery.assets ADD COLUMN IF NOT EXISTS source_type VARCHAR(32) NOT NULL DEFAULT '';
ALTER TABLE discovery.assets ADD COLUMN IF NOT EXISTS provider VARCHAR(64) NOT NULL DEFAULT '';
ALTER TABLE discovery.assets ADD COLUMN IF NOT EXISTS account_id UUID;
ALTER TABLE discovery.assets ADD COLUMN IF NOT EXISTS last_seen_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE discovery.assets ADD COLUMN IF NOT EXISTS last_changed_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE discovery.assets ADD COLUMN IF NOT EXISTS criticality VARCHAR(32) NOT NULL DEFAULT '';
ALTER TABLE discovery.assets ADD COLUMN IF NOT EXISTS in_scope_soc2 BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE discovery.assets ADD COLUMN IF NOT EXISTS scope_flags JSONB;
ALTER TABLE discovery.assets ADD COLUMN IF NOT EXISTS owner_display VARCHAR(255) NOT NULL DEFAULT '';
ALTER TABLE discovery.assets ADD COLUMN IF NOT EXISTS attributes_public JSONB;
ALTER TABLE discovery.assets ADD COLUMN IF NOT EXISTS attributes_internal JSONB;
ALTER TABLE discovery.assets ADD COLUMN IF NOT EXISTS region VARCHAR(128);
ALTER TABLE discovery.assets ADD COLUMN IF NOT EXISTS site VARCHAR(128);
ALTER TABLE discovery.assets ADD COLUMN IF NOT EXISTS application_id UUID;
ALTER TABLE discovery.assets ADD COLUMN IF NOT EXISTS depends_on_count INTEGER;
ALTER TABLE discovery.assets ADD COLUMN IF NOT EXISTS used_by_count INTEGER;
ALTER TABLE discovery.assets ADD COLUMN IF NOT EXISTS provider_resource_id VARCHAR(512);
ALTER TABLE discovery.assets ADD COLUMN IF NOT EXISTS hostname VARCHAR(512);
ALTER TABLE discovery.assets ADD COLUMN IF NOT EXISTS primary_ip VARCHAR(64);
ALTER TABLE discovery.assets ADD COLUMN IF NOT EXISTS k8s_cluster VARCHAR(255);
ALTER TABLE discovery.assets ADD COLUMN IF NOT EXISTS k8s_namespace VARCHAR(255);
ALTER TABLE discovery.assets ADD COLUMN IF NOT EXISTS connector_id UUID;
ALTER TABLE discovery.assets ADD COLUMN IF NOT EXISTS data_classification VARCHAR(64);
ALTER TABLE discovery.assets ADD COLUMN IF NOT EXISTS confidence_score NUMERIC(3,2);
ALTER TABLE discovery.assets ADD COLUMN IF NOT EXISTS tags_preview JSONB;

CREATE INDEX IF NOT EXISTS discovery_assets_account_id_idx ON discovery.assets (account_id);
CREATE INDEX IF NOT EXISTS discovery_assets_last_seen_at_idx ON discovery.assets (last_seen_at);
CREATE INDEX IF NOT EXISTS discovery_assets_in_scope_soc2_idx ON discovery.assets (in_scope_soc2) WHERE in_scope_soc2 = TRUE;
CREATE INDEX IF NOT EXISTS discovery_assets_connector_id_idx ON discovery.assets (connector_id);
CREATE INDEX IF NOT EXISTS discovery_assets_application_id_idx ON discovery.assets (application_id);
CREATE INDEX IF NOT EXISTS discovery_assets_region_idx ON discovery.assets (region);
"""

REVERSE_SQL = """
DROP INDEX IF EXISTS discovery.discovery_assets_region_idx;
DROP INDEX IF EXISTS discovery.discovery_assets_application_id_idx;
DROP INDEX IF EXISTS discovery.discovery_assets_connector_id_idx;
DROP INDEX IF EXISTS discovery.discovery_assets_in_scope_soc2_idx;
DROP INDEX IF EXISTS discovery.discovery_assets_last_seen_at_idx;
DROP INDEX IF EXISTS discovery.discovery_assets_account_id_idx;

ALTER TABLE discovery.assets DROP COLUMN IF EXISTS source_type;
ALTER TABLE discovery.assets DROP COLUMN IF EXISTS provider;
ALTER TABLE discovery.assets DROP COLUMN IF EXISTS account_id;
ALTER TABLE discovery.assets DROP COLUMN IF EXISTS last_seen_at;
ALTER TABLE discovery.assets DROP COLUMN IF EXISTS last_changed_at;
ALTER TABLE discovery.assets DROP COLUMN IF EXISTS criticality;
ALTER TABLE discovery.assets DROP COLUMN IF EXISTS in_scope_soc2;
ALTER TABLE discovery.assets DROP COLUMN IF EXISTS scope_flags;
ALTER TABLE discovery.assets DROP COLUMN IF EXISTS owner_display;
ALTER TABLE discovery.assets DROP COLUMN IF EXISTS attributes_public;
ALTER TABLE discovery.assets DROP COLUMN IF EXISTS attributes_internal;
ALTER TABLE discovery.assets DROP COLUMN IF EXISTS region;
ALTER TABLE discovery.assets DROP COLUMN IF EXISTS site;
ALTER TABLE discovery.assets DROP COLUMN IF EXISTS application_id;
ALTER TABLE discovery.assets DROP COLUMN IF EXISTS depends_on_count;
ALTER TABLE discovery.assets DROP COLUMN IF EXISTS used_by_count;
ALTER TABLE discovery.assets DROP COLUMN IF EXISTS provider_resource_id;
ALTER TABLE discovery.assets DROP COLUMN IF EXISTS hostname;
ALTER TABLE discovery.assets DROP COLUMN IF EXISTS primary_ip;
ALTER TABLE discovery.assets DROP COLUMN IF EXISTS k8s_cluster;
ALTER TABLE discovery.assets DROP COLUMN IF EXISTS k8s_namespace;
ALTER TABLE discovery.assets DROP COLUMN IF EXISTS connector_id;
ALTER TABLE discovery.assets DROP COLUMN IF EXISTS data_classification;
ALTER TABLE discovery.assets DROP COLUMN IF EXISTS confidence_score;
ALTER TABLE discovery.assets DROP COLUMN IF EXISTS tags_preview;
"""


class Migration(migrations.Migration):

    dependencies = [
        ("discovery", "0004_asset_customer_key"),
    ]

    operations = [
        migrations.RunSQL(SQL, REVERSE_SQL),
    ]
