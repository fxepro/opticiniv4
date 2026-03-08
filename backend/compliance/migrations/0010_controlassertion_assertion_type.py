# Generated migration for assertion_type filter

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("compliance", "0009_policy_requirement_ids"),
    ]

    operations = [
        migrations.AddField(
            model_name="controlassertion",
            name="assertion_type",
            field=models.CharField(blank=True, default="config", max_length=30),
        ),
    ]
