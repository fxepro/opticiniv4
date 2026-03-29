# Heals databases where blog.0002 was marked applied or skipped but the column is missing.

from django.db import migrations


def ensure_show_author_column(apps, schema_editor):
    connection = schema_editor.connection
    table = "blog_blogpost"
    column = "show_author"

    if connection.vendor == "postgresql":
        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT 1 FROM information_schema.columns
                WHERE table_schema = current_schema()
                  AND table_name = %s
                  AND column_name = %s
                """,
                [table, column],
            )
            if cursor.fetchone():
                return
        schema_editor.execute(
            f'ALTER TABLE "{table}" ADD COLUMN "{column}" boolean DEFAULT true NOT NULL'
        )
    elif connection.vendor == "sqlite":
        with connection.cursor() as cursor:
            cursor.execute(f'PRAGMA table_info("{table}")')
            cols = [row[1] for row in cursor.fetchall()]
            if column in cols:
                return
        schema_editor.execute(
            f'ALTER TABLE "{table}" ADD COLUMN "{column}" integer NOT NULL DEFAULT 1'
        )
    elif connection.vendor == "mysql":
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


def noop_reverse(apps, schema_editor):
    pass


class Migration(migrations.Migration):

    dependencies = [
        ("blog", "0002_blogpost_show_author"),
    ]

    operations = [
        migrations.RunPython(ensure_show_author_column, noop_reverse),
    ]
