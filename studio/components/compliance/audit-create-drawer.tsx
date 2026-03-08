"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileText, Loader2, X, Calendar } from "lucide-react";
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? (typeof window !== "undefined" ? "" : "http://localhost:8000");

export interface AuditFormData {
  name: string;
  description: string;
  type: string;
  startDate: string;
  endDate: string;
  scheduledStartDate: string;
  scheduledEndDate: string;
  frameworkIds: string[];
  frameworkVersionIds: string[];
}

interface AuditCreateDrawerProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: AuditFormData) => Promise<void>;
}

interface FrameworkOption {
  id: string;
  name: string;
  code?: string;
}

interface FrameworkVersionOption {
  id: string;
  version_name: string;
  framework_id: string;
}

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = typeof window !== "undefined" ? localStorage.getItem("refresh_token") : null;
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
}

async function apiRequest(method: string, url: string, data?: object): Promise<any> {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const config: any = { method, url, headers };
  if (data && method !== "GET") config.data = data;
  try {
    const res = await axios(config);
    return res.data;
  } catch (err: any) {
    if (err.response?.status === 401) {
      const newToken = await refreshAccessToken();
      if (newToken) {
        config.headers = { Authorization: `Bearer ${newToken}` };
        return (await axios(config)).data;
      }
    }
    throw err;
  }
}

export function AuditCreateDrawer({ open, onClose, onSave }: AuditCreateDrawerProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("internal");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [scheduledStartDate, setScheduledStartDate] = useState("");
  const [scheduledEndDate, setScheduledEndDate] = useState("");
  const [frameworkIds, setFrameworkIds] = useState<string[]>([]);
  const [frameworkVersionIds, setFrameworkVersionIds] = useState<string[]>([]);
  const [frameworks, setFrameworks] = useState<FrameworkOption[]>([]);
  const [frameworkVersions, setFrameworkVersions] = useState<FrameworkVersionOption[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedFrameworkId = frameworkIds[0] ?? null;
  const versionsForSelected = frameworkVersions.filter((v) => v.framework_id === selectedFrameworkId);

  useEffect(() => {
    if (open) {
      const baseUrl = API_BASE?.replace(/\/$/, "") || "";
      apiRequest("GET", `${baseUrl}/api/compliance/frameworks/catalog/`)
        .then((data: any) => {
          const list = Array.isArray(data) ? data : data?.results ?? data?.frameworks ?? [];
          setFrameworks(list.map((f: any) => ({ id: f.id, name: f.name ?? f.code ?? "", code: f.code })));
          // collect versions from catalog items if present
          const allVersions: FrameworkVersionOption[] = [];
          list.forEach((f: any) => {
            (f.versions ?? []).forEach((v: any) => {
              allVersions.push({ id: v.id, version_name: v.version_name ?? v.name ?? "", framework_id: f.id });
            });
          });
          setFrameworkVersions(allVersions);
        })
        .catch(() => { setFrameworks([]); setFrameworkVersions([]); });
      const today = new Date().toISOString().slice(0, 10);
      const nextMonth = new Date();
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      setStartDate(today);
      setEndDate(nextMonth.toISOString().slice(0, 10));
      setScheduledStartDate(today);
      setScheduledEndDate(nextMonth.toISOString().slice(0, 10));
    }
  }, [open]);

  const handleFrameworkChange = (value: string) => {
    const fwId = value === "__none__" ? null : value;
    setFrameworkIds(fwId ? [fwId] : []);
    setFrameworkVersionIds([]); // reset version when framework changes
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setType("internal");
    setFrameworkIds([]);
    setFrameworkVersionIds([]);
    setError(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim()) {
      setError("Name is required");
      return;
    }
    const start = startDate ? new Date(startDate).toISOString() : new Date().toISOString();
    try {
      setSaving(true);
      await onSave({
        name: name.trim(),
        description: description.trim(),
        type,
        startDate: start,
        endDate: endDate ? new Date(endDate).toISOString() : "",
        scheduledStartDate: scheduledStartDate ? new Date(scheduledStartDate).toISOString() : "",
        scheduledEndDate: scheduledEndDate ? new Date(scheduledEndDate).toISOString() : "",
        frameworkIds,
        frameworkVersionIds,
      });
      handleClose();
    } catch (err: any) {
      setError(err.response?.data?.detail ?? err.message ?? "Failed to create audit");
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;

  return (
    typeof document !== "undefined" &&
    createPortal(
      <>
        <div
          className="fixed inset-0 bg-black/20 z-40"
          style={{ top: 0, left: 0, right: 0, bottom: 0 }}
          aria-hidden
          onClick={handleClose}
        />
        <aside
          className="fixed right-0 w-full max-w-5xl bg-background border-l shadow-xl z-50 flex flex-col"
          style={{ top: 0, height: "100vh" }}
          aria-label="Create audit"
        >
          <div
            className="flex shrink-0 items-center justify-between px-4 border-b bg-background"
            style={{ height: "64px" }}
          >
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Create audit
            </h2>
            <button
              type="button"
              className="p-2 rounded-md hover:bg-muted"
              onClick={handleClose}
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
              {error && (
                <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {error}
                </div>
              )}

              <section className="rounded-lg border bg-muted/30 p-4">
                <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  Overview
                </h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">Name *</label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. SOC 2 Q1 2025 Audit"
                      className="h-9"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">Description</label>
                    <Textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Audit scope and objectives"
                      rows={3}
                      className="h-auto min-h-[80px]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">Type</label>
                    <Select value={type} onValueChange={setType}>
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="internal">Internal</SelectItem>
                        <SelectItem value="external">External</SelectItem>
                        <SelectItem value="readiness">Readiness</SelectItem>
                        <SelectItem value="surveillance">Surveillance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">Framework</label>
                    <Select
                      value={frameworkIds[0] ?? "__none__"}
                      onValueChange={handleFrameworkChange}
                    >
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Select framework" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="__none__">None</SelectItem>
                        {frameworks.map((f) => (
                          <SelectItem key={f.id} value={f.id}>
                            {f.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {selectedFrameworkId && versionsForSelected.length > 0 && (
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">Framework version</label>
                      <Select
                        value={frameworkVersionIds[0] ?? "__none__"}
                        onValueChange={(v) => setFrameworkVersionIds(v && v !== "__none__" ? [v] : [])}
                      >
                        <SelectTrigger className="h-9">
                          <SelectValue placeholder="Select version (optional)" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="__none__">Any version</SelectItem>
                          {versionsForSelected.map((v) => (
                            <SelectItem key={v.id} value={v.id}>
                              {v.version_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              </section>

              <section className="rounded-lg border bg-muted/30 p-4">
                <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Schedule
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="rounded-lg border-2 border-slate-300 bg-slate-100 p-3">
                    <label className="block text-xs text-muted-foreground mb-1">Start date *</label>
                    <Input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="h-9 border-slate-200 bg-white"
                    />
                  </div>
                  <div className="rounded-lg border-2 border-slate-300 bg-slate-100 p-3">
                    <label className="block text-xs text-muted-foreground mb-1">End date</label>
                    <Input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="h-9 border-slate-200 bg-white"
                    />
                  </div>
                  <div className="rounded-lg border-2 border-slate-300 bg-slate-100 p-3">
                    <label className="block text-xs text-muted-foreground mb-1">Scheduled start</label>
                    <Input
                      type="date"
                      value={scheduledStartDate}
                      onChange={(e) => setScheduledStartDate(e.target.value)}
                      className="h-9 border-slate-200 bg-white"
                    />
                  </div>
                  <div className="rounded-lg border-2 border-slate-300 bg-slate-100 p-3">
                    <label className="block text-xs text-muted-foreground mb-1">Scheduled end</label>
                    <Input
                      type="date"
                      value={scheduledEndDate}
                      onChange={(e) => setScheduledEndDate(e.target.value)}
                      className="h-9 border-slate-200 bg-white"
                    />
                  </div>
                </div>
              </section>

              <div className="flex gap-2">
                <Button
                  type="submit"
                  size="sm"
                  className="bg-palette-accent-2 text-palette-primary hover:bg-palette-accent-3 border border-palette-accent-2"
                  disabled={saving || !name.trim()}
                >
                  {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  {saving ? "Creating…" : "Create audit"}
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={handleClose} disabled={saving}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </aside>
      </>,
      document.body
    )
  );
}
