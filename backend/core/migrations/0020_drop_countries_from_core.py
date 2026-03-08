# Drop core.countries. Data now lives in org.countries (platform_org).

from django.db import migrations

SQL = """
DROP TABLE IF EXISTS core.countries CASCADE;
"""


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0019_drop_org_tables_from_core"),
        ("platform_org", "0008_countries_to_org"),
    ]

    operations = [
        migrations.RunSQL(SQL, migrations.RunSQL.noop),
    ]
