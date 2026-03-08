# Restore auth_user_groups as source of truth (user_id, group_id). Reverse of 0024.

from django.db import migrations


def restore_auth_user_groups(apps, schema_editor):
    with schema_editor.connection.cursor() as cursor:
        cursor.execute("DROP TABLE IF EXISTS auth_user_groups;")
        cursor.execute(
            "ALTER TABLE IF EXISTS auth_user_groups_deprecated RENAME TO auth_user_groups;"
        )


def reverse_restore(apps, schema_editor):
    with schema_editor.connection.cursor() as cursor:
        cursor.execute(
            "ALTER TABLE IF EXISTS auth_user_groups RENAME TO auth_user_groups_deprecated;"
        )
        cursor.execute("""
            CREATE TABLE auth_user_groups (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL REFERENCES auth_user(id) ON DELETE CASCADE,
                group_id INTEGER NOT NULL REFERENCES auth_group(id) ON DELETE CASCADE,
                UNIQUE(user_id, group_id)
            );
        """)


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0024_deprecate_auth_user_groups"),
    ]

    operations = [
        migrations.RunPython(restore_auth_user_groups, reverse_restore),
    ]
