# Create risk schema tables per Platform design DB.

from django.db import migrations

SQL = """
CREATE TABLE risk.asset_risk_scores (
    id UUID PRIMARY KEY,
    asset_id UUID NOT NULL,
    operational_risk NUMERIC(8,2),
    security_risk NUMERIC(8,2),
    compliance_risk NUMERIC(8,2),
    financial_risk NUMERIC(8,2),
    composite_score NUMERIC(8,2)
);
CREATE INDEX ON risk.asset_risk_scores (asset_id);

CREATE TABLE risk.risk_factors (
    id UUID PRIMARY KEY,
    asset_id UUID NOT NULL,
    factor_type VARCHAR(64) NOT NULL,
    source_module VARCHAR(64) NOT NULL
);
CREATE INDEX ON risk.risk_factors (asset_id);

CREATE TABLE risk.risk_register (
    id UUID PRIMARY KEY,
    title VARCHAR(512) NOT NULL,
    severity VARCHAR(32) NOT NULL,
    status VARCHAR(32) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);
"""

REVERSE_SQL = """
DROP TABLE IF EXISTS risk.risk_register CASCADE;
DROP TABLE IF EXISTS risk.risk_factors CASCADE;
DROP TABLE IF EXISTS risk.asset_risk_scores CASCADE;
"""


class Migration(migrations.Migration):

    initial = True
    dependencies = [
        ("core", "0001_create_platform_schemas"),
    ]

    operations = [
        migrations.RunSQL(SQL, REVERSE_SQL),
    ]
