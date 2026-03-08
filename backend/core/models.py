"""
Platform core schema: VersionRelease (platform).
Org-scoped entities (Organization, Team, Environment, Country, etc.) live in org schema.
Import from platform_org.models. See docs/Platform design DB.
"""
import uuid
from django.conf import settings
from django.db import models


# --- Platform tables (core schema) ---

class VersionRelease(models.Model):
    """
    Release version and notes; admin adds notes and approves.
    Only one release can be is_current at a time (the live version shown by /api/version/).
    """
    STATUS_DRAFT = "draft"
    STATUS_PENDING = "pending_approval"
    STATUS_APPROVED = "approved"
    STATUS_CHOICES = [
        (STATUS_DRAFT, "Draft"),
        (STATUS_PENDING, "Pending approval"),
        (STATUS_APPROVED, "Approved"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    version = models.CharField(max_length=50, unique=True)  # e.g. 0.1.0
    release_notes = models.TextField(blank=True, help_text="Changes in this release")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=STATUS_DRAFT)
    is_current = models.BooleanField(default=False, help_text="If True, this version is served by /api/version/")
    proposed_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="proposed_version_releases",
        db_column="proposed_by_id",
    )
    approved_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="approved_version_releases",
        db_column="approved_by_id",
    )
    approved_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "version_releases"
        ordering = ["-created_at"]
        verbose_name = "Version release"
        verbose_name_plural = "Version releases"

    def __str__(self):
        return f"{self.version} ({self.get_status_display()})"
