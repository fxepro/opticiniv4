# Create evidence schema tables (single source of truth). evidence_items matches public.compliance_evidence.

from django.db import migrations

SQL = """
CREATE TABLE evidence.evidence_items (
    id UUID PRIMARY KEY,
    evidence_id VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(300) NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    source VARCHAR(20) NOT NULL,
    source_type VARCHAR(30) NOT NULL,
    source_name VARCHAR(200) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'fresh',
    validity_period INTEGER,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_by_id INTEGER,
    uploaded_by_id INTEGER,
    file_type VARCHAR(50) NOT NULL DEFAULT '',
    file_size BIGINT,
    file_url VARCHAR(500) NOT NULL DEFAULT '',
    preview_url VARCHAR(500) NOT NULL DEFAULT '',
    content TEXT NOT NULL DEFAULT '',
    tags TEXT[] DEFAULT '{}',
    category VARCHAR(100) NOT NULL DEFAULT '',
    audit_locked BOOLEAN NOT NULL DEFAULT false,
    audit_id UUID,
    organization_id UUID,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);
CREATE INDEX ON evidence.evidence_items (evidence_id);
CREATE INDEX ON evidence.evidence_items (source, source_type);
CREATE INDEX ON evidence.evidence_items (status, expires_at);
CREATE INDEX ON evidence.evidence_items (audit_locked, audit_id);
CREATE INDEX ON evidence.evidence_items (organization_id);

CREATE TABLE evidence.evidence_control_mappings (
    id UUID PRIMARY KEY,
    evidence_id UUID NOT NULL REFERENCES evidence.evidence_items(id) ON DELETE CASCADE,
    control_id UUID NOT NULL,
    control_name VARCHAR(300) NOT NULL,
    framework_id UUID NOT NULL,
    framework_name VARCHAR(200) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    UNIQUE(evidence_id, control_id)
);
CREATE INDEX ON evidence.evidence_control_mappings (control_id);
CREATE INDEX ON evidence.evidence_control_mappings (framework_id);
CREATE INDEX ON evidence.evidence_control_mappings (evidence_id, control_id);

CREATE TABLE evidence.evidence_versions (
    id UUID PRIMARY KEY,
    evidence_item_id UUID NOT NULL REFERENCES evidence.evidence_items(id) ON DELETE CASCADE,
    version INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);
CREATE INDEX ON evidence.evidence_versions (evidence_item_id);

CREATE TABLE evidence.audit_packages (
    id UUID PRIMARY KEY,
    audit_id UUID NOT NULL,
    evidence_ids UUID[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);
CREATE INDEX ON evidence.audit_packages (audit_id);
"""

REVERSE_SQL = """
DROP TABLE IF EXISTS evidence.audit_packages CASCADE;
DROP TABLE IF EXISTS evidence.evidence_versions CASCADE;
DROP TABLE IF EXISTS evidence.evidence_control_mappings CASCADE;
DROP TABLE IF EXISTS evidence.evidence_items CASCADE;
"""


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0005_compliance_schema_tables"),
    ]

    operations = [
        migrations.RunSQL(SQL, REVERSE_SQL),
    ]
