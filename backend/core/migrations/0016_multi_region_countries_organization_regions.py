from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0015_org_connectors_governance"),
    ]

    operations = [
        migrations.CreateModel(
            name="Country",
            fields=[
                ("id", models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, serialize=False)),
                ("code", models.CharField(max_length=10, unique=True)),
                ("name", models.CharField(max_length=255)),
                ("region_group", models.CharField(
                    max_length=32,
                    choices=[
                        ("EU", "EU / EEA"),
                        ("US", "United States"),
                        ("APAC", "Asia-Pacific"),
                        ("OTHER", "Other"),
                    ],
                    default="OTHER",
                )),
            ],
            options={
                "db_table": "countries",
                "verbose_name": "Country",
                "verbose_name_plural": "Countries",
                "ordering": ["name"],
            },
        ),
        migrations.CreateModel(
            name="OrganizationRegion",
            fields=[
                ("id", models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, serialize=False)),
                ("organization_id", models.UUIDField(db_index=True)),
                ("name", models.CharField(max_length=255)),
                ("primary_contact_name", models.CharField(max_length=255, blank=True)),
                ("primary_contact_email", models.EmailField(max_length=255, blank=True)),
                ("address", models.TextField(blank=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("country", models.ForeignKey(
                    to="core.country",
                    on_delete=models.PROTECT,
                    related_name="organization_regions",
                    db_column="country_id",
                )),
            ],
            options={
                "db_table": "organization_regions",
                "verbose_name": "Organization region",
                "verbose_name_plural": "Organization regions",
                "unique_together": {("organization_id", "country_id")},
                "indexes": [
                    models.Index(
                        fields=["organization_id"],
                        name="organizatio_organiz_a52f2f_idx",
                    ),
                ],
            },
        ),
    ]
