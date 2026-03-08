# Create audit schema tables (single source of truth). Matches public.compliance_audits, etc.

from django.db import migrations

SQL = """
-- audit.audits (matches public.compliance_audits)
CREATE TABLE audit.audits (
    id UUID PRIMARY KEY,
    audit_id VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(300) NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    type VARCHAR(30) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'planned',
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE,
    scheduled_start_date TIMESTAMP WITH TIME ZONE,
    scheduled_end_date TIMESTAMP WITH TIME ZONE,
    evidence_locked BOOLEAN NOT NULL DEFAULT false,
    evidence_freeze_date TIMESTAMP WITH TIME ZONE,
    evidence_count INTEGER NOT NULL DEFAULT 0,
    evidence_ids UUID[] DEFAULT '{}',
    total_controls INTEGER NOT NULL DEFAULT 0,
    controls_passed INTEGER NOT NULL DEFAULT 0,
    controls_failed INTEGER NOT NULL DEFAULT 0,
    controls_partial INTEGER NOT NULL DEFAULT 0,
    controls_not_evaluated INTEGER NOT NULL DEFAULT 0,
    compliance_score INTEGER,
    findings_count INTEGER NOT NULL DEFAULT 0,
    critical_findings INTEGER NOT NULL DEFAULT 0,
    high_findings INTEGER NOT NULL DEFAULT 0,
    medium_findings INTEGER NOT NULL DEFAULT 0,
    low_findings INTEGER NOT NULL DEFAULT 0,
    owner_id INTEGER,
    notes TEXT NOT NULL DEFAULT '',
    summary TEXT NOT NULL DEFAULT '',
    conclusion TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    created_by_id INTEGER,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_by_id INTEGER,
    completed_at TIMESTAMP WITH TIME ZONE,
    previous_audit_id UUID,
    organization_id UUID
);
CREATE INDEX ON audit.audits (audit_id);
CREATE INDEX ON audit.audits (type, status);
CREATE INDEX ON audit.audits (start_date, end_date);
CREATE INDEX ON audit.audits (evidence_locked);
CREATE INDEX ON audit.audits (organization_id);

-- audit.audit_findings (audit_id references audit.audits)
CREATE TABLE audit.audit_findings (
    id UUID PRIMARY KEY,
    audit_id UUID NOT NULL REFERENCES audit.audits(id) ON DELETE CASCADE,
    finding_id VARCHAR(100) NOT NULL,
    title VARCHAR(300) NOT NULL,
    description TEXT NOT NULL,
    severity VARCHAR(20) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'open',
    control_id UUID,
    control_name VARCHAR(300) NOT NULL DEFAULT '',
    framework_id UUID,
    framework_name VARCHAR(200) NOT NULL DEFAULT '',
    evidence_ids UUID[] DEFAULT '{}',
    remediation_plan TEXT NOT NULL DEFAULT '',
    assigned_to VARCHAR(200) NOT NULL DEFAULT '',
    due_date TIMESTAMP WITH TIME ZONE,
    resolved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);
CREATE INDEX ON audit.audit_findings (audit_id, severity);
CREATE INDEX ON audit.audit_findings (audit_id, status);
CREATE INDEX ON audit.audit_findings (control_id);

-- audit.audit_auditors
CREATE TABLE audit.audit_auditors (
    id UUID PRIMARY KEY,
    audit_id UUID NOT NULL REFERENCES audit.audits(id) ON DELETE CASCADE,
    user_id INTEGER,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(254) NOT NULL,
    role VARCHAR(20) NOT NULL,
    organization VARCHAR(200) NOT NULL DEFAULT '',
    access_granted_at TIMESTAMP WITH TIME ZONE,
    last_access_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    UNIQUE(audit_id, email)
);
CREATE INDEX ON audit.audit_auditors (audit_id, role);
CREATE INDEX ON audit.audit_auditors (user_id);

-- audit.audit_framework_mappings
CREATE TABLE audit.audit_framework_mappings (
    id UUID PRIMARY KEY,
    audit_id UUID NOT NULL REFERENCES audit.audits(id) ON DELETE CASCADE,
    framework_id UUID NOT NULL,
    framework_name VARCHAR(200) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    UNIQUE(audit_id, framework_id)
);
CREATE INDEX ON audit.audit_framework_mappings (framework_id);
CREATE INDEX ON audit.audit_framework_mappings (audit_id, framework_id);
"""

REVERSE_SQL = """
DROP TABLE IF EXISTS audit.audit_framework_mappings CASCADE;
DROP TABLE IF EXISTS audit.audit_auditors CASCADE;
DROP TABLE IF EXISTS audit.audit_findings CASCADE;
DROP TABLE IF EXISTS audit.audits CASCADE;
"""


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0006_evidence_schema_tables"),
    ]

    operations = [
        migrations.RunSQL(SQL, REVERSE_SQL),
    ]
