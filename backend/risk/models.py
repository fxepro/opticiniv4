"""
Risk schema: asset risk scores, risk factors, risk register (aggregation layer).
Tables in PostgreSQL schema `risk`. See docs/Platform design DB.
"""
import uuid
from django.db import models


class AssetRiskScore(models.Model):
    """risk.asset_risk_scores"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    asset_id = models.UUIDField(null=False, db_index=True)
    operational_risk = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    security_risk = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    compliance_risk = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    financial_risk = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    composite_score = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)

    class Meta:
        db_table = "asset_risk_scores"


class RiskFactor(models.Model):
    """risk.risk_factors"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    asset_id = models.UUIDField(null=False, db_index=True)
    factor_type = models.CharField(max_length=64)
    source_module = models.CharField(max_length=64)

    class Meta:
        db_table = "risk_factors"


class RiskRegister(models.Model):
    """risk.risk_register — enterprise-level risk tracking."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=512)
    severity = models.CharField(max_length=32)
    status = models.CharField(max_length=32)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "risk_register"
