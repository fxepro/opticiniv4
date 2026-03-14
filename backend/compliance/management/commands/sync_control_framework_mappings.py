"""
Sync control_framework_mappings from control_requirement_mappings.

Controls are linked to frameworks via: control → requirement → framework_version → framework.
This command populates control_framework_mappings (direct control → framework) so that
Audit Hub, controls list, and framework detail pages show controls correctly.

Run: python manage.py sync_control_framework_mappings [--dry-run]
"""
from django.core.management.base import BaseCommand
from django.db import transaction

from compliance.models import (
    ComplianceControl,
    ComplianceControlFrameworkMapping,
    ControlRequirementMapping,
)


class Command(BaseCommand):
    help = "Populate control_framework_mappings from control_requirement_mappings (requirement → framework)."

    def add_arguments(self, parser):
        parser.add_argument("--dry-run", action="store_true", help="Show what would be created without writing")

    def handle(self, *args, **options):
        dry_run = options.get("dry_run", False)

        # Get distinct (control_id, framework_id, framework_name) from requirement path
        # control_requirement_mappings → requirement → framework_version → framework
        rows = (
            ControlRequirementMapping.objects.using("compliance")
            .filter(requirement__framework_version__framework_id__isnull=False)
            .values("control_id", "requirement__framework_version__framework_id", "requirement__framework_version__framework__name")
            .distinct()
        )

        pairs = set()
        for r in rows:
            cid = r["control_id"]
            fid = r["requirement__framework_version__framework_id"]
            fname = r["requirement__framework_version__framework__name"] or ""
            if cid and fid:
                pairs.add((cid, fid, fname))

        created = 0
        skipped = 0

        with transaction.atomic(using="compliance"):
            for control_id, framework_id, framework_name in sorted(pairs, key=lambda x: (str(x[0]), str(x[1]))):
                existing = ComplianceControlFrameworkMapping.objects.using("compliance").filter(
                    control_id=control_id, framework_id=framework_id
                ).exists()
                if existing:
                    skipped += 1
                    continue
                if dry_run:
                    self.stdout.write(f"  Would create: control={control_id} framework={framework_name} ({framework_id})")
                    created += 1
                    continue
                ComplianceControlFrameworkMapping.objects.using("compliance").get_or_create(
                    control_id=control_id,
                    framework_id=framework_id,
                    defaults={"framework_name": framework_name},
                )
                created += 1

        self.stdout.write(
            self.style.SUCCESS(f"Created {created} mapping(s), skipped {skipped} existing. Dry-run={dry_run}")
        )
