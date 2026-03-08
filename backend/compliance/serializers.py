from rest_framework import serializers
from compliance.models import (
    ComplianceFramework,
    ComplianceControl,
    ComplianceControlFrameworkMapping,
    ControlEvidenceRequirement,
    ComplianceEvidence,
    ComplianceEvidenceControlMapping,
    ComplianceReport,
    ComplianceTool,
    CompliancePolicy,
    CompliancePolicyFrameworkMapping,
    ComplianceAudit,
    ComplianceAuditFinding,
    ComplianceAuditAuditor,
    ComplianceAuditFrameworkMapping,
    AuditStatusHistory,
)


class ComplianceControlListSerializer(serializers.ModelSerializer):
    """List serializer with frameworks, requirements, risk, owner, health, evidence_pct_complete."""
    frameworks = serializers.SerializerMethodField()
    requirements = serializers.SerializerMethodField()
    risk = serializers.SerializerMethodField()
    owner = serializers.SerializerMethodField()
    health = serializers.SerializerMethodField()
    evidence_pct_complete = serializers.SerializerMethodField()
    evidence_count = serializers.SerializerMethodField()
    control_type = serializers.CharField(read_only=True)
    nature = serializers.CharField(read_only=True)

    class Meta:
        model = ComplianceControl
        fields = [
            "id", "control_id", "name", "status", "severity",
            "frameworks", "requirements", "risk", "owner", "health",
            "evidence_pct_complete", "evidence_count", "control_type", "nature",
            "last_evaluated", "evaluation_method",
        ]

    def get_frameworks(self, obj):
        try:
            mappings = obj.framework_mappings.all()
            return [{"id": str(m.framework_id), "name": m.framework_name} for m in mappings]
        except Exception:
            return []

    def get_requirements(self, obj):
        try:
            mappings = obj.requirement_mappings.all().select_related("requirement")
            return [m.requirement.code for m in mappings if m.requirement_id]
        except Exception:
            return []

    def get_risk(self, obj):
        if obj.risk_score is not None:
            return obj.risk_score
        return obj.severity  # fallback

    def get_owner(self, obj):
        if obj.control_owner_personnel_id:
            return str(obj.control_owner_personnel_id)  # TODO: resolve to name from org.personnel
        return None

    def get_health(self, obj):
        try:
            h = obj.health
            return h.current_status if h else None
        except Exception:
            return None

    def get_evidence_pct_complete(self, obj):
        try:
            required = ControlEvidenceRequirement.objects.filter(control_id=obj.id).count()
            if required == 0:
                return 100
            linked = ComplianceEvidenceControlMapping.objects.filter(control_id=obj.id).count()
            return min(100, round(linked / required * 100))
        except Exception:
            return 0

    def get_evidence_count(self, obj):
        try:
            return ComplianceEvidenceControlMapping.objects.filter(control_id=obj.id).count()
        except Exception:
            return 0


class FrameworkMappingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComplianceControlFrameworkMapping
        fields = ["id", "framework_id", "framework_name", "created_at"]

class EvidenceRequirementSerializer(serializers.ModelSerializer):
    class Meta:
        model = ControlEvidenceRequirement
        fields = ["id", "evidence_type", "source_app", "evidence_category", "collection_method", "freshness_days", "required", "description", "created_at", "updated_at"]

class ComplianceControlSerializer(serializers.ModelSerializer):
    framework_mappings = FrameworkMappingSerializer(many=True, read_only=True)
    evidence_requirements = EvidenceRequirementSerializer(many=True, read_only=True)
    evaluated_by_username = serializers.CharField(source="evaluated_by.username", read_only=True, allow_null=True)
    created_by_username = serializers.CharField(source="created_by.username", read_only=True, allow_null=True)
    frameworks = serializers.SerializerMethodField()
    requirements = serializers.SerializerMethodField()
    health = serializers.SerializerMethodField()
    owner = serializers.SerializerMethodField()
    review_dates = serializers.SerializerMethodField()
    evidence_pct_complete = serializers.SerializerMethodField()
    evidence_count = serializers.SerializerMethodField()

    class Meta:
        model = ComplianceControl
        fields = [
            "id", "control_id", "name", "description", "status", "severity",
            "last_evaluated", "evaluated_by", "evaluated_by_username", "evaluation_method",
            "failure_reason", "failing_assets", "failing_count", "uptime_percentage",
            "time_out_of_compliance", "fix_recommendations", "related_control_ids",
            "category", "control_type", "frequency", "nature", "implementation_status",
            "risk_score", "maturity_level", "organization_id", "created_at", "updated_at",
            "created_by", "created_by_username", "framework_mappings", "evidence_requirements",
            "frameworks", "requirements", "health", "owner", "review_dates", "evidence_pct_complete", "evidence_count",
        ]
        read_only_fields = ["id", "created_at", "updated_at", "framework_mappings", "evidence_requirements"]

    def get_frameworks(self, obj):
        try:
            return [{"id": str(m.framework_id), "name": m.framework_name} for m in obj.framework_mappings.all()]
        except Exception:
            return []

    def get_requirements(self, obj):
        try:
            return [
                {"code": m.requirement.code, "title": m.requirement.title}
                for m in obj.requirement_mappings.all().select_related("requirement")
                if m.requirement_id
            ]
        except Exception:
            return []

    def get_health(self, obj):
        try:
            h = obj.health
            return {"status": h.current_status, "score": float(h.health_score) if h.health_score else None} if h else None
        except Exception:
            return None

    def get_owner(self, obj):
        if obj.control_owner_personnel_id:
            return str(obj.control_owner_personnel_id)  # TODO: resolve from org.personnel
        return None

    def get_review_dates(self, obj):
        try:
            latest = obj.reviews.order_by("-reviewed_at").first()
            if not latest:
                return None
            return {
                "reviewed_at": latest.reviewed_at.isoformat() if latest.reviewed_at else None,
                "next_review_due_at": latest.next_review_due_at.isoformat() if latest.next_review_due_at else None,
            }
        except Exception:
            return None

    def get_evidence_pct_complete(self, obj):
        try:
            required = ControlEvidenceRequirement.objects.filter(control_id=obj.id).count()
            if required == 0:
                return 100
            linked = ComplianceEvidenceControlMapping.objects.filter(control_id=obj.id).count()
            return min(100, round(linked / required * 100))
        except Exception:
            return 0

    def get_evidence_count(self, obj):
        try:
            return ComplianceEvidenceControlMapping.objects.filter(control_id=obj.id).count()
        except Exception:
            return 0


class ComplianceEvidenceListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComplianceEvidence
        fields = ["id", "evidence_id", "name", "source", "source_type", "status", "expires_at", "created_at"]

class ComplianceEvidenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComplianceEvidence
        fields = ["id", "evidence_id", "name", "description", "source", "source_type", "source_name", "status", "validity_period", "expires_at", "file_type", "file_size", "file_url", "preview_url", "content", "tags", "category", "audit_locked", "audit_id", "organization_id", "created_at"]

class ComplianceReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComplianceReport
        fields = ["id", "report_id", "name", "description", "type", "status", "view", "file_format", "file_url", "generated_at", "created_at", "organization_id"]

class ComplianceReportCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComplianceReport
        fields = ["name", "description", "type", "view"]

class ComplianceToolSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComplianceTool
        fields = ["id", "name", "tool_type", "sub_category", "status", "description", "service", "endpoint", "is_active", "organization_id", "created_at", "updated_at"]

class CompliancePolicyListSerializer(serializers.ModelSerializer):
    framework_names = serializers.SerializerMethodField()
    framework_ids = serializers.SerializerMethodField()

    class Meta:
        model = CompliancePolicy
        fields = [
            "id", "policy_id", "name", "description", "type", "status", "approval_status", "version",
            "sync_status", "evidence_ids", "control_ids", "requirement_ids",
            "framework_ids", "framework_names", "owner", "created_at", "updated_at",
        ]

    def get_framework_names(self, obj):
        return [m.framework_name for m in obj.framework_mappings.all()]

    def get_framework_ids(self, obj):
        return [str(m.framework_id) for m in obj.framework_mappings.all()]


class CompliancePolicySerializer(serializers.ModelSerializer):
    framework_ids = serializers.ListField(
        child=serializers.UUIDField(),
        write_only=True,
        required=False,
        allow_empty=True,
    )
    framework_names = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = CompliancePolicy
        fields = [
            "id", "policy_id", "name", "description", "type", "category", "status", "approval_status", "version",
            "sync_status", "evidence_ids", "control_ids", "requirement_ids",
            "framework_ids", "framework_names", "content", "summary", "owner",
            "created_at", "updated_at", "approved_at", "effective_date", "review_date",
        ]
        read_only_fields = ["id", "policy_id", "created_at", "updated_at"]

    def get_framework_names(self, obj):
        return [m.framework_name for m in obj.framework_mappings.all()]

    def create(self, validated_data):
        import uuid
        framework_ids = validated_data.pop("framework_ids", [])
        policy_id = validated_data.get("policy_id") or f"POL-{uuid.uuid4().hex[:8].upper()}"
        validated_data["policy_id"] = policy_id
        validated_data.setdefault("content", "")
        policy = super().create(validated_data)
        self._update_framework_mappings(policy, framework_ids)
        return policy

    def update(self, instance, validated_data):
        framework_ids = validated_data.pop("framework_ids", None)
        policy = super().update(instance, validated_data)
        if framework_ids is not None:
            self._update_framework_mappings(policy, framework_ids)
        return policy

    def _update_framework_mappings(self, policy, framework_ids):
        CompliancePolicyFrameworkMapping.objects.filter(policy=policy).delete()
        for fw_id in framework_ids or []:
            try:
                fw = ComplianceFramework.objects.get(id=fw_id)
                CompliancePolicyFrameworkMapping.objects.create(
                    policy=policy,
                    framework_id=fw.id,
                    framework_name=fw.name,
                )
            except ComplianceFramework.DoesNotExist:
                pass


class AuditStatusHistorySerializer(serializers.ModelSerializer):
    changed_by_name = serializers.SerializerMethodField()

    class Meta:
        model = AuditStatusHistory
        fields = ["id", "from_status", "to_status", "changed_by_name", "notes", "changed_at"]

    def get_changed_by_name(self, obj):
        if obj.changed_by:
            return obj.changed_by.get_full_name() or obj.changed_by.username
        return None


class ComplianceAuditFindingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComplianceAuditFinding
        fields = [
            "id", "finding_id", "title", "description", "severity", "status",
            "control_id", "control_name", "framework_id", "framework_name",
            "requirement_id", "requirement_code", "exception_id",
            "evidence_ids", "remediation_plan", "assigned_to", "due_date", "resolved_at", "created_at",
        ]


class ComplianceAuditAuditorSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComplianceAuditAuditor
        fields = ["id", "name", "email", "role", "organization", "access_granted_at", "last_access_at"]


class ComplianceAuditListSerializer(serializers.ModelSerializer):
    framework_names = serializers.SerializerMethodField()
    lead_auditor = serializers.SerializerMethodField()

    class Meta:
        model = ComplianceAudit
        fields = [
            "id", "audit_id", "name", "description", "type", "status",
            "framework_names", "lead_auditor",
            "start_date", "end_date", "scheduled_start_date", "scheduled_end_date",
            "evidence_locked", "evidence_freeze_date", "evidence_count",
            "total_controls", "controls_passed", "controls_failed", "controls_partial", "controls_not_evaluated",
            "compliance_score", "findings_count", "critical_findings", "high_findings", "medium_findings", "low_findings",
            "created_at", "updated_at", "completed_at",
        ]

    def get_framework_names(self, obj):
        return [m.framework_name for m in obj.framework_mappings.all()]

    def get_lead_auditor(self, obj):
        lead = obj.auditors.filter(role="lead_auditor").first()
        return {"id": str(lead.id), "name": lead.name, "email": lead.email, "role": lead.role} if lead else None


class ComplianceAuditSerializer(serializers.ModelSerializer):
    findings = ComplianceAuditFindingSerializer(many=True, read_only=True)
    auditors = ComplianceAuditAuditorSerializer(many=True, read_only=True)
    status_history = AuditStatusHistorySerializer(many=True, read_only=True)
    framework_ids = serializers.ListField(
        child=serializers.UUIDField(),
        write_only=True,
        required=False,
        allow_empty=True,
    )
    framework_version_ids = serializers.ListField(
        child=serializers.UUIDField(),
        write_only=True,
        required=False,
        allow_empty=True,
    )
    framework_names = serializers.SerializerMethodField(read_only=True)
    framework_versions = serializers.SerializerMethodField(read_only=True)
    lead_auditor = serializers.SerializerMethodField()

    class Meta:
        model = ComplianceAudit
        fields = [
            "id", "audit_id", "name", "description", "type", "status",
            "framework_ids", "framework_version_ids", "framework_names", "framework_versions",
            "lead_auditor", "findings", "auditors", "status_history",
            "start_date", "end_date", "scheduled_start_date", "scheduled_end_date",
            "evidence_locked", "evidence_freeze_date", "evidence_count", "evidence_ids",
            "total_controls", "controls_passed", "controls_failed", "controls_partial", "controls_not_evaluated",
            "compliance_score", "findings_count", "critical_findings", "high_findings", "medium_findings", "low_findings",
            "notes", "summary", "conclusion", "owner", "created_at", "updated_at", "completed_at",
        ]
        read_only_fields = ["id", "audit_id", "created_at", "updated_at"]

    def get_framework_names(self, obj):
        return [m.framework_name for m in obj.framework_mappings.all()]

    def get_framework_versions(self, obj):
        return [
            {
                "framework_id": str(m.framework_id),
                "framework_name": m.framework_name,
                "framework_version_id": str(m.framework_version_id) if m.framework_version_id else None,
                "framework_version_name": m.framework_version_name or "",
            }
            for m in obj.framework_mappings.all()
        ]

    def get_lead_auditor(self, obj):
        lead = obj.auditors.filter(role="lead_auditor").first()
        return {"id": str(lead.id), "name": lead.name, "email": lead.email, "role": lead.role} if lead else None

    def create(self, validated_data):
        import uuid
        from django.utils import timezone
        framework_ids = validated_data.pop("framework_ids", [])
        framework_version_ids = validated_data.pop("framework_version_ids", [])
        audit_id = validated_data.get("audit_id") or f"AUD-{uuid.uuid4().hex[:8].upper()}"
        validated_data["audit_id"] = audit_id
        if not validated_data.get("start_date"):
            validated_data["start_date"] = (
                validated_data.get("scheduled_start_date") or
                validated_data.get("scheduled_end_date") or
                timezone.now()
            )
        audit = super().create(validated_data)
        self._update_framework_mappings(audit, framework_ids, framework_version_ids)
        return audit

    def update(self, instance, validated_data):
        framework_ids = validated_data.pop("framework_ids", None)
        framework_version_ids = validated_data.pop("framework_version_ids", None)
        audit = super().update(instance, validated_data)
        if framework_ids is not None:
            self._update_framework_mappings(audit, framework_ids, framework_version_ids or [])
        return audit

    def _update_framework_mappings(self, audit, framework_ids, framework_version_ids=None):
        from compliance.models.frameworks import FrameworkVersion
        ComplianceAuditFrameworkMapping.objects.filter(audit=audit).delete()
        version_ids = list(framework_version_ids or [])
        for idx, fw_id in enumerate(framework_ids or []):
            try:
                fw = ComplianceFramework.objects.get(id=fw_id)
                ver_id = version_ids[idx] if idx < len(version_ids) else None
                ver_name = ""
                if ver_id:
                    try:
                        ver = FrameworkVersion.objects.get(id=ver_id)
                        ver_name = ver.version_name
                    except FrameworkVersion.DoesNotExist:
                        ver_id = None
                ComplianceAuditFrameworkMapping.objects.create(
                    audit=audit,
                    framework_id=fw.id,
                    framework_name=fw.name,
                    framework_version_id=ver_id or None,
                    framework_version_name=ver_name,
                )
            except ComplianceFramework.DoesNotExist:
                pass


class ComplianceFrameworkSerializer(serializers.ModelSerializer):
    last_evaluated = serializers.DateTimeField(format="%Y-%m-%dT%H:%M:%SZ", required=False, allow_null=True)
    next_audit_date = serializers.DateTimeField(format="%Y-%m-%dT%H:%M:%SZ", required=False, allow_null=True)
    controls = serializers.SerializerMethodField()
    class Meta:
        model = ComplianceFramework
        fields = ["id", "name", "code", "category", "description", "icon", "enabled", "status", "compliance_score", "total_controls", "passing_controls", "failing_controls", "not_evaluated_controls", "last_evaluated", "next_audit_date", "created_at", "updated_at", "controls"]
        read_only_fields = ["id", "created_at", "updated_at", "compliance_score", "total_controls", "passing_controls", "failing_controls", "not_evaluated_controls", "controls"]
    def get_controls(self, obj):
        try:
            mappings = ComplianceControlFrameworkMapping.objects.filter(framework_id=obj.id)
            controls = [m.control for m in mappings]
            return ComplianceControlListSerializer(controls, many=True).data
        except Exception:
            return []
