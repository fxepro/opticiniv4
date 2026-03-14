"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ClipboardList, Users, BookOpen, FlaskConical, CheckCircle2,
  ChevronRight, ChevronLeft, Plus, X, Loader2, Check,
  Building2, MapPin, Calendar, ShieldCheck, FileText, Activity, Layers,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "sonner";
import { getApiBaseUrl } from "@/lib/api-config";

function getToken(): string | null {
  return typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
}
function authHeaders() {
  return { Authorization: `Bearer ${getToken()}`, "Content-Type": "application/json" };
}

async function refreshToken(): Promise<string | null> {
  const refresh = typeof window !== "undefined" ? localStorage.getItem("refresh_token") : null;
  if (!refresh) return null;
  try {
    const base = getApiBaseUrl().replace(/\/$/, "");
    const res = await fetch(`${base}/api/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.access) {
      localStorage.setItem("access_token", data.access);
      if (data.refresh) localStorage.setItem("refresh_token", data.refresh);
      return data.access;
    }
    return null;
  } catch {
    return null;
  }
}

async function apiGet(url: string): Promise<unknown> {
  let res = await fetch(url, { headers: authHeaders() });
  if (res.status === 401) {
    const newToken = await refreshToken();
    if (newToken) {
      res = await fetch(url, { headers: { Authorization: `Bearer ${newToken}`, "Content-Type": "application/json" } });
    }
  }
  if (!res.ok) throw new Error(`${res.status}`);
  return res.json();
}
async function apiPost(url: string, body: unknown): Promise<unknown> {
  let res = await fetch(url, { method: "POST", headers: authHeaders(), body: JSON.stringify(body) });
  if (res.status === 401) {
    const newToken = await refreshToken();
    if (newToken) {
      res = await fetch(url, {
        method: "POST",
        headers: { Authorization: `Bearer ${newToken}`, "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    }
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.detail || err?.error || `${res.status}`);
  }
  return res.json();
}

// ---------------------------------------------------------------------------
// Quarter helpers
// ---------------------------------------------------------------------------
function currentQuarterStart(fiscalStartMonth = 1): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // 1-based
  // Adjust for fiscal year offset
  const fiscalMonth = ((month - fiscalStartMonth + 12) % 12);
  const qOffset = Math.floor(fiscalMonth / 3) * 3;
  const qStart = new Date(year, (fiscalStartMonth - 1 + qOffset) % 12, 1);
  if (qStart > now) qStart.setFullYear(qStart.getFullYear() - 1);
  return qStart.toISOString().slice(0, 10);
}

function buildQuarters(fiscalStartMonth = 1): { label: string; start: string; end: string }[] {
  const now = new Date();
  const quarters = [];
  for (let q = 0; q < 4; q++) {
    const startMonth = (fiscalStartMonth - 1 + q * 3) % 12;
    const endMonth = (startMonth + 2) % 12;
    const year = now.getFullYear();
    const start = new Date(year, startMonth, 1);
    const end = new Date(year, endMonth + 1, 0);
    quarters.push({
      label: `Q${q + 1} ${year}`,
      start: start.toISOString().slice(0, 10),
      end: end.toISOString().slice(0, 10),
    });
  }
  return quarters;
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface OrgInfo {
  name: string; industry: string; jurisdiction_country: string;
  data_residency_region: string; fiscal_year_start_month: number;
  primary_contact_name: string; primary_contact_email: string;
}
interface OrgRegion { id: string; name: string; city: string; country_name: string; country_code: string; region_group: string }
interface Department { id: string; name: string }
interface FrameworkVersionStats {
  version_id: string; version_name: string; version_code: string; effective_date: string | null;
  requirements: number; mapped_controls: number; primary_coverage_pct: number;
  policies_available: number; assertions_available: number;
  requirement_groups: { code: string; count: number }[];
}
interface FrameworkWithVersions {
  framework_id: string; framework_name: string; framework_code: string;
  versions: FrameworkVersionStats[];
}
interface Personnel { id: string; first_name: string; last_name: string; job_title: string; department: string; role?: string; user_id?: number | null }
interface OrgTeam { id: string; name: string; member_ids: string[] }
interface Control { id: string; control_id: string; name: string; frameworks: { id: string; name: string }[] }

interface TeamMember { personnel_id: string; name: string; job_title: string; role: string; system_role?: string }
interface TestPlan { control_id: string; control_code: string; control_name: string; owner_personnel_id: string; owner_name: string }
interface SelectedFramework {
  framework_id: string; framework_name: string; framework_code: string;
  version_id: string; version_name: string;
  scope_mode: "full" | "groups" | "custom";
  selected_groups: string[];
  stats: FrameworkVersionStats | null;
}

interface SetupData {
  name: string; objective: string; type: string;
  start_date: string; end_date: string;
  region: string; business_unit: string;
}

const AUDIT_TYPES = [
  { value: "internal", label: "Internal" },
  { value: "external", label: "External" },
  { value: "readiness", label: "Readiness" },
  { value: "surveillance", label: "Surveillance" },
];

const AUDITOR_ROLES = [
  { value: "lead_auditor", label: "Lead Auditor" },
  { value: "auditor", label: "Auditor" },
  { value: "reviewer", label: "Reviewer" },
  { value: "observer", label: "Observer" },
  { value: "compliance_owner", label: "Compliance Owner" },
];

/** System roles from role matrix (UserProfile.ROLE_CHOICES). */
const SYSTEM_ROLES = [
  { value: "admin", label: "Admin" },
  { value: "agency", label: "Agency" },
  { value: "executive", label: "Executive" },
  { value: "director", label: "Director" },
  { value: "manager", label: "Manager" },
  { value: "analyst", label: "Analyst" },
  { value: "auditor", label: "Auditor" },
  { value: "viewer", label: "Viewer" },
];

/** Role-driven slots for the Team tab. Defines structure, required/optional, and recommended system role. */
const TEAM_ROLE_SLOTS = [
  { role: "lead_auditor", label: "Lead Auditor", required: true, recommended_system_role: "director" },
  { role: "auditor", label: "Auditor", required: true, recommended_system_role: "analyst" },
  { role: "reviewer", label: "Reviewer", required: false, recommended_system_role: "analyst" },
  { role: "compliance_owner", label: "Compliance Owner", required: false, recommended_system_role: "manager" },
];

const STEPS = [
  { id: 1, label: "Setup", icon: ClipboardList },
  { id: 2, label: "Frameworks", icon: BookOpen },
  { id: 3, label: "Team", icon: Users },
  { id: 4, label: "Controls", icon: FlaskConical },
  { id: 5, label: "Review", icon: CheckCircle2 },
];

// ---------------------------------------------------------------------------
// Live Preview Panel (right half — always visible in step 1)
// ---------------------------------------------------------------------------
function SetupPreview({ data, org, regions, departments }: {
  data: SetupData;
  org: OrgInfo | null;
  regions: OrgRegion[];
  departments: Department[];
}) {
  const typeLabel = AUDIT_TYPES.find(t => t.value === data.type)?.label ?? data.type;
  const regionLabel = regions.find(r => r.id === data.region)?.name ?? data.region;
  const deptLabel = departments.find(d => d.id === data.business_unit)?.name ?? data.business_unit;

  const Row = ({ label, value }: { label: string; value?: string }) =>
    value ? (
      <div className="flex gap-2 text-sm">
        <span className="text-muted-foreground w-32 shrink-0">{label}</span>
        <span className="font-medium break-words">{value}</span>
      </div>
    ) : null;

  return (
    <div className="h-full flex flex-col gap-4">
      {/* Audit card preview */}
      <div className="rounded-lg border border-slate-200 bg-white shadow-sm p-5 space-y-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Audit Preview</p>
            <h2 className="text-base font-semibold text-slate-800 leading-snug">
              {data.name || <span className="text-muted-foreground italic font-normal">Audit name will appear here</span>}
            </h2>
          </div>
          {data.type && (
            <Badge variant="outline" className="shrink-0 capitalize">{typeLabel}</Badge>
          )}
        </div>

        {data.objective && (
          <p className="text-sm text-slate-600 border-l-2 border-palette-primary pl-3">{data.objective}</p>
        )}

        <div className="space-y-1.5">
          {data.start_date && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-3.5 w-3.5 shrink-0" />
              <span>{data.start_date}{data.end_date ? ` → ${data.end_date}` : ""}</span>
            </div>
          )}
          {regionLabel && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span>{regionLabel}</span>
            </div>
          )}
          {deptLabel && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Building2 className="h-3.5 w-3.5 shrink-0" />
              <span>{deptLabel}</span>
            </div>
          )}
        </div>
      </div>

      {/* Org context card */}
      {org && (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Organisation Context</p>
          <div className="space-y-1.5">
            <Row label="Organisation" value={org.name} />
            <Row label="Industry" value={org.industry} />
            <Row label="Jurisdiction" value={org.jurisdiction_country} />
            <Row label="Data residency" value={org.data_residency_region} />
            <Row label="Security contact" value={org.primary_contact_email} />
          </div>
          {regions.length > 0 && (
            <div>
              <p className="text-xs text-muted-foreground mb-1">Active regions</p>
              <div className="flex flex-wrap gap-1">
                {regions.map(r => (
                  <Badge key={r.id} variant="secondary" className="text-xs">
                    {r.name}{r.country_code ? ` · ${r.country_code}` : ""}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          {departments.length > 0 && (
            <div>
              <p className="text-xs text-muted-foreground mb-1">Business units</p>
              <div className="flex flex-wrap gap-1">
                {departments.map(d => (
                  <Badge key={d.id} variant="outline" className="text-xs">{d.name}</Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 1 — Setup  (left half only; preview is rendered beside it in main)
// ---------------------------------------------------------------------------
function StepSetup({ data, onChange, org, regions, departments }: {
  data: SetupData;
  onChange: (d: SetupData) => void;
  org: OrgInfo | null;
  regions: OrgRegion[];
  departments: Department[];
}) {
  const set = (k: keyof SetupData, v: string) => onChange({ ...data, [k]: v });
  const quarters = buildQuarters(org?.fiscal_year_start_month ?? 1);

  const applyQuarter = (q: { start: string; end: string }) => {
    onChange({ ...data, start_date: q.start, end_date: q.end });
  };

  return (
    <div className="space-y-5">
      {/* Audit name */}
      <div>
        <Label className="text-xs text-muted-foreground mb-1 block">Audit name *</Label>
        <Input
          value={data.name}
          onChange={e => set("name", e.target.value)}
          placeholder={`e.g. ${org?.name ? org.name + " — " : ""}SOC 2 Type II Q2`}
          className="h-9"
        />
      </div>

      {/* Type */}
      <div>
        <Label className="text-xs text-muted-foreground mb-1 block">Audit type *</Label>
        <Select value={data.type} onValueChange={v => set("type", v)}>
          <SelectTrigger className="h-9"><SelectValue placeholder="Select type" /></SelectTrigger>
          <SelectContent>
            {AUDIT_TYPES.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Audit Period */}
      <div className="space-y-2">
        <Label className="text-xs text-muted-foreground block">Audit Period *</Label>
        {/* Quarter shortcuts */}
        <div className="flex gap-1.5 flex-wrap">
          {quarters.map(q => (
            <button
              key={q.label}
              onClick={() => applyQuarter(q)}
              className={`text-xs px-2.5 py-1 rounded-md border transition-colors
                ${data.start_date === q.start && data.end_date === q.end
                  ? "bg-palette-primary text-white border-palette-primary"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}
            >
              {q.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs text-muted-foreground mb-1 block">Start date</Label>
            <Input type="date" value={data.start_date} onChange={e => set("start_date", e.target.value)} className="h-9" />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground mb-1 block">End date</Label>
            <Input type="date" value={data.end_date} onChange={e => set("end_date", e.target.value)} className="h-9" />
          </div>
        </div>
      </div>

      {/* Scope */}
      <div className="space-y-3">
        <Label className="text-xs text-muted-foreground block">Scope</Label>
        <div className="grid grid-cols-2 gap-3">
          {/* Region */}
          <div>
            <Label className="text-xs text-muted-foreground mb-1 block">Region (optional)</Label>
            {regions.length > 0 ? (
              <Select value={data.region || "__none__"} onValueChange={v => set("region", v === "__none__" ? "" : v)}>
                <SelectTrigger className="h-9"><SelectValue placeholder="All regions" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="__none__">All regions</SelectItem>
                  {regions.map(r => (
                    <SelectItem key={r.id} value={r.id}>
                      {r.name}{r.country_name && r.country_name !== r.name ? ` (${r.country_name})` : ""}{r.city ? ` — ${r.city}` : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input value={data.region} onChange={e => set("region", e.target.value)} placeholder="e.g. EU, APAC" className="h-9" />
            )}
          </div>
          {/* Business unit */}
          <div>
            <Label className="text-xs text-muted-foreground mb-1 block">Business unit (optional)</Label>
            {departments.length > 0 ? (
              <Select value={data.business_unit || "__none__"} onValueChange={v => set("business_unit", v === "__none__" ? "" : v)}>
                <SelectTrigger className="h-9"><SelectValue placeholder="All departments" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="__none__">All departments</SelectItem>
                  {departments.map(d => <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>)}
                </SelectContent>
              </Select>
            ) : (
              <Input value={data.business_unit} onChange={e => set("business_unit", e.target.value)} placeholder="e.g. Engineering" className="h-9" />
            )}
          </div>
        </div>
      </div>

      {/* Audit Objective */}
      <div>
        <Label className="text-xs text-muted-foreground mb-1 block">Audit objective</Label>
        <Textarea
          value={data.objective}
          onChange={e => set("objective", e.target.value)}
          rows={3}
          placeholder={org?.industry
            ? `e.g. Assess compliance posture for ${org.industry} sector against selected frameworks…`
            : "State the scope and objectives of this audit…"}
          className="resize-none"
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 2 — Frameworks (split: left = picker list, right = card preview)
// ---------------------------------------------------------------------------

function FrameworkCard({ fw, onRemove, onScopeChange, onGroupToggle }: {
  fw: SelectedFramework;
  onRemove: (id: string) => void;
  onScopeChange: (id: string, mode: SelectedFramework["scope_mode"]) => void;
  onGroupToggle: (id: string, group: string) => void;
}) {
  const s = fw.stats;
  const scopeReqs = fw.scope_mode === "full"
    ? s?.requirements ?? 0
    : fw.scope_mode === "groups"
      ? (s?.requirement_groups ?? []).filter(g => fw.selected_groups.includes(g.code)).reduce((a, g) => a + g.count, 0)
      : s?.requirements ?? 0;

  return (
    <div className="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* Card header */}
      <div className="flex items-start justify-between px-5 pt-5 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-palette-primary" />
            <span className="font-semibold text-slate-800">{fw.framework_name}</span>
            <Badge variant="secondary" className="text-xs font-mono">{fw.framework_code}</Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">Version: <span className="font-medium text-slate-700">{fw.version_name}</span></p>
        </div>
        <button onClick={() => onRemove(fw.framework_id)} className="text-muted-foreground hover:text-destructive p-1 rounded mt-0.5">
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Stats grid */}
      {s && (
        <div className="grid grid-cols-2 gap-px bg-slate-100 border-t border-slate-100">
          {[
            { icon: Layers, label: "Requirements in scope", value: scopeReqs },
            { icon: ShieldCheck, label: "Mapped controls", value: s.mapped_controls },
            { icon: Activity, label: "Primary coverage", value: `${s.primary_coverage_pct}%` },
            { icon: FileText, label: "Policy templates", value: s.policies_available },
            { icon: CheckCircle2, label: "Assertion templates", value: s.assertions_available },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-white px-4 py-3 flex items-center gap-3">
              <Icon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-sm font-semibold text-slate-800">{value}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* What this creates */}
      {s && (
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-600 space-y-0.5">
          <p className="font-medium text-slate-700 mb-1">This framework will generate:</p>
          <p>— {scopeReqs} requirements in scope</p>
          <p>— {s.mapped_controls} mapped controls</p>
          {s.policies_available > 0 && <p>— {s.policies_available} policy templates available</p>}
          {s.assertions_available > 0 && <p>— {s.assertions_available} assertion templates available</p>}
        </div>
      )}

      {/* Scope mode */}
      {s && (
        <div className="px-5 py-4 border-t border-slate-100 space-y-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Scope mode</p>
          <div className="space-y-1.5">
            {(["full", "groups", "custom"] as const).map(mode => (
              <label key={mode} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name={`scope-${fw.framework_id}`}
                  value={mode}
                  checked={fw.scope_mode === mode}
                  onChange={() => onScopeChange(fw.framework_id, mode)}
                  className="accent-palette-primary"
                />
                <span className="text-sm text-slate-700">
                  {mode === "full" && "Full framework"}
                  {mode === "groups" && "Selected requirement groups"}
                  {mode === "custom" && "Custom requirements (configure after creation)"}
                </span>
              </label>
            ))}
          </div>
          {/* Group selector */}
          {fw.scope_mode === "groups" && s.requirement_groups.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {s.requirement_groups.map(g => {
                const active = fw.selected_groups.includes(g.code);
                return (
                  <button
                    key={g.code}
                    onClick={() => onGroupToggle(fw.framework_id, g.code)}
                    className={`text-xs px-2.5 py-1 rounded-md border transition-colors
                      ${active ? "bg-palette-primary text-white border-palette-primary" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}
                  >
                    {g.code} <span className="opacity-60">({g.count})</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function StepFrameworks({
  selected, onAdd, onRemove, onScopeChange, onGroupToggle,
  frameworksWithVersions, loadingFrameworks,
}: {
  selected: SelectedFramework[];
  onAdd: (fw: SelectedFramework) => void;
  onRemove: (framework_id: string) => void;
  onScopeChange: (framework_id: string, mode: SelectedFramework["scope_mode"]) => void;
  onGroupToggle: (framework_id: string, group: string) => void;
  frameworksWithVersions: FrameworkWithVersions[];
  loadingFrameworks: boolean;
}) {
  const [pickFw, setPickFw] = useState("");
  const [pickVer, setPickVer] = useState("");
  const [versionError, setVersionError] = useState(false);

  const alreadyAdded = selected.map(s => s.framework_id);
  const selectedFwData = frameworksWithVersions.find(f => f.framework_id === pickFw);
  const availableVersions = selectedFwData?.versions ?? [];

  const handleAdd = () => {
    if (!pickFw) return;
    if (!pickVer) { setVersionError(true); return; }
    setVersionError(false);
    const fw = frameworksWithVersions.find(f => f.framework_id === pickFw);
    const ver = availableVersions.find(v => v.version_id === pickVer);
    if (!fw || !ver) return;
    onAdd({
      framework_id: fw.framework_id,
      framework_name: fw.framework_name,
      framework_code: fw.framework_code,
      version_id: ver.version_id,
      version_name: ver.version_name,
      scope_mode: "full",
      selected_groups: [],
      stats: ver,
    });
    setPickFw(""); setPickVer(""); setVersionError(false);
  };

  return (
    <div className="grid grid-cols-2 divide-x divide-slate-100 min-h-[400px]">
      {/* Left — picker */}
      <div className="pr-6 space-y-4">
        <p className="text-sm text-muted-foreground">Select frameworks and a mandatory version for this audit.</p>

        {loadingFrameworks ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground py-6">
            <Loader2 className="h-4 w-4 animate-spin" />Loading frameworks…
          </div>
        ) : (
          <div className="space-y-3">
            <div>
              <Label className="text-xs text-muted-foreground mb-1 block">Framework</Label>
              <Select value={pickFw} onValueChange={v => { setPickFw(v); setPickVer(""); setVersionError(false); }}>
                <SelectTrigger className="h-9"><SelectValue placeholder="Select framework" /></SelectTrigger>
                <SelectContent>
                  {frameworksWithVersions.filter(f => !alreadyAdded.includes(f.framework_id)).map(f => (
                    <SelectItem key={f.framework_id} value={f.framework_id}>
                      {f.framework_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {pickFw && (
              <div>
                <Label className={`text-xs mb-1 block ${versionError ? "text-destructive" : "text-muted-foreground"}`}>
                  Version * {versionError && <span className="ml-1 font-medium">— required</span>}
                </Label>
                <Select value={pickVer} onValueChange={v => { setPickVer(v); setVersionError(false); }}>
                  <SelectTrigger className={`h-9 ${versionError ? "border-destructive" : ""}`}>
                    <SelectValue placeholder="Select version (mandatory)" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableVersions.map(v => (
                      <SelectItem key={v.version_id} value={v.version_id}>
                        {v.version_name}{v.effective_date ? ` (${v.effective_date.slice(0, 4)})` : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <Button size="sm" onClick={handleAdd} disabled={!pickFw} className="h-9 w-full">
              <Plus className="h-4 w-4 mr-1" />Add Framework
            </Button>
          </div>
        )}

        {/* Added list (compact) */}
        {selected.length > 0 && (
          <div className="pt-2 space-y-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Added ({selected.length})</p>
            {selected.map(s => (
              <div key={s.framework_id} className="flex items-center justify-between rounded-md border px-3 py-2 bg-muted/30 text-sm">
                <div>
                  <span className="font-medium">{s.framework_name}</span>
                  <span className="ml-2 text-xs text-muted-foreground font-mono">{s.version_name}</span>
                  {s.scope_mode !== "full" && (
                    <Badge variant="outline" className="ml-2 text-xs">{s.scope_mode}</Badge>
                  )}
                </div>
                <button onClick={() => onRemove(s.framework_id)} className="text-muted-foreground hover:text-destructive p-1 rounded ml-2">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {selected.length === 0 && !loadingFrameworks && (
          <p className="text-sm text-muted-foreground italic pt-2">No frameworks selected yet.</p>
        )}
      </div>

      {/* Right — card preview */}
      <div className="pl-6 space-y-4 overflow-y-auto">
        {selected.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground gap-3 py-12">
            <BookOpen className="h-10 w-10 opacity-20" />
            <p className="text-sm">Select a framework and version<br />to see a live preview here.</p>
          </div>
        ) : (
          selected.map(fw => (
            <FrameworkCard
              key={fw.framework_id}
              fw={fw}
              onRemove={onRemove}
              onScopeChange={onScopeChange}
              onGroupToggle={onGroupToggle}
            />
          ))
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 3 — Team (role-driven slots)
// ---------------------------------------------------------------------------
function StepTeam({ team, onAssign, onSystemRoleChange, personnel, loadingPersonnel, teams, selectedTeamId, onTeamChange, loadingTeams }: {
  team: TeamMember[];
  onAssign: (role: string, personnel_id: string | null) => void;
  onSystemRoleChange: (role: string, system_role: string) => void;
  personnel: Personnel[];
  loadingPersonnel: boolean;
  teams: OrgTeam[];
  selectedTeamId: string;
  onTeamChange: (teamId: string) => void;
  loadingTeams: boolean;
}) {
  const assignedByRole = Object.fromEntries(team.map(m => [m.role, m]));
  const assignedPersonnelIds = team.map(m => m.personnel_id);

  const selectedTeam = teams.find(t => t.id === selectedTeamId);
  const memberUserIds = selectedTeam?.member_ids ?? [];
  const filteredPersonnel = selectedTeamId
    ? personnel.filter(p => p.user_id != null && memberUserIds.includes(String(p.user_id)))
    : personnel;
  const teamFilterActive = !!selectedTeamId;
  const noMatches = teamFilterActive && filteredPersonnel.length === 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          Assign people to each audit role. Choose a team to limit choices to that team.
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <Label className="text-xs text-muted-foreground whitespace-nowrap">Team filter</Label>
          {loadingTeams ? (
            <div className="h-9 w-48 flex items-center text-xs text-muted-foreground">
              <Loader2 className="h-3 w-3 animate-spin mr-1" />Loading…
            </div>
          ) : (
            <Select value={selectedTeamId || "__all__"} onValueChange={v => onTeamChange(v === "__all__" ? "" : v)}>
              <SelectTrigger className="h-9 w-48">
                <SelectValue placeholder="All personnel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__all__">All personnel</SelectItem>
                {teams.map(t => (
                  <SelectItem key={t.id} value={t.id}>
                    {t.name} ({t.member_ids.length})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>
      {noMatches && (
        <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-md px-3 py-2">
          No team members with system access. Grant access in People, or choose All personnel.
        </p>
      )}
      <div className="rounded-md border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground text-xs">Audit Role</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground text-xs w-24">Required?</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground text-xs w-36">Recommended</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground text-xs">Assigned Person</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground text-xs w-32">System Role</th>
            </tr>
          </thead>
          <tbody>
            {TEAM_ROLE_SLOTS.map(slot => {
              const assigned = assignedByRole[slot.role];
              const value = assigned?.personnel_id ?? "__none__";
              const recommendedLabel = SYSTEM_ROLES.find(r => r.value === slot.recommended_system_role)?.label ?? slot.recommended_system_role;
              const assignedPerson = assigned ? personnel.find(p => p.id === assigned.personnel_id) : null;
              const systemRoleValue = assigned?.system_role ?? assignedPerson?.role ?? slot.recommended_system_role;
              return (
                <tr key={slot.role} className={`border-t ${slot.required ? "bg-slate-50/50" : ""}`}>
                  <td className="px-4 py-3 font-medium">{slot.label}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs ${slot.required ? "text-amber-600 font-medium" : "text-muted-foreground"}`}>
                      {slot.required ? "Yes" : "Optional"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{recommendedLabel}</td>
                  <td className="px-4 py-3">
                    {loadingPersonnel ? (
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Loader2 className="h-3 w-3 animate-spin mr-1" />Loading…
                      </div>
                    ) : (
                      <Select
                        value={value}
                        onValueChange={v => onAssign(slot.role, v === "__none__" ? null : v)}
                      >
                        <SelectTrigger className="h-9 w-64">
                          <SelectValue placeholder="Select person" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="__none__">— unassigned —</SelectItem>
                          {filteredPersonnel.map(p => {
                            const usedElsewhere = assignedPersonnelIds.includes(p.id) && assigned?.personnel_id !== p.id;
                            return (
                              <SelectItem
                                key={p.id}
                                value={p.id}
                                disabled={usedElsewhere}
                              >
                                {p.first_name} {p.last_name}
                                {p.job_title ? ` — ${p.job_title}` : ""}
                                {p.role && ` (${SYSTEM_ROLES.find(r => r.value === p.role)?.label ?? p.role})`}
                                {usedElsewhere && " (assigned to another role)"}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {assigned ? (
                      <Select value={systemRoleValue} onValueChange={v => onSystemRoleChange(slot.role, v)}>
                        <SelectTrigger className="h-9 w-36"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {SYSTEM_ROLES.map(r => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    ) : (
                      <span className="text-muted-foreground text-xs">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 4 — Controls (auto-populated from selected frameworks)
// ---------------------------------------------------------------------------
function StepControls({ plans, onPlansReplace, onOwnerChange, controls, personnel, loadingControls, selectedFrameworkIds }: {
  plans: TestPlan[];
  onPlansReplace: (newPlans: TestPlan[]) => void;
  onOwnerChange: (control_id: string, owner_id: string, owner_name: string) => void;
  controls: Control[];
  personnel: Personnel[];
  loadingControls: boolean;
  selectedFrameworkIds: string[];
}) {
  const [scopeMode, setScopeMode] = useState<"all" | "choose">("all");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const filteredControls = useMemo(() => controls.filter(c => {
    if (selectedFrameworkIds.length === 0) return true;
    const fwIds = (c.frameworks ?? []).map(f => String(f.id));
    return fwIds.some(id => selectedFrameworkIds.includes(id));
  }), [controls, selectedFrameworkIds]);

  const toTestPlan = (c: Control, existing?: TestPlan): TestPlan => ({
    control_id: c.id,
    control_code: c.control_id,
    control_name: c.name,
    owner_personnel_id: existing?.owner_personnel_id ?? "",
    owner_name: existing?.owner_name ?? "",
  });

  // Sync selectedIds when switching to "choose" and filteredControls change
  useEffect(() => {
    if (scopeMode === "choose" && filteredControls.length > 0) {
      setSelectedIds(prev => {
        const next = new Set(prev);
        filteredControls.forEach(c => next.add(c.id));
        return next;
      });
    }
  }, [scopeMode, filteredControls.length]);

  // Apply scope: sync plans to parent (test plan skeleton)
  useEffect(() => {
    if (filteredControls.length === 0) return;
    const planMap = new Map(plans.map(p => [p.control_id, p]));
    const effectiveIds = scopeMode === "all"
      ? new Set(filteredControls.map(c => c.id))
      : (selectedIds.size > 0 ? selectedIds : new Set(filteredControls.map(c => c.id)));
    const newPlans = filteredControls
      .filter(c => effectiveIds.has(c.id))
      .map(c => toTestPlan(c, planMap.get(c.id)));
    onPlansReplace(newPlans);
  }, [scopeMode, selectedIds, filteredControls]);

  const handleToggleControl = (controlId: string, checked: boolean) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (checked) next.add(controlId);
      else next.delete(controlId);
      return next;
    });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) setSelectedIds(new Set(filteredControls.map(c => c.id)));
    else setSelectedIds(new Set());
  };

  if (loadingControls) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground py-8">
        <Loader2 className="h-4 w-4 animate-spin" />Loading controls…
      </div>
    );
  }

  if (selectedFrameworkIds.length === 0) {
    return (
      <p className="text-sm text-muted-foreground italic">
        Select frameworks in the Frameworks step first. Controls will be derived from your selected frameworks.
      </p>
    );
  }

  if (filteredControls.length === 0) {
    return (
      <p className="text-sm text-muted-foreground italic">
        No controls are mapped to your selected frameworks. Add framework–control mappings in Compliance to see controls here.
      </p>
    );
  }

  const withOwners = plans.filter(p => p.owner_personnel_id).length;

  return (
    <div className="grid grid-cols-2 divide-x divide-slate-100 min-h-[400px]">
      {/* Left — scope picker + table */}
      <div className="pr-6 space-y-4">
        <p className="text-sm text-muted-foreground">
          Controls derived from your selected frameworks. Test plan skeleton is created automatically.
        </p>

        <div className="flex items-center gap-6">
          <Label className="text-xs font-medium text-muted-foreground">Scope</Label>
          <RadioGroup value={scopeMode} onValueChange={(v: "all" | "choose") => setScopeMode(v)} className="flex gap-4">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="all" id="scope-all" />
              <Label htmlFor="scope-all" className="font-normal cursor-pointer">All controls</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="choose" id="scope-choose" />
              <Label htmlFor="scope-choose" className="font-normal cursor-pointer">Choose controls</Label>
            </div>
          </RadioGroup>
        </div>

        {scopeMode === "choose" && (
          <Accordion type="single" collapsible defaultValue="choose-controls" className="rounded-md border">
            <AccordionItem value="choose-controls" className="border-0">
              <AccordionTrigger className="px-4 py-3 text-sm font-medium hover:no-underline">
                Choose controls ({selectedIds.size} of {filteredControls.length} selected)
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-0">
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  <div className="flex items-center gap-2 pb-2 border-b">
                    <Checkbox
                      id="select-all"
                      checked={selectedIds.size === filteredControls.length}
                      onCheckedChange={v => handleSelectAll(v === true)}
                    />
                    <Label htmlFor="select-all" className="text-xs font-medium cursor-pointer">
                      Select all ({filteredControls.length} controls)
                    </Label>
                  </div>
                  <div className="grid gap-2">
                    {filteredControls.map(c => (
                      <div key={c.id} className="flex items-center gap-2">
                        <Checkbox
                          id={`ctrl-${c.id}`}
                          checked={selectedIds.has(c.id)}
                          onCheckedChange={v => handleToggleControl(c.id, v === true)}
                        />
                        <Label htmlFor={`ctrl-${c.id}`} className="text-sm cursor-pointer font-mono text-xs text-muted-foreground">
                          {c.control_id}
                        </Label>
                        <span className="text-sm truncate">{c.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}

        <div className="rounded-md border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-3 py-2 font-medium text-muted-foreground text-xs">Control</th>
                <th className="text-left px-3 py-2 font-medium text-muted-foreground text-xs">Name</th>
                <th className="text-left px-3 py-2 font-medium text-muted-foreground text-xs">Owner</th>
                {scopeMode === "choose" && <th className="w-8" />}
              </tr>
            </thead>
            <tbody>
              {plans.map(p => (
                <tr key={p.control_id} className="border-t">
                  <td className="px-3 py-2 font-mono text-xs text-muted-foreground">{p.control_code}</td>
                  <td className="px-3 py-2 font-medium">{p.control_name}</td>
                  <td className="px-3 py-2">
                    <Select
                      value={p.owner_personnel_id || "__none__"}
                      onValueChange={v => {
                        const per = personnel.find(x => x.id === v);
                        onOwnerChange(p.control_id, v === "__none__" ? "" : v, per ? `${per.first_name} ${per.last_name}` : "");
                      }}
                    >
                      <SelectTrigger className="h-7 text-xs w-44"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="__none__">— unassigned —</SelectItem>
                        {personnel.map(per => <SelectItem key={per.id} value={per.id}>{per.first_name} {per.last_name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </td>
                  {scopeMode === "choose" && (
                    <td className="px-2 py-2">
                      <button
                        onClick={() => handleToggleControl(p.control_id, false)}
                        className="text-muted-foreground hover:text-destructive p-1 rounded"
                        title="Remove from scope"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right — live preview */}
      <div className="pl-6">
        <div className="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden sticky top-4">
          <div className="flex items-start gap-2 px-5 pt-5 pb-3">
            <FlaskConical className="h-4 w-4 text-palette-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-800">Controls in scope</p>
              <p className="text-xs text-muted-foreground mt-0.5">What this creates</p>
            </div>
          </div>
          <div className="grid gap-px bg-slate-100 border-t border-slate-100">
            {[
              { icon: Layers, label: "Controls in scope", value: plans.length },
              { icon: Users, label: "With owners assigned", value: withOwners },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-white px-5 py-3 flex items-center gap-3">
                <Icon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="text-sm font-semibold text-slate-800">{value}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-600 space-y-0.5">
            <p className="font-medium text-slate-700 mb-1">This will create:</p>
            <p>— Audit with {plans.length} control{plans.length !== 1 ? "s" : ""} in scope</p>
            <p>— {withOwners} owner{withOwners !== 1 ? "s" : ""} assigned</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 5 — Review
// ---------------------------------------------------------------------------
function StepReview({ setup, frameworks, team, plans, regions, departments }: {
  setup: SetupData;
  frameworks: SelectedFramework[];
  team: TeamMember[];
  plans: TestPlan[];
  regions: OrgRegion[];
  departments: Department[];
}) {
  const typeLabel = AUDIT_TYPES.find(t => t.value === setup.type)?.label ?? setup.type;
  const regionLabel = regions.find(r => r.id === setup.region)?.name ?? setup.region;
  const deptLabel = departments.find(d => d.id === setup.business_unit)?.name ?? setup.business_unit;

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="rounded-md border p-4 space-y-2">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{title}</p>
      {children}
    </div>
  );

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Review everything before creating the audit.</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <Section title="Setup">
            <div className="grid grid-cols-2 gap-y-1 text-sm">
              <span className="text-muted-foreground">Name</span><span className="font-medium">{setup.name || "—"}</span>
              <span className="text-muted-foreground">Type</span><span>{typeLabel}</span>
              <span className="text-muted-foreground">Period</span><span>{setup.start_date}{setup.end_date ? ` → ${setup.end_date}` : ""}</span>
              {regionLabel && <><span className="text-muted-foreground">Region</span><span>{regionLabel}</span></>}
              {deptLabel && <><span className="text-muted-foreground">Business unit</span><span>{deptLabel}</span></>}
              {setup.objective && <><span className="text-muted-foreground col-span-2 pt-1">Objective</span><span className="text-xs col-span-2">{setup.objective}</span></>}
            </div>
          </Section>
          <Section title={`Frameworks (${frameworks.length})`}>
            {frameworks.length === 0
              ? <p className="text-sm text-muted-foreground italic">None selected</p>
              : frameworks.map(f => (
                <div key={f.framework_id} className="flex items-center gap-2 text-sm">
                  <Check className="h-3.5 w-3.5 text-green-600 shrink-0" />
                  <span className="font-medium">{f.framework_name}</span>
                  {f.version_name && <span className="text-xs text-muted-foreground">→ {f.version_name}</span>}
                  {f.scope_mode !== "full" && <Badge variant="outline" className="text-xs">{f.scope_mode}</Badge>}
                </div>
              ))
            }
          </Section>
        </div>
        <div className="space-y-4">
          <Section title={`Team (${team.length})`}>
            {team.length === 0
              ? <p className="text-sm text-muted-foreground italic">No team members</p>
              : team.map(m => (
                <div key={m.personnel_id} className="flex items-center justify-between text-sm gap-2">
                  <span className="font-medium">{m.name}</span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <Badge variant="outline" className="text-xs">{AUDITOR_ROLES.find(r => r.value === m.role)?.label ?? m.role}</Badge>
                    {m.system_role && (
                      <span className="text-xs text-muted-foreground">({SYSTEM_ROLES.find(r => r.value === m.system_role)?.label ?? m.system_role})</span>
                    )}
                  </div>
                </div>
              ))
            }
          </Section>
          <Section title={`Controls in scope (${plans.length})`}>
            {plans.length === 0
              ? <p className="text-sm text-muted-foreground italic">None selected — can be added after creation</p>
              : plans.map(p => (
                <div key={p.control_id} className="flex items-center justify-between text-sm">
                  <span><span className="font-mono text-xs text-muted-foreground mr-2">{p.control_code}</span>{p.control_name}</span>
                  {p.owner_name && <span className="text-xs text-muted-foreground">{p.owner_name}</span>}
                </div>
              ))
            }
          </Section>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------
export default function AuditHubPage() {
  const router = useRouter();
  const base = getApiBaseUrl().replace(/\/$/, "");

  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  // Org data
  const [org, setOrg] = useState<OrgInfo | null>(null);
  const [regions, setRegions] = useState<OrgRegion[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);

  // Form state — default start_date to current quarter start
  const [setup, setSetup] = useState<SetupData>({
    name: "", objective: "", type: "internal",
    start_date: currentQuarterStart(), end_date: "",
    region: "", business_unit: "",
  });
  const [frameworks, setFrameworks] = useState<SelectedFramework[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [plans, setPlans] = useState<TestPlan[]>([]);

  // Reference data
  const [frameworksWithVersions, setFrameworksWithVersions] = useState<FrameworkWithVersions[]>([]);
  const [allPersonnel, setAllPersonnel] = useState<Personnel[]>([]);
  const [allControls, setAllControls] = useState<Control[]>([]);
  const [teams, setTeams] = useState<OrgTeam[]>([]);
  const [selectedTeamId, setSelectedTeamId] = useState("");
  const [loadingFrameworks, setLoadingFrameworks] = useState(false);
  const [loadingPersonnel, setLoadingPersonnel] = useState(false);
  const [loadingControls, setLoadingControls] = useState(false);
  const [loadingTeams, setLoadingTeams] = useState(false);

  // Load org context on mount
  useEffect(() => {
    Promise.all([
      apiGet(`${base}/api/account/organization/`).catch(() => null),
      apiGet(`${base}/api/account/regions/`).catch(() => []),
      apiGet(`${base}/api/account/departments/`).catch(() => []),
    ]).then(([orgData, regData, deptData]) => {
      if (orgData) {
        setOrg(orgData);
        // Update quarter start based on fiscal year
        if (orgData.fiscal_year_start_month) {
          setSetup(prev => ({ ...prev, start_date: currentQuarterStart(orgData.fiscal_year_start_month) }));
        }
      }
      setRegions(Array.isArray(regData) ? regData : []);
      setDepartments(Array.isArray(deptData) ? deptData : []);
    });
  }, [base]);

  // Load frameworks with version stats on mount
  useEffect(() => {
    setLoadingFrameworks(true);
    apiGet(`${base}/api/compliance/frameworks/versions-stats/`)
      .then(d => setFrameworksWithVersions(Array.isArray(d) ? d : []))
      .catch(() => {})
      .finally(() => setLoadingFrameworks(false));
  }, [base]);

  useEffect(() => {
    if (step >= 3 && allPersonnel.length === 0) {
      setLoadingPersonnel(true);
      apiGet(`${base}/api/account/personnel/`).then(d => setAllPersonnel(Array.isArray(d) ? d : [])).catch(() => {}).finally(() => setLoadingPersonnel(false));
    }
  }, [step, base, allPersonnel.length]);

  useEffect(() => {
    if (step >= 3 && teams.length === 0) {
      setLoadingTeams(true);
      apiGet(`${base}/api/account/teams/`).then(d => setTeams(Array.isArray(d) ? d : [])).catch(() => {}).finally(() => setLoadingTeams(false));
    }
  }, [step, base, teams.length]);

  // Load controls when on step 4 with frameworks selected — fetch by framework and merge
  useEffect(() => {
    if (step !== 4 || frameworks.length === 0) return;
    setLoadingControls(true);
    Promise.all(
      frameworks.map(f => apiGet(`${base}/api/compliance/controls/by_framework/?framework_id=${f.framework_id}`))
    )
      .then(results => {
        const byId = new Map<string, Control>();
        for (const arr of results) {
          const list = Array.isArray(arr) ? arr : (arr as { results?: Control[] })?.results ?? [];
          for (const c of list) {
            if (c?.id && !byId.has(c.id)) byId.set(c.id, { ...c, frameworks: c.frameworks ?? [] });
          }
        }
        setAllControls(Array.from(byId.values()));
      })
      .catch(() => setAllControls([]))
      .finally(() => setLoadingControls(false));
  }, [step, base, frameworks]);

  // Auto-populate test plan skeleton when entering Controls tab (from selected frameworks)
  useEffect(() => {
    if (step !== 4 || frameworks.length === 0 || loadingControls) return;
    const filtered = allControls.filter(c =>
      (c.frameworks ?? []).some(f => frameworks.some(fw => String(fw.framework_id) === String(f.id)))
    );
    if (filtered.length > 0 && plans.length === 0) {
      setPlans(filtered.map(c => ({
        control_id: c.id,
        control_code: c.control_id,
        control_name: c.name,
        owner_personnel_id: "",
        owner_name: "",
      })));
    }
  }, [step, frameworks, allControls, loadingControls, plans.length]);

  const validate = (s: number): string[] => {
    if (s === 1) {
      const errs: string[] = [];
      if (!setup.name.trim()) errs.push("Audit name is required.");
      if (!setup.type) errs.push("Audit type is required.");
      if (!setup.start_date) errs.push("Start date is required.");
      return errs;
    }
    if (s === 2 && frameworks.length === 0) return ["Select at least one framework."];
    if (s === 3) {
      if (!team.some(m => m.role === "lead_auditor")) return ["Lead Auditor is required."];
    }
    return [];
  };

  const handleNext = () => {
    const errs = validate(step);
    if (errs.length) { setErrors(errs); return; }
    setErrors([]);
    setStep(s => Math.min(s + 1, 5));
  };

  const handleBack = () => { setErrors([]); setStep(s => Math.max(s - 1, 1)); };

  const handleCreate = async () => {
    setSubmitting(true);
    try {
      const created = await apiPost(`${base}/api/compliance/audits/`, {
        name: setup.name.trim(),
        description: setup.objective.trim(),
        type: setup.type,
        start_date: new Date(setup.start_date).toISOString(),
        end_date: setup.end_date ? new Date(setup.end_date).toISOString() : null,
        framework_ids: frameworks.map(f => f.framework_id),
        framework_version_ids: frameworks.map(f => f.version_id).filter(Boolean),
        framework_scopes: frameworks.map(f => ({
          framework_id: f.framework_id,
          version_id: f.version_id,
          scope_mode: f.scope_mode,
          selected_groups: f.selected_groups,
        })),
        team: team.map(m => ({ personnel_id: m.personnel_id, role: m.role, name: m.name, system_role: m.system_role })),
        test_plans: plans.map(p => ({ control_id: p.control_id, owner_personnel_id: p.owner_personnel_id || null })),
      });
      toast.success("Audit created successfully.");
      const id = created?.id ?? (created as any)?.id;
      router.push(id ? `/workspace/compliance/audits?created=${id}` : `/workspace/compliance/audits`);
    } catch (e: any) {
      toast.error(e.message ?? "Failed to create audit.");
    } finally {
      setSubmitting(false);
    }
  };

  const stepKey = STEPS[step - 1].id.toString();
  const selectedFrameworkIds = useMemo(() => frameworks.map(f => f.framework_id), [frameworks]);

  // Nav footer shared across all steps
  const NavFooter = () => (
    <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50 rounded-b-lg">
      <Button variant="outline" onClick={handleBack} disabled={step === 1}>
        <ChevronLeft className="h-4 w-4 mr-1" />Back
      </Button>
      <div className="flex items-center gap-3">
        {step < 5 && (
          <Button onClick={handleNext}>
            Next<ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        )}
        {step === 5 && (
          <Button onClick={handleCreate} disabled={submitting}>
            {submitting ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Creating…</> : <>Create Audit<Check className="h-4 w-4 ml-2" /></>}
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <ClipboardList className="h-6 w-6 text-palette-primary" />
        <div>
          <h1 className="app-page-title">Audit Hub</h1>
          <p className="text-muted-foreground mt-1">Configure and launch a new audit in one guided flow.</p>
        </div>
      </div>

      <Tabs value={stepKey} onValueChange={val => { setErrors([]); setStep(Number(val)); }} className="space-y-4">
        <TabsList className="bg-white border border-slate-200 p-1">
          {STEPS.map(s => {
            const Icon = s.icon;
            const done = step > s.id;
            return (
              <TabsTrigger
                key={s.id}
                value={s.id.toString()}
                disabled={!done && step !== s.id}
                className="data-[state=active]:bg-palette-primary data-[state=active]:text-white flex items-center gap-1.5"
              >
                {done ? <Check className="h-3.5 w-3.5" /> : <Icon className="h-3.5 w-3.5" />}
                {s.label}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {errors.length > 0 && (
          <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive space-y-1">
            {errors.map((e, i) => <p key={i}>{e}</p>)}
          </div>
        )}

        {/* Step 1 — split layout with live preview */}
        <TabsContent value="1" className="mt-0">
          <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="grid grid-cols-2 divide-x divide-slate-100">
              <div className="p-6">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4">Audit Details</p>
                <StepSetup data={setup} onChange={setSetup} org={org} regions={regions} departments={departments} />
              </div>
              <div className="p-6 bg-slate-50/60">
                <SetupPreview data={setup} org={org} regions={regions} departments={departments} />
              </div>
            </div>
            <NavFooter />
          </div>
        </TabsContent>

        {/* Steps 2–5 — full-width */}
        {(["2", "3", "4", "5"] as const).map(val => (
          <TabsContent key={val} value={val} className="mt-0">
            <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
              <div className="p-6">
                {val === "2" && (
                  <StepFrameworks
                    selected={frameworks}
                    onAdd={f => setFrameworks(prev => [...prev, f])}
                    onRemove={id => setFrameworks(prev => prev.filter(f => f.framework_id !== id))}
                    onScopeChange={(id, mode) => setFrameworks(prev => prev.map(f =>
                      f.framework_id === id ? { ...f, scope_mode: mode, selected_groups: [] } : f
                    ))}
                    onGroupToggle={(id, group) => setFrameworks(prev => prev.map(f => {
                      if (f.framework_id !== id) return f;
                      const has = f.selected_groups.includes(group);
                      return { ...f, selected_groups: has ? f.selected_groups.filter(g => g !== group) : [...f.selected_groups, group] };
                    }))}
                    frameworksWithVersions={frameworksWithVersions}
                    loadingFrameworks={loadingFrameworks}
                  />
                )}
                {val === "3" && (
                  <StepTeam
                    team={team}
                    onAssign={(role, personnelId) => {
                      setTeam(prev => {
                        const filtered = prev.filter(m => m.role !== role);
                        if (!personnelId) return filtered;
                        const p = allPersonnel.find(x => x.id === personnelId);
                        if (!p) return filtered;
                        const slot = TEAM_ROLE_SLOTS.find(s => s.role === role);
                        const system_role = p.role ?? slot?.recommended_system_role ?? "analyst";
                        return [...filtered, { personnel_id: p.id, name: `${p.first_name} ${p.last_name}`, job_title: p.job_title, role, system_role }];
                      });
                    }}
                    onSystemRoleChange={(role, system_role) => {
                      setTeam(prev => prev.map(m => m.role === role ? { ...m, system_role } : m));
                    }}
                    personnel={allPersonnel}
                    loadingPersonnel={loadingPersonnel}
                    teams={teams}
                    selectedTeamId={selectedTeamId}
                    onTeamChange={setSelectedTeamId}
                    loadingTeams={loadingTeams}
                  />
                )}
                {val === "4" && (
                  <StepControls
                    plans={plans}
                    onPlansReplace={setPlans}
                    onOwnerChange={(id, oid, oname) => setPlans(prev => prev.map(p => p.control_id === id ? { ...p, owner_personnel_id: oid, owner_name: oname } : p))}
                    controls={allControls}
                    personnel={allPersonnel}
                    loadingControls={loadingControls}
                    selectedFrameworkIds={selectedFrameworkIds}
                  />
                )}
                {val === "5" && (
                  <StepReview
                    setup={setup}
                    frameworks={frameworks}
                    team={team}
                    plans={plans}
                    regions={regions}
                    departments={departments}
                  />
                )}
              </div>
              <NavFooter />
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
