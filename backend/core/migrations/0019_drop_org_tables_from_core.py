# Drop org-scoped tables from core schema. Data now lives in org schema (platform_org).
# Run after platform_org 0007 has copied data.

from django.db import migrations

SQL = """
DROP TABLE IF EXISTS core.organization_regions CASCADE;
DROP TABLE IF EXISTS core.org_connector_module_scope CASCADE;
DROP TABLE IF EXISTS core.org_connectors CASCADE;
DROP TABLE IF EXISTS core.environments CASCADE;
DROP TABLE IF EXISTS core.teams CASCADE;
DROP TABLE IF EXISTS core.organizations CASCADE;
"""

REVERSE_SQL = """
-- Reverse: recreate tables (for rollback only; data would need to be copied back from org)
-- Not implemented - use backup/restore if rollback needed.
"""


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0018_version_releases"),
        ("platform_org", "0007_copy_core_to_org"),
    ]

    operations = [
        migrations.RunSQL(SQL, migrations.RunSQL.noop),
    ]
