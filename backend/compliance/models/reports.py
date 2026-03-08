from django.db import models
from django.contrib.auth.models import User
import uuid

class ComplianceReport(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    report_id = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=300)
    description = models.TextField(blank=True)
    type = models.CharField(max_length=30)
    status = models.CharField(max_length=20, default="pending")
    view = models.CharField(max_length=20)
    date_range_start = models.DateTimeField(null=True, blank=True)
    date_range_end = models.DateTimeField(null=True, blank=True)
    includes_evidence = models.BooleanField(default=False)
    evidence_count = models.IntegerField(null=True, blank=True)
    includes_controls = models.BooleanField(default=False)
    control_count = models.IntegerField(null=True, blank=True)
    includes_policies = models.BooleanField(default=False)
    policy_count = models.IntegerField(null=True, blank=True)
    template_id = models.CharField(max_length=100, blank=True)
    template_name = models.CharField(max_length=200, blank=True)
    generated_at = models.DateTimeField(null=True, blank=True)
    generated_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="compliance_generated_reports")
    file_format = models.CharField(max_length=20, default="pdf")
    file_size = models.BigIntegerField(null=True, blank=True)
    file_url = models.URLField(max_length=500, blank=True)
    download_url = models.URLField(max_length=500, blank=True)
    summary = models.JSONField(default=dict, blank=True)
    error_message = models.TextField(blank=True)
    retry_count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="compliance_created_reports")
    updated_at = models.DateTimeField(auto_now=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="compliance_updated_reports")
    organization_id = models.UUIDField(null=True, blank=True)
    class Meta:
        db_table = "compliance_reports"
        ordering = ["-created_at"]
    def __str__(self):
        return f"{self.report_id}: {self.name}"

class ComplianceReportShare(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    report = models.ForeignKey(ComplianceReport, on_delete=models.CASCADE, related_name="shares")
    link = models.URLField(max_length=500, unique=True)
    expires_at = models.DateTimeField(null=True, blank=True)
    password_protected = models.BooleanField(default=False)
    password_hash = models.CharField(max_length=255, blank=True)
    access_count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="compliance_created_report_shares")
    class Meta:
        db_table = "compliance_report_shares"
    def __str__(self):
        return "Share for %s" % self.report.report_id

class ComplianceReportFrameworkMapping(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    report = models.ForeignKey(ComplianceReport, on_delete=models.CASCADE, related_name="framework_mappings")
    framework_id = models.UUIDField()
    framework_name = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        db_table = "compliance_report_framework_mappings"
        unique_together = [["report", "framework_id"]]
    def __str__(self):
        return "%s -> %s" % (self.report.report_id, self.framework_name)
