"""Add department_id FK to org.teams referencing org.departments."""
from django.db import migrations

SQL_FORWARD = """
ALTER TABLE org.teams
    ADD COLUMN IF NOT EXISTS department_id UUID NULL REFERENCES org.departments(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS teams_department_id_idx ON org.teams (department_id);
"""

SQL_REVERSE = """
DROP INDEX IF EXISTS org.teams_department_id_idx;
ALTER TABLE org.teams DROP COLUMN IF EXISTS department_id;
"""


class Migration(migrations.Migration):
    dependencies = [("platform_org", "0016_team_fields_team_members")]
    operations = [migrations.RunSQL(SQL_FORWARD, SQL_REVERSE)]
