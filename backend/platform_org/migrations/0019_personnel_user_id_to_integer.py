"""
Change personnel.user_id from UUID to INTEGER to match auth.User.id (AutoField).
"""
from django.db import migrations, models


def change_user_id_type(apps, schema_editor):
    if schema_editor.connection.alias != "org":
        return
    with schema_editor.connection.cursor() as cursor:
        cursor.execute("""
            ALTER TABLE personnel
                DROP COLUMN IF EXISTS user_id;
            ALTER TABLE personnel
                ADD COLUMN IF NOT EXISTS user_id INTEGER NULL;
        """)
        cursor.execute(
            "CREATE INDEX IF NOT EXISTS personnel_user_id_idx ON personnel (user_id);"
        )


def noop_reverse(apps, schema_editor):
    pass


class Migration(migrations.Migration):

    dependencies = [
        ("platform_org", "0018_personnel_department_text"),
    ]

    operations = [
        migrations.SeparateDatabaseAndState(
            database_operations=[],
            state_operations=[
                migrations.AlterField(
                    model_name="personnel",
                    name="user_id",
                    field=models.IntegerField(null=True, blank=True),
                ),
            ],
        ),
        migrations.RunPython(change_user_id_type, noop_reverse),
    ]
