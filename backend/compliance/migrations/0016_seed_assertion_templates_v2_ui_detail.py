# Data migration: update assertion templates with v2 UI detail from CSV

import csv
from pathlib import Path

from django.conf import settings
from django.db import migrations


def get_csv_path():
    """Resolve path to v2 CSV. BASE_DIR = backend/; project root = opticini/ (backend/../../)."""
    base = Path(settings.BASE_DIR)
    project_root = base.parent.parent
    return project_root / "docs" / "SOC2 Data Seed" / "SOC2_Assertion_Templates_Top30_v2_UI_DetailSeed.csv"


V2_UI_FIELDS = [
    "overview_rendered_sentence_example",
    "overview_policy_code",
    "overview_status_default",
    "overview_last_run_default",
    "overview_last_value_default",
    "config_scope_display",
    "config_threshold_display",
    "config_frequency_display",
    "config_connector_display",
    "history_30d_pass_rate_default",
    "history_90d_pass_rate_default",
    "evidence_auto_generated_type",
    "evidence_auto_generated_status_default",
    "evidence_90_day_report_type",
    "evidence_90_day_report_status_default",
]


def seed_v2_ui_detail(apps, schema_editor):
    AssertionTemplate = apps.get_model("compliance", "AssertionTemplate")
    csv_path = get_csv_path()
    if not csv_path.exists():
        raise FileNotFoundError(f"CSV not found: {csv_path}")

    with open(csv_path, encoding="utf-8-sig", errors="replace") as f:
        reader = csv.DictReader(f)
        for row in reader:
            code = row.get("assertion_template_code_id", "").strip()
            if not code:
                continue
            defaults = {f: row.get(f, "").strip() for f in V2_UI_FIELDS}
            AssertionTemplate.objects.filter(assertion_template_code_id=code).update(**defaults)


def reverse_seed(apps, schema_editor):
    """Clear v2 UI fields (set to empty string)."""
    AssertionTemplate = apps.get_model("compliance", "AssertionTemplate")
    AssertionTemplate.objects.all().update(
        overview_rendered_sentence_example="",
        overview_policy_code="",
        overview_status_default="",
        overview_last_run_default="",
        overview_last_value_default="",
        config_scope_display="",
        config_threshold_display="",
        config_frequency_display="",
        config_connector_display="",
        history_30d_pass_rate_default="",
        history_90d_pass_rate_default="",
        evidence_auto_generated_type="",
        evidence_auto_generated_status_default="",
        evidence_90_day_report_type="",
        evidence_90_day_report_status_default="",
    )


class Migration(migrations.Migration):

    dependencies = [
        ("compliance", "0015_add_assertion_template_ui_detail_fields"),
    ]

    operations = [
        migrations.RunPython(seed_v2_ui_detail, reverse_seed),
    ]
