# Create cost schema tables per Platform design DB.

from django.db import migrations

SQL = """
CREATE TABLE cost.billing_accounts (
    id UUID PRIMARY KEY,
    provider VARCHAR(64) NOT NULL
);

CREATE TABLE cost.cost_records (
    id UUID PRIMARY KEY,
    asset_id UUID NOT NULL,
    period_start DATE NOT NULL,
    cost_amount NUMERIC(14,2) NOT NULL
);
CREATE INDEX ON cost.cost_records (asset_id);

CREATE TABLE cost.forecasts (
    id UUID PRIMARY KEY,
    asset_id UUID,
    period_start DATE NOT NULL,
    period_end DATE,
    forecast_amount NUMERIC(14,2)
);
CREATE INDEX ON cost.forecasts (asset_id);

CREATE TABLE cost.budgets (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    amount NUMERIC(14,2) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE
);

CREATE TABLE cost.waste_findings (
    id UUID PRIMARY KEY,
    asset_id UUID,
    waste_amount NUMERIC(14,2),
    detected_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);
CREATE INDEX ON cost.waste_findings (asset_id);
"""

REVERSE_SQL = """
DROP TABLE IF EXISTS cost.waste_findings CASCADE;
DROP TABLE IF EXISTS cost.budgets CASCADE;
DROP TABLE IF EXISTS cost.forecasts CASCADE;
DROP TABLE IF EXISTS cost.cost_records CASCADE;
DROP TABLE IF EXISTS cost.billing_accounts CASCADE;
"""


class Migration(migrations.Migration):

    initial = True
    dependencies = [
        ("core", "0001_create_platform_schemas"),
    ]

    operations = [
        migrations.RunSQL(SQL, REVERSE_SQL),
    ]
