# Uses PostgreSQL ADD COLUMN IF NOT EXISTS so the column is created even when
# django_migrations is ahead of the real schema (fake applies, restores, etc.).

from django.db import migrations


def add_show_author_if_missing(apps, schema_editor):
    BlogPost = apps.get_model("blog", "BlogPost")
    table = BlogPost._meta.db_table
    column = "show_author"
    connection = schema_editor.connection

    if connection.vendor == "postgresql":
        schema_editor.execute(
            f'ALTER TABLE "{table}" ADD COLUMN IF NOT EXISTS "{column}" boolean DEFAULT true NOT NULL'
        )
        return

    if connection.vendor == "sqlite":
        with connection.cursor() as cursor:
            cursor.execute(f'PRAGMA table_info("{table}")')
            if any(row[1] == column for row in cursor.fetchall()):
                return
        schema_editor.execute(
            f'ALTER TABLE "{table}" ADD COLUMN "{column}" integer NOT NULL DEFAULT 1'
        )
        return

    if connection.vendor == "mysql":
        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT 1 FROM information_schema.columns
                WHERE table_schema = DATABASE()
                  AND table_name = %s
                  AND column_name = %s
                """,
                [table, column],
            )
            if cursor.fetchone():
                return
        schema_editor.execute(
            f"ALTER TABLE `{table}` ADD COLUMN `{column}` bool NOT NULL DEFAULT 1"
        )


class Migration(migrations.Migration):

    dependencies = [
        ("blog", "0004_ensure_show_author_column_pg"),
    ]

    operations = [
        migrations.RunPython(add_show_author_if_missing, migrations.RunPython.noop),
    ]
