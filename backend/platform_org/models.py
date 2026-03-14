"""
Org schema: organizations, teams, environments, connectors, regions; personnel, departments, roles.
All org-scoped data lives in org schema. See docs/Database design/Org Schema.
"""
import uuid
from django.db import models


# --- Reference (org schema) ---

class Country(models.Model):
    """
    org.countries — Reference table for countries. Used for multi-region (compliance by region).
    region_group drives compliance grouping (EU, US, APAC, etc.).
    """
    REGION_NA = "NA"
    REGION_EU = "EU"
    REGION_ASIA = "ASIA"
    REGION_MEA = "MEA"
    REGION_LATAM = "LATAM"
    REGION_AU = "AU"
    REGION_GROUP_CHOICES = [
        (REGION_NA, "North America"),
        (REGION_EU, "EU"),
        (REGION_ASIA, "Asia"),
        (REGION_MEA, "MEA"),
        (REGION_LATAM, "Latin America"),
        (REGION_AU, "Australia"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    code = models.CharField(max_length=10, unique=True)  # ISO 3166-1 alpha-2 (e.g. US, DE)
    name = models.CharField(max_length=255)
    region_group = models.CharField(max_length=32, choices=REGION_GROUP_CHOICES, default=REGION_NA)

    class Meta:
        db_table = "countries"
        verbose_name = "Country"
        verbose_name_plural = "Countries"
        ordering = ["name"]

    def __str__(self):
        return f"{self.name} ({self.code})"


class Currency(models.Model):
    """org.currencies — ISO 4217 currency reference."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    code = models.CharField(max_length=3, unique=True)   # ISO 4217 (USD, EUR, GBP …)
    name = models.CharField(max_length=100)
    symbol = models.CharField(max_length=5, blank=True, default="")

    class Meta:
        db_table = "currencies"
        verbose_name = "Currency"
        verbose_name_plural = "Currencies"
        ordering = ["code"]

    def __str__(self):
        return f"{self.code} — {self.name}"


class Timezone(models.Model):
    """org.timezones — IANA / UTC-offset reference."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=64, unique=True)       # e.g. "UTC+05:30" or "America/New_York"
    label = models.CharField(max_length=120, blank=True, default="")  # human-readable
    utc_offset = models.SmallIntegerField(default=0)           # offset in minutes from UTC

    class Meta:
        db_table = "timezones"
        verbose_name = "Timezone"
        verbose_name_plural = "Timezones"
        ordering = ["utc_offset", "name"]

    def __str__(self):
        return self.label or self.name


class State(models.Model):
    """org.states — Sub-national divisions (states, provinces, cantons, etc.)."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    country = models.ForeignKey(Country, on_delete=models.CASCADE, related_name="states")
    code = models.CharField(max_length=10)       # e.g. "CA", "TX", "BY"
    name = models.CharField(max_length=255)

    class Meta:
        db_table = "states"
        verbose_name = "State / Province"
        verbose_name_plural = "States / Provinces"
        ordering = ["name"]
        unique_together = [("country", "code")]

    def __str__(self):
        return f"{self.name} ({self.code})"


# --- Org entities (tenant identity and structure) ---

class Organization(models.Model):
    """org.organizations — Cross-platform foundational entity (tenant)."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    org_id = models.IntegerField(
        unique=True,
        editable=False,
        help_text="Customer-facing org identifier, starts at 100",
    )
    name = models.CharField(max_length=255)
    tier = models.CharField(max_length=50, default="free")

    # Profile / identity
    legal_name = models.CharField(max_length=255, blank=True, default="")
    display_name = models.CharField(max_length=255, blank=True, default="")
    primary_domain = models.CharField(max_length=255, blank=True, default="")
    secondary_domains = models.TextField(blank=True, default="")
    physical_address = models.TextField(blank=True, default="")
    industry = models.CharField(max_length=120, blank=True, default="")

    # Jurisdiction
    jurisdiction_country = models.CharField(max_length=10, blank=True, default="")
    jurisdiction_state = models.CharField(max_length=10, blank=True, default="")

    # Locale
    timezone = models.CharField(max_length=64, blank=True, default="UTC+00:00")
    currency = models.CharField(max_length=3, blank=True, default="USD")
    fiscal_year_start_month = models.SmallIntegerField(default=1)

    # Contacts
    primary_contact_name = models.CharField(max_length=255, blank=True, default="")
    primary_contact_email = models.EmailField(blank=True, default="")
    billing_contact_email = models.EmailField(blank=True, default="")
    security_contact_email = models.EmailField(blank=True, default="")

    # Data residency & security
    data_residency_region = models.CharField(max_length=64, blank=True, default="")
    default_environment_id = models.UUIDField(null=True, blank=True)
    enforce_mfa = models.BooleanField(default=False)
    sso_enabled = models.BooleanField(default=False)

    # Status
    status = models.CharField(max_length=20, default="active")

    # Audit
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.UUIDField(null=True, blank=True, help_text="User UUID who created this org")
    changed_by = models.UUIDField(null=True, blank=True, help_text="User UUID who last changed this org")
    changed_at = models.DateTimeField(null=True, blank=True, help_text="Timestamp of last change")

    class Meta:
        db_table = "organizations"
        verbose_name = "Organization"
        verbose_name_plural = "Organizations"

    def save(self, *args, **kwargs):
        if self.org_id is None:
            last = (
                Organization.objects.using(kwargs.get("using", "org"))
                .order_by("-org_id")
                .values_list("org_id", flat=True)
                .first()
            )
            self.org_id = (last or 99) + 1
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.org_id} — {self.name}"


class Team(models.Model):
    """org.teams — Team within an organization."""
    TEAM_DEPARTMENT = "department"
    TEAM_ENGINEERING = "engineering"
    TEAM_SECURITY = "security"
    TEAM_COMPLIANCE = "compliance"
    TEAM_FINANCE = "finance"
    TEAM_OPS = "ops"
    TEAM_CUSTOM = "custom"
    TEAM_TYPE_CHOICES = [
        (TEAM_DEPARTMENT, "Department"),
        (TEAM_ENGINEERING, "Engineering"),
        (TEAM_SECURITY, "Security"),
        (TEAM_COMPLIANCE, "Compliance"),
        (TEAM_FINANCE, "Finance"),
        (TEAM_OPS, "Ops"),
        (TEAM_CUSTOM, "Custom"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    organization = models.ForeignKey(
        Organization,
        on_delete=models.CASCADE,
        related_name="teams",
        db_column="organization_id",
    )
    # Teams are inter-departmental; no department FK
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, default="")
    team_type = models.CharField(max_length=32, choices=TEAM_TYPE_CHOICES, default=TEAM_CUSTOM)
    active = models.BooleanField(default=True)

    class Meta:
        db_table = "teams"
        verbose_name = "Team"
        verbose_name_plural = "Teams"

    def __str__(self):
        return self.name


class TeamMember(models.Model):
    """org.team_members — User membership in a team. user_id references auth_user.id."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name="members", db_column="team_id")
    user_id = models.IntegerField(db_index=True)

    class Meta:
        db_table = "team_members"
        verbose_name = "Team member"
        verbose_name_plural = "Team members"
        unique_together = [["team", "user_id"]]

    def __str__(self):
        return f"{self.team_id} — user {self.user_id}"


class Environment(models.Model):
    """org.environments — Environment (e.g. prod, staging) per organization."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    organization = models.ForeignKey(
        Organization,
        on_delete=models.CASCADE,
        related_name="environments",
        db_column="organization_id",
    )
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=50)  # enum: e.g. production, staging, development

    class Meta:
        db_table = "environments"
        verbose_name = "Environment"
        verbose_name_plural = "Environments"

    def __str__(self):
        return self.name


class OrgConnector(models.Model):
    """org.org_connectors — Tenant-wide and module-scoped connectors (Set 2 & 3)."""
    GOVERNANCE_SET_GLOBAL = 2
    GOVERNANCE_SET_SCOPED = 3
    GOVERNANCE_SET_CHOICES = [(2, "Global (all modules)"), (3, "Module-scoped")]

    CONNECTOR_TYPE_CHOICES = [
        ("cloud", "Cloud (AWS/Azure/GCP)"),
        ("kubernetes", "Kubernetes"),
        ("email", "Email provider"),
        ("slack", "Slack / Teams"),
        ("hris", "HRIS (Workday, BambooHR)"),
        ("siem", "SIEM"),
        ("vuln_scanner", "Vulnerability scanner"),
        ("dev_platform", "Dev platform (GitHub etc.)"),
        ("itsm", "ITSM (Jira, ServiceNow)"),
        ("evidence_storage", "Evidence storage (S3 etc.)"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    organization_id = models.UUIDField(null=False, db_index=True)
    name = models.CharField(max_length=255)
    connector_type = models.CharField(max_length=64, choices=CONNECTOR_TYPE_CHOICES)
    governance_set = models.SmallIntegerField(choices=GOVERNANCE_SET_CHOICES, default=GOVERNANCE_SET_SCOPED)
    config = models.JSONField(default=dict, blank=True)
    credentials_ref = models.CharField(max_length=255, blank=True)
    last_synced_at = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=32, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "org_connectors"
        verbose_name = "Org connector"
        verbose_name_plural = "Org connectors"
        indexes = [
            models.Index(fields=["organization_id", "connector_type"], name="org_connect_organiz_98edd7_idx"),
        ]

    def __str__(self):
        return f"{self.name} ({self.get_connector_type_display()})"


class OrgConnectorModuleScope(models.Model):
    """org.org_connector_module_scope — Which modules can use a Set 3 connector."""
    MODULE_CHOICES = [
        ("discovery", "Discovery"),
        ("security", "Security"),
        ("compliance", "Compliance"),
        ("cost", "Cost"),
        ("health", "Health"),
        ("change", "Change"),
        ("evidence", "Evidence"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    org_connector = models.ForeignKey(
        OrgConnector,
        on_delete=models.CASCADE,
        related_name="module_scopes",
        db_column="org_connector_id",
    )
    module = models.CharField(max_length=64, choices=MODULE_CHOICES)

    class Meta:
        db_table = "org_connector_module_scope"
        verbose_name = "Org connector module scope"
        verbose_name_plural = "Org connector module scopes"
        unique_together = [["org_connector", "module"]]
        indexes = [
            models.Index(fields=["org_connector_id", "module"], name="org_connect_org_con_5236ab_idx"),
        ]

    def __str__(self):
        return f"{self.org_connector_id} → {self.module}"


class OrganizationRegion(models.Model):
    """org.organization_regions — Per-org, per-country region for compliance (EU vs US etc.)."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    organization_id = models.UUIDField(null=False, db_index=True)
    country = models.ForeignKey(
        Country,
        on_delete=models.PROTECT,
        related_name="+",
        db_column="country_id",
    )
    name = models.CharField(max_length=255)
    city = models.CharField(max_length=255, blank=True, default="")
    currency_code = models.CharField(max_length=3, blank=True, default="")
    primary_contact_name = models.CharField(max_length=255, blank=True)
    primary_contact_email = models.EmailField(max_length=255, blank=True)
    address = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "organization_regions"
        verbose_name = "Organization region"
        verbose_name_plural = "Organization regions"
        unique_together = [["organization_id", "country_id"]]
        indexes = [models.Index(fields=["organization_id"], name="organizatio_organiz_a52f2f_idx")]

    def __str__(self):
        return f"{self.name}"


class OrgCurrency(models.Model):
    """org.org_currencies — Currencies enabled for an organization."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    organization_id = models.UUIDField(null=False, db_index=True)
    currency = models.ForeignKey(
        Currency,
        on_delete=models.PROTECT,
        related_name="+",
        db_column="currency_id",
    )
    is_default = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "org_currencies"
        verbose_name = "Org currency"
        verbose_name_plural = "Org currencies"
        unique_together = [["organization_id", "currency"]]
        indexes = [models.Index(fields=["organization_id"], name="org_curr_org_id_idx")]

    def __str__(self):
        return f"{self.organization_id} → {self.currency_id}"


# --- Org people and structure ---

class Personnel(models.Model):
    """org.personnel — business identity, separate from system login."""
    EMPLOYMENT_STATUS_CHOICES = [
        ("active", "Active"),
        ("terminated", "Terminated"),
        ("leave", "Leave"),
    ]
    USER_TYPE_CHOICES = [
        ("internal", "Internal"),
        ("external", "External"),
    ]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    organization_id = models.UUIDField()
    external_hr_id = models.CharField(max_length=255, blank=True)
    user_id = models.IntegerField(null=True, blank=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    employment_status = models.CharField(max_length=32, choices=EMPLOYMENT_STATUS_CHOICES, default="active")
    user_type = models.CharField(max_length=16, choices=USER_TYPE_CHOICES, default="internal")
    job_title = models.CharField(max_length=255, blank=True)
    department = models.CharField(max_length=255, blank=True)
    department_id = models.UUIDField(null=True, blank=True)
    manager_personnel_id = models.UUIDField(null=True, blank=True)
    hire_date = models.DateField(null=True, blank=True)
    termination_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "personnel"
        indexes = [
            models.Index(fields=["organization_id"]),
            models.Index(fields=["manager_personnel_id"]),
        ]

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Department(models.Model):
    """org.departments"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    organization_id = models.UUIDField()
    department_code = models.CharField(max_length=100, blank=True, help_text="Human-readable department code")
    name = models.CharField(max_length=255)
    parent_department_id = models.UUIDField(null=True, blank=True)
    head_personnel_id = models.UUIDField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "departments"

    def __str__(self):
        return self.name


class Role(models.Model):
    """org.roles — business roles, not system permissions."""
    ROLE_TYPE_CHOICES = [
        ("control_owner", "Control owner"),
        ("evidence_provider", "Evidence provider"),
        ("internal_auditor", "Internal auditor"),
        ("compliance_manager", "Compliance manager"),
        ("approver", "Approver"),
        ("executive", "Executive"),
    ]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    organization_id = models.UUIDField()
    role_name = models.CharField(max_length=255)
    role_type = models.CharField(max_length=32, choices=ROLE_TYPE_CHOICES, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "roles"

    def __str__(self):
        return self.role_name


class PersonnelRole(models.Model):
    """org.personnel_roles — map personnel to roles with effective dates."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    personnel_id = models.UUIDField()
    role_id = models.UUIDField()
    effective_from = models.DateField()
    effective_to = models.DateField(null=True, blank=True)

    class Meta:
        db_table = "personnel_roles"
        unique_together = [["personnel_id", "role_id", "effective_from"]]
        indexes = [models.Index(fields=["role_id"])]

    def __str__(self):
        return f"{self.personnel_id} -> {self.role_id}"


class SyncSource(models.Model):
    """org.sync_sources — HR / IdP integration tracking (Set 1: Account-only)."""
    SOURCE_TYPE_CHOICES = [
        ("okta", "Okta"),
        ("azure_ad", "Azure AD"),
        ("workday", "Workday"),
        ("csv", "CSV"),
        ("manual", "Manual"),
        ("ldap", "LDAP"),
    ]
    STATUS_CHOICES = [
        ("active", "Active"),
        ("failed", "Failed"),
        ("paused", "Paused"),
    ]
    GOVERNANCE_SET_ACCOUNT_ONLY = 1
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    organization_id = models.UUIDField()
    source_type = models.CharField(max_length=32, choices=SOURCE_TYPE_CHOICES)
    governance_set = models.SmallIntegerField(default=GOVERNANCE_SET_ACCOUNT_ONLY)  # 1 = Account-only
    last_synced_at = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=32, choices=STATUS_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "sync_sources"

    def __str__(self):
        return f"{self.source_type} ({self.status})"
