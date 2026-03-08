from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0002_core_organizations_teams_environments"),
    ]

    operations = [
        # No-op in v3: tables are created correctly by 0002 using ORM.
        migrations.SeparateDatabaseAndState(
            database_operations=[],
            state_operations=[],
        ),
    ]
