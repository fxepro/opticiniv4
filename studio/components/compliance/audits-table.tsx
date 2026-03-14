"use client";

import React, { useState } from "react";
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
import { Audit } from "@/lib/data/audits";
import { AuditStatusBadge } from "./audit-status-badge";
import { MoreVertical, Eye, Download, Lock, Calendar, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuditsTableProps {
  audits: Audit[];
  selectedAudits: string[];
  onSelectAudit: (id: string) => void;
  onSelectAll: () => void;
  onViewDetails: (audit: Audit) => void;
}

export function AuditsTable({
  audits,
  selectedAudits,
  onSelectAudit,
  onSelectAll,
  onViewDetails,
}: AuditsTableProps) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleDateString();
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      soc2_readiness: "SOC 2 Readiness",
      external_audit: "External Audit",
      internal_audit: "Internal Audit",
      customer_security_review: "Customer Review",
      annual_review: "Annual Review",
    };
    return labels[type] || type;
  };

  const allSelected = audits.length > 0 && selectedAudits.length === audits.length;

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-100 border-b border-slate-200">
            <TableHead className="w-10" aria-label="Expand" />
            <TableHead className="w-12">
              <Checkbox checked={allSelected} onCheckedChange={onSelectAll} />
            </TableHead>
            <TableHead>Audit ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Framework</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Controls</TableHead>
            <TableHead>Compliance</TableHead>
            <TableHead>Findings</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>Lead Auditor</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {audits.length === 0 ? (
            <TableRow>
              <TableCell colSpan={13} className="h-24 text-center text-slate-500">
                No audits found. Add audits or adjust filters.
              </TableCell>
            </TableRow>
          ) : audits.map((audit) => {
            const isExpanded = expandedRows.has(audit.id);
            const isSelected = selectedAudits.includes(audit.id);

            return (
              <React.Fragment key={audit.id}>
                <TableRow
                  className={cn(
                    "bg-white border-b border-slate-100 cursor-pointer hover:bg-slate-50",
                    isSelected && "bg-blue-50"
                  )}
                  onClick={() => toggleRow(audit.id)}
                >
                  <TableCell>
                    <button
                      type="button"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted"
                      onClick={(e) => { e.stopPropagation(); toggleRow(audit.id); }}
                      aria-label={isExpanded ? "Collapse" : "Expand"}
                    >
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => onSelectAudit(audit.id)}
                    />
                  </TableCell>
                  <TableCell className="font-mono text-sm">{audit.auditId}</TableCell>
                  <TableCell className="font-medium">{audit.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {getTypeLabel(audit.type)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {audit.frameworkNames.slice(0, 2).map((name, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {name}
                        </Badge>
                      ))}
                      {audit.frameworkNames.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{audit.frameworkNames.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <AuditStatusBadge status={audit.status} />
                  </TableCell>
                  <TableCell className="text-sm">
                    {audit.controlsPassed + audit.controlsFailed + audit.controlsPartial} / {audit.controlsInScope ?? audit.totalControls}
                    <span className="block text-xs text-slate-500">
                      P:{audit.controlsPassed} F:{audit.controlsFailed} NE:{audit.controlsNotEvaluated}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm font-semibold text-palette-primary">
                    {audit.complianceScore || 0}%
                  </TableCell>
                  <TableCell>
                    {audit.findingsCount > 0 ? (
                      <span className="text-sm font-semibold text-red-600">
                        {audit.findingsCount}
                      </span>
                    ) : (
                      <span className="text-sm text-slate-400">0</span>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-slate-500">
                    {formatDate(audit.startDate)}
                  </TableCell>
                  <TableCell className="text-sm">
                    {audit.leadAuditor?.name || "—"}
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onViewDetails(audit)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
                {isExpanded && (
                  <TableRow className="bg-slate-50">
                    <TableCell colSpan={13} className="p-4">
                      <div className="space-y-4">
                        <div className="rounded-lg border bg-muted/30 p-4">
                          <h4 className="mb-3 text-sm font-semibold text-muted-foreground">Controls breakdown</h4>
                          <table className="w-full text-xs">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left py-1.5 px-2 font-medium text-muted-foreground">In scope</th>
                                <th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Tested</th>
                                <th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Passed</th>
                                <th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Failed</th>
                                <th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Partial</th>
                                <th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Not evaluated</th>
                                <th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Total samples</th>
                                <th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Exceptions</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b">
                                {(() => {
                                  const plans = audit.controlTests ?? [];
                                  const fromPlans = plans.length > 0;
                                  const inScope = fromPlans ? plans.length : (audit.controlsInScope ?? audit.totalControls ?? 0);
                                  const passed = fromPlans ? plans.filter((p) => p.result === "pass").length : (audit.controlsPassed ?? 0);
                                  const failed = fromPlans ? plans.filter((p) => p.result === "fail").length : (audit.controlsFailed ?? 0);
                                  const partial = fromPlans ? plans.filter((p) => p.result === "partial").length : (audit.controlsPartial ?? 0);
                                  const notEval = fromPlans ? plans.filter((p) => !p.result || p.result === "na").length : (audit.controlsNotEvaluated ?? 0);
                                  const tested = passed + failed + partial;
                                  const totalSamples = fromPlans ? plans.reduce((s, p) => s + (p.sampleCount ?? 0), 0) : null;
                                  const totalExceptions = fromPlans ? plans.reduce((s, p) => s + (p.exceptionsCount ?? 0), 0) : null;
                                  return (
                                    <>
                                      <td className="py-1.5 px-2">{inScope}</td>
                                      <td className="py-1.5 px-2">{tested}</td>
                                      <td className="py-1.5 px-2 text-green-600">{passed}</td>
                                      <td className="py-1.5 px-2 text-red-600">{failed}</td>
                                      <td className="py-1.5 px-2 text-amber-600">{partial}</td>
                                      <td className="py-1.5 px-2 text-slate-500">{notEval}</td>
                                      <td className="py-1.5 px-2">{totalSamples != null ? totalSamples : "—"}</td>
                                      <td className="py-1.5 px-2">{totalExceptions != null ? totalExceptions : "—"}</td>
                                    </>
                                  );
                                })()}
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="rounded-lg border bg-muted/30 p-4">
                          <h4 className="mb-3 text-sm font-semibold text-muted-foreground">Control test plans</h4>
                          {(audit.controlTests?.length ?? 0) > 0 ? (
                            <>
                              <table className="w-full text-xs mb-4">
                                <thead>
                                  <tr className="border-b">
                                    <th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Control #</th>
                                    <th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Test plan</th>
                                    <th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Samples</th>
                                    <th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Result</th>
                                    <th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Exceptions</th>
                                    <th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Method</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {audit.controlTests!.map((t, idx) => (
                                    <tr key={t.id ?? t.controlId ?? idx} className="border-b">
                                      <td className="py-1.5 px-2">
                                        <span className="font-mono text-[11px] font-medium">{t.controlCode || t.controlId || "—"}</span>
                                        {t.controlName && <span className="block text-slate-600">{t.controlName}</span>}
                                      </td>
                                      <td className="py-1.5 px-2">{t.testPlanName || "—"}</td>
                                      <td className="py-1.5 px-2">{t.sampleCount ?? 0}</td>
                                      <td className="py-1.5 px-2">
                                        <span className={
                                          t.result === "pass" ? "text-green-600 font-medium" :
                                          t.result === "fail" ? "text-red-600 font-medium" :
                                          t.result === "partial" ? "text-amber-600 font-medium" : "text-slate-500"
                                        }>
                                          {t.result || "—"}
                                        </span>
                                      </td>
                                      <td className="py-1.5 px-2">{t.exceptionsCount ?? 0}</td>
                                      <td className="py-1.5 px-2">{t.samplingMethod || (t.expectedSampleSize != null ? `n=${t.expectedSampleSize}` : "—")}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                              {audit.controlTests!.filter((t) => t.populationDefinition || t.testProcedureSteps).length > 0 && (
                                <div className="space-y-3 pt-2 border-t">
                                  {audit.controlTests!.filter((t) => t.populationDefinition || t.testProcedureSteps).map((t, idx) => (
                                    <div key={t.id ?? `${t.controlId}-${idx}`} className="rounded border bg-white p-2 text-xs">
                                      <span className="font-medium text-muted-foreground">{t.controlName || t.controlId || "Control"}</span>
                                      {t.populationDefinition && (
                                        <div className="mt-1">
                                          <span className="text-muted-foreground">Population: </span>
                                          <span className="text-slate-600">{t.populationDefinition}</span>
                                        </div>
                                      )}
                                      {t.testProcedureSteps && (
                                        <div className="mt-1">
                                          <span className="text-muted-foreground">Procedure: </span>
                                          <span className="text-slate-600 whitespace-pre-wrap">{t.testProcedureSteps}</span>
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </>
                          ) : (
                            <p className="text-xs text-slate-500 py-2">No control test plans yet</p>
                          )}
                        </div>
                        {(audit.requirementsInScope != null || audit.requirementsTested != null) && (
                          <div className="text-sm text-slate-600">
                            Requirements: {audit.requirementsInScope ?? "—"} in scope · {audit.requirementsTested ?? "—"} tested
                            {audit.requirementsFailing != null && ` · ${audit.requirementsFailing} failing`}
                          </div>
                        )}
                        {audit.evidenceCompletenessPct != null && (
                          <div className="text-sm text-slate-600">
                            Evidence completeness: {audit.evidenceCompletenessPct}%
                          </div>
                        )}
                        {audit.description && (
                          <p className="text-sm text-slate-600">{audit.description}</p>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

