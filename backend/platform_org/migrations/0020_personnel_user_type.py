from django.db import migrations, models


def noop_reverse(apps, schema_editor):
    pass


def add_user_type_column(apps, schema_editor):
    if schema_editor.connection.alias != "org":
        return
    with schema_editor.connection.cursor() as cursor:
        cursor.execute("""
            ALTER TABLE personnel
                ADD COLUMN IF NOT EXISTS user_type VARCHAR(16) NOT NULL DEFAULT 'internal';
        """)


class Migration(migrations.Migration):

    dependencies = [
        ("platform_org", "0019_personnel_user_id_to_integer"),
    ]

    operations = [
        migrations.SeparateDatabaseAndState(
            database_operations=[],
            state_operations=[
                migrations.AddField(
                    model_name="personnel",
                    name="user_type",
                    field=models.CharField(
                        max_length=16,
                        choices=[("internal", "Internal"), ("external", "External")],
                        default="internal",
                    ),
                ),
                migrations.AlterField(
                    model_name="personnel",
                    name="employment_status",
                    field=models.CharField(
                        max_length=32,
                        choices=[
                            ("active", "Active"),
                            ("terminated", "Terminated"),
                            ("leave", "Leave"),
                        ],
                        default="active",
                    ),
                ),
            ],
        ),
        migrations.RunPython(add_user_type_column, noop_reverse),
    ]
