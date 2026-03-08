"""
Sync auth_user_groups from users_userprofile.role for all users.
Use after restoring auth_user_groups: sets (user_id, group_id) from profile.role (resolved to group_id).
"""
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from users.models import UserProfile
from users.role_sync import set_user_role_by_name


class Command(BaseCommand):
    help = (
        "Set auth_user_groups (user_id, group_id) from users_userprofile.role for every user. "
        "Resolves role name to group_id and writes to auth_user_groups."
    )

    def add_arguments(self, parser):
        parser.add_argument('--dry-run', action='store_true', help='Only report, do not write.')

    def handle(self, *args, **options):
        dry_run = options['dry_run']
        if dry_run:
            self.stdout.write(self.style.WARNING('Dry run: no changes written.'))
        synced = 0
        skipped = 0
        for user in User.objects.all():
            try:
                profile = user.profile
                role = (profile.role or 'viewer').strip().lower() or 'viewer'
            except UserProfile.DoesNotExist:
                skipped += 1
                continue
            if not dry_run:
                set_user_role_by_name(user, role)
            synced += 1
            self.stdout.write(f"  {user.username}: profile.role={profile.role} -> auth_user_groups set to {role}")
        self.stdout.write(self.style.SUCCESS(f"Synced {synced} users (skipped {skipped} without profile)."))
        if dry_run:
            self.stdout.write(self.style.WARNING('Run without --dry-run to apply.'))
