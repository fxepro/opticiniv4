"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tag,
  Server,
  Database,
  FileText,
  CheckCircle2,
  XCircle,
  Loader2,
  Plus,
  Pencil,
  Check,
  Star,
} from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? (typeof window !== "undefined" ? "" : "http://localhost:8000");
const STUDIO_VERSION = process.env.NEXT_PUBLIC_APP_VERSION ?? "0.1.0";

interface VersionRelease {
  id: string;
  version: string;
  release_notes: string;
  status: string;
  is_current: boolean;
  proposed_by: string | null;
  approved_by: string | null;
  approved_at: string | null;
  created_at: string;
  updated_at: string;
}

function getAuthHeaders(): Record<string, string> {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

export default function VersioningPage() {
  const [backendVersion, setBackendVersion] = useState<string | null>(null);
  const [health, setHealth] = useState<{ status: string; version?: string } | null>(null);
  const [releases, setReleases] = useState<VersionRelease[]>([]);
  const [loading, setLoading] = useState(true);
  const [releasesLoading, setReleasesLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [newVersion, setNewVersion] = useState("");
  const [newNotes, setNewNotes] = useState("");
  const [editRelease, setEditRelease] = useState<VersionRelease | null>(null);
  const [editNotes, setEditNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const base = API_BASE?.replace(/\/$/, "") || "";

  const fetchReleases = useCallback(() => {
    setReleasesLoading(true);
    axios
      .get(`${base}/api/version/releases/`, { headers: getAuthHeaders() })
      .then((res) => setReleases(res.data))
      .catch(() => setReleases([]))
      .finally(() => setReleasesLoading(false));
  }, [base]);

  useEffect(() => {
    Promise.all([
      axios.get(`${base}/api/version/`).then((r) => r.data),
      axios.get(`${base}/api/`).then((r) => r.data).catch(() => ({ status: "unhealthy" })),
    ])
      .then(([ver, h]) => {
        setBackendVersion(ver.version ?? null);
        setHealth(h);
      })
      .catch((err) => {
        setError(err.message || "Failed to fetch version info");
      })
      .finally(() => setLoading(false));
    fetchReleases();
  }, [base, fetchReleases]);

  const handleAddRelease = () => {
    if (!newVersion.trim()) {
      toast.error("Version is required");
      return;
    }
    setSubmitting(true);
    axios
      .post(
        `${base}/api/version/releases/create/`,
        { version: newVersion.trim(), release_notes: newNotes.trim(), status: "draft" },
        { headers: getAuthHeaders() }
      )
      .then(() => {
        toast.success("Release created");
        setAddOpen(false);
        setNewVersion("");
        setNewNotes("");
        fetchReleases();
        axios.get(`${base}/api/version/`).then((r) => setBackendVersion(r.data.version));
      })
      .catch((err) => {
        toast.error(err.response?.data?.error || "Failed to create release");
      })
      .finally(() => setSubmitting(false));
  };

  const handleUpdateRelease = (id: string, data: { release_notes?: string; status?: string; set_current?: boolean }) => {
    setSubmitting(true);
    axios
      .patch(`${base}/api/version/releases/${id}/`, data, { headers: getAuthHeaders() })
      .then((res) => {
        setReleases((prev) => prev.map((r) => (r.id === id ? res.data : r)));
        setEditOpen(false);
        setEditRelease(null);
        toast.success("Release updated");
        axios.get(`${base}/api/version/`).then((r) => setBackendVersion(r.data.version));
      })
      .catch((err) => {
        toast.error(err.response?.data?.error || "Failed to update");
      })
      .finally(() => setSubmitting(false));
  };

  const openEdit = (r: VersionRelease) => {
    setEditRelease(r);
    setEditNotes(r.release_notes);
    setEditOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="app-page-title">Versioning</h1>
        <p className="text-muted-foreground mt-1">
          Backend version, health, release history. Admin: add notes and approve releases.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading…
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5" />
                  Backend (current)
                </CardTitle>
                <CardDescription>Live version and health</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {error && (
                  <p className="text-sm text-destructive flex items-center gap-2">
                    <XCircle className="h-4 w-4" />
                    {error}
                  </p>
                )}
                {backendVersion && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Version</span>
                    <Badge variant="secondary" className="font-mono">
                      {backendVersion}
                    </Badge>
                  </div>
                )}
                {health && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Status</span>
                    {health.status === "healthy" ? (
                      <Badge className="bg-green-100 text-green-800 border-green-200 flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Healthy
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="flex items-center gap-1">
                        <XCircle className="h-3.5 w-3.5" />
                        Unhealthy
                      </Badge>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="h-5 w-5" />
                  Studio (frontend)
                </CardTitle>
                <CardDescription>This UI build version</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Version</span>
                  <Badge variant="outline" className="font-mono">
                    {STUDIO_VERSION}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Release history</CardTitle>
                <CardDescription>Version entries: add notes and approve (admin)</CardDescription>
              </div>
              <Button onClick={() => setAddOpen(true)} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add release
              </Button>
            </CardHeader>
            <CardContent>
              {releasesLoading ? (
                <div className="flex items-center gap-2 text-muted-foreground py-4">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading releases…
                </div>
              ) : releases.length === 0 ? (
                <p className="text-sm text-muted-foreground py-4">No releases yet. Add one to track version and notes.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Version</TableHead>
                      <TableHead>Notes</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Approved by</TableHead>
                      <TableHead>Current</TableHead>
                      <TableHead className="w-32">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {releases.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell className="font-mono font-medium">{r.version}</TableCell>
                        <TableCell className="max-w-xs truncate text-muted-foreground">{r.release_notes || "—"}</TableCell>
                        <TableCell>
                          <Badge variant={r.status === "approved" ? "default" : "secondary"}>{r.status}</Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {r.approved_by ?? "—"}
                          {r.approved_at && (
                            <span className="block text-xs">{new Date(r.approved_at).toLocaleDateString()}</span>
                          )}
                        </TableCell>
                        <TableCell>{r.is_current ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : "—"}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" onClick={() => openEdit(r)} title="Edit notes / Approve">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            {r.status !== "approved" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleUpdateRelease(r.id, { status: "approved" })}
                                title="Approve"
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                            )}
                            {r.status === "approved" && !r.is_current && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleUpdateRelease(r.id, { set_current: true })}
                                title="Set as current"
                              >
                                <Star className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Database &amp; migrations
              </CardTitle>
              <CardDescription>Where schema and migrations live</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>
                Migrations are managed by Django per app and database alias (core, org, compliance, evidence, audit).
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>core</strong> — organizations, teams, environments, version_releases</li>
                <li><strong>org</strong> — personnel, departments, roles (platform_org)</li>
                <li><strong>compliance</strong> — frameworks, requirements, controls, mappings</li>
                <li><strong>evidence</strong> — evidence_items, evidence_links</li>
                <li><strong>audit</strong> — audits, test_plans, test_instances, exceptions</li>
              </ul>
              <p className="pt-2 flex items-center gap-2">
                <FileText className="h-4 w-4 shrink-0" />
                See <code className="text-xs bg-muted px-1 rounded">compliance/migrations/README_RUN_MIGRATIONS.md</code> and <code className="text-xs bg-muted px-1 rounded">docs/VERSIONING.md</code>.
              </p>
            </CardContent>
          </Card>
        </>
      )}

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add release</DialogTitle>
            <DialogDescription>Create a new version entry (draft). Admin can add notes and approve.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="new-version">Version (e.g. 0.1.0)</Label>
              <Input
                id="new-version"
                value={newVersion}
                onChange={(e) => setNewVersion(e.target.value)}
                placeholder="0.2.0"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="new-notes">Release notes (changes)</Label>
              <Textarea
                id="new-notes"
                value={newNotes}
                onChange={(e) => setNewNotes(e.target.value)}
                placeholder="Optional notes…"
                rows={3}
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button onClick={handleAddRelease} disabled={submitting}>
              {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={editOpen} onOpenChange={(open) => { setEditOpen(open); if (!open) setEditRelease(null); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit release · {editRelease?.version}</DialogTitle>
            <DialogDescription>Add or edit notes; approve; set as current (admin).</DialogDescription>
          </DialogHeader>
          {editRelease && (
            <div className="space-y-4 py-4">
              <div>
                <Label>Release notes</Label>
                <Textarea
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  rows={4}
                  className="mt-1"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  onClick={() => handleUpdateRelease(editRelease.id, { release_notes: editNotes })}
                  disabled={submitting}
                >
                  Save notes
                </Button>
                {editRelease.status !== "approved" && (
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleUpdateRelease(editRelease.id, { status: "approved", release_notes: editNotes })}
                    disabled={submitting}
                  >
                    Approve
                  </Button>
                )}
                {editRelease.status === "approved" && !editRelease.is_current && (
                  <Button
                    size="sm"
                    variant="default"
                    onClick={() => handleUpdateRelease(editRelease.id, { set_current: true })}
                    disabled={submitting}
                  >
                    Set as current
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
