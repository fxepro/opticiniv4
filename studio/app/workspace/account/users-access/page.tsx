"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, UserPlus, Pencil, Trash2, UsersRound, Plus, X } from "lucide-react";
import { DRAWER_WIDTH_FULL } from "@/lib/drawer-sizes";
import { toast } from "sonner";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

type UserStatus = "invited" | "active" | "suspended" | "deactivated";

interface UserRow {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  title: string;
  role_id: string;
  status: UserStatus;
  mfa_enabled: boolean;
  api_access: boolean;
}

interface DepartmentRow {
  id: string;
  code: string;
  name: string;
}

interface TeamRow {
  id: string;
  name: string;
  description: string;
  team_type: string;
  department_id: string | null;
  department_name: string | null;
  active: boolean;
  member_ids: string[];
}

const USER_STATUS_OPTIONS: { value: UserStatus; label: string }[] = [
  { value: "invited", label: "Invited" },
  { value: "active", label: "Active" },
  { value: "suspended", label: "Suspended" },
  { value: "deactivated", label: "Deactivated" },
];

const MOCK_USERS: UserRow[] = [
  {
    id: "u1",
    first_name: "Jane",
    last_name: "Admin",
    email: "jane.admin@example.com",
    username: "jane",
    title: "Admin",
    role_id: "admin",
    status: "active",
    mfa_enabled: true,
    api_access: true,
  },
  {
    id: "u2",
    first_name: "John",
    last_name: "Analyst",
    email: "john.analyst@example.com",
    username: "john",
    title: "Analyst",
    role_id: "analyst",
    status: "active",
    mfa_enabled: false,
    api_access: false,
  },
];

export default function AccountUsersAccessPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<UserRow>>({});

  const [teams, setTeams] = useState<TeamRow[]>([]);
  const [teamsLoading, setTeamsLoading] = useState(true);
  const [departments, setDepartments] = useState<DepartmentRow[]>([]);
  const [teamDialogOpen, setTeamDialogOpen] = useState(false);
  const [teamEditingId, setTeamEditingId] = useState<string | null>(null);
  const [teamForm, setTeamForm] = useState<Partial<TeamRow>>({});
  const [teamMemberQuery, setTeamMemberQuery] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getAuthHeaders = useCallback((): HeadersInit => {
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    return { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) } as HeadersInit;
  }, []);

  const fetchUsers = useCallback(() => {
    setUsersLoading(true);
    fetch(`${API_BASE}/api/account/users/`, { headers: getAuthHeaders() })
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        setUsers(
          (data as Record<string, unknown>[]).map((u) => ({
            id: String(u.id),
            first_name: (u.first_name as string) ?? "",
            last_name: (u.last_name as string) ?? "",
            email: (u.email as string) ?? "",
            username: (u.username as string) ?? "",
            title: (u.title as string) ?? "",
            role_id: (u.role_id as string) ?? "viewer",
            status: ((u.status as string) ?? "active") as UserStatus,
            mfa_enabled: Boolean(u.mfa_enabled),
            api_access: Boolean(u.api_access),
          }))
        );
      })
      .catch(() => setUsers([]))
      .finally(() => setUsersLoading(false));
  }, [getAuthHeaders]);

  const fetchTeams = useCallback(() => {
    setTeamsLoading(true);
    fetch(`${API_BASE}/api/account/teams/`, { headers: getAuthHeaders() })
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        setTeams(
          (Array.isArray(data) ? data : []).map((t: Record<string, unknown>) => ({
            id: String(t.id),
            name: (t.name as string) ?? "",
            description: (t.description as string) ?? "",
            team_type: (t.team_type as string) ?? "custom",
            department_id: t.department_id ? String(t.department_id) : null,
            department_name: (t.department_name as string) ?? null,
            active: Boolean(t.active),
            member_ids: Array.isArray(t.member_ids) ? (t.member_ids as unknown[]).map(String) : [],
          }))
        );
      })
      .catch(() => setTeams([]))
      .finally(() => setTeamsLoading(false));
  }, [getAuthHeaders]);

  const fetchDepartments = useCallback(() => {
    fetch(`${API_BASE}/api/account/departments/`, { headers: getAuthHeaders() })
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        setDepartments(
          (Array.isArray(data) ? data : []).map((d: Record<string, unknown>) => ({
            id: String(d.id),
            code: (d.code as string) ?? "",
            name: (d.name as string) ?? "",
          }))
        );
      })
      .catch(() => setDepartments([]));
  }, [getAuthHeaders]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  const downloadTemplate = () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    fetch(`${API_BASE}/api/account/users/bulk-template/`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then((r) => {
        if (!r.ok) throw new Error(r.status === 401 ? "Please sign in." : `Download failed (${r.status})`);
        return r.blob();
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "users_bulk_template.xlsx";
        a.click();
        URL.revokeObjectURL(url);
        toast.success("Template downloaded");
      })
      .catch((e: Error) => toast.error(e?.message || "Failed to download template"));
  };

  const handleBulkUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    fetch(`${API_BASE}/api/account/users/bulk-upload/`, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    })
      .then(async (r) => {
        const text = await r.text();
        let data: Record<string, unknown> = {};
        try {
          data = JSON.parse(text);
        } catch {
          if (!r.ok) toast.error(text.slice(0, 200) || `Upload failed (${r.status})`);
          return;
        }
        if (!r.ok) {
          toast.error((data.error as string) || `Upload failed (${r.status})`);
          return;
        }
        if ((data.created as number) > 0) {
          toast.success(`${data.created} user(s) added`);
          fetchUsers();
        }
        if ((data.errors as number) > 0 && Array.isArray(data.details)) {
          (data.details as { row: number; email: string; message: string }[]).forEach((d) => {
            toast.error(`Row ${d.row} (${d.email}): ${d.message}`);
          });
        }
        if ((data.skipped as number) > 0 && Array.isArray(data.skipped_details)) {
          (data.skipped_details as { row: number; reason: string; email?: string }[]).forEach((d) => {
            toast.warning(`Row ${d.row} skipped: ${d.reason}${d.email ? ` (${d.email})` : ""}`);
          });
        }
        if ((data.created as number) === 0 && ((data.errors as number) ?? 0) === 0 && ((data.skipped as number) ?? 0) === 0) {
          toast.info("No valid rows to import. Ensure the Users sheet has an email column and at least one row with a valid email.");
        }
      })
      .catch((err) => toast.error(err?.message || "Upload failed (network error)"))
      .finally(() => {
        setUploading(false);
        e.target.value = "";
      });
  };

  const openAdd = () => {
    setEditingId(null);
    setForm({ status: "invited", role_id: "viewer", mfa_enabled: false, api_access: false });
    setDialogOpen(true);
  };

  const openEdit = (user: UserRow) => {
    setEditingId(user.id);
    setForm(user);
    setDialogOpen(true);
  };

  const saveUser = async () => {
    if (!form.email) return;
    const headers = getAuthHeaders();
    try {
      if (editingId) {
        const res = await fetch(`${API_BASE}/api/account/users/${editingId}/`, {
          method: "PATCH",
          headers,
          body: JSON.stringify({
            first_name: form.first_name,
            last_name: form.last_name,
            email: form.email,
            username: form.username,
            title: form.title,
            role_id: form.role_id,
            status: form.status,
            api_access: form.api_access,
          }),
        });
        if (!res.ok) {
          const d = await res.json();
          throw new Error(d.error || "Update failed");
        }
        toast.success("User updated");
      } else {
        const res = await fetch(`${API_BASE}/api/account/users/`, {
          method: "POST",
          headers,
          body: JSON.stringify({
            first_name: form.first_name,
            last_name: form.last_name,
            email: form.email,
            username: form.username,
            title: form.title,
            role_id: form.role_id,
            status: form.status,
            api_access: form.api_access,
          }),
        });
        if (!res.ok) {
          const d = await res.json();
          throw new Error(d.error || "Create failed");
        }
        toast.success("User added");
      }
      fetchUsers();
      setDialogOpen(false);
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Failed to save");
    }
  };

  const deleteUser = async (id: string) => {
    if (!confirm("Remove this user from the organization?")) return;
    try {
      const res = await fetch(`${API_BASE}/api/account/users/${id}/`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("User removed");
      fetchUsers();
      fetchTeams();
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Failed to remove");
    }
  };

  const openAddTeam = () => {
    setTeamEditingId(null);
    setTeamMemberQuery("");
    setTeamForm({
      name: "",
      description: "",
      department_id: null,
      active: true,
      member_ids: [],
    });
    fetchDepartments();
    setTeamDialogOpen(true);
  };

  const openEditTeam = (team: TeamRow) => {
    setTeamEditingId(team.id);
    setTeamMemberQuery("");
    setTeamForm(team);
    fetchDepartments();
    setTeamDialogOpen(true);
  };

  const saveTeam = async () => {
    if (!teamForm.name) return;
    try {
      const payload = {
        name: teamForm.name,
        description: teamForm.description ?? "",
        team_type: (teamForm.team_type ?? "custom") as string,
        department_id: teamForm.department_id || null,
        active: teamForm.active ?? true,
        member_ids: (teamForm.member_ids ?? []) as string[],
      };
      if (teamEditingId) {
        const res = await fetch(`${API_BASE}/api/account/teams/${teamEditingId}/`, {
          method: "PATCH",
          headers: getAuthHeaders(),
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error((err as { error?: string }).error || "Update failed");
        }
        toast.success("Team updated");
      } else {
        const res = await fetch(`${API_BASE}/api/account/teams/`, {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error((err as { error?: string }).error || "Create failed");
        }
        toast.success("Team created");
      }
      setTeamDialogOpen(false);
      fetchTeams();
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Failed to save team");
    }
  };

  const deleteTeam = async (id: string) => {
    if (!confirm("Delete this team?")) return;
    try {
      const res = await fetch(`${API_BASE}/api/account/teams/${id}/`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Team deleted");
      fetchTeams();
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Failed to delete team");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="app-page-title">Users & Access</h1>
        <p className="text-muted-foreground mt-1">
          Manage your organization&apos;s users and teams. Single organization, shared directory.
        </p>
      </div>
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="teams" className="flex items-center gap-2">
            <UsersRound className="h-4 w-4" />
            Teams
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Users
                </CardTitle>
                <CardDescription>
                  Org-level directory of users with system access.
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={openAdd}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add user
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {usersLoading ? (
                <p className="text-sm text-muted-foreground py-8">Loading users…</p>
              ) : (
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40px] text-center text-muted-foreground">#</TableHead>
                      <TableHead className="whitespace-nowrap">First name</TableHead>
                      <TableHead className="whitespace-nowrap">Last name</TableHead>
                      <TableHead className="whitespace-nowrap">Email</TableHead>
                      <TableHead className="whitespace-nowrap">Username</TableHead>
                      <TableHead className="whitespace-nowrap">Title</TableHead>
                      <TableHead className="whitespace-nowrap">Role</TableHead>
                      <TableHead className="whitespace-nowrap">Status</TableHead>
                      <TableHead className="whitespace-nowrap text-center">MFA</TableHead>
                      <TableHead className="whitespace-nowrap text-center">API</TableHead>
                      <TableHead className="w-[100px] text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((u, idx) => (
                      <TableRow key={u.id}>
                        <TableCell className="text-center text-muted-foreground text-xs">{idx + 1}</TableCell>
                        <TableCell className="font-medium">{u.first_name || "—"}</TableCell>
                        <TableCell>{u.last_name || "—"}</TableCell>
                        <TableCell className="max-w-[200px] truncate" title={u.email}>{u.email}</TableCell>
                        <TableCell className="text-muted-foreground">{u.username || "—"}</TableCell>
                        <TableCell>{u.title || "—"}</TableCell>
                        <TableCell><span className="capitalize inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium bg-muted">{u.role_id}</span></TableCell>
                        <TableCell><span className={`capitalize text-xs ${u.status === "active" ? "text-green-600" : u.status === "invited" ? "text-amber-600" : "text-muted-foreground"}`}>{u.status}</span></TableCell>
                        <TableCell className="text-center">{u.mfa_enabled ? "✓" : "—"}</TableCell>
                        <TableCell className="text-center">{u.api_access ? "✓" : "—"}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-1 justify-end">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              aria-label="Edit user"
                              onClick={() => openEdit(u)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:text-destructive"
                              aria-label="Delete user"
                              onClick={() => deleteUser(u.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {users.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={11} className="text-center text-sm text-muted-foreground py-12">
                          No users yet. Click "Add user" to get started.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="teams">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <UsersRound className="h-5 w-5" />
                  Teams
                </CardTitle>
                <CardDescription>
                  Logical groupings for ownership and routing. Teams will later link to assets and environments.
                </CardDescription>
              </div>
              <Button size="sm" onClick={openAddTeam}>
                <Plus className="h-4 w-4 mr-2" />
                Add team
              </Button>
            </CardHeader>
            <CardContent>
              {teamsLoading ? (
                <p className="text-sm text-muted-foreground py-8">Loading teams…</p>
              ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Members</TableHead>
                    <TableHead>Active</TableHead>
                    <TableHead className="w-[120px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teams.map((t) => (
                    <TableRow key={t.id}>
                      <TableCell>{t.name}</TableCell>
                      <TableCell>{t.description}</TableCell>
                      <TableCell>{t.department_name ?? t.team_type ?? "—"}</TableCell>
                      <TableCell>{t.member_ids?.length ?? 0}</TableCell>
                      <TableCell>{t.active ? "Yes" : "No"}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            aria-label="Edit team"
                            onClick={() => openEditTeam(t)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            aria-label="Delete team"
                            onClick={() => deleteTeam(t.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {teams.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-sm text-muted-foreground py-6">
                        No teams yet. Use &quot;Add team&quot; to create your first team.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* User add/edit drawer — same pattern as Discovery Asset inventory */}
      {dialogOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <>
            <div
              className="fixed inset-0 bg-black/20 z-40"
              style={{ top: 0, left: 0, right: 0, bottom: 0 }}
              aria-hidden
              onClick={() => setDialogOpen(false)}
            />
            <aside
              className={`fixed right-0 w-full ${DRAWER_WIDTH_FULL} bg-background border-l shadow-xl z-50 flex flex-col`}
              style={{ top: 0, height: "100vh" }}
              aria-label={editingId ? "Edit user" : "Add user"}
            >
              <div className="flex h-16 shrink-0 items-center justify-between px-4 border-b bg-background">
                <h2 className="text-lg font-semibold">
                  {editingId ? "Edit user" : "Add user"}
                </h2>
                <button
                  type="button"
                  className="p-2 rounded-md hover:bg-muted"
                  onClick={() => setDialogOpen(false)}
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <section className="rounded-lg border bg-muted/30 p-4 sm:col-span-2">
                    <h4 className="mb-3 text-sm font-semibold text-muted-foreground">Identity</h4>
                    <div className="space-y-3">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-1.5">
                          <Label htmlFor="first_name">First name</Label>
                          <Input id="first_name" value={form.first_name ?? ""} onChange={(e) => setForm((f) => ({ ...f, first_name: e.target.value }))} className="h-9" />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="last_name">Last name</Label>
                          <Input id="last_name" value={form.last_name ?? ""} onChange={(e) => setForm((f) => ({ ...f, last_name: e.target.value }))} className="h-9" />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={form.email ?? ""} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className="h-9" />
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-1.5">
                          <Label htmlFor="username">Username (optional)</Label>
                          <Input id="username" value={form.username ?? ""} onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))} className="h-9" />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="title">Title</Label>
                          <Input id="title" value={form.title ?? ""} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className="h-9" />
                        </div>
                      </div>
                    </div>
                  </section>
                  <section className="rounded-lg border bg-muted/30 p-4 sm:col-span-2">
                    <h4 className="mb-3 text-sm font-semibold text-muted-foreground">Access</h4>
                    <div className="space-y-3">
                      <div className="space-y-1.5">
                        <Label htmlFor="role">Role</Label>
                        <Select value={(form.role_id ?? "viewer") as string} onValueChange={(v) => setForm((f) => ({ ...f, role_id: v }))}>
                          <SelectTrigger id="role" className="h-9"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="agency">Agency</SelectItem>
                            <SelectItem value="executive">Executive</SelectItem>
                            <SelectItem value="director">Director</SelectItem>
                            <SelectItem value="manager">Manager</SelectItem>
                            <SelectItem value="analyst">Analyst</SelectItem>
                            <SelectItem value="auditor">Auditor</SelectItem>
                            <SelectItem value="viewer">Viewer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="status">Status</Label>
                        <Select value={(form.status ?? "invited") as UserStatus} onValueChange={(v) => setForm((f) => ({ ...f, status: v as UserStatus }))}>
                          <SelectTrigger id="status" className="h-9"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {USER_STATUS_OPTIONS.map((o) => (
                              <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="mfa_enabled" checked={form.mfa_enabled ?? false} onCheckedChange={(c) => setForm((f) => ({ ...f, mfa_enabled: Boolean(c) }))} />
                        <Label htmlFor="mfa_enabled">MFA enabled</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="api_access" checked={form.api_access ?? false} onCheckedChange={(c) => setForm((f) => ({ ...f, api_access: Boolean(c) }))} />
                        <Label htmlFor="api_access">API access</Label>
                      </div>
                    </div>
                  </section>
                </div>
                <div className="mt-6 flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setDialogOpen(false)}>Cancel</Button>
                  <Button size="sm" onClick={saveUser}>{editingId ? "Save" : "Add user"}</Button>
                </div>
              </div>
            </aside>
          </>,
          document.body
        )}

      {/* Team add/edit drawer — same pattern as Discovery Asset inventory */}
      {teamDialogOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <>
            <div
              className="fixed inset-0 bg-black/20 z-40"
              style={{ top: 0, left: 0, right: 0, bottom: 0 }}
              aria-hidden
              onClick={() => setTeamDialogOpen(false)}
            />
            <aside
              className={`fixed right-0 w-full ${DRAWER_WIDTH_FULL} bg-background border-l shadow-xl z-50 flex flex-col`}
              style={{ top: 0, height: "100vh" }}
              aria-label={teamEditingId ? "Edit team" : "Add team"}
            >
              <div className="flex h-16 shrink-0 items-center justify-between px-4 border-b bg-background">
                <h2 className="text-lg font-semibold">
                  {teamEditingId ? "Edit team" : "Add team"}
                </h2>
                <button
                  type="button"
                  className="p-2 rounded-md hover:bg-muted"
                  onClick={() => setTeamDialogOpen(false)}
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <div className="grid gap-4">
                  <section className="rounded-lg border bg-muted/30 p-4">
                    <h4 className="mb-3 text-sm font-semibold text-muted-foreground">Team details</h4>
                    <div className="space-y-3">
                      <div className="space-y-1.5">
                        <Label htmlFor="team_name">Team name</Label>
                        <Input
                          id="team_name"
                          className="h-9"
                          value={teamForm.name ?? ""}
                          onChange={(e) => setTeamForm((f) => ({ ...f, name: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="team_description">Description</Label>
                        <Input
                          id="team_description"
                          className="h-9"
                          value={teamForm.description ?? ""}
                          onChange={(e) => setTeamForm((f) => ({ ...f, description: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="team_department">Department</Label>
                        <Select
                          value={teamForm.department_id ?? "__none__"}
                          onValueChange={(value) =>
                            setTeamForm((f) => ({ ...f, department_id: value === "__none__" ? null : value }))
                          }
                        >
                          <SelectTrigger id="team_department" className="h-9">
                            <SelectValue placeholder="Select department (optional)" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="__none__">None</SelectItem>
                            {departments.map((d) => (
                              <SelectItem key={d.id} value={d.id}>
                                {d.name}{d.code ? ` (${d.code})` : ""}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="team_active"
                          checked={teamForm.active ?? true}
                          onCheckedChange={(checked) =>
                            setTeamForm((f) => ({ ...f, active: Boolean(checked) }))
                          }
                        />
                        <Label htmlFor="team_active">Active</Label>
                      </div>
                    </div>
                  </section>

                  <section className="rounded-lg border bg-muted/30 p-4">
                    <h4 className="mb-3 text-sm font-semibold text-muted-foreground">Members</h4>
                    <div className="space-y-3">
                      <div className="space-y-1.5">
                        <Label htmlFor="team_member_search">Search users</Label>
                        <Input
                          id="team_member_search"
                          className="h-9"
                          placeholder="Search by name or email"
                          value={teamMemberQuery}
                          onChange={(e) => setTeamMemberQuery(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="text-xs font-medium text-muted-foreground">In this team</div>
                        <div className="divide-y rounded-md border bg-background">
                          {users
                            .filter((u) => (teamForm.member_ids ?? []).includes(u.id))
                            .map((u) => (
                              <div key={u.id} className="flex items-center justify-between gap-3 p-2">
                                <div className="min-w-0">
                                  <div className="truncate text-sm font-medium">
                                    {u.first_name} {u.last_name}
                                  </div>
                                  <div className="truncate text-xs text-muted-foreground">{u.email}</div>
                                </div>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    setTeamForm((f) => ({
                                      ...f,
                                      member_ids: (f.member_ids ?? []).filter((mid) => mid !== u.id),
                                    }))
                                  }
                                >
                                  Remove
                                </Button>
                              </div>
                            ))}
                          {(teamForm.member_ids ?? []).length === 0 && (
                            <div className="p-3 text-sm text-muted-foreground">No members yet.</div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-xs font-medium text-muted-foreground">Add users</div>
                        <div className="divide-y rounded-md border bg-background">
                          {users
                            .filter((u) => {
                              const q = teamMemberQuery.trim().toLowerCase();
                              const matches =
                                q.length === 0
                                  ? true
                                  : `${u.first_name} ${u.last_name} ${u.email} ${u.username}`
                                      .toLowerCase()
                                      .includes(q);
                              const alreadyInTeam = (teamForm.member_ids ?? []).includes(u.id);
                              return matches && !alreadyInTeam;
                            })
                            .slice(0, 10)
                            .map((u) => (
                              <div key={u.id} className="flex items-center justify-between gap-3 p-2">
                                <div className="min-w-0">
                                  <div className="truncate text-sm font-medium">
                                    {u.first_name} {u.last_name}
                                  </div>
                                  <div className="truncate text-xs text-muted-foreground">{u.email}</div>
                                </div>
                                <Button
                                  type="button"
                                  size="sm"
                                  onClick={() =>
                                    setTeamForm((f) => ({
                                      ...f,
                                      member_ids: Array.from(new Set([...(f.member_ids ?? []), u.id])),
                                    }))
                                  }
                                >
                                  Add
                                </Button>
                              </div>
                            ))}
                          {users.filter((u) => !(teamForm.member_ids ?? []).includes(u.id)).length ===
                            0 && (
                            <div className="p-3 text-sm text-muted-foreground">
                              Everyone is already in this team.
                            </div>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Showing up to 10 matches. Refine your search to find specific users.
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
                <div className="mt-6 flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setTeamDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button size="sm" onClick={saveTeam}>
                    {teamEditingId ? "Save" : "Add team"}
                  </Button>
                </div>
              </div>
            </aside>
          </>,
          document.body
        )}
    </div>
  );
}
