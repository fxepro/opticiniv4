"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Shield,
  FileText,
  Search,
  BarChart3,
  Settings,
  LayoutDashboard,
  Gauge,
  AlertTriangle,
  Info,
  Lightbulb,
  FileCheck,
  TrendingUp,
  Activity,
  Clock,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { CHART_COLOR_1, CHART_GRID_STROKE } from "@/lib/chart-colors";

// Mock data for Compliance KPIs (replace with API later)
const MOCK_POSTURE_SCORE = 78;
const MOCK_AUDIT_READINESS = 82;
const MOCK_EVIDENCE_SUFFICIENCY_PCT = 85;
const MOCK_CONTROL_EFFECTIVENESS_PCT = 88;
const MOCK_OPEN_FINDINGS = 12;
const MOCK_FRAMEWORK_COVERAGE_PCT = 92;
const MOCK_MONITORING_COVERAGE_PCT = 76;
const MOCK_REMEDIATION_SLA_PCT = 91;
const MOCK_REPEAT_FINDING_RATE_PCT = 8;
const MOCK_DRIFT_RATE_PCT = 5;
const MOCK_MISSING_EVIDENCE = 18;
const MOCK_EXPIRED_EVIDENCE_PCT = 4;
const MOCK_EVIDENCE_FRESHNESS_PCT = 94;

const findingsBySeverity = [
  { name: "Critical", count: 1 },
  { name: "High", count: 3 },
  { name: "Medium", count: 5 },
  { name: "Low", count: 3 },
];

const complianceTrendData = [
  { date: "W1", score: 74 },
  { date: "W2", score: 76 },
  { date: "W3", score: 77 },
  { date: "W4", score: 78 },
  { date: "W5", score: 78 },
];

const alertItems = [
  { id: 1, severity: "warning", message: "18 controls missing required evidence. Review Evidence mapping.", time: "2h ago" },
  { id: 2, severity: "info", message: "Compliance assessment completed. Posture score 78.", time: "1d ago" },
  { id: 3, severity: "warning", message: "4% of evidence items expired. Update or replace.", time: "1d ago" },
];

const overviewItems = [
  { title: "Frameworks", description: "Enable and track frameworks like SOC 2, ISO, HIPAA.", href: "/workspace/compliance/frameworks", icon: ShieldCheck },
  { title: "Controls", description: "Manage control requirements and coverage.", href: "/workspace/compliance/controls", icon: Shield },
  { title: "Assertions", description: "Configure assertions that feed into Monitoring.", href: "/workspace/compliance/controls/assertions", icon: ShieldCheck },
  { title: "Evidence", description: "Review collected evidence and freshness status.", href: "/workspace/compliance/evidence", icon: FileText },
  { title: "Policies", description: "Generate and maintain compliance policies.", href: "/workspace/compliance/policies", icon: FileText },
  { title: "Audits", description: "Run audits and track assessment progress.", href: "/workspace/compliance/audits", icon: Search },
  { title: "Reports", description: "Export compliance reports and attestations.", href: "/workspace/compliance/reports", icon: BarChart3 },
  { title: "Tools", description: "Configure scanners and evidence collection tools.", href: "/workspace/compliance/tools", icon: Settings },
];

export default function ComplianceOverviewPage() {
  const [activeTab, setActiveTab] = useState("kpi");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <LayoutDashboard className="h-6 w-6 text-palette-primary" />
        <div>
          <h1 className="app-page-title">Compliance Overview</h1>
          <p className="text-muted-foreground mt-1">
            Quick access to all compliance workflows and reporting.
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-white border border-slate-200 p-1">
          <TabsTrigger value="kpi" className="data-[state=active]:bg-palette-primary data-[state=active]:text-white">
            KPI
          </TabsTrigger>
          <TabsTrigger value="alerts" className="data-[state=active]:bg-palette-primary data-[state=active]:text-white">
            Alerts
          </TabsTrigger>
          <TabsTrigger value="quick-access" className="data-[state=active]:bg-palette-primary data-[state=active]:text-white">
            Quick Access
          </TabsTrigger>
          <TabsTrigger value="intelligence" className="data-[state=active]:bg-palette-primary data-[state=active]:text-white">
            Intelligence
          </TabsTrigger>
        </TabsList>

        <TabsContent value="kpi" className="space-y-6 mt-4">
          {/* Top row – headline KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Posture Score</p>
                    <p className="text-2xl font-bold text-palette-primary mt-1">{MOCK_POSTURE_SCORE}</p>
                    <p className="text-xs text-slate-500 mt-1">0–100 composite</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-palette-accent-3 flex items-center justify-center">
                    <Gauge className="h-6 w-6 text-palette-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Audit Readiness</p>
                    <p className="text-2xl font-bold text-palette-primary mt-1">{MOCK_AUDIT_READINESS}</p>
                    <p className="text-xs text-slate-500 mt-1">0–100 index</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-palette-accent-3 flex items-center justify-center">
                    <FileCheck className="h-6 w-6 text-palette-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Evidence Sufficiency</p>
                    <p className="text-2xl font-bold text-palette-primary mt-1">{MOCK_EVIDENCE_SUFFICIENCY_PCT}%</p>
                    <p className="text-xs text-slate-500 mt-1">Controls with evidence</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-palette-accent-3 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-palette-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Control Effectiveness</p>
                    <p className="text-2xl font-bold text-palette-primary mt-1">{MOCK_CONTROL_EFFECTIVENESS_PCT}%</p>
                    <p className="text-xs text-slate-500 mt-1">Effective / total</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-palette-accent-3 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-palette-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Open Findings</p>
                    <p className="text-2xl font-bold text-amber-600 mt-1">{MOCK_OPEN_FINDINGS}</p>
                    <p className="text-xs text-slate-500 mt-1">Require remediation</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                    <AlertTriangle className="h-6 w-6 text-amber-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Second row – coverage and findings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="p-5">
                <p className="text-sm font-medium text-slate-600">Framework Coverage</p>
                <p className="text-2xl font-bold text-palette-primary mt-1">{MOCK_FRAMEWORK_COVERAGE_PCT}%</p>
                <p className="text-xs text-slate-500 mt-1">Frameworks covered</p>
              </CardContent>
            </Card>
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="p-5">
                <p className="text-sm font-medium text-slate-600">Monitoring Coverage</p>
                <p className="text-2xl font-bold text-palette-primary mt-1">{MOCK_MONITORING_COVERAGE_PCT}%</p>
                <p className="text-xs text-slate-500 mt-1">Continuous monitoring</p>
              </CardContent>
            </Card>
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="p-5">
                <p className="text-sm font-medium text-slate-600">Remediation SLA</p>
                <p className="text-2xl font-bold text-palette-primary mt-1">{MOCK_REMEDIATION_SLA_PCT}%</p>
                <p className="text-xs text-slate-500 mt-1">Within SLA</p>
              </CardContent>
            </Card>
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="p-5">
                <p className="text-sm font-medium text-slate-600">Repeat Finding Rate</p>
                <p className="text-2xl font-bold text-palette-primary mt-1">{MOCK_REPEAT_FINDING_RATE_PCT}%</p>
                <p className="text-xs text-slate-500 mt-1">Recurring findings</p>
              </CardContent>
            </Card>
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="p-5">
                <p className="text-sm font-medium text-slate-600">Compliance Drift Rate</p>
                <p className="text-2xl font-bold text-amber-600 mt-1">{MOCK_DRIFT_RATE_PCT}%</p>
                <p className="text-xs text-slate-500 mt-1">Drifted from compliant</p>
              </CardContent>
            </Card>
          </div>

          {/* Third row – evidence */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Missing Evidence</p>
                    <p className="text-2xl font-bold text-amber-600 mt-1">{MOCK_MISSING_EVIDENCE}</p>
                    <p className="text-xs text-slate-500 mt-1">Controls missing evidence</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-amber-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Expired Evidence</p>
                    <p className="text-2xl font-bold text-amber-600 mt-1">{MOCK_EXPIRED_EVIDENCE_PCT}%</p>
                    <p className="text-xs text-slate-500 mt-1">Of total evidence</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-amber-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Evidence Freshness</p>
                    <p className="text-2xl font-bold text-palette-primary mt-1">{MOCK_EVIDENCE_FRESHNESS_PCT}%</p>
                    <p className="text-xs text-slate-500 mt-1">Within policy window</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-palette-accent-3 flex items-center justify-center">
                    <Activity className="h-6 w-6 text-palette-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border border-slate-200 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  Open Findings by Severity
                </CardTitle>
                <p className="text-sm text-slate-500 font-normal">Critical, High, Medium, Low</p>
              </CardHeader>
              <CardContent>
                <div className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={findingsBySeverity} margin={{ left: 20, right: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID_STROKE} />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Bar dataKey="count" fill={CHART_COLOR_1} radius={[4, 4, 0, 0]} name="Count" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="h-[60px]" aria-hidden />
              </CardContent>
            </Card>
            <Card className="border border-slate-200 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-palette-primary" />
                  Compliance Trend (30 days)
                </CardTitle>
                <p className="text-sm text-slate-500 font-normal">Weekly posture score</p>
              </CardHeader>
              <CardContent>
                <div className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={complianceTrendData} margin={{ left: 20, right: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID_STROKE} />
                      <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                      <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                      <Tooltip formatter={(value: number) => [`${value}`, "Score"]} />
                      <Line
                        type="monotone"
                        dataKey="score"
                        stroke={CHART_COLOR_1}
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        name="Score"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="h-[60px]" aria-hidden />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6 mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  Alerts
                </CardTitle>
                <p className="text-sm text-slate-500 font-normal">Compliance and evidence alerts</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {alertItems.map((alert) => (
                    <li
                      key={alert.id}
                      className={`flex items-start gap-3 p-3 rounded-lg border ${
                        alert.severity === "warning"
                          ? "border-amber-200 bg-amber-50"
                          : "border-slate-200 bg-slate-50"
                      }`}
                    >
                      <AlertTriangle
                        className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                          alert.severity === "warning" ? "text-amber-600" : "text-slate-500"
                        }`}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-slate-800">{alert.message}</p>
                        <p className="text-xs text-slate-500 mt-1">{alert.time}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-slate-500 mt-4">Alerts from missing evidence, expired evidence, and open findings.</p>
              </CardContent>
            </Card>
            <Card className="border border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Info className="h-4 w-4 text-palette-primary" />
                  Info
                </CardTitle>
                <p className="text-sm text-slate-500 font-normal">Compliance scope and last assessment</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="text-sm font-medium text-slate-700">Scope</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Frameworks, controls, evidence, findings, remediation SLA, and audit readiness. Evidence KPIs (coverage, missing, expired, freshness) are included here.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="text-sm font-medium text-slate-700">Last compliance assessment</p>
                  <p className="text-sm text-slate-600 mt-1">— (connect to API)</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="text-sm font-medium text-slate-700">Next steps</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Use the Quick access tab to open Frameworks, Controls, Evidence, Policies, Audits, Reports, and Tools.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="quick-access" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {overviewItems.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.href} className="border border-palette-accent-1">
                  <CardHeader className="flex flex-row items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-palette-accent-2/40">
                      <Icon className="h-5 w-5 text-palette-primary" />
                    </div>
                    <CardTitle className="text-base text-slate-900">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-slate-600">{item.description}</p>
                    <Button asChild variant="outline" className="w-full">
                      <Link href={item.href}>Open {item.title}</Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="intelligence" className="space-y-6 mt-4">
          <Card className="border border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-palette-primary" />
                Intelligence
              </CardTitle>
              <p className="text-sm text-slate-500 font-normal">
                Insights and recommendations from this module&apos;s data.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                <p className="text-sm text-slate-600">
                  Intelligence content will show insights, recommendations, and analysis. Connect to your intelligence or analytics API when ready.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
