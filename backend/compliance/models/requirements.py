"""
V3: framework_versions → requirements → requirement_points_of_focus, control_requirement_mappings.
All in compliance schema.
"""
import uuid
from django.db import models
from django.db.models import Q

from compliance.models.frameworks import FrameworkVersion
from compliance.models.controls import ComplianceControl


class Requirement(models.Model):
    """compliance.requirements — requirement under a framework version (e.g. CC1.1, AC-2)."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    requirement_code_id = models.CharField(max_length=100, unique=True, blank=True, help_text="Unique human-readable/external identifier")
    framework_version = models.ForeignKey(
        FrameworkVersion, on_delete=models.CASCADE, related_name="requirements", db_column="framework_version_id"
    )
    code = models.CharField(max_length=50)  # e.g. CC1.1, AC-2
    title = models.CharField(max_length=255, blank=True)
    statement = models.TextField()
    statement_paraphrase = models.TextField(blank=True, help_text="Paraphrased or summarized requirement text")
    requirement_level = models.CharField(max_length=50, blank=True)  # required/supplemental/guidance
    category = models.CharField(max_length=100, blank=True)  # SOC2: Security; ISO: domain
    parent_requirement = models.ForeignKey(
        "self", on_delete=models.CASCADE, null=True, blank=True, related_name="children", db_column="parent_requirement_id"
    )
    sort_order = models.IntegerField(null=True, blank=True)
    applicability_notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "requirements"
        ordering = ["sort_order", "code"]

    def __str__(self):
        return f"{self.code}: {self.title or self.statement[:50]}"


class RequirementPointOfFocus(models.Model):
    """compliance.requirement_points_of_focus — point of focus for a requirement."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    pof_code_id = models.CharField(max_length=100, unique=True, blank=True, help_text="Unique human-readable/external identifier")
    requirement = models.ForeignKey(
        Requirement, on_delete=models.CASCADE, related_name="points_of_focus", db_column="requirement_id"
    )
    pof_code = models.CharField(max_length=50, blank=True)
    pof_text = models.TextField()
    sort_order = models.IntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "requirement_points_of_focus"
        ordering = ["sort_order"]

    def __str__(self):
        return f"{self.requirement.code} PoF: {self.pof_text[:50]}"


class ControlRequirementMapping(models.Model):
    """compliance.control_requirement_mappings — maps controls to requirements (and optional PoF)."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    control_requirement_map_code_id = models.CharField(max_length=100, unique=True, blank=True, help_text="Unique human-readable/external identifier")
    control = models.ForeignKey(
        ComplianceControl, on_delete=models.CASCADE, related_name="requirement_mappings", db_column="control_id"
    )
    requirement = models.ForeignKey(
        Requirement, on_delete=models.CASCADE, related_name="control_mappings", db_column="requirement_id"
    )
    point_of_focus = models.ForeignKey(
        RequirementPointOfFocus, on_delete=models.CASCADE, null=True, blank=True,
        related_name="control_mappings", db_column="point_of_focus_id"
    )
    coverage = models.CharField(max_length=50, blank=True)  # full/partial/supporting/exceeds
    primary_control_flag = models.BooleanField(default=False)  # TRUE for exactly one primary full control per requirement
    mapping_notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "control_requirement_mappings"
        ordering = ["requirement", "control"]
        constraints = [
            models.UniqueConstraint(
                fields=["control", "requirement", "point_of_focus"],
                name="crm_unique_control_req_pof",
                nulls_distinct=False,
            ),
            models.UniqueConstraint(
                fields=["requirement"],
                condition=Q(primary_control_flag=True),
                name="crm_one_primary_per_req",
            ),
        ]

    def __str__(self):
        return f"{self.control.control_id} -> {self.requirement.code}"
