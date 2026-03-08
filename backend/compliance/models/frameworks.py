from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
import uuid


class ComplianceFramework(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    framework_code_id = models.CharField(max_length=100, unique=True, blank=True, help_text="Unique human-readable/external identifier")
    name = models.CharField(max_length=200, help_text="Framework name (e.g., SOC 2 Type I)")
    code = models.CharField(max_length=50, unique=True, help_text="Framework code (e.g., SOC2-T1)")
    category = models.CharField(max_length=20)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=50, blank=True)
    enabled = models.BooleanField(default=True)
    status = models.CharField(max_length=20, default="not_started")
    compliance_score = models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(100)])
    total_controls = models.IntegerField(default=0)
    passing_controls = models.IntegerField(default=0)
    failing_controls = models.IntegerField(default=0)
    not_evaluated_controls = models.IntegerField(default=0)
    last_evaluated = models.DateTimeField(null=True, blank=True)
    next_audit_date = models.DateTimeField(null=True, blank=True)
    organization_id = models.UUIDField(null=True, blank=True)
    publisher = models.CharField(max_length=255, blank=True)  # V3: AICPA, ISO, NIST...
    family = models.CharField(max_length=100, blank=True)  # V3: SOC/ISO/NIST...
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="compliance_created_frameworks")

    class Meta:
        db_table = "frameworks"
        ordering = ["name"]
        verbose_name = "Compliance Framework"
        verbose_name_plural = "Compliance Frameworks"
        indexes = [
            models.Index(fields=["code"]),
            models.Index(fields=["category", "status"]),
            models.Index(fields=["enabled", "status"]),
            models.Index(fields=["organization_id"]),
        ]

    def __str__(self):
        return f"{self.name} ({self.code})"


class FrameworkVersion(models.Model):
    """compliance.framework_versions — version of a framework (e.g. TSC 2017)."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    framework_version_code_id = models.CharField(max_length=100, unique=True, blank=True, help_text="Unique human-readable/external identifier")
    framework = models.ForeignKey(ComplianceFramework, on_delete=models.CASCADE, related_name="versions", db_column="framework_id")
    version_name = models.CharField(max_length=100)  # e.g. 'TSC 2017'
    effective_date = models.DateField(null=True, blank=True)
    notes = models.TextField(blank=True)
    source_uri = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "framework_versions"
        ordering = ["version_name"]

    def __str__(self):
        return f"{self.framework.code} {self.version_name}"


class OrganizationFramework(models.Model):
    """Which frameworks are enabled for an organization (account-level)."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    organization_id = models.UUIDField(db_index=True)
    framework = models.ForeignKey(
        ComplianceFramework, on_delete=models.CASCADE, related_name="org_enabled", db_column="framework_id"
    )
    enabled = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "organization_frameworks"
        ordering = ["framework__name"]
        unique_together = [["organization_id", "framework"]]
        indexes = [models.Index(fields=["organization_id", "enabled"])]

    def __str__(self):
        return f"org={self.organization_id} framework={self.framework.code} enabled={self.enabled}"
