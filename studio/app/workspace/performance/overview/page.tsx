"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Activity,
  AlertTriangle,
  Gauge,
  Info,
  Lightbulb,
  TrendingDown,
  TrendingUp,
  Zap,
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
import { CHART_COLOR_1, CHART_COLOR_2, CHART_GRID_STROKE } from "@/lib/chart-colors";

// Mock data for Performance KPIs (replace with API later)
const MOCK_PERFORMANCE_SCORE = 78;
const MOCK_ERROR_RATE_PCT = 0.4;
const MOCK_THROUGHPUT_PER_SEC = 1240;
const MOCK_PEAK_EFFICIENCY_PCT = 82;
const MOCK_SCALABILITY_RISK = 24;
const MOCK_P50_MS = 45;
const MOCK_P95_MS = 120;
const MOCK_P99_MS = 280;
const MOCK_DEGRADATION_24H = 3;
const MOCK_DEGRADATION_7D = 14;

const latencyByTier = [
  { tier: "API", p50: 42, p95: 110 },
  { tier: "DB", p50: 18, p95: 65 },
  { tier: "Cache", p50: 4, p95: 12 },
  { tier: "External", p50: 95, p95: 240 },
];

const performanceTrendData = [
  { date: "W1", score: 74 },
  { date: "W2", score: 76 },
  { date: "W3", score: 75 },
  { date: "W4", score: 77 },
  { date: "W5", score: 78 },
];

const alertItems = [
  { id: 1, severity: "warning", message: "P99 latency exceeded 250ms on API tier (3 events in 24h).", time: "1h ago" },
  { id: 2, severity: "info", message: "Performance snapshot completed. Score 78.", time: "2h ago" },
  { id: 3, severity: "warning", message: "Throughput dropped 15% during peak window.", time: "5h ago" },
];

const quickAccessItems = [
  { title: "Latency", description: "Response time and latency by tier or service.", href: "/workspace/performance/latency", icon: Activity },
  { title: "Throughput", description: "Transactions and requests per second.", href: "/workspace/performance/throughput", icon: Zap },
  { title: "Degradation Events", description: "Threshold breaches and performance anomalies.", href: "/workspace/performance/degradation", icon: AlertTriangle },
  { title: "Baselines", description: "Performance baselines and targets.", href: "/workspace/performance/baselines", icon: Gauge },
  { title: "Reports", description: "Performance trends and analysis reports.", href: "/workspace/performance/reports", icon: BarChart3 },
];

export default function PerformanceOverviewPage() {
  const [activeTab, setActiveTab] = useState("kpi");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="app-page-title">Performance Overview</h1>
        <p className="text-muted-foreground mt-1">
          Performance metrics and analysis.
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
                    <p className="text-sm font-medium text-slate-600">Performance Score</p>
                    <p className="text-2xl font-bold text-palette-primary mt-1">{MOCK_PERFORMANCE_SCORE}</p>
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
                    <p className="text-sm font-medium text-slate-600">Error Rate</p>
                    <p className="text-2xl font-bold text-palette-primary mt-1">{MOCK_ERROR_RATE_PCT}%</p>
                    <p className="text-xs text-slate-500 mt-1">Errors / total requests</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-palette-accent-3 flex items-center justify-center">
                    <TrendingDown className="h-6 w-6 text-palette-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Throughput</p>
                    <p className="text-2xl font-bold text-palette-primary mt-1">
                      {MOCK_THROUGHPUT_PER_SEC.toLocaleString()}/s
                    </p>
                    <p className="text-xs text-slate-500 mt-1">Transactions per second</p>
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
                    <p className="text-sm font-medium text-slate-600">Peak Load Efficiency</p>
                    <p className="text-2xl font-bold text-palette-primary mt-1">{MOCK_PEAK_EFFICIENCY_PCT}%</p>
                    <p className="text-xs text-slate-500 mt-1">Utilization at peak</p>
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
                    <p className="text-sm font-medium text-slate-600">Scalability Risk</p>
                    <p className="text-2xl font-bold text-amber-600 mt-1">{MOCK_SCALABILITY_RISK}</p>
                    <p className="text-xs text-slate-500 mt-1">0–100 index</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                    <AlertTriangle className="h-6 w-6 text-amber-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Second row – response time and degradation */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border border-slate-200 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Response Time (ms)</CardTitle>
                <p className="text-sm text-slate-500 font-normal">P50 / P95 / P99</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg border border-slate-200 bg-slate-50 text-center">
                    <p className="text-sm font-medium text-slate-600">P50</p>
                    <p className="text-xl font-bold text-palette-primary mt-1">{MOCK_P50_MS} ms</p>
                  </div>
                  <div className="p-4 rounded-lg border border-slate-200 bg-slate-50 text-center">
                    <p className="text-sm font-medium text-slate-600">P95</p>
                    <p className="text-xl font-bold text-palette-primary mt-1">{MOCK_P95_MS} ms</p>
                  </div>
                  <div className="p-4 rounded-lg border border-slate-200 bg-slate-50 text-center">
                    <p className="text-sm font-medium text-slate-600">P99</p>
                    <p className="text-xl font-bold text-palette-primary mt-1">{MOCK_P99_MS} ms</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-slate-200 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  Degradation Events
                </CardTitle>
                <p className="text-sm text-slate-500 font-normal">Threshold breaches and anomalies</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-lg border border-amber-200 bg-amber-50 text-center">
                    <p className="text-sm font-medium text-slate-600">Last 24h</p>
                    <p className="text-2xl font-bold text-amber-700 mt-1">{MOCK_DEGRADATION_24H}</p>
                  </div>
                  <div className="p-4 rounded-lg border border-amber-200 bg-amber-50 text-center">
                    <p className="text-sm font-medium text-slate-600">Last 7d</p>
                    <p className="text-2xl font-bold text-amber-700 mt-1">{MOCK_DEGRADATION_7D}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts row – latency by tier and trend */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border border-slate-200 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Activity className="h-4 w-4 text-palette-primary" />
                  Latency by Tier
                </CardTitle>
                <p className="text-sm text-slate-500 font-normal">P50 and P95 (ms)</p>
              </CardHeader>
              <CardContent>
                <div className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={latencyByTier} margin={{ left: 20, right: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID_STROKE} />
                      <XAxis dataKey="tier" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip formatter={(value: number) => [`${value} ms`, ""]} />
                      <Bar dataKey="p50" fill={CHART_COLOR_1} radius={[4, 4, 0, 0]} name="P50 (ms)" />
                      <Bar dataKey="p95" fill={CHART_COLOR_2} radius={[4, 4, 0, 0]} name="P95 (ms)" />
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
                  Performance Trend (30 days)
                </CardTitle>
                <p className="text-sm text-slate-500 font-normal">Weekly score</p>
              </CardHeader>
              <CardContent>
                <div className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceTrendData} margin={{ left: 20, right: 20 }}>
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
                <p className="text-sm text-slate-500 font-normal">Performance-related alerts and degradation</p>
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
                <p className="text-xs text-slate-500 mt-4">Alerts from degradation events, latency and error rate rules.</p>
              </CardContent>
            </Card>
            <Card className="border border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Info className="h-4 w-4 text-palette-primary" />
                  Info
                </CardTitle>
                <p className="text-sm text-slate-500 font-normal">Performance scope and last run</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="text-sm font-medium text-slate-700">Scope</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Infrastructure and service performance: response time, throughput, error rate, latency by tier, and degradation events.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="text-sm font-medium text-slate-700">Last metrics snapshot</p>
                  <p className="text-sm text-slate-600 mt-1">— (connect to API)</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="text-sm font-medium text-slate-700">Next steps</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Use the Quick access tab to open Latency, Throughput, Degradation, and Reports. Configure thresholds and baselines in Performance settings.
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
