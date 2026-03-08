# Role is stored only in users_userprofile.role. auth_user_groups is deprecated.
# Rename auth_user_groups so it is no longer used; create empty auth_user_groups so Django does not break.

from django.db import migrations


def rename_and_recreate(apps, schema_editor):
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


def reverse_rename(apps, schema_editor):
    with schema_editor.connection.cursor() as cursor:
        cursor.execute("DROP TABLE IF EXISTS auth_user_groups;")
        cursor.execute(
            "ALTER TABLE IF EXISTS auth_user_groups_deprecated RENAME TO auth_user_groups;"
        )


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0023_userprofile_organization_id"),
    ]

    operations = [
        migrations.RunPython(rename_and_recreate, reverse_rename),
    ]
