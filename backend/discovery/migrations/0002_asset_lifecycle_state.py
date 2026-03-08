# Add lifecycle_state to discovery.assets (critical for asset lifecycle).

from django.db import migrations

SQL = """
ALTER TABLE discovery.assets
ADD COLUMN IF NOT EXISTS lifecycle_state VARCHAR(32) NOT NULL DEFAULT 'active';
"""

REVERSE_SQL = """
ALTER TABLE discovery.assets
DROP COLUMN IF EXISTS lifecycle_state;
"""


class Migration(migrations.Migration):

    dependencies = [
        ("discovery", "0001_discovery_schema_tables"),
    ]

    operations = [
        migrations.RunSQL(SQL, REVERSE_SQL),
    ]
