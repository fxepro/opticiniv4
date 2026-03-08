"""
Management command to verify the sidebar permissions matrix save API persists to auth_group_permissions.

Usage:
  python manage.py test_sidebar_matrix_save

  Or with a specific user (must have roles.edit):
  python manage.py test_sidebar_matrix_save --username adminuser

This verifies:
  1. GET /api/roles/sidebar-matrix/ returns data
  2. POST /api/roles/sidebar-matrix/update/ persists to auth_group_permissions
  3. Subsequent GET shows the updated permissions
  4. Direct DB query confirms auth_group_permissions was updated
"""
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.contrib.auth.models import Group
from rest_framework.test import APIRequestFactory, force_authenticate
from rest_framework import status

# Call views directly to avoid DisallowedHost (management command runs outside HTTP)
factory = APIRequestFactory()


class Command(BaseCommand):
    help = "Verify sidebar matrix save API persists to auth_group_permissions"

    def add_arguments(self, parser):
        parser.add_argument(
            "--username",
            type=str,
            default="adminuser",
            help="Username for admin (must have roles.edit). Default: adminuser",
        )

    def handle(self, *args, **options):
        username = options["username"]
        self.stdout.write(f"Testing sidebar matrix save API (user: {username})...")

        # Ensure setup_permissions has run
        from django.core.management import call_command
        call_command("setup_permissions", verbosity=0)

        # Get admin user: specified username, or first superuser, or first in Admin group
        user = User.objects.filter(username=username).first()
        if not user:
            user = User.objects.filter(is_superuser=True).first()
        if not user:
            user = User.objects.filter(groups__name="Admin").first()
        if not user:
            self.stdout.write(self.style.ERROR(
                f"User '{username}' not found, and no superuser/Admin user in DB. "
                "Create one with: python manage.py create_admin --email admin@example.com --password yourpass"
            ))
            return
        self.stdout.write(f"Using user: {user.username} (id={user.id})")

        # Ensure user has Admin group (roles.edit)
        admin_group = Group.objects.filter(name="Admin").first()
        if not admin_group:
            self.stdout.write(self.style.ERROR("Admin group not found. Run setup_roles or setup_permissions."))
            return
        if admin_group not in user.groups.all():
            user.groups.add(admin_group)
            self.stdout.write(f"Added {user.username} to Admin group for roles.edit permission.")

        from users.permission_views import get_sidebar_matrix, update_sidebar_matrix

        # 1. GET sidebar matrix (call view directly to avoid DisallowedHost)
        req = factory.get("/api/roles/sidebar-matrix/")
        force_authenticate(req, user=user)
        get_resp = get_sidebar_matrix(req)
        if get_resp.status_code != status.HTTP_200_OK:
            try:
                err_body = get_resp.data if hasattr(get_resp, "data") else str(get_resp.content[:200])
            except Exception:
                err_body = "unknown"
            self.stdout.write(self.style.ERROR(f"GET failed: {get_resp.status_code} - {err_body}"))
            return

        data = get_resp.data
        roles = data.get("roles", [])
        sidebar_items = data.get("sidebar_items", [])

        if not roles or not sidebar_items:
            self.stdout.write(self.style.ERROR("GET returned empty roles or sidebar_items."))
            return

        # Pick Viewer role (or first non-Admin)
        target_role = next((r for r in roles if r["name"] == "Viewer"), None)
        if not target_role:
            target_role = next((r for r in roles if r["name"] != "Admin"), roles[0])

        role_id = target_role["id"]
        role_id_str = str(role_id)

        # Find one item and its view permission
        item = sidebar_items[0]
        item_id = item["id"]
        perm_code = item.get("required_permissions", {}).get("view")
        if not perm_code:
            item = next((s for s in sidebar_items if s.get("required_permissions", {}).get("view")), None)
            if item:
                perm_code = item["required_permissions"]["view"]
                item_id = item["id"]
        if not perm_code:
            self.stdout.write(self.style.ERROR("No sidebar item with view permission found."))
            return

        access_before = item.get("role_access", {}).get(role_id_str, {})
        had_view_before = access_before.get("view", False)

        # Build current permission codes for this role (from all sidebar items)
        current_codes = []
        for si in sidebar_items:
            ra = si.get("role_access", {}).get(role_id_str, {})
            rp = si.get("required_permissions", {})
            for t in ["view", "create", "edit", "delete"]:
                if ra.get(t) and rp.get(t):
                    current_codes.append(rp[t])

        # Toggle the view permission for our test item
        if perm_code in current_codes:
            current_codes = [c for c in current_codes if c != perm_code]
        else:
            current_codes.append(perm_code)

        self.stdout.write(f"  Role: {target_role['name']} (id={role_id})")
        self.stdout.write(f"  Item: {item_id}, perm: {perm_code}")
        self.stdout.write(f"  Before: view={had_view_before}, After toggle: view={perm_code not in current_codes if had_view_before else True}")

        # 2. POST update
        req2 = factory.post(
            "/api/roles/sidebar-matrix/update/",
            {"role_id": role_id, "permission_codes": current_codes},
            format="json",
        )
        force_authenticate(req2, user=user)
        update_resp = update_sidebar_matrix(req2)
        if update_resp.status_code != status.HTTP_200_OK:
            err = update_resp.data if hasattr(update_resp, "data") else update_resp.content
            self.stdout.write(self.style.ERROR(f"POST failed: {update_resp.status_code} - {err}"))
            return

        self.stdout.write(f"  POST update: {update_resp.data}")

        # 3. GET again and verify
        req3 = factory.get("/api/roles/sidebar-matrix/")
        force_authenticate(req3, user=user)
        get_resp2 = get_sidebar_matrix(req3)
        if get_resp2.status_code != status.HTTP_200_OK:
            self.stdout.write(self.style.ERROR(f"GET after update failed: {get_resp2.status_code}"))
            return

        data2 = get_resp2.data
        item2 = next((s for s in data2["sidebar_items"] if s["id"] == item_id), None)
        if not item2:
            self.stdout.write(self.style.ERROR(f"Item {item_id} not found in second GET."))
            return

        access_after = item2.get("role_access", {}).get(role_id_str, {})
        has_view_after = access_after.get("view", False)

        # 4. Verify in DB directly
        group = Group.objects.get(id=role_id)
        from users.permission_models import FeaturePermission

        db_perm_codes = set()
        for p in group.permissions.all():
            try:
                fp = FeaturePermission.objects.get(django_permission=p)
                db_perm_codes.add(fp.code)
            except FeaturePermission.DoesNotExist:
                db_perm_codes.add(p.codename.replace("_", "."))

        in_db = perm_code in db_perm_codes

        # Report
        persisted = has_view_after != had_view_before
        if persisted and in_db == has_view_after:
            self.stdout.write(self.style.SUCCESS("PASS: Permission change persisted correctly."))
            self.stdout.write(f"  API shows view={has_view_after}, DB has {perm_code}={in_db}")
        else:
            self.stdout.write(self.style.ERROR("FAIL: Permission change did NOT persist."))
            self.stdout.write(f"  Before: view={had_view_before}")
            self.stdout.write(f"  After (API): view={has_view_after}")
            self.stdout.write(f"  After (DB): {perm_code} in group.permissions = {in_db}")
