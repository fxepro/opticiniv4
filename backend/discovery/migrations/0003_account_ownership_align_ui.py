# Align Discovery DB with mock UI: Account (cloud) and AssetOwnership (technical/business).

from django.db import migrations

ADD_ACCOUNT_COLUMNS = """
ALTER TABLE discovery.accounts ADD COLUMN IF NOT EXISTS environment VARCHAR(64) NOT NULL DEFAULT '';
ALTER TABLE discovery.accounts ADD COLUMN IF NOT EXISTS last_sync_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE discovery.accounts ADD COLUMN IF NOT EXISTS status VARCHAR(32) NOT NULL DEFAULT '';
ALTER TABLE discovery.accounts ADD COLUMN IF NOT EXISTS resource_count INTEGER;
"""
REVERSE_ACCOUNT = """
ALTER TABLE discovery.accounts DROP COLUMN IF EXISTS environment;
ALTER TABLE discovery.accounts DROP COLUMN IF EXISTS last_sync_at;
ALTER TABLE discovery.accounts DROP COLUMN IF EXISTS status;
ALTER TABLE discovery.accounts DROP COLUMN IF EXISTS resource_count;
"""

ADD_OWNERSHIP_ROLE = """
ALTER TABLE discovery.asset_ownership ADD COLUMN IF NOT EXISTS role VARCHAR(32) NOT NULL DEFAULT 'technical';
"""
REVERSE_OWNERSHIP_ROLE = """
ALTER TABLE discovery.asset_ownership DROP COLUMN IF EXISTS role;
"""


class Migration(migrations.Migration):

    dependencies = [
        ("discovery", "0002_asset_lifecycle_state"),
    ]

    operations = [
        migrations.RunSQL(ADD_ACCOUNT_COLUMNS, REVERSE_ACCOUNT),
        migrations.RunSQL(ADD_OWNERSHIP_ROLE, REVERSE_OWNERSHIP_ROLE),
    ]
