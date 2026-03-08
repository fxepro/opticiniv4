"""
Seed discovery.assets and discovery.asset_attributes with dummy data for VISION Inc.
Creates org + environments in core if needed, then assets in discovery.
Run: python manage.py seed_discovery_assets
"""
import uuid
from django.core.management.base import BaseCommand
from platform_org.models import Organization, Environment
from discovery.models import Asset, AssetAttribute


# Fixed UUIDs so API returns stable ids (match frontend mock)
ASSET_IDS = [
    "00000000-0000-0000-0000-000000000001",
    "00000000-0000-0000-0000-000000000002",
    "00000000-0000-0000-0000-000000000003",
    "00000000-0000-0000-0000-000000000004",
    "00000000-0000-0000-0000-000000000005",
]

SEED_ASSETS = [
    {
        "asset_key": "SRV-001",
        "name": "web-api-prod-01",
        "asset_type": "VM",
        "lifecycle_state": "active",
        "env_type": "production",
        "attributes": [
            ("hostname", "web-api-prod-01.example.internal"),
            ("ip_address", "10.0.1.12"),
            ("os", "Ubuntu 22.04 LTS"),
            ("cpu", "4 vCPU"),
            ("memory", "16 GiB"),
            ("environment", "Production"),
            ("source", "AWS EC2"),
            ("account", "Production AWS"),
        ],
    },
    {
        "asset_key": "DB-001",
        "name": "db-primary",
        "asset_type": "Database",
        "lifecycle_state": "active",
        "env_type": "production",
        "attributes": [
            ("engine", "PostgreSQL 15"),
            ("endpoint", "db-primary.internal:5432"),
            ("storage", "1 TB"),
            ("environment", "Production"),
            ("source", "AWS RDS"),
        ],
    },
    {
        "asset_key": "CACHE-001",
        "name": "cache-redis-01",
        "asset_type": "Container",
        "lifecycle_state": "active",
        "env_type": "staging",
        "attributes": [
            ("engine", "Redis 7"),
            ("cluster", "cache-stg"),
            ("environment", "Staging"),
        ],
    },
    {
        "asset_key": "SRV-LEG-001",
        "name": "legacy-app-server",
        "asset_type": "Server",
        "lifecycle_state": "retired",
        "env_type": "production",
        "attributes": [
            ("hostname", "legacy-app-01.dc1.example.internal"),
            ("os", "RHEL 6"),
            ("decommission_plan", "Q2 2025"),
        ],
    },
    {
        "asset_key": "LB-001",
        "name": "lb-frontend",
        "asset_type": "Load Balancer",
        "lifecycle_state": "active",
        "env_type": "production",
        "attributes": [
            ("vip", "203.0.113.10"),
            ("ports", "80, 443"),
            ("backend_pool", "web-api-prod"),
        ],
    },
]


class Command(BaseCommand):
    help = "Seed discovery assets and attributes for VISION Inc (creates org/envs in core if needed)"

    def add_arguments(self, parser):
        parser.add_argument("--clear", action="store_true", help="Delete existing discovery assets before seeding")
        parser.add_argument("--dry-run", action="store_true", help="Only print what would be done")

    def handle(self, *args, **options):
        dry_run = options["dry_run"]
        clear = options["clear"]

        # Resolve org and environments from core
        org = Organization.objects.using("org").filter(name="VISION Inc").first()
        if not org:
            if dry_run:
                self.stdout.write("Would create organization VISION Inc")
                return
            org = Organization.objects.using("org").create(name="VISION Inc", tier="pro")
            self.stdout.write(self.style.SUCCESS(f"Created organization: {org.name} (id={org.id})"))
        else:
            self.stdout.write(f"Using organization: {org.name} (id={org.id})")

        env_prod = Environment.objects.using("org").filter(organization_id=org.id, type="production").first()
        if not env_prod:
            if dry_run:
                self.stdout.write("Would create environment Production")
            else:
                env_prod = Environment.objects.using("org").create(
                    organization_id=org.id, name="Production", type="production"
                )
                self.stdout.write(self.style.SUCCESS("Created environment: Production"))
        env_stg = Environment.objects.using("org").filter(organization_id=org.id, type="staging").first()
        if not env_stg:
            if dry_run:
                self.stdout.write("Would create environment Staging")
            else:
                env_stg = Environment.objects.using("org").create(
                    organization_id=org.id, name="Staging", type="staging"
                )
                self.stdout.write(self.style.SUCCESS("Created environment: Staging"))

        if clear:
            n = Asset.objects.using("discovery").count()
            if not dry_run:
                AssetAttribute.objects.using("discovery").all().delete()
                Asset.objects.using("discovery").all().delete()
            self.stdout.write(self.style.WARNING(f"Cleared {n} assets from discovery"))

        env_by_type = {"production": env_prod, "staging": env_stg}
        created = 0
        for i, data in enumerate(SEED_ASSETS):
            asset_id = uuid.UUID(ASSET_IDS[i])
            env = env_by_type.get(data["env_type"], env_prod)
            if dry_run:
                self.stdout.write(f"Would create asset: {data['asset_key']} ({data['name']})")
                created += 1
                continue
            asset, created_asset = Asset.objects.using("discovery").get_or_create(
                id=asset_id,
                defaults={
                    "organization_id": org.id,
                    "asset_key": data["asset_key"],
                    "name": data["name"],
                    "asset_type": data["asset_type"],
                    "environment_id": env.id,
                    "lifecycle_state": data["lifecycle_state"],
                },
            )
            if created_asset:
                created += 1
                for key, value in data["attributes"]:
                    AssetAttribute.objects.using("discovery").create(
                        asset=asset,
                        key=key,
                        value=value,
                    )
            else:
                # Update attributes: replace all for this asset
                AssetAttribute.objects.using("discovery").filter(asset=asset).delete()
                for key, value in data["attributes"]:
                    AssetAttribute.objects.using("discovery").create(
                        asset=asset,
                        key=key,
                        value=value,
                    )

        self.stdout.write(self.style.SUCCESS(f"Seeded {created} assets (total in DB: {Asset.objects.using('discovery').count()})"))
