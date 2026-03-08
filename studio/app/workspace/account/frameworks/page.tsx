"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { BookOpen, Shield, Lock, Building2, Globe, Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? (typeof window !== "undefined" ? "" : "http://localhost:8000");

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  security: Shield,
  privacy: Lock,
  industry: Building2,
  regional: Globe,
};

interface CatalogFramework {
  id: string;
  name: string;
  code: string;
  category: string;
  description: string;
  enabled_for_org: boolean;
  total_controls: number;
  status?: string;
  compliance_score?: number;
}

export default function AccountFrameworksPage() {
  const [frameworks, setFrameworks] = useState<CatalogFramework[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const refreshAccessToken = async (): Promise<string | null> => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) return null;
    try {
      const baseUrl = API_BASE?.replace(/\/$/, "") || "";
      const res = await axios.post(`${baseUrl}/api/token/refresh/`, { refresh: refreshToken });
      const newAccessToken = res.data.access;
      localStorage.setItem("access_token", newAccessToken);
      if (res.data.refresh) localStorage.setItem("refresh_token", res.data.refresh);
      return newAccessToken;
    } catch {
      return null;
    }
  };

  const makeAuthenticatedRequest = async (url: string, token: string) => {
    try {
      return await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        const newToken = await refreshAccessToken();
        if (newToken) {
          return await axios.get(url, { headers: { Authorization: `Bearer ${newToken}` } });
        }
      }
      throw err;
    }
  };

  const makeAuthenticatedPatch = async (url: string, token: string, data: { enabled: boolean }) => {
    try {
      return await axios.patch(url, data, { headers: { Authorization: `Bearer ${token}` } });
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        const newToken = await refreshAccessToken();
        if (newToken) {
          return await axios.patch(url, data, { headers: { Authorization: `Bearer ${newToken}` } });
        }
      }
      throw err;
    }
  };

  useEffect(() => {
    const fetchCatalog = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setError("Not authenticated");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const baseUrl = API_BASE?.replace(/\/$/, "") || "";
        const res = await makeAuthenticatedRequest(`${baseUrl}/api/compliance/frameworks/catalog/`, token);
        setFrameworks(Array.isArray(res.data) ? res.data : []);
      } catch (err: unknown) {
        const msg = axios.isAxiosError(err)
          ? err.response?.data?.error || err.response?.data?.detail || err.message
          : "Failed to load frameworks";
        setError(String(msg));
        setFrameworks([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCatalog();
  }, []);

  const handleToggle = async (id: string, enabled: boolean) => {
    const token = localStorage.getItem("access_token");
    if (!token) return;
    setTogglingId(id);
    try {
      const baseUrl = API_BASE?.replace(/\/$/, "") || "";
      await makeAuthenticatedPatch(
        `${baseUrl}/api/compliance/frameworks/${id}/org-enabled/`,
        token,
        { enabled }
      );
      setFrameworks((prev) =>
        prev.map((f) => (f.id === id ? { ...f, enabled_for_org: enabled } : f))
      );
      const fw = frameworks.find((f) => f.id === id);
      toast.success(`${fw?.name || "Framework"} ${enabled ? "enabled" : "disabled"}`);
    } catch (err: unknown) {
      const msg = axios.isAxiosError(err)
        ? err.response?.data?.error || err.response?.data?.detail || err.message
        : "Failed to update";
      setError(String(msg));
      toast.error(String(msg));
    } finally {
      setTogglingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="app-page-title">Frameworks</h1>
        <p className="text-muted-foreground mt-1">
          Enable which compliance frameworks your organization uses. Only enabled frameworks appear in Compliance.
        </p>
      </div>

      {error && (
        <Card className="border-amber-200 bg-amber-50/50">
          <CardContent className="pt-4">
            <p className="text-sm text-amber-800">{error}</p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Available frameworks
          </CardTitle>
          <CardDescription>
            Turn on each framework your organization is pursuing. These will appear in the Compliance app.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {frameworks.length === 0 ? (
            <p className="text-sm text-slate-500">No frameworks in catalog.</p>
          ) : (
            <ul className="divide-y divide-slate-200">
              {frameworks.map((f) => {
                const Icon = categoryIcons[f.category as keyof typeof categoryIcons] ?? Shield;
                return (
                  <li key={f.id} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                        <Icon className="h-5 w-5 text-slate-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-slate-900 truncate">{f.name}</p>
                        <p className="text-sm text-slate-500">{f.code}</p>
                        {f.description && (
                          <p className="text-xs text-slate-400 truncate mt-0.5">{f.description}</p>
                        )}
                      </div>
                      <Badge variant="outline" className="shrink-0 text-xs capitalize">
                        {f.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-slate-500">
                        {f.enabled_for_org ? "Enabled" : "Off"}
                      </span>
                      <Switch
                        checked={f.enabled_for_org}
                        onCheckedChange={(checked) => handleToggle(f.id, checked)}
                        disabled={togglingId === f.id}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
