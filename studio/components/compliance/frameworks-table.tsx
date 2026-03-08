"use client";

import React, { useState, useCallback } from "react";
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
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Framework } from "@/lib/data/frameworks";
import { ShieldCheck, MoreVertical, Eye, FileText, Shield, Lock, Globe, Building2, Loader2, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

/** API response for GET /api/compliance/frameworks/<id>/detail/ */
export interface FrameworkDetailResponse {
  id: string;
  name: string;
  code: string;
  total_requirements: number;
  requirements_covered_count: number;
  requirements_covered_pct: number;
  controls_mapped: number;
  primary_control_coverage_count: number;
  primary_control_coverage_pct: number;
  failing_requirements: number;
  not_evaluated_requirements: number;
  requirements: RequirementDetail[];
}

export interface RequirementDetail {
  id: string;
  code: string;
  title: string;
  statement: string;
  statement_paraphrase: string;
  requirement_level: string;
  points_of_focus: { id: string; pof_code: string; pof_text: string; sort_order: number | null }[];
  mapped_controls: { control_id: string; control_name: string; coverage: string; primary_control_flag: boolean }[];
  coverage_display?: string;
  primary_control_id?: string;
  primary_control_name?: string;
  controls_mapped_count?: number;
  requirement_health?: string;
  requirement_health_display?: string;
  evidence_completeness: string;
  monitoring_status: string;
}

interface FrameworksTableProps {
  frameworks: Framework[];
  onViewDetails?: (framework: Framework) => void;
  onFetchDetail?: (frameworkId: string) => Promise<FrameworkDetailResponse>;
  onGenerateReport?: (frameworkId: string) => void;
}

const categoryIcons = {
  security: Shield,
  privacy: Lock,
  industry: Building2,
  regional: Globe,
};

const getStatusColor = (status: Framework['status']) => {
  switch (status) {
    case 'ready':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'in_progress':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'at_risk':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'not_started':
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getStatusLabel = (status: Framework['status']) => {
  switch (status) {
    case 'ready':
      return 'Ready';
    case 'in_progress':
      return 'In Progress';
    case 'at_risk':
      return 'At Risk';
    case 'not_started':
      return 'Not Started';
  }
};

const getScoreColor = (score: number) => {
  if (score >= 80) return 'text-green-600';
  if (score >= 40) return 'text-yellow-600';
  return 'text-red-600';
};

export function FrameworksTable({
  frameworks,
  onViewDetails,
  onFetchDetail,
  onGenerateReport,
}: FrameworksTableProps) {
  const [expandedFrameworkId, setExpandedFrameworkId] = useState<string | null>(null);
  const [detailState, setDetailState] = useState<Record<string, { loading: boolean; error?: string; data?: FrameworkDetailResponse }>>({});

  const toggleExpand = useCallback(
    async (frameworkId: string) => {
      if (expandedFrameworkId === frameworkId) {
        setExpandedFrameworkId(null);
        return;
      }
      setExpandedFrameworkId(frameworkId);
      onViewDetails?.(frameworks.find((f) => f.id === frameworkId)!);
      if (!onFetchDetail) return;
      const existing = detailState[frameworkId];
      if (existing?.data || existing?.loading) return;
      setDetailState((prev) => ({ ...prev, [frameworkId]: { loading: true } }));
      try {
        const data = await onFetchDetail(frameworkId);
        setDetailState((prev) => ({ ...prev, [frameworkId]: { loading: false, data } }));
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Failed to load framework detail";
        setDetailState((prev) => ({ ...prev, [frameworkId]: { loading: false, error: message } }));
      }
    },
    [expandedFrameworkId, onFetchDetail, frameworks, detailState]
  );

  const getTimeAgo = (dateString?: string) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-100 border-b border-slate-200">
            <TableHead>Framework</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Compliance Score</TableHead>
            <TableHead>Controls</TableHead>
            <TableHead>Last Evaluated</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {frameworks.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center text-slate-500">
                No frameworks found. Enable frameworks in Account → Frameworks, or adjust filters.
              </TableCell>
            </TableRow>
          ) : frameworks.map((framework) => {
            const CategoryIcon = categoryIcons[framework.category as keyof typeof categoryIcons] ?? Shield;
            const statusColor = getStatusColor(framework.status);
            const scoreColor = getScoreColor(framework.complianceScore);
            const isExpanded = expandedFrameworkId === framework.id;
            const detail = detailState[framework.id];

            return (
              <React.Fragment key={framework.id}>
              <TableRow
                className={cn(
                  "hover:bg-slate-50 transition-colors",
                  !framework.enabled && "opacity-60"
                )}
              >
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "h-8 w-8 p-0 shrink-0 transition-transform",
                        isExpanded && "rotate-90"
                      )}
                      onClick={() => toggleExpand(framework.id)}
                      aria-label={isExpanded ? "Hide details" : "View details"}
                    >
                      <ChevronRight className="h-4 w-4 text-slate-500" />
                    </Button>
                    <div className={cn(
                      "p-2 rounded-lg",
                      framework.category === 'security' && "bg-blue-100",
                      framework.category === 'privacy' && "bg-purple-100",
                      framework.category === 'industry' && "bg-orange-100",
                      framework.category === 'regional' && "bg-green-100",
                    )}>
                      <CategoryIcon className={cn(
                        "h-4 w-4",
                        framework.category === 'security' && "text-blue-600",
                        framework.category === 'privacy' && "text-purple-600",
                        framework.category === 'industry' && "text-orange-600",
                        framework.category === 'regional' && "text-green-600",
                      )} />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">{framework.name}</div>
                      <div className="text-xs text-slate-500">{framework.code}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs">
                    {framework.category}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={cn("text-xs", statusColor)}>
                    {getStatusLabel(framework.status)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 min-w-[120px]">
                    <Progress 
                      value={framework.complianceScore} 
                      className="h-2 flex-1"
                    />
                    <span className={cn("text-sm font-semibold min-w-[40px] text-right", scoreColor)}>
                      {framework.complianceScore}%
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-slate-600">Total:</span>
                      <span className="font-semibold text-slate-900">{framework.totalControls}</span>
                    </div>
                    <div className="flex gap-1">
                      {framework.passingControls > 0 && (
                        <div 
                          className="h-1.5 bg-green-500 rounded flex-1"
                          style={{ 
                            width: `${(framework.passingControls / framework.totalControls) * 100}%`,
                            minWidth: framework.passingControls > 0 ? '4px' : '0'
                          }}
                          title={`${framework.passingControls} passing`}
                        />
                      )}
                      {framework.failingControls > 0 && (
                        <div 
                          className="h-1.5 bg-red-500 rounded flex-1"
                          style={{ 
                            width: `${(framework.failingControls / framework.totalControls) * 100}%`,
                            minWidth: framework.failingControls > 0 ? '4px' : '0'
                          }}
                          title={`${framework.failingControls} failing`}
                        />
                      )}
                      {framework.notEvaluatedControls > 0 && (
                        <div 
                          className="h-1.5 bg-gray-300 rounded flex-1"
                          style={{ 
                            width: `${(framework.notEvaluatedControls / framework.totalControls) * 100}%`,
                            minWidth: framework.notEvaluatedControls > 0 ? '4px' : '0'
                          }}
                          title={`${framework.notEvaluatedControls} not evaluated`}
                        />
                      )}
                    </div>
                    <div className="flex gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded"></div>
                        {framework.passingControls}
                      </span>
                      <span className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded"></div>
                        {framework.failingControls}
                      </span>
                      {framework.notEvaluatedControls > 0 && (
                        <span className="flex items-center gap-1">
                          <div className="w-1.5 h-1.5 bg-gray-300 rounded"></div>
                          {framework.notEvaluatedControls}
                        </span>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-slate-600">
                    {framework.lastEvaluated ? (
                      <div>
                        <div>{getTimeAgo(framework.lastEvaluated)}</div>
                        {framework.nextAuditDate && (
                          <div className="text-xs text-slate-400 mt-1">
                            Next: {new Date(framework.nextAuditDate).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-slate-400">Never</span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => toggleExpand(framework.id)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        {isExpanded ? "Hide Details" : "View Details"}
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/workspace/compliance/controls?framework=${framework.id}`}>
                          <ShieldCheck className="h-4 w-4 mr-2" />
                          View Controls
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onGenerateReport?.(framework.id)}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Generate Report
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
              {isExpanded && (
                <TableRow className="bg-slate-50/80 hover:bg-slate-50/80">
                  <TableCell colSpan={7} className="p-0 align-top">
                    <div className="border-t border-slate-200 mx-6 my-3">
                      <div className="rounded-lg border border-slate-200 bg-white shadow-sm p-4">
                      {detail?.loading && (
                        <div className="flex items-center justify-center py-12 text-slate-500">
                          <Loader2 className="h-6 w-6 animate-spin mr-2" />
                          Loading framework detail…
                        </div>
                      )}
                      {detail?.error && (
                        <div className="text-sm text-red-600 py-4">{detail.error}</div>
                      )}
                      {detail?.data && !detail.loading && (
                        <Accordion type="multiple" className="w-full" defaultValue={["framework-metrics", "requirements"]}>
                          <AccordionItem value="framework-metrics">
                            <AccordionTrigger className="text-sm font-semibold">Framework detail</AccordionTrigger>
                            <AccordionContent>
                              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-sm">
                                <div>
                                  <div className="text-slate-500 font-medium">Total Requirements</div>
                                  <div className="font-semibold text-slate-900">{detail.data.total_requirements}</div>
                                </div>
                                <div>
                                  <div className="text-slate-500 font-medium">Requirements Covered %</div>
                                  <div className="font-semibold text-slate-900">{detail.data.requirements_covered_pct}%</div>
                                </div>
                                <div>
                                  <div className="text-slate-500 font-medium">Controls Mapped</div>
                                  <div className="font-semibold text-slate-900">{detail.data.controls_mapped}</div>
                                </div>
                                <div>
                                  <div className="text-slate-500 font-medium">Primary Control Coverage %</div>
                                  <div className="font-semibold text-slate-900">{detail.data.primary_control_coverage_pct}%</div>
                                </div>
                                <div>
                                  <div className="text-slate-500 font-medium">Failing Requirements</div>
                                  <div className="font-semibold text-slate-900">{detail.data.failing_requirements}</div>
                                </div>
                                <div>
                                  <div className="text-slate-500 font-medium">Not Evaluated</div>
                                  <div className="font-semibold text-slate-900">{detail.data.not_evaluated_requirements}</div>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="requirements">
                            <AccordionTrigger className="text-sm font-semibold">Requirement detail</AccordionTrigger>
                            <AccordionContent>
                              <Accordion type="multiple" className="w-full">
                                {detail.data.requirements.map((req) => (
                                  <AccordionItem key={req.id} value={req.id}>
                                    <AccordionTrigger className="text-left">
                                      <div className="flex flex-col items-start gap-0.5">
                                        <span className="font-mono text-slate-700">{req.code}</span>
                                        {req.title && <span className="text-slate-600 font-normal">{req.title}</span>}
                                        {(req.coverage_display || req.primary_control_id || (req.controls_mapped_count ?? 0) > 0 || req.requirement_health_display) && (
                                          <div className="text-xs font-normal text-slate-500 mt-1 flex flex-wrap gap-x-3 gap-y-0.5">
                                            {req.coverage_display && req.coverage_display !== "—" && (
                                              <span>Coverage: {req.coverage_display}</span>
                                            )}
                                            {req.primary_control_id && (
                                              <span>⭐ Primary: {req.primary_control_id}</span>
                                            )}
                                            {(req.controls_mapped_count ?? 0) > 0 && (
                                              <span>Controls Mapped: {req.controls_mapped_count}</span>
                                            )}
                                            {req.requirement_health_display && (
                                              <span>Requirement Health: {req.requirement_health_display}</span>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="space-y-3 pl-1">
                                      {(req.requirement_health_display || req.coverage_display || (req.controls_mapped_count ?? 0) > 0) && (
                                        <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-slate-600 pb-2 border-b border-slate-100">
                                          {req.requirement_health_display && <span>{req.requirement_health_display}</span>}
                                          {req.coverage_display && req.coverage_display !== "—" && <span>|</span>}
                                          {req.coverage_display && req.coverage_display !== "—" && <span>Coverage: {req.coverage_display}</span>}
                                          {(req.controls_mapped_count ?? 0) > 0 && <span>|</span>}
                                          {(req.controls_mapped_count ?? 0) > 0 && <span>{req.controls_mapped_count} Controls</span>}
                                          {req.primary_control_id && <span>|</span>}
                                          {req.primary_control_id && <span>Primary: {req.primary_control_id}</span>}
                                        </div>
                                      )}
                                      {req.statement && (
                                        <div>
                                          <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">Full requirement text</div>
                                          <p className="text-sm text-slate-800 whitespace-pre-wrap">{req.statement}</p>
                                        </div>
                                      )}
                                      {req.statement_paraphrase && (
                                        <div>
                                          <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">Statement paraphrase</div>
                                          <p className="text-sm text-slate-700">{req.statement_paraphrase}</p>
                                        </div>
                                      )}
                                      {req.points_of_focus?.length > 0 && (
                                        <div>
                                          <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">Points of focus</div>
                                          <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                                            {req.points_of_focus.map((p) => (
                                              <li key={p.id}><span className="font-mono">{p.pof_code}</span> {p.pof_text}</li>
                                            ))}
                                          </ul>
                                        </div>
                                      )}
                                      {req.mapped_controls?.length > 0 && (
                                        <div>
                                          <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">Mapped controls</div>
                                          <div className="border border-slate-200 rounded-md overflow-hidden">
                                            <table className="w-full text-sm">
                                              <thead className="bg-slate-100">
                                                <tr>
                                                  <th className="text-left py-2 px-3 font-medium">Control</th>
                                                  <th className="text-left py-2 px-3 font-medium">Coverage</th>
                                                  <th className="text-left py-2 px-3 font-medium">Primary</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                {req.mapped_controls.map((m) => (
                                                  <tr key={m.control_id} className="border-t border-slate-100">
                                                    <td className="py-2 px-3">{m.control_name} <span className="text-slate-500 font-mono">({m.control_id})</span></td>
                                                    <td className="py-2 px-3">{m.coverage || "—"}</td>
                                                    <td className="py-2 px-3">{m.primary_control_flag ? <Badge variant="secondary" className="text-xs">Primary</Badge> : "—"}</td>
                                                  </tr>
                                                ))}
                                              </tbody>
                                            </table>
                                          </div>
                                        </div>
                                      )}
                                      <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                          <span className="text-slate-500 font-medium">Evidence completeness</span>
                                          <span className="ml-2 text-slate-800">{req.evidence_completeness}</span>
                                        </div>
                                        <div>
                                          <span className="text-slate-500 font-medium">Monitoring status</span>
                                          <span className="ml-2 text-slate-800">{req.monitoring_status}</span>
                                        </div>
                                      </div>
                                    </AccordionContent>
                                  </AccordionItem>
                                ))}
                              </Accordion>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      )}
                      </div>
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

