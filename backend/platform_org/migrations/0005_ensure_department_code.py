# Add department_code to org.departments if missing (e.g. table created by 0001 RunSQL)

from django.db import migrations


def add_column_if_missing(apps, schema_editor):
    if schema_editor.connection.alias != "org":
        return
    with schema_editor.connection.cursor() as cursor:
        cursor.execute("""
            SELECT 1 FROM information_schema.columns
            WHERE table_schema = 'org' AND table_name = 'departments' AND column_name = 'department_code'
        """)
        if cursor.fetchone():
            return
        cursor.execute("ALTER TABLE org.departments ADD COLUMN department_code VARCHAR(100) DEFAULT ''")


def noop_reverse(apps, schema_editor):
    pass


class Migration(migrations.Migration):

    dependencies = [
        ("platform_org", "0004_add_department_code"),
    ]

    operations = [
        migrations.RunPython(add_column_if_missing, noop_reverse),
    ]
