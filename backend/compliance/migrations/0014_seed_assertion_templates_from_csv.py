# Data migration: seed assertion templates from SOC2_Assertion_Templates_Top30.csv

import csv
import json
from pathlib import Path

from django.conf import settings
from django.db import migrations


def get_csv_path():
    """Resolve path to CSV. BASE_DIR = backend/; project root = opticini/ (backend/../../)."""
    base = Path(settings.BASE_DIR)
    project_root = base.parent.parent
    return project_root / "docs" / "SOC2 Data Seed" / "SOC2_Assertion_Templates_Top30.csv"


def parse_scope_default_json(val):
    """Parse scope_default_json from CSV string."""
    if not val or not val.strip():
        return {}
    try:
        return json.loads(val)
    except json.JSONDecodeError:
        return {}


def parse_connector_types(val):
    """Parse connector_types into list of strings."""
    if not val or not val.strip():
        return []
    return [s.strip() for s in val.split(",") if s.strip()]


def seed_from_csv(apps, schema_editor):
    AssertionTemplate = apps.get_model("compliance", "AssertionTemplate")
    ComplianceControl = apps.get_model("compliance", "ComplianceControl")

    csv_path = get_csv_path()
    if not csv_path.exists():
        raise FileNotFoundError(f"CSV not found: {csv_path}")

    # Codes from previous 0012 seed to remove (replace with CSV data)
    OLD_CODES = [
        "MFA_PRIVILEGED_COVERAGE", "FAILED_LOGIN_ALERT", "INACTIVE_ADMIN_ACCOUNTS",
        "IDENTITY_LOGS_RETENTION", "UNUSED_IAM_KEYS", "PASSWORD_POLICY_COMPLIANCE",
        "DORMANT_ACCOUNTS_REMOVED", "ROOT_ACCOUNT_MFA", "S3_ENCRYPTION_ENABLED",
        "S3_PUBLIC_ACCESS_BLOCKED", "SECURITY_GROUP_NO_WORLD", "CLOUDTRAIL_ENABLED_ALL_REGIONS",
        "EBS_ENCRYPTION", "RDS_ENCRYPTION", "CLOUDTRAIL_ENCRYPTION", "EC2_PUBLIC_IP_RESTRICTED",
        "IAM_KEY_ROTATION", "BRANCH_PROTECTION_ENABLED", "PR_APPROVAL_REQUIRED",
        "NO_DIRECT_PUSH_MAIN", "CODE_REVIEW_REQUIRED", "REQUIRE_STATUS_CHECKS",
        "REPO_PERMISSION_RESTRICTED", "CRITICAL_VULN_SLA", "HIGH_VULN_SLA",
        "PATCH_SLA_MET", "VULN_SCAN_FREQUENCY", "ASSET_COVERAGE", "CRITICAL_VULN_COUNT",
    ]
    AssertionTemplate.objects.filter(assertion_template_code_id__in=OLD_CODES).delete()

    with open(csv_path, encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            control_code = row.get("control_code", "").strip()
            control = None
            if control_code:
                try:
                    control = ComplianceControl.objects.get(control_code_id=control_code)
                except ComplianceControl.DoesNotExist:
                    try:
                        control = ComplianceControl.objects.get(control_id=control_code)
                    except ComplianceControl.DoesNotExist:
                        pass

            threshold_val = row.get("threshold_value", "").strip()
            default_threshold_value = None
            if threshold_val:
                try:
                    default_threshold_value = float(threshold_val)
                except ValueError:
                    pass

            AssertionTemplate.objects.update_or_create(
                assertion_template_code_id=row["assertion_template_code_id"],
                defaults={
                    "name": row["name"],
                    "description_human": row.get("rendered_sentence_template", ""),
                    "control": control,
                    "assertion_type": row.get("assertion_type", "config"),
                    "resource_type": row.get("resource_type", ""),
                    "metric_key": row.get("metric_key", ""),
                    "default_threshold_operator": row.get("threshold_operator", ">="),
                    "default_threshold_value": default_threshold_value,
                    "default_eval_frequency": row.get("eval_frequency", "daily"),
                    "requires_connectors": parse_connector_types(row.get("connector_types", "")),
                    "framework_code_id": row.get("framework_code_id", ""),
                    "severity_default": row.get("severity_default", ""),
                    "rendered_sentence_template": row.get("rendered_sentence_template", ""),
                    "scope_default_json": parse_scope_default_json(row.get("scope_default_json", "")),
                    "evidence_artifact_type": row.get("evidence_artifact_type", ""),
                    "notes": row.get("notes", ""),
                },
            )


def reverse_seed(apps, schema_editor):
    AssertionTemplate = apps.get_model("compliance", "AssertionTemplate")
    csv_path = get_csv_path()
    if not csv_path.exists():
        return
    codes = []
    with open(csv_path, encoding="utf-8") as f:
        reader = csv.DictReader(f)
        codes = [row["assertion_template_code_id"] for row in reader]
    AssertionTemplate.objects.filter(assertion_template_code_id__in=codes).delete()


class Migration(migrations.Migration):

    dependencies = [
        ("compliance", "0013_add_assertion_template_csv_fields"),
    ]

    operations = [
        migrations.RunPython(seed_from_csv, reverse_seed),
    ]
