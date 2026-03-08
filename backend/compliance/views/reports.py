from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from compliance.models import ComplianceReport
from compliance.serializers import ComplianceReportSerializer, ComplianceReportCreateSerializer
from users.permission_classes import HasFeaturePermission


class ComplianceReportViewSet(viewsets.ModelViewSet):
    queryset = ComplianceReport.objects.all().order_by("-created_at")

    def get_permissions(self):
        if self.action in ["create", "update", "partial_update", "destroy"]:
            return [IsAuthenticated(), HasFeaturePermission("compliance.reports.export")()]
        return [IsAuthenticated(), HasFeaturePermission("compliance.reports.view")()]

    def get_serializer_class(self):
        return ComplianceReportCreateSerializer if self.action == "create" else ComplianceReportSerializer
