"use client";

import { useMemo, useState, useEffect, Fragment, useCallback } from "react";
import { createPortal } from "react-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Database,
  Plus,
  Upload,
  ChevronDown,
  ChevronRight,
  Loader2,
  Server,
  HardDrive,
  Box,
  Cloud,
  Network,
  Fingerprint,
  Tags,
  GitBranch,
  History,
  Layers,
  Search,
  Filter,
  X,
  Pencil,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? (typeof window !== "undefined" ? "" : "http://localhost:8000");

type AssetAttribute = { key: string; value: string };
type AssetTag = { key: string; value: string };
type Asset = {
  id: string;
  asset_key: string;
  name: string;
  asset_type: string;
  environment: string;
  lifecycle_state: string;
  owner: string;
  attributes: AssetAttribute[];
  tags: AssetTag[];
  organization_id: string;
  environment_id?: string | null;
  created_at: string;
  updated_at: string;
  hostname?: string;
  primary_ip?: string;
  source_type?: string;
  provider?: string;
  last_seen_at?: string | null;
  last_changed_at?: string | null;
  region?: string;
  criticality?: string;
  in_scope_soc2?: boolean;
  scope_flags?: Record<string, boolean> | null;
  data_classification?: string;
  depends_on_count?: number | null;
  used_by_count?: number | null;
  provider_resource_id?: string;
  connector_id?: string | null;
};

const LIFECYCLE_COLOR: Record<string, string> = {
  active: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
  inactive: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  retired: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  deleted: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
};

const FRESHNESS_COLOR: Record<string, string> = {
  fresh: "bg-emerald-100 text-emerald-700 text-xs",
  recent: "bg-sky-100 text-sky-700 text-xs",
  stale: "bg-amber-100 text-amber-700 text-xs",
  unknown: "bg-slate-100 text-slate-600 text-xs",
};

function getFreshness(lastSeen: string | null | undefined): { label: string; kind: keyof typeof FRESHNESS_COLOR } {
  if (!lastSeen) return { label: "—", kind: "unknown" };
  const then = new Date(lastSeen).getTime();
  const now = Date.now();
  const mins = (now - then) / 60000;
  if (mins < 60) return { label: `${Math.round(mins)}m ago`, kind: "fresh" };
  if (mins < 1440) return { label: `${Math.round(mins / 60)}h ago`, kind: "recent" };
  return { label: `${Math.round(mins / 1440)}d ago`, kind: "stale" };
}

function getSourceLabel(asset: Asset): string {
  if (asset.provider) return asset.provider.toUpperCase();
  if (asset.source_type) return asset.source_type;
  const fromAttr = asset.attributes.find((a) => a.key === "source" || a.key === "account");
  return fromAttr?.value ?? "—";
}

function getAssetTypeIcon(assetType: string) {
  const t = (assetType || "").toLowerCase();
  if (t.includes("vm") || t.includes("server")) return Server;
  if (t.includes("database") || t.includes("db")) return Database;
  if (t.includes("container")) return Box;
  if (t.includes("load") || t.includes("network")) return Network;
  if (t.includes("cloud")) return Cloud;
  return HardDrive;
}

function getIdentityAttrs(attributes: AssetAttribute[]) {
  const keys = ["hostname", "ip_address", "primary_ip", "region", "account", "provider_resource_id", "cluster", "namespace", "endpoint", "vip", "ports"];
  return attributes.filter((a) => keys.some((k) => a.key.toLowerCase().includes(k) || a.key === k));
}

function getTagLikeAttrs(attributes: AssetAttribute[]) {
  // Classification-like attributes (keep signals here, not in Tags or Raw)
  const keys = ["engine", "storage", "cpu", "memory", "os", "backend_pool", "decommission_plan"];
  return attributes.filter((a) => keys.some((k) => a.key.toLowerCase() === k));
}

function getRawAttrs(attributes: AssetAttribute[], identityKeys: Set<string>, tagLikeKeys: Set<string>) {
  const skip = new Set([...identityKeys, ...tagLikeKeys]);
  return attributes.filter((a) => !skip.has(a.key));
}

function getAuthHeaders(): HeadersInit {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

const LIFECYCLE_OPTIONS = ["active", "inactive", "retired", "deleted"] as const;
const FRESHNESS_OPTIONS = [
  { value: "", label: "Any" },
  { value: "fresh", label: "Seen < 1h" },
  { value: "recent", label: "Seen < 24h" },
  { value: "stale", label: "Stale" },
] as const;
const IN_SCOPE_OPTIONS = [
  { value: "", label: "Any" },
  { value: "true", label: "Yes" },
  { value: "false", label: "No" },
] as const;

export default function DiscoveryAssetInventoryPage() {
  const [search, setSearch] = useState("");
  const [filterLifecycle, setFilterLifecycle] = useState<string>("");
  const [filterTypes, setFilterTypes] = useState<string[]>([]);
  const [filterEnvironmentId, setFilterEnvironmentId] = useState<string>("");
  const [filterProvider, setFilterProvider] = useState<string>("");
  const [filterOwner, setFilterOwner] = useState<string>("");
  const [filterTagKey, setFilterTagKey] = useState("");
  const [filterTagValue, setFilterTagValue] = useState("");
  const [filterFreshness, setFilterFreshness] = useState<string>("");
  const [filterInScope, setFilterInScope] = useState<string>("");
  const [searchApplied, setSearchApplied] = useState("");
  const [ownerApplied, setOwnerApplied] = useState("");

  const [assets, setAssets] = useState<Asset[]>([]);
  const [filterOptions, setFilterOptions] = useState<{ types: string[]; environments: { id: string; name: string }[]; providers: string[] }>({ types: [], environments: [], providers: [] });
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);
  const [importFileName, setImportFileName] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<"add" | "edit">("add");
  const [drawerAsset, setDrawerAsset] = useState<Asset | null>(null);
  const [drawerSaving, setDrawerSaving] = useState(false);
  const [drawerError, setDrawerError] = useState<string | null>(null);
  const [fetchTrigger, setFetchTrigger] = useState(0);
  const [drawerForm, setDrawerForm] = useState({
    name: "",
    asset_key: "",
    asset_type: "VM",
    hostname: "",
    primary_ip: "",
    region: "",
    provider_resource_id: "",
    environment: "",
    lifecycle_state: "active",
    owner: "",
    criticality: "",
    data_classification: "",
    in_scope_soc2: false,
    provider: "",
    source_type: "manual",
    tags: [] as AssetTag[],
  });

  const buildUrl = useCallback(() => {
    const base = `${API_BASE.replace(/\/$/, "")}/api/discovery/assets/`;
    const params = new URLSearchParams();
    if (filterLifecycle) params.set("lifecycle", filterLifecycle);
    if (filterTypes.length) params.set("asset_type", filterTypes.join(","));
    if (filterEnvironmentId) params.set("environment_id", filterEnvironmentId);
    if (filterProvider) params.set("provider", filterProvider);
    if (ownerApplied.trim()) params.set("owner", ownerApplied.trim());
    if (filterTagKey) {
      params.set("tag_key", filterTagKey);
      if (filterTagValue) params.set("tag_value", filterTagValue);
    }
    if (filterFreshness) params.set("freshness", filterFreshness);
    if (filterInScope) params.set("in_scope", filterInScope);
    if (searchApplied.trim()) params.set("search", searchApplied.trim());
    const qs = params.toString();
    return qs ? `${base}?${qs}` : base;
  }, [filterLifecycle, filterTypes, filterEnvironmentId, filterProvider, ownerApplied, filterTagKey, filterTagValue, filterFreshness, filterInScope, searchApplied]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    const url = buildUrl();
    fetch(url, { headers: getAuthHeaders() })
      .then((res) => {
        if (!res.ok) throw new Error(res.status === 401 ? "Please sign in." : res.status === 403 ? "Access denied." : `Request failed: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!cancelled) {
          const list = (data.results ?? []).map((r: Record<string, unknown>) => ({ ...r, tags: r.tags ?? [] })) as Asset[];
          setAssets(list);
          const types = [...new Set(list.map((a) => a.asset_type).filter(Boolean))].sort();
          const envMap = new Map<string, string>();
          list.forEach((a) => {
            if (a.environment_id) envMap.set(String(a.environment_id), a.environment || String(a.environment_id));
          });
          const environments = [...envMap.entries()].map(([id, name]) => ({ id, name })).sort((a, b) => a.name.localeCompare(b.name));
          const providers = [...new Set(list.map((a) => getSourceLabel(a)).filter(Boolean))].sort();
          setFilterOptions((prev) => ({
            types: [...new Set([...prev.types, ...types])].sort(),
            environments: environments.length ? environments : prev.environments,
            providers: [...new Set([...prev.providers, ...providers])].sort(),
          }));
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err.message ?? "Failed to load assets");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [buildUrl, fetchTrigger]);

  const refetchAssets = useCallback(() => {
    setFetchTrigger((t) => t + 1);
  }, []);

  function handleSaveDrawer() {
    setDrawerError(null);
    setDrawerSaving(true);
    const f = drawerForm;
    const payload = {
      name: f.name.trim(),
      asset_key: f.asset_key.trim() || undefined,
      asset_type: f.asset_type || "VM",
      environment_id: drawerAsset?.environment_id ?? null,
      lifecycle_state: f.lifecycle_state || "active",
      hostname: f.hostname.trim() || "",
      primary_ip: f.primary_ip.trim() || "",
      region: f.region.trim() || "",
      provider_resource_id: f.provider_resource_id.trim() || "",
      provider: f.provider.trim() || "",
      source_type: f.source_type || "manual",
      owner: f.owner.trim() || "",
      criticality: f.criticality.trim() || "",
      data_classification: f.data_classification.trim() || "",
      in_scope_soc2: f.in_scope_soc2,
      tags: f.tags.filter((t) => (t.key || "").trim()).map((t) => ({ key: t.key.trim(), value: (t.value || "").trim() })),
    };
    const base = `${API_BASE.replace(/\/$/, "")}/api/discovery/assets/`;
    const url = drawerMode === "add" ? base : `${base}${drawerAsset?.id}/`;
    const method = drawerMode === "add" ? "POST" : "PATCH";
    fetch(url, {
      method,
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        if (!res.ok) {
          let msg = res.statusText || `Request failed: ${res.status}`;
          try {
            const data = await res.json();
            if (data?.detail) msg = typeof data.detail === "string" ? data.detail : JSON.stringify(data.detail);
          } catch {
            // ignore
          }
          throw new Error(msg);
        }
        return res.json();
      })
      .then(() => {
        refetchAssets();
        setDrawerOpen(false);
        toast.success(drawerMode === "add" ? "Asset created" : "Asset updated");
      })
      .catch((err) => {
        setDrawerError(err.message ?? "Request failed");
        toast.error(err.message ?? "Failed to save asset");
      })
      .finally(() => {
        setDrawerSaving(false);
      });
  }

  function handleDeleteAsset(asset: Asset) {
    if (!confirm(`Delete asset "${asset.name}"? This cannot be undone.`)) return;
    const url = `${API_BASE.replace(/\/$/, "")}/api/discovery/assets/${asset.id}/`;
    fetch(url, { method: "DELETE", headers: getAuthHeaders() })
      .then((res) => {
        if (!res.ok) throw new Error(res.status === 204 ? "" : `Delete failed: ${res.status}`);
        refetchAssets();
        if (drawerAsset?.id === asset.id) setDrawerOpen(false);
        toast.success(`Asset "${asset.name}" deleted`);
      })
      .catch((err) => {
        setError(err.message || "Delete failed");
        toast.error(err.message || "Failed to delete asset");
      });
  }

  const visibleAssets = assets;
  const hasActiveFilters = filterLifecycle || filterTypes.length > 0 || filterEnvironmentId || filterProvider || ownerApplied || filterTagKey || filterFreshness || filterInScope || searchApplied;
  const clearFilters = () => {
    setFilterLifecycle("");
    setFilterTypes([]);
    setFilterEnvironmentId("");
    setFilterProvider("");
    setFilterOwner("");
    setOwnerApplied("");
    setFilterTagKey("");
    setFilterTagValue("");
    setFilterFreshness("");
    setFilterInScope("");
    setSearch("");
    setSearchApplied("");
  };

  function handleAddAsset() {
    setDrawerMode("add");
    setDrawerAsset(null);
    setDrawerOpen(true);
  }

  function handleEditAsset(asset: Asset) {
    setDrawerMode("edit");
    setDrawerAsset(asset);
    setDrawerOpen(true);
  }

  const defaultForm = {
    name: "",
    asset_key: "",
    asset_type: "VM",
    hostname: "",
    primary_ip: "",
    region: "",
    provider_resource_id: "",
    environment: "",
    lifecycle_state: "active",
    owner: "",
    criticality: "",
    data_classification: "",
    in_scope_soc2: false,
    provider: "",
    source_type: "manual",
    tags: [] as AssetTag[],
  };

  useEffect(() => {
    if (!drawerOpen) return;
    if (drawerMode === "add") {
      setDrawerForm({ ...defaultForm });
    } else if (drawerAsset) {
      setDrawerForm({
        name: drawerAsset.name ?? "",
        asset_key: drawerAsset.asset_key ?? "",
        asset_type: drawerAsset.asset_type ?? "VM",
        hostname: drawerAsset.hostname ?? "",
        primary_ip: drawerAsset.primary_ip ?? "",
        region: drawerAsset.region ?? "",
        provider_resource_id: drawerAsset.provider_resource_id ?? "",
        environment: drawerAsset.environment ?? "",
        lifecycle_state: drawerAsset.lifecycle_state ?? "active",
        owner: drawerAsset.owner ?? "",
        criticality: drawerAsset.criticality ?? "",
        data_classification: drawerAsset.data_classification ?? "",
        in_scope_soc2: drawerAsset.in_scope_soc2 ?? false,
        provider: drawerAsset.provider ?? "",
        source_type: drawerAsset.source_type ?? "manual",
        tags: drawerAsset.tags?.length ? [...drawerAsset.tags] : [],
      });
    }
  }, [drawerOpen, drawerMode, drawerAsset?.id]);

  function handleMockImport(file: File) {
    setImportFileName(file.name);
    const now = new Date().toISOString();
    const index = assets.length + 1;
    const imported: Asset = {
      id: `00000000-0000-0000-0000-import-${index.toString().padStart(4, "0")}`,
      asset_key: `XLS-${index.toString().padStart(3, "0")}`,
      name: file.name.replace(/\.[^.]+$/, ""),
      asset_type: "VM",
      environment: "Staging",
      lifecycle_state: "active",
      owner: "—",
      organization_id: "org-vision",
      environment_id: "env-stg",
      created_at: now,
      updated_at: now,
      attributes: [
        { key: "source", value: "XLS import (mock only)" },
        { key: "original_file", value: file.name },
      ],
      tags: [],
    };
    setAssets((prev) => [imported, ...prev]);
    setExpandedId(imported.id);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="app-page-title">Asset Inventory</h1>
          <p className="text-muted-foreground mt-1">
            Authoritative registry of all discovered assets across environments.
          </p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Button variant="outline" size="sm" type="button" onClick={() => setImporting((v) => !v)}>
              <Upload className="h-4 w-4 mr-2" />
              Import XLS
            </Button>
            {importing && (
              <div className="absolute right-0 mt-2 w-64 rounded-lg border bg-background shadow-lg p-3 z-10">
                <p className="text-xs text-muted-foreground mb-2">Select .xlsx to simulate bulk import.</p>
                <input
                  type="file"
                  accept=".xls,.xlsx"
                  className="text-xs"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) handleMockImport(f); }}
                />
                {importFileName && <p className="mt-2 text-[11px] text-muted-foreground">Last: {importFileName}</p>}
              </div>
            )}
          </div>
          <Button variant="outline" size="sm" type="button">
            <Upload className="h-4 w-4 mr-2" />
            Bulk API
          </Button>
          <Button size="sm" type="button" onClick={handleAddAsset}>
            <Plus className="h-4 w-4 mr-2" />
            Add asset
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Inventory
          </CardTitle>
          <p className="text-sm text-muted-foreground">Filters above the table. Results from API.</p>
          {/* Filter bar: Search, Lifecycle, Type, Environment, Source, Freshness, In-scope, Tags */}
          <div className="flex flex-col gap-3 pt-3">
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative flex-1 min-w-[180px] max-w-sm">
                <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search name, ID, hostname, IP"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && setSearchApplied(search)}
                  className="pl-8 h-9 text-muted-foreground placeholder:text-muted-foreground/80"
                />
              </div>
              <Button size="sm" onClick={() => setSearchApplied(search)} className="bg-palette-accent-2 text-palette-primary hover:bg-palette-accent-3 border border-palette-accent-2">Apply search</Button>
              <Select value={filterLifecycle || "all"} onValueChange={(v) => setFilterLifecycle(v === "all" ? "" : v)}>
                <SelectTrigger className="w-[130px] h-9 text-muted-foreground">
                  <SelectValue placeholder="Lifecycle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All lifecycle</SelectItem>
                  {LIFECYCLE_OPTIONS.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9 text-muted-foreground">
                    <Filter className="h-4 w-4 mr-1" />
                    Type {filterTypes.length ? `(${filterTypes.length})` : ""}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-2" align="start">
                  <div className="max-h-48 overflow-y-auto space-y-1">
                    {filterOptions.types.map((t) => (
                      <label key={t} className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground">
                        <input
                          type="checkbox"
                          checked={filterTypes.includes(t)}
                          onChange={() => setFilterTypes((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t])}
                          className="rounded border-input"
                        />
                        {t}
                      </label>
                    ))}
                    {filterOptions.types.length === 0 && <p className="text-xs text-muted-foreground">Load data for options</p>}
                  </div>
                </PopoverContent>
              </Popover>
              <Select value={filterEnvironmentId || "all"} onValueChange={(v) => setFilterEnvironmentId(v === "all" ? "" : v)}>
                <SelectTrigger className="w-[140px] h-9 text-muted-foreground">
                  <SelectValue placeholder="Environment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All env</SelectItem>
                  {filterOptions.environments.map((e) => (
                    <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterProvider || "all"} onValueChange={(v) => setFilterProvider(v === "all" ? "" : v)}>
                <SelectTrigger className="w-[120px] h-9 text-muted-foreground">
                  <SelectValue placeholder="Source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All source</SelectItem>
                  {filterOptions.providers.map((p) => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterFreshness || "any"} onValueChange={(v) => setFilterFreshness(v === "any" ? "" : v)}>
                <SelectTrigger className="w-[130px] h-9 text-muted-foreground">
                  <SelectValue placeholder="Freshness" />
                </SelectTrigger>
                <SelectContent>
                  {FRESHNESS_OPTIONS.map((o) => (
                    <SelectItem key={o.value || "any"} value={o.value || "any"}>{o.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterInScope || "any"} onValueChange={(v) => setFilterInScope(v === "any" ? "" : v)}>
                <SelectTrigger className="w-[100px] h-9 text-muted-foreground">
                  <SelectValue placeholder="In-scope" />
                </SelectTrigger>
                <SelectContent>
                  {IN_SCOPE_OPTIONS.map((o) => (
                    <SelectItem key={o.value || "any"} value={o.value || "any"}>{o.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" className="h-9 text-muted-foreground" onClick={clearFilters}>
                  Clear filters
                </Button>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted-foreground">Tag:</span>
              <Input placeholder="Key" value={filterTagKey} onChange={(e) => setFilterTagKey(e.target.value)} className="w-24 h-8 text-xs text-muted-foreground placeholder:text-muted-foreground/80" />
              <Input placeholder="Value" value={filterTagValue} onChange={(e) => setFilterTagValue(e.target.value)} className="w-28 h-8 text-xs text-muted-foreground placeholder:text-muted-foreground/80" />
              <span className="text-xs text-muted-foreground ml-2">Owner (substring):</span>
              <Input placeholder="e.g. Jane or Unassigned" value={filterOwner} onChange={(e) => setFilterOwner(e.target.value)} onKeyDown={(e) => e.key === "Enter" && setOwnerApplied(filterOwner)} className="w-40 h-8 text-xs text-muted-foreground placeholder:text-muted-foreground/80" />
              <Button size="sm" onClick={() => setOwnerApplied(filterOwner)} className="h-8 bg-palette-accent-2 text-palette-primary hover:bg-palette-accent-3 border border-palette-accent-2">Apply</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 rounded-lg border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </div>
          )}
          {loading && (
            <div className="flex items-center gap-2 py-8 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Loading assets…</span>
            </div>
          )}
          {!loading && (
            <div className="rounded-lg border overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 border-b">
                  <tr>
                    <th className="text-left p-3 font-medium">Asset</th>
                    <th className="text-left p-3 font-medium">Hostname</th>
                    <th className="text-left p-3 font-medium">Environment</th>
                    <th className="text-left p-3 font-medium">Source</th>
                    <th className="text-left p-3 font-medium">Lifecycle</th>
                    <th className="text-left p-3 font-medium">Last seen</th>
                    <th className="text-left p-3 font-medium">Owner</th>
                    <th className="text-left p-3 font-medium">Tags</th>
                    <th className="w-12 p-3" aria-label="Expand" />
                  </tr>
                </thead>
                <tbody>
                  {visibleAssets.map((row) => {
                    const isExpanded = expandedId === row.id;
                    const TypeIcon = getAssetTypeIcon(row.asset_type);
                    const freshness = getFreshness(row.last_seen_at ?? row.updated_at);
                    const sourceLabel = getSourceLabel(row);
                    const tagList = row.tags && row.tags.length > 0 ? row.tags : [];
                    const topTags = tagList.slice(0, 2);
                    const extraTags = tagList.length > 2 ? tagList.length - 2 : 0;
                    const identityAttrs = getIdentityAttrs(row.attributes || []);
                    const identityKeys = new Set(identityAttrs.map((a) => a.key));
                    const classificationAttrs = getTagLikeAttrs(row.attributes || []);
                    const classificationKeys = new Set(classificationAttrs.map((a) => a.key));
                    const rawAttrs = getRawAttrs(row.attributes || [], identityKeys, classificationKeys);

                    return (
                      <Fragment key={row.id}>
                        <tr className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                                <TypeIcon className="h-4 w-4" />
                              </span>
                              <div>
                                <span className="font-medium">{row.name}</span>
                                <span className="block text-xs text-muted-foreground">{row.asset_type}</span>
                              </div>
                            </div>
                          </td>
                          <td className="p-3 font-mono text-xs text-muted-foreground">
                            {row.hostname || row.attributes?.find((a) => a.key === "hostname")?.value || "—"}
                          </td>
                          <td className="p-3">{row.environment || "—"}</td>
                          <td className="p-3 text-muted-foreground">{sourceLabel}</td>
                          <td className="p-3">
                            <Badge className={LIFECYCLE_COLOR[row.lifecycle_state] ?? "bg-muted"}>
                              {row.lifecycle_state}
                            </Badge>
                          </td>
                          <td className="p-3">
                            <span className={FRESHNESS_COLOR[freshness.kind]}>{freshness.label}</span>
                          </td>
                          <td className="p-3">{row.owner || "Unassigned"}</td>
                          <td className="p-3">
                            <div className="flex flex-wrap items-center gap-1">
                              {topTags.map((t) => (
                                <Badge key={`${t.key}-${t.value}`} variant="secondary" className="text-xs font-normal">
                                  {t.key}:{t.value}
                                </Badge>
                              ))}
                              {extraTags > 0 && <span className="text-xs text-muted-foreground">+{extraTags}</span>}
                              {tagList.length === 0 && <span className="text-muted-foreground">—</span>}
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted"
                                onClick={() => handleEditAsset(row)}
                                aria-label="Edit"
                                title="Edit"
                              >
                                <Pencil className="h-4 w-4 text-muted-foreground" />
                              </button>
                              <button
                                type="button"
                                className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted hover:text-destructive"
                                onClick={() => handleDeleteAsset(row)}
                                aria-label="Delete"
                                title="Delete"
                              >
                                <Trash2 className="h-4 w-4 text-muted-foreground" />
                              </button>
                              <button
                                type="button"
                                className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted"
                                onClick={() => setExpandedId(isExpanded ? null : row.id)}
                                aria-label={isExpanded ? "Collapse" : "Expand"}
                              >
                                {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                              </button>
                            </div>
                          </td>
                        </tr>
                        {isExpanded && (
                          <tr className="border-b last:border-0 bg-muted/20">
                            <td colSpan={9} className="p-4">
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {/* 1. Identity — same card + table as Raw Attributes */}
                                <section className="rounded-lg border bg-muted/30 p-4">
                                  <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                                    <Fingerprint className="h-4 w-4" />
                                    Identity
                                  </h4>
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-xs">
                                      <thead><tr className="border-b"><th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Key</th><th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Value</th></tr></thead>
                                      <tbody>
                                        <tr className="border-b"><td className="py-1.5 px-2 font-mono">Asset key</td><td className="py-1.5 px-2 font-mono">{row.asset_key || "—"}</td></tr>
                                        <tr className="border-b"><td className="py-1.5 px-2 font-mono">Hostname / FQDN</td><td className="py-1.5 px-2 font-mono">{row.hostname || row.attributes?.find((a) => a.key === "hostname")?.value || "—"}</td></tr>
                                        <tr className="border-b"><td className="py-1.5 px-2 font-mono">Primary IP</td><td className="py-1.5 px-2 font-mono">{row.primary_ip || row.attributes?.find((a) => a.key === "ip_address" || a.key === "primary_ip")?.value || "—"}</td></tr>
                                        <tr className="border-b"><td className="py-1.5 px-2 font-mono">Region</td><td className="py-1.5 px-2">{row.region || row.attributes?.find((a) => a.key === "region")?.value || "—"}</td></tr>
                                        {row.provider_resource_id && <tr className="border-b"><td className="py-1.5 px-2 font-mono">Provider resource ID</td><td className="py-1.5 px-2 font-mono break-all">{row.provider_resource_id}</td></tr>}
                                        {identityAttrs
                                          .filter((a) => !["hostname", "ip_address", "primary_ip", "region"].includes(a.key))
                                          .slice(0, 4)
                                          .map((a) => (
                                          <tr key={a.key} className="border-b last:border-0"><td className="py-1.5 px-2 font-mono">{a.key}</td><td className="py-1.5 px-2 break-all">{a.value}</td></tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </section>

                                {/* 2. Classification */}
                                <section className="rounded-lg border bg-muted/30 p-4">
                                  <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                                    <Layers className="h-4 w-4" />
                                    Classification
                                  </h4>
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-xs">
                                      <thead><tr className="border-b"><th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Key</th><th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Value</th></tr></thead>
                                      <tbody>
                                        <tr className="border-b"><td className="py-1.5 px-2 font-mono">Criticality</td><td className="py-1.5 px-2">{row.criticality || "—"}</td></tr>
                                        <tr className="border-b"><td className="py-1.5 px-2 font-mono">Data classification</td><td className="py-1.5 px-2">{row.data_classification || "—"}</td></tr>
                                        <tr className="border-b"><td className="py-1.5 px-2 font-mono">In scope (SOC2)</td><td className="py-1.5 px-2">{row.in_scope_soc2 ? "Yes" : "No"}</td></tr>
                                        {row.scope_flags && Object.keys(row.scope_flags).length > 0 && (
                                          <tr className="border-b"><td className="py-1.5 px-2 font-mono">Scope flags</td><td className="py-1.5 px-2"><span className="flex flex-wrap gap-1">{Object.entries(row.scope_flags).map(([k, v]) => v && <Badge key={k} variant="outline" className="text-xs">{k}</Badge>)}</span></td></tr>
                                        )}
                                        {classificationAttrs.slice(0, 4).map((a) => (
                                          <tr key={a.key} className="border-b last:border-0"><td className="py-1.5 px-2 font-mono">{a.key}</td><td className="py-1.5 px-2">{a.value}</td></tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </section>

                                {/* 3. Tags */}
                                <section className="rounded-lg border bg-muted/30 p-4">
                                  <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                                    <Tags className="h-4 w-4" />
                                    Tags
                                  </h4>
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-xs">
                                      <thead><tr className="border-b"><th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Key</th><th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Value</th></tr></thead>
                                      <tbody>
                                        {(row.tags && row.tags.length > 0 ? row.tags : []).map((t) => (
                                          <tr key={`${t.key}-${t.value}`} className="border-b last:border-0"><td className="py-1.5 px-2 font-mono">{t.key}</td><td className="py-1.5 px-2">{t.value}</td></tr>
                                        ))}
                                        {(!row.tags || row.tags.length === 0) && (
                                          <tr className="border-b last:border-0"><td className="py-1.5 px-2 text-muted-foreground" colSpan={2}>No tags</td></tr>
                                        )}
                                      </tbody>
                                    </table>
                                  </div>
                                </section>

                                {/* 4. Relationships */}
                                <section className="rounded-lg border bg-muted/30 p-4">
                                  <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                                    <GitBranch className="h-4 w-4" />
                                    Relationships
                                  </h4>
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-xs">
                                      <thead><tr className="border-b"><th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Key</th><th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Value</th></tr></thead>
                                      <tbody>
                                        <tr className="border-b"><td className="py-1.5 px-2 font-mono">Depends on</td><td className="py-1.5 px-2">{row.depends_on_count ?? "—"}</td></tr>
                                        <tr className="border-b last:border-0"><td className="py-1.5 px-2 font-mono">Used by</td><td className="py-1.5 px-2">{row.used_by_count ?? "—"}</td></tr>
                                      </tbody>
                                    </table>
                                    <Button variant="outline" size="sm" className="mt-2 text-xs">View graph</Button>
                                  </div>
                                </section>

                                {/* 5. Change history */}
                                <section className="rounded-lg border bg-muted/30 p-4">
                                  <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                                    <History className="h-4 w-4" />
                                    Change history
                                  </h4>
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-xs">
                                      <thead><tr className="border-b"><th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Key</th><th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Value</th></tr></thead>
                                      <tbody>
                                        <tr className="border-b"><td className="py-1.5 px-2 font-mono">Last changed</td><td className="py-1.5 px-2">{row.last_changed_at ? new Date(row.last_changed_at).toLocaleString() : (row.updated_at ? new Date(row.updated_at).toLocaleString() : "—")}</td></tr>
                                        <tr className="border-b"><td className="py-1.5 px-2 font-mono">Created</td><td className="py-1.5 px-2">{row.created_at ? new Date(row.created_at).toLocaleString() : "—"}</td></tr>
                                        <tr className="border-b last:border-0"><td className="py-1.5 px-2 font-mono">Updated</td><td className="py-1.5 px-2">{row.updated_at ? new Date(row.updated_at).toLocaleString() : "—"}</td></tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </section>

                                {/* 6. Raw attributes */}
                                <section className="rounded-lg border bg-muted/30 p-4">
                                  <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                                    <Layers className="h-4 w-4" />
                                    Raw attributes
                                  </h4>
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-xs">
                                      <thead><tr className="border-b"><th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Key</th><th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Value</th></tr></thead>
                                      <tbody>
                                        <tr className="border-b"><td className="py-1.5 px-2 font-mono">id</td><td className="py-1.5 px-2 font-mono text-muted-foreground">{row.id}</td></tr>
                                        <tr className="border-b"><td className="py-1.5 px-2 font-mono">asset_key</td><td className="py-1.5 px-2">{row.asset_key}</td></tr>
                                        <tr className="border-b"><td className="py-1.5 px-2 font-mono">name</td><td className="py-1.5 px-2">{row.name}</td></tr>
                                        <tr className="border-b"><td className="py-1.5 px-2 font-mono">asset_type</td><td className="py-1.5 px-2">{row.asset_type}</td></tr>
                                        {rawAttrs.map((attr) => (
                                          <tr key={attr.key} className="border-b last:border-0"><td className="py-1.5 px-2 font-mono">{attr.key}</td><td className="py-1.5 px-2 break-all">{attr.value}</td></tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </section>
                              </div>
                            </td>
                          </tr>
                        )}
                      </Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          {!loading && <p className="text-xs text-muted-foreground mt-4">Live data from Discovery API.</p>}
        </CardContent>
      </Card>

      {/* Right-side Add/Edit drawer — portaled to body so top aligns with viewport (app header is fixed h-16) */}
      {drawerOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <>
            <div
              className="fixed inset-0 bg-black/20 z-40"
              style={{ top: 0, left: 0, right: 0, bottom: 0 }}
              aria-hidden
              onClick={() => setDrawerOpen(false)}
            />
            <aside
              className="fixed right-0 w-full max-w-5xl bg-background border-l shadow-xl z-50 flex flex-col"
              style={{ top: 0, height: "100vh" }}
              aria-label={drawerMode === "add" ? "Add asset" : "Edit asset"}
            >
              <div
                className="flex shrink-0 items-center justify-between px-4 border-b bg-background"
                style={{ height: "64px" }}
              >
              <h2 className="text-lg font-semibold">
                {drawerMode === "add" ? "Add asset" : `Edit: ${drawerAsset?.name ?? "Asset"}`}
              </h2>
              <button
                type="button"
                className="p-2 rounded-md hover:bg-muted"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="grid grid-cols-1 gap-4">
                <section className="rounded-lg border bg-muted/30 p-4">
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                    <Fingerprint className="h-4 w-4" /> Identity
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">Name</label>
                      <Input value={drawerForm.name} onChange={(e) => setDrawerForm((f) => ({ ...f, name: e.target.value }))} placeholder="Asset name" className="h-9" />
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">Asset key</label>
                      <Input value={drawerForm.asset_key} onChange={(e) => setDrawerForm((f) => ({ ...f, asset_key: e.target.value }))} placeholder="e.g. CACHE-001" className="h-9 font-mono" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs text-muted-foreground mb-1">Type</label>
                        <Select value={drawerForm.asset_type} onValueChange={(v) => setDrawerForm((f) => ({ ...f, asset_type: v }))}>
                          <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="VM">VM</SelectItem>
                            <SelectItem value="Database">Database</SelectItem>
                            <SelectItem value="Container">Container</SelectItem>
                            <SelectItem value="Server">Server</SelectItem>
                            <SelectItem value="Network">Network</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-xs text-muted-foreground mb-1">Lifecycle</label>
                        <Select value={drawerForm.lifecycle_state} onValueChange={(v) => setDrawerForm((f) => ({ ...f, lifecycle_state: v }))}>
                          <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {LIFECYCLE_OPTIONS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">Hostname / FQDN</label>
                      <Input value={drawerForm.hostname} onChange={(e) => setDrawerForm((f) => ({ ...f, hostname: e.target.value }))} placeholder="hostname.example.com" className="h-9 font-mono" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs text-muted-foreground mb-1">Primary IP</label>
                        <Input value={drawerForm.primary_ip} onChange={(e) => setDrawerForm((f) => ({ ...f, primary_ip: e.target.value }))} placeholder="0.0.0.0" className="h-9 font-mono" />
                      </div>
                      <div>
                        <label className="block text-xs text-muted-foreground mb-1">Region</label>
                        <Input value={drawerForm.region} onChange={(e) => setDrawerForm((f) => ({ ...f, region: e.target.value }))} placeholder="e.g. us-east-1" className="h-9" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">Provider resource ID (optional)</label>
                      <Input value={drawerForm.provider_resource_id} onChange={(e) => setDrawerForm((f) => ({ ...f, provider_resource_id: e.target.value }))} placeholder="Cloud resource ID" className="h-9 font-mono text-xs" />
                    </div>
                  </div>
                </section>
                <section className="rounded-lg border bg-muted/30 p-4">
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                    <Layers className="h-4 w-4" /> Classification
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">Environment</label>
                      <Input value={drawerForm.environment} onChange={(e) => setDrawerForm((f) => ({ ...f, environment: e.target.value }))} placeholder="e.g. Production, Staging" className="h-9" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs text-muted-foreground mb-1">Criticality</label>
                        <Select value={drawerForm.criticality || "none"} onValueChange={(v) => setDrawerForm((f) => ({ ...f, criticality: v === "none" ? "" : v }))}>
                          <SelectTrigger className="h-9"><SelectValue placeholder="—" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">—</SelectItem>
                            <SelectItem value="critical">Critical</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-xs text-muted-foreground mb-1">Data classification</label>
                        <Input value={drawerForm.data_classification} onChange={(e) => setDrawerForm((f) => ({ ...f, data_classification: e.target.value }))} placeholder="e.g. Internal, Public" className="h-9" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="in_scope_soc2"
                        checked={drawerForm.in_scope_soc2}
                        onChange={(e) => setDrawerForm((f) => ({ ...f, in_scope_soc2: e.target.checked }))}
                        className="rounded border-input"
                      />
                      <label htmlFor="in_scope_soc2" className="text-sm text-muted-foreground">In scope (SOC2)</label>
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">Owner</label>
                      <Input value={drawerForm.owner} onChange={(e) => setDrawerForm((f) => ({ ...f, owner: e.target.value }))} placeholder="Owner or team" className="h-9" />
                    </div>
                  </div>
                </section>
                <section className="rounded-lg border bg-muted/30 p-4">
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                    <Tags className="h-4 w-4" /> Tags
                  </h4>
                  <div className="space-y-2">
                    {drawerForm.tags.map((t, i) => (
                      <div key={i} className="flex gap-2 items-center">
                        <Input value={t.key} onChange={(e) => setDrawerForm((f) => ({ ...f, tags: f.tags.map((tag, j) => j === i ? { ...tag, key: e.target.value } : tag) }))} placeholder="Key" className="h-8 text-xs flex-1" />
                        <Input value={t.value} onChange={(e) => setDrawerForm((f) => ({ ...f, tags: f.tags.map((tag, j) => j === i ? { ...tag, value: e.target.value } : tag) }))} placeholder="Value" className="h-8 text-xs flex-1" />
                        <button type="button" className="p-1 text-muted-foreground hover:text-foreground" onClick={() => setDrawerForm((f) => ({ ...f, tags: f.tags.filter((_, j) => j !== i) }))} aria-label="Remove tag">×</button>
                      </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" className="h-8 text-xs" onClick={() => setDrawerForm((f) => ({ ...f, tags: [...f.tags, { key: "", value: "" }] }))}>
                      + Add tag
                    </Button>
                  </div>
                </section>
                <section className="rounded-lg border bg-muted/30 p-4">
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                    <GitBranch className="h-4 w-4" /> Relationships
                  </h4>
                  <p className="text-xs text-muted-foreground">Depends on / Used by (read-only in form). Edit via dependency mapping.</p>
                  {drawerMode === "edit" && drawerAsset && (
                    <div className="mt-2 text-xs">
                      <span className="text-muted-foreground">Depends on: </span>{drawerAsset.depends_on_count ?? "—"} · <span className="text-muted-foreground">Used by: </span>{drawerAsset.used_by_count ?? "—"}
                    </div>
                  )}
                </section>
                <section className="rounded-lg border bg-muted/30 p-4">
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                    <History className="h-4 w-4" /> Change history
                  </h4>
                  {drawerMode === "edit" && drawerAsset && (
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>Created: {drawerAsset.created_at ? new Date(drawerAsset.created_at).toLocaleString() : "—"}</p>
                      <p>Updated: {drawerAsset.updated_at ? new Date(drawerAsset.updated_at).toLocaleString() : "—"}</p>
                    </div>
                  )}
                  {drawerMode === "add" && <p className="text-xs text-muted-foreground">Set on create.</p>}
                </section>
                <section className="rounded-lg border bg-muted/30 p-4">
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                    <Layers className="h-4 w-4" /> Raw attributes
                  </h4>
                  <p className="text-xs text-muted-foreground">Advanced key/value attributes. Use after save or in API.</p>
                </section>
              </div>
              {drawerError && (
                <p className="text-sm text-destructive mt-2">{drawerError}</p>
              )}
              <div className="mt-6 flex gap-2">
                <Button
                  size="sm"
                  className="bg-palette-accent-2 text-palette-primary hover:bg-palette-accent-3 border border-palette-accent-2"
                  onClick={handleSaveDrawer}
                  disabled={drawerSaving || !drawerForm.name.trim()}
                >
                  {drawerSaving ? "Saving…" : drawerMode === "add" ? "Create asset" : "Save"}
                </Button>
                <Button variant="outline" size="sm" onClick={() => setDrawerOpen(false)} disabled={drawerSaving}>
                  Cancel
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
