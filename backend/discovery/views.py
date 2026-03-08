"""
Discovery API: assets list, create, retrieve, update, delete.
Scoped by current user's organization.
"""
import uuid
from datetime import timedelta as _timedelta

from django.db.models import Q
from django.utils import timezone
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from discovery.models import Asset, AssetAttribute, AssetTag
from platform_org.models import Environment


def _get_organization_id(request):
    if not request.user.is_authenticated:
        return None
    profile = getattr(request.user, "profile", None)
    if profile is None:
        return None
    return getattr(profile, "organization_id", None)


def _resolve_environment_name(environment_id):
    if not environment_id:
        return None
    env = Environment.objects.using("org").filter(id=environment_id).first()
    return env.name if env else None


def _serialize_asset(asset):
    """Build the same payload as asset_list for one asset."""
    env_name = _resolve_environment_name(asset.environment_id)
    attributes = [{"key": a.key, "value": a.value} for a in asset.attributes.all()]
    tags = [{"key": t.key, "value": t.value} for t in asset.tags.all()]
    if not tags and getattr(asset, "tags_preview", None):
        tags = asset.tags_preview if isinstance(asset.tags_preview, list) else []
    return {
        "id": str(asset.id),
        "asset_key": asset.asset_key or "",
        "name": asset.name,
        "asset_type": asset.asset_type,
        "environment": env_name or "",
        "lifecycle_state": asset.lifecycle_state,
        "owner": getattr(asset, "owner_display", None) or "",
        "organization_id": str(asset.organization_id),
        "environment_id": str(asset.environment_id) if asset.environment_id else None,
        "created_at": asset.created_at.isoformat() if asset.created_at else "",
        "updated_at": asset.updated_at.isoformat() if asset.updated_at else "",
        "attributes": attributes,
        "tags": tags,
        "hostname": getattr(asset, "hostname", None) or "",
        "primary_ip": getattr(asset, "primary_ip", None) or "",
        "source_type": getattr(asset, "source_type", None) or "",
        "provider": getattr(asset, "provider", None) or "",
        "last_seen_at": asset.last_seen_at.isoformat() if getattr(asset, "last_seen_at", None) else None,
        "last_changed_at": asset.last_changed_at.isoformat() if getattr(asset, "last_changed_at", None) else None,
        "region": getattr(asset, "region", None) or "",
        "criticality": getattr(asset, "criticality", None) or "",
        "in_scope_soc2": getattr(asset, "in_scope_soc2", False),
        "scope_flags": getattr(asset, "scope_flags", None),
        "data_classification": getattr(asset, "data_classification", None) or "",
        "depends_on_count": getattr(asset, "depends_on_count", None),
        "used_by_count": getattr(asset, "used_by_count", None),
        "provider_resource_id": getattr(asset, "provider_resource_id", None) or "",
        "connector_id": str(asset.connector_id) if getattr(asset, "connector_id", None) else None,
    }


def _parse_uuid(value):
    if not value:
        return None
    try:
        return uuid.UUID(str(value))
    except (ValueError, TypeError):
        return None


def _asset_create(request):
    org_id = _get_organization_id(request)
    if not org_id:
        return Response(
            {"detail": "No organization assigned."},
            status=status.HTTP_403_FORBIDDEN,
        )
    data = request.data
    name = (data.get("name") or "").strip()
    if not name:
        return Response(
            {"detail": "name is required."},
            status=status.HTTP_400_BAD_REQUEST,
        )
    asset = Asset(
        organization_id=org_id,
        name=name,
        asset_key=(data.get("asset_key") or "").strip() or "",
        asset_type=(data.get("asset_type") or "VM").strip() or "VM",
        environment_id=_parse_uuid(data.get("environment_id")),
        lifecycle_state=(data.get("lifecycle_state") or "active").strip() or "active",
        hostname=(data.get("hostname") or "").strip() or "",
        primary_ip=(data.get("primary_ip") or "").strip() or "",
        region=(data.get("region") or "").strip() or "",
        provider_resource_id=(data.get("provider_resource_id") or "").strip() or "",
        provider=(data.get("provider") or "").strip() or "",
        source_type=(data.get("source_type") or "manual").strip() or "manual",
        owner_display=(data.get("owner") or "").strip() or "",
        criticality=(data.get("criticality") or "").strip() or "",
        data_classification=(data.get("data_classification") or "").strip() or "",
        in_scope_soc2=bool(data.get("in_scope_soc2")),
    )
    asset.save(using="discovery")
    tags = data.get("tags") or []
    for t in tags:
        key = (t.get("key") or "").strip()
        if not key:
            continue
        AssetTag.objects.using("discovery").create(
            asset=asset,
            key=key,
            value=(t.get("value") or "").strip()[:512],
        )
    # Reload with prefetch for response
    asset = (
        Asset.objects.using("discovery")
        .filter(pk=asset.pk)
        .prefetch_related("attributes", "tags")
        .first()
    )
    return Response(_serialize_asset(asset), status=status.HTTP_201_CREATED)


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def asset_list(request):
    """
    GET: List assets for the current user's organization.
    POST: Create a new asset (body: name, asset_key, asset_type, environment_id, lifecycle_state,
          hostname, primary_ip, region, provider_resource_id, provider, source_type,
          owner, criticality, data_classification, in_scope_soc2, tags).
    """
    if request.method == "POST":
        return _asset_create(request)
    # GET — list. Query params: lifecycle, asset_type, environment_id, provider, owner, tag_key, tag_value, freshness, in_scope, search.
    org_id = _get_organization_id(request)
    if not org_id:
        return Response(
            {"detail": "No organization assigned.", "results": []},
            status=status.HTTP_200_OK,
        )

    qs = (
        Asset.objects.using("discovery")
        .filter(organization_id=org_id)
        .prefetch_related("attributes", "tags")
        .order_by("name")
    )

    # Lifecycle (single)
    lifecycle = request.query_params.get("lifecycle")
    if lifecycle:
        qs = qs.filter(lifecycle_state=lifecycle)

    # Type (multi: comma-separated asset_type)
    asset_type = request.query_params.get("asset_type") or request.query_params.get("type")
    if asset_type:
        types = [t.strip() for t in asset_type.split(",") if t.strip()]
        if types:
            qs = qs.filter(asset_type__in=types)

    # Environment (environment_id UUID)
    environment_id = request.query_params.get("environment_id")
    if environment_id:
        qs = qs.filter(environment_id=environment_id)

    # Provider
    provider = request.query_params.get("provider")
    if provider:
        qs = qs.filter(provider__iexact=provider)

    # Account
    account_id = request.query_params.get("account_id")
    if account_id:
        qs = qs.filter(account_id=account_id)

    # Owner (substring on owner_display)
    owner = request.query_params.get("owner")
    if owner:
        qs = qs.filter(owner_display__icontains=owner)

    # Tags: key + value (both required for tag filter)
    tag_key = request.query_params.get("tag_key")
    tag_value = request.query_params.get("tag_value")
    if tag_key:
        qs = qs.filter(tags__key=tag_key)
        if tag_value is not None:
            qs = qs.filter(tags__value=tag_value)
        qs = qs.distinct()

    # Freshness: fresh <1h, recent <24h, stale otherwise
    freshness = request.query_params.get("freshness")
    if freshness:
        now = timezone.now()
        if freshness == "fresh":
            qs = qs.filter(last_seen_at__gte=now - _timedelta(hours=1))
        elif freshness == "recent":
            qs = qs.filter(last_seen_at__gte=now - _timedelta(hours=24))
        elif freshness == "stale":
            qs = qs.filter(Q(last_seen_at__lt=now - _timedelta(hours=24)) | Q(last_seen_at__isnull=True))

    # In-scope (SOC2)
    in_scope = request.query_params.get("in_scope")
    if in_scope is not None and in_scope.lower() in ("true", "yes", "1"):
        qs = qs.filter(in_scope_soc2=True)
    elif in_scope is not None and in_scope.lower() in ("false", "no", "0"):
        qs = qs.filter(in_scope_soc2=False)

    # Search: name, asset_key, hostname, primary_ip (case-insensitive)
    search = request.query_params.get("search")
    if search and search.strip():
        s = search.strip()
        qs = qs.filter(
            Q(name__icontains=s)
            | Q(asset_key__icontains=s)
            | Q(hostname__icontains=s)
            | Q(primary_ip__icontains=s)
        )

    results = []
    for asset in qs:
        env_name = _resolve_environment_name(asset.environment_id)
        attributes = [{"key": a.key, "value": a.value} for a in asset.attributes.all()]
        tags = [{"key": t.key, "value": t.value} for t in asset.tags.all()]
        if not tags and getattr(asset, "tags_preview", None):
            tags = asset.tags_preview if isinstance(asset.tags_preview, list) else []
        results.append({
            "id": str(asset.id),
            "asset_key": asset.asset_key or "",
            "name": asset.name,
            "asset_type": asset.asset_type,
            "environment": env_name or "",
            "lifecycle_state": asset.lifecycle_state,
            "owner": getattr(asset, "owner_display", None) or "",
            "organization_id": str(asset.organization_id),
            "environment_id": str(asset.environment_id) if asset.environment_id else None,
            "created_at": asset.created_at.isoformat() if asset.created_at else "",
            "updated_at": asset.updated_at.isoformat() if asset.updated_at else "",
            "attributes": attributes,
            "tags": tags,
            "hostname": getattr(asset, "hostname", None) or "",
            "primary_ip": getattr(asset, "primary_ip", None) or "",
            "source_type": getattr(asset, "source_type", None) or "",
            "provider": getattr(asset, "provider", None) or "",
            "last_seen_at": asset.last_seen_at.isoformat() if getattr(asset, "last_seen_at", None) else None,
            "last_changed_at": asset.last_changed_at.isoformat() if getattr(asset, "last_changed_at", None) else None,
            "region": getattr(asset, "region", None) or "",
            "criticality": getattr(asset, "criticality", None) or "",
            "in_scope_soc2": getattr(asset, "in_scope_soc2", False),
            "scope_flags": getattr(asset, "scope_flags", None),
            "data_classification": getattr(asset, "data_classification", None) or "",
            "depends_on_count": getattr(asset, "depends_on_count", None),
            "used_by_count": getattr(asset, "used_by_count", None),
            "provider_resource_id": getattr(asset, "provider_resource_id", None) or "",
            "connector_id": str(asset.connector_id) if getattr(asset, "connector_id", None) else None,
        })

    return Response({"results": results})


@api_view(["GET", "PATCH", "DELETE"])
@permission_classes([IsAuthenticated])
def asset_detail(request, asset_id):
    """
    GET: Retrieve one asset.
    PATCH: Update asset (partial; same fields as create + tags replaced).
    DELETE: Delete asset.
    """
    org_id = _get_organization_id(request)
    if not org_id:
        return Response(
            {"detail": "No organization assigned."},
            status=status.HTTP_403_FORBIDDEN,
        )
    asset = (
        Asset.objects.using("discovery")
        .filter(pk=asset_id, organization_id=org_id)
        .prefetch_related("attributes", "tags")
        .first()
    )
    if not asset:
        return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
    if request.method == "GET":
        return Response(_serialize_asset(asset))
    if request.method == "DELETE":
        asset.delete(using="discovery")
        return Response(status=status.HTTP_204_NO_CONTENT)
    # PATCH
    data = request.data
    if "name" in data and (data.get("name") or "").strip():
        asset.name = (data["name"] or "").strip()
    if "asset_key" in data:
        asset.asset_key = (data.get("asset_key") or "").strip() or ""
    if "asset_type" in data:
        asset.asset_type = (data.get("asset_type") or "VM").strip() or "VM"
    if "environment_id" in data:
        asset.environment_id = _parse_uuid(data.get("environment_id"))
    if "lifecycle_state" in data:
        asset.lifecycle_state = (data.get("lifecycle_state") or "active").strip() or "active"
    if "hostname" in data:
        asset.hostname = (data.get("hostname") or "").strip() or ""
    if "primary_ip" in data:
        asset.primary_ip = (data.get("primary_ip") or "").strip() or ""
    if "region" in data:
        asset.region = (data.get("region") or "").strip() or ""
    if "provider_resource_id" in data:
        asset.provider_resource_id = (data.get("provider_resource_id") or "").strip() or ""
    if "provider" in data:
        asset.provider = (data.get("provider") or "").strip() or ""
    if "source_type" in data:
        asset.source_type = (data.get("source_type") or "manual").strip() or "manual"
    if "owner" in data:
        asset.owner_display = (data.get("owner") or "").strip() or ""
    if "criticality" in data:
        asset.criticality = (data.get("criticality") or "").strip() or ""
    if "data_classification" in data:
        asset.data_classification = (data.get("data_classification") or "").strip() or ""
    if "in_scope_soc2" in data:
        asset.in_scope_soc2 = bool(data.get("in_scope_soc2"))
    asset.save(using="discovery")
    if "tags" in data:
        AssetTag.objects.using("discovery").filter(asset=asset).delete()
        for t in data.get("tags") or []:
            key = (t.get("key") or "").strip()
            if not key:
                continue
            AssetTag.objects.using("discovery").create(
                asset=asset,
                key=key,
                value=(t.get("value") or "").strip()[:512],
            )
    asset = (
        Asset.objects.using("discovery")
        .filter(pk=asset.pk)
        .prefetch_related("attributes", "tags")
        .first()
    )
    return Response(_serialize_asset(asset))
