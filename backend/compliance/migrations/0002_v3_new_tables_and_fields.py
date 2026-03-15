# V3: Add only new tables and new columns. Run after faking 0001 on compliance/evidence/audit
# when those schemas already exist from core RunSQL.

import django.db.models.deletion
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("compliance", "0001_v3_schema_tables"),
    ]

    operations = [
        # New columns on existing tables - publisher, family, objective, etc. already in 0001
        # New tables - compliance schema (order respects FKs)
        migrations.CreateModel(
            name="FrameworkVersion",
            fields=[
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ("version_name", models.CharField(max_length=100)),
                ("effective_date", models.DateField(blank=True, null=True)),
                ("notes", models.TextField(blank=True)),
                ("source_uri", models.TextField(blank=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "framework",
                    models.ForeignKey(
                        db_column="framework_id",
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="versions",
                        to="compliance.complianceframework",
                    ),
                ),
            ],
            options={
                "db_table": "framework_versions",
                "ordering": ["version_name"],
            },
        ),
        migrations.CreateModel(
            name="Requirement",
            fields=[
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ("code", models.CharField(max_length=50)),
                ("title", models.CharField(blank=True, max_length=255)),
                ("statement", models.TextField()),
                ("requirement_level", models.CharField(blank=True, max_length=50)),
                ("category", models.CharField(blank=True, max_length=100)),
                ("sort_order", models.IntegerField(blank=True, null=True)),
                ("applicability_notes", models.TextField(blank=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "framework_version",
                    models.ForeignKey(
                        db_column="framework_version_id",
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="requirements",
                        to="compliance.frameworkversion",
                    ),
                ),
                (
                    "parent_requirement",
                    models.ForeignKey(
                        blank=True,
                        db_column="parent_requirement_id",
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="children",
                        to="compliance.requirement",
                    ),
                ),
            ],
            options={
                "db_table": "requirements",
                "ordering": ["sort_order", "code"],
            },
        ),
        migrations.CreateModel(
            name="RequirementPointOfFocus",
            fields=[
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ("pof_code", models.CharField(blank=True, max_length=50)),
                ("pof_text", models.TextField()),
                ("sort_order", models.IntegerField(blank=True, null=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "requirement",
                    models.ForeignKey(
                        db_column="requirement_id",
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="points_of_focus",
                        to="compliance.requirement",
                    ),
                ),
            ],
            options={
                "db_table": "requirement_points_of_focus",
                "ordering": ["sort_order"],
            },
        ),
        migrations.CreateModel(
            name="ControlRequirementMapping",
            fields=[
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ("coverage", models.CharField(blank=True, max_length=50)),
                ("primary_control_flag", models.BooleanField(default=False)),
                ("mapping_notes", models.TextField(blank=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "control",
                    models.ForeignKey(
                        db_column="control_id",
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="requirement_mappings",
                        to="compliance.compliancecontrol",
                    ),
                ),
                (
                    "point_of_focus",
                    models.ForeignKey(
                        blank=True,
                        db_column="point_of_focus_id",
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="control_mappings",
                        to="compliance.requirementpointoffocus",
                    ),
                ),
                (
                    "requirement",
                    models.ForeignKey(
                        db_column="requirement_id",
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="control_mappings",
                        to="compliance.requirement",
                    ),
                ),
            ],
            options={
                "db_table": "control_requirement_mappings",
                "ordering": ["requirement", "control"],
            },
        ),
        migrations.CreateModel(
            name="ControlDepartmentMap",
            fields=[
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ("department_id", models.UUIDField()),
                ("responsibility_type", models.CharField(max_length=50)),
                ("effective_from", models.DateField(blank=True, null=True)),
                ("effective_to", models.DateField(blank=True, null=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "control",
                    models.ForeignKey(
                        db_column="control_id",
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="department_maps",
                        to="compliance.compliancecontrol",
                    ),
                ),
            ],
            options={
                "db_table": "control_department_map",
                "ordering": ["control", "responsibility_type"],
            },
        ),
        migrations.CreateModel(
            name="ControlReview",
            fields=[
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ("reviewed_at", models.DateTimeField()),
                ("reviewer_personnel_id", models.UUIDField(blank=True, null=True)),
                ("review_outcome", models.CharField(blank=True, max_length=30)),
                ("notes", models.TextField(blank=True)),
                ("next_review_due_at", models.DateTimeField(blank=True, null=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "control",
                    models.ForeignKey(
                        db_column="control_id",
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="reviews",
                        to="compliance.compliancecontrol",
                    ),
                ),
            ],
            options={
                "db_table": "control_reviews",
                "ordering": ["-reviewed_at"],
            },
        ),
        migrations.CreateModel(
            name="ControlAssertion",
            fields=[
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ("assertion_name", models.TextField()),
                ("metric_key", models.CharField(max_length=100)),
                ("operator", models.CharField(max_length=10)),
                ("threshold_value", models.DecimalField(blank=True, decimal_places=6, max_digits=20, null=True)),
                ("evaluation_frequency", models.CharField(max_length=20)),
                ("severity", models.CharField(blank=True, max_length=20)),
                ("is_enabled", models.BooleanField(default=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "control",
                    models.ForeignKey(
                        db_column="control_id",
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="assertions",
                        to="compliance.compliancecontrol",
                    ),
                ),
            ],
            options={
                "db_table": "control_assertions",
                "ordering": ["control", "metric_key"],
            },
        ),
        migrations.CreateModel(
            name="MetricSnapshot",
            fields=[
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ("measured_value", models.DecimalField(blank=True, decimal_places=6, max_digits=20, null=True)),
                ("measured_at", models.DateTimeField()),
                ("status", models.CharField(max_length=20)),
                ("deviation", models.DecimalField(blank=True, decimal_places=6, max_digits=20, null=True)),
                ("source_system", models.CharField(blank=True, max_length=100)),
                ("raw_payload_ref", models.TextField(blank=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "assertion",
                    models.ForeignKey(
                        db_column="assertion_id",
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="snapshots",
                        to="compliance.controlassertion",
                    ),
                ),
            ],
            options={
                "db_table": "metric_snapshots",
                "ordering": ["-measured_at"],
            },
        ),
        migrations.CreateModel(
            name="ControlHealth",
            fields=[
                (
                    "control",
                    models.OneToOneField(
                        db_column="control_id",
                        on_delete=django.db.models.deletion.CASCADE,
                        primary_key=True,
                        related_name="health",
                        to="compliance.compliancecontrol",
                    ),
                ),
                ("current_status", models.CharField(max_length=20)),
                ("last_evaluated_at", models.DateTimeField(blank=True, null=True)),
                ("breach_since", models.DateTimeField(blank=True, null=True)),
                (
                    "health_score",
                    models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True),
                ),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={
                "db_table": "control_health",
            },
        ),
        # Evidence schema
        migrations.CreateModel(
            name="EvidenceLink",
            fields=[
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ("linked_object_type", models.CharField(max_length=50)),
                ("linked_object_id", models.UUIDField()),
                ("notes", models.TextField(blank=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "evidence",
                    models.ForeignKey(
                        db_column="evidence_id",
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="links",
                        to="compliance.complianceevidence",
                    ),
                ),
            ],
            options={
                "db_table": "evidence_links",
                "ordering": ["evidence", "linked_object_type"],
            },
        ),
        # Audit schema
        migrations.CreateModel(
            name="ControlTestPlan",
            fields=[
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ("control_id", models.UUIDField()),
                ("test_name", models.CharField(blank=True, max_length=255)),
                ("population_definition", models.TextField(blank=True)),
                ("sampling_method", models.CharField(blank=True, max_length=100)),
                ("expected_sample_size", models.IntegerField(blank=True, null=True)),
                ("test_procedure_steps", models.TextField(blank=True)),
                ("created_by_id", models.IntegerField(blank=True, null=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "audit",
                    models.ForeignKey(
                        db_column="audit_id",
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="control_test_plans",
                        to="compliance.complianceaudit",
                    ),
                ),
            ],
            options={
                "db_table": "control_test_plans",
                "ordering": ["audit", "control_id"],
            },
        ),
        migrations.CreateModel(
            name="ControlTestInstance",
            fields=[
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ("performed_by_personnel_id", models.UUIDField(blank=True, null=True)),
                ("performed_at", models.DateTimeField(blank=True, null=True)),
                ("reviewed_by_personnel_id", models.UUIDField(blank=True, null=True)),
                ("reviewed_at", models.DateTimeField(blank=True, null=True)),
                ("result", models.CharField(blank=True, max_length=50)),
                ("conclusion", models.TextField(blank=True)),
                ("workpaper_ref", models.CharField(blank=True, max_length=100)),
                ("exceptions_summary", models.TextField(blank=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "control_test_plan",
                    models.ForeignKey(
                        db_column="control_test_plan_id",
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="instances",
                        to="compliance.controltestplan",
                    ),
                ),
            ],
            options={
                "db_table": "control_test_instances",
                "ordering": ["-performed_at"],
            },
        ),
        migrations.CreateModel(
            name="TestSample",
            fields=[
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ("sample_reference", models.CharField(max_length=255)),
                ("sample_date", models.DateField(blank=True, null=True)),
                ("sample_result", models.CharField(blank=True, max_length=50)),
                ("notes", models.TextField(blank=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "control_test_instance",
                    models.ForeignKey(
                        db_column="control_test_instance_id",
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="samples",
                        to="compliance.controltestinstance",
                    ),
                ),
            ],
            options={
                "db_table": "test_samples",
                "ordering": ["control_test_instance", "sample_reference"],
            },
        ),
        migrations.CreateModel(
            name="AuditException",
            fields=[
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ("severity", models.CharField(blank=True, max_length=50)),
                ("description", models.TextField()),
                ("root_cause", models.TextField(blank=True)),
                ("remediation_plan", models.TextField(blank=True)),
                ("target_date", models.DateField(blank=True, null=True)),
                ("status", models.CharField(blank=True, max_length=50)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "control_test_instance",
                    models.ForeignKey(
                        db_column="control_test_instance_id",
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="exceptions",
                        to="compliance.controltestinstance",
                    ),
                ),
            ],
            options={
                "db_table": "exceptions",
                "ordering": ["-created_at"],
                "verbose_name": "Audit exception",
                "verbose_name_plural": "Audit exceptions",
            },
        ),
    ]
