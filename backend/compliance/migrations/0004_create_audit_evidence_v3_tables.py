# Create audit and evidence V3 tables if they don't exist (e.g. 0002 was faked).
# Run: migrate compliance --database=audit, then migrate compliance --database=evidence

from django.db import migrations


def create_audit_tables(apps, schema_editor):
    """Create control_test_plans, control_test_instances, test_samples, exceptions in audit schema."""
    if schema_editor.connection.alias != "audit":
        return
    with schema_editor.connection.cursor() as cursor:
        # control_test_plans
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS control_test_plans (
                id UUID PRIMARY KEY,
                audit_id UUID NOT NULL REFERENCES audits(id) ON DELETE CASCADE,
                control_id UUID NOT NULL,
                test_name VARCHAR(255) DEFAULT '',
                population_definition TEXT DEFAULT '',
                sampling_method VARCHAR(100) DEFAULT '',
                expected_sample_size INTEGER,
                test_procedure_steps TEXT DEFAULT '',
                created_by_id INTEGER,
                created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
            );
        """)
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_control_test_plans_audit ON control_test_plans (audit_id);")
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_control_test_plans_control ON control_test_plans (control_id);")
        # control_test_instances
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS control_test_instances (
                id UUID PRIMARY KEY,
                control_test_plan_id UUID NOT NULL REFERENCES control_test_plans(id) ON DELETE CASCADE,
                performed_by_personnel_id UUID,
                performed_at TIMESTAMP WITH TIME ZONE,
                reviewed_by_personnel_id UUID,
                reviewed_at TIMESTAMP WITH TIME ZONE,
                result VARCHAR(50) DEFAULT '',
                conclusion TEXT DEFAULT '',
                workpaper_ref VARCHAR(100) DEFAULT '',
                exceptions_summary TEXT DEFAULT '',
                created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
            );
        """)
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_control_test_instances_plan ON control_test_instances (control_test_plan_id);")
        # test_samples
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS test_samples (
                id UUID PRIMARY KEY,
                control_test_instance_id UUID NOT NULL REFERENCES control_test_instances(id) ON DELETE CASCADE,
                sample_reference VARCHAR(255) NOT NULL,
                sample_date DATE,
                sample_result VARCHAR(50) DEFAULT '',
                notes TEXT DEFAULT '',
                created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
            );
        """)
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_test_samples_instance ON test_samples (control_test_instance_id);")
        # exceptions
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS exceptions (
                id UUID PRIMARY KEY,
                control_test_instance_id UUID NOT NULL REFERENCES control_test_instances(id) ON DELETE CASCADE,
                severity VARCHAR(50) DEFAULT '',
                description TEXT NOT NULL,
                root_cause TEXT DEFAULT '',
                remediation_plan TEXT DEFAULT '',
                target_date DATE,
                status VARCHAR(50) DEFAULT '',
                created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
            );
        """)
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_exceptions_instance ON exceptions (control_test_instance_id);")


def create_evidence_tables(apps, schema_editor):
    """Create evidence_links in evidence schema. References evidence.evidence_items (core migration)."""
    if schema_editor.connection.alias != "evidence":
        return
    with schema_editor.connection.cursor() as cursor:
        # Use schema-qualified name so it works even if evidence_items lives in evidence schema
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS evidence_links (
                id UUID PRIMARY KEY,
                evidence_id UUID NOT NULL REFERENCES evidence.evidence_items(id) ON DELETE CASCADE,
                linked_object_type VARCHAR(50) NOT NULL,
                linked_object_id UUID NOT NULL,
                notes TEXT DEFAULT '',
                created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
            );
        """)
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_evidence_links_evidence ON evidence_links (evidence_id);")
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_evidence_links_type ON evidence_links (linked_object_type);")


def noop_reverse(apps, schema_editor):  # noqa: ARG001
    """Optional: leave tables in place on reverse (data may exist)."""
    pass


class Migration(migrations.Migration):

    dependencies = [
        ("compliance", "0003_alter_controlhealth_control"),
    ]

    operations = [
        migrations.RunPython(create_audit_tables, noop_reverse),
        migrations.RunPython(create_evidence_tables, noop_reverse),
    ]
