from django.apps import AppConfig
from django.db.models.signals import post_migrate

def create_roles(sender, **kwargs):
    from django.contrib.auth.models import Group
    from django.db.utils import OperationalError, ProgrammingError
    # Auth tables live in core schema; skip if auth_group not yet created (contenttypes runs before auth)
    roles = ['Admin', 'Agency', 'Executive', 'Director', 'Manager', 'Analyst', 'Auditor', 'Viewer']
    try:
        for role in roles:
            Group.objects.using('core').get_or_create(name=role)
    except (OperationalError, ProgrammingError):
        pass  # auth_group doesn't exist yet during bootstrap

class UsersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'users'

    def ready(self):
        post_migrate.connect(create_roles, sender=self)
