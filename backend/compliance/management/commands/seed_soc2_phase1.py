"""
Phase 1 seed: frameworks + framework_versions from SOC2 Data Seed CSVs 3 and 4.
Run from backend: python manage.py seed_soc2_phase1 [--csv-dir PATH]
Uses compliance DB (router).
"""
import csv
from datetime import datetime
from pathlib import Path

from django.core.management.base import BaseCommand
from django.db import transaction

from compliance.models import ComplianceFramework, FrameworkVersion


def default_csv_dir():
    # From compliance/management/commands/ -> backend -> opticiniv3 -> workspace root
    backend = Path(__file__).resolve().parent.parent.parent.parent
    root = backend.parent.parent
    return root / "docs" / "SOC2 Data Seed"


class Command(BaseCommand):
    help = "Seed compliance.frameworks and compliance.framework_versions from CSVs 3 and 4 (Phase 1)."

    def add_arguments(self, parser):
        parser.add_argument(
            "--csv-dir",
            type=str,
            default=None,
            help="Directory containing 3 Frameworks_seed.csv and 4 framework_versions_seed.csv (default: docs/SOC2 Data Seed)",
        )
        parser.add_argument(
            "--dry-run",
            action="store_true",
            help="Print what would be created/updated without writing.",
        )

    def handle(self, *args, **options):
        csv_dir = options.get("csv_dir") or str(default_csv_dir())
        dry_run = options.get("dry_run", False)
        path = Path(csv_dir)
        frameworks_csv = path / "3 Frameworks_seed.csv"
        versions_csv = path / "4 framework_versions_seed.csv"
        if not frameworks_csv.exists():
            self.stderr.write(self.style.ERROR(f"Missing: {frameworks_csv}"))
            return
        if not versions_csv.exists():
            self.stderr.write(self.style.ERROR(f"Missing: {versions_csv}"))
            return

        if dry_run:
            self.stdout.write("DRY RUN — no changes will be saved.")

        with transaction.atomic(using="compliance"):
            # 1. Frameworks
            with open(frameworks_csv, newline="", encoding="utf-8") as f:
                reader = csv.DictReader(f)
                for row in reader:
                    code_id = (row.get("framework_code_id") or "").strip()
                    if not code_id:
                        continue
                    name = (row.get("framework_name") or "").strip() or code_id
                    publisher = (row.get("publisher") or "").strip()
                    family = (row.get("family") or "").strip()
                    description = (row.get("description") or "").strip()
                    if dry_run:
                        self.stdout.write(f"  Framework: {code_id} -> {name} ({publisher}, {family})")
                        continue
                    obj, created = ComplianceFramework.objects.using("compliance").update_or_create(
                        framework_code_id=code_id,
                        defaults={
                            "name": name,
                            "code": code_id,
                            "category": family or "compliance",
                            "description": description,
                            "publisher": publisher,
                            "family": family,
                        },
                    )
                    self.stdout.write(
                        self.style.SUCCESS(f"  {'Created' if created else 'Updated'} framework: {obj.framework_code_id} {obj.name}")
                    )

            # 2. Framework versions (depend on frameworks)
            with open(versions_csv, newline="", encoding="utf-8") as f:
                reader = csv.DictReader(f)
                for row in reader:
                    fw_code_id = (row.get("framework_code_id") or "").strip()
                    version_code_id = (row.get("framework_version_code_id") or "").strip()
                    if not fw_code_id or not version_code_id:
                        continue
                    framework = ComplianceFramework.objects.using("compliance").filter(framework_code_id=fw_code_id).first()
                    if not framework:
                        self.stderr.write(self.style.WARNING(f"  Skip version {version_code_id}: framework {fw_code_id} not found."))
                        continue
                    version_name = (row.get("version_name") or "").strip() or version_code_id
                    effective_date = (row.get("effective_date") or "").strip()
                    notes = (row.get("notes") or "").strip()
                    if effective_date:
                        try:
                            effective_date = datetime.strptime(effective_date, "%Y-%m-%d").date()
                        except ValueError:
                            effective_date = None
                    else:
                        effective_date = None
                    if dry_run:
                        self.stdout.write(f"  Version: {version_code_id} -> {version_name} (framework {fw_code_id})")
                        continue
                    obj, created = FrameworkVersion.objects.using("compliance").update_or_create(
                        framework_version_code_id=version_code_id,
                        defaults={
                            "framework_id": framework.id,
                            "version_name": version_name,
                            "effective_date": effective_date,
                            "notes": notes,
                        },
                    )
                    self.stdout.write(
                        self.style.SUCCESS(f"  {'Created' if created else 'Updated'} version: {obj.framework_version_code_id} {obj.version_name}")
                    )

        self.stdout.write(self.style.SUCCESS("Phase 1 seed done."))
