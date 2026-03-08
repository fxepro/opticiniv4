"""
Discovery schema (System of Record): assets, connectors, ownership, etc.
Tables in PostgreSQL schema `discovery`. Other modules reference via asset_id.
See docs/Platform design DB.
"""
import uuid
from django.db import models


class Account(models.Model):
    """discovery.accounts — Cloud accounts (AWS/Azure/GCP) for asset sync."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    organization_id = models.UUIDField(null=False, db_index=True)
    name = models.CharField(max_length=255)
    provider = models.CharField(max_length=64)
    external_id = models.CharField(max_length=255, blank=True)
    environment = models.CharField(max_length=64, blank=True)  # e.g. Production, Staging
    last_sync_at = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=32, blank=True)  # e.g. synced, stale, error
    resource_count = models.IntegerField(null=True, blank=True)

    class Meta:
        db_table = "accounts"  # schema discovery via DATABASES['discovery'] + router


class Connector(models.Model):
    """discovery.connectors"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    organization_id = models.UUIDField(null=False, db_index=True)
    name = models.CharField(max_length=255)
    connector_type = models.CharField(max_length=64)
    last_sync_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = "connectors"


class Asset(models.Model):
    """discovery.assets — CMDB. Other modules reference via asset_id.
    See docs/Database design/Discovery-Schema-Tables-and-Columns.md.
    """
    LIFECYCLE_ACTIVE = "active"
    LIFECYCLE_INACTIVE = "inactive"
    LIFECYCLE_RETIRED = "retired"
    LIFECYCLE_DELETED = "deleted"
    LIFECYCLE_CHOICES = [
        (LIFECYCLE_ACTIVE, "Active"),
        (LIFECYCLE_INACTIVE, "Inactive"),
        (LIFECYCLE_RETIRED, "Retired"),
        (LIFECYCLE_DELETED, "Deleted"),
    ]

    SOURCE_CLOUD = "cloud"
    SOURCE_ONPREM = "onprem"
    SOURCE_NETWORK = "network"
    SOURCE_MANUAL = "manual"
    SOURCE_CHOICES = [
        (SOURCE_CLOUD, "Cloud"),
        (SOURCE_ONPREM, "On-prem"),
        (SOURCE_NETWORK, "Network"),
        (SOURCE_MANUAL, "Manual"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    asset_key = models.CharField(max_length=128, blank=True)
    organization_id = models.UUIDField(null=False, db_index=True)
    name = models.CharField(max_length=512)
    asset_type = models.CharField(max_length=64)
    environment_id = models.UUIDField(null=True, blank=True)
    lifecycle_state = models.CharField(
        max_length=32,
        choices=LIFECYCLE_CHOICES,
        default=LIFECYCLE_ACTIVE,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # --- Signal / inventory fields (BRD Discovery-Asset Inventory Improvements) ---
    source_type = models.CharField(max_length=32, blank=True)
    provider = models.CharField(max_length=64, blank=True)
    account_id = models.UUIDField(null=True, blank=True, db_index=True)
    last_seen_at = models.DateTimeField(null=True, blank=True)
    last_changed_at = models.DateTimeField(null=True, blank=True)
    criticality = models.CharField(max_length=32, blank=True)
    in_scope_soc2 = models.BooleanField(default=False)
    scope_flags = models.JSONField(null=True, blank=True)
    owner_display = models.CharField(max_length=255, blank=True)
    attributes_public = models.JSONField(null=True, blank=True)
    attributes_internal = models.JSONField(null=True, blank=True)
    region = models.CharField(max_length=128, blank=True)
    site = models.CharField(max_length=128, blank=True)
    application_id = models.UUIDField(null=True, blank=True, db_index=True)
    depends_on_count = models.IntegerField(null=True, blank=True)
    used_by_count = models.IntegerField(null=True, blank=True)
    provider_resource_id = models.CharField(max_length=512, blank=True)
    hostname = models.CharField(max_length=512, blank=True)
    primary_ip = models.CharField(max_length=64, blank=True)
    k8s_cluster = models.CharField(max_length=255, blank=True)
    k8s_namespace = models.CharField(max_length=255, blank=True)
    connector_id = models.UUIDField(null=True, blank=True, db_index=True)
    data_classification = models.CharField(max_length=64, blank=True)
    confidence_score = models.DecimalField(
        max_digits=3, decimal_places=2, null=True, blank=True
    )
    tags_preview = models.JSONField(null=True, blank=True)

    class Meta:
        db_table = "assets"

    def __str__(self):
        return self.name


class AssetAttribute(models.Model):
    """discovery.asset_attributes"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    asset = models.ForeignKey(Asset, on_delete=models.CASCADE, related_name="attributes", db_column="asset_id")
    key = models.CharField(max_length=255)
    value = models.TextField(blank=True)

    class Meta:
        db_table = "asset_attributes"


class AssetRelationship(models.Model):
    """discovery.asset_relationships"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    source_asset = models.ForeignKey(Asset, on_delete=models.CASCADE, related_name="outgoing_relationships", db_column="source_asset_id")
    target_asset = models.ForeignKey(Asset, on_delete=models.CASCADE, related_name="incoming_relationships", db_column="target_asset_id")
    relationship_type = models.CharField(max_length=64)

    class Meta:
        db_table = "asset_relationships"


class AssetVersion(models.Model):
    """discovery.asset_versions"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    asset = models.ForeignKey(Asset, on_delete=models.CASCADE, related_name="versions", db_column="asset_id")
    version = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "asset_versions"


class AssetChange(models.Model):
    """discovery.asset_changes"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    asset = models.ForeignKey(Asset, on_delete=models.CASCADE, related_name="changes", db_column="asset_id")
    change_type = models.CharField(max_length=64)
    detected_at = models.DateTimeField(auto_now_add=True)
    risk_score = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)

    class Meta:
        db_table = "asset_changes"


class AssetOwnership(models.Model):
    """discovery.asset_ownership — Technical or business owner per asset."""
    ROLE_TECHNICAL = "technical"
    ROLE_BUSINESS = "business"
    ROLE_CHOICES = [(ROLE_TECHNICAL, "Technical"), (ROLE_BUSINESS, "Business")]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    asset = models.ForeignKey(Asset, on_delete=models.CASCADE, related_name="ownerships", db_column="asset_id")
    role = models.CharField(max_length=32, choices=ROLE_CHOICES, default=ROLE_TECHNICAL)
    team_id = models.UUIDField(null=True, blank=True)
    user_id = models.UUIDField(null=True, blank=True)

    class Meta:
        db_table = "asset_ownership"


class AssetTag(models.Model):
    """discovery.asset_tags"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    asset = models.ForeignKey(Asset, on_delete=models.CASCADE, related_name="tags", db_column="asset_id")
    key = models.CharField(max_length=255)
    value = models.CharField(max_length=512, blank=True)

    class Meta:
        db_table = "asset_tags"


class RawAsset(models.Model):
    """discovery.raw_assets"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    organization_id = models.UUIDField(null=False, db_index=True)
    connector_id = models.UUIDField(null=True, blank=True)
    external_id = models.CharField(max_length=255)
    ingested_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "raw_assets"
