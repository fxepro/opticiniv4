"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Audit, AuditFinding, AuditRequirementRollup, AuditEvidenceItem, AuditStatusHistoryEntry } from "@/lib/data/audits";
import { AuditStatusBadge } from "./audit-status-badge";
import {
  Search,
  Clock,
  User,
  Download,
  Lock,
  Calendar,
  CheckCircle2,
  Shield,
  ListChecks,
  FileCheck,
  AlertTriangle,
  History,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AuditDetailDrawerProps {
  audit: Audit | null;
  open: boolean;
  onClose: () => void;
}

export function AuditDetailDrawer({ audit, open, onClose }: AuditDetailDrawerProps) {
  if (!audit) return null;

  const formatDate = (dateString?: string) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleString();
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      soc2_readiness: "SOC 2 Readiness",
      external_audit: "External Audit",
      internal_audit: "Internal Audit",
      customer_security_review: "Customer Security Review",
      annual_review: "Annual Review",
    };
    return labels[type] || type;
  };

  const getSeverityColor = (severity: string) => {
    const colors: Record<string, string> = {
      critical: "bg-red-100 text-red-800 border-red-200",
      high: "bg-orange-100 text-orange-800 border-orange-200",
      medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
      low: "bg-blue-100 text-blue-800 border-blue-200",
      informational: "bg-gray-100 text-gray-800 border-gray-200",
    };
    return colors[severity] || "bg-gray-100 text-gray-800";
  };

  const getFindingStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      open: "bg-red-100 text-red-800",
      in_remediation: "bg-yellow-100 text-yellow-800",
      resolved: "bg-green-100 text-green-800",
      accepted: "bg-gray-100 text-gray-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getTestStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      not_started: "Not started",
      in_progress: "In progress",
      completed: "Completed",
    };
    return labels[status] || status;
  };

  const getResultColor = (result?: string) => {
    const colors: Record<string, string> = {
      pass: "text-green-600",
      fail: "text-red-600",
      partial: "text-yellow-600",
      na: "text-slate-500",
    };
    return colors[result || ""] || "text-slate-600";
  };

  const rollups = audit.requirementRollups ?? [];
  const evidenceItems = audit.evidenceItems ?? [];
  const controlsInScope = audit.controlsInScope ?? audit.totalControls ?? 0;
  const controlsTested = audit.controlsTested ?? audit.controlsPassed + audit.controlsFailed + audit.controlsPartial;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-3xl overflow-y-auto">
        <SheetHeader>
          <div className="flex items-center gap-3">
            <Search className="h-6 w-6 text-palette-primary" />
            <div className="flex-1">
              <SheetTitle className="text-2xl">{audit.auditId}</SheetTitle>
              <SheetDescription className="text-base mt-1">
                {audit.frameworkVersionDisplay || audit.name}
              </SheetDescription>
            </div>
            <div className="flex gap-2">
              <AuditStatusBadge status={audit.status} />
            </div>
          </div>
        </SheetHeader>

        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="requirements">Requirements</TabsTrigger>
            <TabsTrigger value="controls">Controls</TabsTrigger>
            <TabsTrigger value="evidence">Evidence</TabsTrigger>
            <TabsTrigger value="findings">Findings</TabsTrigger>
            <TabsTrigger value="lifecycle">Lifecycle</TabsTrigger>
          </TabsList>

          {/* Tab 1: Overview */}
          <TabsContent value="overview" className="space-y-4 mt-4">
            {audit.description && (
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">Description</h3>
                <p className="text-sm text-slate-600">{audit.description}</p>
              </div>
            )}

            <div>
              <h3 className="font-semibold text-slate-800 mb-2">Framework & scope</h3>
              {audit.frameworkVersions && audit.frameworkVersions.length > 0 ? (
                <div className="space-y-1.5 mb-2">
                  {audit.frameworkVersions.map((fv, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <Badge variant="outline">{fv.framework_name}</Badge>
                      {fv.framework_version_name && (
                        <span className="text-xs text-muted-foreground">{fv.framework_version_name}</span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2 mb-2">
                  {audit.frameworkNames.map((name, idx) => (
                    <Badge key={idx} variant="outline">{name}</Badge>
                  ))}
                </div>
              )}
              {(audit.requirementsInScope != null || audit.requirementsTested != null) && (
                <p className="text-sm text-slate-600">
                  Requirements in scope: {audit.requirementsInScope ?? "—"} · Tested: {audit.requirementsTested ?? "—"}
                  {audit.requirementsFailing != null && ` · Failing: ${audit.requirementsFailing}`}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">Type</h3>
                <p className="text-sm text-slate-600">{getTypeLabel(audit.type)}</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">Status</h3>
                <AuditStatusBadge status={audit.status} />
              </div>
            </div>

            {/* Controls breakdown */}
            <div className="rounded-lg border bg-muted/30 p-4">
              <h3 className="font-semibold text-slate-800 mb-3">Controls</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-1.5 px-2 font-medium text-muted-foreground">In scope</th>
                      <th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Tested</th>
                      <th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Passed</th>
                      <th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Failed</th>
                      <th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Not evaluated</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-1.5 px-2">{controlsInScope}</td>
                      <td className="py-1.5 px-2">{controlsTested}</td>
                      <td className="py-1.5 px-2 text-green-600">{audit.controlsPassed}</td>
                      <td className="py-1.5 px-2 text-red-600">{audit.controlsFailed}</td>
                      <td className="py-1.5 px-2 text-slate-500">{audit.controlsNotEvaluated}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-slate-500 mt-2">Compliance: {audit.complianceScore ?? 0}%</p>
            </div>

            {audit.evidenceLocked && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="h-4 w-4 text-blue-600" />
                  <h3 className="font-semibold text-blue-800">Evidence locked</h3>
                </div>
                <p className="text-sm text-blue-700">
                  Evidence was frozen on {formatDate(audit.evidenceFreezeDate)}
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-50 rounded-lg">
                <h3 className="font-semibold text-slate-800 mb-2">Evidence</h3>
                <p className="text-2xl font-bold text-slate-800">{audit.evidenceCount ?? 0}</p>
                <p className="text-xs text-slate-500 mt-1">
                  {audit.evidenceCompletenessPct != null ? `${audit.evidenceCompletenessPct}% complete` : "items"}
                </p>
              </div>
              {audit.findingsCount > 0 && (
                <div className="p-3 bg-red-50 rounded-lg">
                  <h3 className="font-semibold text-red-800 mb-2">Findings</h3>
                  <p className="text-2xl font-bold text-red-600">{audit.findingsCount}</p>
                  <p className="text-xs text-red-500 mt-1">
                    {audit.criticalFindings} critical, {audit.highFindings} high · {audit.openHighFindings ?? 0} open high
                  </p>
                </div>
              )}
            </div>

            <div>
              <h3 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Timeline
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Start:</span>
                  <span className="font-medium">{formatDate(audit.startDate)}</span>
                </div>
                {audit.endDate && (
                  <div className="flex justify-between">
                    <span className="text-slate-600">End:</span>
                    <span className="font-medium">{formatDate(audit.endDate)}</span>
                  </div>
                )}
                {audit.scheduledEndDate && !audit.endDate && (
                  <div className="flex justify-between">
                    <span className="text-slate-600">Scheduled end:</span>
                    <span className="font-medium">{formatDate(audit.scheduledEndDate)}</span>
                  </div>
                )}
              </div>
            </div>

            {audit.leadAuditor && (
              <div>
                <h3 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Lead auditor
                </h3>
                <p className="text-sm text-slate-600">{audit.leadAuditor.name}</p>
                <p className="text-xs text-slate-500">{audit.leadAuditor.email}</p>
                {audit.leadAuditor.organization && (
                  <p className="text-xs text-slate-500">{audit.leadAuditor.organization}</p>
                )}
              </div>
            )}

            {audit.ownerName && (
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">Owner</h3>
                <p className="text-sm text-slate-600">{audit.ownerName}</p>
                {audit.ownerEmail && <p className="text-xs text-slate-500">{audit.ownerEmail}</p>}
              </div>
            )}

            {audit.summary && (
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">Summary</h3>
                <p className="text-sm text-slate-600">{audit.summary}</p>
              </div>
            )}

            {audit.conclusion && (
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">Conclusion</h3>
                <p className="text-sm text-slate-600">{audit.conclusion}</p>
              </div>
            )}

            <div className="flex gap-2 pt-4">
              <Button variant="outline" className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </TabsContent>

          {/* Tab 2: Requirements */}
          <TabsContent value="requirements" className="space-y-4 mt-4">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Requirement roll-up
            </h3>
            <p className="text-sm text-muted-foreground">
              Requirement | Primary control | Test status | Result | Findings
            </p>
            {rollups.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-sm text-slate-600">No requirement roll-up data</p>
                <p className="text-xs text-slate-500 mt-1">
                  {audit.requirementsInScope != null && `Requirements in scope: ${audit.requirementsInScope}`}
                </p>
              </div>
            ) : (
              <div className="rounded-lg border overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 border-b">
                    <tr>
                      <th className="text-left p-3 font-medium">Requirement</th>
                      <th className="text-left p-3 font-medium">Primary control</th>
                      <th className="text-left p-3 font-medium">Test status</th>
                      <th className="text-left p-3 font-medium">Result</th>
                      <th className="text-left p-3 font-medium">Findings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rollups.map((r) => (
                      <tr key={r.requirementId} className="border-b last:border-0">
                        <td className="p-3">
                          <span className="font-mono text-xs">{r.requirementCode}</span>
                          {r.requirementTitle && (
                            <span className="block text-xs text-slate-500">{r.requirementTitle}</span>
                          )}
                        </td>
                        <td className="p-3 text-sm">{r.primaryControlName || "—"}</td>
                        <td className="p-3">
                          <Badge variant="outline" className="text-xs">
                            {getTestStatusLabel(r.testStatus)}
                          </Badge>
                        </td>
                        <td className={cn("p-3 font-medium", getResultColor(r.result))}>
                          {r.result ?? "—"}
                        </td>
                        <td className="p-3">{r.findingsCount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </TabsContent>

          {/* Tab 3: Controls in scope (Control test cases = future implementation) */}
          <TabsContent value="controls" className="space-y-4 mt-4">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2">
              <ListChecks className="h-4 w-4" />
              Controls in scope
            </h3>
            <p className="text-sm text-muted-foreground">
              {audit.totalControls ?? controlsInScope ?? 0} controls in scope for this audit.
            </p>
          </TabsContent>

          {/* Tab 4: Evidence */}
          <TabsContent value="evidence" className="space-y-4 mt-4">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2">
              <FileCheck className="h-4 w-4" />
              Evidence collection
            </h3>
            {audit.evidenceLocked && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-2">
                <Lock className="h-4 w-4 text-blue-600" />
                <p className="text-sm font-medium text-blue-800">Evidence is locked</p>
              </div>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
              {audit.evidenceRequired != null && (
                <div className="p-3 rounded-lg border bg-muted/30">
                  <p className="text-xs text-muted-foreground">Required</p>
                  <p className="font-bold">{audit.evidenceRequired}</p>
                </div>
              )}
              {audit.evidenceUploaded != null && (
                <div className="p-3 rounded-lg border bg-green-50">
                  <p className="text-xs text-muted-foreground">Uploaded</p>
                  <p className="font-bold text-green-700">{audit.evidenceUploaded}</p>
                </div>
              )}
              {audit.evidenceMissing != null && (
                <div className="p-3 rounded-lg border bg-red-50">
                  <p className="text-xs text-muted-foreground">Missing</p>
                  <p className="font-bold text-red-700">{audit.evidenceMissing}</p>
                </div>
              )}
              {audit.evidenceLate != null && (
                <div className="p-3 rounded-lg border bg-yellow-50">
                  <p className="text-xs text-muted-foreground">Late</p>
                  <p className="font-bold text-yellow-700">{audit.evidenceLate}</p>
                </div>
              )}
            </div>
            {evidenceItems.length > 0 ? (
              <div className="rounded-lg border overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 border-b">
                    <tr>
                      <th className="text-left p-3 font-medium">Evidence</th>
                      <th className="text-left p-3 font-medium">Control</th>
                      <th className="text-left p-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {evidenceItems.map((e) => (
                      <tr key={e.id} className="border-b last:border-0">
                        <td className="p-3">{e.name}</td>
                        <td className="p-3 text-slate-600">{e.controlName || "—"}</td>
                        <td className="p-3">
                          <Badge
                            variant="outline"
                            className={cn(
                              "text-xs",
                              e.status === "uploaded" && "bg-green-100 text-green-800",
                              e.status === "missing" && "bg-red-100 text-red-800",
                              e.status === "late" && "bg-yellow-100 text-yellow-800"
                            )}
                          >
                            {e.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-sm text-slate-600">
                {audit.evidenceCount ?? 0} evidence item{audit.evidenceCount !== 1 ? "s" : ""} for this audit
              </p>
            )}
          </TabsContent>

          {/* Tab 5: Findings */}
          <TabsContent value="findings" className="space-y-4 mt-4">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Findings
            </h3>
            <p className="text-sm text-muted-foreground">
              ID | Linked requirement | Linked control | Severity | Status | Owner
            </p>
            {audit.findings.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <p className="text-sm text-slate-600">No findings</p>
              </div>
            ) : (
              <div className="rounded-lg border overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 border-b">
                    <tr>
                      <th className="text-left p-3 font-medium">ID</th>
                      <th className="text-left p-3 font-medium">Requirement</th>
                      <th className="text-left p-3 font-medium">Control</th>
                      <th className="text-left p-3 font-medium">Severity</th>
                      <th className="text-left p-3 font-medium">Status</th>
                      <th className="text-left p-3 font-medium">Owner</th>
                    </tr>
                  </thead>
                  <tbody>
                    {audit.findings.map((f) => (
                      <tr key={f.id} className="border-b last:border-0">
                        <td className="p-3 font-mono text-xs">{f.findingId}</td>
                        <td className="p-3 font-mono text-xs">{f.requirementCode || "—"}</td>
                        <td className="p-3">{f.controlName || "—"}</td>
                        <td className="p-3">
                          <Badge variant="outline" className={cn("text-xs", getSeverityColor(f.severity))}>
                            {f.severity}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <Badge variant="outline" className={cn("text-xs", getFindingStatusColor(f.status))}>
                            {f.status.replace("_", " ")}
                          </Badge>
                        </td>
                        <td className="p-3">{f.assignedTo || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </TabsContent>
          {/* Tab 6: Lifecycle */}
          <TabsContent value="lifecycle" className="space-y-4 mt-4">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2">
              <History className="h-4 w-4" />
              Status history
            </h3>
            {(!audit.statusHistory || audit.statusHistory.length === 0) ? (
              <div className="text-center py-8">
                <Clock className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                <p className="text-sm text-slate-600">No status history yet</p>
              </div>
            ) : (
              <ol className="relative border-l border-muted ml-3 space-y-4">
                {audit.statusHistory.map((entry: AuditStatusHistoryEntry, idx: number) => (
                  <li key={entry.id ?? idx} className="ml-4">
                    <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border bg-background border-muted-foreground/40" />
                    <div className="flex items-center gap-2 text-sm font-medium">
                      {entry.from_status ? (
                        <>
                          <AuditStatusBadge status={entry.from_status as any} />
                          <ArrowRight className="h-3 w-3 text-muted-foreground" />
                        </>
                      ) : null}
                      <AuditStatusBadge status={entry.to_status as any} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(entry.changed_at).toLocaleString()}
                      {entry.changed_by_name && ` · ${entry.changed_by_name}`}
                    </p>
                    {entry.notes && (
                      <p className="text-xs text-slate-600 mt-0.5 italic">{entry.notes}</p>
                    )}
                  </li>
                ))}
              </ol>
            )}

            <div className="pt-2">
              <h3 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Key dates
              </h3>
              <div className="space-y-1.5 text-sm">
                {[
                  { label: "Created", value: audit.createdAt },
                  { label: "Scheduled start", value: audit.scheduledStartDate },
                  { label: "Scheduled end", value: audit.scheduledEndDate },
                  { label: "Started", value: audit.startDate },
                  { label: "Evidence frozen", value: audit.evidenceFreezeDate },
                  { label: "Completed", value: audit.completedAt },
                  { label: "Last updated", value: audit.updatedAt },
                ].map(({ label, value }) =>
                  value ? (
                    <div key={label} className="flex justify-between border-b border-muted pb-1 last:border-0">
                      <span className="text-muted-foreground">{label}</span>
                      <span className="font-medium">{new Date(value).toLocaleString()}</span>
                    </div>
                  ) : null
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
