"""
Backfill organization_id for UserProfile records that have null.
Use when bulk-uploaded users ended up without org scoping.
Usage:
  python manage.py backfill_user_organization --org-id <UUID>
  python manage.py backfill_user_organization  # uses first org in platform
"""
import uuid
from django.core.management.base import BaseCommand
from django.db import connections
from users.models import UserProfile


class Command(BaseCommand):
    help = "Set organization_id on UserProfile records that have null"

    def add_arguments(self, parser):
        parser.add_argument(
            "--org-id",
            type=str,
            help="Organization UUID to assign. If omitted, uses first org from platform.",
        )
        parser.add_argument(
            "--dry-run",
            action="store_true",
            help="Show what would be updated without making changes",
        )

    def handle(self, *args, **options):
        org_id_arg = options.get("org_id")
        dry_run = options.get("dry_run", False)

        if org_id_arg:
            org_uuid = uuid.UUID(org_id_arg)
        else:
            # Get first org from platform
            from platform_org.models import Organization
            org = Organization.objects.using("org").first()
            if not org:
                self.stderr.write(
                    self.style.ERROR("No organization found. Create one or pass --org-id.")
                )
                return
            org_uuid = org.id
            self.stdout.write(f"Using org: {org.name} (id={org_uuid})")

        profiles = UserProfile.objects.using("core").filter(organization_id__isnull=True)
        count = profiles.count()
        if count == 0:
            self.stdout.write(self.style.SUCCESS("No profiles with null organization_id."))
            return

        self.stdout.write(f"Found {count} profile(s) with null organization_id.")
        for p in profiles[:20]:
            self.stdout.write(f"  - {p.user.email} (user_id={p.user_id})")
        if count > 20:
            self.stdout.write(f"  ... and {count - 20} more")

        if dry_run:
            self.stdout.write(self.style.WARNING("Dry run: no changes made."))
            return

        updated = profiles.update(organization_id=org_uuid)
        self.stdout.write(self.style.SUCCESS(f"Updated {updated} profile(s) with organization_id={org_uuid}"))
