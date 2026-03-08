# Compliance schema additions: control_templates, evidence_templates, control_assignments, control_tasks.
# See docs/Database design/db changes- additions.

from django.db import migrations

SQL = """
-- evidence_templates (referenced by control_templates.evidence_template_id)
CREATE TABLE compliance.evidence_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    collection_type VARCHAR(20) NOT NULL CHECK (collection_type IN ('manual', 'automated', 'hybrid')),
    expiration_days INTEGER,
    required_metadata_schema JSONB
);
CREATE INDEX ON compliance.evidence_templates (collection_type);

-- control_templates
CREATE TABLE compliance.control_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    framework_id UUID NOT NULL,
    control_code VARCHAR(100) NOT NULL,
    default_test_method VARCHAR(64),
    default_execution_type VARCHAR(64),
    evidence_template_id UUID REFERENCES compliance.evidence_templates(id) ON DELETE SET NULL
);
CREATE INDEX ON compliance.control_templates (framework_id);
CREATE INDEX ON compliance.control_templates (evidence_template_id);

-- control_assignments
CREATE TABLE compliance.control_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    control_id UUID NOT NULL REFERENCES compliance.controls(id) ON DELETE CASCADE,
    organization_id UUID NOT NULL,
    control_owner_user_id UUID,
    evidence_provider_user_id UUID,
    internal_auditor_user_id UUID,
    compliance_manager_user_id UUID
);
CREATE INDEX ON compliance.control_assignments (control_id);
CREATE INDEX ON compliance.control_assignments (organization_id);

-- control_tasks
CREATE TABLE compliance.control_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    control_test_id UUID NOT NULL REFERENCES compliance.control_tests(id) ON DELETE CASCADE,
    assigned_to_user_id UUID,
    task_type VARCHAR(32) NOT NULL CHECK (task_type IN ('manual_collection', 'review', 'approval')),
    status VARCHAR(32) NOT NULL,
    due_date TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE
);
CREATE INDEX ON compliance.control_tasks (control_test_id);
CREATE INDEX ON compliance.control_tasks (assigned_to_user_id);
CREATE INDEX ON compliance.control_tasks (status);
"""

REVERSE_SQL = """
DROP TABLE IF EXISTS compliance.control_tasks CASCADE;
DROP TABLE IF EXISTS compliance.control_assignments CASCADE;
DROP TABLE IF EXISTS compliance.control_templates CASCADE;
DROP TABLE IF EXISTS compliance.evidence_templates CASCADE;
"""


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0010_drop_public_compliance_audit_evidence_tables"),
    ]

    operations = [
        migrations.RunSQL(SQL, REVERSE_SQL),
    ]
