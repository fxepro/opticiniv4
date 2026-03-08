from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField
import uuid


class PolicyTemplate(models.Model):
    """compliance.policy_templates — generic policy template, reusable across orgs. Users apply to create CompliancePolicy."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    policy_template_code_id = models.CharField(max_length=100, unique=True, help_text="e.g. POLSEC001")
    policy_code = models.CharField(max_length=100)
    name = models.CharField(max_length=300)
    description = models.TextField(blank=True)
    framework_default = models.CharField(max_length=50, blank=True)
    policy_status_default = models.CharField(max_length=50, blank=True)
    review_frequency = models.CharField(max_length=50, blank=True)
    owner_role_default = models.CharField(max_length=100, blank=True)
    overview_status_default = models.CharField(max_length=100, blank=True)
    overview_last_reviewed_default = models.CharField(max_length=100, blank=True)
    config_scope_default = models.CharField(max_length=200, blank=True)
    config_version_default = models.CharField(max_length=50, blank=True)
    history_90d_review_activity_default = models.CharField(max_length=100, blank=True)
    evidence_policy_document_default = models.CharField(max_length=200, blank=True)
    evidence_review_record_default = models.CharField(max_length=200, blank=True)
    mapped_control_codes = ArrayField(models.CharField(max_length=100), default=list, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "policy_templates"
        ordering = ["policy_template_code_id"]

    def __str__(self):
        return f"{self.policy_template_code_id}: {self.name}"


class CompliancePolicy(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    policy_code_id = models.CharField(max_length=100, unique=True, blank=True, help_text="Unique human-readable/external identifier")
    policy_id = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=300)
    description = models.TextField(blank=True)
    type = models.CharField(max_length=30)
    category = models.CharField(max_length=100, blank=True)
    status = models.CharField(max_length=20, default="draft")
    approval_status = models.CharField(max_length=20, default="pending")
    version = models.CharField(max_length=20, default="1.0")
    current_version_id = models.UUIDField(null=True, blank=True)
    owner = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="compliance_owned_policies")
    generation_method = models.CharField(max_length=20, default="manual")
    generated_from = models.JSONField(default=dict, blank=True)
    last_generated = models.DateTimeField(null=True, blank=True)
    generated_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="compliance_generated_policies")
    sync_status = models.CharField(max_length=20, default="unknown")
    last_sync_check = models.DateTimeField(null=True, blank=True)
    sync_issues = ArrayField(models.TextField(), default=list, blank=True)
    content = models.TextField()
    summary = models.TextField(blank=True)
    sections = models.JSONField(default=list, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="compliance_created_policies")
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="compliance_updated_policies")
    approved_at = models.DateTimeField(null=True, blank=True)
    approved_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="compliance_approved_policies")
    effective_date = models.DateTimeField(null=True, blank=True)
    review_date = models.DateTimeField(null=True, blank=True)
    evidence_ids = ArrayField(models.UUIDField(), default=list, blank=True)
    control_ids = ArrayField(models.UUIDField(), default=list, blank=True)
    requirement_ids = ArrayField(models.UUIDField(), default=list, blank=True)
    export_formats = ArrayField(models.CharField(max_length=20), default=list, blank=True)
    tags = ArrayField(models.CharField(max_length=100), default=list, blank=True)
    organization_id = models.UUIDField(null=True, blank=True)
    class Meta:
        db_table = "compliance_policies"
        ordering = ["policy_id"]
    def __str__(self):
        return f"{self.policy_id}: {self.name}"

class CompliancePolicyVersion(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    policy = models.ForeignKey(CompliancePolicy, on_delete=models.CASCADE, related_name="versions")
    version = models.CharField(max_length=20)
    content = models.TextField()
    summary = models.TextField(blank=True)
    changes = models.TextField(blank=True)
    is_current = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="compliance_created_policy_versions")
    approved_at = models.DateTimeField(null=True, blank=True)
    approved_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="compliance_approved_policy_versions")
    class Meta:
        db_table = "compliance_policy_versions"
        unique_together = [["policy", "version"]]
    def __str__(self):
        return f"{self.policy.policy_id} v{self.version}"

class CompliancePolicyAttestation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    policy = models.ForeignKey(CompliancePolicy, on_delete=models.CASCADE, related_name="attestations")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="compliance_policy_attestations")
    role = models.CharField(max_length=50, blank=True)
    acknowledged = models.BooleanField(default=True)
    comments = models.TextField(blank=True)
    attested_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        db_table = "compliance_policy_attestations"
        unique_together = [["policy", "user"]]
    def __str__(self):
        return f"{self.policy.policy_id} - {self.user.username}"

class CompliancePolicyFrameworkMapping(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    policy = models.ForeignKey(CompliancePolicy, on_delete=models.CASCADE, related_name="framework_mappings")
    framework_id = models.UUIDField()
    framework_name = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        db_table = "compliance_policy_framework_mappings"
        unique_together = [["policy", "framework_id"]]
    def __str__(self):
        return f"{self.policy.policy_id} -> {self.framework_name}"
