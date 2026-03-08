"""
Identity schema: users, user–team mapping.
Tables in PostgreSQL schema `identity`. See docs/Platform design DB.
"""
import uuid
from django.db import models


class User(models.Model):
    """identity.users — platform users (org-scoped)."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    organization_id = models.UUIDField(null=False, db_index=True)
    email = models.CharField(max_length=255)
    role = models.CharField(max_length=64)  # enum in spec: admin, member, viewer, etc.
    status = models.CharField(max_length=32)  # enum: active, suspended, etc.

    class Meta:
        db_table = "users"


class UserTeamMap(models.Model):
    """identity.user_team_map — many-to-many user ↔ team."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_id = models.UUIDField(null=False, db_index=True)
    team_id = models.UUIDField(null=False, db_index=True)

    class Meta:
        db_table = "user_team_map"
