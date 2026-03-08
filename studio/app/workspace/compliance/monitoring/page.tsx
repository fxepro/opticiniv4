"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  Gauge,
  RefreshCw,
  Loader2,
  SlidersHorizontal,
  RotateCcw,
  BarChart3,
  Shield,
  Plus,
  Pencil,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AssertionEditDrawer } from "@/components/compliance/assertion-edit-drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { applyTheme } from "@/lib/theme";
import { CHART_SEMANTIC } from "@/lib/chart-colors";
import axios from "axios";
import { toast } from "sonner";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? (typeof window !== "undefined" ? "" : "http://localhost:8000");

interface DashboardData {
  assertions_count: number;
  snapshots_recent: number;
  snapshots_pass: number;
  snapshots_fail: number;
  control_health: { healthy: number; warn: number; breach: number; unknown: number; total: number };
  breaches_recent: Array<{
    id: string;
    assertion_name: string;
    control_name: string;
    measured_value: number | null;
    measured_at: string;
    source_system: string;
  }>;
}

interface Assertion {
  id: string;
  assertion_name: string;
  metric_key: string;
  operator: string;
  threshold_value: number | null;
  evaluation_frequency: string;
  severity: string;
  control_id: string;
  control_name: string;
  control_code: string;
  last_value?: number | null;
  last_status?: string | null;
  last_measured_at?: string | null;
}

interface ControlHealthItem {
  control_id: string;
  control_name: string;
  control_code: string;
  current_status: string;
  health_score: number | null;
  last_evaluated_at: string | null;
  breach_since?: string | null;
  assertions_count?: number;
  last_snapshot_at?: string | null;
}

interface Breach {
  id: string;
  assertion_name: string;
  metric_key: string;
  threshold_value: number | null;
  operator: string;
  control_name: string;
  measured_value: number | null;
  measured_at: string;
  source_system: string;
}

interface FrameworkRollup {
  framework_id: string;
  framework_name: string;
  framework_code: string;
  requirements_total: number;
  requirements_healthy: number;
  controls_total: number;
  controls_healthy: number;
}

interface Control {
  id: string;
  control_id: string;
  name: string;
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; className: string }> = {
    pass: { label: "Pass", className: "bg-green-100 text-green-800 border-green-200" },
    fail: { label: "Fail", className: "bg-red-100 text-red-800 border-red-200" },
    na: { label: "N/A", className: "bg-slate-100 text-slate-700 border-slate-200" },
    error: { label: "Error", className: "bg-amber-100 text-amber-800 border-amber-200" },
    healthy: { label: "Healthy", className: "bg-green-100 text-green-800 border-green-200" },
    warn: { label: "Warning", className: "bg-amber-100 text-amber-800 border-amber-200" },
    breach: { label: "Breach", className: "bg-red-100 text-red-800 border-red-200" },
    unknown: { label: "Unknown", className: "bg-slate-100 text-slate-600 border-slate-200" },
  };
  const c = config[status] ?? { label: status, className: "bg-slate-100 text-slate-600" };
  return <Badge variant="outline" className={c.className}>{c.label}</Badge>;
}

function formatDate(iso: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleString(undefined, { dateStyle: "short", timeStyle: "short" });
}

export default function ComplianceMonitoringPage() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [assertions, setAssertions] = useState<Assertion[]>([]);
  const [controlHealth, setControlHealth] = useState<ControlHealthItem[]>([]);
  const [breaches, setBreaches] = useState<Breach[]>([]);
  const [frameworkRollup, setFrameworkRollup] = useState<FrameworkRollup[]>([]);
  const [controls, setControls] = useState<Control[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("assertions");
  const [tuneDialog, setTuneDialog] = useState<Assertion | null>(null);
  const [overrideDialog, setOverrideDialog] = useState<Breach | null>(null);
  const [assertionDrawerOpen, setAssertionDrawerOpen] = useState(false);
  const [assertionDrawerAssertion, setAssertionDrawerAssertion] = useState<Assertion | null>(null);
  const [tuneValue, setTuneValue] = useState("");
  const [overrideStatus, setOverrideStatus] = useState<"pass" | "na">("pass");
  const [saving, setSaving] = useState(false);
  const [canOverride, setCanOverride] = useState(false);


  const getToken = () => localStorage.getItem("access_token");
  const refreshToken = async () => {
    const rt = localStorage.getItem("refresh_token");
    if (!rt) return null;
    try {
      const base = API_BASE?.replace(/\/$/, "") || "";
      const res = await axios.post(`${base}/api/token/refresh/`, { refresh: rt });
      localStorage.setItem("access_token", res.data.access);
      if (res.data.refresh) localStorage.setItem("refresh_token", res.data.refresh);
      return res.data.access;
    } catch {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      return null;
    }
  };

  const api = async (method: string, url: string, data?: object) => {
    let token = getToken();
    const base = API_BASE?.replace(/\/$/, "") || "";
    const fullUrl = url.startsWith("http") ? url : `${base}${url}`;
    const opts: any = { method, url: fullUrl, headers: { Authorization: `Bearer ${token}` } };
    if (data) opts.data = data;
    try {
      return await axios(opts);
    } catch (e: any) {
      if (e.response?.status === 401) {
        token = await refreshToken();
        if (token) {
          opts.headers.Authorization = `Bearer ${token}`;
          return await axios(opts);
        }
      }
      throw e;
    }
  };

  const fetchAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const [dashRes, assertRes, healthRes, breachRes, continuousRes, controlsRes] = await Promise.all([
        api("GET", "/api/compliance/monitoring/dashboard/"),
        api("GET", "/api/compliance/monitoring/assertions/"),
        api("GET", "/api/compliance/monitoring/control-health/"),
        api("GET", "/api/compliance/monitoring/breaches/"),
        api("GET", "/api/compliance/monitoring/continuous/"),
        api("GET", "/api/compliance/controls/"),
      ]);
      setDashboard(dashRes.data);
      setAssertions(assertRes.data);
      setControlHealth(healthRes.data);
      setBreaches(breachRes.data);
      setFrameworkRollup(continuousRes.data);
      setControls(Array.isArray(controlsRes.data) ? controlsRes.data.map((c: any) => ({ id: c.id, control_id: c.control_id, name: c.name })) : []);
      setCanOverride(true);
    } catch (e: any) {
      if (e.response?.status === 403) setCanOverride(false);
      setError(e.response?.data?.error || "Failed to load monitoring data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleTuneThreshold = async () => {
    if (!tuneDialog) return;
    setSaving(true);
    try {
      await api("PATCH", `/api/compliance/monitoring/assertions/${tuneDialog.id}/threshold/`, {
        threshold_value: parseFloat(tuneValue) || tuneDialog.threshold_value,
      });
      toast.success("Threshold updated");
      setTuneDialog(null);
      setTuneValue("");
      await fetchAll();
    } catch (e: any) {
      toast.error(e.response?.data?.error || "Failed to update threshold");
    } finally {
      setSaving(false);
    }
  };

  const handleOverride = async () => {
    if (!overrideDialog) return;
    setSaving(true);
    try {
      await api("PATCH", `/api/compliance/monitoring/snapshots/${overrideDialog.id}/override/`, {
        status: overrideStatus,
      });
      toast.success("Result overridden");
      setOverrideDialog(null);
      await fetchAll();
    } catch (e: any) {
      toast.error(e.response?.data?.error || "Failed to override result");
    } finally {
      setSaving(false);
    }
  };

  const handleAddAssertion = () => {
    setAssertionDrawerAssertion(null);
    setAssertionDrawerOpen(true);
  };

  const handleEditAssertion = (a: Assertion) => {
    setAssertionDrawerAssertion(a);
    setAssertionDrawerOpen(true);
  };

  if (loading && !dashboard) {
    return (
      <Card className={applyTheme.card()}>
        <CardContent className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-palette-primary" />
          <span className="ml-2 text-slate-600">Loading monitoring data...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="app-page-title">Compliance Monitoring</h1>
          <p className="text-muted-foreground mt-1">
            Assertions, control health, and continuous compliance. Monitor compliance signals and evidence freshness.
          </p>
          <Button variant="link" className="h-auto p-0 mt-1 text-sm" asChild>
            <Link href="/workspace/compliance/controls/assertions">
              Configure assertions →
            </Link>
          </Button>
        </div>
        <Button onClick={fetchAll} variant="outline" size="sm" disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-white border border-slate-200 p-1">
          <TabsTrigger value="assertions" className="data-[state=active]:bg-palette-primary data-[state=active]:text-white">
            Assertions
          </TabsTrigger>
          <TabsTrigger value="control-health" className="data-[state=active]:bg-palette-primary data-[state=active]:text-white">
            Control Health
          </TabsTrigger>
          <TabsTrigger value="continuous" className="data-[state=active]:bg-palette-primary data-[state=active]:text-white">
            Continuous Compliance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="assertions" className="space-y-6 mt-4">
          <Card className={applyTheme.card()}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Control Assertions</CardTitle>
                <CardDescription>
                  Measurable compliance rules per control. Add assertions to enable monitoring.
                </CardDescription>
              </div>
              <Button onClick={handleAddAssertion} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Create Assertion
              </Button>
            </CardHeader>
            <CardContent>
              {assertions.length === 0 ? (
                <div className="py-12 text-center border border-dashed border-slate-200 rounded-lg">
                  <Shield className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-600 font-medium">No assertions configured</p>
                  <p className="text-slate-500 text-sm mt-1">Add assertions to controls to enable monitoring.</p>
                  <Button onClick={handleAddAssertion} size="sm" className="mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Assertion
                  </Button>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Assertion</TableHead>
                      <TableHead>Control</TableHead>
                      <TableHead>Metric</TableHead>
                      <TableHead>Threshold</TableHead>
                      <TableHead>Last Value</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[80px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assertions.map((a) => (
                      <TableRow key={a.id}>
                        <TableCell className="font-medium">{a.assertion_name}</TableCell>
                        <TableCell>
                          <Link href={`/workspace/compliance/controls/${a.control_id}`} className="text-palette-primary hover:underline">
                            {a.control_code} — {a.control_name}
                          </Link>
                        </TableCell>
                        <TableCell className="font-mono text-xs">{a.metric_key}</TableCell>
                        <TableCell>{a.operator} {a.threshold_value != null ? `${a.threshold_value}%` : "—"}</TableCell>
                        <TableCell>{a.last_value != null ? `${a.last_value}%` : "—"}</TableCell>
                        <TableCell>{a.last_status ? <StatusBadge status={a.last_status} /> : <span className="text-slate-400">—</span>}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm" onClick={() => handleEditAssertion(a)} title="Edit assertion">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => { setTuneDialog(a); setTuneValue(String(a.threshold_value ?? "")); }} title="Tune threshold">
                              <SlidersHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          {breaches.length > 0 && (
            <Card className={applyTheme.card()}>
              <CardHeader>
                <CardTitle>Threshold Breaches</CardTitle>
                <CardDescription>Failing metrics requiring investigation</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Assertion</TableHead>
                      <TableHead>Control</TableHead>
                      <TableHead>Expected</TableHead>
                      <TableHead>Actual</TableHead>
                      <TableHead>Measured</TableHead>
                      {canOverride && <TableHead className="w-[80px]">Actions</TableHead>}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {breaches.slice(0, 20).map((b) => (
                      <TableRow key={b.id}>
                        <TableCell className="font-medium">{b.assertion_name}</TableCell>
                        <TableCell>{b.control_name}</TableCell>
                        <TableCell>{b.operator} {b.threshold_value ?? "—"}</TableCell>
                        <TableCell className="text-red-600 font-medium">{b.measured_value ?? "—"}</TableCell>
                        <TableCell>{formatDate(b.measured_at)}</TableCell>
                        {canOverride && (
                          <TableCell>
                            <Button variant="ghost" size="sm" onClick={() => { setOverrideDialog(b); setOverrideStatus("pass"); }} title="Override result">
                              <RotateCcw className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="control-health" className="space-y-6 mt-4">
          <Card className={applyTheme.card()}>
            <CardHeader>
              <CardTitle>Control Health</CardTitle>
              <CardDescription>
                Control health derives from assertion results. If any assertion fails → control is breach.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {controlHealth.length === 0 ? (
                <p className="text-slate-500 text-sm py-8 text-center">No control health records. Add assertions and run snapshots to see health.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Control</TableHead>
                      <TableHead>Health</TableHead>
                      <TableHead>Assertions</TableHead>
                      <TableHead>Last Evaluation</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {controlHealth.map((h) => (
                      <TableRow key={h.control_id}>
                        <TableCell>
                          <Link href={`/workspace/compliance/controls/${h.control_id}`} className="text-palette-primary hover:underline">
                            {h.control_code} — {h.control_name}
                          </Link>
                        </TableCell>
                        <TableCell><StatusBadge status={h.current_status} /></TableCell>
                        <TableCell>{h.assertions_count ?? 0}</TableCell>
                        <TableCell>{formatDate(h.last_evaluated_at || h.last_snapshot_at || "")}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="continuous" className="space-y-6 mt-4">
          <Card className={applyTheme.card()}>
            <CardHeader>
              <CardTitle>Continuous Compliance</CardTitle>
              <CardDescription>
                Roll up by framework. Requirement health = primary control health. Primary control fails → requirement fails.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {frameworkRollup.length === 0 ? (
                <p className="text-slate-500 text-sm py-8 text-center">No frameworks with requirements. Enable frameworks and map controls.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Framework</TableHead>
                      <TableHead>Requirements Healthy</TableHead>
                      <TableHead>Controls Healthy</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {frameworkRollup.map((r) => (
                      <TableRow key={r.framework_id}>
                        <TableCell>
                          <Link href="/workspace/compliance/frameworks" className="text-palette-primary hover:underline font-medium">
                            {r.framework_name}
                          </Link>
                          <span className="text-slate-500 text-sm ml-2">({r.framework_code})</span>
                        </TableCell>
                        <TableCell>{r.requirements_healthy} / {r.requirements_total}</TableCell>
                        <TableCell>{r.controls_healthy} / {r.controls_total}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className={applyTheme.card()}>
              <CardHeader>
                <CardTitle className="text-base">Real-time Status</CardTitle>
                <CardDescription>View current state of assertions and snapshots in the Assertions tab.</CardDescription>
              </CardHeader>
            </Card>
            <Card className={applyTheme.card()}>
              <CardHeader>
                <CardTitle className="text-base">Data Sources</CardTitle>
                <CardDescription>Metric snapshots come from connectors, scheduled jobs, API ingestion, or manual verification.</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <AssertionEditDrawer
        assertion={assertionDrawerAssertion}
        controls={controls}
        open={assertionDrawerOpen}
        onClose={() => setAssertionDrawerOpen(false)}
        onSave={fetchAll}
      />

      {/* Tune threshold dialog */}
      <Dialog open={!!tuneDialog} onOpenChange={() => setTuneDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tune Threshold</DialogTitle>
            <DialogDescription>Update the threshold value for {tuneDialog?.assertion_name}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label>Threshold value</Label>
              <Input
                type="number"
                value={tuneValue}
                onChange={(e) => setTuneValue(e.target.value)}
                placeholder={String(tuneDialog?.threshold_value ?? "")}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setTuneDialog(null)}>Cancel</Button>
            <Button onClick={handleTuneThreshold} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Override dialog */}
      <Dialog open={!!overrideDialog} onOpenChange={() => setOverrideDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Override Result</DialogTitle>
            <DialogDescription>
              Override the failing result for {overrideDialog?.assertion_name}. Mark as pass or N/A (requires compliance.edit).
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label>New status</Label>
              <Select value={overrideStatus} onValueChange={(v: "pass" | "na") => setOverrideStatus(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pass">Pass</SelectItem>
                  <SelectItem value="na">N/A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOverrideDialog(null)}>Cancel</Button>
            <Button onClick={handleOverride} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Override
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
