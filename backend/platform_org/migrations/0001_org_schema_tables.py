# Create org schema tables. See docs/Database design/Org Schema.

from django.db import migrations

SQL = """
CREATE TABLE org.personnel (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL,
    external_hr_id VARCHAR(255),
    user_id UUID,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    employment_status VARCHAR(32) NOT NULL CHECK (employment_status IN ('active', 'terminated', 'contractor', 'leave')),
    job_title VARCHAR(255),
    department_id UUID,
    manager_personnel_id UUID,
    hire_date DATE,
    termination_date DATE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);
CREATE INDEX ON org.personnel (organization_id);
CREATE INDEX ON org.personnel (manager_personnel_id);

CREATE TABLE org.departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL,
    name VARCHAR(255) NOT NULL,
    parent_department_id UUID,
    head_personnel_id UUID,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);
CREATE INDEX ON org.departments (organization_id);

CREATE TABLE org.roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL,
    role_name VARCHAR(255) NOT NULL,
    role_type VARCHAR(32) CHECK (role_type IN ('control_owner', 'evidence_provider', 'internal_auditor', 'compliance_manager', 'approver', 'executive')),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);
CREATE INDEX ON org.roles (organization_id);

CREATE TABLE org.personnel_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    personnel_id UUID NOT NULL,
    role_id UUID NOT NULL,
    effective_from DATE NOT NULL,
    effective_to DATE,
    UNIQUE(personnel_id, role_id, effective_from)
);
CREATE INDEX ON org.personnel_roles (personnel_id);
CREATE INDEX ON org.personnel_roles (role_id);

CREATE TABLE org.sync_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL,
    source_type VARCHAR(32) NOT NULL CHECK (source_type IN ('okta', 'azure_ad', 'workday', 'csv', 'manual')),
    last_synced_at TIMESTAMP WITH TIME ZONE,
    status VARCHAR(32) NOT NULL CHECK (status IN ('active', 'failed', 'paused')),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);
CREATE INDEX ON org.sync_sources (organization_id);
"""

REVERSE_SQL = """
DROP TABLE IF EXISTS org.sync_sources CASCADE;
DROP TABLE IF EXISTS org.personnel_roles CASCADE;
DROP TABLE IF EXISTS org.roles CASCADE;
DROP TABLE IF EXISTS org.departments CASCADE;
DROP TABLE IF EXISTS org.personnel CASCADE;
"""


class Migration(migrations.Migration):

    initial = True
    dependencies = [
        ("core", "0012_add_org_schema"),
    ]

    operations = [
        migrations.RunSQL(SQL, REVERSE_SQL),
    ]
