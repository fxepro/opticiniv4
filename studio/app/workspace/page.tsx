"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import {
  FileText,
  Activity,
  AlertTriangle,
  BarChart3,
  ExternalLink,
  Clock,
  CheckCircle,
  Loader2,
  AlertCircle,
  Package,
  Search,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AuditReport {
  id: string;
  url: string;
  audit_data?: {
    successful?: string[];
    failed?: string[];
    totalDuration?: number;
  };
  created_at: string;
}

interface MonitoredSite {
  id: string;
  url: string;
  status: 'up' | 'down' | 'checking';
}

export default function DashboardPage() {
  const { t } = useTranslation();
  const [stats, setStats] = useState({
    totalAudits: 0,
    monitoredSites: 0,
    reportsWithErrors: 0,
    uniqueSites: 0
  });
  const [reports, setReports] = useState<AuditReport[]>([]);
  const [monitoredSites, setMonitoredSites] = useState<MonitoredSite[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    setLoading(true);
    setError(null);

    // Define API_BASE at function scope so it's available throughout
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? (typeof window !== 'undefined' ? '' : 'http://localhost:8000');

    try {
      const token = localStorage.getItem('access_token');
      
      // Fetch audit reports
      let reportsData: AuditReport[] = [];
      if (token) {
        try {
          const reportsResponse = await fetch(`${API_BASE}/api/reports/`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (reportsResponse.ok) {
            reportsData = await reportsResponse.json();
            setReports(reportsData);
          }
        } catch (err) {
          console.error('Error fetching reports:', err);
        }
      }

      // Fetch monitored sites from backend API
      let sitesData: MonitoredSite[] = [];
      if (token) {
        try {
          const sitesResponse = await fetch(`${API_BASE}/api/monitor/sites/`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (sitesResponse.ok) {
            const apiSites = await sitesResponse.json();
            // Map API response to MonitoredSite interface
            sitesData = apiSites.map((site: any) => ({
              id: site.id.toString(),
              url: site.url,
              status: site.status || 'checking'
            }));
            setMonitoredSites(sitesData);
          }
        } catch (err) {
          console.error('Error fetching monitored sites:', err);
        }
      }

      // Calculate stats
      const totalAudits = reportsData.length;
      const reportsWithErrors = reportsData.filter(r => (r.audit_data?.failed?.length || 0) > 0).length;
      const uniqueSites = [...new Set(reportsData.map(r => r.url))].length;
      
      setStats({
        totalAudits,
        monitoredSites: sitesData.length,
        reportsWithErrors,
        uniqueSites
      });

      // Build alerts from failed reports and down sites
      const alertsList: any[] = [];
      
      // Add failed audit reports
      reportsData
        .filter(r => (r.audit_data?.failed?.length || 0) > 0)
        .slice(0, 5)
        .forEach(report => {
          alertsList.push({
            type: 'audit_failure',
            title: `${t('dashboard.auditFailedFor')} ${report.url}`,
            description: `${report.audit_data?.failed?.length || 0} ${t('dashboard.toolsFailed')}`,
            timestamp: report.created_at,
            url: report.url
          });
        });

      // Add down monitored sites
      sitesData
        .filter(s => s.status === 'down')
        .forEach(site => {
          alertsList.push({
            type: 'site_down',
            title: `${site.url} ${t('dashboard.siteIsDown')}`,
            description: t('dashboard.websiteOffline'),
            timestamp: new Date().toISOString(),
            url: site.url
          });
        });

      // Sort by timestamp (most recent first)
      alertsList.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      setAlerts(alertsList.slice(0, 10)); // Keep top 10

    } catch (error: any) {
      console.error('Error fetching dashboard data:', error);
      setError(error.message || t('dashboard.failedToLoad'));
    } finally {
      setLoading(false);
    }
  }

  // Get recent activity (last 5 audit reports)
  const recentActivity = reports
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12" style={{ color: "var(--rd-text-secondary)" }}>
        <Loader2 className="h-8 w-8 animate-spin" style={{ color: "var(--rd-blue-600)" }} />
        <span className="ml-2">{t("common.loading")}</span>
      </div>
    );
  }

  const statCard = (
    label: string,
    value: string | number,
    icon: React.ReactNode,
    iconBgStyle: React.CSSProperties,
    valueColor?: string
  ) => (
    <div
      className="rounded-[18px] border-[1.5px] p-6 transition-colors hover:border-[#93c5fd]"
      style={{
        background: "var(--rd-bg-white)",
        borderColor: "var(--rd-border-light)",
      }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium" style={{ color: "var(--rd-text-secondary)" }}>
            {label}
          </p>
          <p className="text-3xl font-bold" style={{ color: valueColor ?? "var(--rd-text-heading)" }}>
            {value}
          </p>
        </div>
        <div className="p-3 rounded-xl" style={iconBgStyle}>{icon}</div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8" style={{ fontFamily: "var(--rd-font-body)" }}>
      {/* Hero */}
      <section
        className="relative py-10 px-6 rounded-[18px] overflow-hidden"
        style={{
          background: "linear-gradient(160deg, var(--rd-bg-blue-wash) 0%, var(--rd-bg-white) 55%, var(--rd-blue-50) 100%)",
        }}
      >
        <div className="relative z-10">
          <div
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border mb-4"
            style={{
              borderColor: "var(--rd-blue-200)",
              background: "var(--rd-blue-50)",
              color: "var(--rd-blue-600)",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: ".09em",
              textTransform: "uppercase",
            }}
          >
            <span className="w-[6px] h-[6px] rounded-full bg-[var(--rd-blue-500)] animate-pulse" />
            Dashboard
          </div>
          <h1
            className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2"
            style={{ color: "var(--rd-text-heading)", fontFamily: "var(--rd-font-heading)" }}
          >
            Workspace Overview
          </h1>
          <p className="text-base" style={{ color: "var(--rd-text-secondary)" }}>
            Monitor audits, sites, and activity at a glance.
          </p>
        </div>
      </section>

      {/* 4 Stat Containers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCard(
          t("dashboard.reports"),
          stats.totalAudits,
          <FileText className="h-6 w-6" style={{ color: "var(--rd-blue-600)" }} />,
          { background: "var(--rd-blue-100)" }
        )}
        {statCard(
          t("monitoring.title"),
          stats.monitoredSites,
          <Activity className="h-6 w-6" style={{ color: "var(--rd-emerald-600)" }} />,
          { background: "var(--rd-bg-subtle)" }
        )}
        {statCard(
          t("monitoring.alerts"),
          stats.reportsWithErrors,
          <AlertTriangle className="h-6 w-6" style={{ color: "var(--rd-amber-500)" }} />,
          { background: "var(--rd-bg-subtle)" },
          "var(--rd-amber-500)"
        )}
        {statCard(
          t("monitoring.siteName"),
          stats.uniqueSites,
          <BarChart3 className="h-6 w-6" style={{ color: "#7c3aed" }} />,
          { background: "var(--rd-bg-subtle)" },
          "#7c3aed"
        )}
      </div>

      {/* Alerts Section */}
      <div
        className="rounded-[18px] border-[1.5px] overflow-hidden transition-colors hover:border-[#93c5fd]"
        style={{
          background: "var(--rd-bg-white)",
          borderColor: "var(--rd-border-light)",
        }}
      >
        <div className="px-6 py-4 border-b" style={{ borderColor: "var(--rd-border-light)" }}>
          <h2 className="flex items-center gap-2 font-semibold text-lg" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--rd-font-heading)" }}>
            <AlertTriangle className="h-5 w-5" style={{ color: "var(--rd-amber-500)" }} />
            {t("monitoring.alerts")}
          </h2>
        </div>
        <div className="p-6">
          {alerts.length === 0 ? (
            <div className="text-center py-8" style={{ color: "var(--rd-text-secondary)" }}>
              <CheckCircle className="h-12 w-12 mx-auto mb-3" style={{ color: "var(--rd-emerald-500)" }} />
              <p>{t("monitoring.noSites")}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {alerts.map((alert, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl"
                  style={{ background: "#fef2f2", border: "1px solid #fecaca" }}
                >
                  <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0 text-red-600" />
                  <div className="flex-1">
                    <p className="font-medium text-red-800">{alert.title}</p>
                    <p className="text-sm text-red-600">{alert.description}</p>
                    <p className="text-xs text-red-500 mt-1">
                      {new Date(alert.timestamp).toLocaleString()}
                    </p>
                  </div>
                  {alert.url && (
                    <a
                      href={`https://${alert.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-600 hover:text-red-800"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Links Section */}
      <div
        className="rounded-[18px] border-[1.5px] overflow-hidden transition-colors hover:border-[#93c5fd]"
        style={{
          background: "var(--rd-bg-white)",
          borderColor: "var(--rd-border-light)",
        }}
      >
        <div className="px-6 py-4 border-b" style={{ borderColor: "var(--rd-border-light)" }}>
          <h2 className="font-semibold text-lg" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--rd-font-heading)" }}>
            {t("dashboard.quickActions")}
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/workspace/site-audit">
              <div
                className="rounded-[14px] p-6 hover:shadow-lg transition-all cursor-pointer border-[1.5px] hover:border-[#93c5fd]"
                style={{
                  background: "linear-gradient(135deg, var(--rd-blue-600) 0%, var(--rd-blue-700) 100%)",
                  borderColor: "var(--rd-blue-400)",
                  color: "white",
                }}
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{t("dashboard.siteAudit")}</h3>
                    <p className="text-sm text-white/90">{t("dashboard.siteAuditDesc")}</p>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/workspace/monitoring">
              <div
                className="rounded-[14px] p-6 hover:shadow-lg transition-all cursor-pointer border-[1.5px] hover:border-[#93c5fd]"
                style={{
                  background: "linear-gradient(135deg, var(--rd-emerald-600) 0%, #047857 100%)",
                  borderColor: "var(--rd-emerald-500)",
                  color: "white",
                }}
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Activity className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{t("monitoring.title")}</h3>
                    <p className="text-sm text-white/90">{t("dashboard.monitoringDesc")}</p>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/workspace/reports">
              <div
                className="rounded-[14px] p-6 hover:shadow-lg transition-all cursor-pointer border-[1.5px] hover:border-[#93c5fd]"
                style={{
                  background: "linear-gradient(135deg, var(--rd-blue-600) 0%, var(--rd-blue-700) 100%)",
                  borderColor: "var(--rd-blue-400)",
                  color: "white",
                }}
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{t("dashboard.reports")}</h3>
                    <p className="text-sm text-white/90">{t("dashboard.reportsDesc")}</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Coming Soon Section */}
      <div
        className="rounded-[18px] border-[1.5px] overflow-hidden transition-colors hover:border-[#93c5fd]"
        style={{
          background: "var(--rd-bg-white)",
          borderColor: "var(--rd-border-light)",
        }}
      >
        <div className="px-6 py-4 border-b" style={{ borderColor: "var(--rd-border-light)" }}>
          <h2 className="font-semibold text-lg" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--rd-font-heading)" }}>
            {t("dashboard.comingSoon")}
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              className="rounded-[14px] p-6 transition-shadow cursor-pointer opacity-75 border-[1.5px]"
              style={{
                background: "linear-gradient(135deg, var(--rd-amber-500) 0%, #d97706 100%)",
                borderColor: "var(--rd-border-light)",
                color: "white",
              }}
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Package className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{t("dashboard.wordpressIntegration")}</h3>
                  <p className="text-sm text-white/90">{t("dashboard.connectWordpress")}</p>
                </div>
              </div>
            </div>

            <div
              className="rounded-[14px] p-6 transition-shadow cursor-pointer opacity-75 border-[1.5px]"
              style={{
                background: "linear-gradient(135deg, var(--rd-indigo-400) 0%, #6366f1 100%)",
                borderColor: "var(--rd-border-light)",
                color: "white",
              }}
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Search className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{t("dashboard.seoMonitoring")}</h3>
                  <p className="text-sm text-white/90">{t("dashboard.trackRankings")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div
        className="rounded-[18px] border-[1.5px] overflow-hidden transition-colors hover:border-[#93c5fd]"
        style={{
          background: "var(--rd-bg-white)",
          borderColor: "var(--rd-border-light)",
        }}
      >
        <div className="px-6 py-4 border-b" style={{ borderColor: "var(--rd-border-light)" }}>
          <h2 className="flex items-center gap-2 font-semibold text-lg" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--rd-font-heading)" }}>
            <Clock className="h-5 w-5" style={{ color: "var(--rd-text-secondary)" }} />
            {t("dashboard.recentActivity")}
          </h2>
        </div>
        <div className="p-6">
          {recentActivity.length === 0 ? (
            <div className="text-center py-8" style={{ color: "var(--rd-text-secondary)" }}>
              <FileText className="h-12 w-12 mx-auto mb-3" style={{ color: "var(--rd-text-muted)" }} />
              <p>{t("dashboard.noRecentActivity")}</p>
              <p className="text-sm mt-1">{t("dashboard.runAudit")}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentActivity.map((report) => {
                const successCount = report.audit_data?.successful?.length || 0;
                const failedCount = report.audit_data?.failed?.length || 0;

                return (
                  <div
                    key={report.id}
                    className="flex items-start space-x-3 p-3 rounded-xl border-[1.5px]"
                    style={{
                      background: "var(--rd-bg-subtle)",
                      borderColor: "var(--rd-border-light)",
                    }}
                  >
                    <div
                      className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                        failedCount > 0 ? "bg-red-500" : successCount > 0 ? "bg-green-500" : "bg-slate-400"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium" style={{ color: "var(--rd-text-heading)" }}>
                            {t("dashboard.auditCompleted")}{" "}
                            <a
                              href={`https://${report.url}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline"
                              style={{ color: "var(--rd-blue-600)" }}
                            >
                              {report.url}
                            </a>
                          </p>
                          <div className="flex items-center gap-2 mt-1 flex-wrap">
                            {successCount > 0 && (
                              <Badge
                                className="border-0"
                                style={{
                                  background: "var(--rd-blue-100)",
                                  color: "var(--rd-blue-700)",
                                }}
                              >
                                <CheckCircle className="h-3 w-3 mr-1" />
                                {successCount} {t("dashboard.successful")}
                              </Badge>
                            )}
                            {failedCount > 0 && (
                              <Badge
                                className="border-0"
                                style={{
                                  background: "#fef2f2",
                                  color: "#b91c1c",
                                }}
                              >
                                <AlertCircle className="h-3 w-3 mr-1" />
                                {failedCount} {t("dashboard.failed")}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <p className="text-xs mt-1" style={{ color: "var(--rd-text-muted)" }}>
                        {new Date(report.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
