"""
Phase 4 seed: control_requirement_mappings from 7 control_requirement_map.csv,
control_department_map from 9 control_department_map.csv.
Seeds org.departments from 5 departments_catalog.csv if missing; resolves control by control_code_id,
requirement by code, department by department_code.
Run: python manage.py seed_soc2_phase4 [--csv-dir PATH] [--dry-run]
"""
import csv
from pathlib import Path

from django.core.management.base import BaseCommand
from django.db import transaction

from compliance.models import ComplianceControl, Requirement, ControlRequirementMapping, ControlDepartmentMap
from platform_org.models import Department
from platform_org.models import Organization


def default_csv_dir():
    backend = Path(__file__).resolve().parent.parent.parent.parent
    return backend.parent.parent / "docs" / "SOC2 Data Seed"


class Command(BaseCommand):
    help = "Seed control_requirement_mappings and control_department_map (Phase 4)."

    def add_arguments(self, parser):
        parser.add_argument("--csv-dir", type=str, default=None)
        parser.add_argument("--dry-run", action="store_true")

    def _ensure_organization(self, dry_run):
        org = Organization.objects.using("org").first()
        if org:
            return org
        if dry_run:
            self.stdout.write("  Would create default organization in core.")
            return None
        org = Organization.objects.using("org").create(name="Default Organization", tier="pro")
        self.stdout.write(self.style.SUCCESS(f"  Created organization in core: {org.name}"))
        return org

    def _seed_departments(self, csv_dir, dry_run, org):
        path = csv_dir / "5 departments_catalog.csv"
        if not path.exists():
            return
        if org is None:
            return
        if Department.objects.using("org").exists():
            return
        with open(path, newline="", encoding="utf-8") as f:
            for row in csv.DictReader(f):
                code = (row.get("department_code") or row.get("department_code_id") or "").strip()
                name = (row.get("department_name") or "").strip() or code
                if not code:
                    continue
                if dry_run:
                    self.stdout.write(f"  Department {code} {name}")
                    continue
                Department.objects.using("org").get_or_create(
                    organization_id=org.id,
                    department_code=code,
                    defaults={"name": name},
                )
        self.stdout.write(self.style.SUCCESS("  org.departments seeded from 5 departments_catalog.csv"))

    def handle(self, *args, **options):
        csv_dir = Path(options.get("csv_dir") or str(default_csv_dir()))
        dry_run = options.get("dry_run", False)
        map_path = csv_dir / "7 control_requirement_map.csv"
        dept_path = csv_dir / "9 control_department_map.csv"
        if not map_path.exists():
            self.stderr.write(self.style.ERROR(f"Missing: {map_path}"))
            return
        if not dept_path.exists():
            self.stderr.write(self.style.ERROR(f"Missing: {dept_path}"))
            return

        with transaction.atomic(using="core"):
            org = self._ensure_organization(dry_run)
        with transaction.atomic(using="org"):
            self._seed_departments(csv_dir, dry_run, org)

        with transaction.atomic(using="compliance"):
            # 1. Control -> Requirement mappings
            with open(map_path, newline="", encoding="utf-8") as f:
                for row in csv.DictReader(f):
                    ctrl_code = (row.get("control_code_id") or "").strip()
                    req_code = (row.get("requirement_code") or "").strip()
                    if not ctrl_code or not req_code:
                        continue
                    ctrl = ComplianceControl.objects.using("compliance").filter(control_code_id=ctrl_code).first()
                    req = Requirement.objects.using("compliance").filter(code=req_code).first()
                    if not ctrl:
                        self.stderr.write(self.style.WARNING(f"  Control {ctrl_code} not found"))
                        continue
                    if not req:
                        self.stderr.write(self.style.WARNING(f"  Requirement {req_code} not found"))
                        continue
                    code_id = f"{ctrl_code}_{req_code}"
                    primary = (row.get("primary_control_flag") or "").strip().upper() == "TRUE"
                    if dry_run:
                        self.stdout.write(f"  {ctrl_code} -> {req_code} primary={primary}")
                        continue
                    ControlRequirementMapping.objects.using("compliance").update_or_create(
                        control_requirement_map_code_id=code_id,
                        defaults={
                            "control_id": ctrl.id,
                            "requirement_id": req.id,
                            "coverage": (row.get("coverage") or "full").strip()[:50],
                            "mapping_notes": (row.get("mapping_notes") or row.get("notes") or "").strip(),
                            "primary_control_flag": primary,
                        },
                    )
            self.stdout.write(self.style.SUCCESS("  control_requirement_mappings done."))

        with transaction.atomic(using="compliance"):
            # 2. Control -> Department (need department_id from org.departments)
            with open(dept_path, newline="", encoding="utf-8") as f:
                for row in csv.DictReader(f):
                    ctrl_code = (row.get("control_code_id") or "").strip()
                    dept_code = (row.get("department_code") or "").strip()
                    if not ctrl_code or not dept_code:
                        continue
                    ctrl = ComplianceControl.objects.using("compliance").filter(control_code_id=ctrl_code).first()
                    dept = Department.objects.using("org").filter(department_code=dept_code).first()
                    if not ctrl:
                        self.stderr.write(self.style.WARNING(f"  Control {ctrl_code} not found"))
                        continue
                    if not dept:
                        self.stderr.write(self.style.WARNING(f"  Department {dept_code} not found (seed departments_catalog first)"))
                        continue
                    resp = (row.get("responsibility_type") or "").strip()
                    if dry_run:
                        self.stdout.write(f"  {ctrl_code} x {dept_code} {resp}")
                        continue
                    ControlDepartmentMap.objects.using("compliance").get_or_create(
                        control_id=ctrl.id,
                        department_id=dept.id,
                        responsibility_type=resp,
                        defaults={"department_code": dept_code},
                    )
            self.stdout.write(self.style.SUCCESS("  control_department_map done."))

        self.stdout.write(self.style.SUCCESS("Phase 4 seed done."))
