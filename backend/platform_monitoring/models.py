"""
Platform monitoring schema: incidents, alerts, uptime_metrics (asset-centric operational telemetry).
Tables in PostgreSQL schema `monitoring`. See docs/Platform design DB.
Consumed by risk and change (e.g. change_incident_links).
"""
import uuid
from django.db import models


class Incident(models.Model):
    """monitoring.incidents — asset-linked incident (platform telemetry)."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    asset_id = models.UUIDField(null=False, db_index=True)
    severity = models.CharField(max_length=32)
    opened_at = models.DateTimeField()

    class Meta:
        db_table = "incidents"


class Alert(models.Model):
    """monitoring.alerts — alerts tied to assets (and optionally to an incident)."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    asset_id = models.UUIDField(null=False, db_index=True)
    severity = models.CharField(max_length=32)
    message = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    acknowledged_at = models.DateTimeField(null=True, blank=True)
    incident_id = models.UUIDField(null=True, blank=True, db_index=True)

    class Meta:
        db_table = "alerts"


class UptimeMetric(models.Model):
    """monitoring.uptime_metrics — uptime aggregates per asset/period."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    asset_id = models.UUIDField(null=False, db_index=True)
    period_start = models.DateTimeField()
    period_end = models.DateTimeField()
    uptime_pct = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    check_count = models.IntegerField(null=True, blank=True)
    down_count = models.IntegerField(null=True, blank=True)

    class Meta:
        db_table = "uptime_metrics"
