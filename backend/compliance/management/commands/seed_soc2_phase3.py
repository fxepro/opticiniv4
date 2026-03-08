"""
Phase 3 seed: controls from 8 controls_library.csv + one control_reviews row per control (last/next review dates).
Run: python manage.py seed_soc2_phase3 [--csv-dir PATH] [--dry-run]
"""
import csv
from datetime import datetime
from pathlib import Path

from django.core.management.base import BaseCommand
from django.db import transaction

from compliance.models import ComplianceControl, ControlReview


def default_csv_dir():
    backend = Path(__file__).resolve().parent.parent.parent.parent
    return backend.parent.parent / "docs" / "SOC2 Data Seed"


def parse_date(s):
    if not (s and str(s).strip()):
        return None
    try:
        return datetime.strptime(str(s).strip()[:10], "%Y-%m-%d")
    except ValueError:
        return None


class Command(BaseCommand):
    help = "Seed compliance.controls and control_reviews from 8 controls_library.csv (Phase 3)."

    def add_arguments(self, parser):
        parser.add_argument("--csv-dir", type=str, default=None)
        parser.add_argument("--dry-run", action="store_true")

    def handle(self, *args, **options):
        csv_dir = Path(options.get("csv_dir") or str(default_csv_dir()))
        dry_run = options.get("dry_run", False)
        path = csv_dir / "8 controls_library.csv"
        if not path.exists():
            self.stderr.write(self.style.ERROR(f"Missing: {path}"))
            return

        with open(path, newline="", encoding="utf-8") as f:
            rows = list(csv.DictReader(f))

        with transaction.atomic(using="compliance"):
            for row in rows:
                code_id = (row.get("control_code_id") or "").strip()
                control_code = (row.get("control_code") or "").strip()
                if not code_id or not control_code:
                    continue
                name = (row.get("name") or "").strip() or control_code
                description = (row.get("description") or "").strip() or name
                last_review = parse_date(row.get("last_review_date"))
                next_review = parse_date(row.get("next_review_date"))

                if dry_run:
                    self.stdout.write(f"  {control_code} {name}")
                    continue

                ctrl, created = ComplianceControl.objects.using("compliance").update_or_create(
                    control_code_id=code_id,
                    defaults={
                        "control_id": control_code,
                        "name": name,
                        "description": description,
                        "objective": (row.get("objective") or "").strip(),
                        "control_type": (row.get("control_type") or "preventive").strip().lower()[:20],
                        "nature": (row.get("nature") or "").strip()[:50],
                        "frequency": (row.get("frequency") or "continuous").strip()[:20],
                        "category": (row.get("category") or "").strip(),
                        "status": (row.get("status") or "active").strip()[:20],
                        "severity": (row.get("severity") or "medium").strip()[:20],
                        "testing_frequency": (row.get("testing_frequency") or "").strip()[:20],
                        "maturity_level": (row.get("maturity_level") or "").strip()[:20],
                        "implementation_status": (row.get("implementation_status") or "").strip()[:20],
                        "automation_opportunity": (row.get("automation_opportunity") or "").strip(),
                        "automation_recommendation": (row.get("automation_recommendation") or "").strip(),
                    },
                )
                self.stdout.write(self.style.SUCCESS(f"  {'Created' if created else 'Updated'} {ctrl.control_id} {ctrl.name}"))

                if (last_review or next_review) and not ControlReview.objects.using("compliance").filter(control_id=ctrl.id).exists():
                    reviewed_at = last_review or (next_review.replace(year=next_review.year - 1) if next_review else datetime.now())
                    ControlReview.objects.using("compliance").create(
                        control_id=ctrl.id,
                        reviewed_at=reviewed_at,
                        next_review_due_at=next_review,
                    )

        self.stdout.write(self.style.SUCCESS("Phase 3 seed done."))
