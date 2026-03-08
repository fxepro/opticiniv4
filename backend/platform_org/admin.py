from django.contrib import admin
from .models import Personnel, Department, Role, PersonnelRole, SyncSource


@admin.register(Personnel)
class PersonnelAdmin(admin.ModelAdmin):
    list_display = ("email", "first_name", "last_name", "employment_status", "organization_id")
    list_filter = ("employment_status",)
    search_fields = ("email", "first_name", "last_name", "external_hr_id")


@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ("name", "organization_id", "head_personnel_id")
    search_fields = ("name",)


@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ("role_name", "role_type", "organization_id")
    list_filter = ("role_type",)


@admin.register(PersonnelRole)
class PersonnelRoleAdmin(admin.ModelAdmin):
    list_display = ("personnel_id", "role_id", "effective_from", "effective_to")


@admin.register(SyncSource)
class SyncSourceAdmin(admin.ModelAdmin):
    list_display = ("organization_id", "source_type", "status", "last_synced_at")
    list_filter = ("source_type", "status")
