# Optional recommended: task_escalations and control_owner_history. See Org Schema section 3.

from django.db import migrations

SQL = """
CREATE TABLE compliance.task_escalations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID NOT NULL,
    from_personnel_id UUID,
    to_personnel_id UUID,
    escalation_reason VARCHAR(255),
    escalated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);
CREATE INDEX ON compliance.task_escalations (task_id);

CREATE TABLE compliance.control_owner_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    control_id UUID NOT NULL,
    personnel_id UUID NOT NULL,
    effective_from DATE NOT NULL,
    effective_to DATE
);
CREATE INDEX ON compliance.control_owner_history (control_id);
CREATE INDEX ON compliance.control_owner_history (personnel_id);
"""

REVERSE_SQL = """
DROP TABLE IF EXISTS compliance.control_owner_history CASCADE;
DROP TABLE IF EXISTS compliance.task_escalations CASCADE;
"""


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0013_org_personnel_columns_on_compliance_evidence_audit"),
    ]

    operations = [
        migrations.RunSQL(SQL, REVERSE_SQL),
    ]
