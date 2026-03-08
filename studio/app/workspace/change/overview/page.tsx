"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle,
  Gauge,
  Info,
  Lightbulb,
  TrendingUp,
  Activity,
  ShieldAlert,
  BarChart3,
  FileText,
  Package,
  Settings,
  Database,
  ShieldCheck,
  Shield,
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

// Mock data for Change KPIs (replace with API later)
const MOCK_SUCCESS_RATE_PCT = 94;
const MOCK_STABILITY_INDEX = 82;
const MOCK_FAILURE_RATE_PCT = 3;
const MOCK_UNAUTHORIZED_RATE_PCT = 2;
const MOCK_HIGH_RISK_PCT = 8;
const MOCK_MTTDCI_MIN = 18;
const MOCK_MTTMCI_MIN = 42;
const MOCK_VELOCITY_PER_WEEK = 124;
const MOCK_EMERGENCY_7D = 5;
const MOCK_PLANNED_7D = 119;
const MOCK_CHANGE_TO_INCIDENT_RATIO = 0.04;

const changesByOutcome = [
  { name: "Success", count: 116 },
  { name: "Failed", count: 4 },
  { name: "Rolled back", count: 4 },
];

const changeTrendData = [
  { date: "W1", successRate: 91 },
  { date: "W2", successRate: 92 },
  { date: "W3", successRate: 93 },
  { date: "W4", successRate: 94 },
  { date: "W5", successRate: 94 },
];

const alertItems = [
  { id: 1, severity: "warning", message: "4 changes failed in the last 7 days. Review Change Log.", time: "2h ago" },
  { id: 2, severity: "info", message: "Change velocity: 124 changes/week. Stability index 82.", time: "1d ago" },
  { id: 3, severity: "warning", message: "5 emergency changes in last 7 days. Consider approval workflow.", time: "1d ago" },
];

const quickAccessItems = [
  { title: "Change Log", description: "Chronological log of changes across the estate.", href: "/workspace/change/change-log", icon: FileText },
  { title: "Deployments", description: "Deployment history and status.", href: "/workspace/change/deployments", icon: Package },
  { title: "Configuration Changes", description: "Configuration change tracking.", href: "/workspace/change/configuration-changes", icon: Settings },
  { title: "Infrastructure Changes", description: "Infrastructure and environment changes.", href: "/workspace/change/infrastructure-changes", icon: Database },
  { title: "Approval Workflows", description: "Change approval and sign-off.", href: "/workspace/change/approval-workflows", icon: ShieldCheck },
  { title: "Change Risk Scoring", description: "Risk assessment for planned changes.", href: "/workspace/change/risk-scoring", icon: Shield },
  { title: "Change-to-Incident Correlation", description: "Link changes to incidents.", href: "/workspace/change/incident-correlation", icon: Activity },
  { title: "Rollbacks", description: "Rollback history and procedures.", href: "/workspace/change/rollbacks", icon: Activity },
  { title: "Reports", description: "Change volume, success rate, and impact reports.", href: "/workspace/change/reports", icon: BarChart3 },
];

export default function ChangeOverviewPage() {
  const [activeTab, setActiveTab] = useState("kpi");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="app-page-title">Change Overview</h1>
        <p className="text-muted-foreground mt-1">
          Change tracking and impact analysis.
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
                    <p className="text-sm font-medium text-slate-600">Change Success Rate</p>
                    <p className="text-2xl font-bold text-palette-primary mt-1">{MOCK_SUCCESS_RATE_PCT}%</p>
                    <p className="text-xs text-slate-500 mt-1">Completed successfully</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-palette-accent-3 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-palette-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Stability Index</p>
                    <p className="text-2xl font-bold text-palette-primary mt-1">{MOCK_STABILITY_INDEX}</p>
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
                    <p className="text-sm font-medium text-slate-600">Failure Rate</p>
                    <p className="text-2xl font-bold text-amber-600 mt-1">{MOCK_FAILURE_RATE_PCT}%</p>
                    <p className="text-xs text-slate-500 mt-1">Failed changes</p>
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
                    <p className="text-sm font-medium text-slate-600">Unauthorized Rate</p>
                    <p className="text-2xl font-bold text-amber-600 mt-1">{MOCK_UNAUTHORIZED_RATE_PCT}%</p>
                    <p className="text-xs text-slate-500 mt-1">Not approved</p>
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
                    <p className="text-sm font-medium text-slate-600">High-Risk Change</p>
                    <p className="text-2xl font-bold text-amber-600 mt-1">{MOCK_HIGH_RISK_PCT}%</p>
                    <p className="text-xs text-slate-500 mt-1">Of total changes</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                    <ShieldAlert className="h-6 w-6 text-amber-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Second row – timing and volume */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="p-5">
                <p className="text-sm font-medium text-slate-600">MTTDCI</p>
                <p className="text-2xl font-bold text-palette-primary mt-1">{MOCK_MTTDCI_MIN}m</p>
                <p className="text-xs text-slate-500 mt-1">Mean time to detect impact</p>
              </CardContent>
            </Card>
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="p-5">
                <p className="text-sm font-medium text-slate-600">MTTMCI</p>
                <p className="text-2xl font-bold text-palette-primary mt-1">{MOCK_MTTMCI_MIN}m</p>
                <p className="text-xs text-slate-500 mt-1">Mean time to mitigate impact</p>
              </CardContent>
            </Card>
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="p-5">
                <p className="text-sm font-medium text-slate-600">Change Velocity</p>
                <p className="text-2xl font-bold text-palette-primary mt-1">{MOCK_VELOCITY_PER_WEEK}/wk</p>
                <p className="text-xs text-slate-500 mt-1">Changes per week</p>
              </CardContent>
            </Card>
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="p-5">
                <p className="text-sm font-medium text-slate-600">Emergency (7d)</p>
                <p className="text-2xl font-bold text-amber-600 mt-1">{MOCK_EMERGENCY_7D}</p>
                <p className="text-xs text-slate-500 mt-1">Planned: {MOCK_PLANNED_7D}</p>
              </CardContent>
            </Card>
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="p-5">
                <p className="text-sm font-medium text-slate-600">Change-to-Incident</p>
                <p className="text-2xl font-bold text-palette-primary mt-1">{MOCK_CHANGE_TO_INCIDENT_RATIO}</p>
                <p className="text-xs text-slate-500 mt-1">Ratio (incidents per change)</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border border-slate-200 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Activity className="h-4 w-4 text-palette-primary" />
                  Changes by Outcome (7d)
                </CardTitle>
                <p className="text-sm text-slate-500 font-normal">Success, Failed, Rolled back</p>
              </CardHeader>
              <CardContent>
                <div className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={changesByOutcome} margin={{ left: 20, right: 20 }}>
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
                  Change Success Trend (30 days)
                </CardTitle>
                <p className="text-sm text-slate-500 font-normal">Weekly success rate %</p>
              </CardHeader>
              <CardContent>
                <div className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={changeTrendData} margin={{ left: 20, right: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID_STROKE} />
                      <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                      <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                      <Tooltip formatter={(value: number) => [`${value}%`, "Success rate"]} />
                      <Line
                        type="monotone"
                        dataKey="successRate"
                        stroke={CHART_COLOR_1}
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        name="Success rate"
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
                <p className="text-sm text-slate-500 font-normal">Change and deployment alerts</p>
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
                <p className="text-xs text-slate-500 mt-4">Alerts from failed changes, emergency changes, and stability thresholds.</p>
              </CardContent>
            </Card>
            <Card className="border border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Info className="h-4 w-4 text-palette-primary" />
                  Info
                </CardTitle>
                <p className="text-sm text-slate-500 font-normal">Change scope and last run</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="text-sm font-medium text-slate-700">Scope</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Change success and failure rates, stability index, MTTDCI, MTTMCI, velocity, emergency vs planned, and change-to-incident correlation.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="text-sm font-medium text-slate-700">Last change sync</p>
                  <p className="text-sm text-slate-600 mt-1">— (connect to API)</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="text-sm font-medium text-slate-700">Next steps</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Use the Quick access tab to open Change Log, Deployments, Approval Workflows, and Reports. Link to Configuration for config changes.
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
