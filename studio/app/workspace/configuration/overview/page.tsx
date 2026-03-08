"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle,
  FileCheck,
  Gauge,
  Info,
  Lightbulb,
  Settings,
  Clock,
  ShieldAlert,
  TrendingUp,
  FileText,
  Activity,
  Shield,
  ShieldCheck,
  Wrench,
  BarChart3,
} from "lucide-react";
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

// Mock data for Configuration KPIs (replace with API later) – de-duplicated metrics
const MOCK_INTEGRITY_SCORE = 79;
const MOCK_BASELINE_COVERAGE_PCT = 85;
const MOCK_ASSETS_OUT_OF_BASELINE_PCT = 12;
const MOCK_ACTIVE_DRIFT_EVENTS = 18;
const MOCK_MTTR_DRIFT_HOURS = 4.5;
const MOCK_POLICY_COMPLIANCE_PCT = 92;
const MOCK_POLICY_VIOLATIONS = 5;
const MOCK_UNAUTHORIZED_CHANGES = 3;
const MOCK_APPROVAL_CYCLE_HOURS = 2.2;

const driftBySeverity = [
  { name: "Critical", count: 2 },
  { name: "High", count: 6 },
  { name: "Medium", count: 7 },
  { name: "Low", count: 3 },
];

const configurationTrendData = [
  { date: "W1", score: 74 },
  { date: "W2", score: 76 },
  { date: "W3", score: 78 },
  { date: "W4", score: 77 },
  { date: "W5", score: 79 },
];

const alertItems = [
  { id: 1, severity: "warning", message: "18 active drift events. 2 critical drifts require remediation.", time: "1h ago" },
  { id: 2, severity: "info", message: "Drift scan completed. Baseline coverage 85%.", time: "3h ago" },
  { id: 3, severity: "warning", message: "3 unauthorized changes detected in last 7 days.", time: "1d ago" },
];

const quickAccessItems = [
  { title: "Configuration Baselines", description: "Defined baselines and desired state.", href: "/workspace/configuration/baselines", icon: FileText },
  { title: "Drift Detection", description: "Current vs baseline drift and deviations.", href: "/workspace/configuration/drift-detection", icon: Activity },
  { title: "Policy Enforcement", description: "Configuration policies and enforcement status.", href: "/workspace/configuration/policy-enforcement", icon: Shield },
  { title: "Infrastructure as Code", description: "IaC templates and deployment state.", href: "/workspace/configuration/iac", icon: FileText },
  { title: "System Settings", description: "Key system and application settings.", href: "/workspace/configuration/settings", icon: Settings },
  { title: "Version Tracking", description: "Configuration version history and changes.", href: "/workspace/configuration/version-tracking", icon: Clock },
  { title: "Approval Workflows", description: "Approval gates for configuration changes.", href: "/workspace/configuration/approval-workflows", icon: ShieldCheck },
  { title: "Remediation", description: "Remediation actions and automation.", href: "/workspace/configuration/remediation", icon: Wrench },
  { title: "Reports", description: "Drift, compliance, and change reports.", href: "/workspace/configuration/reports", icon: BarChart3 },
];

export default function ConfigurationOverviewPage() {
  const [activeTab, setActiveTab] = useState("kpi");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="app-page-title">Configuration Overview</h1>
        <p className="text-muted-foreground mt-1">
          Baselines, drift detection, and system integrity.
        </p>
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
                    <p className="text-sm font-medium text-slate-600">Integrity Score</p>
                    <p className="text-2xl font-bold text-palette-primary mt-1">{MOCK_INTEGRITY_SCORE}</p>
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
                    <p className="text-sm font-medium text-slate-600">Baseline Coverage</p>
                    <p className="text-2xl font-bold text-palette-primary mt-1">{MOCK_BASELINE_COVERAGE_PCT}%</p>
                    <p className="text-xs text-slate-500 mt-1">Assets under baseline</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-palette-accent-3 flex items-center justify-center">
                    <Settings className="h-6 w-6 text-palette-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Assets Out of Baseline</p>
                    <p className="text-2xl font-bold text-amber-600 mt-1">{MOCK_ASSETS_OUT_OF_BASELINE_PCT}%</p>
                    <p className="text-xs text-slate-500 mt-1">Currently in drift</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                    <AlertTriangle className="h-6 w-6 text-amber-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Active Drift Events</p>
                    <p className="text-2xl font-bold text-amber-600 mt-1">{MOCK_ACTIVE_DRIFT_EVENTS}</p>
                    <p className="text-xs text-slate-500 mt-1">Open / unresolved</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                    <ShieldAlert className="h-6 w-6 text-amber-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">MTTR-Drift</p>
                    <p className="text-2xl font-bold text-palette-primary mt-1">{MOCK_MTTR_DRIFT_HOURS}h</p>
                    <p className="text-xs text-slate-500 mt-1">Mean time to remediate</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-palette-accent-3 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-palette-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Second row – policy and change */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Policy Compliance</p>
                    <p className="text-2xl font-bold text-palette-primary mt-1">{MOCK_POLICY_COMPLIANCE_PCT}%</p>
                    <p className="text-xs text-slate-500 mt-1">Policies satisfied</p>
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
                    <p className="text-sm font-medium text-slate-600">Policy Violations</p>
                    <p className="text-2xl font-bold text-amber-600 mt-1">{MOCK_POLICY_VIOLATIONS}</p>
                    <p className="text-xs text-slate-500 mt-1">Open violations</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                    <AlertTriangle className="h-6 w-6 text-amber-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Unauthorized Changes</p>
                    <p className="text-2xl font-bold text-amber-600 mt-1">{MOCK_UNAUTHORIZED_CHANGES}</p>
                    <p className="text-xs text-slate-500 mt-1">Last 7 days</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                    <ShieldAlert className="h-6 w-6 text-amber-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Approval Cycle Time</p>
                    <p className="text-2xl font-bold text-palette-primary mt-1">{MOCK_APPROVAL_CYCLE_HOURS}h</p>
                    <p className="text-xs text-slate-500 mt-1">Avg request → approval</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-palette-accent-3 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-palette-primary" />
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
                  <ShieldAlert className="h-4 w-4 text-amber-600" />
                  Active Drift Events by Severity
                </CardTitle>
                <p className="text-sm text-slate-500 font-normal">Critical, High, Medium, Low</p>
              </CardHeader>
              <CardContent>
                <div className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={driftBySeverity} margin={{ left: 20, right: 20 }}>
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
                  Configuration Trend (30 days)
                </CardTitle>
                <p className="text-sm text-slate-500 font-normal">Weekly integrity score</p>
              </CardHeader>
              <CardContent>
                <div className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={configurationTrendData} margin={{ left: 20, right: 20 }}>
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
                <p className="text-sm text-slate-500 font-normal">Configuration and drift alerts</p>
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
                <p className="text-xs text-slate-500 mt-4">Alerts from drift detection, policy violations, and unauthorized changes.</p>
              </CardContent>
            </Card>
            <Card className="border border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Info className="h-4 w-4 text-palette-primary" />
                  Info
                </CardTitle>
                <p className="text-sm text-slate-500 font-normal">Configuration scope and last scan</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="text-sm font-medium text-slate-700">Scope</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Baselines, drift detection, policy compliance, unauthorized changes, and approval cycle. Metrics are de-duplicated (single Baseline Coverage %, single MTTR-Drift, single Configuration Trend).
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="text-sm font-medium text-slate-700">Last drift scan</p>
                  <p className="text-sm text-slate-600 mt-1">— (connect to API)</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="text-sm font-medium text-slate-700">Next steps</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Use the Quick access tab to open Configuration Baselines, Drift Detection, Policy Enforcement, and other configuration sections.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="quick-access" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {quickAccessItems.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.href} className="border border-palette-accent-1">
                  <CardHeader className="flex flex-row items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-palette-accent-2/40">
                      <Icon className="h-5 w-5 text-palette-primary" />
                    </div>
                    <CardTitle className="text-base text-slate-900">{item.title}</CardTitle>
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
