"""Add currency_code to organization_regions."""
from django.db import migrations

SQL_FORWARD = """
ALTER TABLE org.organization_regions
    ADD COLUMN IF NOT EXISTS currency_code VARCHAR(3) NOT NULL DEFAULT '';
"""
SQL_REVERSE = """
ALTER TABLE org.organization_regions DROP COLUMN IF EXISTS currency_code;
"""

class Migration(migrations.Migration):
    dependencies = [("platform_org", "0013_region_city_org_currencies")]
    operations = [migrations.RunSQL(SQL_FORWARD, SQL_REVERSE)]
