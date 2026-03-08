"""
Change schema: change events, deployments, requests, approvals, incident links.
Tables in PostgreSQL schema `change`. See docs/Platform design DB.
"""
import uuid
from django.db import models


class ChangeEvent(models.Model):
    """change.change_events"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    asset_id = models.UUIDField(null=False, db_index=True)
    change_type = models.CharField(max_length=64)
    detected_at = models.DateTimeField(auto_now_add=True)
    risk_score = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)

    class Meta:
        db_table = "change_events"


class Deployment(models.Model):
    """change.deployments"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    application_id = models.UUIDField(null=False, db_index=True)
    deployed_at = models.DateTimeField()
    status = models.CharField(max_length=32)

    class Meta:
        db_table = "deployments"


class ChangeRequest(models.Model):
    """change.change_requests"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=512)
    approval_status = models.CharField(max_length=32)

    class Meta:
        db_table = "change_requests"


class ChangeApproval(models.Model):
    """change.change_approvals"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    change_request_id = models.UUIDField(null=False, db_index=True)
    approved_by = models.UUIDField(null=False)

    class Meta:
        db_table = "change_approvals"


class ChangeIncidentLink(models.Model):
    """change.change_incident_links — maps changes to monitoring incidents."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    change_event_id = models.UUIDField(null=False, db_index=True)
    incident_id = models.UUIDField(null=False, db_index=True)

    class Meta:
        db_table = "change_incident_links"
