"""Add description, team_type, active to teams. Create team_members table."""
from django.db import migrations

SQL_FORWARD = """
ALTER TABLE org.teams
    ADD COLUMN IF NOT EXISTS description TEXT NOT NULL DEFAULT '',
    ADD COLUMN IF NOT EXISTS team_type VARCHAR(32) NOT NULL DEFAULT 'custom',
    ADD COLUMN IF NOT EXISTS active BOOLEAN NOT NULL DEFAULT TRUE;

CREATE TABLE IF NOT EXISTS org.team_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id UUID NOT NULL REFERENCES org.teams(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL,
    UNIQUE(team_id, user_id)
);
CREATE INDEX IF NOT EXISTS team_members_team_idx ON org.team_members (team_id);
CREATE INDEX IF NOT EXISTS team_members_user_idx ON org.team_members (user_id);
"""

SQL_REVERSE = """
DROP TABLE IF EXISTS org.team_members CASCADE;
ALTER TABLE org.teams
    DROP COLUMN IF EXISTS description,
    DROP COLUMN IF EXISTS team_type,
    DROP COLUMN IF EXISTS active;
"""


class Migration(migrations.Migration):
    dependencies = [("platform_org", "0015_region_groups_update")]
    operations = [migrations.RunSQL(SQL_FORWARD, SQL_REVERSE)]
