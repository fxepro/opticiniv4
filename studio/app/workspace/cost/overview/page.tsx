"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle,
  BarChart3,
  Info,
  Lightbulb,
  TrendingUp,
  DollarSign,
  Gauge,
  Activity,
  CreditCard,
  Database,
  Package,
  Users,
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
import { CHART_COLOR_1, CHART_COLOR_2, CHART_COLOR_3, CHART_COLOR_4, CHART_GRID_STROKE } from "@/lib/chart-colors";

// Mock data for Cost KPIs (replace with API later)
const MOCK_TOTAL_SPEND = 84700;
const MOCK_BUDGET = 90000;
const MOCK_SPEND_VS_BUDGET_PCT = 94;
const MOCK_BUDGET_VARIANCE = -5300;
const MOCK_WASTE_COST = 4200;
const MOCK_FORECAST_NEXT = 86200;

const costByCategory = [
  { name: "Compute", value: 42, amount: 35574, color: CHART_COLOR_1 },
  { name: "Storage", value: 28, amount: 23716, color: CHART_COLOR_2 },
  { name: "Network", value: 18, amount: 15246, color: CHART_COLOR_3 },
  { name: "Other", value: 12, amount: 10164, color: CHART_COLOR_4 },
];

const costTrendData = [
  { date: "W1", amount: 18.2 },
  { date: "W2", amount: 19.1 },
  { date: "W3", amount: 21.4 },
  { date: "W4", amount: 21.0 },
  { date: "W5", amount: 21.2 },
];

const alertItems = [
  { id: 1, severity: "warning", message: "Waste detected: $4.2K idle resources. Review Waste Detection.", time: "4h ago" },
  { id: 2, severity: "info", message: "Spend at 94% of budget. Forecast next month: $86.2K.", time: "1d ago" },
  { id: 3, severity: "warning", message: "Compute spend up 12% vs last month. Check by-asset breakdown.", time: "1d ago" },
];

const quickAccessItems = [
  { title: "Spend Analysis", description: "Total spend breakdown and trends.", href: "/workspace/cost/spend-analysis", icon: BarChart3 },
  { title: "Cost by Asset", description: "Cost attribution to individual assets.", href: "/workspace/cost/by-asset", icon: Database },
  { title: "Cost by Application", description: "Cost attribution to applications and services.", href: "/workspace/cost/by-application", icon: Package },
  { title: "Cost by Team", description: "Cost by team, project, or business unit.", href: "/workspace/cost/by-team", icon: Users },
  { title: "Utilization vs Spend", description: "Compare usage to cost for optimization.", href: "/workspace/cost/utilization-vs-spend", icon: Gauge },
  { title: "Waste Detection", description: "Idle resources and optimization opportunities.", href: "/workspace/cost/waste-detection", icon: Activity },
  { title: "Forecasting", description: "Cost forecasts and projections.", href: "/workspace/cost/forecasting", icon: TrendingUp },
  { title: "Budget Monitoring", description: "Budgets, alerts, and variance.", href: "/workspace/cost/budget-monitoring", icon: CreditCard },
  { title: "Reports", description: "Cost allocation, trends, and FinOps reports.", href: "/workspace/cost/reports", icon: BarChart3 },
];

export default function CostOverviewPage() {
  const [activeTab, setActiveTab] = useState("kpi");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="app-page-title">Cost Overview</h1>
        <p className="text-muted-foreground mt-1">
          Infrastructure financial visibility (FinOps layer).
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
                    <p className="text-sm font-medium text-slate-600">Total Spend (MTD)</p>
                    <p className="text-2xl font-bold text-palette-primary mt-1">
                      ${(MOCK_TOTAL_SPEND / 1000).toFixed(1)}K
                    </p>
                    <p className="text-xs text-slate-500 mt-1">Current month</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-palette-accent-3 flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-palette-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Spend vs Budget</p>
                    <p className="text-2xl font-bold text-palette-primary mt-1">{MOCK_SPEND_VS_BUDGET_PCT}%</p>
                    <p className="text-xs text-slate-500 mt-1">Budget ${(MOCK_BUDGET / 1000).toFixed(0)}K</p>
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
                    <p className="text-sm font-medium text-slate-600">Budget Variance</p>
                    <p className="text-2xl font-bold text-green-600 mt-1">
                      ${(MOCK_BUDGET_VARIANCE / 1000).toFixed(1)}K
                    </p>
                    <p className="text-xs text-slate-500 mt-1">Under budget</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Waste / Idle Cost</p>
                    <p className="text-2xl font-bold text-amber-600 mt-1">
                      ${(MOCK_WASTE_COST / 1000).toFixed(1)}K
                    </p>
                    <p className="text-xs text-slate-500 mt-1">Optimization opportunity</p>
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
                    <p className="text-sm font-medium text-slate-600">Forecast (Next Month)</p>
                    <p className="text-2xl font-bold text-palette-primary mt-1">
                      ${(MOCK_FORECAST_NEXT / 1000).toFixed(1)}K
                    </p>
                    <p className="text-xs text-slate-500 mt-1">Projected spend</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-palette-accent-3 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-palette-primary" />
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
                  <DollarSign className="h-4 w-4 text-palette-primary" />
                  Cost by Category
                </CardTitle>
                <p className="text-sm text-slate-500 font-normal">Compute, Storage, Network, Other</p>
              </CardHeader>
              <CardContent>
                <div className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={costByCategory}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {costByCategory.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number, name: string, props: { payload: { amount: number } }) => [`${props.payload.amount.toLocaleString()}`, name]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="h-[60px]" aria-hidden />
              </CardContent>
            </Card>
            <Card className="border border-slate-200 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-palette-primary" />
                  Cost Trend (30 days)
                </CardTitle>
                <p className="text-sm text-slate-500 font-normal">Weekly spend ($K)</p>
              </CardHeader>
              <CardContent>
                <div className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={costTrendData} margin={{ left: 20, right: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID_STROKE} />
                      <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `$${v}`} />
                      <Tooltip formatter={(value: number) => [`$${value}K`, "Spend"]} />
                      <Line
                        type="monotone"
                        dataKey="amount"
                        stroke={CHART_COLOR_1}
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        name="Spend"
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
                <p className="text-sm text-slate-500 font-normal">Cost and budget alerts</p>
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
                <p className="text-xs text-slate-500 mt-4">Alerts from budget variance, waste detection, and spend thresholds.</p>
              </CardContent>
            </Card>
            <Card className="border border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Info className="h-4 w-4 text-palette-primary" />
                  Info
                </CardTitle>
                <p className="text-sm text-slate-500 font-normal">Cost scope and last sync</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="text-sm font-medium text-slate-700">Scope</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Infrastructure spend, budget vs actual, waste and idle cost, forecasting. Cost by asset, application, and team in Quick access.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="text-sm font-medium text-slate-700">Last cost sync</p>
                  <p className="text-sm text-slate-600 mt-1">— (connect to API)</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="text-sm font-medium text-slate-700">Next steps</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Use the Quick access tab to open Spend Analysis, Cost by Asset/Application/Team, Waste Detection, Forecasting, and Budget Monitoring.
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
