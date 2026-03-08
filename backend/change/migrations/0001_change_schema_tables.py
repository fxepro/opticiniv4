# Create change schema tables per Platform design DB.
# Depends on core.0001 (schemas exist). Tables in schema change via RunSQL.

from django.db import migrations

SQL = """
CREATE TABLE change.change_events (
    id UUID PRIMARY KEY,
    asset_id UUID NOT NULL,
    change_type VARCHAR(64) NOT NULL,
    detected_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    risk_score NUMERIC(5,2)
);
CREATE INDEX ON change.change_events (asset_id);

CREATE TABLE change.deployments (
    id UUID PRIMARY KEY,
    application_id UUID NOT NULL,
    deployed_at TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR(32) NOT NULL
);
CREATE INDEX ON change.deployments (application_id);

CREATE TABLE change.change_requests (
    id UUID PRIMARY KEY,
    title VARCHAR(512) NOT NULL,
    approval_status VARCHAR(32) NOT NULL
);

CREATE TABLE change.change_approvals (
    id UUID PRIMARY KEY,
    change_request_id UUID NOT NULL,
    approved_by UUID NOT NULL
);
CREATE INDEX ON change.change_approvals (change_request_id);

CREATE TABLE change.change_incident_links (
    id UUID PRIMARY KEY,
    change_event_id UUID NOT NULL,
    incident_id UUID NOT NULL
);
CREATE INDEX ON change.change_incident_links (change_event_id);
CREATE INDEX ON change.change_incident_links (incident_id);
"""

REVERSE_SQL = """
DROP TABLE IF EXISTS change.change_incident_links CASCADE;
DROP TABLE IF EXISTS change.change_approvals CASCADE;
DROP TABLE IF EXISTS change.change_requests CASCADE;
DROP TABLE IF EXISTS change.deployments CASCADE;
DROP TABLE IF EXISTS change.change_events CASCADE;
"""


class Migration(migrations.Migration):

    initial = True
    dependencies = [
        ("core", "0001_create_platform_schemas"),
    ]

    operations = [
        migrations.RunSQL(SQL, REVERSE_SQL),
    ]
