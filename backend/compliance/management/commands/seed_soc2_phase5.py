"""
Phase 5 seed: control_evidence_requirements from 10 control_evidence_requirements.csv.
Run: python manage.py seed_soc2_phase5 [--csv-dir PATH] [--dry-run]
"""
import csv
from pathlib import Path

from django.core.management.base import BaseCommand
from django.db import transaction

from compliance.models import ComplianceControl, ControlEvidenceRequirement


def default_csv_dir():
    backend = Path(__file__).resolve().parent.parent.parent.parent
    return backend.parent.parent / "docs" / "SOC2 Data Seed"


class Command(BaseCommand):
    help = "Seed control_evidence_requirements from 10 control_evidence_requirements.csv (Phase 5)."

    def add_arguments(self, parser):
        parser.add_argument("--csv-dir", type=str, default=None)
        parser.add_argument("--dry-run", action="store_true")

    def handle(self, *args, **options):
        csv_dir = Path(options.get("csv_dir") or str(default_csv_dir()))
        dry_run = options.get("dry_run", False)
        path = csv_dir / "10 control_evidence_requirements.csv"
        if not path.exists():
            self.stderr.write(self.style.ERROR(f"Missing: {path}"))
            return

        with open(path, newline="", encoding="utf-8") as f:
            rows = list(csv.DictReader(f))

        with transaction.atomic(using="compliance"):
            for row in rows:
                code_id = (row.get("control_code_id") or "").strip()
                evidence_type = (row.get("evidence_type") or "").strip()[:50]
                if not code_id or not evidence_type:
                    continue
                ctrl = ComplianceControl.objects.using("compliance").filter(control_code_id=code_id).first()
                if not ctrl:
                    self.stderr.write(self.style.WARNING(f"  Control {code_id} not found"))
                    continue
                desc = (row.get("evidence_description") or "").strip()
                cadence = (row.get("collection_cadence") or "").strip()
                if cadence:
                    desc = f"{desc} (cadence: {cadence})" if desc else f"Cadence: {cadence}"
                retention = (row.get("retention_guidance") or "").strip()
                if dry_run:
                    self.stdout.write(f"  {code_id} -> {evidence_type}")
                    continue
                ControlEvidenceRequirement.objects.using("compliance").update_or_create(
                    control_id=ctrl.id,
                    evidence_type=evidence_type,
                    source_app="",
                    defaults={"description": desc, "retention_guidance": retention},
                )
                self.stdout.write(self.style.SUCCESS(f"  {ctrl.control_id} requires {evidence_type}"))

        self.stdout.write(self.style.SUCCESS("Phase 5 seed done."))
