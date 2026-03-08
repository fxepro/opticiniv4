# Phase 8: composite constraints on control_requirement_mappings
# - Unique(control_id, requirement_id, point_of_focus_id) with nulls_distinct=False
# - At most one primary_control_flag=True per requirement_id

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("compliance", "0006_add_spreadsheet_columns"),
    ]

    operations = [
        migrations.AddConstraint(
            model_name="controlrequirementmapping",
            constraint=models.UniqueConstraint(
                fields=["control", "requirement", "point_of_focus"],
                name="crm_unique_control_req_pof",
                nulls_distinct=False,
            ),
        ),
        migrations.AddConstraint(
            model_name="controlrequirementmapping",
            constraint=models.UniqueConstraint(
                fields=["requirement"],
                condition=models.Q(primary_control_flag=True),
                name="crm_one_primary_per_req",
            ),
        ),
    ]
