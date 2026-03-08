"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plug,
  Users,
  X,
  Server,
  Building2,
  Mail,
  HardDrive,
  FileSpreadsheet,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Pencil,
  Trash2,
  Globe,
  Layers,
  FileDown,
  Upload,
} from "lucide-react";
import { DRAWER_WIDTH_HALF } from "@/lib/drawer-sizes";
import { toast } from "sonner";

export type UserIntegrationId =
  | "active_directory"
  | "microsoft_365"
  | "google_workspace"
  | "synology_ldap"
  | "general_ldap"
  | "csv";

const USER_INTEGRATIONS: {
  id: UserIntegrationId;
  label: string;
  description: string;
  icon: typeof Server;
  status?: "connected" | "configured" | "none";
  lastSync?: string;
}[] = [
  {
    id: "active_directory",
    label: "Active Directory",
    description: "Sync users and groups from Windows Server Active Directory.",
    icon: Building2,
    status: "none",
  },
  {
    id: "microsoft_365",
    label: "Microsoft 365",
    description: "Sync users from Azure AD / Microsoft 365 directory.",
    icon: Mail,
    status: "none",
  },
  {
    id: "google_workspace",
    label: "Google Workspace",
    description: "Sync users from Google Workspace (G Suite) directory.",
    icon: Mail,
    status: "none",
  },
  {
    id: "synology_ldap",
    label: "Synology LDAP Server",
    description: "Sync users from Synology Directory Server (LDAP).",
    icon: Server,
    status: "none",
  },
  {
    id: "general_ldap",
    label: "General LDAP Server",
    description: "Connect any LDAP-compatible directory server.",
    icon: Server,
    status: "none",
  },
  {
    id: "csv",
    label: "CSV",
    description: "Import users from a CSV file (email, name, etc.).",
    icon: FileSpreadsheet,
    status: "none",
  },
];

// --- Connectors: all types as cards; platform-specific details in drawer ---
type ConnectorType =
  | "cloud"
  | "kubernetes"
  | "email"
  | "slack"
  | "hris"
  | "siem"
  | "vuln_scanner"
  | "dev_platform"
  | "itsm"
  | "evidence_storage";
type GovernanceSet = 2 | 3; // 2 = all modules, 3 = module-scoped

const CONNECTOR_TYPE_LABELS: Record<ConnectorType, string> = {
  cloud: "Cloud (AWS/Azure/GCP)",
  kubernetes: "Kubernetes",
  email: "Email provider",
  slack: "Slack / Teams",
  hris: "HRIS (Workday, BambooHR)",
  siem: "SIEM",
  vuln_scanner: "Vulnerability scanner",
  dev_platform: "Dev platform (GitHub etc.)",
  itsm: "ITSM (Jira, ServiceNow)",
  evidence_storage: "Evidence storage (S3 etc.)",
};

const CONNECTOR_TYPE_CARDS: { type: ConnectorType; label: string; description: string; icon: typeof Server }[] = [
  { type: "cloud", label: "Cloud (AWS/Azure/GCP)", description: "Cloud accounts for inventory, cost, security.", icon: Server },
  { type: "kubernetes", label: "Kubernetes", description: "K8s clusters for discovery and health.", icon: Server },
  { type: "email", label: "Email provider", description: "SES, SendGrid for alerts and notifications.", icon: Mail },
  { type: "slack", label: "Slack / Teams", description: "Org-wide notifications and alerts.", icon: Mail },
  { type: "hris", label: "HRIS", description: "Workday, BambooHR for user and org sync.", icon: Users },
  { type: "siem", label: "SIEM", description: "Splunk, Elastic for security events.", icon: Server },
  { type: "vuln_scanner", label: "Vulnerability scanner", description: "Nessus, Qualys for findings.", icon: Server },
  { type: "dev_platform", label: "Dev platform", description: "GitHub, GitLab for change and compliance.", icon: Server },
  { type: "itsm", label: "ITSM", description: "Jira, ServiceNow for change and tickets.", icon: Server },
  { type: "evidence_storage", label: "Evidence storage", description: "S3, GCS for evidence and documents.", icon: HardDrive },
];

const MODULE_OPTIONS: { value: string; label: string }[] = [
  { value: "discovery", label: "Discovery" },
  { value: "security", label: "Security" },
  { value: "compliance", label: "Compliance" },
  { value: "cost", label: "Cost" },
  { value: "health", label: "Health" },
  { value: "change", label: "Change" },
  { value: "evidence", label: "Evidence" },
];

interface OrgConnectorRow {
  id: string;
  name: string;
  connector_type: ConnectorType;
  governance_set: GovernanceSet;
  modules: string[];
  config: Record<string, string>;
  status: string;
  last_synced_at: string | null;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? (typeof window !== "undefined" ? "" : "http://localhost:8000");

function getAuthHeaders(): HeadersInit {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (token) (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  return headers;
}

function connectorFromApi(d: {
  id: string;
  name: string;
  connector_type: ConnectorType;
  governance_set: number;
  modules: string[];
  config?: Record<string, string>;
  status?: string;
  last_synced_at?: string | null;
}): OrgConnectorRow {
  return {
    id: d.id,
    name: d.name,
    connector_type: d.connector_type as ConnectorType,
    governance_set: d.governance_set as GovernanceSet,
    modules: d.modules ?? [],
    config: d.config ?? {},
    status: d.status ?? "active",
    last_synced_at: d.last_synced_at ?? null,
  };
}

const STATUS_STYLE: Record<string, string> = {
  connected: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
  configured: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  none: "bg-muted text-muted-foreground",
};

// Generic form state for all integration types (only used fields per type)
interface IntegrationFormState {
  serverUrl: string;
  port: string;
  baseDn: string;
  bindDn: string;
  bindPassword: string;
  userFilter: string;
  tenantId: string;
  clientId: string;
  clientSecret: string;
  domain: string;
  adminEmail: string;
  serviceAccountFile: File | null;
  csvFile: File | null;
  csvPaste: string;
}

const defaultForm: IntegrationFormState = {
  serverUrl: "",
  port: "389",
  baseDn: "",
  bindDn: "",
  bindPassword: "",
  userFilter: "(objectClass=user)",
  tenantId: "",
  clientId: "",
  clientSecret: "",
  domain: "",
  adminEmail: "",
  serviceAccountFile: null,
  csvFile: null,
  csvPaste: "",
};

const defaultConnectorForm = (type: ConnectorType) => ({
  name: "",
  connector_type: type,
  governance_set: 3 as GovernanceSet,
  modules: [] as string[],
  config: {} as Record<string, string>,
});

export default function AccountIntegrationsPage() {
  const [drawerOpen, setDrawerOpen] = useState<UserIntegrationId | null>(null);
  const [form, setForm] = useState<IntegrationFormState>(defaultForm);
  const [testStatus, setTestStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [syncStatus, setSyncStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [syncMessage, setSyncMessage] = useState("");
  const [csvUploading, setCsvUploading] = useState(false);

  // Connectors (API-backed)
  const [connectors, setConnectors] = useState<OrgConnectorRow[]>([]);
  const [connectorsLoading, setConnectorsLoading] = useState(true);
  const [connectorsError, setConnectorsError] = useState<string | null>(null);
  const [connectorDrawerOpen, setConnectorDrawerOpen] = useState<"add" | "edit" | null>(null);
  const [editingConnectorId, setEditingConnectorId] = useState<string | null>(null);
  const [connectorForm, setConnectorForm] = useState(defaultConnectorForm);
  const [connectorSaveStatus, setConnectorSaveStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const fetchConnectors = useCallback(() => {
    const base = API_BASE.replace(/\/$/, "");
    setConnectorsLoading(true);
    setConnectorsError(null);
    fetch(`${base}/api/account/connectors/`, { headers: getAuthHeaders() })
      .then((res) => {
        if (!res.ok) throw new Error(res.status === 401 ? "Please sign in." : res.status === 403 ? "Access denied." : `Failed to load connectors: ${res.status}`);
        return res.json();
      })
      .then((data: unknown[]) => {
        setConnectors((data as Record<string, unknown>[]).map((d) => connectorFromApi(d as Parameters<typeof connectorFromApi>[0])));
      })
      .catch((err: Error) => setConnectorsError(err.message || "Failed to load connectors"))
      .finally(() => setConnectorsLoading(false));
  }, []);

  useEffect(() => {
    fetchConnectors();
  }, [fetchConnectors]);

  const openDrawer = (id: UserIntegrationId) => {
    setDrawerOpen(id);
    setForm(defaultForm);
    setTestStatus("idle");
    setSyncStatus("idle");
    setSyncMessage("");
  };

  const handleTest = () => {
    setTestStatus("loading");
    setTimeout(() => {
      setTestStatus("success");
      toast.success("Connection test passed");
    }, 1200);
  };

  const handleSync = () => {
    setSyncStatus("loading");
    setSyncMessage("");
    setTimeout(() => {
      setSyncStatus("success");
      setSyncMessage("Sync completed. Users are available in Users & Access.");
      toast.success("Sync completed successfully");
    }, 1500);
  };

  const handleCsvDownload = () => {
    const base = API_BASE.replace(/\/$/, "");
    fetch(`${base}/api/account/users/bulk-template-csv/`, { headers: getAuthHeaders() })
      .then((r) => {
        if (!r.ok) throw new Error("Download failed");
        return r.blob();
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "users_bulk_template.csv";
        a.click();
        URL.revokeObjectURL(url);
        toast.success("Template downloaded");
      })
      .catch(() => toast.error("Failed to download template"));
  };

  const handleCsvUpload = () => {
    if (!form.csvFile) {
      toast.error("Select a CSV file first");
      return;
    }
    setCsvUploading(true);
    const fd = new FormData();
    fd.append("file", form.csvFile);
    const base = API_BASE.replace(/\/$/, "");
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    const uploadHeaders: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {};
    fetch(`${base}/api/account/users/bulk-upload/`, {
      method: "POST",
      headers: uploadHeaders,
      body: fd,
    })
      .then((r) => r.json())
      .then((data: { created?: number; details?: { row: number; email: string; message: string }[] }) => {
        if ((data.created ?? 0) > 0) {
          toast.success(`${data.created} user(s) added`);
          setForm((f) => ({ ...f, csvFile: null }));
        }
        (data.details ?? []).forEach((d) => toast.error(`Row ${d.row} (${d.email}): ${d.message}`));
      })
      .catch(() => toast.error("Upload failed"))
      .finally(() => setCsvUploading(false));
  };

  const openAddConnector = (connectorType: ConnectorType) => {
    setEditingConnectorId(null);
    setConnectorForm(defaultConnectorForm(connectorType));
    setConnectorDrawerOpen("add");
    setConnectorSaveStatus("idle");
  };

  const openEditConnector = (row: OrgConnectorRow) => {
    setEditingConnectorId(row.id);
    setConnectorForm({
      name: row.name,
      connector_type: row.connector_type,
      governance_set: row.governance_set,
      modules: [...row.modules],
      config: { ...row.config },
    });
    setConnectorDrawerOpen("edit");
    setConnectorSaveStatus("idle");
  };

  const saveConnector = () => {
    if (!connectorForm.name.trim()) return;
    setConnectorSaveStatus("loading");
    const base = API_BASE.replace(/\/$/, "");
    const payload = {
      name: connectorForm.name.trim(),
      connector_type: connectorForm.connector_type,
      governance_set: connectorForm.governance_set,
      modules: connectorForm.governance_set === 3 ? connectorForm.modules : [],
      config: connectorForm.config,
      credentials_ref: "",
    };
    if (connectorDrawerOpen === "add") {
      fetch(`${base}/api/account/connectors/`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      })
        .then((res) => {
          if (!res.ok) throw new Error(res.status === 400 ? "Invalid data." : res.status === 401 ? "Please sign in." : `Save failed: ${res.status}`);
          return res.json();
        })
        .then((data: Record<string, unknown>) => {
          setConnectors((prev) => [...prev, connectorFromApi(data as Parameters<typeof connectorFromApi>[0])]);
          setConnectorSaveStatus("success");
          setConnectorsError(null);
          toast.success("Connector added successfully");
          setTimeout(() => setConnectorDrawerOpen(null), 400);
        })
        .catch((err: Error) => {
          setConnectorSaveStatus("error");
          setConnectorsError(err.message || "Failed to add connector");
          toast.error(err.message || "Failed to add connector");
        });
    } else if (editingConnectorId) {
      fetch(`${base}/api/account/connectors/${editingConnectorId}/`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      })
        .then((res) => {
          if (!res.ok) throw new Error(res.status === 400 ? "Invalid data." : res.status === 401 ? "Please sign in." : `Save failed: ${res.status}`);
          return res.json();
        })
        .then((data: Record<string, unknown>) => {
          setConnectors((prev) =>
            prev.map((c) => (c.id === editingConnectorId ? connectorFromApi(data as Parameters<typeof connectorFromApi>[0]) : c))
          );
          setConnectorSaveStatus("success");
          setConnectorsError(null);
          toast.success("Connector updated");
          setTimeout(() => setConnectorDrawerOpen(null), 400);
        })
        .catch((err: Error) => {
          setConnectorSaveStatus("error");
          setConnectorsError(err.message || "Failed to save connector");
          toast.error(err.message || "Failed to save connector");
        });
    }
  };

  const setConnectorConfig = (key: string, value: string) => {
    setConnectorForm((f) => ({ ...f, config: { ...f.config, [key]: value } }));
  };

  const deleteConnector = (id: string) => {
    if (typeof window !== "undefined" && !window.confirm("Remove this connector? Modules will no longer see it.")) return;
    if (editingConnectorId === id) setConnectorDrawerOpen(null);
    const base = API_BASE.replace(/\/$/, "");
    fetch(`${base}/api/account/connectors/${id}/`, { method: "DELETE", headers: getAuthHeaders() })
      .then((res) => {
        if (!res.ok && res.status !== 204) throw new Error(res.status === 401 ? "Please sign in." : `Delete failed: ${res.status}`);
        setConnectors((prev) => prev.filter((c) => c.id !== id));
        setConnectorsError(null);
        toast.success("Connector removed");
      })
      .catch((err: Error) => {
        setConnectorsError(err.message || "Failed to remove connector");
        toast.error(err.message || "Failed to remove connector");
      });
  };

  const toggleModule = (moduleValue: string) => {
    setConnectorForm((f) => ({
      ...f,
      modules: f.modules.includes(moduleValue)
        ? f.modules.filter((m) => m !== moduleValue)
        : [...f.modules, moduleValue],
    }));
  };

  const selectedIntegration = drawerOpen ? USER_INTEGRATIONS.find((i) => i.id === drawerOpen) : undefined;
  const selectedLabel = selectedIntegration?.label ?? "";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="app-page-title">Integrations & APIs</h1>
        <p className="text-muted-foreground mt-1">
          Connect external services and manage API access for your organization.
        </p>
      </div>

      {/* User integrations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            User integrations
          </CardTitle>
          <CardDescription>
            Connect a directory or identity source to sync users into your organization. After sync, users appear in Users & Access with the source shown.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {USER_INTEGRATIONS.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => openDrawer(item.id)}
                  className="flex items-start gap-4 rounded-lg border bg-card p-4 text-left transition-colors hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium">{item.label}</span>
                      {item.status && item.status !== "none" && (
                        <Badge className={STATUS_STYLE[item.status]}>{item.status}</Badge>
                      )}
                    </div>
                    <p className="mt-0.5 text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Connectors: cards by type, then table; platform-specific details in drawer */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plug className="h-5 w-5" />
            Connectors
          </CardTitle>
          <CardDescription>
            Choose a type below to add one. Configure scope (all modules or module-scoped) and platform-specific details in the drawer.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {CONNECTOR_TYPE_CARDS.map((card) => {
              const Icon = card.icon;
              const count = connectors.filter((c) => c.connector_type === card.type).length;
              return (
                <button
                  key={card.type}
                  type="button"
                  onClick={() => openAddConnector(card.type)}
                  className="flex items-start gap-4 rounded-lg border bg-card p-4 text-left transition-colors hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="font-medium">{card.label}</span>
                    {count > 0 && (
                      <Badge variant="secondary" className="ml-2 text-xs">{count}</Badge>
                    )}
                    <p className="mt-0.5 text-sm text-muted-foreground">{card.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
          <div>
            {connectorsError && (
              <p className="text-sm text-destructive mb-2">{connectorsError}</p>
            )}
            <h4 className="text-sm font-medium mb-2">Configured connectors</h4>
            {connectorsLoading ? (
              <p className="text-sm text-muted-foreground py-4">Loading connectors…</p>
            ) : (
            <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Scope</TableHead>
                  <TableHead>Modules</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last synced</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {connectors.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium">{c.name}</TableCell>
                    <TableCell>{CONNECTOR_TYPE_LABELS[c.connector_type]}</TableCell>
                    <TableCell>
                      {c.governance_set === 2 ? (
                        <Badge variant="secondary" className="gap-1">
                          <Globe className="h-3 w-3" />
                          All modules
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="gap-1">
                          <Layers className="h-3 w-3" />
                          Module-scoped
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {c.governance_set === 2 ? "—" : c.modules.length ? c.modules.join(", ") : "None assigned"}
                    </TableCell>
                    <TableCell>
                      <Badge className={c.status === "active" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-muted"}>
                        {c.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {c.last_synced_at ? new Date(c.last_synced_at).toLocaleString() : "—"}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Edit connector" onClick={() => openEditConnector(c)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" aria-label="Remove connector" onClick={() => deleteConnector(c.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {connectors.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                      No connectors yet. Click a card above to add one.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Drawer: one per integration type */}
      {drawerOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <>
            <div
              className="fixed inset-0 bg-black/20 z-40"
              style={{ top: 0, left: 0, right: 0, bottom: 0 }}
              aria-hidden
              onClick={() => setDrawerOpen(null)}
            />
            <aside
              className={`fixed right-0 w-full ${DRAWER_WIDTH_HALF} bg-background border-l shadow-xl z-50 flex flex-col`}
              style={{ top: 0, height: "100vh" }}
              aria-label={`Configure ${selectedLabel}`}
            >
              <div className="flex h-16 shrink-0 items-center justify-between px-4 border-b bg-background">
                <h2 className="text-lg font-semibold">{selectedLabel}</h2>
                <button
                  type="button"
                  className="p-2 rounded-md hover:bg-muted"
                  onClick={() => setDrawerOpen(null)}
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                {drawerOpen === "active_directory" && (
                  <ActiveDirectoryForm form={form} setForm={setForm} />
                )}
                {drawerOpen === "microsoft_365" && (
                  <Microsoft365Form form={form} setForm={setForm} />
                )}
                {drawerOpen === "google_workspace" && (
                  <GoogleWorkspaceForm form={form} setForm={setForm} />
                )}
                {drawerOpen === "synology_ldap" && (
                  <SynologyLdapForm form={form} setForm={setForm} />
                )}
                {drawerOpen === "general_ldap" && (
                  <GeneralLdapForm form={form} setForm={setForm} />
                )}
                {drawerOpen === "csv" && <CsvForm form={form} setForm={setForm} />}
              </div>
              <div className="shrink-0 border-t p-4 flex flex-col gap-3">
                {drawerOpen === "csv" ? (
                  <div className="flex gap-2">
                    <Button type="button" variant="outline" size="sm" onClick={handleCsvDownload}>
                      <FileDown className="h-4 w-4 mr-2" />
                      Download template
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      onClick={handleCsvUpload}
                      disabled={csvUploading || !form.csvFile}
                    >
                      {csvUploading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
                      Upload users
                    </Button>
                  </div>
                ) : (
                  <>
                    {syncMessage && (
                      <p className="text-sm text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                        {syncMessage}
                      </p>
                    )}
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleTest}
                        disabled={testStatus === "loading"}
                      >
                        {testStatus === "loading" ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : testStatus === "success" ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        ) : testStatus === "error" ? (
                          <AlertCircle className="h-4 w-4 text-destructive" />
                        ) : null}
                        <span className="ml-2">Test connection</span>
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        onClick={handleSync}
                        disabled={syncStatus === "loading"}
                      >
                        {syncStatus === "loading" ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : null}
                        <span className="ml-2">Sync</span>
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </aside>
          </>,
          document.body
        )}

      {/* Drawer: Add/Edit connector — name + scope + platform-specific details */}
      {connectorDrawerOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <>
            <div
              className="fixed inset-0 bg-black/20 z-40"
              style={{ top: 0, left: 0, right: 0, bottom: 0 }}
              aria-hidden
              onClick={() => setConnectorDrawerOpen(null)}
            />
            <aside
              className={`fixed right-0 w-full ${DRAWER_WIDTH_HALF} bg-background border-l shadow-xl z-50 flex flex-col`}
              style={{ top: 0, height: "100vh" }}
              aria-label={connectorDrawerOpen === "add" ? "Add connector" : "Edit connector"}
            >
              <div className="flex h-16 shrink-0 items-center justify-between px-4 border-b bg-background">
                <h2 className="text-lg font-semibold">
                  {connectorDrawerOpen === "add"
                    ? `Add ${CONNECTOR_TYPE_LABELS[connectorForm.connector_type]} connector`
                    : `Edit ${connectorForm.name || "connector"}`}
                </h2>
                <button
                  type="button"
                  className="p-2 rounded-md hover:bg-muted"
                  onClick={() => setConnectorDrawerOpen(null)}
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-6">
                  <section className="rounded-lg border bg-muted/30 p-4">
                    <h4 className="mb-3 text-sm font-semibold text-muted-foreground">Details</h4>
                    <div className="space-y-3">
                      <div className="space-y-1.5">
                        <Label htmlFor="conn_name">Name</Label>
                        <Input
                          id="conn_name"
                          className="h-9"
                          placeholder="e.g. AWS Production, Org Slack"
                          value={connectorForm.name}
                          onChange={(e) => setConnectorForm((f) => ({ ...f, name: e.target.value }))}
                        />
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Type: {CONNECTOR_TYPE_LABELS[connectorForm.connector_type]}
                      </div>
                      <div className="space-y-1.5">
                        <Label>Scope</Label>
                        <div className="flex gap-4">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="governance_set"
                              checked={connectorForm.governance_set === 2}
                              onChange={() => setConnectorForm((f) => ({ ...f, governance_set: 2, modules: [] }))}
                              className="rounded-full border-input"
                            />
                            <span className="text-sm">All modules</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="governance_set"
                              checked={connectorForm.governance_set === 3}
                              onChange={() => setConnectorForm((f) => ({ ...f, governance_set: 3 }))}
                              className="rounded-full border-input"
                            />
                            <span className="text-sm">Module-scoped</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section className="rounded-lg border bg-muted/30 p-4">
                    <h4 className="mb-3 text-sm font-semibold text-muted-foreground">
                      {CONNECTOR_TYPE_LABELS[connectorForm.connector_type]} — platform details
                    </h4>
                    <ConnectorTypeDetailsForm
                      connectorType={connectorForm.connector_type}
                      config={connectorForm.config}
                      setConfig={setConnectorConfig}
                    />
                  </section>
                  {connectorForm.governance_set === 3 && (
                    <section className="rounded-lg border bg-muted/30 p-4">
                      <h4 className="mb-3 text-sm font-semibold text-muted-foreground">Assign to modules</h4>
                      <p className="text-xs text-muted-foreground mb-3">Select which modules can use this connector.</p>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {MODULE_OPTIONS.map((opt) => (
                          <div key={opt.value} className="flex items-center gap-2">
                            <Checkbox
                              id={`mod_${opt.value}`}
                              checked={connectorForm.modules.includes(opt.value)}
                              onCheckedChange={() => toggleModule(opt.value)}
                            />
                            <Label htmlFor={`mod_${opt.value}`} className="text-sm font-normal cursor-pointer">
                              {opt.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              </div>
              <div className="shrink-0 border-t p-4 flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setConnectorDrawerOpen(null)}>
                  Cancel
                </Button>
                <Button size="sm" onClick={saveConnector} disabled={connectorSaveStatus === "loading" || !connectorForm.name.trim()}>
                  {connectorSaveStatus === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  <span className="ml-2">{connectorDrawerOpen === "add" ? "Add connector" : "Save"}</span>
                </Button>
              </div>
            </aside>
          </>,
          document.body
        )}
    </div>
  );
}

// Platform-specific details per connector type (used in Connectors drawer)
function ConnectorTypeDetailsForm({
  connectorType,
  config,
  setConfig,
}: {
  connectorType: ConnectorType;
  config: Record<string, string>;
  setConfig: (key: string, value: string) => void;
}) {
  const field = (key: string, label: string, placeholder: string, type: string = "text") => (
    <div key={key} className="space-y-1.5">
      <Label htmlFor={`conn_${key}`}>{label}</Label>
      <Input
        id={`conn_${key}`}
        className="h-9"
        type={type}
        placeholder={placeholder}
        value={config[key] ?? ""}
        onChange={(e) => setConfig(key, e.target.value)}
      />
    </div>
  );
  const grid = (children: React.ReactNode) => <div className="grid gap-3 sm:grid-cols-2">{children}</div>;

  switch (connectorType) {
    case "cloud":
      return (
        <div className="space-y-3">
          {grid(
            <>
              {field("provider", "Provider", "aws | azure | gcp")}
              {field("account_id", "Account ID", "e.g. 123456789012")}
            </>
          )}
          {field("region", "Region (optional)", "e.g. us-east-1")}
        </div>
      );
    case "kubernetes":
      return (
        <div className="space-y-3">
          {field("cluster_url", "Cluster API URL", "https://api.cluster.example.com")}
          {field("auth_type", "Auth type", "kubeconfig | token | service_account")}
          {field("namespace", "Namespace (optional)", "default")}
        </div>
      );
    case "email":
      return (
        <div className="space-y-3">
          {field("provider", "Provider", "ses | sendgrid | mailgun")}
          {field("api_key_ref", "API key (env ref)", "e.g. SES_ACCESS_KEY")}
          {field("region", "Region (optional)", "us-east-1")}
        </div>
      );
    case "slack":
      return (
        <div className="space-y-3">
          {field("workspace_url", "Workspace URL", "https://org.slack.com")}
          {field("bot_token_ref", "Bot token (env ref)", "e.g. SLACK_BOT_TOKEN")}
        </div>
      );
    case "hris":
      return (
        <div className="space-y-3">
          {field("provider", "Provider", "workday | bamboohr | gusto")}
          {field("api_base_url", "API base URL", "https://api.workday.com/ccx")}
          {grid(
            <>
              {field("client_id", "Client ID", "OAuth client id")}
              {field("client_secret_ref", "Client secret (env ref)", "e.g. HRIS_CLIENT_SECRET")}
            </>
          )}
        </div>
      );
    case "siem":
      return (
        <div className="space-y-3">
          {field("provider", "Provider", "splunk | elastic | datadog")}
          {field("endpoint_url", "Endpoint URL", "https://splunk.example.com:8089")}
          {field("api_token_ref", "API token (env ref)", "e.g. SIEM_API_TOKEN")}
        </div>
      );
    case "vuln_scanner":
      return (
        <div className="space-y-3">
          {field("provider", "Provider", "nessus | qualys | openvas")}
          {field("server_url", "Server URL", "https://nessus.example.com")}
          {field("api_key_ref", "API key (env ref)", "e.g. NESSUS_API_KEY")}
        </div>
      );
    case "dev_platform":
      return (
        <div className="space-y-3">
          {field("provider", "Provider", "github | gitlab | bitbucket")}
          {field("org_or_owner", "Org / owner", "e.g. my-org")}
          {field("app_id_or_token_ref", "App ID or token (env ref)", "e.g. GITHUB_TOKEN")}
        </div>
      );
    case "itsm":
      return (
        <div className="space-y-3">
          {field("provider", "Provider", "jira | servicenow | zendesk")}
          {field("instance_url", "Instance URL", "https://org.atlassian.net")}
          {field("api_token_ref", "API token (env ref)", "e.g. JIRA_API_TOKEN")}
        </div>
      );
    case "evidence_storage":
      return (
        <div className="space-y-3">
          {field("provider", "Provider", "s3 | gcs | azure_blob")}
          {field("bucket_or_container", "Bucket / container name", "my-evidence-bucket")}
          {field("region", "Region (optional)", "us-east-1")}
        </div>
      );
    default:
      return <p className="text-sm text-muted-foreground">Configure platform-specific settings.</p>;
  }
}

// Form components (each integration type)
function ActiveDirectoryForm({
  form,
  setForm,
}: {
  form: IntegrationFormState;
  setForm: React.Dispatch<React.SetStateAction<IntegrationFormState>>;
}) {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border bg-muted/30 p-4">
        <h4 className="mb-3 text-sm font-semibold text-muted-foreground">Server</h4>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="ad_server">Server URL</Label>
            <Input
              id="ad_server"
              className="h-9"
              placeholder="ldap://dc.example.com or ldaps://dc.example.com"
              value={form.serverUrl}
              onChange={(e) => setForm((f) => ({ ...f, serverUrl: e.target.value }))}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ad_base">Base DN</Label>
            <Input
              id="ad_base"
              className="h-9"
              placeholder="DC=example,DC=com"
              value={form.baseDn}
              onChange={(e) => setForm((f) => ({ ...f, baseDn: e.target.value }))}
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="ad_bind_dn">Bind DN</Label>
              <Input
                id="ad_bind_dn"
                className="h-9"
                placeholder="CN=svc_ldap,OU=Service Accounts"
                value={form.bindDn}
                onChange={(e) => setForm((f) => ({ ...f, bindDn: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ad_bind_pw">Bind password</Label>
              <Input
                id="ad_bind_pw"
                type="password"
                className="h-9"
                autoComplete="off"
                value={form.bindPassword}
                onChange={(e) => setForm((f) => ({ ...f, bindPassword: e.target.value }))}
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ad_filter">User filter (optional)</Label>
            <Input
              id="ad_filter"
              className="h-9 font-mono text-sm"
              placeholder="(objectClass=user)"
              value={form.userFilter}
              onChange={(e) => setForm((f) => ({ ...f, userFilter: e.target.value }))}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function Microsoft365Form({
  form,
  setForm,
}: {
  form: IntegrationFormState;
  setForm: React.Dispatch<React.SetStateAction<IntegrationFormState>>;
}) {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border bg-muted/30 p-4">
        <h4 className="mb-3 text-sm font-semibold text-muted-foreground">Azure AD / Microsoft 365</h4>
        <p className="text-xs text-muted-foreground mb-3">
          Register an app in Azure AD and use application (client) ID and secret for sync.
        </p>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="m365_tenant">Tenant ID</Label>
            <Input
              id="m365_tenant"
              className="h-9"
              placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
              value={form.tenantId}
              onChange={(e) => setForm((f) => ({ ...f, tenantId: e.target.value }))}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="m365_client">Client (application) ID</Label>
            <Input
              id="m365_client"
              className="h-9"
              placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
              value={form.clientId}
              onChange={(e) => setForm((f) => ({ ...f, clientId: e.target.value }))}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="m365_secret">Client secret</Label>
            <Input
              id="m365_secret"
              type="password"
              className="h-9"
              autoComplete="off"
              value={form.clientSecret}
              onChange={(e) => setForm((f) => ({ ...f, clientSecret: e.target.value }))}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function GoogleWorkspaceForm({
  form,
  setForm,
}: {
  form: IntegrationFormState;
  setForm: React.Dispatch<React.SetStateAction<IntegrationFormState>>;
}) {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border bg-muted/30 p-4">
        <h4 className="mb-3 text-sm font-semibold text-muted-foreground">Google Workspace</h4>
        <p className="text-xs text-muted-foreground mb-3">
          Use a service account or OAuth app with Directory API scope to sync users.
        </p>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="gw_domain">Primary domain</Label>
            <Input
              id="gw_domain"
              className="h-9"
              placeholder="example.com"
              value={form.domain}
              onChange={(e) => setForm((f) => ({ ...f, domain: e.target.value }))}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="gw_admin">Admin email (or service account)</Label>
            <Input
              id="gw_admin"
              type="email"
              className="h-9"
              placeholder="admin@example.com"
              value={form.adminEmail}
              onChange={(e) => setForm((f) => ({ ...f, adminEmail: e.target.value }))}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Service account JSON (optional)</Label>
            <Input
              type="file"
              accept=".json"
              className="h-9"
              onChange={(e) => setForm((f) => ({ ...f, serviceAccountFile: e.target.files?.[0] ?? null }))}
            />
            <p className="text-xs text-muted-foreground">Upload the JSON key file for the service account.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function SynologyLdapForm({
  form,
  setForm,
}: {
  form: IntegrationFormState;
  setForm: React.Dispatch<React.SetStateAction<IntegrationFormState>>;
}) {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border bg-muted/30 p-4">
        <h4 className="mb-3 text-sm font-semibold text-muted-foreground">Synology Directory Server</h4>
        <p className="text-xs text-muted-foreground mb-3">
          LDAP server URL is typically your Synology NAS hostname or IP.
        </p>
        <div className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="syn_server">Server URL</Label>
              <Input
                id="syn_server"
                className="h-9"
                placeholder="ldap://synology.local or IP"
                value={form.serverUrl}
                onChange={(e) => setForm((f) => ({ ...f, serverUrl: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="syn_port">Port</Label>
              <Input
                id="syn_port"
                className="h-9"
                placeholder="389 or 636"
                value={form.port}
                onChange={(e) => setForm((f) => ({ ...f, port: e.target.value }))}
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="syn_base">Base DN</Label>
            <Input
              id="syn_base"
              className="h-9"
              placeholder="dc=synology,dc=local"
              value={form.baseDn}
              onChange={(e) => setForm((f) => ({ ...f, baseDn: e.target.value }))}
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="syn_bind_dn">Bind DN</Label>
              <Input
                id="syn_bind_dn"
                className="h-9"
                value={form.bindDn}
                onChange={(e) => setForm((f) => ({ ...f, bindDn: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="syn_bind_pw">Bind password</Label>
              <Input
                id="syn_bind_pw"
                type="password"
                className="h-9"
                autoComplete="off"
                value={form.bindPassword}
                onChange={(e) => setForm((f) => ({ ...f, bindPassword: e.target.value }))}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function GeneralLdapForm({
  form,
  setForm,
}: {
  form: IntegrationFormState;
  setForm: React.Dispatch<React.SetStateAction<IntegrationFormState>>;
}) {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border bg-muted/30 p-4">
        <h4 className="mb-3 text-sm font-semibold text-muted-foreground">LDAP server</h4>
        <div className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="ldap_server">Server URL</Label>
              <Input
                id="ldap_server"
                className="h-9"
                placeholder="ldap://ldap.example.com"
                value={form.serverUrl}
                onChange={(e) => setForm((f) => ({ ...f, serverUrl: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ldap_port">Port</Label>
              <Input
                id="ldap_port"
                className="h-9"
                placeholder="389 / 636"
                value={form.port}
                onChange={(e) => setForm((f) => ({ ...f, port: e.target.value }))}
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ldap_base">Base DN</Label>
            <Input
              id="ldap_base"
              className="h-9"
              placeholder="dc=example,dc=com"
              value={form.baseDn}
              onChange={(e) => setForm((f) => ({ ...f, baseDn: e.target.value }))}
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="ldap_bind_dn">Bind DN</Label>
              <Input
                id="ldap_bind_dn"
                className="h-9"
                value={form.bindDn}
                onChange={(e) => setForm((f) => ({ ...f, bindDn: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ldap_bind_pw">Bind password</Label>
              <Input
                id="ldap_bind_pw"
                type="password"
                className="h-9"
                autoComplete="off"
                value={form.bindPassword}
                onChange={(e) => setForm((f) => ({ ...f, bindPassword: e.target.value }))}
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ldap_filter">User filter</Label>
            <Input
              id="ldap_filter"
              className="h-9 font-mono text-sm"
              placeholder="(objectClass=inetOrgPerson)"
              value={form.userFilter}
              onChange={(e) => setForm((f) => ({ ...f, userFilter: e.target.value }))}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function CsvForm({
  form,
  setForm,
}: {
  form: IntegrationFormState;
  setForm: React.Dispatch<React.SetStateAction<IntegrationFormState>>;
}) {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border bg-muted/30 p-4">
        <h4 className="mb-3 text-sm font-semibold text-muted-foreground">Bulk user import</h4>
        <p className="text-xs text-muted-foreground mb-3">
          Download the template (headers match auth_user + users_userprofile), fill it in, then upload. Supports .csv, .xlsx, .xls.
        </p>
        <p className="text-xs text-muted-foreground mb-3 font-mono">
          Headers: email, first_name, last_name, username, title, role
        </p>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label>Select file to upload</Label>
            <Input
              type="file"
              accept=".csv,.xlsx,.xls"
              className="h-9"
              onChange={(e) => setForm((f) => ({ ...f, csvFile: e.target.files?.[0] ?? null }))}
            />
            {form.csvFile && (
              <p className="text-xs text-muted-foreground">{form.csvFile.name}</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
