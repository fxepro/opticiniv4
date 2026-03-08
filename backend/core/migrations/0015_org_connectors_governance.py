from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0014_compliance_task_escalations_control_owner_history"),
    ]

    operations = [
        migrations.CreateModel(
            name="OrgConnector",
            fields=[
                ("id", models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, serialize=False)),
                ("organization_id", models.UUIDField(db_index=True)),
                ("name", models.CharField(max_length=255)),
                ("connector_type", models.CharField(
                    max_length=64,
                    choices=[
                        ("cloud", "Cloud (AWS/Azure/GCP)"),
                        ("kubernetes", "Kubernetes"),
                        ("email", "Email provider"),
                        ("slack", "Slack / Teams"),
                        ("hris", "HRIS (Workday, BambooHR)"),
                        ("siem", "SIEM"),
                        ("vuln_scanner", "Vulnerability scanner"),
                        ("dev_platform", "Dev platform (GitHub etc.)"),
                        ("itsm", "ITSM (Jira, ServiceNow)"),
                        ("evidence_storage", "Evidence storage (S3 etc.)"),
                    ],
                )),
                ("governance_set", models.SmallIntegerField(
                    choices=[(2, "Global (all modules)"), (3, "Module-scoped")],
                    default=3,
                )),
                ("config", models.JSONField(default=dict, blank=True)),
                ("credentials_ref", models.CharField(max_length=255, blank=True)),
                ("last_synced_at", models.DateTimeField(null=True, blank=True)),
                ("status", models.CharField(max_length=32, blank=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={
                "db_table": "org_connectors",
                "verbose_name": "Org connector",
                "verbose_name_plural": "Org connectors",
                "indexes": [
                    models.Index(
                        fields=["organization_id", "connector_type"],
                        name="org_connect_organiz_98edd7_idx",
                    ),
                ],
            },
        ),
        migrations.CreateModel(
            name="OrgConnectorModuleScope",
            fields=[
                ("id", models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, serialize=False)),
                ("module", models.CharField(
                    max_length=64,
                    choices=[
                        ("discovery", "Discovery"),
                        ("security", "Security"),
                        ("compliance", "Compliance"),
                        ("cost", "Cost"),
                        ("health", "Health"),
                        ("change", "Change"),
                        ("evidence", "Evidence"),
                    ],
                )),
                ("org_connector", models.ForeignKey(
                    to="core.orgconnector",
                    on_delete=models.CASCADE,
                    related_name="module_scopes",
                    db_column="org_connector_id",
                )),
            ],
            options={
                "db_table": "org_connector_module_scope",
                "verbose_name": "Org connector module scope",
                "verbose_name_plural": "Org connector module scopes",
                "unique_together": {("org_connector", "module")},
                "indexes": [
                    models.Index(
                        fields=["org_connector_id", "module"],
                        name="org_connect_org_con_5236ab_idx",
                    ),
                ],
            },
        ),
    ]
