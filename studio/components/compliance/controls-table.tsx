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
import { Control } from "@/lib/data/controls";
import { ControlStatusBadge } from "./control-status-badge";
import { ControlSeverityBadge } from "./control-severity-badge";
import { MoreVertical, Eye, FileText, RefreshCw, ChevronRight, ChevronDown, Loader2, Shield, Layers, FileCheck, History } from "lucide-react";
import { cn } from "@/lib/utils";

interface ControlsTableProps {
  controls: Control[];
  selectedControls: string[];
  onSelectControl: (id: string) => void;
  onSelectAll: () => void;
  onViewDetails: (control: Control) => void;
  onReEvaluate?: (controlId: string) => void;
  onFetchDetail?: (controlId: string) => Promise<Control>;
}

function HealthBadge({ status }: { status?: string | null }) {
  if (!status) return <span className="text-slate-400 text-sm">—</span>;
  const variant = status === "healthy" ? "default" : status === "warn" ? "secondary" : status === "breach" ? "destructive" : "outline";
  return <Badge variant={variant} className="text-xs capitalize">{status}</Badge>;
}

function formatDate(dateStr?: string) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

export function ControlsTable({
  controls,
  selectedControls,
  onSelectControl,
  onSelectAll,
  onViewDetails,
  onReEvaluate,
  onFetchDetail,
}: ControlsTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [detailState, setDetailState] = useState<Record<string, { loading: boolean; error?: string; data?: Control }>>({});

  const toggleExpand = useCallback(
    async (controlId: string) => {
      if (expandedId === controlId) {
        setExpandedId(null);
        return;
      }
      setExpandedId(controlId);
      onViewDetails?.(controls.find((c) => c.id === controlId)!);
      if (!onFetchDetail) return;
      const existing = detailState[controlId];
      if (existing?.data || existing?.loading) return;
      setDetailState((prev) => ({ ...prev, [controlId]: { loading: true } }));
      try {
        const data = await onFetchDetail(controlId);
        setDetailState((prev) => ({ ...prev, [controlId]: { loading: false, data } }));
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Failed to load control detail";
        setDetailState((prev) => ({ ...prev, [controlId]: { loading: false, error: msg } }));
      }
    },
    [expandedId, onFetchDetail, controls, detailState]
  );

  const allSelected = controls.length > 0 && selectedControls.length === controls.length;

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-100 border-b border-slate-200">
            <TableHead className="w-12">
              <Checkbox checked={allSelected} onCheckedChange={onSelectAll} />
            </TableHead>
            <TableHead className="w-10" />
            <TableHead>Control Code</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Frameworks</TableHead>
            <TableHead>Requirements</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Risk</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Health</TableHead>
            <TableHead>Evidence %</TableHead>
            <TableHead className="w-12" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {controls.length === 0 ? (
            <TableRow>
              <TableCell colSpan={12} className="h-24 text-center text-slate-500">
                No controls found. Add controls or adjust filters.
              </TableCell>
            </TableRow>
          ) : (
            controls.map((control) => {
              const isSelected = selectedControls.includes(control.id);
              const isExpanded = expandedId === control.id;
              const detail = detailState[control.id];

              return (
                <React.Fragment key={control.id}>
                  <TableRow
                    className={cn(
                      "bg-white hover:bg-slate-50 border-b border-slate-100",
                      isSelected && "bg-palette-accent-3/20",
                      control.status === "fail" && "bg-red-50/30",
                      control.status === "partial" && "bg-yellow-50/30",
                    )}
                  >
                    <TableCell onClick={(e) => e.stopPropagation()} className="w-12">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => onSelectControl(control.id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </TableCell>
                    <TableCell className="w-10">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn("h-8 w-8 p-0 shrink-0 transition-transform", isExpanded && "rotate-90")}
                        onClick={() => toggleExpand(control.id)}
                        aria-label={isExpanded ? "Collapse" : "Expand"}
                      >
                        <ChevronRight className="h-4 w-4 text-slate-500" />
                      </Button>
                    </TableCell>
                    <TableCell className="font-mono text-sm font-semibold">
                      {control.controlId}
                    </TableCell>
                    <TableCell>
                      <p className="font-medium text-slate-800 truncate max-w-[200px]">{control.name}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1 max-w-[140px]">
                        {control.frameworkNames.slice(0, 2).map((name, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {name}
                          </Badge>
                        ))}
                        {control.frameworkNames.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{control.frameworkNames.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1 max-w-[120px]">
                        {(control.requirements || []).slice(0, 2).map((code, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs font-mono bg-sky-50 text-sky-700 border-sky-200">
                            {code}
                          </Badge>
                        ))}
                        {(control.requirements?.length || 0) > 2 && (
                          <Badge variant="outline" className="text-xs bg-sky-50 text-sky-700 border-sky-200">
                            +{(control.requirements?.length || 0) - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <ControlStatusBadge status={control.status} />
                    </TableCell>
                    <TableCell>
                      {typeof control.risk === "number" ? (
                        <Badge variant="outline">{control.risk}</Badge>
                      ) : (
                        <ControlSeverityBadge severity={(control.risk as any) || control.severity} />
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-slate-600">
                      {control.owner || "—"}
                    </TableCell>
                    <TableCell>
                      <HealthBadge status={control.health} />
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-medium">
                        {control.evidencePctComplete ?? 0}%
                      </span>
                    </TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => toggleExpand(control.id)}>
                            {isExpanded ? <ChevronDown className="h-4 w-4 mr-2" /> : <ChevronRight className="h-4 w-4 mr-2" />}
                            {isExpanded ? "Collapse" : "View Details"}
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/workspace/compliance/controls/${control.id}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              Open in Page
                            </Link>
                          </DropdownMenuItem>
                          {control.evidenceCount > 0 && (
                            <DropdownMenuItem asChild>
                              <Link href={`/workspace/compliance/evidence?control=${control.id}`}>
                                <FileText className="h-4 w-4 mr-2" />
                                View Evidence ({control.evidenceCount})
                              </Link>
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem asChild>
                            <Link href={`/workspace/compliance/controls/assertions?control_id=${control.id}`}>
                              <Shield className="h-4 w-4 mr-2" />
                              Assertions
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onReEvaluate?.(control.id)}>
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Re-evaluate
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  {isExpanded && (
                    <TableRow className="bg-muted/20 hover:bg-muted/20 border-b last:border-0">
                      <TableCell colSpan={12} className="p-4">
                        {detail?.loading && (
                          <div className="flex items-center justify-center py-12 text-muted-foreground">
                            <Loader2 className="h-6 w-6 animate-spin mr-2" />
                            Loading control detail…
                          </div>
                        )}
                        {detail?.error && (
                          <div className="text-sm text-destructive py-4">{detail.error}</div>
                        )}
                        {detail?.data && !detail.loading && (
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
                                      <tr className="border-b"><td className="py-1.5 px-2 font-mono">Description</td><td className="py-1.5 px-2 line-clamp-3">{detail.data.description || "—"}</td></tr>
                                      <tr className="border-b"><td className="py-1.5 px-2 font-mono">Control type</td><td className="py-1.5 px-2 capitalize">{detail.data.controlType || "—"}</td></tr>
                                      <tr className="border-b"><td className="py-1.5 px-2 font-mono">Nature</td><td className="py-1.5 px-2 capitalize">{detail.data.nature || "—"}</td></tr>
                                      <tr className="border-b"><td className="py-1.5 px-2 font-mono">Automation</td><td className="py-1.5 px-2 capitalize">{detail.data.evaluationMethod || "—"}</td></tr>
                                      <tr className="border-b"><td className="py-1.5 px-2 font-mono">Implementation</td><td className="py-1.5 px-2 capitalize">{detail.data.implementationStatus || "—"}</td></tr>
                                      <tr className="border-b"><td className="py-1.5 px-2 font-mono">Risk</td><td className="py-1.5 px-2">{typeof detail.data.risk === "number" ? <Badge variant="outline">{detail.data.risk}</Badge> : <ControlSeverityBadge severity={(detail.data.risk as any) || detail.data.severity} />}</td></tr>
                                      <tr className="border-b last:border-0"><td className="py-1.5 px-2 font-mono">Owner</td><td className="py-1.5 px-2">{detail.data.owner || "—"}</td></tr>
                                    </tbody>
                                  </table>
                                </div>
                              </section>

                              {/* Frameworks & Requirements */}
                              <section className="rounded-lg border bg-background p-4">
                                <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                                  <Layers className="h-4 w-4" />
                                  Frameworks & Requirements
                                </h4>
                                <div>
                                  <table className="w-full text-xs">
                                    <thead><tr className="border-b"><th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Key</th><th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Value</th></tr></thead>
                                    <tbody>
                                      <tr className="border-b"><td className="py-1.5 px-2 font-mono">Frameworks</td><td className="py-1.5 px-2"><div className="flex flex-wrap gap-1">{(detail.data.frameworkNames || []).map((n, i) => <Badge key={i} variant="outline" className="text-xs">{n}</Badge>)}</div></td></tr>
                                      <tr className="border-b last:border-0"><td className="py-1.5 px-2 font-mono">Requirements</td><td className="py-1.5 px-2"><div className="flex flex-wrap gap-1">{(detail.data.requirements || []).map((r, i) => <Badge key={i} variant="outline" className="text-xs font-mono bg-sky-50 text-sky-700 border-sky-200">{r}</Badge>)}</div></td></tr>
                                    </tbody>
                                  </table>
                                </div>
                              </section>

                              {/* Evidence */}
                              <section className="rounded-lg border bg-background p-4">
                                <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                                  <FileCheck className="h-4 w-4" />
                                  Evidence
                                </h4>
                                <div>
                                  <table className="w-full text-xs">
                                    <thead><tr className="border-b"><th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Key</th><th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Value</th></tr></thead>
                                    <tbody>
                                      <tr className="border-b"><td className="py-1.5 px-2 font-mono">Count</td><td className="py-1.5 px-2">{detail.data.evidenceCount ?? 0}</td></tr>
                                      <tr className="border-b"><td className="py-1.5 px-2 font-mono">Completeness</td><td className="py-1.5 px-2">{detail.data.evidencePctComplete ?? 0}%</td></tr>
                                      <tr className="border-b last:border-0"><td className="py-1.5 px-2 font-mono">Link</td><td className="py-1.5 px-2"><Link href={`/workspace/compliance/evidence?control=${detail.data.id}`} className="text-palette-primary hover:underline">View Evidence</Link></td></tr>
                                    </tbody>
                                  </table>
                                </div>
                              </section>

                              {/* Review & Related */}
                              <section className="rounded-lg border bg-background p-4">
                                <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                                  <History className="h-4 w-4" />
                                  Review & Related
                                </h4>
                                <div>
                                  <table className="w-full text-xs">
                                    <thead><tr className="border-b"><th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Key</th><th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Value</th></tr></thead>
                                    <tbody>
                                      <tr className="border-b"><td className="py-1.5 px-2 font-mono">Last reviewed</td><td className="py-1.5 px-2">{formatDate(detail.data.reviewDates?.reviewed_at)}</td></tr>
                                      <tr className="border-b"><td className="py-1.5 px-2 font-mono">Next review</td><td className="py-1.5 px-2">{formatDate(detail.data.reviewDates?.next_review_due_at)}</td></tr>
                                      <tr className="border-b"><td className="py-1.5 px-2 font-mono">Last evaluated</td><td className="py-1.5 px-2">{formatDate(detail.data.lastEvaluated)}</td></tr>
                                      <tr className="border-b last:border-0"><td className="py-1.5 px-2 font-mono">Related controls</td><td className="py-1.5 px-2">{(detail.data.relatedControls?.length ?? 0)}</td></tr>
                                    </tbody>
                                  </table>
                                </div>
                              </section>

                              {/* Failure & Recommendations - full width */}
                              {(detail.data.failureReason || (detail.data.fixRecommendations?.length ?? 0) > 0) && (
                                <section className="col-span-2 rounded-lg border bg-background p-4">
                                  <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                                    <FileText className="h-4 w-4" />
                                    Failure & Recommendations
                                  </h4>
                                  <div>
                                    <table className="w-full text-xs">
                                      <thead><tr className="border-b"><th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Key</th><th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Value</th></tr></thead>
                                      <tbody>
                                        {detail.data.failureReason && <tr className="border-b"><td className="py-1.5 px-2 font-mono">Failure reason</td><td className="py-1.5 px-2 text-destructive">{detail.data.failureReason}</td></tr>}
                                        {(detail.data.fixRecommendations?.length ?? 0) > 0 && (
                                          <tr className="border-b last:border-0">
                                            <td className="py-1.5 px-2 font-mono align-top">Fix recommendations</td>
                                            <td className="py-1.5 px-2"><ul className="list-disc list-inside space-y-1">{(detail.data.fixRecommendations || []).map((r, i) => <li key={i}>{r}</li>)}</ul></td>
                                          </tr>
                                        )}
                                      </tbody>
                                    </table>
                                  </div>
                                </section>
                              )}
                            </div>
                        )}
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
