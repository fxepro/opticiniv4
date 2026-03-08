from django.db import migrations

SQL = """
ALTER TABLE discovery.assets
ADD COLUMN IF NOT EXISTS asset_key VARCHAR(128);
"""

REVERSE_SQL = """
ALTER TABLE discovery.assets
DROP COLUMN IF EXISTS asset_key;
"""


class Migration(migrations.Migration):

    dependencies = [
        ("discovery", "0003_account_ownership_align_ui"),
    ]

    operations = [
        migrations.RunSQL(SQL, REVERSE_SQL),
    ]

