"""
Phase 2 seed: requirements from 6 requirements_catalog.csv (SOC2 CC1–CC9).
Parent requirements loaded first, then children. Uses framework_version_code_id SOC2_TSC_2022.
Run: python manage.py seed_soc2_phase2 [--csv-dir PATH] [--framework-version SOC2_TSC_2022]
"""
import csv
from pathlib import Path

from django.core.management.base import BaseCommand
from django.db import transaction

from compliance.models import Requirement, FrameworkVersion


def default_csv_dir():
    backend = Path(__file__).resolve().parent.parent.parent.parent
    return backend.parent.parent / "docs" / "SOC2 Data Seed"


class Command(BaseCommand):
    help = "Seed compliance.requirements from 6 requirements_catalog.csv (Phase 2)."

    def add_arguments(self, parser):
        parser.add_argument("--csv-dir", type=str, default=None)
        parser.add_argument("--framework-version", type=str, default="SOC2_TSC_2022")
        parser.add_argument("--dry-run", action="store_true")

    def handle(self, *args, **options):
        csv_dir = Path(options.get("csv_dir") or str(default_csv_dir()))
        fw_version_code = options.get("framework_version", "SOC2_TSC_2022")
        dry_run = options.get("dry_run", False)
        path = csv_dir / "6 requirements_catalog.csv"
        if not path.exists():
            self.stderr.write(self.style.ERROR(f"Missing: {path}"))
            return

        fw_version = FrameworkVersion.objects.using("compliance").filter(framework_version_code_id=fw_version_code).first()
        if not fw_version:
            self.stderr.write(self.style.ERROR(f"Framework version '{fw_version_code}' not found. Run seed_soc2_phase1 first."))
            return

        with open(path, newline="", encoding="utf-8") as f:
            rows = list(csv.DictReader(f))
        # Parents first: no parent_requirement_code, then by sort_order/code
        def key(r):
            pr = (r.get("parent_requirement_code") or "").strip()
            return (0 if not pr else 1, int((r.get("sort_order") or 0)), (r.get("requirement_code") or ""))
        rows.sort(key=key)

        code_to_id = {}
        with transaction.atomic(using="compliance"):
            for row in rows:
                code_id = (row.get("requirement_code_id") or "").strip()
                code = (row.get("requirement_code") or "").strip()
                if not code_id or not code:
                    continue
                parent_code = (row.get("parent_requirement_code") or "").strip()
                parent_id = code_to_id.get(parent_code) if parent_code else None
                title = (row.get("title") or "").strip()
                st_paraphrase = (row.get("statement_paraphrase") or "").strip()
                statement = st_paraphrase or title or code
                if dry_run:
                    self.stdout.write(f"  {code} -> {title} (parent={parent_code or '-'})")
                    code_to_id[code] = None
                    continue
                obj, created = Requirement.objects.using("compliance").update_or_create(
                    requirement_code_id=code_id,
                    defaults={
                        "framework_version_id": fw_version.id,
                        "code": code,
                        "title": title,
                        "statement": statement,
                        "statement_paraphrase": st_paraphrase,
                        "requirement_level": (row.get("requirement_level") or "").strip(),
                        "category": (row.get("category") or "").strip(),
                        "parent_requirement_id": parent_id,
                        "sort_order": int(row.get("sort_order") or 0) or None,
                    },
                )
                code_to_id[code] = obj.id
                self.stdout.write(self.style.SUCCESS(f"  {'Created' if created else 'Updated'} {obj.code} {obj.title}"))
        self.stdout.write(self.style.SUCCESS("Phase 2 seed done."))
