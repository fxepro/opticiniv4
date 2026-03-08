from django.db import models
from django.contrib.auth.models import User
import uuid

class ComplianceTool(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, unique=True)
    tool_type = models.CharField(max_length=20)
    sub_category = models.CharField(max_length=50)
    status = models.CharField(max_length=20, default="not_configured")
    description = models.TextField()
    service = models.CharField(max_length=200)
    endpoint = models.URLField(blank=True)
    api_key = models.CharField(max_length=500, blank=True)
    api_key_name = models.CharField(max_length=100, blank=True)
    configuration = models.JSONField(default=dict)
    license = models.CharField(max_length=50, blank=True)
    evidence_produced = models.CharField(max_length=200, blank=True)
    repo_url = models.URLField(blank=True)
    documentation_url = models.URLField(blank=True)
    installation_instructions = models.TextField(blank=True)
    executable_path = models.CharField(max_length=500, blank=True)
    command_template = models.CharField(max_length=500, blank=True)
    is_active = models.BooleanField(default=False)
    last_tested = models.DateTimeField(null=True, blank=True)
    test_result = models.TextField(blank=True)
    organization_id = models.UUIDField(null=True, blank=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="compliance_tools_created")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        db_table = "compliance_tools"
        ordering = ["sub_category", "name"]
    def __str__(self):
        return f"{self.name} ({self.sub_category})"
