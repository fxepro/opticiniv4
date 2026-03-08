"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FileText,
  LayoutDashboard,
  Activity,
  MapPin,
  Clock,
  Users,
  Package,
  BarChart3,
  Gauge,
  AlertTriangle,
  Info,
  Lightbulb,
  FileCheck,
  TrendingUp,
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
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { CHART_COLOR_1, CHART_COLOR_2, CHART_GRID_STROKE } from "@/lib/chart-colors";

// Mock data for Evidence KPIs (replace with API later)
const MOCK_EVIDENCE_COVERAGE_PCT = 85;
const MOCK_MISSING_EVIDENCE = 18;
const MOCK_EXPIRED_EVIDENCE_PCT = 4;
const MOCK_AUDIT_READINESS = 82;
const MOCK_FRESHNESS_PCT = 94;
const MOCK_MANUAL_PCT = 35;
const MOCK_AUTOMATED_PCT = 65;

const evidenceBySource = [
  { name: "Automated", value: 65, color: CHART_COLOR_1 },
  { name: "Manual", value: 35, color: CHART_COLOR_2 },
];

const evidenceTrendData = [
  { date: "W1", coverage: 80 },
  { date: "W2", coverage: 82 },
  { date: "W3", coverage: 83 },
  { date: "W4", coverage: 84 },
  { date: "W5", coverage: 85 },
];

const alertItems = [
  { id: 1, severity: "warning", message: "18 requirements missing evidence. Map or collect evidence.", time: "2h ago" },
  { id: 2, severity: "info", message: "Evidence scan completed. Coverage 85%.", time: "1d ago" },
  { id: 3, severity: "warning", message: "4% of evidence items expired. Renew or replace.", time: "1d ago" },
];

const quickAccessItems = [
  { title: "Evidence Library", description: "Central store of collected evidence artifacts.", href: "/workspace/evidence/library", icon: FileText },
  { title: "Automated Collection", description: "Evidence gathered automatically from tools and scans.", href: "/workspace/evidence/automated-collection", icon: Activity },
  { title: "Manual Uploads", description: "Manually uploaded documents and attestations.", href: "/workspace/evidence/manual-uploads", icon: FileText },
  { title: "Evidence Mapping", description: "Mapping of evidence to controls and requirements.", href: "/workspace/evidence/mapping", icon: MapPin },
  { title: "Version History", description: "History and versions of evidence items.", href: "/workspace/evidence/version-history", icon: Clock },
  { title: "Expiration Tracking", description: "Expiration dates and renewal reminders.", href: "/workspace/evidence/expiration-tracking", icon: Clock },
  { title: "Ownership", description: "Owners and custodians of evidence items.", href: "/workspace/evidence/ownership", icon: Users },
  { title: "Audit Packages", description: "Packaged evidence sets for audits.", href: "/workspace/evidence/audit-packages", icon: Package },
  { title: "Reports", description: "Evidence coverage, gaps, and audit reports.", href: "/workspace/evidence/reports", icon: BarChart3 },
];

export default function EvidenceOverviewPage() {
  const [activeTab, setActiveTab] = useState("kpi");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <LayoutDashboard className="h-6 w-6 text-palette-primary" />
        <div>
          <h1 className="app-page-title">Evidence Overview</h1>
          <p className="text-muted-foreground mt-1">
            Automated audit proof and artifact management.
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Evidence Coverage</p>
                    <p className="text-2xl font-bold text-palette-primary mt-1">{MOCK_EVIDENCE_COVERAGE_PCT}%</p>
                    <p className="text-xs text-slate-500 mt-1">Requirements with evidence</p>
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
                    <p className="text-sm font-medium text-slate-600">Evidence Freshness</p>
                    <p className="text-2xl font-bold text-palette-primary mt-1">{MOCK_FRESHNESS_PCT}%</p>
                    <p className="text-xs text-slate-500 mt-1">Within policy window</p>
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
                    <p className="text-sm font-medium text-slate-600">Missing Evidence</p>
                    <p className="text-2xl font-bold text-amber-600 mt-1">{MOCK_MISSING_EVIDENCE}</p>
                    <p className="text-xs text-slate-500 mt-1">Requirements without evidence</p>
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
                    <p className="text-sm font-medium text-slate-600">Manual vs Automated</p>
                    <p className="text-2xl font-bold text-palette-primary mt-1">{MOCK_MANUAL_PCT}% / {MOCK_AUTOMATED_PCT}%</p>
                    <p className="text-xs text-slate-500 mt-1">Manual | Automated</p>
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
                  <FileText className="h-4 w-4 text-palette-primary" />
                  Evidence by Source
                </CardTitle>
                <p className="text-sm text-slate-500 font-normal">Automated vs manual</p>
              </CardHeader>
              <CardContent>
                <div className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={evidenceBySource}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {evidenceBySource.map((entry, index) => (
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
                  <TrendingUp className="h-4 w-4 text-palette-primary" />
                  Evidence Coverage Trend (30 days)
                </CardTitle>
                <p className="text-sm text-slate-500 font-normal">Weekly coverage %</p>
              </CardHeader>
              <CardContent>
                <div className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={evidenceTrendData} margin={{ left: 20, right: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID_STROKE} />
                      <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                      <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                      <Tooltip formatter={(value: number) => [`${value}%`, "Coverage"]} />
                      <Line
                        type="monotone"
                        dataKey="coverage"
                        stroke={CHART_COLOR_1}
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        name="Coverage"
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
                <p className="text-sm text-slate-500 font-normal">Evidence and coverage alerts</p>
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
                <p className="text-xs text-slate-500 mt-4">Alerts from missing evidence, expired evidence, and coverage scans.</p>
              </CardContent>
            </Card>
            <Card className="border border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Info className="h-4 w-4 text-palette-primary" />
                  Info
                </CardTitle>
                <p className="text-sm text-slate-500 font-normal">Evidence scope and last scan</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="text-sm font-medium text-slate-700">Scope</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Evidence coverage, missing and expired evidence, audit readiness, freshness, and manual vs automated ratio. Links to Compliance for control mapping.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="text-sm font-medium text-slate-700">Last evidence scan</p>
                  <p className="text-sm text-slate-600 mt-1">— (connect to API)</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="text-sm font-medium text-slate-700">Next steps</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Use the Quick access tab to open Evidence Library, Automated Collection, Manual Uploads, Mapping, and Reports. For control-level evidence, see Compliance → Evidence.
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
