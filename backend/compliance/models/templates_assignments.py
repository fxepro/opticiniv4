"""
Compliance schema: control_templates, evidence_templates, control_assignments, control_tasks.
See docs/Database design/db changes- additions.
"""
import uuid
from django.db import models


class EvidenceTemplate(models.Model):
    """compliance.evidence_templates"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    evidence_template_code_id = models.CharField(max_length=100, unique=True, blank=True, help_text="Unique human-readable/external identifier")
    name = models.CharField(max_length=255)
    collection_type = models.CharField(
        max_length=20,
        choices=[("manual", "Manual"), ("automated", "Automated"), ("hybrid", "Hybrid")],
    )
    expiration_days = models.IntegerField(null=True, blank=True)
    required_metadata_schema = models.JSONField(null=True, blank=True)

    class Meta:
        db_table = "evidence_templates"

    def __str__(self):
        return self.name


class ControlTemplate(models.Model):
    """compliance.control_templates"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    framework_id = models.UUIDField()
    control_code = models.CharField(max_length=100)
    default_test_method = models.CharField(max_length=64, blank=True)
    default_execution_type = models.CharField(max_length=64, blank=True)
    evidence_template_id = models.UUIDField(null=True, blank=True, db_index=True)

    class Meta:
        db_table = "control_templates"

    def __str__(self):
        return f"{self.control_code}"


class ControlAssignment(models.Model):
    """compliance.control_assignments — supports both user_id (legacy) and personnel_id (org layer)."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    control_id = models.UUIDField(db_index=True)
    organization_id = models.UUIDField()
    control_owner_user_id = models.UUIDField(null=True, blank=True)
    evidence_provider_user_id = models.UUIDField(null=True, blank=True)
    internal_auditor_user_id = models.UUIDField(null=True, blank=True)
    compliance_manager_user_id = models.UUIDField(null=True, blank=True)
    # Org schema: personnel-based assignment (see docs/Database design/Org Schema)
    control_owner_personnel_id = models.UUIDField(null=True, blank=True)
    evidence_provider_personnel_id = models.UUIDField(null=True, blank=True)
    internal_auditor_personnel_id = models.UUIDField(null=True, blank=True)
    compliance_manager_personnel_id = models.UUIDField(null=True, blank=True)
    assigned_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = "control_assignments"

    def __str__(self):
        return str(self.id)


class ControlTask(models.Model):
    """compliance.control_tasks — supports assigned_to_user_id (legacy) and assigned_personnel_id (org)."""
    TASK_TYPE_CHOICES = [
        ("manual_collection", "Manual collection"),
        ("review", "Review"),
        ("approval", "Approval"),
    ]
    ASSIGNMENT_TYPE_CHOICES = [
        ("manual_collection", "Manual collection"),
        ("review", "Review"),
        ("approval", "Approval"),
        ("testing", "Testing"),
    ]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    control_test_id = models.UUIDField(db_index=True)
    assigned_to_user_id = models.UUIDField(null=True, blank=True)
    assigned_personnel_id = models.UUIDField(null=True, blank=True, db_index=True)
    task_type = models.CharField(max_length=32, choices=TASK_TYPE_CHOICES)
    assignment_type = models.CharField(max_length=32, choices=ASSIGNMENT_TYPE_CHOICES, blank=True)
    status = models.CharField(max_length=32)
    due_date = models.DateTimeField(null=True, blank=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    escalated = models.BooleanField(default=False)
    escalated_to_personnel_id = models.UUIDField(null=True, blank=True)

    class Meta:
        db_table = "control_tasks"

    def __str__(self):
        return f"{self.task_type} ({self.status})"


class TaskEscalation(models.Model):
    """compliance.task_escalations — escalation tracking (Org Schema section 3.1)."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    task_id = models.UUIDField(db_index=True)
    from_personnel_id = models.UUIDField(null=True, blank=True)
    to_personnel_id = models.UUIDField(null=True, blank=True)
    escalation_reason = models.CharField(max_length=255, blank=True)
    escalated_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "task_escalations"


class ControlOwnerHistory(models.Model):
    """compliance.control_owner_history — control owner changes over time (Org Schema section 3.2)."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    control_id = models.UUIDField(db_index=True)
    personnel_id = models.UUIDField(db_index=True)
    effective_from = models.DateField()
    effective_to = models.DateField(null=True, blank=True)

    class Meta:
        db_table = "control_owner_history"
