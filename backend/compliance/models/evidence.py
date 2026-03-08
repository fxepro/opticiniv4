from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField
import uuid


class ComplianceEvidence(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    evidence_code_id = models.CharField(max_length=100, unique=True, blank=True, help_text="Unique human-readable/external identifier")
    evidence_id = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=300)
    description = models.TextField(blank=True)
    source = models.CharField(max_length=20)
    source_type = models.CharField(max_length=30)
    source_name = models.CharField(max_length=200)
    status = models.CharField(max_length=20, default="fresh")
    validity_period = models.IntegerField(null=True, blank=True)
    expires_at = models.DateTimeField(null=True, blank=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="compliance_created_evidence")
    uploaded_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="compliance_uploaded_evidence")
    file_type = models.CharField(max_length=50, blank=True)
    file_size = models.BigIntegerField(null=True, blank=True)
    file_url = models.URLField(max_length=500, blank=True)
    preview_url = models.URLField(max_length=500, blank=True)
    content = models.TextField(blank=True)
    tags = ArrayField(models.CharField(max_length=100), default=list, blank=True)
    category = models.CharField(max_length=100, blank=True)
    audit_locked = models.BooleanField(default=False)
    audit_id = models.UUIDField(null=True, blank=True)
    organization_id = models.UUIDField(null=True, blank=True)
    collected_by_personnel_id = models.UUIDField(null=True, blank=True)
    approved_by_personnel_id = models.UUIDField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "evidence_items"
        ordering = ["-created_at"]
        verbose_name = "Compliance Evidence"
        verbose_name_plural = "Compliance Evidence"

    def __str__(self):
        return f"{self.evidence_id}: {self.name}"


class ComplianceEvidenceControlMapping(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    evidence = models.ForeignKey(ComplianceEvidence, on_delete=models.CASCADE, related_name="control_mappings", db_column="evidence_id")
    control_id = models.UUIDField()
    control_name = models.CharField(max_length=300)
    framework_id = models.UUIDField()
    framework_name = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "evidence_control_mappings"
        unique_together = [["evidence", "control_id"]]

    def __str__(self):
        return f"{self.evidence.evidence_id} -> {self.control_name}"


class EvidenceLink(models.Model):
    """evidence.evidence_links — polymorphic link from evidence to control/test_instance/requirement/exception/finding/assertion."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    evidence = models.ForeignKey(
        ComplianceEvidence, on_delete=models.CASCADE, related_name="links", db_column="evidence_id"
    )
    linked_object_type = models.CharField(max_length=50)  # control/test_instance/requirement/exception/finding/assertion
    linked_object_id = models.UUIDField()  # polymorphic; enforce in app
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "evidence_links"
        ordering = ["evidence", "linked_object_type"]

    def __str__(self):
        return f"{self.evidence.evidence_id} -> {self.linked_object_type}:{self.linked_object_id}"
