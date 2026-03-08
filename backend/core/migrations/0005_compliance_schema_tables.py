# Create compliance schema tables (single source of truth). Structure matches current public tables.

from django.db import migrations

SQL = """
-- compliance.frameworks (matches public.compliance_frameworks)
CREATE TABLE compliance.frameworks (
    id UUID PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    category VARCHAR(20) NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    icon VARCHAR(50) NOT NULL DEFAULT '',
    enabled BOOLEAN NOT NULL DEFAULT true,
    status VARCHAR(20) NOT NULL DEFAULT 'not_started',
    compliance_score INTEGER NOT NULL DEFAULT 0,
    total_controls INTEGER NOT NULL DEFAULT 0,
    passing_controls INTEGER NOT NULL DEFAULT 0,
    failing_controls INTEGER NOT NULL DEFAULT 0,
    not_evaluated_controls INTEGER NOT NULL DEFAULT 0,
    last_evaluated TIMESTAMP WITH TIME ZONE,
    next_audit_date TIMESTAMP WITH TIME ZONE,
    organization_id UUID,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    created_by_id INTEGER
);
CREATE INDEX ON compliance.frameworks (code);
CREATE INDEX ON compliance.frameworks (category, status);
CREATE INDEX ON compliance.frameworks (enabled, status);
CREATE INDEX ON compliance.frameworks (organization_id);

-- compliance.controls (matches public.compliance_controls)
CREATE TABLE compliance.controls (
    id UUID PRIMARY KEY,
    control_id VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(300) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'not_evaluated',
    severity VARCHAR(20) NOT NULL DEFAULT 'medium',
    last_evaluated TIMESTAMP WITH TIME ZONE,
    evaluated_by_id INTEGER,
    evaluation_method VARCHAR(20) NOT NULL DEFAULT 'automated',
    failure_reason TEXT NOT NULL DEFAULT '',
    failing_assets TEXT[] DEFAULT '{}',
    failing_count INTEGER NOT NULL DEFAULT 0,
    uptime_percentage DOUBLE PRECISION,
    time_out_of_compliance INTEGER,
    fix_recommendations TEXT[] DEFAULT '{}',
    related_control_ids UUID[] DEFAULT '{}',
    category VARCHAR(100) NOT NULL DEFAULT '',
    control_type VARCHAR(20) NOT NULL DEFAULT 'preventive',
    frequency VARCHAR(20) NOT NULL DEFAULT 'continuous',
    organization_id UUID,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    created_by_id INTEGER
);
CREATE INDEX ON compliance.controls (control_id);
CREATE INDEX ON compliance.controls (status, severity);
CREATE INDEX ON compliance.controls (evaluation_method);
CREATE INDEX ON compliance.controls (organization_id);

-- compliance.control_framework_mappings (control_id references compliance.controls)
CREATE TABLE compliance.control_framework_mappings (
    id UUID PRIMARY KEY,
    control_id UUID NOT NULL REFERENCES compliance.controls(id) ON DELETE CASCADE,
    framework_id UUID NOT NULL,
    framework_name VARCHAR(200) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    UNIQUE(control_id, framework_id)
);
CREATE INDEX ON compliance.control_framework_mappings (framework_id);
CREATE INDEX ON compliance.control_framework_mappings (control_id, framework_id);

-- compliance.control_evidence_requirements
CREATE TABLE compliance.control_evidence_requirements (
    id UUID PRIMARY KEY,
    control_id UUID NOT NULL REFERENCES compliance.controls(id) ON DELETE CASCADE,
    evidence_type VARCHAR(50) NOT NULL,
    source_app VARCHAR(100) NOT NULL DEFAULT '',
    evidence_category VARCHAR(30) NOT NULL DEFAULT '',
    collection_method VARCHAR(30) NOT NULL DEFAULT '',
    freshness_days INTEGER NOT NULL DEFAULT 30,
    required BOOLEAN NOT NULL DEFAULT true,
    description TEXT NOT NULL DEFAULT '',
    organization_id UUID,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    UNIQUE(control_id, evidence_type, source_app)
);
CREATE INDEX ON compliance.control_evidence_requirements (control_id);
CREATE INDEX ON compliance.control_evidence_requirements (evidence_type);
CREATE INDEX ON compliance.control_evidence_requirements (organization_id);

-- Platform design extras
CREATE TABLE compliance.asset_control_map (
    id UUID PRIMARY KEY,
    asset_id UUID NOT NULL,
    control_id UUID NOT NULL,
    status VARCHAR(32) NOT NULL
);
CREATE INDEX ON compliance.asset_control_map (asset_id);
CREATE INDEX ON compliance.asset_control_map (control_id);

CREATE TABLE compliance.control_tests (
    id UUID PRIMARY KEY,
    control_id UUID NOT NULL REFERENCES compliance.controls(id) ON DELETE CASCADE,
    test_type VARCHAR(64) NOT NULL
);
CREATE INDEX ON compliance.control_tests (control_id);

CREATE TABLE compliance.gaps (
    id UUID PRIMARY KEY,
    asset_id UUID NOT NULL,
    control_id UUID NOT NULL,
    severity VARCHAR(32) NOT NULL
);
CREATE INDEX ON compliance.gaps (asset_id);
CREATE INDEX ON compliance.gaps (control_id);
"""

REVERSE_SQL = """
DROP TABLE IF EXISTS compliance.gaps CASCADE;
DROP TABLE IF EXISTS compliance.control_tests CASCADE;
DROP TABLE IF EXISTS compliance.asset_control_map CASCADE;
DROP TABLE IF EXISTS compliance.control_evidence_requirements CASCADE;
DROP TABLE IF EXISTS compliance.control_framework_mappings CASCADE;
DROP TABLE IF EXISTS compliance.controls CASCADE;
DROP TABLE IF EXISTS compliance.frameworks CASCADE;
"""


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0004_drop_public_core_tables"),
    ]

    operations = [
        migrations.RunSQL(SQL, REVERSE_SQL),
    ]
