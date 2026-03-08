# Generated for Platform design DB: create PostgreSQL schemas per module.
# Run before any migration that creates tables in these schemas.

from django.db import migrations


SCHEMAS = [
    "core",
    "identity",
    "discovery",
    "change",
    "compliance",
    "cost",
    "risk",
    "evidence",
    "monitoring",
    "audit",
    "reports",
]

CREATE_SQL = ";\n".join(f"CREATE SCHEMA IF NOT EXISTS {s}" for s in SCHEMAS) + ";"
DROP_SQL = ";\n".join(f"DROP SCHEMA IF EXISTS {s} CASCADE" for s in reversed(SCHEMAS)) + ";"


class Migration(migrations.Migration):

    initial = True
    dependencies = []

    operations = [
        migrations.RunSQL(CREATE_SQL, DROP_SQL),
    ]
