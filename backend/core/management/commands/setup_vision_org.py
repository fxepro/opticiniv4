"""
Create placeholder organization "VISION Inc" and assign it to all non-admin users.
Multi-org from day one; one user accesses one org. Admin users are left without
organization_id (platform-level). Run: python manage.py setup_vision_org
"""
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from platform_org.models import Organization
from users.models import UserProfile


class Command(BaseCommand):
    help = 'Create org "VISION Inc" and set UserProfile.organization_id for all non-admin users'

    def add_arguments(self, parser):
        parser.add_argument(
            '--org-name',
            type=str,
            default='VISION Inc',
            help='Organization name (default: VISION Inc)',
        )
        parser.add_argument(
            '--dry-run',
            action='store_true',
            help='Only print what would be done',
        )

    def handle(self, *args, **options):
        org_name = options['org_name']
        dry_run = options['dry_run']

        # Create or get organization (core DB via router)
        org, created = Organization.objects.get_or_create(
            name=org_name,
            defaults={'tier': 'pro'},
        )
        if created:
            self.stdout.write(self.style.SUCCESS(f'Created organization: {org.name} (id={org.id})'))
        else:
            self.stdout.write(f'Using existing organization: {org.name} (id={org.id})')

        # Assign to all non-admin users (not superuser, and optionally not staff)
        profiles = UserProfile.objects.select_related('user').filter(
            user__is_superuser=False,
        )
        updated = 0
        for profile in profiles:
            if profile.organization_id != org.id:
                if not dry_run:
                    profile.organization_id = org.id
                    profile.save(update_fields=['organization_id'])
                updated += 1
                self.stdout.write(f'  Assigned {profile.user.username} to {org.name}')

        if dry_run:
            self.stdout.write(self.style.WARNING(f'Dry run: would assign {updated} user(s) to {org.name}'))
        else:
            self.stdout.write(self.style.SUCCESS(f'Assigned {updated} user(s) to {org.name}'))
