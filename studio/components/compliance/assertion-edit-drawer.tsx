"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Shield, X } from "lucide-react";
import { DRAWER_WIDTH_FULL } from "@/lib/drawer-sizes";
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? (typeof window !== "undefined" ? "" : "http://localhost:8000");

export interface AssertionFormData {
  control_id: string;
  assertion_name: string;
  metric_key: string;
  operator: string;
  threshold_value: string;
  evaluation_frequency: string;
  severity: string;
}

interface AssertionEditDrawerProps {
  assertion: {
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
  } | null;
  controls: Array<{ id: string; control_id: string; name: string }>;
  open: boolean;
  onClose: () => void;
  onSave: () => void;
}

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = typeof window !== "undefined" ? localStorage.getItem("refresh_token") : null;
  if (!refreshToken) return null;
  try {
    const baseUrl = API_BASE?.replace(/\/$/, "") || "";
    const res = await axios.post(`${baseUrl}/api/token/refresh/`, { refresh: refreshToken });
    localStorage.setItem("access_token", res.data.access);
    if (res.data.refresh) localStorage.setItem("refresh_token", res.data.refresh);
    return res.data.access;
  } catch {
    return null;
  }
}

async function api(method: string, url: string, data?: object): Promise<any> {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const base = API_BASE?.replace(/\/$/, "") || "";
  const fullUrl = url.startsWith("http") ? url : `${base}${url}`;
  const opts: any = { method, url: fullUrl, headers: token ? { Authorization: `Bearer ${token}` } : {} };
  if (data) opts.data = data;
  try {
    const res = await axios(opts);
    return res.data;
  } catch (err: any) {
    if (err.response?.status === 401) {
      const newToken = await refreshAccessToken();
      if (newToken) {
        opts.headers = { Authorization: `Bearer ${newToken}` };
        return (await axios(opts)).data;
      }
    }
    throw err;
  }
}

export function AssertionEditDrawer({ assertion, controls, open, onClose, onSave }: AssertionEditDrawerProps) {
  const isEdit = !!assertion;

  const [control_id, setControlId] = useState("");
  const [assertion_name, setAssertionName] = useState("");
  const [metric_key, setMetricKey] = useState("");
  const [operator, setOperator] = useState(">=");
  const [threshold_value, setThresholdValue] = useState("");
  const [evaluation_frequency, setEvaluationFrequency] = useState("daily");
  const [severity, setSeverity] = useState("medium");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetForm = useCallback(() => {
    if (assertion) {
      setControlId(assertion.control_id);
      setAssertionName(assertion.assertion_name);
      setMetricKey(assertion.metric_key);
      setOperator(assertion.operator);
      setThresholdValue(assertion.threshold_value != null ? String(assertion.threshold_value) : "");
      setEvaluationFrequency(assertion.evaluation_frequency || "daily");
      setSeverity(assertion.severity || "medium");
    } else {
      setControlId("");
      setAssertionName("");
      setMetricKey("");
      setOperator(">=");
      setThresholdValue("");
      setEvaluationFrequency("daily");
      setSeverity("medium");
    }
    setError(null);
  }, [assertion]);

  useEffect(() => {
    if (open) resetForm();
  }, [open, resetForm]);

  const handleSave = async () => {
    if (!control_id || !assertion_name.trim() || !metric_key.trim()) {
      setError("Control, Assertion, and Metric are required.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const metricKey = metric_key.trim().replace(/\s+/g, "_").toUpperCase().slice(0, 100) || "METRIC";
      if (isEdit) {
        await api("PATCH", `/api/compliance/monitoring/assertions/${assertion!.id}/`, {
          assertion_name: assertion_name.trim(),
          metric_key: metricKey,
          operator,
          threshold_value: threshold_value ? parseFloat(threshold_value) : null,
          evaluation_frequency: evaluation_frequency,
          severity,
        });
      } else {
        await api("POST", "/api/compliance/monitoring/assertions/create/", {
          control_id,
          assertion_name: assertion_name.trim(),
          metric_key: metricKey,
          operator,
          threshold_value: threshold_value ? parseFloat(threshold_value) : null,
          evaluation_frequency: evaluation_frequency,
          severity,
        });
      }
      onSave();
      onClose();
    } catch (e: any) {
      setError(e.response?.data?.error || "Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <>
      <div
        className="fixed inset-0 bg-black/20 z-40"
        style={{ top: 0, left: 0, right: 0, bottom: 0 }}
        aria-hidden
        onClick={onClose}
      />
      <aside
        className={`fixed right-0 w-full ${DRAWER_WIDTH_FULL} bg-background border-l shadow-xl z-50 flex flex-col`}
        style={{ top: 0, height: "100vh" }}
        aria-label={isEdit ? "Edit assertion" : "Add assertion"}
      >
        <div className="flex shrink-0 items-center justify-between px-4 border-b bg-background" style={{ height: "64px" }}>
          <h2 className="text-lg font-semibold">{isEdit ? `Edit: ${assertion?.assertion_name ?? "Assertion"}` : "Add assertion"}</h2>
          <button type="button" className="p-2 rounded-md hover:bg-muted" onClick={onClose} aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <Shield className="h-4 w-4" /> Control → Assertion → Metric → Threshold
            </h4>
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>
            )}
            <div className="space-y-3 text-sm">
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Control</label>
                <Select value={control_id} onValueChange={setControlId} disabled={isEdit}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Select control" />
                  </SelectTrigger>
                  <SelectContent>
                    {controls.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.control_id} — {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Assertion</label>
                <Input
                  value={assertion_name}
                  onChange={(e) => setAssertionName(e.target.value)}
                  placeholder="Assertion statement"
                  className="h-9"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Metric</label>
                <Input
                  value={metric_key}
                  onChange={(e) => setMetricKey(e.target.value)}
                  placeholder="Metric key"
                  className="h-9"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Operator</label>
                  <Select value={operator} onValueChange={setOperator}>
                    <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value=">=">≥</SelectItem>
                      <SelectItem value="<=">≤</SelectItem>
                      <SelectItem value="=">=</SelectItem>
                      <SelectItem value="!=">≠</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Threshold</label>
                  <Input
                    type="number"
                    value={threshold_value}
                    onChange={(e) => setThresholdValue(e.target.value)}
                    placeholder="e.g. 99"
                    className="h-9"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Evaluation Frequency</label>
                <Select value={evaluation_frequency} onValueChange={setEvaluationFrequency}>
                  <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="real-time">Real-time</SelectItem>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Severity</label>
                <Select value={severity} onValueChange={setSeverity}>
                  <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            <Button size="sm" onClick={handleSave} disabled={saving || !control_id || !assertion_name.trim() || !metric_key.trim()}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              {isEdit ? "Save" : "Create"}
            </Button>
            <Button variant="outline" size="sm" onClick={onClose} disabled={saving}>
              Cancel
            </Button>
          </div>
        </div>
      </aside>
    </>,
    document.body
  );
}
