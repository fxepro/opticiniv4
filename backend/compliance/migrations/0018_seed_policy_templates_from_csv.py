# Seed PolicyTemplate from SOC2_System_Policy_Templates_Seed.csv + control mapping from FULL20
# policy_templates lives in compliance schema only; skip when CSV absent

import csv
from pathlib import Path

from django.conf import settings
from django.db import migrations


def get_project_root():
    base = Path(settings.BASE_DIR)
    return base.parent.parent


def load_control_mapping():
    """Load policy_code -> mapped_control_codes from FULL20 CSV."""
    path = get_project_root() / "docs" / "SOC2 Data Seed" / "SOC2_System_Policies_With_Control_Mapping_FULL20.csv"
    mapping = {}
    if path.exists():
        with open(path, encoding="utf-8-sig", errors="replace") as f:
            reader = csv.DictReader(f)
            for row in reader:
                code = row.get("policy_code", "").strip()
                raw = row.get("mapped_control_codes", "").strip()
                codes = [c.strip() for c in raw.split(",") if c.strip()]
                mapping[code] = codes
    return mapping


def forward(apps, schema_editor):
    if schema_editor.connection.alias != "compliance":
        return
    with schema_editor.connection.cursor() as c:
        c.execute(
            "ALTER TABLE policy_templates ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();"
        )
    PolicyTemplate = apps.get_model("compliance", "PolicyTemplate")
    csv_path = get_project_root() / "docs" / "SOC2 Data Seed" / "SOC2_System_Policy_Templates_Seed.csv"
    if not csv_path.exists():
        return
    control_mapping = load_control_mapping()
    with open(csv_path, encoding="utf-8-sig", errors="replace") as f:
        reader = csv.DictReader(f)
        for row in reader:
            code_id = row.get("policy_code_id", "").strip()
            policy_code = row.get("policy_code", "").strip()
            if not code_id or not policy_code:
                continue
            mapped = control_mapping.get(policy_code, [])
            PolicyTemplate.objects.using("compliance").update_or_create(
                policy_template_code_id=code_id,
                defaults={
                    "policy_code": policy_code,
                    "name": row.get("policy_name", "").strip(),
                    "description": row.get("policy_description", "").strip(),
                    "framework_default": row.get("framework_default", "").strip(),
                    "policy_status_default": row.get("policy_status_default", "").strip(),
                    "review_frequency": row.get("review_frequency", "").strip(),
                    "owner_role_default": row.get("owner_role_default", "").strip(),
                    "overview_status_default": row.get("overview_status_default", "").strip(),
                    "overview_last_reviewed_default": row.get("overview_last_reviewed", "").strip(),
                    "config_scope_default": row.get("config_scope_default", "").strip(),
                    "config_version_default": row.get("config_version_default", "").strip(),
                    "history_90d_review_activity_default": row.get("history_90d_review_activity", "").strip(),
                    "evidence_policy_document_default": row.get("evidence_policy_document", "").strip(),
                    "evidence_review_record_default": row.get("evidence_review_record", "").strip(),
                    "mapped_control_codes": mapped,
                },
            )


def reverse(apps, schema_editor):
    if schema_editor.connection.alias != "compliance":
        return
    PolicyTemplate = apps.get_model("compliance", "PolicyTemplate")
    code_ids = [
        "POLSEC001", "POLSEC002", "POLSEC003", "POLSEC004", "POLSEC005",
        "POLSEC006", "POLSEC007", "POLSEC008", "POLSEC009", "POLSEC010",
        "POLSEC011", "POLSEC012", "POLSEC013", "POLSEC014", "POLSEC015",
        "POLSEC016", "POLSEC017", "POLSEC018", "POLSEC019", "POLSEC020",
    ]
    PolicyTemplate.objects.using("compliance").filter(policy_template_code_id__in=code_ids).delete()


class Migration(migrations.Migration):

    dependencies = [
        ("compliance", "0017_create_policy_template_model"),
    ]

    operations = [
        migrations.RunPython(forward, reverse),
    ]
