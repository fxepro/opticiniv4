# Add personnel_id columns to compliance, evidence, audit per Org Schema.
# See docs/Database design/Org Schema section 2.

from django.db import migrations

SQL = """
-- compliance.control_assignments: add personnel columns (keep existing user_id columns)
ALTER TABLE compliance.control_assignments ADD COLUMN IF NOT EXISTS control_owner_personnel_id UUID;
ALTER TABLE compliance.control_assignments ADD COLUMN IF NOT EXISTS evidence_provider_personnel_id UUID;
ALTER TABLE compliance.control_assignments ADD COLUMN IF NOT EXISTS internal_auditor_personnel_id UUID;
ALTER TABLE compliance.control_assignments ADD COLUMN IF NOT EXISTS compliance_manager_personnel_id UUID;
ALTER TABLE compliance.control_assignments ADD COLUMN IF NOT EXISTS assigned_at TIMESTAMP WITH TIME ZONE;
CREATE INDEX IF NOT EXISTS idx_control_assignments_control_owner_personnel ON compliance.control_assignments (control_owner_personnel_id);

-- compliance.control_tasks: add personnel and escalation columns
ALTER TABLE compliance.control_tasks ADD COLUMN IF NOT EXISTS assigned_personnel_id UUID;
ALTER TABLE compliance.control_tasks ADD COLUMN IF NOT EXISTS assignment_type VARCHAR(32);
ALTER TABLE compliance.control_tasks ADD COLUMN IF NOT EXISTS escalated BOOLEAN DEFAULT false;
ALTER TABLE compliance.control_tasks ADD COLUMN IF NOT EXISTS escalated_to_personnel_id UUID;
CREATE INDEX IF NOT EXISTS idx_control_tasks_assigned_personnel ON compliance.control_tasks (assigned_personnel_id);

-- evidence.evidence_items: add collected_by and approved_by personnel
ALTER TABLE evidence.evidence_items ADD COLUMN IF NOT EXISTS collected_by_personnel_id UUID;
ALTER TABLE evidence.evidence_items ADD COLUMN IF NOT EXISTS approved_by_personnel_id UUID;

-- audit.audit_findings: add remediation owner personnel
ALTER TABLE audit.audit_findings ADD COLUMN IF NOT EXISTS assigned_remediation_owner_personnel_id UUID;
"""

REVERSE_SQL = """
ALTER TABLE compliance.control_assignments
    DROP COLUMN IF EXISTS control_owner_personnel_id,
    DROP COLUMN IF EXISTS evidence_provider_personnel_id,
    DROP COLUMN IF EXISTS internal_auditor_personnel_id,
    DROP COLUMN IF EXISTS compliance_manager_personnel_id,
    DROP COLUMN IF EXISTS assigned_at;
DROP INDEX IF EXISTS compliance.idx_control_assignments_control_owner_personnel;

ALTER TABLE compliance.control_tasks
    DROP COLUMN IF EXISTS assigned_personnel_id,
    DROP COLUMN IF EXISTS assignment_type,
    DROP COLUMN IF EXISTS escalated,
    DROP COLUMN IF EXISTS escalated_to_personnel_id;
DROP INDEX IF EXISTS compliance.idx_control_tasks_assigned_personnel;

ALTER TABLE evidence.evidence_items
    DROP COLUMN IF EXISTS collected_by_personnel_id,
    DROP COLUMN IF EXISTS approved_by_personnel_id;

ALTER TABLE audit.audit_findings
    DROP COLUMN IF EXISTS assigned_remediation_owner_personnel_id;
"""


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0012_add_org_schema"),
    ]

    operations = [
        migrations.RunSQL(SQL, REVERSE_SQL),
    ]
