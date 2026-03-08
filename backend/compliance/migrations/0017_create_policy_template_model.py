# Create PolicyTemplate model

import uuid

from django.db import migrations, models
from django.contrib.postgres.fields import ArrayField


class Migration(migrations.Migration):

    dependencies = [
        ("compliance", "0016_seed_assertion_templates_v2_ui_detail"),
    ]

    operations = [
        migrations.CreateModel(
            name="PolicyTemplate",
            fields=[
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ("policy_template_code_id", models.CharField(max_length=100, unique=True)),
                ("policy_code", models.CharField(max_length=100)),
                ("name", models.CharField(max_length=300)),
                ("description", models.TextField(blank=True)),
                ("framework_default", models.CharField(blank=True, max_length=50)),
                ("policy_status_default", models.CharField(blank=True, max_length=50)),
                ("review_frequency", models.CharField(blank=True, max_length=50)),
                ("owner_role_default", models.CharField(blank=True, max_length=100)),
                ("overview_status_default", models.CharField(blank=True, max_length=100)),
                ("overview_last_reviewed_default", models.CharField(blank=True, max_length=100)),
                ("config_scope_default", models.CharField(blank=True, max_length=200)),
                ("config_version_default", models.CharField(blank=True, max_length=50)),
                ("history_90d_review_activity_default", models.CharField(blank=True, max_length=100)),
                ("evidence_policy_document_default", models.CharField(blank=True, max_length=200)),
                ("evidence_review_record_default", models.CharField(blank=True, max_length=200)),
                ("mapped_control_codes", ArrayField(base_field=models.CharField(max_length=100), blank=True, default=list, size=None)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
            options={
                "db_table": "policy_templates",
                "ordering": ["policy_template_code_id"],
            },
        ),
    ]
