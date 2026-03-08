"""
Add department (text) column to org.personnel.
This is the source of truth for department — free text entered by the customer.
department_id (UUID FK) is kept for backward compatibility but department is now primary.
"""
from django.db import migrations, models


def add_department_column(apps, schema_editor):
    if schema_editor.connection.alias != "org":
        return
    with schema_editor.connection.cursor() as cursor:
        cursor.execute("""
            ALTER TABLE personnel
                ADD COLUMN IF NOT EXISTS department VARCHAR(255) NOT NULL DEFAULT '';
        """)


def noop_reverse(apps, schema_editor):
    pass


class Migration(migrations.Migration):

    dependencies = [
        ("platform_org", "0017_team_department_fk"),
    ]

    operations = [
        migrations.SeparateDatabaseAndState(
            database_operations=[],
            state_operations=[
                migrations.AddField(
                    model_name="personnel",
                    name="department",
                    field=models.CharField(max_length=255, blank=True),
                ),
            ],
        ),
        migrations.RunPython(add_department_column, noop_reverse),
    ]
