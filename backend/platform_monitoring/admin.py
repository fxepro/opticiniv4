from django.contrib import admin
from .models import Incident, Alert, UptimeMetric


@admin.register(Incident)
class IncidentAdmin(admin.ModelAdmin):
    list_display = ("id", "asset_id", "severity", "opened_at")
    list_filter = ("severity",)
    search_fields = ("asset_id",)


@admin.register(Alert)
class AlertAdmin(admin.ModelAdmin):
    list_display = ("id", "asset_id", "severity", "created_at", "acknowledged_at", "incident_id")
    list_filter = ("severity",)
    search_fields = ("asset_id", "message")


@admin.register(UptimeMetric)
class UptimeMetricAdmin(admin.ModelAdmin):
    list_display = ("id", "asset_id", "period_start", "period_end", "uptime_pct", "check_count", "down_count")
    list_filter = ("period_start",)
    search_fields = ("asset_id",)
