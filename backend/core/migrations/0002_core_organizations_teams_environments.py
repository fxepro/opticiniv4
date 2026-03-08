# Core schema tables per Platform design DB

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0001_create_platform_schemas"),
    ]

    operations = [
        migrations.CreateModel(
            name="Organization",
            fields=[
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ("name", models.CharField(max_length=255)),
                ("tier", models.CharField(max_length=50)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
            options={
                "db_table": "organizations",
                "verbose_name": "Organization",
                "verbose_name_plural": "Organizations",
            },
        ),
        migrations.CreateModel(
            name="Team",
            fields=[
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ("name", models.CharField(max_length=255)),
                (
                    "organization",
                    models.ForeignKey(
                        db_column="organization_id",
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="teams",
                        to="core.organization",
                    ),
                ),
            ],
            options={
                "db_table": "teams",
                "verbose_name": "Team",
                "verbose_name_plural": "Teams",
            },
        ),
        migrations.CreateModel(
            name="Environment",
            fields=[
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ("name", models.CharField(max_length=255)),
                ("type", models.CharField(max_length=50)),
                (
                    "organization",
                    models.ForeignKey(
                        db_column="organization_id",
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="environments",
                        to="core.organization",
                    ),
                ),
            ],
            options={
                "db_table": "environments",
                "verbose_name": "Environment",
                "verbose_name_plural": "Environments",
            },
        ),
    ]
