from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField
from django.core.validators import MinValueValidator, MaxValueValidator
import uuid


class ComplianceAudit(models.Model):
    # Audit types
    TYPE_INTERNAL = "internal"
    TYPE_EXTERNAL = "external"
    TYPE_READINESS = "readiness"
    TYPE_SURVEILLANCE = "surveillance"
    TYPE_CHOICES = [
        (TYPE_INTERNAL, "Internal"),
        (TYPE_EXTERNAL, "External"),
        (TYPE_READINESS, "Readiness"),
        (TYPE_SURVEILLANCE, "Surveillance"),
    ]

    # Lifecycle statuses
    STATUS_PLANNED = "planned"
    STATUS_IN_PROGRESS = "in_progress"
    STATUS_EVIDENCE_REVIEW = "evidence_review"
    STATUS_FINDINGS_REVIEW = "findings_review"
    STATUS_COMPLETED = "completed"
    STATUS_CANCELLED = "cancelled"
    STATUS_CHOICES = [
        (STATUS_PLANNED, "Planned"),
        (STATUS_IN_PROGRESS, "In Progress"),
        (STATUS_EVIDENCE_REVIEW, "Evidence Review"),
        (STATUS_FINDINGS_REVIEW, "Findings Review"),
        (STATUS_COMPLETED, "Completed"),
        (STATUS_CANCELLED, "Cancelled"),
    ]

    # Valid transitions: from_status → [allowed to_statuses]
    ALLOWED_TRANSITIONS = {
        STATUS_PLANNED: [STATUS_IN_PROGRESS, STATUS_CANCELLED],
        STATUS_IN_PROGRESS: [STATUS_EVIDENCE_REVIEW, STATUS_CANCELLED],
        STATUS_EVIDENCE_REVIEW: [STATUS_FINDINGS_REVIEW],
        STATUS_FINDINGS_REVIEW: [STATUS_COMPLETED],
        STATUS_COMPLETED: [],
        STATUS_CANCELLED: [],
    }

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    audit_code_id = models.CharField(max_length=100, unique=True, blank=True, help_text="Unique human-readable/external identifier")
    audit_id = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=300)
    description = models.TextField(blank=True)
    type = models.CharField(max_length=30, choices=TYPE_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=STATUS_PLANNED)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField(null=True, blank=True)
    scheduled_start_date = models.DateTimeField(null=True, blank=True)
    scheduled_end_date = models.DateTimeField(null=True, blank=True)
    evidence_locked = models.BooleanField(default=False)
    evidence_freeze_date = models.DateTimeField(null=True, blank=True)
    evidence_count = models.IntegerField(default=0)
    evidence_ids = ArrayField(models.UUIDField(), default=list, blank=True)
    total_controls = models.IntegerField(default=0)
    controls_passed = models.IntegerField(default=0)
    controls_failed = models.IntegerField(default=0)
    controls_partial = models.IntegerField(default=0)
    controls_not_evaluated = models.IntegerField(default=0)
    compliance_score = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(100)])
    findings_count = models.IntegerField(default=0)
    critical_findings = models.IntegerField(default=0)
    high_findings = models.IntegerField(default=0)
    medium_findings = models.IntegerField(default=0)
    low_findings = models.IntegerField(default=0)
    owner = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="compliance_owned_audits")
    notes = models.TextField(blank=True)
    summary = models.TextField(blank=True)
    conclusion = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="compliance_created_audits")
    updated_at = models.DateTimeField(auto_now=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="compliance_updated_audits")
    completed_at = models.DateTimeField(null=True, blank=True)
    previous_audit = models.ForeignKey("self", on_delete=models.SET_NULL, null=True, blank=True, related_name="next_audits")
    organization_id = models.UUIDField(null=True, blank=True)

    class Meta:
        db_table = "audits"
        ordering = ["-start_date"]
        verbose_name = "Compliance Audit"
        verbose_name_plural = "Compliance Audits"
        indexes = [
            models.Index(fields=["audit_id"]),
            models.Index(fields=["type", "status"]),
            models.Index(fields=["start_date", "end_date"]),
            models.Index(fields=["evidence_locked"]),
            models.Index(fields=["organization_id"]),
        ]

    def __str__(self):
        return f"{self.audit_id}: {self.name}"


class ComplianceAuditFinding(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    audit = models.ForeignKey(ComplianceAudit, on_delete=models.CASCADE, related_name="findings")
    finding_id = models.CharField(max_length=100)
    title = models.CharField(max_length=300)
    description = models.TextField()
    severity = models.CharField(max_length=20)
    status = models.CharField(max_length=20, default="open")
    control_id = models.UUIDField(null=True, blank=True)
    control_name = models.CharField(max_length=300, blank=True)
    framework_id = models.UUIDField(null=True, blank=True)
    framework_name = models.CharField(max_length=200, blank=True)
    evidence_ids = ArrayField(models.UUIDField(), default=list, blank=True)
    remediation_plan = models.TextField(blank=True)
    assigned_to = models.CharField(max_length=200, blank=True)
    assigned_remediation_owner_personnel_id = models.UUIDField(null=True, blank=True)
    due_date = models.DateTimeField(null=True, blank=True)
    resolved_at = models.DateTimeField(null=True, blank=True)
    requirement_id = models.UUIDField(null=True, blank=True)
    requirement_code = models.CharField(max_length=50, blank=True)
    exception_id = models.UUIDField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "audit_findings"
        ordering = ["-severity", "-created_at"]
        indexes = [
            models.Index(fields=["audit", "severity"]),
            models.Index(fields=["audit", "status"]),
            models.Index(fields=["control_id"]),
        ]

    def __str__(self):
        return f"{self.finding_id}: {self.title}"


class ComplianceAuditAuditor(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    audit = models.ForeignKey(ComplianceAudit, on_delete=models.CASCADE, related_name="auditors")
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="compliance_audit_assignments")
    name = models.CharField(max_length=200)
    email = models.EmailField()
    role = models.CharField(max_length=20)
    organization = models.CharField(max_length=200, blank=True)
    access_granted_at = models.DateTimeField(null=True, blank=True)
    last_access_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "audit_auditors"
        unique_together = [["audit", "email"]]
        indexes = [models.Index(fields=["audit", "role"]), models.Index(fields=["user"])]

    def __str__(self):
        return f"{self.name} ({self.role}) - {self.audit.audit_id}"


class ComplianceAuditFrameworkMapping(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    audit = models.ForeignKey(ComplianceAudit, on_delete=models.CASCADE, related_name="framework_mappings")
    framework_id = models.UUIDField()
    framework_name = models.CharField(max_length=200)
    framework_version_id = models.UUIDField(null=True, blank=True)
    framework_version_name = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "audit_framework_mappings"
        unique_together = [["audit", "framework_id"]]
        indexes = [models.Index(fields=["framework_id"]), models.Index(fields=["audit", "framework_id"])]

    def __str__(self):
        return f"{self.audit.audit_id} -> {self.framework_name}"


class ControlTestPlan(models.Model):
    """audit.control_test_plans — test plan for a control within an audit."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    audit = models.ForeignKey(ComplianceAudit, on_delete=models.CASCADE, related_name="control_test_plans", db_column="audit_id")
    control_id = models.UUIDField()  # compliance.controls.id (cross-schema)
    test_name = models.CharField(max_length=255, blank=True)
    population_definition = models.TextField(blank=True)
    sampling_method = models.CharField(max_length=100, blank=True)  # Random/judgmental/100%
    expected_sample_size = models.IntegerField(null=True, blank=True)
    test_procedure_steps = models.TextField(blank=True)
    created_by_id = models.IntegerField(null=True, blank=True)  # identity.users.id
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "control_test_plans"
        ordering = ["audit", "control_id"]

    def __str__(self):
        return f"{self.audit.audit_id} plan {self.control_id}"


class ControlTestInstance(models.Model):
    """audit.control_test_instances — one execution of a control test."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    control_test_plan = models.ForeignKey(
        ControlTestPlan, on_delete=models.CASCADE, related_name="instances", db_column="control_test_plan_id"
    )
    performed_by_personnel_id = models.UUIDField(null=True, blank=True)  # org.personnel.id
    performed_at = models.DateTimeField(null=True, blank=True)
    reviewed_by_personnel_id = models.UUIDField(null=True, blank=True)  # org.personnel.id
    reviewed_at = models.DateTimeField(null=True, blank=True)
    result = models.CharField(max_length=50, blank=True)  # pass/fail/partial/na
    conclusion = models.TextField(blank=True)
    workpaper_ref = models.CharField(max_length=100, blank=True)
    exceptions_summary = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "control_test_instances"
        ordering = ["-performed_at"]

    def __str__(self):
        return f"{self.control_test_plan_id} instance {self.result}"


class TestSample(models.Model):
    """audit.test_samples — sample item within a test instance."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    control_test_instance = models.ForeignKey(
        ControlTestInstance, on_delete=models.CASCADE, related_name="samples", db_column="control_test_instance_id"
    )
    sample_reference = models.CharField(max_length=255)  # ticket/user/change id
    sample_date = models.DateField(null=True, blank=True)
    sample_result = models.CharField(max_length=50, blank=True)  # pass/fail
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "test_samples"
        ordering = ["control_test_instance", "sample_reference"]

    def __str__(self):
        return f"{self.sample_reference} {self.sample_result}"


class AuditException(models.Model):
    """audit.exceptions — exception/finding from a control test instance."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    control_test_instance = models.ForeignKey(
        ControlTestInstance, on_delete=models.CASCADE, related_name="exceptions", db_column="control_test_instance_id"
    )
    severity = models.CharField(max_length=50, blank=True)  # low/med/high/critical
    description = models.TextField()
    root_cause = models.TextField(blank=True)
    remediation_plan = models.TextField(blank=True)
    target_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=50, blank=True)  # open/in-progress/closed
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "exceptions"
        ordering = ["-created_at"]
        verbose_name = "Audit exception"
        verbose_name_plural = "Audit exceptions"

    def __str__(self):
        return f"{self.control_test_instance_id} {self.severity}: {self.description[:50]}"


class AuditStatusHistory(models.Model):
    """audit.audit_status_history — log of every status transition on an audit."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    audit = models.ForeignKey(
        ComplianceAudit, on_delete=models.CASCADE, related_name="status_history", db_column="audit_id"
    )
    from_status = models.CharField(max_length=20, blank=True)
    to_status = models.CharField(max_length=20)
    changed_by = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True, related_name="audit_status_changes"
    )
    notes = models.TextField(blank=True)
    changed_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "audit_status_history"
        ordering = ["changed_at"]

    def __str__(self):
        return f"{self.audit_id} {self.from_status} → {self.to_status}"
