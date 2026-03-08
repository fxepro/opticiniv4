from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField
from django.core.validators import MinValueValidator, MaxValueValidator
import uuid

class ComplianceControl(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    control_code_id = models.CharField(max_length=100, unique=True, blank=True, help_text="Unique human-readable/external identifier")
    control_id = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=300)
    description = models.TextField()
    status = models.CharField(max_length=20, default="not_evaluated")
    severity = models.CharField(max_length=20, default="medium")
    last_evaluated = models.DateTimeField(null=True, blank=True)
    evaluated_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="compliance_evaluated_controls")
    evaluation_method = models.CharField(max_length=20, default="automated")
    failure_reason = models.TextField(blank=True)
    failing_assets = ArrayField(models.CharField(max_length=200), default=list, blank=True)
    failing_count = models.IntegerField(default=0)
    uptime_percentage = models.FloatField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(100)])
    time_out_of_compliance = models.IntegerField(null=True, blank=True)
    fix_recommendations = ArrayField(models.TextField(), default=list, blank=True)
    related_control_ids = ArrayField(models.UUIDField(), default=list, blank=True)
    category = models.CharField(max_length=100, blank=True)
    control_type = models.CharField(max_length=20, default="preventive")
    frequency = models.CharField(max_length=20, default="continuous")
    organization_id = models.UUIDField(null=True, blank=True)
    # V3 additions
    objective = models.TextField(blank=True)
    nature = models.CharField(max_length=50, blank=True)  # manual/automated/IT-dependent
    testing_frequency = models.CharField(max_length=20, blank=True)  # Quarterly/Annual
    maturity_level = models.CharField(max_length=20, blank=True)  # Initial/Developing/Defined/Managed/Optimized
    implementation_status = models.CharField(max_length=20, blank=True)  # Draft/Planned/In Progress/Implemented/Tested/Retired
    likelihood_score = models.IntegerField(null=True, blank=True)  # 1-5
    impact_score = models.IntegerField(null=True, blank=True)  # 1-5
    risk_score = models.IntegerField(null=True, blank=True)
    control_owner_personnel_id = models.UUIDField(null=True, blank=True)  # org.personnel.id
    lifecycle_status = models.CharField(max_length=20, blank=True)  # active/draft/retired
    automation_opportunity = models.TextField(blank=True, help_text="Where automation could apply")
    automation_recommendation = models.TextField(blank=True, help_text="Recommended automation approach")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="compliance_created_controls")
    class Meta:
        db_table = "controls"
        ordering = ["control_id"]
    def __str__(self):
        return f"{self.control_id}: {self.name}"

class ComplianceControlFrameworkMapping(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    control = models.ForeignKey(ComplianceControl, on_delete=models.CASCADE, related_name="framework_mappings", db_column="control_id")
    framework_id = models.UUIDField()
    framework_name = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        db_table = "control_framework_mappings"
        unique_together = [["control", "framework_id"]]
    def __str__(self):
        return f"{self.control.control_id} -> {self.framework_name}"

class ControlEvidenceRequirement(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    control = models.ForeignKey(ComplianceControl, on_delete=models.CASCADE, related_name="evidence_requirements", db_column="control_id")
    evidence_type = models.CharField(max_length=50)
    source_app = models.CharField(max_length=100, blank=True)
    evidence_category = models.CharField(max_length=30, blank=True)
    collection_method = models.CharField(max_length=30, blank=True)
    freshness_days = models.IntegerField(default=30)
    required = models.BooleanField(default=True)
    description = models.TextField(blank=True)
    retention_guidance = models.TextField(blank=True, help_text="Guidance for how long to retain this evidence")
    organization_id = models.UUIDField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        db_table = "control_evidence_requirements"
        unique_together = [["control", "evidence_type", "source_app"]]
    def get_evidence_category(self):
        return self.evidence_category or "security_scan"
    def get_collection_method(self):
        return self.collection_method or "manual_upload"
    def __str__(self):
        return f"{self.control.control_id} requires {self.evidence_type}"


class ControlDepartmentMap(models.Model):
    """compliance.control_department_map — which department owns/executes/reviews/supports a control."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    control = models.ForeignKey(ComplianceControl, on_delete=models.CASCADE, related_name="department_maps", db_column="control_id")
    department_id = models.UUIDField()  # org.departments.id (logical FK)
    department_code = models.CharField(max_length=100, blank=True, help_text="Human-readable department code (e.g. from catalog)")
    responsibility_type = models.CharField(max_length=50)  # own/execute/review/support
    effective_from = models.DateField(null=True, blank=True)
    effective_to = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "control_department_map"
        ordering = ["control", "responsibility_type"]

    def __str__(self):
        return f"{self.control.control_id} — {self.responsibility_type}"


class ControlReview(models.Model):
    """compliance.control_reviews — review outcome and next due date for a control."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    control = models.ForeignKey(ComplianceControl, on_delete=models.CASCADE, related_name="reviews", db_column="control_id")
    reviewed_at = models.DateTimeField()
    reviewer_personnel_id = models.UUIDField(null=True, blank=True)  # org.personnel.id
    review_outcome = models.CharField(max_length=30, blank=True)  # pass/needs-update/retire
    notes = models.TextField(blank=True)
    next_review_due_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "control_reviews"
        ordering = ["-reviewed_at"]

    def __str__(self):
        return f"{self.control.control_id} review {self.reviewed_at}"


class AssertionTemplate(models.Model):
    """compliance.assertion_templates — baseline template, reusable across orgs (Layer A)."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    assertion_template_code_id = models.CharField(max_length=100, unique=True, help_text="Template code (e.g. MFA_COVERAGE)")
    name = models.CharField(max_length=300)
    description_human = models.TextField(blank=True, help_text="Sentence users see")
    control = models.ForeignKey(
        ComplianceControl,
        on_delete=models.CASCADE,
        related_name="assertion_templates",
        db_column="control_id",
        null=True,
        blank=True,
        help_text="Baseline control library",
    )
    assertion_type = models.CharField(
        max_length=30,
        blank=True,
        default="config",
        help_text="config/identity/vuln/logging/attestation/sdlc/process/recovery/endpoint/monitoring",
    )
    resource_type = models.CharField(
        max_length=50,
        blank=True,
        help_text="user/device/bucket/repo/vendor/etc.",
    )
    metric_key = models.CharField(max_length=100, help_text="Canonical metric name")
    default_threshold_operator = models.CharField(max_length=10, default=">=")
    default_threshold_value = models.DecimalField(
        max_digits=20, decimal_places=6, null=True, blank=True
    )
    default_eval_frequency = models.CharField(max_length=20, default="daily")
    requires_connectors = ArrayField(
        models.CharField(max_length=100), default=list, blank=True
    )
    framework_code_id = models.CharField(
        max_length=50, blank=True, help_text="Framework (e.g. SOC2)"
    )
    severity_default = models.CharField(
        max_length=20, blank=True, help_text="critical/high/medium/low"
    )
    rendered_sentence_template = models.TextField(
        blank=True,
        help_text="Template with {{threshold_value}}, {{days}}, etc.",
    )
    scope_default_json = models.JSONField(
        default=dict, blank=True, help_text="Default scope filters"
    )
    evidence_artifact_type = models.CharField(
        max_length=50, blank=True, help_text="Automated snapshot / Evidence upload"
    )
    notes = models.TextField(blank=True)
    # v2 UI detail fields for accordion display
    overview_rendered_sentence_example = models.TextField(blank=True)
    overview_policy_code = models.CharField(max_length=50, blank=True)
    overview_status_default = models.CharField(max_length=50, blank=True)
    overview_last_run_default = models.CharField(max_length=100, blank=True)
    overview_last_value_default = models.CharField(max_length=100, blank=True)
    config_scope_display = models.CharField(max_length=200, blank=True)
    config_threshold_display = models.CharField(max_length=100, blank=True)
    config_frequency_display = models.CharField(max_length=50, blank=True)
    config_connector_display = models.CharField(max_length=200, blank=True)
    history_30d_pass_rate_default = models.CharField(max_length=50, blank=True)
    history_90d_pass_rate_default = models.CharField(max_length=50, blank=True)
    evidence_auto_generated_type = models.CharField(max_length=50, blank=True)
    evidence_auto_generated_status_default = models.CharField(max_length=100, blank=True)
    evidence_90_day_report_type = models.CharField(max_length=50, blank=True)
    evidence_90_day_report_status_default = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "assertion_templates"
        ordering = ["assertion_template_code_id"]

    def __str__(self):
        return f"{self.assertion_template_code_id}: {self.name}"


class ControlAssertion(models.Model):
    """compliance.control_assertions — org assertion, enabled + configured (Layer B)."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    organization_id = models.UUIDField(null=True, blank=True)
    assertion_template = models.ForeignKey(
        "AssertionTemplate",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="org_assertions",
        db_column="assertion_template_id",
    )
    assertion_code_id = models.CharField(max_length=100, unique=True, blank=True, help_text="Org-stable identifier")
    control = models.ForeignKey(ComplianceControl, on_delete=models.CASCADE, related_name="assertions", db_column="control_id")
    assertion_name = models.TextField()
    metric_key = models.CharField(max_length=100)  # canonical metric id for integrations
    operator = models.CharField(max_length=10)  # >=, <=, =, !=, in, not_in (threshold_operator)
    threshold_value = models.DecimalField(max_digits=20, decimal_places=6, null=True, blank=True)
    evaluation_frequency = models.CharField(max_length=20)  # eval_frequency: real-time/hourly/daily/weekly
    severity = models.CharField(max_length=20, blank=True)  # critical/high/medium/low
    assertion_type = models.CharField(max_length=30, blank=True, default="config")  # config/iam/vuln/attestation
    is_enabled = models.BooleanField(default=True)
    scope_json = models.JSONField(default=dict, blank=True, help_text="Filtering: privileged users, prod accounts, etc.")
    data_source_id = models.UUIDField(null=True, blank=True, help_text="Connector instance")
    rendered_text = models.TextField(blank=True, help_text="Cached human sentence")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "control_assertions"
        ordering = ["control", "metric_key"]

    def __str__(self):
        return f"{self.control.control_id}: {self.assertion_name[:50]}"


class MetricSnapshot(models.Model):
    """compliance.metric_snapshots — time series for assertions (Layer C)."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    organization_id = models.UUIDField(null=True, blank=True)
    assertion = models.ForeignKey(ControlAssertion, on_delete=models.CASCADE, related_name="snapshots", db_column="assertion_id")
    measured_value = models.DecimalField(max_digits=20, decimal_places=6, null=True, blank=True)
    measured_at = models.DateTimeField()
    status = models.CharField(max_length=20)  # pass/fail/na/error
    deviation = models.DecimalField(max_digits=20, decimal_places=6, null=True, blank=True)
    source_system = models.CharField(max_length=100, blank=True)  # Okta, AWS, SIEM
    raw_payload_ref = models.TextField(blank=True, help_text="raw_evidence_ref")
    source_run_id = models.UUIDField(null=True, blank=True, help_text="Trace connector run")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "metric_snapshots"
        ordering = ["-measured_at"]

    def __str__(self):
        return f"{self.assertion_id} @ {self.measured_at}"


class ControlHealth(models.Model):
    """compliance.control_health — 1:1 health status per control (PK = control_id)."""
    control = models.OneToOneField(
        ComplianceControl, on_delete=models.CASCADE, primary_key=True, related_name="health", db_column="control_id"
    )
    current_status = models.CharField(max_length=20)  # healthy/warn/breach/unknown
    last_evaluated_at = models.DateTimeField(null=True, blank=True)
    breach_since = models.DateTimeField(null=True, blank=True)
    health_score = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)  # 0-100
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "control_health"

    def __str__(self):
        return f"{self.control_id} {self.current_status}"
