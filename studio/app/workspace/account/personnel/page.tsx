"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Contact, UserPlus, Pencil, Trash2, Upload, Download, X, Loader2,
  ShieldCheck, ShieldOff, Search, Plus,
} from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface PersonnelRow {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  job_title: string;
  employment_status: string;
  user_type: string;
  department: string;
  external_hr_id: string;
  hire_date: string | null;
  user_id: number | null;
  has_access: boolean;
  role: string | null;
}

const EMPLOYMENT_STATUS_OPTIONS = [
  { value: "active", label: "Active" },
  { value: "leave", label: "On Leave" },
  { value: "terminated", label: "Terminated" },
];

const USER_TYPE_OPTIONS = [
  { value: "internal", label: "Internal" },
  { value: "external", label: "External" },
];

const ROLE_OPTIONS = [
  { value: "admin", label: "Admin" },
  { value: "agency", label: "Agency" },
  { value: "executive", label: "Executive" },
  { value: "director", label: "Director" },
  { value: "manager", label: "Manager" },
  { value: "analyst", label: "Analyst" },
  { value: "auditor", label: "Auditor" },
  { value: "viewer", label: "Viewer" },
];

// ---------------------------------------------------------------------------
// Auth helpers
// ---------------------------------------------------------------------------
async function refreshAccessToken(): Promise<string | null> {
  const rt = typeof window !== "undefined" ? localStorage.getItem("refresh_token") : null;
  if (!rt) return null;
  try {
    const res = await axios.post(`${API_BASE}/api/token/refresh/`, { refresh: rt });
    const t = res.data.access;
    localStorage.setItem("access_token", t);
    if (res.data.refresh) localStorage.setItem("refresh_token", res.data.refresh);
    return t;
  } catch { return null; }
}

async function apiRequest(method: string, url: string, data?: object | FormData): Promise<any> {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const isForm = data instanceof FormData;
  const headers: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};
  if (!isForm) headers["Content-Type"] = "application/json";
  const config: any = { method, url, headers };
  if (data) config.data = data;
  try {
    return (await axios(config)).data;
  } catch (err: any) {
    if (err.response?.status === 401) {
      const nt = await refreshAccessToken();
      if (nt) {
        config.headers.Authorization = `Bearer ${nt}`;
        return (await axios(config)).data;
      }
    }
    throw err;
  }
}

// ---------------------------------------------------------------------------
// Status badge
// ---------------------------------------------------------------------------
function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    active: "bg-green-100 text-green-800 border-green-200",
    leave: "bg-yellow-100 text-yellow-800 border-yellow-200",
    terminated: "bg-red-100 text-red-800 border-red-200",
  };
  return (
    <Badge variant="outline" className={`text-xs ${map[status] ?? "bg-gray-100 text-gray-700"}`}>
      {status}
    </Badge>
  );
}

// ---------------------------------------------------------------------------
// Add / Edit Drawer
// ---------------------------------------------------------------------------
interface DepartmentOption {
  id: string;
  name: string;
  code: string;
}

interface PersonnelDrawerProps {
  open: boolean;
  person: PersonnelRow | null;
  departments: DepartmentOption[];
  onClose: () => void;
  onSaved: () => void;
}

function PersonnelDrawer({ open, person, departments, onClose, onSaved }: PersonnelDrawerProps) {
  const isEdit = !!person;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [employmentStatus, setEmploymentStatus] = useState("active");
  const [userType, setUserType] = useState("internal");
  const [department, setDepartment] = useState("");
  const [hireDate, setHireDate] = useState("");
  const [externalHrId, setExternalHrId] = useState("");
  const [role, setRole] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setFirstName(person?.first_name ?? "");
      setLastName(person?.last_name ?? "");
      setEmail(person?.email ?? "");
      setJobTitle(person?.job_title ?? "");
      setEmploymentStatus(person?.employment_status ?? "active");
      setUserType(person?.user_type ?? "internal");
      setDepartment(person?.department ?? "");
      setHireDate(person?.hire_date?.slice(0, 10) ?? "");
      setExternalHrId(person?.external_hr_id ?? "");
      setRole(person?.role ?? "");
      setError(null);
    }
  }, [open, person]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Identity fields only sent on create
    if (!isEdit) {
      if (!email.trim()) { setError("Email is required."); return; }
      if (!firstName.trim() && !lastName.trim()) { setError("At least a first or last name is required."); return; }
    }

    const payload: Record<string, any> = {
      job_title: jobTitle.trim(),
      employment_status: employmentStatus,
      user_type: userType,
      department: department.trim(),
      hire_date: hireDate || null,
      external_hr_id: externalHrId.trim(),
    };

    // Identity fields only on create — immutable after that
    if (!isEdit) {
      payload.first_name = firstName.trim();
      payload.last_name = lastName.trim();
      payload.email = email.trim();
    }

    if (role) payload.role = role;

    try {
      setSaving(true);
      const base = API_BASE.replace(/\/$/, "");
      if (isEdit) {
        await apiRequest("PATCH", `${base}/api/account/personnel/${person!.id}/`, payload);
        toast.success("Person updated.");
      } else {
        await apiRequest("POST", `${base}/api/account/personnel/`, payload);
        toast.success("Person added.");
      }
      onSaved();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.error ?? err.message ?? "Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;

  return typeof document !== "undefined" && createPortal(
    <>
      <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose} aria-hidden />
      <aside
        className="fixed right-0 w-full max-w-lg bg-background border-l shadow-xl z-50 flex flex-col"
        style={{ top: 0, height: "100vh" }}
      >
        <div className="flex items-center justify-between px-4 border-b h-16 shrink-0">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Contact className="h-5 w-5" />
            {isEdit ? "Edit person" : "Add person"}
          </h2>
          <button onClick={onClose} className="p-2 rounded-md hover:bg-muted"><X className="h-5 w-5" /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</div>
            )}
            {isEdit ? (
              <div className="rounded-md border bg-muted/40 px-3 py-2 space-y-0.5">
                <p className="text-sm font-medium">{firstName} {lastName}</p>
                <p className="text-xs text-muted-foreground">{email}</p>
                <p className="text-xs text-muted-foreground/60 mt-1">Identity fields are set by CSV/LDAP and cannot be edited here.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs text-muted-foreground mb-1 block">First name</Label>
                    <Input value={firstName} onChange={e => setFirstName(e.target.value)} className="h-9" />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground mb-1 block">Last name</Label>
                    <Input value={lastName} onChange={e => setLastName(e.target.value)} className="h-9" />
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1 block">Email *</Label>
                  <Input type="email" value={email} onChange={e => setEmail(e.target.value)} className="h-9" />
                </div>
              </>
            )}
            <div>
              <Label className="text-xs text-muted-foreground mb-1 block">Job title</Label>
              <Input value={jobTitle} onChange={e => setJobTitle(e.target.value)} className="h-9" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">Status</Label>
                <Select value={employmentStatus} onValueChange={setEmploymentStatus}>
                  <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {EMPLOYMENT_STATUS_OPTIONS.map(o => (
                      <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">Type</Label>
                <Select value={userType} onValueChange={setUserType}>
                  <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {USER_TYPE_OPTIONS.map(o => (
                      <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground mb-1 block">Department</Label>
              {departments.length > 0 ? (
                <Select value={department || "__none__"} onValueChange={v => setDepartment(v === "__none__" ? "" : v)}>
                  <SelectTrigger className="h-9"><SelectValue placeholder="Select department" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__none__">— none —</SelectItem>
                    {departments.map(d => (
                      <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input value={department} onChange={e => setDepartment(e.target.value)} className="h-9" placeholder="No departments yet — sync from Org page" />
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">Hire date</Label>
                <Input type="date" value={hireDate} onChange={e => setHireDate(e.target.value)} className="h-9" />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">External HR ID</Label>
                <Input value={externalHrId} onChange={e => setExternalHrId(e.target.value)} className="h-9" placeholder="EMP001" />
              </div>
            </div>
            {isEdit && person?.has_access && (
              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">System role</Label>
                <Select value={role || "__none__"} onValueChange={v => setRole(v === "__none__" ? "" : v)}>
                  <SelectTrigger className="h-9"><SelectValue placeholder="Select role" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__none__">— no change —</SelectItem>
                    {ROLE_OPTIONS.map(r => (
                      <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">Controls what this person can do in the system.</p>
              </div>
            )}
            <div className="flex gap-2 pt-2">
              <Button type="submit" size="sm" disabled={saving}>
                {saving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                {saving ? "Saving…" : isEdit ? "Save changes" : "Add person"}
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={onClose} disabled={saving}>Cancel</Button>
            </div>
          </form>
        </div>
      </aside>
    </>,
    document.body
  );
}

// ---------------------------------------------------------------------------
// Grant Access Drawer
// ---------------------------------------------------------------------------
interface GrantAccessDrawerProps {
  open: boolean;
  person: PersonnelRow | null;
  onClose: () => void;
  onGranted: () => void;
}

function GrantAccessDrawer({ open, person, onClose, onGranted }: GrantAccessDrawerProps) {
  const [role, setRole] = useState("viewer");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ temporary_password: string; username: string } | null>(null);

  useEffect(() => {
    if (open) { setRole("viewer"); setError(null); setResult(null); }
  }, [open]);

  const handleGrant = async () => {
    setError(null);
    try {
      setSaving(true);
      const base = API_BASE.replace(/\/$/, "");
      const data = await apiRequest("POST", `${base}/api/account/personnel/${person!.id}/grant-access/`, { role });
      setResult({ temporary_password: data.temporary_password, username: data.username });
      toast.success(`Access granted to ${person!.first_name} ${person!.last_name}`);
      onGranted();
    } catch (err: any) {
      setError(err.response?.data?.error ?? err.message ?? "Failed to grant access.");
    } finally {
      setSaving(false);
    }
  };

  if (!open || !person) return null;

  return typeof document !== "undefined" && createPortal(
    <>
      <div className="fixed inset-0 bg-black/20 z-40" onClick={!result ? onClose : undefined} aria-hidden />
      <aside
        className="fixed right-0 w-full max-w-md bg-background border-l shadow-xl z-50 flex flex-col"
        style={{ top: 0, height: "100vh" }}
      >
        <div className="flex items-center justify-between px-4 border-b h-16 shrink-0">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-green-600" />
            Grant system access
          </h2>
          <button onClick={onClose} className="p-2 rounded-md hover:bg-muted"><X className="h-5 w-5" /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {result ? (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="font-semibold text-green-800 mb-1">Access granted</p>
                <p className="text-sm text-green-700">
                  {person.first_name} {person.last_name} can now log in.
                </p>
              </div>
              <div className="rounded-lg border bg-muted/30 p-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Username</span>
                  <span className="font-mono font-medium">{result.username}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Temporary password</span>
                  <span className="font-mono font-medium">{result.temporary_password}</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Share these credentials securely. The user should change their password on first login.</p>
              <Button onClick={onClose} className="w-full">Done</Button>
            </div>
          ) : (
            <>
              <div className="rounded-lg border bg-muted/30 p-3 text-sm space-y-1">
                <p className="font-medium">{person.first_name} {person.last_name}</p>
                <p className="text-muted-foreground">{person.email}</p>
                {person.job_title && <p className="text-muted-foreground">{person.job_title}</p>}
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">System role *</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {ROLE_OPTIONS.map(r => (
                      <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">Controls what this person can do in the system.</p>
              </div>
              <p className="text-sm text-muted-foreground">
                This will create a login account for this person. They will appear in Users & Access.
              </p>
              {error && (
                <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</div>
              )}
              <div className="flex gap-2 pt-2">
                <Button onClick={handleGrant} size="sm" className="bg-green-600 hover:bg-green-700 text-white" disabled={saving}>
                  {saving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                  {saving ? "Granting…" : "Grant access"}
                </Button>
                <Button variant="outline" size="sm" onClick={onClose} disabled={saving}>Cancel</Button>
              </div>
            </>
          )}
        </div>
      </aside>
    </>,
    document.body
  );
}

// ---------------------------------------------------------------------------
// CSV Import Panel
// ---------------------------------------------------------------------------
function CsvImportPanel({ onImported }: { onImported: () => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const downloadTemplate = async () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    const base = API_BASE.replace(/\/$/, "");
    const res = await fetch(`${base}/api/account/personnel/csv-template/`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "people_import_template.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const form = new FormData();
    form.append("file", file);
    try {
      setUploading(true);
      setResult(null);
      const base = API_BASE.replace(/\/$/, "");
      const data = await apiRequest("POST", `${base}/api/account/personnel/csv-import/`, form);
      setResult(data);
      if (data.created > 0 || data.updated > 0) {
        toast.success(`Import complete: ${data.created} added, ${data.updated} updated`);
        onImported();
      } else {
        toast.warning("Import complete — no new records added.");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.error ?? "Import failed");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
      <h3 className="text-sm font-semibold flex items-center gap-2">
        <Upload className="h-4 w-4" />
        Import people from CSV / XLSX
      </h3>
      <p className="text-xs text-muted-foreground">
        Columns: <span className="font-mono">first_name, last_name, email, job_title, department, employment_status, hire_date, external_hr_id</span>.
        Existing records are updated by email. No login accounts are created — grant access separately.
      </p>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={downloadTemplate}>
          <Download className="h-4 w-4 mr-2" />
          Download template
        </Button>
        <Button size="sm" variant="outline" onClick={() => fileRef.current?.click()} disabled={uploading}>
          {uploading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Upload className="h-4 w-4 mr-2" />}
          {uploading ? "Importing…" : "Upload file"}
        </Button>
        <input ref={fileRef} type="file" accept=".csv,.xlsx,.xls" className="hidden" onChange={handleFile} />
      </div>
      {result && (
        <div className="text-xs text-muted-foreground space-y-0.5">
          <p>Added: <span className="font-semibold text-green-700">{result.created}</span> · Updated: <span className="font-semibold text-blue-700">{result.updated}</span> · Errors: <span className="font-semibold text-red-700">{result.errors}</span> · Skipped: {result.skipped}</p>
          {result.details?.map((d: any, i: number) => (
            <p key={i} className="text-red-600">Row {d.row} ({d.email}): {d.message}</p>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------
export default function PersonnelPage() {
  const [people, setPeople] = useState<PersonnelRow[]>([]);
  const [departments, setDepartments] = useState<{ id: string; name: string; code: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [accessFilter, setAccessFilter] = useState("all");
  const [showImport, setShowImport] = useState(false);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingPerson, setEditingPerson] = useState<PersonnelRow | null>(null);

  const [grantDrawerOpen, setGrantDrawerOpen] = useState(false);
  const [grantingPerson, setGrantingPerson] = useState<PersonnelRow | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const base = API_BASE.replace(/\/$/, "");
      const [peopleData, deptData] = await Promise.all([
        apiRequest("GET", `${base}/api/account/personnel/`),
        apiRequest("GET", `${base}/api/account/departments/`),
      ]);
      setPeople(Array.isArray(peopleData) ? peopleData : []);
      setDepartments(Array.isArray(deptData) ? deptData : []);
    } catch (err: any) {
      toast.error("Failed to load people");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleRevoke = async (p: PersonnelRow) => {
    if (!confirm(`Revoke system access for ${p.first_name} ${p.last_name}? They will no longer be able to log in.`)) return;
    try {
      const base = API_BASE.replace(/\/$/, "");
      await apiRequest("POST", `${base}/api/account/personnel/${p.id}/revoke-access/`, {});
      toast.success("Access revoked.");
      fetchData();
    } catch (err: any) {
      toast.error(err.response?.data?.error ?? "Failed to revoke access.");
    }
  };

  const handleDelete = async (p: PersonnelRow) => {
    if (p.has_access) {
      toast.error("Revoke access before deleting this person.");
      return;
    }
    if (!confirm(`Delete ${p.first_name} ${p.last_name}? This cannot be undone.`)) return;
    try {
      const base = API_BASE.replace(/\/$/, "");
      await apiRequest("DELETE", `${base}/api/account/personnel/${p.id}/`);
      toast.success("Person deleted.");
      fetchData();
    } catch (err: any) {
      toast.error(err.response?.data?.error ?? "Failed to delete.");
    }
  };

  const filtered = people.filter(p => {
    const q = search.toLowerCase();
    const matchSearch = !q ||
      p.first_name.toLowerCase().includes(q) ||
      p.last_name.toLowerCase().includes(q) ||
      p.email.toLowerCase().includes(q) ||
      p.job_title.toLowerCase().includes(q) ||
      p.department.toLowerCase().includes(q);
    const matchStatus = statusFilter === "all" || p.employment_status === statusFilter;
    const matchAccess = accessFilter === "all" || (accessFilter === "yes" ? p.has_access : !p.has_access);
    return matchSearch && matchStatus && matchAccess;
  });

  const totalWithAccess = people.filter(p => p.has_access).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Contact className="h-6 w-6 text-palette-primary" />
            People
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Your org directory. Grant access to give someone a login.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowImport(v => !v)}>
            <Upload className="h-4 w-4 mr-2" />
            Import CSV
          </Button>
          <Button size="sm" onClick={() => { setEditingPerson(null); setDrawerOpen(true); }}>
            <Plus className="h-4 w-4 mr-2" />
            Add person
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-4 pb-4">
            <p className="text-xs text-muted-foreground">Total people</p>
            <p className="text-2xl font-bold">{people.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <p className="text-xs text-muted-foreground">With system access</p>
            <p className="text-2xl font-bold text-green-600">{totalWithAccess}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <p className="text-xs text-muted-foreground">No access</p>
            <p className="text-2xl font-bold text-slate-500">{people.length - totalWithAccess}</p>
          </CardContent>
        </Card>
      </div>

      {/* CSV Import */}
      {showImport && (
        <CsvImportPanel onImported={fetchData} />
      )}

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-9 h-9"
            placeholder="Search by name, email, title, department…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="h-9 w-40"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {EMPLOYMENT_STATUS_OPTIONS.map(o => (
              <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={accessFilter} onValueChange={setAccessFilter}>
          <SelectTrigger className="h-9 w-40"><SelectValue placeholder="Access" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All access</SelectItem>
            <SelectItem value="yes">Has access</SelectItem>
            <SelectItem value="no">No access</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px] text-center text-muted-foreground">#</TableHead>
                <TableHead className="whitespace-nowrap">Name</TableHead>
                <TableHead className="whitespace-nowrap">Email</TableHead>
                <TableHead className="whitespace-nowrap">Job title</TableHead>
                <TableHead className="whitespace-nowrap">Department</TableHead>
                <TableHead className="whitespace-nowrap">Status</TableHead>
                <TableHead className="whitespace-nowrap">System access</TableHead>
                <TableHead className="w-[120px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-16">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground mx-auto" />
                  </TableCell>
                </TableRow>
              ) : filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-16 text-muted-foreground text-sm">
                    {people.length === 0
                      ? "No people yet. Add someone or import a CSV."
                      : "No people match your filters."}
                  </TableCell>
                </TableRow>
              ) : filtered.map((p, idx) => (
                <TableRow key={p.id}>
                  <TableCell className="text-center text-muted-foreground text-xs">{idx + 1}</TableCell>
                  <TableCell className="font-medium">
                    {p.first_name} {p.last_name}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{p.email}</TableCell>
                  <TableCell className="text-sm">{p.job_title || "—"}</TableCell>
                  <TableCell className="text-sm">{p.department || "—"}</TableCell>
                  <TableCell><StatusBadge status={p.employment_status} /></TableCell>
                  <TableCell>
                    {p.has_access ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                        <ShieldCheck className="h-3 w-3 mr-1" />
                        Has access
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-slate-50 text-slate-500 border-slate-200 text-xs">
                        No access
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 justify-end">
                      {!p.has_access ? (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs text-green-700 border-green-300 hover:bg-green-50"
                          onClick={() => { setGrantingPerson(p); setGrantDrawerOpen(true); }}
                        >
                          <ShieldCheck className="h-3 w-3 mr-1" />
                          Grant
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleRevoke(p)}
                        >
                          <ShieldOff className="h-3 w-3 mr-1" />
                          Revoke
                        </Button>
                      )}
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7"
                        onClick={() => { setEditingPerson(p); setDrawerOpen(true); }}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7 text-destructive hover:bg-destructive/10"
                        onClick={() => handleDelete(p)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Drawers */}
      <PersonnelDrawer
        open={drawerOpen}
        person={editingPerson}
        departments={departments}
        onClose={() => setDrawerOpen(false)}
        onSaved={fetchData}
      />
      <GrantAccessDrawer
        open={grantDrawerOpen}
        person={grantingPerson}
        onClose={() => setGrantDrawerOpen(false)}
        onGranted={fetchData}
      />
    </div>
  );
}
