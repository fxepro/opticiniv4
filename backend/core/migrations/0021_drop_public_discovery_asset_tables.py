# Drop discovery asset tables from public schema. They belong in discovery schema.
# Discovery app reads/writes discovery.* via router. Public copies were created by
# migrations that ran on default (allow_migrate prevented discovery DB).

from django.db import migrations

SQL = """
DROP TABLE IF EXISTS public.asset_attributes CASCADE;
DROP TABLE IF EXISTS public.asset_changes CASCADE;
DROP TABLE IF EXISTS public.asset_ownership CASCADE;
DROP TABLE IF EXISTS public.asset_relationships CASCADE;
DROP TABLE IF EXISTS public.asset_tags CASCADE;
DROP TABLE IF EXISTS public.asset_versions CASCADE;
DROP TABLE IF EXISTS public.assets CASCADE;
"""


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0020_drop_countries_from_core"),
    ]

    operations = [
        migrations.RunSQL(SQL, migrations.RunSQL.noop),
    ]
