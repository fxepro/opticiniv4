# Create identity schema tables per Platform design DB.
# Depends on core.0001 (schemas exist). Tables in schema identity via RunSQL.

from django.db import migrations

SQL = """
CREATE TABLE identity.users (
    id UUID PRIMARY KEY,
    organization_id UUID NOT NULL,
    email VARCHAR(255) NOT NULL,
    role VARCHAR(64) NOT NULL,
    status VARCHAR(32) NOT NULL
);
CREATE INDEX ON identity.users (organization_id);

CREATE TABLE identity.user_team_map (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    team_id UUID NOT NULL
);
CREATE INDEX ON identity.user_team_map (user_id);
CREATE INDEX ON identity.user_team_map (team_id);
"""

REVERSE_SQL = """
DROP TABLE IF EXISTS identity.user_team_map CASCADE;
DROP TABLE IF EXISTS identity.users CASCADE;
"""


class Migration(migrations.Migration):

    initial = True
    dependencies = [
        ("core", "0001_create_platform_schemas"),
    ]

    operations = [
        migrations.RunSQL(SQL, REVERSE_SQL),
    ]
