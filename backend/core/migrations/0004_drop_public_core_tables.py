from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0003_core_tables_in_core_schema"),
    ]

    operations = [
        # No-op in v3: legacy public tables are not created.
        migrations.SeparateDatabaseAndState(
            database_operations=[],
            state_operations=[],
        ),
    ]
