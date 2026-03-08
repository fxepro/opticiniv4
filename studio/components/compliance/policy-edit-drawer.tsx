"use client";

import { useState, useEffect, useCallback } from "react";
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
import { Policy, PolicyStatus, PolicyType } from "@/lib/data/policies";
import { FileText, Loader2, Shield, ListChecks, FileCheck, X } from "lucide-react";
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? (typeof window !== "undefined" ? "" : "http://localhost:8000");

export interface PolicyFormData {
  name: string;
  description: string;
  version: string;
  type: PolicyType;
  status: PolicyStatus;
  requirementIds: string[];
  requirementCodes: string[];
  controlIds: string[];
  controlNames: string[];
  evidenceIds: string[];
  frameworkIds: string[];
  frameworkNames: string[];
  ownerDept?: string;
  evidenceRequired?: number;
}

interface PolicyEditDrawerProps {
  policy: Policy | null;
  open: boolean;
  onClose: () => void;
  onSave: (data: PolicyFormData, existingId?: string) => void;
}

interface FrameworkOption {
  id: string;
  name: string;
  code?: string;
}

interface RequirementOption {
  id: string;
  code: string;
  title: string;
  frameworkName: string;
}

interface ControlOption {
  id: string;
  control_id: string;
  name: string;
}

interface EvidenceOption {
  id: string;
  evidence_id?: string;
  name: string;
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

async function apiGet(url: string): Promise<any> {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  try {
    const res = await axios.get(url, { headers });
    return res.data;
  } catch (err: any) {
    if (err.response?.status === 401) {
      const newToken = await refreshAccessToken();
      if (newToken) {
        return (await axios.get(url, { headers: { Authorization: `Bearer ${newToken}` } })).data;
      }
    }
    throw err;
  }
}

export function PolicyEditDrawer({ policy, open, onClose, onSave }: PolicyEditDrawerProps) {
  const isEdit = !!policy;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [version, setVersion] = useState("1.0");
  const [type, setType] = useState<PolicyType>("security");
  const [status, setStatus] = useState<PolicyStatus>("draft");
  const [requirementIds, setRequirementIds] = useState<string[]>([]);
  const [controlIds, setControlIds] = useState<string[]>([]);
  const [evidenceIds, setEvidenceIds] = useState<string[]>([]);
  const [frameworkIds, setFrameworkIds] = useState<string[]>([]);
  const [ownerDept, setOwnerDept] = useState("");
  const [evidenceRequired, setEvidenceRequired] = useState("");

  const [frameworks, setFrameworks] = useState<FrameworkOption[]>([]);
  const [requirements, setRequirements] = useState<RequirementOption[]>([]);
  const [controls, setControls] = useState<ControlOption[]>([]);
  const [evidence, setEvidence] = useState<EvidenceOption[]>([]);

  const [loadingFrameworks, setLoadingFrameworks] = useState(false);
  const [loadingRequirements, setLoadingRequirements] = useState(false);
  const [loadingControls, setLoadingControls] = useState(false);
  const [loadingEvidence, setLoadingEvidence] = useState(false);
  const [saving, setSaving] = useState(false);

  const resetForm = useCallback(() => {
    if (policy) {
      setName(policy.name);
      setDescription(policy.description ?? "");
      setVersion(policy.version);
      setType(policy.type);
      setStatus(policy.status);
      setRequirementIds(policy.requirementIds ?? []);
      setControlIds(policy.controlIds ?? []);
      setEvidenceIds(policy.evidenceIds ?? []);
      setFrameworkIds(policy.frameworks ?? []);
      setOwnerDept(policy.ownerDept ?? "");
      setEvidenceRequired(policy.evidenceRequired != null ? String(policy.evidenceRequired) : "");
    } else {
      setName("");
      setDescription("");
      setVersion("1.0");
      setType("security");
      setStatus("draft");
      setRequirementIds([]);
      setControlIds([]);
      setEvidenceIds([]);
      setFrameworkIds([]);
      setOwnerDept("");
      setEvidenceRequired("");
    }
  }, [policy]);

  useEffect(() => {
    if (open) resetForm();
  }, [open, resetForm]);

  useEffect(() => {
    if (!open) return;
    setLoadingFrameworks(true);
    apiGet(`${API_BASE}/api/compliance/frameworks/catalog/`)
      .then((data: any) => {
        const list = Array.isArray(data) ? data : data?.frameworks ?? [];
        setFrameworks(list.map((f: any) => ({ id: f.id, name: f.name || f.id, code: f.code })));
      })
      .catch(() => setFrameworks([]))
      .finally(() => setLoadingFrameworks(false));
  }, [open]);

  useEffect(() => {
    if (!open || frameworkIds.length === 0) {
      setRequirements([]);
      setLoadingRequirements(false);
      return;
    }
    setLoadingRequirements(true);
    const promises = frameworkIds.map((fid) =>
      apiGet(`${API_BASE}/api/compliance/frameworks/${fid}/detail/`).catch(() => null)
    );
    Promise.all(promises).then((results) => {
      const all: RequirementOption[] = [];
      results.forEach((r, i) => {
        if (!r?.requirements) return;
        const fw = frameworks.find((f) => f.id === frameworkIds[i]);
        const fwName = fw?.name ?? frameworkIds[i];
        r.requirements.forEach((req: any) => {
          all.push({
            id: req.id,
            code: req.code ?? req.id,
            title: req.title ?? req.statement?.slice(0, 60) ?? "",
            frameworkName: fwName,
          });
        });
      });
      setRequirements(all);
    }).finally(() => setLoadingRequirements(false));
  }, [open, frameworkIds.join(","), frameworks]);

  useEffect(() => {
    if (!open) return;
    setLoadingControls(true);
    apiGet(`${API_BASE}/api/compliance/controls/`)
      .then((data: any) => {
        const list = data?.results ?? (Array.isArray(data) ? data : []);
        setControls(
          list.map((c: any) => ({
            id: c.id,
            control_id: c.control_id ?? c.id,
            name: c.name ?? c.control_id ?? c.id,
          }))
        );
      })
      .catch(() => setControls([]))
      .finally(() => setLoadingControls(false));
  }, [open]);

  useEffect(() => {
    if (!open) return;
    setLoadingEvidence(true);
    apiGet(`${API_BASE}/api/compliance/evidence/`)
      .then((data: any) => {
        const list = data?.results ?? (Array.isArray(data) ? data : []);
        setEvidence(
          list.map((e: any) => ({
            id: e.id,
            evidence_id: e.evidence_id ?? e.id,
            name: e.name ?? e.evidence_id ?? e.id,
          }))
        );
      })
      .catch(() => setEvidence([]))
      .finally(() => setLoadingEvidence(false));
  }, [open]);

  const toggleRequirement = (id: string) => {
    setRequirementIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };
  const toggleControl = (id: string) => {
    setControlIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };
  const toggleEvidence = (id: string) => {
    setEvidenceIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };
  const toggleFramework = (id: string) => {
    setFrameworkIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleSave = () => {
    if (!name.trim()) return;
    setSaving(true);
    const frameworkNames = frameworkIds
      .map((id) => frameworks.find((f) => f.id === id)?.name)
      .filter(Boolean) as string[];
    onSave(
      {
        name: name.trim(),
        description: description.trim(),
        version: version.trim() || "1.0",
        type,
        status,
        requirementIds,
        controlIds,
        evidenceIds,
        frameworkIds,
        frameworkNames,
      },
      policy?.id
    );
    setSaving(false);
    onClose();
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
        className="fixed right-0 w-full max-w-5xl bg-background border-l shadow-xl z-50 flex flex-col"
        style={{ top: 0, height: "100vh" }}
        aria-label={isEdit ? "Edit policy" : "Create policy"}
      >
        <div
          className="flex shrink-0 items-center justify-between px-4 border-b bg-background"
          style={{ height: "64px" }}
        >
          <h2 className="text-lg font-semibold">
            {isEdit ? `Edit: ${policy?.name ?? "Policy"}` : "Create policy"}
          </h2>
          <button
            type="button"
            className="p-2 rounded-md hover:bg-muted"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-1 gap-4">
            {/* Policy details */}
            <section className="rounded-lg border bg-muted/30 p-4">
              <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                <FileText className="h-4 w-4" /> Policy details
              </h4>
              <div className="space-y-3 text-sm">
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Name</label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Access Control Policy"
                    className="h-9"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Description</label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What does this policy govern?"
                    rows={3}
                    className="text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">Version</label>
                    <Input
                      value={version}
                      onChange={(e) => setVersion(e.target.value)}
                      placeholder="1.0"
                      className="h-9"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">Type</label>
                    <Select value={type} onValueChange={(v) => setType(v as PolicyType)}>
                      <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="security">Security</SelectItem>
                        <SelectItem value="data_retention">Data Retention</SelectItem>
                        <SelectItem value="incident_response">Incident Response</SelectItem>
                        <SelectItem value="ai_governance">AI Governance</SelectItem>
                        <SelectItem value="vendor_risk">Vendor Risk</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Status</label>
                  <Select value={status} onValueChange={(v) => setStatus(v as PolicyStatus)}>
                    <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="needs_review">Needs Review</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Owner dept</label>
                  <Input
                    value={ownerDept}
                    onChange={(e) => setOwnerDept(e.target.value)}
                    placeholder="e.g. Information Security"
                    className="h-9"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Evidence required (optional)</label>
                  <Input
                    value={evidenceRequired}
                    onChange={(e) => setEvidenceRequired(e.target.value)}
                    placeholder="e.g. 3 for 2/3 complete"
                    type="number"
                    min={0}
                    className="h-9"
                  />
                </div>
              </div>
            </section>

            {/* Framework requirements */}
            <section className="rounded-lg border bg-muted/30 p-4">
              <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                <Shield className="h-4 w-4" /> Framework requirements
              </h4>
              <p className="text-xs text-muted-foreground mb-3">
                Select frameworks first, then choose which requirements (SOC2 CC*, ISO clauses) this policy supports.
              </p>
              <div className="space-y-3 text-sm">
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Frameworks</label>
                  {loadingFrameworks ? (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin" /> Loading frameworks…
                    </div>
                  ) : (
                    <div className="max-h-24 overflow-y-auto rounded-md border p-2 space-y-1">
                      {frameworks.map((f) => (
                        <label key={f.id} className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground">
                          <input
                            type="checkbox"
                            checked={frameworkIds.includes(f.id)}
                            onChange={() => toggleFramework(f.id)}
                            className="rounded border-input"
                          />
                          {f.name}
                        </label>
                      ))}
                      {frameworks.length === 0 && <p className="text-xs text-muted-foreground">No frameworks available</p>}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Requirements</label>
                  {loadingRequirements ? (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin" /> Loading requirements…
                    </div>
                  ) : frameworkIds.length === 0 ? (
                    <p className="text-xs text-muted-foreground">Select frameworks above to load requirements</p>
                  ) : (
                    <div className="max-h-32 overflow-y-auto rounded-md border p-2 space-y-1">
                      {requirements.map((r) => (
                        <label key={r.id} className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground">
                          <input
                            type="checkbox"
                            checked={requirementIds.includes(r.id)}
                            onChange={() => toggleRequirement(r.id)}
                            className="rounded border-input"
                          />
                          <span className="font-mono text-xs">{r.code}</span>
                          <span className="truncate">{r.title || r.code}</span>
                          <span className="text-xs text-muted-foreground/80">({r.frameworkName})</span>
                        </label>
                      ))}
                      {requirements.length === 0 && <p className="text-xs text-muted-foreground">No requirements for selected frameworks</p>}
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Controls */}
            <section className="rounded-lg border bg-muted/30 p-4">
              <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                <ListChecks className="h-4 w-4" /> Controls
              </h4>
              <p className="text-xs text-muted-foreground mb-3">
                Controls that implement this policy (e.g. GOV-01, IAM-02, DATA-06).
              </p>
              {loadingControls ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" /> Loading controls…
                </div>
              ) : (
                <div className="max-h-32 overflow-y-auto rounded-md border p-2 space-y-1">
                  {controls.map((c) => (
                    <label key={c.id} className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground">
                      <input
                        type="checkbox"
                        checked={controlIds.includes(c.id)}
                        onChange={() => toggleControl(c.id)}
                        className="rounded border-input"
                      />
                      <span className="font-mono text-xs">{c.control_id}</span>
                      <span className="truncate">{c.name}</span>
                    </label>
                  ))}
                  {controls.length === 0 && <p className="text-xs text-muted-foreground">No controls available</p>}
                </div>
              )}
            </section>

            {/* Evidence */}
            <section className="rounded-lg border bg-muted/30 p-4">
              <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                <FileCheck className="h-4 w-4" /> Evidence
              </h4>
              <p className="text-xs text-muted-foreground mb-3">
                Evidence that proves the policy exists and is maintained (approval, review, publication).
              </p>
              {loadingEvidence ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" /> Loading evidence…
                </div>
              ) : (
                <div className="max-h-32 overflow-y-auto rounded-md border p-2 space-y-1">
                  {evidence.map((e) => (
                    <label key={e.id} className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground">
                      <input
                        type="checkbox"
                        checked={evidenceIds.includes(e.id)}
                        onChange={() => toggleEvidence(e.id)}
                        className="rounded border-input"
                      />
                      <span className="truncate">{e.name}</span>
                    </label>
                  ))}
                  {evidence.length === 0 && <p className="text-xs text-muted-foreground">No evidence available</p>}
                </div>
              )}
            </section>
          </div>
          <div className="mt-6 flex gap-2">
            <Button
              size="sm"
              className="bg-palette-accent-2 text-palette-primary hover:bg-palette-accent-3 border border-palette-accent-2"
              onClick={handleSave}
              disabled={!name.trim() || saving}
            >
              {saving ? "Saving…" : isEdit ? "Save" : "Create policy"}
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
