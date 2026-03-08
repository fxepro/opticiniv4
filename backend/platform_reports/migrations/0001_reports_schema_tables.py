# Create reports schema tables per Platform design DB.

from django.db import migrations

SQL = """
CREATE TABLE reports.materialized_asset_summary (
    id UUID PRIMARY KEY,
    asset_id UUID NOT NULL UNIQUE,
    refreshed_at TIMESTAMP WITH TIME ZONE NOT NULL,
    attribute_count INTEGER,
    relationship_count INTEGER,
    total_cost NUMERIC(14,2),
    risk_score NUMERIC(8,2),
    compliance_status VARCHAR(32)
);
CREATE INDEX ON reports.materialized_asset_summary (asset_id);

CREATE TABLE reports.compliance_summary (
    id UUID PRIMARY KEY,
    as_of TIMESTAMP WITH TIME ZONE NOT NULL,
    framework_id UUID,
    organization_id UUID,
    total_controls INTEGER,
    compliant_count INTEGER,
    gap_count INTEGER
);
CREATE INDEX ON reports.compliance_summary (framework_id);
CREATE INDEX ON reports.compliance_summary (organization_id);

CREATE TABLE reports.risk_trends (
    id UUID PRIMARY KEY,
    snapshot_date DATE NOT NULL,
    asset_id UUID,
    organization_id UUID,
    composite_score NUMERIC(8,2),
    trend_direction VARCHAR(16)
);
CREATE INDEX ON reports.risk_trends (snapshot_date);
CREATE INDEX ON reports.risk_trends (asset_id);
CREATE INDEX ON reports.risk_trends (organization_id);
"""

REVERSE_SQL = """
DROP TABLE IF EXISTS reports.risk_trends CASCADE;
DROP TABLE IF EXISTS reports.compliance_summary CASCADE;
DROP TABLE IF EXISTS reports.materialized_asset_summary CASCADE;
"""


class Migration(migrations.Migration):

    initial = True
    dependencies = [
        ("core", "0001_create_platform_schemas"),
    ]

    operations = [
        migrations.RunSQL(SQL, REVERSE_SQL),
    ]
