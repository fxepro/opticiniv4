"""
Platform reports schema: precomputed analytics (materialized_asset_summary, compliance_summary, risk_trends).
Tables in PostgreSQL schema `reports`. See docs/Platform design DB.
"""
import uuid
from django.db import models


class MaterializedAssetSummary(models.Model):
    """reports.materialized_asset_summary — precomputed per-asset summary."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    asset_id = models.UUIDField(null=False, db_index=True, unique=True)
    refreshed_at = models.DateTimeField()
    attribute_count = models.IntegerField(null=True, blank=True)
    relationship_count = models.IntegerField(null=True, blank=True)
    total_cost = models.DecimalField(max_digits=14, decimal_places=2, null=True, blank=True)
    risk_score = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    compliance_status = models.CharField(max_length=32, blank=True)

    class Meta:
        db_table = "materialized_asset_summary"


class ComplianceSummary(models.Model):
    """reports.compliance_summary — precomputed compliance aggregates (e.g. per framework/org)."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    as_of = models.DateTimeField()
    framework_id = models.UUIDField(null=True, blank=True, db_index=True)
    organization_id = models.UUIDField(null=True, blank=True, db_index=True)
    total_controls = models.IntegerField(null=True, blank=True)
    compliant_count = models.IntegerField(null=True, blank=True)
    gap_count = models.IntegerField(null=True, blank=True)

    class Meta:
        db_table = "compliance_summary"


class RiskTrends(models.Model):
    """reports.risk_trends — precomputed risk trend snapshots (e.g. per asset or org)."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    snapshot_date = models.DateField(db_index=True)
    asset_id = models.UUIDField(null=True, blank=True, db_index=True)
    organization_id = models.UUIDField(null=True, blank=True, db_index=True)
    composite_score = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    trend_direction = models.CharField(max_length=16, blank=True)

    class Meta:
        db_table = "risk_trends"
