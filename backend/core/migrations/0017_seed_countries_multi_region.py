# Seed core.countries with common countries for multi-region (EU, US, APAC).
from django.db import migrations, ProgrammingError

# (code, name, region_group). region_group used for compliance (EU vs US etc.).
SEED = [
    ("US", "United States", "US"),
    ("CA", "Canada", "US"),
    ("GB", "United Kingdom", "EU"),
    ("DE", "Germany", "EU"),
    ("FR", "France", "EU"),
    ("ES", "Spain", "EU"),
    ("IT", "Italy", "EU"),
    ("NL", "Netherlands", "EU"),
    ("IE", "Ireland", "EU"),
    ("BE", "Belgium", "EU"),
    ("AT", "Austria", "EU"),
    ("PL", "Poland", "EU"),
    ("SE", "Sweden", "EU"),
    ("AU", "Australia", "APAC"),
    ("JP", "Japan", "APAC"),
    ("SG", "Singapore", "APAC"),
    ("IN", "India", "APAC"),
]


def seed(apps, schema_editor):
    """
    Seed core.countries for multi-region. In fresh v3 DBs where the table
    isn't present yet (or routing is misaligned), treat as a no-op instead
    of failing the whole migration chain.
    """
    from django.db import connections
    conn = connections["core"]
    try:
        with conn.cursor() as c:
            for code, name, region_group in SEED:
                c.execute(
                    """
                    INSERT INTO countries (id, code, name, region_group)
                    VALUES (gen_random_uuid(), %s, %s, %s)
                    ON CONFLICT (code) DO NOTHING
                    """,
                    [code, name, region_group],
                )
    except ProgrammingError:
        # Table doesn't exist on this connection; skip seeding.
        return


def unseed(apps, schema_editor):
    from django.db import connections
    codes = [row[0] for row in SEED]
    try:
        with connections["core"].cursor() as c:
            c.execute(
                "DELETE FROM countries WHERE code = ANY(%s)",
                (codes,),
            )
    except ProgrammingError:
        # If table doesn't exist, nothing to unseed.
        return


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0016_multi_region_countries_organization_regions"),
    ]

    operations = [
        migrations.RunPython(seed, unseed),
    ]
