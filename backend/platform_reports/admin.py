from django.contrib import admin
from .models import MaterializedAssetSummary, ComplianceSummary, RiskTrends


@admin.register(MaterializedAssetSummary)
class MaterializedAssetSummaryAdmin(admin.ModelAdmin):
    list_display = ("asset_id", "refreshed_at", "attribute_count", "risk_score", "compliance_status")
    list_filter = ("refreshed_at",)
    search_fields = ("asset_id",)


@admin.register(ComplianceSummary)
class ComplianceSummaryAdmin(admin.ModelAdmin):
    list_display = ("id", "as_of", "framework_id", "organization_id", "total_controls", "compliant_count", "gap_count")
    list_filter = ("as_of",)
    search_fields = ("framework_id", "organization_id")


@admin.register(RiskTrends)
class RiskTrendsAdmin(admin.ModelAdmin):
    list_display = ("snapshot_date", "asset_id", "organization_id", "composite_score", "trend_direction")
    list_filter = ("snapshot_date", "trend_direction")
    search_fields = ("asset_id", "organization_id")
