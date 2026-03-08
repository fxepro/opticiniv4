"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, ArrowLeft, FileText, RefreshCw } from "lucide-react";
import { Control } from "@/lib/data/controls";
import { ControlStatusBadge } from "@/components/compliance/control-status-badge";
import { ControlSeverityBadge } from "@/components/compliance/control-severity-badge";
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? (typeof window !== "undefined" ? "" : "http://localhost:8000");

export default function ControlDetailPage() {
  const params = useParams();
  const router = useRouter();
  const controlId = params.id as string;
  const [control, setControl] = useState<Control | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshAccessToken = async (): Promise<string | null> => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) return null;
    try {
      const baseUrl = API_BASE?.replace(/\/$/, "") || "";
      const res = await axios.post(`${baseUrl}/api/token/refresh/`, { refresh: refreshToken });
      localStorage.setItem("access_token", res.data.access);
      if (res.data.refresh) localStorage.setItem("refresh_token", res.data.refresh);
      return res.data.access;
    } catch {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      return null;
    }
  };

  const makeAuthenticatedRequest = async (url: string, token: string) => {
    try {
      return await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
    } catch (err: any) {
      if (err.response?.status === 401) {
        const newToken = await refreshAccessToken();
        if (newToken) {
          return await axios.get(url, { headers: { Authorization: `Bearer ${newToken}` } });
        }
      }
      throw err;
    }
  };

  useEffect(() => {
    const fetchControl = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("access_token");
        if (!token) {
          setError("Not authenticated");
          return;
        }
        const baseUrl = API_BASE?.replace(/\/$/, "") || "";
        const response = await makeAuthenticatedRequest(
          `${baseUrl}/api/compliance/controls/${controlId}/`,
          token
        );
        const c = response.data;
        const frameworkNames = Array.isArray(c.frameworks)
          ? c.frameworks.map((f: any) => (typeof f === "string" ? f : f?.name || ""))
          : [];
        const frameworkIds = Array.isArray(c.frameworks)
          ? c.frameworks.map((f: any) => (typeof f === "object" ? f?.id : ""))
          : [];
        const requirements = Array.isArray(c.requirements)
          ? c.requirements.map((r: any) => (typeof r === "string" ? r : r?.code || ""))
          : [];
        setControl({
          id: c.id,
          controlId: c.control_id || "",
          name: c.name || "",
          description: c.description || "",
          frameworks: frameworkIds,
          frameworkNames,
          requirements,
          status: (c.status || "not_evaluated") as any,
          severity: (c.severity || "medium") as any,
          risk: c.risk_score ?? c.risk,
          owner: c.owner,
          health: c.health?.status ?? c.health,
          evidencePctComplete: c.evidence_pct_complete ?? 0,
          lastEvaluated: c.last_evaluated,
          evaluatedBy: c.evaluated_by_username,
          evaluationMethod: (c.evaluation_method || "automated") as any,
          failureReason: c.failure_reason,
          failingAssets: c.failing_assets || [],
          failingCount: c.failing_count || 0,
          evidenceCount: c.evidence_count ?? 0,
          evidenceIds: c.evidence_ids || [],
          uptimePercentage: c.uptime_percentage,
          timeOutOfCompliance: c.time_out_of_compliance,
          fixRecommendations: c.fix_recommendations || [],
          relatedControls: c.related_control_ids || [],
          category: c.category,
          controlType: (c.control_type || "preventive") as any,
          frequency: (c.frequency || "continuous") as any,
          nature: c.nature,
          implementationStatus: c.implementation_status,
          maturityLevel: c.maturity_level,
          reviewDates: c.review_dates,
        });
      } catch (err: any) {
        setError(err.response?.data?.detail || err.message || "Failed to load control");
        if (err.response?.status === 404) {
          setError("Control not found");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchControl();
  }, [controlId]);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-palette-primary mx-auto mb-4" />
          <p className="text-palette-secondary/80 font-medium">Loading control...</p>
        </div>
      </div>
    );
  }

  if (error || !control) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" asChild>
          <Link href="/workspace/compliance/controls">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Controls
          </Link>
        </Button>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{error || "Control not found"}</p>
              <Button asChild>
                <Link href="/workspace/compliance/controls">Back to Controls</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/workspace/compliance/controls">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
          </Button>
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-palette-primary" />
            <div>
              <h1 className="app-page-title font-mono">{control.controlId}</h1>
              <p className="text-palette-secondary/80 mt-1 font-medium">{control.name}</p>
            </div>
            <div className="flex gap-2">
              <ControlStatusBadge status={control.status} />
              <ControlSeverityBadge severity={control.severity} />
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Re-evaluate
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/workspace/compliance/controls/assertions?control_id=${control.id}`}>
              <Shield className="h-4 w-4 mr-2" />
              Assertions
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/workspace/compliance/evidence?control=${control.id}`}>
              <FileText className="h-4 w-4 mr-2" />
              View Evidence
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="evidence">Evidence</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        {/* Tab 1: Overview */}
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardContent className="pt-6 space-y-6">
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">Description</h3>
                <p className="text-sm text-slate-600">{control.description || "—"}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">Control Type</h3>
                  <p className="text-sm text-slate-600 capitalize">{control.controlType || "—"}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">Nature</h3>
                  <p className="text-sm text-slate-600 capitalize">{control.nature || "—"}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">Automation Status</h3>
                  <p className="text-sm text-slate-600 capitalize">{control.evaluationMethod || "—"}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">Implementation Status</h3>
                  <p className="text-sm text-slate-600 capitalize">{control.implementationStatus || "—"}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">Risk Rating</h3>
                  {typeof control.risk === "number" ? (
                    <Badge variant="outline">{control.risk}</Badge>
                  ) : (
                    <ControlSeverityBadge severity={(control.risk as any) || control.severity} />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">Maturity Level</h3>
                  <p className="text-sm text-slate-600 capitalize">{control.maturityLevel || "—"}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">Owner</h3>
                  <p className="text-sm text-slate-600">{control.owner || "—"}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-slate-800 mb-2">Frameworks</h3>
                <div className="flex flex-wrap gap-2">
                  {control.frameworkNames.map((name, idx) => (
                    <Badge key={idx} variant="outline">
                      {name}
                    </Badge>
                  ))}
                  {control.frameworkNames.length === 0 && (
                    <span className="text-sm text-slate-500">—</span>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-slate-800 mb-2">Requirements</h3>
                <div className="flex flex-wrap gap-2">
                  {(control.requirements || []).map((code, idx) => (
                    <Badge key={idx} variant="outline" className="font-mono bg-sky-50 text-sky-700 border-sky-200">
                      {code}
                    </Badge>
                  ))}
                  {(control.requirements?.length || 0) === 0 && (
                    <span className="text-sm text-slate-500">—</span>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-slate-800 mb-2">Review Dates</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-500">Last reviewed:</span>{" "}
                    {formatDate(control.reviewDates?.reviewed_at)}
                  </div>
                  <div>
                    <span className="text-slate-500">Next review due:</span>{" "}
                    {formatDate(control.reviewDates?.next_review_due_at)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 2: Evidence */}
        <TabsContent value="evidence" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-800">Evidence ({control.evidenceCount})</h3>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/workspace/compliance/evidence?control=${control.id}`}>
                    View All Evidence
                  </Link>
                </Button>
              </div>
              <p className="text-sm text-slate-600">
                Evidence completeness: <strong>{control.evidencePctComplete ?? 0}%</strong>
              </p>
              {control.evidenceCount === 0 && (
                <div className="text-center py-8 text-slate-500">
                  <FileText className="h-12 w-12 mx-auto mb-2 text-slate-300" />
                  <p>No evidence linked to this control</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 3: History */}
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8 text-slate-500">
                <p>Evaluation history coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
