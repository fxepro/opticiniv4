"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Database,
  Percent,
  HelpCircle,
  UserX,
  Cloud,
  Server,
  AlertTriangle,
  Info,
  TrendingUp,
  Activity,
  Clock,
  Network,
  MapPin,
  FileText,
  Users,
  Plug,
  BarChart3,
  Lightbulb,
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
  Legend,
} from "recharts";
import { CHART_COLOR_1, CHART_COLOR_2, CHART_COLOR_3, CHART_GRID_STROKE } from "@/lib/chart-colors";

// Mock data for KPIs (replace with API later)
const MOCK_TOTAL_ASSETS = 1247;
const MOCK_COVERAGE_PCT = 87;
const MOCK_UNCLASSIFIED = 23;
const MOCK_ORPHANED = 41;
const MOCK_NEW_24H = 12;
const MOCK_NEW_7D = 68;
const MOCK_CREATED = 18;
const MOCK_MODIFIED = 34;
const MOCK_RETIRED = 5;
const MOCK_LATENCY_AVG = "2.3h";

const envData = [
  { name: "On-Prem", value: 420, color: CHART_COLOR_1 },
  { name: "Hybrid", value: 380, color: CHART_COLOR_2 },
  { name: "Cloud", value: 447, color: CHART_COLOR_3 },
];

const criticalityData = [
  { name: "Critical", count: 89 },
  { name: "High", count: 234 },
  { name: "Medium", count: 612 },
  { name: "Low", count: 312 },
];

const alertItems = [
  { id: 1, severity: "warning", message: "3 assets have not been seen in 30+ days.", time: "2h ago" },
  { id: 2, severity: "info", message: "Discovery run completed. 12 new assets found.", time: "4h ago" },
  { id: 3, severity: "warning", message: "8 orphaned assets need owner assignment.", time: "1d ago" },
];

const quickAccessItems = [
  { title: "Asset Inventory", description: "Single view of all discovered assets across environments.", href: "/workspace/discovery/asset-inventory", icon: Database },
  { title: "Network Discovery", description: "Discover and map network devices and topology.", href: "/workspace/discovery/network-discovery", icon: Network },
  { title: "Cloud Assets", description: "Discover and classify cloud resources (AWS, Azure, GCP, etc.).", href: "/workspace/discovery/cloud-assets", icon: Cloud },
  { title: "Application Mapping", description: "Map applications, services, and their relationships.", href: "/workspace/discovery/application-mapping", icon: MapPin },
  { title: "Dependency Mapping", description: "Visualize dependencies between assets and services.", href: "/workspace/discovery/dependency-mapping", icon: TrendingUp },
  { title: "Tagging & Classification", description: "Tag and classify assets for organization and filtering.", href: "/workspace/discovery/tagging", icon: FileText },
  { title: "Ownership", description: "Assign and track asset and application ownership.", href: "/workspace/discovery/ownership", icon: Users },
  { title: "Integrations", description: "Connect discovery sources and sync data.", href: "/workspace/discovery/integrations", icon: Plug },
  { title: "Reports", description: "Discovery coverage, gaps, and audit reports.", href: "/workspace/discovery/reports", icon: BarChart3 },
];

export default function DiscoveryOverviewPage() {
  const [activeTab, setActiveTab] = useState("kpi");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="app-page-title">Discovery Overview</h1>
        <p className="text-muted-foreground mt-1">
          Know what exists across local, hybrid, and cloud.
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Assets Discovered</p>
                    <p className="text-2xl font-bold text-palette-primary mt-1">{MOCK_TOTAL_ASSETS.toLocaleString()}</p>
                    <p className="text-xs text-slate-500 mt-1">By environment below</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-palette-accent-3 flex items-center justify-center">
                    <Database className="h-6 w-6 text-palette-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Asset Coverage</p>
                    <p className="text-2xl font-bold text-palette-primary mt-1">{MOCK_COVERAGE_PCT}%</p>
                    <p className="text-xs text-slate-500 mt-1">Discovered vs expected</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-palette-accent-3 flex items-center justify-center">
                    <Percent className="h-6 w-6 text-palette-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Unclassified</p>
                    <p className="text-2xl font-bold text-amber-600 mt-1">{MOCK_UNCLASSIFIED}</p>
                    <p className="text-xs text-slate-500 mt-1">Need classification</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                    <HelpCircle className="h-6 w-6 text-amber-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Orphaned Assets</p>
                    <p className="text-2xl font-bold text-orange-600 mt-1">{MOCK_ORPHANED}</p>
                    <p className="text-xs text-slate-500 mt-1">No owner assigned</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                    <UserX className="h-6 w-6 text-orange-600" />
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
                  <Cloud className="h-4 w-4 text-palette-primary" />
                  Assets by Environment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={envData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {envData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => value.toLocaleString()} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="h-[60px]" aria-hidden />
              </CardContent>
            </Card>
            <Card className="border border-slate-200 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Server className="h-4 w-4 text-palette-primary" />
                  Assets by Criticality Tier
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={criticalityData} layout="vertical" margin={{ left: 20, right: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID_STROKE} />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="name" width={70} tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Bar dataKey="count" fill={CHART_COLOR_1} radius={[0, 4, 4, 0]} name="Assets" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="h-[60px]" aria-hidden />
              </CardContent>
            </Card>
          </div>

          {/* Second row – recency & lifecycle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="p-5">
                <p className="text-sm font-medium text-slate-600">Newly Discovered</p>
                <div className="flex items-baseline gap-3 mt-2">
                  <span className="text-xl font-bold text-palette-primary">{MOCK_NEW_24H}</span>
                  <span className="text-slate-500 text-sm">24h</span>
                  <span className="text-slate-300">|</span>
                  <span className="text-xl font-bold text-palette-primary">{MOCK_NEW_7D}</span>
                  <span className="text-slate-500 text-sm">7d</span>
                </div>
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" /> First seen in period
                </p>
              </CardContent>
            </Card>
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="p-5">
                <p className="text-sm font-medium text-slate-600">Lifecycle Events (7d)</p>
                <div className="grid grid-cols-3 gap-2 mt-2 text-center">
                  <div>
                    <p className="text-lg font-bold text-green-600">{MOCK_CREATED}</p>
                    <p className="text-xs text-slate-500">Created</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-blue-600">{MOCK_MODIFIED}</p>
                    <p className="text-xs text-slate-500">Modified</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-slate-500">{MOCK_RETIRED}</p>
                    <p className="text-xs text-slate-500">Retired</p>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                  <Activity className="h-3 w-3" /> Created / modified / retired
                </p>
              </CardContent>
            </Card>
            <Card className="border border-slate-200 shadow-sm lg:col-span-2">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Discovery Latency (avg)</p>
                    <p className="text-2xl font-bold text-palette-primary mt-1">{MOCK_LATENCY_AVG}</p>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                      <Clock className="h-3 w-3" /> Time from asset creation to detection
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-palette-accent-3 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-palette-primary" />
                  </div>
                </div>
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
                <p className="text-sm text-slate-500 font-normal">Discovery-related alerts and notifications</p>
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
                <p className="text-xs text-slate-500 mt-4">Alerts will be populated from discovery runs and thresholds.</p>
              </CardContent>
            </Card>
            <Card className="border border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Info className="h-4 w-4 text-palette-primary" />
                  Info
                </CardTitle>
                <p className="text-sm text-slate-500 font-normal">Discovery scope and last run</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="text-sm font-medium text-slate-700">Scope</p>
                  <p className="text-sm text-slate-600 mt-1">
                    On-prem, hybrid, and cloud environments. Data is refreshed from the latest discovery run.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="text-sm font-medium text-slate-700">Last discovery run</p>
                  <p className="text-sm text-slate-600 mt-1">— (connect to API)</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="text-sm font-medium text-slate-700">Next steps</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Use the Quick access tab to open Asset Inventory, Network Discovery, Cloud Assets, and other discovery sections.
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
                Insights and recommendations from discovery data
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                <p className="text-sm text-slate-600">
                  Intelligence content will show insights, recommendations, and analysis derived from discovery data (e.g. coverage gaps, anomaly detection, optimization suggestions). Connect to your intelligence or analytics API when ready.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
