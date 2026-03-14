"""
Look up a compliance control by UUID (id) or by name.
Usage:
  python manage.py lookup_control 002797dd-606e-488b-ba86-eb674aca9cec
  python manage.py lookup_control --name "Vulnerability Scanning"
"""
import uuid
from django.core.management.base import BaseCommand
from compliance.models import ComplianceControl


class Command(BaseCommand):
    help = "Look up a control by UUID (id) or by name to get its control_id (human-friendly number)"

    def add_arguments(self, parser):
        parser.add_argument("uuid_or_name", nargs="?", help="Control UUID or partial name to search")
        parser.add_argument("--name", dest="name", help="Search by control name (partial match)")

    def handle(self, *args, **options):
        uuid_arg = options.get("uuid_or_name")
        name_arg = options.get("name")

        if name_arg:
            controls = ComplianceControl.objects.using("compliance").filter(name__icontains=name_arg)
            if not controls.exists():
                self.stdout.write(self.style.WARNING(f"No controls found matching '{name_arg}'"))
                return
            for ctrl in controls[:20]:
                self.stdout.write(f"  id: {ctrl.id}")
                self.stdout.write(self.style.SUCCESS(f"  control_id (number): {ctrl.control_id}"))
                self.stdout.write(f"  name: {ctrl.name}")
                self.stdout.write("")
            return

        if not uuid_arg:
            self.stdout.write(self.style.ERROR("Provide a UUID or use --name 'Vulnerability Scanning'"))
            return

        try:
            uid = uuid.UUID(str(uuid_arg))
        except ValueError:
            controls = ComplianceControl.objects.using("compliance").filter(name__icontains=uuid_arg)
            if controls.exists():
                for ctrl in controls[:5]:
                    self.stdout.write(f"  id: {ctrl.id}")
                    self.stdout.write(self.style.SUCCESS(f"  control_id (number): {ctrl.control_id}"))
                    self.stdout.write(f"  name: {ctrl.name}")
                    self.stdout.write("")
                return
            self.stdout.write(self.style.ERROR(f"Invalid UUID: {uuid_arg}"))
            return

        ctrl = ComplianceControl.objects.using("compliance").filter(id=uid).first()
        if not ctrl:
            self.stdout.write(self.style.WARNING(f"No control found with id={uid}"))
            return

        self.stdout.write(f"  id: {ctrl.id}")
        self.stdout.write(self.style.SUCCESS(f"  control_id (number): {ctrl.control_id}"))
        self.stdout.write(f"  name: {ctrl.name}")
