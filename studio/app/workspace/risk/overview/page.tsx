"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle,
  ShieldAlert,
  Info,
  Lightbulb,
  TrendingUp,
  Gauge,
  Target,
  BarChart3,
  FileWarning,
  Layers,
  PieChart as PieChartIcon,
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

// Mock data for Risk KPIs (replace with API later)
const MOCK_ENTERPRISE_RISK_SCORE = 68;
const MOCK_CRITICAL_RISKS = 3;
const MOCK_HIGH_RISKS = 12;
const MOCK_HIGH_RISK_ASSET_PCT = 18;
const MOCK_AVG_ASSET_RISK_SCORE = 42;
const MOCK_REMEDIATION_SLA_PCT = 85;
const MOCK_RISK_VOLATILITY = 4.2;

const risksBySeverity = [
  { name: "Critical", count: 3 },
  { name: "High", count: 12 },
  { name: "Medium", count: 34 },
  { name: "Low", count: 28 },
];

const risksByCategory = [
  { name: "Security", value: 38, color: CHART_COLOR_1 },
  { name: "Operational", value: 28, color: CHART_COLOR_2 },
  { name: "Compliance", value: 22, color: CHART_COLOR_3 },
  { name: "Financial", value: 12, color: CHART_COLOR_4 },
];

const riskTrendData = [
  { date: "W1", score: 72 },
  { date: "W2", score: 70 },
  { date: "W3", score: 69 },
  { date: "W4", score: 68 },
  { date: "W5", score: 68 },
];

const alertItems = [
  { id: 1, severity: "critical", message: "3 critical risks open. 1 exceeds remediation SLA.", time: "1h ago" },
  { id: 2, severity: "warning", message: "High-risk asset % increased to 18%. Review asset risk scores.", time: "4h ago" },
  { id: 3, severity: "info", message: "Risk assessment completed. Enterprise score 68.", time: "1d ago" },
];

const quickAccessItems = [
  { title: "Risk Register", description: "View and manage all identified risks.", href: "/workspace/risk/register", icon: FileWarning },
  { title: "Risk Assessments", description: "Run and review risk assessments.", href: "/workspace/risk/assessments", icon: Gauge },
  { title: "Risk by Asset", description: "Asset-level risk scores and exposure.", href: "/workspace/risk/by-asset", icon: Layers },
  { title: "Remediation Tracking", description: "Track risk remediation and SLA compliance.", href: "/workspace/risk/remediation", icon: Target },
  { title: "Risk Trends", description: "Historical risk scores and volatility.", href: "/workspace/risk/trends", icon: TrendingUp },
  { title: "Risk Categories", description: "Risks by category and severity.", href: "/workspace/risk/categories", icon: PieChartIcon },
  { title: "Alerts & Exceptions", description: "Risk alerts and SLA exceptions.", href: "/workspace/risk/alerts", icon: AlertTriangle },
  { title: "Reports", description: "Risk posture and executive reports.", href: "/workspace/risk/reports", icon: BarChart3 },
];

export default function RiskOverviewPage() {
  const [activeTab, setActiveTab] = useState("kpi");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="app-page-title">Risk Overview</h1>
        <p className="text-muted-foreground mt-1">
          Enterprise risk posture, exposure, and remediation visibility.
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
                    <p className="text-sm font-medium text-slate-600">Enterprise Risk Score</p>
                    <p className="text-2xl font-bold text-palette-primary mt-1">{MOCK_ENTERPRISE_RISK_SCORE}</p>
                    <p className="text-xs text-slate-500 mt-1">0–100 (lower is better)</p>
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
                    <p className="text-sm font-medium text-slate-600">Critical Risks (Open)</p>
                    <p className="text-2xl font-bold text-red-600 mt-1">{MOCK_CRITICAL_RISKS}</p>
                    <p className="text-xs text-slate-500 mt-1">Require immediate action</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
                    <ShieldAlert className="h-6 w-6 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">High Risks (Open)</p>
                    <p className="text-2xl font-bold text-amber-600 mt-1">{MOCK_HIGH_RISKS}</p>
                    <p className="text-xs text-slate-500 mt-1">Remediate within SLA</p>
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
                    <p className="text-sm font-medium text-slate-600">High-Risk Asset %</p>
                    <p className="text-2xl font-bold text-palette-primary mt-1">{MOCK_HIGH_RISK_ASSET_PCT}%</p>
                    <p className="text-xs text-slate-500 mt-1">Assets above threshold</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-palette-accent-3 flex items-center justify-center">
                    <Layers className="h-6 w-6 text-palette-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Remediation SLA %</p>
                    <p className="text-2xl font-bold text-palette-primary mt-1">{MOCK_REMEDIATION_SLA_PCT}%</p>
                    <p className="text-xs text-slate-500 mt-1">Risks remediated on time</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-palette-accent-3 flex items-center justify-center">
                    <Target className="h-6 w-6 text-palette-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Second row – avg score and volatility */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="p-5">
                <p className="text-sm font-medium text-slate-600">Average Asset Risk Score</p>
                <p className="text-2xl font-bold text-palette-primary mt-1">{MOCK_AVG_ASSET_RISK_SCORE}</p>
                <p className="text-xs text-slate-500 mt-1">Mean across all assets (0–100)</p>
              </CardContent>
            </Card>
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="p-5">
                <p className="text-sm font-medium text-slate-600">Risk Score Volatility</p>
                <p className="text-2xl font-bold text-palette-primary mt-1">{MOCK_RISK_VOLATILITY}%</p>
                <p className="text-xs text-slate-500 mt-1">30-day period-over-period change</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border border-slate-200 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <PieChartIcon className="h-4 w-4 text-palette-primary" />
                  Risks by Category
                </CardTitle>
                <p className="text-sm text-slate-500 font-normal">Security, Operational, Compliance, Financial</p>
              </CardHeader>
              <CardContent>
                <div className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={risksByCategory}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {risksByCategory.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => [`${value}%`, ""]} />
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
                  Open Risks by Severity
                </CardTitle>
                <p className="text-sm text-slate-500 font-normal">Critical, High, Medium, Low</p>
              </CardHeader>
              <CardContent>
                <div className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={risksBySeverity} margin={{ left: 20, right: 20 }}>
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
          </div>

          {/* Risk trend */}
          <Card className="border border-slate-200 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-palette-primary" />
                Risk Trend (30 days)
              </CardTitle>
              <p className="text-sm text-slate-500 font-normal">Weekly enterprise risk score (lower is better)</p>
            </CardHeader>
            <CardContent>
              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={riskTrendData} margin={{ left: 20, right: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID_STROKE} />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} reversed />
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
                <p className="text-sm text-slate-500 font-normal">Risk-related alerts and SLA exceptions</p>
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
                <p className="text-xs text-slate-500 mt-4">Alerts from risk register, SLA breaches, and assessments.</p>
              </CardContent>
            </Card>
            <Card className="border border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Info className="h-4 w-4 text-palette-primary" />
                  Info
                </CardTitle>
                <p className="text-sm text-slate-500 font-normal">Risk scope and last assessment</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="text-sm font-medium text-slate-700">Scope</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Enterprise and asset-level risk scores, open risks by severity and category, remediation SLA compliance, and risk trend. Links to Security, Compliance, and Change where relevant.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="text-sm font-medium text-slate-700">Last risk assessment</p>
                  <p className="text-sm text-slate-600 mt-1">— (connect to API)</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="text-sm font-medium text-slate-700">Next steps</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Use the Quick access tab to open the Risk Register, Assessments, Remediation Tracking, and Reports.
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
