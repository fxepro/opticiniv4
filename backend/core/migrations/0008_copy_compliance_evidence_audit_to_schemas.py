from django.db import migrations


def noop_forward(apps, schema_editor):
    """
    v3: skip legacy data-copy step entirely.
    Old public.compliance_* tables don't exist in new databases, and we don't
    need to copy data into the new schemas here.
    """
    return


def noop_reverse(apps, schema_editor):
    return


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0007_audit_schema_tables"),
    ]

    operations = [
        migrations.RunPython(noop_forward, noop_reverse),
    ]
