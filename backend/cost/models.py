"""
Cost schema: billing accounts, cost records, forecasts, budgets, waste findings.
Tables in PostgreSQL schema `cost`. See docs/Platform design DB.
"""
import uuid
from django.db import models


class BillingAccount(models.Model):
    """cost.billing_accounts"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    provider = models.CharField(max_length=64)

    class Meta:
        db_table = "billing_accounts"


class CostRecord(models.Model):
    """cost.cost_records"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    asset_id = models.UUIDField(null=False, db_index=True)
    period_start = models.DateField()
    cost_amount = models.DecimalField(max_digits=14, decimal_places=2)

    class Meta:
        db_table = "cost_records"


class Forecast(models.Model):
    """cost.forecasts"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    asset_id = models.UUIDField(null=True, blank=True, db_index=True)
    period_start = models.DateField()
    period_end = models.DateField(null=True, blank=True)
    forecast_amount = models.DecimalField(max_digits=14, decimal_places=2, null=True, blank=True)

    class Meta:
        db_table = "forecasts"


class Budget(models.Model):
    """cost.budgets"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=14, decimal_places=2)
    period_start = models.DateField()
    period_end = models.DateField(null=True, blank=True)

    class Meta:
        db_table = "budgets"


class WasteFinding(models.Model):
    """cost.waste_findings"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    asset_id = models.UUIDField(null=True, blank=True, db_index=True)
    waste_amount = models.DecimalField(max_digits=14, decimal_places=2, null=True, blank=True)
    detected_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "waste_findings"
