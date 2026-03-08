"use client";

import { useState, useMemo, useEffect } from "react";
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
import { FileText, Search, Download, RefreshCw, Filter, Table2, Grid3x3, Plus, ChevronRight, ChevronDown, Settings, History, Loader2 } from "lucide-react";
import { Policy, PolicyStatus, PolicyType, SyncStatus } from "@/lib/data/policies";
import { PoliciesTable } from "@/components/compliance/policies-table";
import { PolicyCard } from "@/components/compliance/policy-card";
import { PolicyDetailDrawer } from "@/components/compliance/policy-detail-drawer";
import { PolicyEditDrawer, PolicyFormData } from "@/components/compliance/policy-edit-drawer";
import axios from "axios";
import { toast } from "sonner";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? (typeof window !== "undefined" ? "" : "http://localhost:8000");

function mapApiPolicyToPolicy(p: any): Policy {
  const frameworkNames = Array.isArray(p.framework_names) ? p.framework_names : [];
  const frameworkIds = Array.isArray(p.framework_ids) ? p.framework_ids : [];
  return {
    id: p.id,
    policyId: p.policy_id ?? p.id,
    name: p.name ?? "",
    description: p.description ?? "",
    type: (p.type ?? "security") as PolicyType,
    frameworks: frameworkIds,
    frameworkNames,
    status: (p.status ?? "draft") as PolicyStatus,
    approvalStatus: (p.approval_status ?? "pending") as "approved" | "pending" | "rejected",
    version: p.version ?? "1.0",
    versionHistory: [],
    currentVersionId: "",
    generationMethod: "manual",
    syncStatus: (p.sync_status ?? "unknown") as SyncStatus,
    content: p.content ?? "",
    requirementIds: Array.isArray(p.requirement_ids) ? p.requirement_ids : [],
    requirementCodes: [],
    controlIds: Array.isArray(p.control_ids) ? p.control_ids : [],
    controlNames: [],
    evidenceIds: Array.isArray(p.evidence_ids) ? p.evidence_ids : [],
    ownerDept: p.owner ?? undefined,
    createdAt: p.created_at ?? new Date().toISOString(),
    updatedAt: p.updated_at ?? new Date().toISOString(),
  };
}

export default function CompliancePoliciesPage() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<PolicyStatus | "all">("all");
  const [typeFilter, setTypeFilter] = useState<PolicyType | "all">("all");
  const [syncStatusFilter, setSyncStatusFilter] = useState<SyncStatus | "all">("all");
  const [frameworkFilter, setFrameworkFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"table" | "card">("table");
  const [selectedPolicies, setSelectedPolicies] = useState<string[]>([]);
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);
  const [policyToEdit, setPolicyToEdit] = useState<Policy | null>(null);
  const [templates, setTemplates] = useState<Array<{
    id: string;
    policy_template_code_id: string;
    policy_code: string;
    name: string;
    description: string;
    framework_default: string;
    policy_status_default: string;
    review_frequency: string;
    owner_role_default: string;
    overview_status_default: string;
    config_scope_default: string;
    config_version_default: string;
    history_90d_review_activity_default: string;
    evidence_policy_document_default: string;
    evidence_review_record_default: string;
    mapped_control_codes: string[];
  }>>([]);
  const [expandedTemplateId, setExpandedTemplateId] = useState<string | null>(null);
  const [applyingTemplateId, setApplyingTemplateId] = useState<string | null>(null);

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

  const makeAuthenticatedRequest = async (url: string, method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" = "GET", data?: any) => {
    const token = localStorage.getItem("access_token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    try {
      const config: any = { method, url, headers };
      if (data && method !== "GET") config.data = data;
      return await axios(config);
    } catch (err: any) {
      if (err.response?.status === 401) {
        const newToken = await refreshAccessToken();
        if (newToken) {
          const config: any = { method, url, headers: { Authorization: `Bearer ${newToken}` } };
          if (data && method !== "GET") config.data = data;
          return await axios(config);
        }
      }
      throw err;
    }
  };

  const fetchPolicies = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("access_token");
      if (!token) {
        setLoading(false);
        return;
      }
      const baseUrl = API_BASE?.replace(/\/$/, "") || "";
      const response = await makeAuthenticatedRequest(`${baseUrl}/api/compliance/policies/`);
      const raw = response.data?.results ?? response.data;
      const list = Array.isArray(raw) ? raw : [];
      setPolicies(list.map(mapApiPolicyToPolicy));
    } catch (err: any) {
      console.error("Error fetching policies:", err);
      setError(err.message ?? "Failed to load policies");
      setPolicies([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchTemplates = async () => {
    try {
      const baseUrl = API_BASE?.replace(/\/$/, "") || "";
      const response = await makeAuthenticatedRequest(`${baseUrl}/api/compliance/policy-templates/`);
      setTemplates(Array.isArray(response.data) ? response.data : []);
    } catch {
      setTemplates([]);
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  useEffect(() => {
    fetchTemplates();
  }, []);

  // Get unique frameworks from policies
  const allFrameworks = useMemo(() => {
    const frameworks = new Set<string>();
    policies.forEach((policy) => {
      policy.frameworkNames.forEach((name) => frameworks.add(name));
    });
    return Array.from(frameworks).sort();
  }, []);

  // Filter policies
  const filteredPolicies = useMemo(() => {
    return policies.filter((policy) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          policy.policyId.toLowerCase().includes(query) ||
          policy.name.toLowerCase().includes(query) ||
          (policy.description?.toLowerCase().includes(query) ?? false) ||
          policy.frameworkNames.some((name) => name.toLowerCase().includes(query)) ||
          (policy.ownerName?.toLowerCase().includes(query) ?? false);
        if (!matchesSearch) return false;
      }

      // Status filter
      if (statusFilter !== "all" && policy.status !== statusFilter) {
        return false;
      }

      // Type filter
      if (typeFilter !== "all" && policy.type !== typeFilter) {
        return false;
      }

      // Sync status filter
      if (syncStatusFilter !== "all" && policy.syncStatus !== syncStatusFilter) {
        return false;
      }

      // Framework filter
      if (frameworkFilter !== "all" && !policy.frameworkNames.includes(frameworkFilter)) {
        return false;
      }

      return true;
    });
  }, [searchQuery, statusFilter, typeFilter, syncStatusFilter, frameworkFilter]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = policies.length;
    const active = policies.filter((p) => p.status === "active").length;
    const draft = policies.filter((p) => p.status === "draft").length;
    const needsReview = policies.filter((p) => p.status === "needs_review").length;
    const outOfSync = policies.filter((p) => p.syncStatus === "out_of_sync").length;
    const approved = policies.filter((p) => p.approvalStatus === "approved").length;
    const inSync = policies.filter((p) => p.syncStatus === "in_sync").length;
    const overallCompliance = total > 0 ? Math.round((inSync / total) * 100) : 0;

    return {
      total,
      active,
      draft,
      needsReview,
      outOfSync,
      approved,
      overallCompliance,
    };
  }, [policies]);

  const handleSelect = (id: string) => {
    setSelectedPolicies((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const handleSelectAll = () => {
    if (selectedPolicies.length === filteredPolicies.length) {
      setSelectedPolicies([]);
    } else {
      setSelectedPolicies(filteredPolicies.map((p) => p.id));
    }
  };

  const handleViewDetails = (policy: Policy) => {
    setSelectedPolicy(policy);
    setDrawerOpen(true);
  };

  const handleCreatePolicy = () => {
    setPolicyToEdit(null);
    setEditDrawerOpen(true);
  };

  const handleEditPolicy = (policy: Policy) => {
    setDrawerOpen(false);
    setPolicyToEdit(policy);
    setEditDrawerOpen(true);
  };

  const handleSavePolicy = async (data: PolicyFormData, existingId?: string) => {
    try {
      const baseUrl = API_BASE?.replace(/\/$/, "") || "";
      const payload = {
        name: data.name,
        description: data.description ?? "",
        version: data.version,
        type: data.type,
        status: data.status,
        requirement_ids: data.requirementIds,
        control_ids: data.controlIds,
        evidence_ids: data.evidenceIds,
        framework_ids: data.frameworkIds,
        owner: data.ownerDept ?? "",
      };

      if (existingId) {
        await makeAuthenticatedRequest(`${baseUrl}/api/compliance/policies/${existingId}/`, "PUT", payload);
        toast.success("Policy updated");
      } else {
        await makeAuthenticatedRequest(`${baseUrl}/api/compliance/policies/`, "POST", payload);
        toast.success("Policy created");
      }
      setEditDrawerOpen(false);
      await fetchPolicies();
    } catch (err: any) {
      console.error("Error saving policy:", err);
      const msg = err.response?.data?.detail ?? err.message ?? "Failed to save policy";
      setError(msg);
      toast.error(msg);
    }
  };

  const handleRegenerate = (policyId: string) => {
    // TODO: Connect to backend API
    console.log(`Regenerate policy ${policyId}`);
  };

  const handleApplyTemplate = async (templateId: string) => {
    try {
      setApplyingTemplateId(templateId);
      setError(null);
      const baseUrl = API_BASE?.replace(/\/$/, "") || "";
      const response = await makeAuthenticatedRequest(
        `${baseUrl}/api/compliance/policies/from-template/${templateId}/`,
        "POST"
      );
      const newPolicy = mapApiPolicyToPolicy(response.data);
      await fetchPolicies();
      setEditDrawerOpen(true);
      setPolicyToEdit(newPolicy);
      toast.success("Policy created from template");
    } catch (err: any) {
      const msg = err.response?.data?.error ?? err.message ?? "Failed to create policy from template";
      setError(msg);
      toast.error(msg);
    } finally {
      setApplyingTemplateId(null);
    }
  };

  if (loading && policies.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-slate-500">Loading policies...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 border border-red-200 px-4 py-2 text-sm text-red-700">
          {error}
        </div>
      )}
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="app-page-title flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Compliance Policies
          </h1>
          <p className="text-palette-secondary/80 mt-2 font-medium">
            Policies are the governance layer that drives controls—not just a PDF list. Each policy links to framework requirements, implementing controls, and evidence.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="border-palette-primary text-palette-primary"
            onClick={handleCreatePolicy}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Policy
          </Button>
          <Button
            variant="outline"
            className="border-palette-primary text-palette-primary"
            onClick={() => fetchPolicies()}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button variant="outline" className="border-palette-primary text-palette-primary">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-6 gap-4">
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="text-center">
              <div className="text-xl font-bold text-slate-800">{stats.total}</div>
              <p className="text-xs text-slate-600 mt-1">Total</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="text-center">
              <div className="text-xl font-bold text-green-600">{stats.active}</div>
              <p className="text-xs text-slate-600 mt-1">Active</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="text-center">
              <div className="text-xl font-bold text-gray-600">{stats.draft}</div>
              <p className="text-xs text-slate-600 mt-1">Draft</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="text-center">
              <div className="text-xl font-bold text-yellow-600">{stats.needsReview}</div>
              <p className="text-xs text-slate-600 mt-1">Needs Review</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="text-center">
              <div className="text-xl font-bold text-red-600">{stats.outOfSync}</div>
              <p className="text-xs text-slate-600 mt-1">Out of Sync</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="text-center">
              <div className="text-xl font-bold text-palette-primary">{stats.overallCompliance}%</div>
              <p className="text-xs text-slate-600 mt-1">In Sync</p>
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
                  placeholder="Search by policy ID, name, framework, or owner..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as PolicyStatus | "all")}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="needs_review">Needs Review</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>

            {/* Type Filter */}
            <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v as PolicyType | "all")}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="data_retention">Data Retention</SelectItem>
                <SelectItem value="incident_response">Incident Response</SelectItem>
                <SelectItem value="ai_governance">AI Governance</SelectItem>
                <SelectItem value="vendor_risk">Vendor Risk</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>

            {/* Sync Status Filter */}
            <Select
              value={syncStatusFilter}
              onValueChange={(v) => setSyncStatusFilter(v as SyncStatus | "all")}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Sync Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sync Status</SelectItem>
                <SelectItem value="in_sync">In Sync</SelectItem>
                <SelectItem value="out_of_sync">Out of Sync</SelectItem>
                <SelectItem value="unknown">Unknown</SelectItem>
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
          <PoliciesTable
            policies={filteredPolicies}
            selectedPolicies={selectedPolicies}
            onSelectPolicy={handleSelect}
            onSelectAll={handleSelectAll}
            onViewDetails={handleViewDetails}
            onRegenerate={handleRegenerate}
          />
        ) : filteredPolicies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPolicies.map((policy) => (
              <PolicyCard
                key={policy.id}
                policy={policy}
                onViewDetails={handleViewDetails}
                onRegenerate={handleRegenerate}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="pt-12 pb-12 text-center">
              <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600 font-medium">No policies found</p>
              <p className="text-sm text-slate-500 mt-2">
                Try adjusting your search or filter criteria
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Policy Template Library */}
      {templates.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
              <FileText className="h-4 w-4 text-palette-primary" />
              Policy template library ({templates.length} templates)
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              Pre-built SOC2 policy templates with control mapping. Click a template name to expand. Apply to create a new policy.
            </p>
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-slate-100 text-left text-slate-600">
                    <th className="w-10 pb-2 pt-2 pr-2" />
                    <th className="pb-2 pt-2 pr-4 font-medium">Code</th>
                    <th className="pb-2 pt-2 pr-4 font-medium">Name</th>
                    <th className="pb-2 pt-2 pr-4 font-medium">Framework</th>
                    <th className="pb-2 pt-2 pr-4 font-medium">Review</th>
                    <th className="pb-2 pt-2 pr-4 font-medium">Mapped Controls</th>
                    <th className="pb-2 pt-2 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {templates.map((t) => {
                    const isExpanded = expandedTemplateId === t.id;
                    const toggleExpand = () => setExpandedTemplateId(isExpanded ? null : t.id);
                    const isApplying = applyingTemplateId === t.id;
                    return (
                      <tr key={t.id} className="border-b last:border-0 hover:bg-muted/50">
                        <td
                          className="w-10 py-2 pr-2 cursor-pointer"
                          onClick={toggleExpand}
                        >
                          <ChevronRight
                            className={`h-4 w-4 text-slate-500 transition-transform ${isExpanded ? "rotate-90" : ""}`}
                          />
                        </td>
                        <td className="py-2 pr-4 font-mono text-xs cursor-pointer" onClick={toggleExpand}>{t.policy_code}</td>
                        <td className="py-2 pr-4 font-medium text-palette-primary hover:underline cursor-pointer" onClick={toggleExpand}>{t.name}</td>
                        <td className="py-2 pr-4">{t.framework_default || "—"}</td>
                        <td className="py-2 pr-4">{t.review_frequency || "—"}</td>
                        <td className="py-2 pr-4 font-mono text-xs">{t.mapped_control_codes?.join(", ") || "—"}</td>
                        <td className="py-2">
                          <Button
                            size="sm"
                            onClick={() => handleApplyTemplate(t.id)}
                            disabled={isApplying}
                          >
                            {isApplying ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4 mr-1" />}
                            Apply
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {expandedTemplateId && (() => {
              const t = templates.find((x) => x.id === expandedTemplateId);
              if (!t) return null;
              return (
                <div className="mt-4 p-4 rounded-lg border bg-muted/20 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <section className="rounded-lg border bg-background p-4">
                    <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                      <FileText className="h-4 w-4" />
                      Overview
                    </h4>
                    <table className="w-full text-xs">
                      <tbody>
                        <tr className="border-b"><td className="py-1.5 px-2 font-mono w-40">Name</td><td className="py-1.5 px-2">{t.name}</td></tr>
                        <tr className="border-b"><td className="py-1.5 px-2 font-mono">Description</td><td className="py-1.5 px-2">{t.description || "—"}</td></tr>
                        <tr className="border-b"><td className="py-1.5 px-2 font-mono">Status default</td><td className="py-1.5 px-2">{t.policy_status_default || "—"}</td></tr>
                        <tr className="border-b last:border-0"><td className="py-1.5 px-2 font-mono">Owner role</td><td className="py-1.5 px-2">{t.owner_role_default || "—"}</td></tr>
                      </tbody>
                    </table>
                  </section>
                  <section className="rounded-lg border bg-background p-4">
                    <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                      <Settings className="h-4 w-4" />
                      Config
                    </h4>
                    <table className="w-full text-xs">
                      <tbody>
                        <tr className="border-b"><td className="py-1.5 px-2 font-mono w-40">Scope</td><td className="py-1.5 px-2">{t.config_scope_default || "—"}</td></tr>
                        <tr className="border-b"><td className="py-1.5 px-2 font-mono">Version</td><td className="py-1.5 px-2">{t.config_version_default || "—"}</td></tr>
                        <tr className="border-b last:border-0"><td className="py-1.5 px-2 font-mono">Review frequency</td><td className="py-1.5 px-2">{t.review_frequency || "—"}</td></tr>
                      </tbody>
                    </table>
                  </section>
                  <section className="rounded-lg border bg-background p-4 sm:col-span-2">
                    <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                      <History className="h-4 w-4" />
                      Mapped Controls
                    </h4>
                    <p className="text-sm font-mono">{t.mapped_control_codes?.join(", ") || "—"}</p>
                  </section>
                </div>
              );
            })()}
          </CardContent>
        </Card>
      )}

      {/* Detail Drawer */}
      <PolicyDetailDrawer
        policy={selectedPolicy}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onRegenerate={handleRegenerate}
        onEdit={handleEditPolicy}
      />

      {/* Add/Edit Drawer */}
      <PolicyEditDrawer
        policy={policyToEdit}
        open={editDrawerOpen}
        onClose={() => setEditDrawerOpen(false)}
        onSave={handleSavePolicy}
      />
    </div>
  );
}

