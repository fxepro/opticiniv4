# Generated migration for requirement_ids on CompliancePolicy

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("compliance", "0008_organization_frameworks"),
    ]

    operations = [
        migrations.AddField(
            model_name="compliancepolicy",
            name="requirement_ids",
            field=django.contrib.postgres.fields.ArrayField(
                base_field=models.UUIDField(),
                blank=True,
                default=list,
                size=None,
                help_text="List of requirement UUIDs this policy supports",
            ),
        ),
    ]
