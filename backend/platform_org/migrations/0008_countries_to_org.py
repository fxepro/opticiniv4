# Move countries from core to org schema. Org-scoped reference data.
# 1. Create org.countries
# 2. Copy data from core.countries
# 3. Update org.organization_regions FK to reference org.countries

from django.db import migrations


SQL_CREATE = """
CREATE TABLE org.countries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(10) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    region_group VARCHAR(32) NOT NULL DEFAULT 'OTHER'
);
"""

SQL_COPY = """
INSERT INTO org.countries (id, code, name, region_group)
SELECT id, code, name, region_group FROM core.countries
ON CONFLICT (code) DO NOTHING;
"""

# Drop FK to core.countries, add FK to org.countries
SQL_ALTER_FK = """
ALTER TABLE org.organization_regions
    DROP CONSTRAINT IF EXISTS organization_regions_country_id_fkey;
ALTER TABLE org.organization_regions
    ADD CONSTRAINT organization_regions_country_id_fkey
    FOREIGN KEY (country_id) REFERENCES org.countries(id) ON DELETE RESTRICT;
"""

REVERSE_SQL = """
ALTER TABLE org.organization_regions
    DROP CONSTRAINT IF EXISTS organization_regions_country_id_fkey;
ALTER TABLE org.organization_regions
    ADD CONSTRAINT organization_regions_country_id_fkey
    FOREIGN KEY (country_id) REFERENCES core.countries(id) ON DELETE RESTRICT;
DROP TABLE IF EXISTS org.countries CASCADE;
"""


def forward(apps, schema_editor):
    if schema_editor.connection.alias != "org":
        return
    from django.db import connections
    # Create org.countries
    with connections["org"].cursor() as c:
        c.execute(SQL_CREATE)
    # Copy from core (core.countries may not exist on fresh install)
    try:
        with connections["core"].cursor() as core_c:
            core_c.execute("SELECT 1 FROM core.countries LIMIT 1")
    except Exception:
        return  # No core.countries, skip copy
    with connections["core"].cursor() as core_c:
        with connections["org"].cursor() as org_c:
            core_c.execute("SELECT id, code, name, region_group FROM core.countries")
            for row in core_c.fetchall():
                org_c.execute(
                    "INSERT INTO org.countries (id, code, name, region_group) VALUES (%s, %s, %s, %s) ON CONFLICT (code) DO NOTHING",
                    row,
                )
    # Update FK on organization_regions
    with connections["org"].cursor() as c:
        c.execute(SQL_ALTER_FK)


def reverse(apps, schema_editor):
    if schema_editor.connection.alias != "org":
        return
    from django.db import connections
    with connections["org"].cursor() as c:
        c.execute(REVERSE_SQL)


class Migration(migrations.Migration):

    dependencies = [
        ("platform_org", "0007_copy_core_to_org"),
    ]

    operations = [
        migrations.RunPython(forward, reverse),
    ]
