"""
Database router: send core schema models (Organization, Team, Environment) to the 'core' DB alias.
The 'core' alias uses search_path=core,public so table names resolve to the core schema.
"""


# Apps whose tables live in core schema (auth, users, sessions, etc.)
CORE_USER_APP_LABELS = {"auth", "contenttypes", "sessions", "admin", "users"}


class UserTablesRouter:
    """Route auth, users, sessions, contenttypes, admin to core schema."""

    def db_for_read(self, model, **hints):
        if model._meta.app_label in CORE_USER_APP_LABELS:
            return "core"
        return None

    def db_for_write(self, model, **hints):
        if model._meta.app_label in CORE_USER_APP_LABELS:
            return "core"
        return None

    def allow_relation(self, obj1, obj2, **hints):
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        if app_label in CORE_USER_APP_LABELS:
            return db == "core"
        return None


class PlatformCoreRouter:
    """Route core app models to the core database (schema).
    Org-scoped entities (Organization, Team, Environment, Country, etc.) live in org schema via platform_org.
    Core keeps: VersionRelease (platform) only.
    """

    core_models = {"versionrelease"}

    def db_for_read(self, model, **hints):
        if model._meta.model_name in self.core_models and model._meta.app_label == "core":
            return "core"
        return None

    def db_for_write(self, model, **hints):
        if model._meta.model_name in self.core_models and model._meta.app_label == "core":
            return "core"
        return None

    def allow_relation(self, obj1, obj2, **hints):
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        """
        In v3, core models are managed by Django migrations on the 'core' DB alias.
        Only allow core models to migrate on the 'core' database, and nowhere else.
        """
        if app_label == "core" and model_name in self.core_models:
            return db == "core"
        return None


class PlatformDiscoveryRouter:
    """Route discovery app models to the discovery database (schema)."""

    def db_for_read(self, model, **hints):
        if model._meta.app_label == "discovery":
            return "discovery"
        return None

    def db_for_write(self, model, **hints):
        if model._meta.app_label == "discovery":
            return "discovery"
        return None

    def allow_relation(self, obj1, obj2, **hints):
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        if db == "discovery" and app_label == "discovery":
            return False
        return None


class PlatformIdentityRouter:
    """Route identity app models to the identity database (schema)."""

    def db_for_read(self, model, **hints):
        if model._meta.app_label == "identity":
            return "identity"
        return None

    def db_for_write(self, model, **hints):
        if model._meta.app_label == "identity":
            return "identity"
        return None

    def allow_relation(self, obj1, obj2, **hints):
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        if db == "identity" and app_label == "identity":
            return False
        return None


class PlatformChangeRouter:
    """Route change app models to the change database (schema)."""

    def db_for_read(self, model, **hints):
        if model._meta.app_label == "change":
            return "change"
        return None

    def db_for_write(self, model, **hints):
        if model._meta.app_label == "change":
            return "change"
        return None

    def allow_relation(self, obj1, obj2, **hints):
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        if db == "change" and app_label == "change":
            return False
        return None


# Model -> DB for single compliance app (compliance/evidence/audit schemas; policy/report/tool stay default/public)
COMPLIANCE_MODEL_TO_DB = {
    "complianceframework": "compliance",
    "organizationframework": "compliance",
    "frameworkversion": "compliance",
    "requirement": "compliance",
    "requirementpointoffocus": "compliance",
    "controlrequirementmapping": "compliance",
    "compliancecontrol": "compliance",
    "compliancecontrolframeworkmapping": "compliance",
    "controlevidencerequirement": "compliance",
    "controldepartmentmap": "compliance",
    "controlreview": "compliance",
    "assertiontemplate": "compliance",
    "controlassertion": "compliance",
    "metricsnapshot": "compliance",
    "controlhealth": "compliance",
    "evidencetemplate": "compliance",
    "controltemplate": "compliance",
    "controlassignment": "compliance",
    "controltask": "compliance",
    "taskescalation": "compliance",
    "controlownerhistory": "compliance",
    "complianceevidence": "evidence",
    "complianceevidencecontrolmapping": "evidence",
    "evidencelink": "evidence",
    "complianceaudit": "audit",
    "complianceauditfinding": "audit",
    "complianceauditauditor": "audit",
    "complianceauditframeworkmapping": "audit",
    "controltestplan": "audit",
    "controltestinstance": "audit",
    "testsample": "audit",
    "auditexception": "audit",
    "auditstatushistory": "audit",
    "compliancepolicy": "compliance",
    "compliancepolicyversion": "compliance",
    "compliancepolicyattestation": "compliance",
    "compliancepolicyframeworkmapping": "compliance",
    "policytemplate": "compliance",
}

# Legacy: route old 4 compliance apps when still in INSTALLED_APPS
COMPLIANCE_APP_TO_DB_LEGACY = {
    "compliance_frameworks": "compliance",
    "compliance_controls": "compliance",
    "compliance_evidence": "evidence",
    "compliance_audits": "audit",
}


class PlatformComplianceEvidenceAuditRouter:
    """Route single app 'compliance' by model to compliance/evidence/audit/default; or legacy 4 apps to their DB.
    V3: allow_migrate enables Django migrations (makemigrations/migrate) on compliance/evidence/audit per model.
    """

    def db_for_read(self, model, **hints):
        if model._meta.app_label == "compliance":
            return COMPLIANCE_MODEL_TO_DB.get(model._meta.model_name)
        return COMPLIANCE_APP_TO_DB_LEGACY.get(model._meta.app_label)

    def db_for_write(self, model, **hints):
        if model._meta.app_label == "compliance":
            return COMPLIANCE_MODEL_TO_DB.get(model._meta.model_name)
        return COMPLIANCE_APP_TO_DB_LEGACY.get(model._meta.app_label)

    def allow_relation(self, obj1, obj2, **hints):
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        # Allow compliance app migrations on compliance/evidence/audit only for models that belong to that DB.
        if db in ("compliance", "evidence", "audit") and app_label == "compliance" and model_name:
            return COMPLIANCE_MODEL_TO_DB.get(model_name) == db
        # Legacy 4-app: do not run their migrations on schema DBs (they use default or are deprecated).
        if db in ("compliance", "evidence", "audit") and app_label in COMPLIANCE_APP_TO_DB_LEGACY:
            return False
        return None


class PlatformCostRouter:
    """Route cost app models to the cost database (schema)."""

    def db_for_read(self, model, **hints):
        if model._meta.app_label == "cost":
            return "cost"
        return None

    def db_for_write(self, model, **hints):
        if model._meta.app_label == "cost":
            return "cost"
        return None

    def allow_relation(self, obj1, obj2, **hints):
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        if db == "cost" and app_label == "cost":
            return False
        return None


class PlatformRiskRouter:
    """Route risk app models to the risk database (schema)."""

    def db_for_read(self, model, **hints):
        if model._meta.app_label == "risk":
            return "risk"
        return None

    def db_for_write(self, model, **hints):
        if model._meta.app_label == "risk":
            return "risk"
        return None

    def allow_relation(self, obj1, obj2, **hints):
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        if db == "risk" and app_label == "risk":
            return False
        return None


class PlatformMonitoringRouter:
    """Route platform_monitoring app models to the monitoring database (schema)."""

    def db_for_read(self, model, **hints):
        if model._meta.app_label == "platform_monitoring":
            return "monitoring"
        return None

    def db_for_write(self, model, **hints):
        if model._meta.app_label == "platform_monitoring":
            return "monitoring"
        return None

    def allow_relation(self, obj1, obj2, **hints):
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        if db == "monitoring" and app_label == "platform_monitoring":
            return False
        return None


class PlatformReportsRouter:
    """Route platform_reports app models to the reports database (schema)."""

    def db_for_read(self, model, **hints):
        if model._meta.app_label == "platform_reports":
            return "reports"
        return None

    def db_for_write(self, model, **hints):
        if model._meta.app_label == "platform_reports":
            return "reports"
        return None

    def allow_relation(self, obj1, obj2, **hints):
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        if db == "reports" and app_label == "platform_reports":
            return False
        return None


class PlatformOrgRouter:
    """Route platform_org app models to the org database (schema)."""

    def db_for_read(self, model, **hints):
        if model._meta.app_label == "platform_org":
            return "org"
        return None

    def db_for_write(self, model, **hints):
        if model._meta.app_label == "platform_org":
            return "org"
        return None

    def allow_relation(self, obj1, obj2, **hints):
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        """Phase 0: org tables (personnel, departments, roles) live in org schema only."""
        if app_label == "platform_org":
            return db == "org"
        return None
