import json
from pathlib import Path
from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from django.conf import settings
from compliance.models import (
    ComplianceControl,
    ComplianceControlFrameworkMapping,
    ComplianceEvidence,
    ComplianceEvidenceControlMapping,
)
from compliance.serializers import ComplianceControlSerializer, ComplianceControlListSerializer, ComplianceEvidenceListSerializer
from users.permission_classes import HasFeaturePermission


def _tokenize_question(question: str):
    return [x for x in [("".join(c for c in w.lower() if c.isalnum())) for w in question.split()] if len(x) >= 3]


def _score_text(text, tokens):
    if not text or not tokens:
        return 0
    lowered = text.lower()
    return sum(1 for t in tokens if t in lowered)


def _load_index_records(org_id):
    index_path = Path(settings.BASE_DIR) / "exports" / "compliance_index.jsonl"
    if not index_path.exists():
        return []
    records = []
    with index_path.open("r", encoding="utf-8") as fh:
        for line in fh:
            try:
                record = json.loads(line)
            except json.JSONDecodeError:
                continue
            metadata = record.get("metadata") or {}
            if org_id and metadata.get("organization_id") and metadata.get("organization_id") != org_id:
                continue
            records.append(record)
    return records


@api_view(["POST"])
@permission_classes([IsAuthenticated, HasFeaturePermission("compliance.chat.view")])
def compliance_chat(request):
    question = (request.data.get("question") or "").strip()
    if not question:
        return Response({"error": "Question is required."}, status=status.HTTP_400_BAD_REQUEST)
    org_id = request.data.get("organization_id")
    tokens = _tokenize_question(question)
    records = _load_index_records(org_id)
    if not records:
        return Response({"answer": "Compliance index is empty. Run export_compliance_index to generate it.", "detailed_answer": "", "matches": []})
    scored = [(_score_text(f"{r.get('title','')}\n{r.get('text','')}", tokens), r) for r in records if _score_text(f"{r.get('title','')}\n{r.get('text','')}", tokens) > 0]
    scored.sort(key=lambda x: x[0], reverse=True)
    top = scored[:8]
    matches = [{"type": r.get("type"), "title": r.get("title"), "score": s, "snippet": (r.get("text", "")[:240] + ("…" if len(r.get("text", "")) > 240 else "")), "detail": r.get("text", ""), "metadata": r.get("metadata", {})} for s, r in top]
    answer = "Select a result to view details." if top else "No relevant records found for that question."
    return Response({"answer": answer, "detailed_answer": "", "matches": matches})


class ComplianceControlViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, HasFeaturePermission("compliance.controls.view")]

    def get_serializer_class(self):
        return ComplianceControlListSerializer if self.action == "list" else ComplianceControlSerializer

    def get_queryset(self):
        qs = (
            ComplianceControl.objects.using("compliance")
            .select_related("health")
            .prefetch_related(
                "framework_mappings",
                "requirement_mappings__requirement",
                "reviews",
                "evidence_requirements",
            )
            .order_by("control_id")
        )
        fid = self.request.query_params.get("framework_id")
        if fid:
            ids = ComplianceControlFrameworkMapping.objects.using("compliance").filter(framework_id=fid).values_list("control_id", flat=True)
            qs = qs.filter(id__in=ids)
        if self.request.query_params.get("status"):
            qs = qs.filter(status=self.request.query_params.get("status"))
        if self.request.query_params.get("severity"):
            qs = qs.filter(severity=self.request.query_params.get("severity"))
        search = self.request.query_params.get("search")
        if search:
            qs = qs.filter(Q(control_id__icontains=search) | Q(name__icontains=search) | Q(description__icontains=search))
        return qs

    @action(detail=True, methods=["get"])
    def evidence(self, request, pk=None):
        control = self.get_object()
        mappings = ComplianceEvidenceControlMapping.objects.using("compliance").filter(control_id=control.id)
        evidence_ids = [m.evidence_id for m in mappings]
        evidence = ComplianceEvidence.objects.using("compliance").filter(id__in=evidence_ids)
        return Response(ComplianceEvidenceListSerializer(evidence, many=True).data)

    @action(detail=False, methods=["get"])
    def by_framework(self, request):
        framework_id = request.query_params.get("framework_id")
        if not framework_id:
            return Response({"error": "framework_id parameter is required"}, status=status.HTTP_400_BAD_REQUEST)
        mappings = ComplianceControlFrameworkMapping.objects.using("compliance").filter(framework_id=framework_id)
        controls = [m.control for m in mappings]
        return Response(ComplianceControlListSerializer(controls, many=True).data)
