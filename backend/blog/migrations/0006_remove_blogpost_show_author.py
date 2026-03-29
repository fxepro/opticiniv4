from django.db import migrations


def drop_show_author_if_exists(apps, schema_editor):
    BlogPost = apps.get_model("blog", "BlogPost")
    table = BlogPost._meta.db_table
    col = "show_author"
    conn = schema_editor.connection

    if conn.vendor == "postgresql":
        schema_editor.execute(f'ALTER TABLE "{table}" DROP COLUMN IF EXISTS "{col}"')
        return

    if conn.vendor == "sqlite":
        with conn.cursor() as c:
            c.execute(f'PRAGMA table_info("{table}")')
            if col not in [row[1] for row in c.fetchall()]:
                return
        schema_editor.execute(f'ALTER TABLE "{table}" DROP COLUMN "{col}"')
        return

    if conn.vendor == "mysql":
        with conn.cursor() as c:
            c.execute(
                """
                SELECT 1 FROM information_schema.columns
                WHERE table_schema = DATABASE()
                  AND table_name = %s
                  AND column_name = %s
                """,
                [table, col],
            )
            if not c.fetchone():
                return
        schema_editor.execute(f"ALTER TABLE `{table}` DROP COLUMN `{col}`")


class Migration(migrations.Migration):

    dependencies = [
        ("blog", "0005_show_author_add_if_not_exists"),
    ]

    operations = [
        migrations.SeparateDatabaseAndState(
            state_operations=[
                migrations.RemoveField(
                    model_name="blogpost",
                    name="show_author",
                ),
            ],
            database_operations=[
                migrations.RunPython(drop_show_author_if_exists, migrations.RunPython.noop),
            ],
        ),
    ]
