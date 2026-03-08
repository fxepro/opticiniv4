"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Pencil, Play, History, CheckCircle2, MinusCircle, Loader2, ChevronRight, ChevronDown, Shield, Settings, FileText, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AssertionRow {
  id: string;
  assertion_name: string;
  metric_key: string;
  operator: string;
  threshold_value: number | null;
  evaluation_frequency: string;
  severity: string;
  is_enabled: boolean;
  control_id: string;
  control_name: string;
  control_code: string;
  policy?: string | null;
  connector?: string | null;
  last_value?: number | null;
  last_status?: string | null;
  last_measured_at?: string | null;
}

/** Template UI defaults for accordion (from AssertionTemplate v2) */
export interface TemplateUiDefaults {
  overview_rendered_sentence_example: string;
  overview_policy_code: string;
  overview_status_default: string;
  overview_last_run_default: string;
  overview_last_value_default: string;
  config_scope_display: string;
  config_threshold_display: string;
  config_frequency_display: string;
  config_connector_display: string;
  history_30d_pass_rate_default: string;
  history_90d_pass_rate_default: string;
  evidence_auto_generated_type: string;
  evidence_auto_generated_status_default: string;
  evidence_90_day_report_type: string;
  evidence_90_day_report_status_default: string;
}

/** API response for GET /api/compliance/assertions/<id>/ */
export interface AssertionDetailResponse {
  id: string;
  assertion_name: string;
  metric_key: string;
  operator: string;
  threshold_value: number | null;
  evaluation_frequency: string;
  severity: string;
  assertion_type: string;
  is_enabled: boolean;
  control_id: string;
  control_name: string | null;
  control_code: string | null;
  policy: string | null;
  policy_name?: string | null;
  last_value: number | null;
  last_status: string | null;
  last_measured_at: string | null;
  connector: string | null;
  pass_rate_30: number | null;
  pass_rate_90: number | null;
  total_snapshots_30: number;
  total_snapshots_90: number;
  template_ui_defaults?: TemplateUiDefaults | null;
}

interface SnapshotRow {
  id: string;
  measured_value: number | null;
  status: string;
  measured_at: string;
  source_system?: string;
}

interface BreachRow {
  id: string;
  measured_value: number | null;
  measured_at: string;
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; className: string }> = {
    pass: { label: "Pass", className: "bg-green-100 text-green-800 border-green-200" },
    fail: { label: "Fail", className: "bg-red-100 text-red-800 border-red-200" },
    na: { label: "N/A", className: "bg-slate-100 text-slate-700 border-slate-200" },
    error: { label: "Error", className: "bg-amber-100 text-amber-800 border-amber-200" },
  };
  const c = config[status] ?? { label: status || "—", className: "bg-slate-100 text-slate-600" };
  return <Badge variant="outline" className={cn("text-xs", c.className)}>{c.label}</Badge>;
}

function formatDate(iso: string) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString(undefined, { dateStyle: "short", timeStyle: "short" });
}

function renderSentence(a: AssertionDetailResponse) {
  const metric = a.metric_key?.replace(/_/g, " ").toLowerCase() || "metric";
  const op = a.operator === ">=" ? "must be at least" : a.operator === "<=" ? "must be at most" : a.operator === ">" ? "must exceed" : a.operator === "<" ? "must be below" : "compared to";
  const val = a.threshold_value != null ? `${a.threshold_value}%` : "threshold";
  return `${metric} ${op} ${val}`;
}

interface AssertionsTableProps {
  assertions: AssertionRow[];
  selectedIds: string[];
  onSelect: (id: string) => void;
  onSelectAll: () => void;
  onToggleEnabled: (a: AssertionRow) => void;
  onEdit: (a: AssertionRow) => void;
  onFetchDetail?: (assertionId: string) => Promise<{
    detail: AssertionDetailResponse;
    snapshots: SnapshotRow[];
    breaches: BreachRow[];
  }>;
  togglingId: string | null;
}

export function AssertionsTable({
  assertions,
  selectedIds,
  onSelect,
  onSelectAll,
  onToggleEnabled,
  onEdit,
  onFetchDetail,
  togglingId,
}: AssertionsTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [detailState, setDetailState] = useState<Record<string, {
    loading: boolean;
    error?: string;
    detail?: AssertionDetailResponse;
    snapshots?: SnapshotRow[];
    breaches?: BreachRow[];
  }>>({});

  const toggleExpand = useCallback(
    async (assertionId: string) => {
      if (expandedId === assertionId) {
        setExpandedId(null);
        return;
      }
      setExpandedId(assertionId);
      if (!onFetchDetail) return;
      const existing = detailState[assertionId];
      if (existing?.detail || existing?.loading) return;
      setDetailState((prev) => ({ ...prev, [assertionId]: { loading: true } }));
      try {
        const { detail, snapshots, breaches } = await onFetchDetail(assertionId);
        setDetailState((prev) => ({
          ...prev,
          [assertionId]: { loading: false, detail, snapshots: snapshots || [], breaches: breaches || [] },
        }));
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Failed to load assertion detail";
        setDetailState((prev) => ({ ...prev, [assertionId]: { loading: false, error: msg } }));
      }
    },
    [expandedId, onFetchDetail, detailState]
  );

  const allSelected = assertions.length > 0 && selectedIds.length === assertions.length;

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-100 border-b border-slate-200">
            <TableHead className="w-12">
              <Checkbox checked={allSelected} onCheckedChange={onSelectAll} />
            </TableHead>
            <TableHead className="w-10" />
            <TableHead>Assertion</TableHead>
            <TableHead>Control</TableHead>
            <TableHead>Policy</TableHead>
            <TableHead>Connector</TableHead>
            <TableHead className="w-24">Frequency</TableHead>
            <TableHead className="w-24">Threshold</TableHead>
            <TableHead>Last Value + Last Run</TableHead>
            <TableHead className="w-24">Status</TableHead>
            <TableHead className="w-12" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {assertions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={11} className="h-24 text-center text-slate-500">
                No assertions found. Add assertions or adjust filters.
              </TableCell>
            </TableRow>
          ) : (
            assertions.map((a) => {
              const isSelected = selectedIds.includes(a.id);
              const isExpanded = expandedId === a.id;
              const detail = detailState[a.id];

              return (
                <React.Fragment key={a.id}>
                  <TableRow
                    className={cn(
                      "bg-white hover:bg-slate-50 border-b border-slate-100",
                      isSelected && "bg-palette-accent-3/20",
                      a.last_status === "fail" && "bg-red-50/30",
                    )}
                  >
                    <TableCell onClick={(e) => e.stopPropagation()} className="w-12">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => onSelect(a.id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </TableCell>
                    <TableCell className="w-10">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn("h-8 w-8 p-0 shrink-0 transition-transform", isExpanded && "rotate-90")}
                        onClick={() => toggleExpand(a.id)}
                        aria-label={isExpanded ? "Collapse" : "Expand"}
                      >
                        <ChevronRight className="h-4 w-4 text-slate-500" />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium text-slate-800 truncate max-w-[200px]">{a.assertion_name}</p>
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/workspace/compliance/controls/${a.control_id}`}
                        className="text-palette-primary hover:underline font-mono text-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {a.control_code} — {a.control_name}
                      </Link>
                    </TableCell>
                    <TableCell className="text-sm text-slate-600">{a.policy || "—"}</TableCell>
                    <TableCell className="text-sm text-slate-600">{a.connector || "—"}</TableCell>
                    <TableCell className="text-sm">{a.evaluation_frequency}</TableCell>
                    <TableCell className="text-sm">{a.operator} {a.threshold_value != null ? `${a.threshold_value}%` : "—"}</TableCell>
                    <TableCell>
                      <span className="text-sm">{a.last_value != null ? `${a.last_value}%` : "—"}</span>
                      {a.last_measured_at && (
                        <span className="text-slate-500 text-xs block">{formatDate(a.last_measured_at)}</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {a.last_status ? <StatusBadge status={a.last_status} /> : <span className="text-slate-400 text-sm">—</span>}
                    </TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => toggleExpand(a.id)}>
                            {isExpanded ? <ChevronDown className="h-4 w-4 mr-2" /> : <ChevronRight className="h-4 w-4 mr-2" />}
                            {isExpanded ? "Collapse" : "View Details"}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onToggleEnabled(a)} disabled={togglingId === a.id}>
                            {togglingId === a.id ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : a.is_enabled ? <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" /> : <MinusCircle className="h-4 w-4 mr-2 text-slate-400" />}
                            {a.is_enabled ? "Disable" : "Enable"}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onEdit(a)}>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem disabled>
                            <Play className="h-4 w-4 mr-2" />
                            Run Now
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/workspace/compliance/monitoring?assertion_id=${a.id}`}>
                              <History className="h-4 w-4 mr-2" />
                              View History
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  {isExpanded && (
                    <TableRow className="bg-muted/20 hover:bg-muted/20 border-b last:border-0">
                      <TableCell colSpan={11} className="p-4">
                        {detail?.loading && (
                          <div className="flex items-center justify-center py-12 text-muted-foreground">
                            <Loader2 className="h-6 w-6 animate-spin mr-2" />
                            Loading assertion detail…
                          </div>
                        )}
                        {detail?.error && (
                          <div className="text-sm text-destructive py-4">{detail.error}</div>
                        )}
                        {detail?.detail && !detail.loading && (() => {
                          const d = detail.detail;
                          const tpl = d.template_ui_defaults;
                          const overviewSentence = tpl?.overview_rendered_sentence_example || renderSentence(d);
                          const overviewStatus = d.last_status || tpl?.overview_status_default || "na";
                          const overviewLastRun = d.last_measured_at ? formatDate(d.last_measured_at) : (tpl?.overview_last_run_default || "—");
                          const overviewLastValue = d.last_value != null ? `${d.last_value}%` : (tpl?.overview_last_value_default || "—");
                          const configScope = tpl?.config_scope_display || "—";
                          const configThreshold = tpl?.config_threshold_display || `${d.operator} ${d.threshold_value != null ? `${d.threshold_value}%` : "—"}`;
                          const configFrequency = tpl?.config_frequency_display || d.evaluation_frequency;
                          const configConnector = tpl?.config_connector_display || d.connector || "—";
                          const history30 = d.total_snapshots_30 > 0 && d.pass_rate_30 != null
                            ? `${d.pass_rate_30}% (${d.total_snapshots_30})`
                            : (tpl?.history_30d_pass_rate_default || "—");
                          const history90 = d.total_snapshots_90 > 0 && d.pass_rate_90 != null
                            ? `${d.pass_rate_90}% (${d.total_snapshots_90})`
                            : (tpl?.history_90d_pass_rate_default || "—");
                          const evidenceAutoType = tpl?.evidence_auto_generated_type || "Auto-generated";
                          const evidenceAutoStatus = tpl?.evidence_auto_generated_status_default || "Coming soon";
                          const evidence90Type = tpl?.evidence_90_day_report_type || "90-day report";
                          const evidence90Status = tpl?.evidence_90_day_report_status_default || "Coming soon";
                          return (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {/* Overview */}
                              <section className="rounded-lg border bg-background p-4">
                                <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                                  <Shield className="h-4 w-4" />
                                  Overview
                                </h4>
                                <div>
                                  <table className="w-full text-xs">
                                    <thead><tr className="border-b"><th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Key</th><th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Value</th></tr></thead>
                                    <tbody>
                                      <tr className="border-b"><td className="py-1.5 px-2 font-mono">Rendered sentence</td><td className="py-1.5 px-2">{overviewSentence}</td></tr>
                                      <tr className="border-b"><td className="py-1.5 px-2 font-mono">Control</td><td className="py-1.5 px-2"><Link href={`/workspace/compliance/controls/${d.control_id}`} className="text-palette-primary hover:underline">{d.control_code} — {d.control_name}</Link></td></tr>
                                      <tr className="border-b"><td className="py-1.5 px-2 font-mono">Policy</td><td className="py-1.5 px-2">{d.policy_name || d.policy || "—"}</td></tr>
                                      <tr className="border-b"><td className="py-1.5 px-2 font-mono">Status</td><td className="py-1.5 px-2"><StatusBadge status={overviewStatus} /></td></tr>
                                      <tr className="border-b"><td className="py-1.5 px-2 font-mono">Last run</td><td className="py-1.5 px-2">{overviewLastRun}</td></tr>
                                      <tr className="border-b last:border-0"><td className="py-1.5 px-2 font-mono">Last value</td><td className="py-1.5 px-2 font-mono">{overviewLastValue}</td></tr>
                                    </tbody>
                                  </table>
                                </div>
                              </section>

                              {/* Config */}
                              <section className="rounded-lg border bg-background p-4">
                                <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                                  <Settings className="h-4 w-4" />
                                  Config
                                </h4>
                                <div>
                                  <table className="w-full text-xs">
                                    <thead><tr className="border-b"><th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Key</th><th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Value</th></tr></thead>
                                    <tbody>
                                      <tr className="border-b"><td className="py-1.5 px-2 font-mono">Scope</td><td className="py-1.5 px-2">{configScope}</td></tr>
                                      <tr className="border-b"><td className="py-1.5 px-2 font-mono">Threshold</td><td className="py-1.5 px-2 font-mono">{configThreshold}</td></tr>
                                      <tr className="border-b"><td className="py-1.5 px-2 font-mono">Frequency</td><td className="py-1.5 px-2">{configFrequency}</td></tr>
                                      <tr className="border-b last:border-0"><td className="py-1.5 px-2 font-mono">Connector</td><td className="py-1.5 px-2">{configConnector}</td></tr>
                                    </tbody>
                                  </table>
                                </div>
                              </section>

                              {/* History */}
                              <section className="rounded-lg border bg-background p-4">
                                <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                                  <History className="h-4 w-4" />
                                  History
                                </h4>
                                <div>
                                  <table className="w-full text-xs">
                                    <thead><tr className="border-b"><th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Period</th><th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Pass rate</th></tr></thead>
                                    <tbody>
                                      <tr className="border-b"><td className="py-1.5 px-2 font-mono">30 days</td><td className="py-1.5 px-2">{history30}</td></tr>
                                      <tr className="border-b"><td className="py-1.5 px-2 font-mono">90 days</td><td className="py-1.5 px-2">{history90}</td></tr>
                                    </tbody>
                                  </table>
                                  {(detail.breaches?.length ?? 0) > 0 && (
                                    <>
                                      <p className="text-xs font-medium text-muted-foreground mt-2 mb-1">Recent breaches</p>
                                      <table className="w-full text-xs">
                                        <thead><tr className="border-b"><th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Measured at</th><th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Value</th></tr></thead>
                                        <tbody>
                                          {(detail.breaches ?? []).slice(0, 5).map((b) => (
                                            <tr key={b.id} className="border-b last:border-0"><td className="py-1.5 px-2">{formatDate(b.measured_at)}</td><td className="py-1.5 px-2 font-mono text-destructive">{b.measured_value != null ? `${b.measured_value}%` : "—"}</td></tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </>
                                  )}
                                </div>
                              </section>

                              {/* Evidence */}
                              <section className="rounded-lg border bg-background p-4">
                                <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                                  <FileText className="h-4 w-4" />
                                  Evidence
                                </h4>
                                <div>
                                  <table className="w-full text-xs">
                                    <thead><tr className="border-b"><th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Type</th><th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Status</th></tr></thead>
                                    <tbody>
                                      <tr className="border-b"><td className="py-1.5 px-2 font-mono">{evidenceAutoType}</td><td className="py-1.5 px-2 text-muted-foreground">{evidenceAutoStatus}</td></tr>
                                      <tr className="border-b last:border-0"><td className="py-1.5 px-2 font-mono">{evidence90Type}</td><td className="py-1.5 px-2 text-muted-foreground">{evidence90Status}</td></tr>
                                    </tbody>
                                  </table>
                                </div>
                              </section>

                              {/* Snapshots table - full width */}
                              {(detail.snapshots?.length ?? 0) > 0 && (
                                <section className="col-span-2 rounded-lg border bg-background p-4">
                                  <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                                    <AlertTriangle className="h-4 w-4" />
                                    Metric snapshots
                                  </h4>
                                <div>
                                  <table className="w-full text-xs">
                                    <thead><tr className="border-b"><th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Measured at</th><th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Value</th><th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Status</th><th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Source</th></tr></thead>
                                      <tbody>
                                        {(detail.snapshots ?? []).slice(0, 15).map((s) => (
                                          <tr key={s.id} className="border-b last:border-0"><td className="py-1.5 px-2">{formatDate(s.measured_at)}</td><td className="py-1.5 px-2 font-mono">{s.measured_value != null ? `${s.measured_value}%` : "—"}</td><td className="py-1.5 px-2"><StatusBadge status={s.status} /></td><td className="py-1.5 px-2 text-muted-foreground">{s.source_system || "—"}</td></tr>
                                        ))}
                                      </tbody>
                                    </table>
                                    {(detail.snapshots?.length ?? 0) > 15 && <p className="text-xs text-muted-foreground mt-1">Showing latest 15 of {detail.snapshots?.length}</p>}
                                  </div>
                                </section>
                              )}
                            </div>
                          );
                        })()}
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
