"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle,
  Shield,
  ShieldAlert,
  Info,
  Lightbulb,
  Lock,
  FileCheck,
  UserX,
  TrendingUp,
  Monitor,
  Cloud,
  Network,
  Activity,
  BarChart3,
  Globe,
  HardDrive,
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

// Mock data for Security KPIs (replace with API later)
const MOCK_SECURITY_SCORE = 72;
const MOCK_CRITICAL_VULNS = 2;
const MOCK_ACTIVE_THREAT_DETECTIONS = 3;
const MOCK_IDENTITY_RISK_INDEX = 31;
const MOCK_EXTERNALLY_EXPOSED_ASSETS = 18;
const MOCK_ENDPOINT_COVERAGE_PCT = 87;
const MOCK_CLOUD_MISCONFIG_COUNT = 7;
const MOCK_NETWORK_POLICY_VIOLATIONS = 5;
const MOCK_OPEN_SECURITY_INCIDENTS = 4;

const vulnsBySeverity = [
  { name: "Critical", count: 2 },
  { name: "High", count: 14 },
  { name: "Medium", count: 42 },
  { name: "Low", count: 28 },
];

const securityTrendData = [
  { date: "W1", score: 68 },
  { date: "W2", score: 70 },
  { date: "W3", score: 69 },
  { date: "W4", score: 71 },
  { date: "W5", score: 72 },
];

const alertItems = [
  { id: 1, severity: "critical", message: "2 critical vulnerabilities open. CVE-2024-XXXX requires immediate patch.", time: "2h ago" },
  { id: 2, severity: "warning", message: "3 active threat detections on edge assets.", time: "5h ago" },
  { id: 3, severity: "warning", message: "18 externally exposed assets detected. Review exposure monitoring.", time: "1d ago" },
  { id: 4, severity: "warning", message: "5 network policy violations found. Check network security.", time: "6h ago" },
  { id: 5, severity: "info", message: "Security scan completed. 7 cloud misconfigurations to review.", time: "1d ago" },
];

const quickAccessItems = [
  { title: "Vulnerabilities", description: "Known vulnerabilities and patch status.", href: "/workspace/security/vulnerabilities", icon: Shield },
  { title: "Threat Detection", description: "Detected threats and suspicious activity.", href: "/workspace/security/threat-detection", icon: ShieldAlert },
  { title: "Identity & Access", description: "Users, roles, permissions, and access reviews.", href: "/workspace/security/identity-access", icon: Lock },
  { title: "Exposure Monitoring", description: "Exposed ports, services, and attack surface.", href: "/workspace/security/exposure-monitoring", icon: Monitor },
  { title: "Endpoint Security", description: "Endpoint protection and hardening status.", href: "/workspace/security/endpoint-security", icon: Shield },
  { title: "Cloud Security Posture", description: "Cloud misconfigurations and best practices.", href: "/workspace/security/cloud-security-posture", icon: Cloud },
  { title: "Network Security", description: "Network segmentation, firewall, and traffic analysis.", href: "/workspace/security/network-security", icon: Network },
  { title: "Security Incidents", description: "Security events and incident tracking.", href: "/workspace/security/incidents", icon: Activity },
  { title: "Reports", description: "Security posture, compliance, and incident reports.", href: "/workspace/security/reports", icon: BarChart3 },
];

export default function SecurityOverviewPage() {
  const [activeTab, setActiveTab] = useState("kpi");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="app-page-title">Security Overview</h1>
        <p className="text-muted-foreground mt-1">
          Continuous security posture and exposure visibility.
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
                    <p className="text-sm font-medium text-slate-600">Global Security Score</p>
                    <p className="text-2xl font-bold text-palette-primary mt-1">{MOCK_SECURITY_SCORE}</p>
                    <p className="text-xs text-slate-500 mt-1">0–100 composite</p>
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
                    <p className="text-sm font-medium text-slate-600">Critical Vulns (Open)</p>
                    <p className="text-2xl font-bold text-red-600 mt-1">{MOCK_CRITICAL_VULNS}</p>
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
                    <p className="text-sm font-medium text-slate-600">Active Threat Detections</p>
                    <p className="text-2xl font-bold text-amber-600 mt-1">{MOCK_ACTIVE_THREAT_DETECTIONS}</p>
                    <p className="text-xs text-slate-500 mt-1">Under review</p>
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
                    <p className="text-sm font-medium text-slate-600">Identity Risk Index</p>
                    <p className="text-2xl font-bold text-palette-primary mt-1">{MOCK_IDENTITY_RISK_INDEX}</p>
                    <p className="text-xs text-slate-500 mt-1">0–100 index</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-palette-accent-3 flex items-center justify-center">
                    <UserX className="h-6 w-6 text-palette-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Externally Exposed Assets</p>
                    <p className="text-2xl font-bold text-amber-600 mt-1">{MOCK_EXTERNALLY_EXPOSED_ASSETS}</p>
                    <p className="text-xs text-slate-500 mt-1">Public-facing</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                    <Globe className="h-6 w-6 text-amber-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Second row – coverage and counts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Endpoint Coverage %</p>
                    <p className="text-2xl font-bold text-palette-primary mt-1">{MOCK_ENDPOINT_COVERAGE_PCT}%</p>
                    <p className="text-xs text-slate-500 mt-1">Protected endpoints</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-palette-accent-3 flex items-center justify-center">
                    <HardDrive className="h-6 w-6 text-palette-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Cloud Misconfig Count</p>
                    <p className="text-2xl font-bold text-amber-600 mt-1">{MOCK_CLOUD_MISCONFIG_COUNT}</p>
                    <p className="text-xs text-slate-500 mt-1">Open findings</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                    <Cloud className="h-6 w-6 text-amber-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Network Policy Violations</p>
                    <p className="text-2xl font-bold text-amber-600 mt-1">{MOCK_NETWORK_POLICY_VIOLATIONS}</p>
                    <p className="text-xs text-slate-500 mt-1">Policy breaches</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                    <Network className="h-6 w-6 text-amber-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Open Security Incidents</p>
                    <p className="text-2xl font-bold text-red-600 mt-1">{MOCK_OPEN_SECURITY_INCIDENTS}</p>
                    <p className="text-xs text-slate-500 mt-1">Active incidents</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
                    <Activity className="h-6 w-6 text-red-600" />
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
                  Open Vulnerabilities by Severity
                </CardTitle>
                <p className="text-sm text-slate-500 font-normal">Critical, High, Medium, Low</p>
              </CardHeader>
              <CardContent>
                <div className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={vulnsBySeverity} margin={{ left: 20, right: 20 }}>
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
                  Security Trend (30 days)
                </CardTitle>
                <p className="text-sm text-slate-500 font-normal">Weekly score</p>
              </CardHeader>
              <CardContent>
                <div className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={securityTrendData} margin={{ left: 20, right: 20 }}>
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
                <p className="text-sm text-slate-500 font-normal">Security-related alerts and findings</p>
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
                <p className="text-xs text-slate-500 mt-4">Alerts from vulnerabilities, threats, and misconfiguration rules.</p>
              </CardContent>
            </Card>
            <Card className="border border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Info className="h-4 w-4 text-palette-primary" />
                  Info
                </CardTitle>
                <p className="text-sm text-slate-500 font-normal">Security scope and last scan</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="text-sm font-medium text-slate-700">Scope</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Global security score, vulnerabilities, active threat detections, identity risk, externally exposed assets, endpoint coverage, cloud misconfigurations, network policy violations, and open security incidents.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="text-sm font-medium text-slate-700">Last security scan</p>
                  <p className="text-sm text-slate-600 mt-1">— (connect to API)</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="text-sm font-medium text-slate-700">Next steps</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Use the Quick access tab to open Vulnerabilities, Threat Detection, Identity & Access, and other security sections. Control Coverage links to Compliance.
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
