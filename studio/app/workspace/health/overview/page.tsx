"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Activity,
  AlertTriangle,
  Clock,
  Gauge,
  Heart,
  Info,
  Lightbulb,
  ShieldAlert,
  TrendingUp,
  Zap,
  Monitor,
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
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { CHART_COLOR_1, CHART_COLOR_2, CHART_GRID_STROKE, CHART_SEMANTIC } from "@/lib/chart-colors";

// Mock data for Health KPIs (replace with API later)
const MOCK_HEALTH_SCORE = 82;
const MOCK_AVAILABILITY_PCT = 99.2;
const MOCK_MTTD_MINUTES = 12;
const MOCK_MTTR_HOURS = 2.5;
const MOCK_IMPACT_RADIUS = 8;

const stateData = [
  { name: "Healthy", value: 68, color: CHART_SEMANTIC.success },
  { name: "Warning", value: 22, color: CHART_SEMANTIC.warning },
  { name: "Critical", value: 10, color: CHART_SEMANTIC.destructive },
];

const incidentsBySeverity = [
  { name: "Critical", count: 2 },
  { name: "High", count: 5 },
  { name: "Medium", count: 12 },
  { name: "Low", count: 7 },
];

const utilizationData = [
  { type: "CPU", value: 72 },
  { type: "Memory", value: 68 },
  { type: "Storage", value: 54 },
  { type: "Network", value: 41 },
];

const capacityRisk = [
  { horizon: "30d", risk: "Low", color: "text-green-600" },
  { horizon: "60d", risk: "Medium", color: "text-amber-600" },
  { horizon: "90d", risk: "Medium", color: "text-amber-600" },
];

const healthTrendData = [
  { date: "Day 1", score: 78 },
  { date: "Day 2", score: 79 },
  { date: "Day 3", score: 80 },
  { date: "Day 4", score: 81 },
  { date: "Day 5", score: 80 },
  { date: "Day 6", score: 82 },
  { date: "Day 7", score: 82 },
];

const alertItems = [
  { id: 1, severity: "critical", message: "2 critical incidents active. API gateway latency spike.", time: "15m ago" },
  { id: 2, severity: "warning", message: "Memory utilization > 80% on 3 nodes.", time: "1h ago" },
  { id: 3, severity: "info", message: "Health snapshot completed. Score 82.", time: "2h ago" },
];

const quickAccessItems = [
  { title: "Infrastructure Health", description: "Health status of servers, VMs, and infrastructure.", href: "/workspace/health/infrastructure", icon: Monitor },
  { title: "Service Health", description: "Status of applications and business services.", href: "/workspace/health/service-health", icon: Activity },
  { title: "Dependency Health", description: "Health of dependent systems and integrations.", href: "/workspace/health/dependency-health", icon: TrendingUp },
  { title: "Availability", description: "Uptime, SLA tracking, and availability trends.", href: "/workspace/health/availability", icon: Clock },
  { title: "Capacity", description: "Capacity usage and headroom across resources.", href: "/workspace/health/capacity", icon: Gauge },
  { title: "Resource Utilization", description: "CPU, memory, disk, and network utilization.", href: "/workspace/health/resource-utilization", icon: BarChart3 },
  { title: "Incident Signals", description: "Signals and events that may indicate incidents.", href: "/workspace/health/incident-signals", icon: Activity },
  { title: "Alerts", description: "Active alerts and alerting rules.", href: "/workspace/health/alerts", icon: AlertTriangle },
  { title: "Reports", description: "Health summaries, trends, and SLA reports.", href: "/workspace/health/reports", icon: BarChart3 },
];

export default function HealthOverviewPage() {
  const [activeTab, setActiveTab] = useState("kpi");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="app-page-title">Health Overview</h1>
        <p className="text-muted-foreground mt-1">
          Operational reliability and system vitality.
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
                    <p className="text-sm font-medium text-slate-600">Health Score</p>
                    <p className="text-2xl font-bold text-palette-primary mt-1">{MOCK_HEALTH_SCORE}</p>
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
                    <p className="text-sm font-medium text-slate-600">Availability</p>
                    <p className="text-2xl font-bold text-palette-primary mt-1">{MOCK_AVAILABILITY_PCT}%</p>
                    <p className="text-xs text-slate-500 mt-1">Service uptime</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-palette-accent-3 flex items-center justify-center">
                    <Zap className="h-6 w-6 text-palette-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">MTTD</p>
                    <p className="text-2xl font-bold text-palette-primary mt-1">{MOCK_MTTD_MINUTES}m</p>
                    <p className="text-xs text-slate-500 mt-1">Mean time to detect</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-palette-accent-3 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-palette-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">MTTR</p>
                    <p className="text-2xl font-bold text-palette-primary mt-1">{MOCK_MTTR_HOURS}h</p>
                    <p className="text-xs text-slate-500 mt-1">Mean time to resolve</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-palette-accent-3 flex items-center justify-center">
                    <Activity className="h-6 w-6 text-palette-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Impact Radius</p>
                    <p className="text-2xl font-bold text-amber-600 mt-1">{MOCK_IMPACT_RADIUS}</p>
                    <p className="text-xs text-slate-500 mt-1">Max downstream affected</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                    <ShieldAlert className="h-6 w-6 text-amber-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts row – state % and incidents */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border border-slate-200 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Heart className="h-4 w-4 text-palette-primary" />
                  Assets by Health State
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={stateData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {stateData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => `${value}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="h-[60px]" aria-hidden />
              </CardContent>
            </Card>
            <Card className="border border-slate-200 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  Active Incidents by Severity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={incidentsBySeverity} margin={{ left: 20, right: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID_STROKE} />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Bar dataKey="count" fill={CHART_COLOR_1} radius={[4, 4, 0, 0]} name="Incidents" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="h-[60px]" aria-hidden />
              </CardContent>
            </Card>
          </div>

          {/* Capacity utilization and risk */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border border-slate-200 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Activity className="h-4 w-4 text-palette-primary" />
                  Capacity Utilization by Resource Type
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={utilizationData} layout="vertical" margin={{ left: 20, right: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID_STROKE} />
                      <XAxis type="number" domain={[0, 100]} unit="%" />
                      <YAxis type="category" dataKey="type" width={70} tick={{ fontSize: 12 }} />
                      <Tooltip formatter={(value: number) => `${value}%`} />
                      <Bar dataKey="value" fill={CHART_COLOR_2} radius={[0, 4, 4, 0]} name="Utilization %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="h-[55px]" aria-hidden />
              </CardContent>
            </Card>
            <Card className="border border-slate-200 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-amber-600" />
                  Capacity Risk Forecast
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 pt-2">
                  {capacityRisk.map((row) => (
                    <div
                      key={row.horizon}
                      className="p-4 rounded-lg border border-slate-200 bg-slate-50 text-center"
                    >
                      <p className="text-sm font-medium text-slate-600">{row.horizon}</p>
                      <p className={`text-lg font-bold mt-1 ${row.color}`}>{row.risk}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-3">Risk level for capacity breach (30/60/90 days).</p>
              </CardContent>
            </Card>
          </div>

          {/* Health trend */}
          <Card className="border border-slate-200 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-palette-primary" />
                Health Trend (7 days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={healthTrendData} margin={{ left: 20, right: 20 }}>
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
              <div className="h-[65px]" aria-hidden />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6 mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  Alerts
                </CardTitle>
                <p className="text-sm text-slate-500 font-normal">Health-related alerts and incidents</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {alertItems.map((alert) => (
                    <li
                      key={alert.id}
                      className={`flex items-start gap-3 p-3 rounded-lg border ${
                        alert.severity === "critical"
                          ? "border-red-200 bg-red-50"
                          : alert.severity === "warning"
                            ? "border-amber-200 bg-amber-50"
                            : "border-slate-200 bg-slate-50"
                      }`}
                    >
                      <AlertTriangle
                        className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                          alert.severity === "critical"
                            ? "text-red-600"
                            : alert.severity === "warning"
                              ? "text-amber-600"
                              : "text-slate-500"
                        }`}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-slate-800">{alert.message}</p>
                        <p className="text-xs text-slate-500 mt-1">{alert.time}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-slate-500 mt-4">Alerts from incidents, availability, and capacity rules.</p>
              </CardContent>
            </Card>
            <Card className="border border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Info className="h-4 w-4 text-palette-primary" />
                  Info
                </CardTitle>
                <p className="text-sm text-slate-500 font-normal">Health scope and last run</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="text-sm font-medium text-slate-700">Scope</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Infrastructure and service health: asset states, incidents, capacity, availability, and dependency impact.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="text-sm font-medium text-slate-700">Last health snapshot</p>
                  <p className="text-sm text-slate-600 mt-1">— (connect to API)</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="text-sm font-medium text-slate-700">Next steps</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Use the Quick access tab to open Infrastructure Health, Capacity, Availability, and other health sections.
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
