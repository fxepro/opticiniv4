"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Shield,
  Plus,
  RefreshCw,
  Loader2,
  Activity,
  Search,
  Filter,
  ChevronRight,
  ChevronDown,
  Settings,
  History,
  FileText,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AssertionsTable, type AssertionRow } from "@/components/compliance/assertions-table";
import { AssertionEditDrawer } from "@/components/compliance/assertion-edit-drawer";
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? (typeof window !== "undefined" ? "" : "http://localhost:8000");

export default function AssertionsPage() {
  const searchParams = useSearchParams();
  const controlIdFromUrl = searchParams.get("control_id");
  const [assertions, setAssertions] = useState<AssertionRow[]>([]);
  const [controls, setControls] = useState<Array<{ id: string; control_id: string; name: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [controlFilter, setControlFilter] = useState<string>(controlIdFromUrl || "all");
  const [controlCodeSearch, setControlCodeSearch] = useState("");
  const [controlCodeDebounced, setControlCodeDebounced] = useState("");
  const [frameworkFilter, setFrameworkFilter] = useState<string>("all");
  const [policyFilter, setPolicyFilter] = useState<string>("all");
  const [connectorFilter, setConnectorFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [enabledFilter, setEnabledFilter] = useState<string>("all");
  const [filterOptions, setFilterOptions] = useState<{
    frameworks: Array<{ id: string; name: string; code: string }>;
    connectors: string[];
    policies: Array<{ id: string; policy_id: string; name: string }>;
  }>({ frameworks: [], connectors: [], policies: [] });
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerAssertion, setDrawerAssertion] = useState<AssertionRow | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [templates, setTemplates] = useState<Array<{
    id: string;
    assertion_template_code_id: string;
    name: string;
    control_code: string | null;
    control_name: string | null;
    assertion_type: string;
    metric_key: string;
    default_threshold_operator: string;
    default_threshold_value: number | null;
    requires_connectors: string[];
    severity_default: string;
    overview_rendered_sentence_example?: string;
    config_scope_display?: string;
    config_threshold_display?: string;
    config_frequency_display?: string;
    config_connector_display?: string;
    history_30d_pass_rate_default?: string;
    history_90d_pass_rate_default?: string;
    evidence_auto_generated_type?: string;
    evidence_auto_generated_status_default?: string;
    evidence_90_day_report_type?: string;
    evidence_90_day_report_status_default?: string;
  }>>([]);
  const [expandedTemplateId, setExpandedTemplateId] = useState<string | null>(null);

  const getToken = () => localStorage.getItem("access_token");
  const refreshToken = async () => {
    const rt = localStorage.getItem("refresh_token");
    if (!rt) return null;
    try {
      const base = API_BASE?.replace(/\/$/, "") || "";
      const res = await axios.post(`${base}/api/token/refresh/`, { refresh: rt });
      localStorage.setItem("access_token", res.data.access);
      if (res.data.refresh) localStorage.setItem("refresh_token", res.data.refresh);
      return res.data.access;
    } catch {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      return null;
    }
  };

  const api = async (method: string, url: string, data?: object) => {
    let token = getToken();
    const base = API_BASE?.replace(/\/$/, "") || "";
    const fullUrl = url.startsWith("http") ? url : `${base}${url}`;
    const opts: any = { method, url: fullUrl, headers: { Authorization: `Bearer ${token}` } };
    if (data) opts.data = data;
    try {
      return await axios(opts);
    } catch (e: any) {
      if (e.response?.status === 401) {
        token = await refreshToken();
        if (token) {
          opts.headers.Authorization = `Bearer ${token}`;
          return await axios(opts);
        }
      }
      throw e;
    }
  };

  const fetchAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (controlFilter && controlFilter !== "all") params.set("control_id", controlFilter);
      if (controlCodeDebounced.trim()) params.set("control_code", controlCodeDebounced.trim());
      if (frameworkFilter && frameworkFilter !== "all") params.set("framework_id", frameworkFilter);
      if (policyFilter && policyFilter !== "all") params.set("policy_id", policyFilter);
      if (connectorFilter && connectorFilter !== "all") params.set("connector", connectorFilter);
      if (statusFilter && statusFilter !== "all") params.set("status", statusFilter);
      if (typeFilter && typeFilter !== "all") params.set("assertion_type", typeFilter);
      if (enabledFilter === "enabled") params.set("enabled", "true");
      if (enabledFilter === "disabled") params.set("enabled", "false");
      const assertRes = await api("GET", `/api/compliance/assertions/?${params.toString()}`);
      setAssertions(Array.isArray(assertRes?.data) ? assertRes.data : []);

      const templatesRes = await api("GET", "/api/compliance/assertion-templates/");
      setTemplates(Array.isArray(templatesRes?.data) ? templatesRes.data : []);

      const controlsRes = await api("GET", "/api/compliance/controls/");
      setControls(
        Array.isArray(controlsRes?.data)
          ? controlsRes.data.map((c: any) => ({ id: c.id, control_id: c.control_id || "", name: c.name || "" }))
          : []
      );

      try {
        const optionsRes = await api("GET", "/api/compliance/assertions/filter-options/");
        if (optionsRes?.data) {
          setFilterOptions({
            frameworks: optionsRes.data.frameworks || [],
            connectors: optionsRes.data.connectors || [],
            policies: optionsRes.data.policies || [],
          });
        }
      } catch {
        // Filter options are optional; assertions and controls are primary
      }
    } catch (e: any) {
      const msg = e.response?.data?.error || e.response?.data?.detail || e.message || "Failed to load assertions.";
      setError(typeof msg === "string" ? msg : JSON.stringify(msg));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (controlIdFromUrl) setControlFilter(controlIdFromUrl);
  }, [controlIdFromUrl]);

  useEffect(() => {
    const t = setTimeout(() => setControlCodeDebounced(controlCodeSearch), 400);
    return () => clearTimeout(t);
  }, [controlCodeSearch]);

  useEffect(() => {
    fetchAll();
  }, [controlFilter, controlCodeDebounced, frameworkFilter, policyFilter, connectorFilter, statusFilter, typeFilter, enabledFilter]);

  const handleToggleEnabled = async (a: AssertionRow) => {
    setTogglingId(a.id);
    try {
      await api("PATCH", `/api/compliance/monitoring/assertions/${a.id}/`, { is_enabled: !a.is_enabled });
      await fetchAll();
    } catch (e: any) {
      setError(e.response?.data?.error || "Failed to update.");
    } finally {
      setTogglingId(null);
    }
  };

  const handleSelect = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };
  const handleSelectAll = () => {
    setSelectedIds(assertions.length > 0 && selectedIds.length === assertions.length ? [] : assertions.map((a) => a.id));
  };

  const fetchAssertionDetail = async (assertionId: string) => {
    const [detailRes, snapRes, breachRes] = await Promise.all([
      api("GET", `/api/compliance/assertions/${assertionId}/`),
      api("GET", `/api/compliance/monitoring/snapshots/?assertion_id=${assertionId}&days=90`),
      api("GET", `/api/compliance/monitoring/breaches/?assertion_id=${assertionId}`),
    ]);
    return {
      detail: detailRes.data,
      snapshots: Array.isArray(snapRes?.data) ? snapRes.data : [],
      breaches: Array.isArray(breachRes?.data) ? breachRes.data : [],
    };
  };

  const stats = {
    total: assertions.length,
    enabled: assertions.filter((a) => a.is_enabled).length,
    passing: assertions.filter((a) => a.last_status === "pass").length,
    failing: assertions.filter((a) => a.last_status === "fail").length,
    noData: assertions.filter((a) => !a.last_status || a.last_status === "na" || a.last_status === "error").length,
  };

  const hasFilters =
    controlCodeSearch ||
    frameworkFilter !== "all" ||
    policyFilter !== "all" ||
    connectorFilter !== "all" ||
    statusFilter !== "all" ||
    typeFilter !== "all" ||
    enabledFilter !== "all";

  if (loading && assertions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-palette-primary mx-auto mb-4" />
          <p className="text-palette-secondary/80 font-medium">Loading assertions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={() => fetchAll()} className="bg-palette-primary hover:bg-palette-primary-hover text-white">
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="app-page-title flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Assertions
          </h1>
          <p className="text-palette-secondary/80 mt-2 font-medium">
            Centralized registry of compliance assertions. Browse, enable, and configure assertions that feed into Monitoring.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-palette-primary text-palette-primary" onClick={fetchAll} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button variant="outline" className="border-palette-primary text-palette-primary" asChild>
            <Link href="/workspace/compliance/monitoring">
              <Activity className="h-4 w-4 mr-2" />
              View Monitoring
            </Link>
          </Button>
          <Button onClick={() => { setDrawerAssertion(null); setDrawerOpen(true); }} className="bg-palette-primary hover:bg-palette-primary-hover text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Assertion
          </Button>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
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
              <div className="text-xl font-bold text-green-600">{stats.enabled}</div>
              <p className="text-xs text-slate-600 mt-1">Enabled</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="text-center">
              <div className="text-xl font-bold text-green-600">{stats.passing}</div>
              <p className="text-xs text-slate-600 mt-1">Passing</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="text-center">
              <div className="text-xl font-bold text-red-600">{stats.failing}</div>
              <p className="text-xs text-slate-600 mt-1">Failing</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="text-center">
              <div className="text-xl font-bold text-gray-600">{stats.noData}</div>
              <p className="text-xs text-slate-600 mt-1">No Data</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="text-center">
              <div className="text-xl font-bold text-palette-primary">
                {stats.total > 0 ? Math.round((stats.passing / stats.total) * 100) : 0}%
              </div>
              <p className="text-xs text-slate-600 mt-1">Pass Rate</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search by control code (e.g. CC6.1, IAM-02)..."
                  value={controlCodeSearch}
                  onChange={(e) => setControlCodeSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={frameworkFilter} onValueChange={setFrameworkFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Framework" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Frameworks</SelectItem>
                {filterOptions.frameworks.map((f) => (
                  <SelectItem key={f.id} value={f.id}>{f.code || f.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={policyFilter} onValueChange={setPolicyFilter}>
              <SelectTrigger className="w-full md:w-[160px]">
                <SelectValue placeholder="Policy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Policies</SelectItem>
                {filterOptions.policies.map((p) => (
                  <SelectItem key={p.id} value={p.id}>{p.policy_id}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={connectorFilter} onValueChange={setConnectorFilter}>
              <SelectTrigger className="w-full md:w-[140px]">
                <SelectValue placeholder="Connector" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {filterOptions.connectors.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pass">Pass</SelectItem>
                <SelectItem value="fail">Fail</SelectItem>
                <SelectItem value="no_data">No Data</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-[140px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="config">Config</SelectItem>
                <SelectItem value="iam">IAM</SelectItem>
                <SelectItem value="vuln">Vuln</SelectItem>
                <SelectItem value="attestation">Attestation</SelectItem>
              </SelectContent>
            </Select>
            <Select value={enabledFilter} onValueChange={setEnabledFilter}>
              <SelectTrigger className="w-full md:w-[120px]">
                <SelectValue placeholder="Enabled" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="enabled">Enabled</SelectItem>
                <SelectItem value="disabled">Disabled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Count & Clear Filters */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-600">
          Showing <span className="font-semibold">{assertions.length}</span> assertions
          {selectedIds.length > 0 && (
            <span className="ml-2 text-palette-primary">• {selectedIds.length} selected</span>
          )}
        </p>
        <div className="flex gap-2">
          {hasFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setControlCodeSearch("");
                setFrameworkFilter("all");
                setPolicyFilter("all");
                setConnectorFilter("all");
                setStatusFilter("all");
                setTypeFilter("all");
                setEnabledFilter("all");
              }}
            >
              Clear Filters
            </Button>
          )}
          {selectedIds.length > 0 && (
            <Button variant="outline" size="sm">
              Bulk Actions ({selectedIds.length})
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <AssertionsTable
        assertions={assertions}
        selectedIds={selectedIds}
        onSelect={handleSelect}
        onSelectAll={handleSelectAll}
        onToggleEnabled={handleToggleEnabled}
        onEdit={(a) => { setDrawerAssertion(a); setDrawerOpen(true); }}
        onFetchDetail={fetchAssertionDetail}
        togglingId={togglingId}
      />

      {/* Assertion template library */}
      {templates.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
              <Shield className="h-4 w-4 text-palette-primary" />
              Assertion template library ({templates.length} templates)
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              Pre-built SOC2 assertion templates. Click a template name to expand and view detail.
            </p>
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-slate-100 text-left text-slate-600">
                    <th className="w-10 pb-2 pt-2 pr-2" />
                    <th className="pb-2 pt-2 pr-4 font-medium">Code</th>
                    <th className="pb-2 pt-2 pr-4 font-medium">Name</th>
                    <th className="pb-2 pt-2 pr-4 font-medium">Control</th>
                    <th className="pb-2 pt-2 pr-4 font-medium">Type</th>
                    <th className="pb-2 pt-2 pr-4 font-medium">Metric</th>
                    <th className="pb-2 pt-2 pr-4 font-medium">Threshold</th>
                    <th className="pb-2 pt-2 font-medium">Connectors</th>
                  </tr>
                </thead>
                <tbody>
                  {templates.map((t) => {
                    const isExpanded = expandedTemplateId === t.id;
                    const toggleExpand = () => setExpandedTemplateId(isExpanded ? null : t.id);
                    return (
                      <React.Fragment key={t.id}>
                        <tr
                          className="border-b last:border-0 hover:bg-muted/50 cursor-pointer"
                          onClick={toggleExpand}
                        >
                          <td className="w-10 py-2 pr-2">
                            <ChevronRight
                              className={`h-4 w-4 text-slate-500 transition-transform ${isExpanded ? "rotate-90" : ""}`}
                            />
                          </td>
                          <td className="py-2 pr-4 font-mono text-xs">{t.assertion_template_code_id}</td>
                          <td className="py-2 pr-4 font-medium text-palette-primary hover:underline">{t.name}</td>
                          <td className="py-2 pr-4 text-slate-600">{t.control_code || "—"}</td>
                          <td className="py-2 pr-4">{t.assertion_type}</td>
                          <td className="py-2 pr-4 font-mono text-xs">{t.metric_key}</td>
                          <td className="py-2 pr-4">
                            {t.default_threshold_operator} {t.default_threshold_value ?? "—"}
                          </td>
                          <td className="py-2">{t.requires_connectors?.join(", ") || "—"}</td>
                        </tr>
                        {isExpanded && (
                          <tr className="bg-muted/20 border-b last:border-0">
                            <td colSpan={8} className="p-4">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <section className="rounded-lg border bg-background p-4">
                                  <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                                    <Shield className="h-4 w-4" />
                                    Overview
                                  </h4>
                                  <table className="w-full text-xs">
                                    <thead><tr className="border-b"><th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Key</th><th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Value</th></tr></thead>
                                    <tbody>
                                      <tr className="border-b"><td className="py-1.5 px-2 font-mono">Rendered sentence</td><td className="py-1.5 px-2">{t.overview_rendered_sentence_example || t.name}</td></tr>
                                      <tr className="border-b"><td className="py-1.5 px-2 font-mono">Control</td><td className="py-1.5 px-2">{t.control_code ? `${t.control_code} — ${t.control_name || ""}` : "—"}</td></tr>
                                      <tr className="border-b last:border-0"><td className="py-1.5 px-2 font-mono">Status</td><td className="py-1.5 px-2 text-muted-foreground">N/A (template)</td></tr>
                                    </tbody>
                                  </table>
                                </section>
                                <section className="rounded-lg border bg-background p-4">
                                  <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                                    <Settings className="h-4 w-4" />
                                    Config
                                  </h4>
                                  <table className="w-full text-xs">
                                    <thead><tr className="border-b"><th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Key</th><th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Value</th></tr></thead>
                                    <tbody>
                                      <tr className="border-b"><td className="py-1.5 px-2 font-mono">Scope</td><td className="py-1.5 px-2">{t.config_scope_display || "—"}</td></tr>
                                      <tr className="border-b"><td className="py-1.5 px-2 font-mono">Threshold</td><td className="py-1.5 px-2 font-mono">{t.config_threshold_display || `${t.default_threshold_operator} ${t.default_threshold_value ?? "—"}`}</td></tr>
                                      <tr className="border-b"><td className="py-1.5 px-2 font-mono">Frequency</td><td className="py-1.5 px-2">{t.config_frequency_display || "—"}</td></tr>
                                      <tr className="border-b last:border-0"><td className="py-1.5 px-2 font-mono">Connector</td><td className="py-1.5 px-2">{t.config_connector_display || t.requires_connectors?.join(", ") || "—"}</td></tr>
                                    </tbody>
                                  </table>
                                </section>
                                <section className="rounded-lg border bg-background p-4">
                                  <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                                    <History className="h-4 w-4" />
                                    History
                                  </h4>
                                  <table className="w-full text-xs">
                                    <thead><tr className="border-b"><th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Period</th><th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Pass rate</th></tr></thead>
                                    <tbody>
                                      <tr className="border-b"><td className="py-1.5 px-2 font-mono">30 days</td><td className="py-1.5 px-2">{t.history_30d_pass_rate_default || "—"}</td></tr>
                                      <tr className="border-b last:border-0"><td className="py-1.5 px-2 font-mono">90 days</td><td className="py-1.5 px-2">{t.history_90d_pass_rate_default || "—"}</td></tr>
                                    </tbody>
                                  </table>
                                </section>
                                <section className="rounded-lg border bg-background p-4">
                                  <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                                    <FileText className="h-4 w-4" />
                                    Evidence
                                  </h4>
                                  <table className="w-full text-xs">
                                    <thead><tr className="border-b"><th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Type</th><th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Status</th></tr></thead>
                                    <tbody>
                                      <tr className="border-b"><td className="py-1.5 px-2 font-mono">{t.evidence_auto_generated_type || "Auto-generated"}</td><td className="py-1.5 px-2 text-muted-foreground">{t.evidence_auto_generated_status_default || "Coming soon"}</td></tr>
                                      <tr className="border-b last:border-0"><td className="py-1.5 px-2 font-mono">{t.evidence_90_day_report_type || "90-day report"}</td><td className="py-1.5 px-2 text-muted-foreground">{t.evidence_90_day_report_status_default || "Coming soon"}</td></tr>
                                    </tbody>
                                  </table>
                                </section>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      <AssertionEditDrawer
        assertion={drawerAssertion ? {
          id: drawerAssertion.id,
          assertion_name: drawerAssertion.assertion_name,
          metric_key: drawerAssertion.metric_key,
          operator: drawerAssertion.operator,
          threshold_value: drawerAssertion.threshold_value,
          evaluation_frequency: drawerAssertion.evaluation_frequency,
          severity: drawerAssertion.severity,
          control_id: drawerAssertion.control_id,
          control_name: drawerAssertion.control_name,
          control_code: drawerAssertion.control_code,
        } : null}
        controls={controls}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSave={fetchAll}
      />
    </div>
  );
}
