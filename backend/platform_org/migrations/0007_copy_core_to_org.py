# Copy org-scoped data from core schema to org schema.
# Run after 0006 creates the org tables. Core tables remain until core migration drops them.

from django.db import migrations


def copy_core_to_org(apps, schema_editor):
    if schema_editor.connection.alias != "org":
        return
    from django.db import connections

    # Use raw SQL to copy between schemas (same DB, different schemas)
    with connections["core"].cursor() as core_cursor:
        try:
            core_cursor.execute("SELECT 1 FROM core.organizations LIMIT 1")
        except Exception:
            return  # Core tables not present, nothing to copy

    with connections["core"].cursor() as core_cursor:
        with connections["org"].cursor() as org_cursor:
            # Organizations
            core_cursor.execute(
                "SELECT id, name, tier, created_at FROM core.organizations"
            )
            rows = core_cursor.fetchall()
            for row in rows:
                org_cursor.execute(
                    """
                    INSERT INTO org.organizations (id, name, tier, created_at)
                    VALUES (%s, %s, %s, %s)
                    ON CONFLICT (id) DO NOTHING
                    """,
                    row,
                )

            # Teams
            core_cursor.execute(
                "SELECT id, organization_id, name FROM core.teams"
            )
            rows = core_cursor.fetchall()
            for row in rows:
                org_cursor.execute(
                    """
                    INSERT INTO org.teams (id, organization_id, name)
                    VALUES (%s, %s, %s)
                    ON CONFLICT (id) DO NOTHING
                    """,
                    row,
                )

            # Environments
            core_cursor.execute(
                "SELECT id, organization_id, name, type FROM core.environments"
            )
            rows = core_cursor.fetchall()
            for row in rows:
                org_cursor.execute(
                    """
                    INSERT INTO org.environments (id, organization_id, name, type)
                    VALUES (%s, %s, %s, %s)
                    ON CONFLICT (id) DO NOTHING
                    """,
                    row,
                )

            # Org connectors
            core_cursor.execute(
                """
                SELECT id, organization_id, name, connector_type, governance_set,
                       COALESCE(config::text, '{}'), credentials_ref, last_synced_at,
                       status, created_at, updated_at
                FROM core.org_connectors
                """
            )
            rows = core_cursor.fetchall()
            for row in rows:
                org_cursor.execute(
                    """
                    INSERT INTO org.org_connectors
                    (id, organization_id, name, connector_type, governance_set,
                     config, credentials_ref, last_synced_at, status, created_at, updated_at)
                    VALUES (%s, %s, %s, %s, %s, %s::jsonb, %s, %s, %s, %s, %s)
                    ON CONFLICT (id) DO NOTHING
                    """,
                    row,
                )

            # Org connector module scope
            core_cursor.execute(
                """
                SELECT id, org_connector_id, module
                FROM core.org_connector_module_scope
                """
            )
            rows = core_cursor.fetchall()
            for row in rows:
                org_cursor.execute(
                    """
                    INSERT INTO org.org_connector_module_scope (id, org_connector_id, module)
                    VALUES (%s, %s, %s)
                    ON CONFLICT (id) DO NOTHING
                    """,
                    row,
                )

            # Organization regions
            core_cursor.execute(
                """
                SELECT id, organization_id, country_id, name, primary_contact_name,
                       primary_contact_email, address, created_at, updated_at
                FROM core.organization_regions
                """
            )
            rows = core_cursor.fetchall()
            for row in rows:
                org_cursor.execute(
                    """
                    INSERT INTO org.organization_regions
                    (id, organization_id, country_id, name, primary_contact_name,
                     primary_contact_email, address, created_at, updated_at)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                    ON CONFLICT (id) DO NOTHING
                    """,
                    row,
                )


def noop_reverse(apps, schema_editor):
    pass


class Migration(migrations.Migration):

    dependencies = [
        ("platform_org", "0006_org_entities_organizations_teams_connectors_regions"),
    ]

    operations = [
        migrations.RunPython(copy_core_to_org, noop_reverse),
    ]
