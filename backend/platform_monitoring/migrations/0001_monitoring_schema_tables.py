# Create monitoring schema tables per Platform design DB.

from django.db import migrations

SQL = """
CREATE TABLE monitoring.incidents (
    id UUID PRIMARY KEY,
    asset_id UUID NOT NULL,
    severity VARCHAR(32) NOT NULL,
    opened_at TIMESTAMP WITH TIME ZONE NOT NULL
);
CREATE INDEX ON monitoring.incidents (asset_id);

CREATE TABLE monitoring.alerts (
    id UUID PRIMARY KEY,
    asset_id UUID NOT NULL,
    severity VARCHAR(32) NOT NULL,
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    acknowledged_at TIMESTAMP WITH TIME ZONE,
    incident_id UUID
);
CREATE INDEX ON monitoring.alerts (asset_id);
CREATE INDEX ON monitoring.alerts (incident_id);

CREATE TABLE monitoring.uptime_metrics (
    id UUID PRIMARY KEY,
    asset_id UUID NOT NULL,
    period_start TIMESTAMP WITH TIME ZONE NOT NULL,
    period_end TIMESTAMP WITH TIME ZONE NOT NULL,
    uptime_pct NUMERIC(5,2),
    check_count INTEGER,
    down_count INTEGER
);
CREATE INDEX ON monitoring.uptime_metrics (asset_id);
"""

REVERSE_SQL = """
DROP TABLE IF EXISTS monitoring.uptime_metrics CASCADE;
DROP TABLE IF EXISTS monitoring.alerts CASCADE;
DROP TABLE IF EXISTS monitoring.incidents CASCADE;
"""


class Migration(migrations.Migration):

    initial = True
    dependencies = [
        ("core", "0001_create_platform_schemas"),
    ]

    operations = [
        migrations.RunSQL(SQL, REVERSE_SQL),
    ]
