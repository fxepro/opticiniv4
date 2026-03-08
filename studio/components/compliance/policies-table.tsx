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
import { Policy } from "@/lib/data/policies";
import { PolicyStatusBadge } from "./policy-status-badge";
import { PolicySyncStatus } from "./policy-sync-status";
import {
  MoreVertical,
  Eye,
  Download,
  RefreshCw,
  ChevronDown,
  ChevronRight,
  ListChecks,
  Shield,
  FileCheck,
  Fingerprint,
  Layers,
  History,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PoliciesTableProps {
  policies: Policy[];
  selectedPolicies: string[];
  onSelectPolicy: (id: string) => void;
  onSelectAll: () => void;
  onViewDetails: (policy: Policy) => void;
  onRegenerate?: (policyId: string) => void;
}

export function PoliciesTable({
  policies,
  selectedPolicies,
  onSelectPolicy,
  onSelectAll,
  onViewDetails,
  onRegenerate,
}: PoliciesTableProps) {
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
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getTypeLabel = (type: string, category?: string) => {
    const labels: Record<string, string> = {
      security: "Security",
      data_retention: "Data Retention",
      incident_response: "Incident Response",
      ai_governance: "AI Governance",
      vendor_risk: "Vendor Risk",
      custom: category || "Custom",
    };
    return labels[type] || type;
  };

  const allSelected = policies.length > 0 && selectedPolicies.length === policies.length;

  const getControlCount = (p: Policy) => p.controlIds?.length ?? p.controlNames?.length ?? 0;
  const getRequirementCount = (p: Policy) => p.requirementIds?.length ?? p.requirementCodes?.length ?? 0;
  const getEvidenceDisplay = (p: Policy) => {
    const have = p.evidenceIds?.length ?? 0;
    const required = p.evidenceRequired ?? have;
    if (required <= 0) return have > 0 ? `${have}` : "—";
    return `${have}/${required}`;
  };

  return (
    <div className="rounded-lg border overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-muted/50 border-b">
          <tr>
            <th className="w-10 p-3" aria-label="Expand" />
            <th className="w-10 p-3">
              <Checkbox checked={allSelected} onCheckedChange={onSelectAll} />
            </th>
            <th className="text-left p-3 font-medium">Policy ID</th>
            <th className="text-left p-3 font-medium">Name</th>
            <th className="text-left p-3 font-medium">Type</th>
            <th className="text-left p-3 font-medium">Mapped Controls</th>
            <th className="text-left p-3 font-medium">Mapped Requirements</th>
            <th className="text-left p-3 font-medium">Evidence</th>
            <th className="text-left p-3 font-medium">Last Approved / Next Review</th>
            <th className="text-left p-3 font-medium">Owner Dept</th>
            <th className="text-left p-3 font-medium">Status</th>
            <th className="text-left p-3 font-medium">Sync</th>
            <th className="text-left p-3 font-medium">Version</th>
            <th className="w-12 p-3" aria-label="Actions" />
          </tr>
        </thead>
        <tbody>
          {policies.length === 0 ? (
            <tr>
              <td colSpan={14} className="h-24 text-center text-muted-foreground p-4">
                No policies found. Add policies or adjust filters.
              </td>
            </tr>
          ) : (
            policies.map((policy) => {
              const isExpanded = expandedRows.has(policy.id);
              const isSelected = selectedPolicies.includes(policy.id);
              const controlCount = getControlCount(policy);
              const requirementCount = getRequirementCount(policy);
              const controlNames = policy.controlNames?.length
                ? policy.controlNames
                : (policy.controlIds ?? []).map((id) => String(id));
              const requirementCodes = policy.requirementCodes?.length
                ? policy.requirementCodes
                : (policy.requirementIds ?? []).map((id) => String(id));

              return (
                <React.Fragment key={policy.id}>
                  <tr
                    className={cn(
                      "border-b last:border-0 hover:bg-muted/30 transition-colors",
                      isSelected && "bg-primary/5"
                    )}
                  >
                    <td className="p-3">
                      <button
                        type="button"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted"
                        onClick={() => toggleRow(policy.id)}
                        aria-label={isExpanded ? "Collapse" : "Expand"}
                      >
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        )}
                      </button>
                    </td>
                    <td className="p-3" onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => onSelectPolicy(policy.id)}
                      />
                    </td>
                    <td className="p-3 font-mono text-xs">{policy.policyId}</td>
                    <td className="p-3 font-medium">{policy.name}</td>
                    <td className="p-3">
                      <Badge variant="outline" className="text-xs">
                        {getTypeLabel(policy.type, policy.category)}
                      </Badge>
                    </td>
                    <td className="p-3">
                      {controlCount > 0 ? (
                        <button
                          type="button"
                          className="text-primary hover:underline font-medium"
                          onClick={() => toggleRow(policy.id)}
                        >
                          {controlCount}
                        </button>
                      ) : (
                        <span className="text-muted-foreground">0</span>
                      )}
                    </td>
                    <td className="p-3">
                      {requirementCount > 0 ? (
                        <button
                          type="button"
                          className="text-primary hover:underline font-medium"
                          onClick={() => toggleRow(policy.id)}
                        >
                          {requirementCount}
                        </button>
                      ) : (
                        <span className="text-muted-foreground">0</span>
                      )}
                    </td>
                    <td className="p-3">
                      <span className="font-mono text-xs">{getEvidenceDisplay(policy)}</span>
                    </td>
                    <td className="p-3 text-muted-foreground text-xs">
                      <div>{formatDate(policy.approvedAt)}</div>
                      <div>{formatDate(policy.reviewDate)}</div>
                    </td>
                    <td className="p-3 text-muted-foreground text-xs">
                      {policy.ownerDept || policy.ownerName || "—"}
                    </td>
                    <td className="p-3">
                      <PolicyStatusBadge status={policy.status} />
                    </td>
                    <td className="p-3">
                      <PolicySyncStatus
                        syncStatus={policy.syncStatus}
                        syncIssues={policy.syncIssues}
                      />
                    </td>
                    <td className="p-3 text-muted-foreground">v{policy.version}</td>
                    <td className="p-3" onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onViewDetails(policy)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Export
                          </DropdownMenuItem>
                          {policy.generationMethod === "auto_generated" && (
                            <DropdownMenuItem onClick={() => onRegenerate?.(policy.id)}>
                              <RefreshCw className="h-4 w-4 mr-2" />
                              Regenerate
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr className="border-b last:border-0 bg-muted/20">
                      <td colSpan={14} className="p-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {/* Policy details */}
                          <section className="rounded-lg border bg-muted/30 p-4">
                            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                              <Fingerprint className="h-4 w-4" />
                              Policy details
                            </h4>
                            <div className="overflow-x-auto">
                              <table className="w-full text-xs">
                                <thead>
                                  <tr className="border-b">
                                    <th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Key</th>
                                    <th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Value</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="border-b">
                                    <td className="py-1.5 px-2 font-mono">Policy ID</td>
                                    <td className="py-1.5 px-2 font-mono">{policy.policyId}</td>
                                  </tr>
                                  <tr className="border-b">
                                    <td className="py-1.5 px-2 font-mono">Name</td>
                                    <td className="py-1.5 px-2">{policy.name}</td>
                                  </tr>
                                  <tr className="border-b">
                                    <td className="py-1.5 px-2 font-mono">Type</td>
                                    <td className="py-1.5 px-2">{getTypeLabel(policy.type, policy.category)}</td>
                                  </tr>
                                  <tr className="border-b">
                                    <td className="py-1.5 px-2 font-mono">Version</td>
                                    <td className="py-1.5 px-2">v{policy.version}</td>
                                  </tr>
                                  <tr className="border-b">
                                    <td className="py-1.5 px-2 font-mono">Owner</td>
                                    <td className="py-1.5 px-2">{policy.ownerName || "—"}</td>
                                  </tr>
                                  <tr className="border-b last:border-0">
                                    <td className="py-1.5 px-2 font-mono">Owner dept</td>
                                    <td className="py-1.5 px-2">{policy.ownerDept || "—"}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            {policy.description && (
                              <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{policy.description}</p>
                            )}
                          </section>

                          {/* Mapped controls */}
                          <section className="rounded-lg border bg-muted/30 p-4">
                            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                              <ListChecks className="h-4 w-4" />
                              Mapped controls
                            </h4>
                            <div className="overflow-x-auto">
                              <table className="w-full text-xs">
                                <thead>
                                  <tr className="border-b">
                                    <th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Key</th>
                                    <th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Value</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="border-b">
                                    <td className="py-1.5 px-2 font-mono">Count</td>
                                    <td className="py-1.5 px-2">{controlCount}</td>
                                  </tr>
                                  {controlNames.length > 0 && (
                                    <tr className="border-b last:border-0">
                                      <td className="py-1.5 px-2 font-mono">Controls</td>
                                      <td className="py-1.5 px-2">
                                        <span className="flex flex-wrap gap-1">
                                          {controlNames.map((c, i) => (
                                            <Badge key={i} variant="secondary" className="text-xs font-mono">
                                              {typeof c === "string" ? c : policy.controlIds?.[i] ?? c}
                                            </Badge>
                                          ))}
                                        </span>
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </section>

                          {/* Mapped requirements */}
                          <section className="rounded-lg border bg-muted/30 p-4">
                            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                              <Shield className="h-4 w-4" />
                              Mapped requirements
                            </h4>
                            <div className="overflow-x-auto">
                              <table className="w-full text-xs">
                                <thead>
                                  <tr className="border-b">
                                    <th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Key</th>
                                    <th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Value</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="border-b">
                                    <td className="py-1.5 px-2 font-mono">Count</td>
                                    <td className="py-1.5 px-2">{requirementCount}</td>
                                  </tr>
                                  {requirementCodes.length > 0 && (
                                    <tr className="border-b last:border-0">
                                      <td className="py-1.5 px-2 font-mono">Requirements</td>
                                      <td className="py-1.5 px-2">
                                        <span className="flex flex-wrap gap-1">
                                          {requirementCodes.map((r, i) => (
                                            <Badge key={i} variant="secondary" className="text-xs font-mono">
                                              {typeof r === "string" ? r : policy.requirementIds?.[i] ?? r}
                                            </Badge>
                                          ))}
                                        </span>
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </section>

                          {/* Evidence */}
                          <section className="rounded-lg border bg-muted/30 p-4">
                            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                              <FileCheck className="h-4 w-4" />
                              Evidence
                            </h4>
                            <div className="overflow-x-auto">
                              <table className="w-full text-xs">
                                <thead>
                                  <tr className="border-b">
                                    <th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Key</th>
                                    <th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Value</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="border-b">
                                    <td className="py-1.5 px-2 font-mono">Status</td>
                                    <td className="py-1.5 px-2">{getEvidenceDisplay(policy)}</td>
                                  </tr>
                                  <tr className="border-b">
                                    <td className="py-1.5 px-2 font-mono">Linked</td>
                                    <td className="py-1.5 px-2">{policy.evidenceIds?.length ?? 0} items</td>
                                  </tr>
                                  {policy.evidenceRequired != null && (
                                    <tr className="border-b last:border-0">
                                      <td className="py-1.5 px-2 font-mono">Required</td>
                                      <td className="py-1.5 px-2">{policy.evidenceRequired}</td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </section>

                          {/* Frameworks */}
                          <section className="rounded-lg border bg-muted/30 p-4">
                            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                              <Layers className="h-4 w-4" />
                              Frameworks
                            </h4>
                            <div className="overflow-x-auto">
                              <table className="w-full text-xs">
                                <thead>
                                  <tr className="border-b">
                                    <th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Key</th>
                                    <th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Value</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="border-b last:border-0">
                                    <td className="py-1.5 px-2 font-mono">Frameworks</td>
                                    <td className="py-1.5 px-2">
                                      <span className="flex flex-wrap gap-1">
                                        {policy.frameworkNames.map((name, idx) => (
                                          <Badge key={idx} variant="outline" className="text-xs">
                                            {name}
                                          </Badge>
                                        ))}
                                      </span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </section>

                          {/* Approval & review */}
                          <section className="rounded-lg border bg-muted/30 p-4">
                            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                              <History className="h-4 w-4" />
                              Approval & review
                            </h4>
                            <div className="overflow-x-auto">
                              <table className="w-full text-xs">
                                <thead>
                                  <tr className="border-b">
                                    <th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Key</th>
                                    <th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Value</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="border-b">
                                    <td className="py-1.5 px-2 font-mono">Last approved</td>
                                    <td className="py-1.5 px-2">{formatDate(policy.approvedAt)}</td>
                                  </tr>
                                  <tr className="border-b">
                                    <td className="py-1.5 px-2 font-mono">Approved by</td>
                                    <td className="py-1.5 px-2">{policy.approvedBy || "—"}</td>
                                  </tr>
                                  <tr className="border-b">
                                    <td className="py-1.5 px-2 font-mono">Next review</td>
                                    <td className="py-1.5 px-2">{formatDate(policy.reviewDate)}</td>
                                  </tr>
                                  <tr className="border-b last:border-0">
                                    <td className="py-1.5 px-2 font-mono">Approval status</td>
                                    <td className="py-1.5 px-2">{policy.approvalStatus}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </section>

                          {/* Sync issues */}
                          {policy.syncStatus === "out_of_sync" && policy.syncIssues && policy.syncIssues.length > 0 && (
                            <section className="rounded-lg border bg-destructive/10 border-destructive/30 p-4 sm:col-span-2 lg:col-span-3">
                              <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-destructive">
                                Sync issues
                              </h4>
                              <ul className="text-xs text-destructive list-disc list-inside space-y-1">
                                {policy.syncIssues.map((issue, idx) => (
                                  <li key={idx}>{issue}</li>
                                ))}
                              </ul>
                            </section>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
