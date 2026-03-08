from django.utils import timezone
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from compliance.models import ComplianceTool
from compliance.serializers import ComplianceToolSerializer
from users.permission_views import HasFeaturePermission


class ComplianceToolViewSet(viewsets.ModelViewSet):
    queryset = ComplianceTool.objects.all()
    serializer_class = ComplianceToolSerializer
    permission_classes = [IsAuthenticated, HasFeaturePermission("compliance.tools.view")]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ["tool_type", "sub_category", "status", "is_active", "organization_id"]
    search_fields = ["name", "description", "service"]
    ordering_fields = ["name", "sub_category", "status", "created_at"]
    ordering = ["sub_category", "name"]

    def get_queryset(self):
        qs = super().get_queryset()
        oid = self.request.query_params.get("organization_id")
        if oid:
            qs = qs.filter(organization_id=oid)
        return qs

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    @action(detail=True, methods=["post"], permission_classes=[IsAuthenticated, HasFeaturePermission("compliance.tools.edit")])
    def test(self, request, pk=None):
        tool = self.get_object()
        tool.last_tested = timezone.now()
        tool.test_result = "Test not yet implemented"
        tool.save()
        return Response({"status": "ok", "result": tool.test_result})
