"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Table2, Grid3x3, Plus, Download, RefreshCw, ClipboardList } from "lucide-react";
import { Audit, AuditStatus, AuditType, AuditFinding, AuditAuditor, AuditFrameworkVersion, AuditStatusHistoryEntry } from "@/lib/data/audits";
import { AuditsTable } from "@/components/compliance/audits-table";
import { AuditCard } from "@/components/compliance/audit-card";
import { AuditDetailDrawer } from "@/components/compliance/audit-detail-drawer";
import { AuditCreateDrawer, type AuditFormData } from "@/components/compliance/audit-create-drawer";
import axios from "axios";
import Link from "next/link";
import { toast } from "sonner";

import { getApiBaseUrl } from "@/lib/api-config";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? (typeof window !== "undefined" ? "" : "http://localhost:8000");

function mapApiFindingToFinding(f: any): AuditFinding {
  return {
    id: f.id,
    findingId: f.finding_id ?? f.id,
    title: f.title ?? "",
    description: f.description ?? "",
    severity: (f.severity ?? "medium") as AuditFinding["severity"],
    status: (f.status ?? "open") as AuditFinding["status"],
    controlId: f.control_id,
    controlName: f.control_name,
    requirementId: f.requirement_id,
    requirementCode: f.requirement_code,
    frameworkId: f.framework_id,
    frameworkName: f.framework_name,
    evidenceIds: f.evidence_ids,
    remediationPlan: f.remediation_plan,
    assignedTo: f.assigned_to,
    dueDate: f.due_date,
    resolvedAt: f.resolved_at,
    createdAt: f.created_at ?? new Date().toISOString(),
  };
}

function mapApiAuditorToAuditor(a: any): AuditAuditor {
  return {
    id: a.id,
    name: a.name ?? "",
    email: a.email ?? "",
    role: (a.role ?? "auditor") as AuditAuditor["role"],
    organization: a.organization,
    accessGrantedAt: a.access_granted_at,
    lastAccessAt: a.last_access_at,
  };
}

function mapApiAuditToAudit(a: any): Audit {
  const frameworkNames = Array.isArray(a.framework_names) ? a.framework_names : [];
  const frameworkVersions = Array.isArray(a.framework_versions) ? a.framework_versions : [];
  const leadAuditor = a.lead_auditor ? mapApiAuditorToAuditor(a.lead_auditor) : undefined;
  const findings = Array.isArray(a.findings) ? a.findings.map(mapApiFindingToFinding) : [];
  const auditors = Array.isArray(a.auditors) ? a.auditors.map(mapApiAuditorToAuditor) : [];
  const statusHistory = Array.isArray(a.status_history) ? a.status_history : [];
  const controlTests = Array.isArray(a.control_test_plans)
    ? a.control_test_plans.map((p: any) => ({
        id: p.id,
        controlId: p.control_id ?? p.controlId ?? "",
        controlCode: p.control_code ?? p.controlCode ?? "",
        controlName: p.control_name ?? p.controlName ?? "",
        testPlanName: p.test_name ?? p.testPlanName ?? "",
        sampleCount: p.sample_count ?? p.sampleCount ?? 0,
        result: p.result,
        exceptionsCount: p.exceptions_count ?? p.exceptionsCount ?? 0,
        samplingMethod: p.sampling_method ?? p.samplingMethod ?? "",
        expectedSampleSize: p.expected_sample_size ?? p.expectedSampleSize ?? null,
        populationDefinition: p.population_definition ?? p.populationDefinition ?? "",
        testProcedureSteps: p.test_procedure_steps ?? p.testProcedureSteps ?? "",
      }))
    : [];
  return {
    id: a.id,
    auditId: a.audit_id ?? a.id,
    name: a.name ?? "",
    description: a.description ?? "",
    type: (a.type ?? "internal") as AuditType,
    frameworks: [],
    frameworkNames,
    frameworkVersions,
    status: (a.status ?? "planned") as AuditStatus,
    startDate: a.start_date ?? new Date().toISOString(),
    endDate: a.end_date,
    evidenceFreezeDate: a.evidence_freeze_date,
    scheduledStartDate: a.scheduled_start_date,
    scheduledEndDate: a.scheduled_end_date,
    evidenceLocked: a.evidence_locked ?? false,
    evidenceCount: a.evidence_count,
    evidenceIds: a.evidence_ids,
    totalControls: a.total_controls ?? 0,
    controlsPassed: a.controls_passed ?? 0,
    controlsFailed: a.controls_failed ?? 0,
    controlsPartial: a.controls_partial ?? 0,
    controlsNotEvaluated: a.controls_not_evaluated ?? 0,
    complianceScore: a.compliance_score,
    findings,
    findingsCount: a.findings_count ?? 0,
    criticalFindings: a.critical_findings ?? 0,
    highFindings: a.high_findings ?? 0,
    mediumFindings: a.medium_findings ?? 0,
    lowFindings: a.low_findings ?? 0,
    auditors,
    leadAuditor,
    controlTests,
    ownerName: a.owner,
    notes: a.notes,
    summary: a.summary,
    conclusion: a.conclusion,
    createdAt: a.created_at ?? new Date().toISOString(),
    updatedAt: a.updated_at ?? new Date().toISOString(),
    completedAt: a.completed_at,
    statusHistory,
  };
}

export default function ComplianceAuditsPage() {
  const searchParams = useSearchParams();
  const createdId = searchParams.get("created");

  const [audits, setAudits] = useState<Audit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<AuditStatus | "all">("all");
  const [typeFilter, setTypeFilter] = useState<AuditType | "all">("all");
  const [frameworkFilter, setFrameworkFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"table" | "card">("table");
  const [selectedAudits, setSelectedAudits] = useState<string[]>([]);
  const [selectedAudit, setSelectedAudit] = useState<Audit | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [createDrawerOpen, setCreateDrawerOpen] = useState(false);

  const refreshAccessToken = async (): Promise<string | null> => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) return null;
    try {
      const baseUrl = API_BASE?.replace(/\/$/, "") || "";
      const res = await axios.post(`${baseUrl}/api/token/refresh/`, { refresh: refreshToken });
      const newAccessToken = res.data.access;
      localStorage.setItem("access_token", newAccessToken);
      if (res.data.refresh) localStorage.setItem("refresh_token", res.data.refresh);
      return newAccessToken;
    } catch {
      return null;
    }
  };

  const makeAuthenticatedRequest = async (url: string, method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" = "GET", data?: object) => {
    const token = localStorage.getItem("access_token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const config: any = { method, url, headers };
    if (data && method !== "GET") config.data = data;
    try {
      return await axios(config);
    } catch (err: any) {
      if (err.response?.status === 401) {
        const newToken = await refreshAccessToken();
        if (newToken) {
          config.headers = { Authorization: `Bearer ${newToken}` };
          return await axios(config);
        }
      }
      throw err;
    }
  };

  const fetchAudits = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("access_token");
      if (!token) {
        setError("Please log in to view audits");
        setLoading(false);
        return;
      }
      const baseUrl = (typeof window !== "undefined" ? getApiBaseUrl() : API_BASE)?.replace(/\/$/, "") || "";
      const params = new URLSearchParams();
      if (statusFilter !== "all") params.set("status", statusFilter);
      if (typeFilter !== "all") params.set("type", typeFilter);
      const url = params.toString() ? `${baseUrl}/api/compliance/audits/?${params}` : `${baseUrl}/api/compliance/audits/`;
      const response = await makeAuthenticatedRequest(url);
      const raw = response.data?.results ?? response.data;
      const list = Array.isArray(raw) ? raw : [];
      if (process.env.NODE_ENV === "development" && list.length === 0 && response.data) {
        console.warn("[Audits] API returned non-array or empty:", typeof raw, Object.keys(response.data || {}));
      }
      let auditsToSet = list.map(mapApiAuditToAudit);
      // If redirected with ?created=id and list doesn't include it, fetch and prepend (avoids race with empty list)
      if (createdId && !auditsToSet.some((a) => String(a.id) === String(createdId))) {
        try {
          const detailRes = await makeAuthenticatedRequest(`${baseUrl}/api/compliance/audits/${createdId}/`);
          auditsToSet = [mapApiAuditToAudit(detailRes.data), ...auditsToSet];
        } catch {
          // ignore
        }
      }
      setAudits(auditsToSet);
      if (createdId && typeof window !== "undefined") {
        const found = auditsToSet.find((a) => String(a.id) === String(createdId));
        if (found) {
          setSelectedAudit(found);
          setDrawerOpen(true);
        }
        window.history.replaceState({}, "", "/workspace/compliance/audits");
      }
    } catch (err: any) {
      console.error("Error fetching audits:", err);
      setError(err.message ?? "Failed to load audits");
      setAudits([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAudits();
  }, [statusFilter, typeFilter, createdId]);

  // Get unique frameworks from audits
  const allFrameworks = useMemo(() => {
    const frameworks = new Set<string>();
    audits.forEach((audit) => {
      audit.frameworkNames.forEach((name) => frameworks.add(name));
    });
    return Array.from(frameworks).sort();
  }, []);

  // Filter audits
  const filteredAudits = useMemo(() => {
    return audits.filter((audit) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          audit.auditId.toLowerCase().includes(query) ||
          audit.name.toLowerCase().includes(query) ||
          (audit.description?.toLowerCase().includes(query) ?? false) ||
          audit.frameworkNames.some((name) => name.toLowerCase().includes(query)) ||
          (audit.leadAuditor?.name.toLowerCase().includes(query) ?? false) ||
          (audit.ownerName?.toLowerCase().includes(query) ?? false);
        if (!matchesSearch) return false;
      }

      // Status filter
      if (statusFilter !== "all" && audit.status !== statusFilter) {
        return false;
      }

      // Type filter
      if (typeFilter !== "all" && audit.type !== typeFilter) {
        return false;
      }

      // Framework filter
      if (frameworkFilter !== "all" && !audit.frameworkNames.includes(frameworkFilter)) {
        return false;
      }

      return true;
    });
  }, [audits, searchQuery, statusFilter, typeFilter, frameworkFilter]);

  // Calculate statistics (8 cards: engagements, test plans, instances, samples, exceptions, controls tested, requirements tested, evidence)
  const stats = useMemo(() => {
    const total = audits.length;
    const inProgress = audits.filter((a) => a.status === "in_progress").length;
    const completed = audits.filter((a) => a.status === "completed").length;
    const planned = audits.filter((a) => a.status === "planned").length;
    const underReview = audits.filter((a) => a.status === "under_review").length;

    const activeAudits = audits.filter((a) => a.status !== "planned" && a.status !== "cancelled");
    const totalControlsInScope = activeAudits.reduce((s, a) => s + (a.controlsInScope ?? a.totalControls ?? 0), 0);
    const totalControlsTested = activeAudits.reduce((s, a) => s + (a.controlsTested ?? a.controlsPassed + a.controlsFailed + a.controlsPartial ?? 0), 0);
    const controlsTestedPct = totalControlsInScope > 0 ? Math.round((totalControlsTested / totalControlsInScope) * 100) : 0;

    const totalReqsInScope = activeAudits.reduce((s, a) => s + (a.requirementsInScope ?? 0), 0);
    const totalReqsTested = activeAudits.reduce((s, a) => s + (a.requirementsTested ?? 0), 0);
    const requirementsTestedPct = totalReqsInScope > 0 ? Math.round((totalReqsTested / totalReqsInScope) * 100) : 0;

    const auditsWithEvidence = activeAudits.filter((a) => (a.evidenceCompletenessPct ?? 0) > 0);
    const evidenceCompletenessPct = auditsWithEvidence.length > 0
      ? Math.round(auditsWithEvidence.reduce((s, a) => s + (a.evidenceCompletenessPct ?? 0), 0) / auditsWithEvidence.length)
      : 0;

    return {
      total,
      inProgress,
      completed,
      planned,
      underReview,
      controlsTestedPct,
      requirementsTestedPct,
      evidenceCompletenessPct,
    };
  }, [audits]);

  const handleSelect = (id: string) => {
    setSelectedAudits((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const handleSelectAll = () => {
    if (selectedAudits.length === filteredAudits.length) {
      setSelectedAudits([]);
    } else {
      setSelectedAudits(filteredAudits.map((a) => a.id));
    }
  };

  const handleViewDetails = (audit: Audit) => {
    setSelectedAudit(audit);
    setDrawerOpen(true);
  };

  const handleCreateAudit = () => {
    setCreateDrawerOpen(true);
  };

  const handleSaveAudit = async (data: AuditFormData) => {
    const baseUrl = API_BASE?.replace(/\/$/, "") || "";
    const payload = {
      name: data.name,
      description: data.description ?? "",
      type: data.type,
      start_date: data.startDate,
      end_date: data.endDate || null,
      scheduled_start_date: data.scheduledStartDate || null,
      scheduled_end_date: data.scheduledEndDate || null,
      framework_ids: data.frameworkIds,
      framework_version_ids: data.frameworkVersionIds ?? [],
    };
    try {
      const response = await makeAuthenticatedRequest(`${baseUrl}/api/compliance/audits/`, "POST", payload);
      const newAudit = mapApiAuditToAudit(response.data);
      setAudits((prev) => [newAudit, ...prev]);
      setSelectedAudit(newAudit);
      setDrawerOpen(true);
      toast.success("Audit created successfully");
      await fetchAudits();
    } catch (err: any) {
      const msg = err.response?.data?.detail || err.message || "Failed to create audit";
      toast.error(msg);
      throw err;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="app-page-title flex items-center gap-2">
            <Search className="h-5 w-5" />
            Compliance Audits
          </h1>
          <p className="text-palette-secondary/80 mt-2 font-medium">
            Manage time-bound compliance events and track audit progress
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/workspace/compliance/audit-hub">
            <Button className="bg-palette-primary text-white hover:bg-palette-primary/90">
              <ClipboardList className="h-4 w-4 mr-2" />
              Audit Hub
            </Button>
          </Link>
          <Button
            variant="outline"
            className="border-palette-primary text-palette-primary"
            onClick={handleCreateAudit}
          >
            <Plus className="h-4 w-4 mr-2" />
            Quick Create
          </Button>
          <Button
            variant="outline"
            className="border-palette-primary text-palette-primary"
            onClick={() => fetchAudits()}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button variant="outline" className="border-palette-primary text-palette-primary" disabled title="Export requires backend endpoint">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {error}
          <Button variant="link" size="sm" className="ml-2 h-auto p-0" onClick={() => { setError(null); fetchAudits(); }}>
            Retry
          </Button>
        </div>
      )}

      {/* Summary Statistics — 8 cards: Audit engagements, status, workflow metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="text-center">
              <div className="text-xl font-bold text-slate-800">{stats.total}</div>
              <p className="text-xs text-slate-600 mt-1">Audit Engagements</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="text-center">
              <div className="text-xl font-bold text-blue-600">{stats.planned}</div>
              <p className="text-xs text-slate-600 mt-1">Planned</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="text-center">
              <div className="text-xl font-bold text-yellow-600">{stats.inProgress}</div>
              <p className="text-xs text-slate-600 mt-1">In Progress</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="text-center">
              <div className="text-xl font-bold text-orange-600">{stats.underReview}</div>
              <p className="text-xs text-slate-600 mt-1">Under Review</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="text-center">
              <div className="text-xl font-bold text-green-600">{stats.completed}</div>
              <p className="text-xs text-slate-600 mt-1">Completed</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="text-center">
              <div className="text-xl font-bold text-palette-primary">{stats.controlsTestedPct}%</div>
              <p className="text-xs text-slate-600 mt-1">Controls Tested</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="text-center">
              <div className="text-xl font-bold text-palette-primary">{stats.requirementsTestedPct}%</div>
              <p className="text-xs text-slate-600 mt-1">Requirements Tested</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="text-center">
              <div className="text-xl font-bold text-palette-primary">{stats.evidenceCompletenessPct}%</div>
              <p className="text-xs text-slate-600 mt-1">Evidence Complete</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search by audit ID, name, framework, auditor, or owner..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as AuditStatus | "all")}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="planned">Planned</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="evidence_review">Evidence Review</SelectItem>
                <SelectItem value="findings_review">Findings Review</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            {/* Type Filter */}
            <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v as AuditType | "all")}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="internal">Internal</SelectItem>
                <SelectItem value="external">External</SelectItem>
                <SelectItem value="readiness">Readiness</SelectItem>
                <SelectItem value="surveillance">Surveillance</SelectItem>
              </SelectContent>
            </Select>

            {/* Framework Filter */}
            <Select value={frameworkFilter} onValueChange={setFrameworkFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Framework" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Frameworks</SelectItem>
                {allFrameworks.map((framework) => (
                  <SelectItem key={framework} value={framework}>
                    {framework}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <Button
                variant={viewMode === "table" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("table")}
              >
                <Table2 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "card" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("card")}
              >
                <Grid3x3 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results: table view always shows table (with headers); cards view shows grid or empty state */}
      <div>
        {viewMode === "table" ? (
          <AuditsTable
            audits={filteredAudits}
            selectedAudits={selectedAudits}
            onSelectAudit={handleSelect}
            onSelectAll={handleSelectAll}
            onViewDetails={handleViewDetails}
          />
        ) : filteredAudits.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAudits.map((audit) => (
              <AuditCard key={audit.id} audit={audit} onViewDetails={handleViewDetails} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="pt-12 pb-12 text-center">
              <Search className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600 font-medium">No audits found</p>
              <p className="text-sm text-slate-500 mt-2">
                Try adjusting your search or filter criteria
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Detail Drawer */}
      <AuditDetailDrawer
        audit={selectedAudit}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />

      {/* Create Audit Drawer */}
      <AuditCreateDrawer
        open={createDrawerOpen}
        onClose={() => setCreateDrawerOpen(false)}
        onSave={handleSaveAudit}
      />
    </div>
  );
}

