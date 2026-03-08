# Move compliance policy tables from public to compliance schema.
# Drop duplicate public.compliance_summary (reports.compliance_summary exists).

from django.db import migrations


def move_compliance_policy_tables(apps, schema_editor):
    from django.db import connections
    comp_conn = connections["compliance"]
    default_conn = connections["default"]
    with comp_conn.cursor() as comp_c:
        with default_conn.cursor() as def_c:
            tables = [
                "policy_templates",
                "compliance_policies",
                "compliance_policy_versions",
                "compliance_policy_attestations",
                "compliance_policy_framework_mappings",
            ]
            for t in tables:
                try:
                    def_c.execute(f"SELECT 1 FROM public.{t} LIMIT 1")
                except Exception:
                    continue
                try:
                    comp_c.execute(
                        f"CREATE TABLE IF NOT EXISTS compliance.{t} "
                        f"(LIKE public.{t} INCLUDING DEFAULTS INCLUDING INDEXES)"
                    )
                except Exception:
                    pass
                def_c.execute(f"SELECT * FROM public.{t}")
                rows = def_c.fetchall()
                if not rows:
                    continue
                cols = [d[0] for d in def_c.description]
                placeholders = ",".join(["%s"] * len(cols))
                col_list = ",".join(cols)
                for row in rows:
                    try:
                        comp_c.execute(
                            f"INSERT INTO compliance.{t} ({col_list}) VALUES ({placeholders})",
                            row,
                        )
                    except Exception:
                        pass
            # Drop public tables (children before parents)
            drop_order = [
                "compliance_policy_framework_mappings",
                "compliance_policy_attestations",
                "compliance_policy_versions",
                "compliance_policies",
                "policy_templates",
            ]
            for t in drop_order:
                try:
                    def_c.execute(f"DROP TABLE IF EXISTS public.{t} CASCADE")
                except Exception:
                    pass
            # Drop duplicate public.compliance_summary
            try:
                def_c.execute("DROP TABLE IF EXISTS public.compliance_summary CASCADE")
            except Exception:
                pass


def noop_reverse(apps, schema_editor):
    pass


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0023_user_tables_to_identity"),
    ]

    operations = [
        migrations.RunPython(move_compliance_policy_tables, noop_reverse),
    ]
