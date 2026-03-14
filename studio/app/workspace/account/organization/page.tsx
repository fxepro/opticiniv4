"use client";

import { useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Building2, Pencil, X, Loader2, Globe, Coins, Plus, Trash2, RefreshCw, AlertCircle, Star, Users } from "lucide-react";
import { toast } from "sonner";
import { DRAWER_WIDTH_FULL, DRAWER_WIDTH_HALF } from "@/lib/drawer-sizes";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? (typeof window !== "undefined" ? "" : "http://localhost:8000");

interface CountryOption {
  id: string;
  code: string;
  name: string;
  region_group: string;
}

interface OrgRegion {
  id: string;
  country_id: string;
  country_code: string;
  country_name: string;
  region_group: string;
  name: string;
  city: string;
  currency_code: string;
  primary_contact_name: string;
  primary_contact_email: string;
  address: string;
  created_at: string | null;
  updated_at: string | null;
}

interface OrgCurrencyItem {
  id: string;
  currency_id: string;
  code: string;
  name: string;
  symbol: string;
  is_default: boolean;
  created_at: string | null;
}

type OrgStatus = "active" | "suspended" | "archived";

interface OrgForm {
  legal_name: string;
  display_name: string;
  primary_domain: string;
  physical_address: string;
  primary_contact_email: string;
  secondary_domains: string;
  industry: string;
  jurisdiction_country: string;
  jurisdiction_state: string;
  timezone: string;
  currency: string;
  fiscal_year_start_month: string;
  primary_contact_name: string;
  billing_contact_email: string;
  security_contact_email: string;
  data_residency_region: string;
  default_environment_id: string;
  enforce_mfa: boolean;
  sso_enabled: boolean;
  status: OrgStatus;
}

const STATUS_OPTIONS: { value: OrgStatus; label: string }[] = [
  { value: "active", label: "Active" },
  { value: "suspended", label: "Suspended" },
  { value: "archived", label: "Archived" },
];

const DEFAULT_ORG_FORM: OrgForm = {
  legal_name: "",
  display_name: "",
  primary_domain: "",
  physical_address: "",
  primary_contact_email: "",
  secondary_domains: "",
  industry: "",
  jurisdiction_country: "",
  jurisdiction_state: "",
  timezone: "UTC",
  currency: "USD",
  fiscal_year_start_month: "1",
  primary_contact_name: "",
  billing_contact_email: "",
  security_contact_email: "",
  data_residency_region: "",
  default_environment_id: "",
  enforce_mfa: false,
  sso_enabled: false,
  status: "active",
};

export default function AccountOrganizationPage() {
  const [form, setForm] = useState<OrgForm>({
    ...DEFAULT_ORG_FORM,
    display_name: "Example Corp",
    legal_name: "Example Corp LLC",
    primary_domain: "example.com",
    physical_address: "123 Main St, San Francisco, CA 94105, USA",
    primary_contact_email: "admin@example.com",
  });
  const [orgId, setOrgId] = useState<number | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "loading" | "error">("idle");

  // Multi-region state
  const [regions, setRegions] = useState<OrgRegion[]>([]);
  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [regionsLoading, setRegionsLoading] = useState(false);
  const [regionsError, setRegionsError] = useState<string | null>(null);
  const [regionDrawerOpen, setRegionDrawerOpen] = useState<"add" | "edit" | null>(null);
  const [editingRegion, setEditingRegion] = useState<OrgRegion | null>(null);
  const [regionForm, setRegionForm] = useState({ country_id: "", name: "", city: "", currency_code: "", primary_contact_name: "", primary_contact_email: "", address: "" });
  const [regionSaveStatus, setRegionSaveStatus] = useState<"idle" | "loading" | "error">("idle");
  const [currencies, setCurrencies] = useState<{ id: string; code: string; name: string; symbol: string }[]>([]);
  const [orgCurrencies, setOrgCurrencies] = useState<OrgCurrencyItem[]>([]);
  const [orgCurrenciesLoading, setOrgCurrenciesLoading] = useState(false);
  const [timezones, setTimezones] = useState<{ id: string; name: string; label: string; utc_offset: number }[]>([]);
  const [states, setStates] = useState<{ id: string; code: string; name: string }[]>([]);
  const [departments, setDepartments] = useState<{ id: string; code: string; name: string }[]>([]);
  const [departmentsLoading, setDepartmentsLoading] = useState(false);

  const getAuthHeaders = useCallback((): HeadersInit => {
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    return { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) } as HeadersInit;
  }, []);

  const fetchRegions = useCallback(() => {
    setRegionsError(null);
    setRegionsLoading(true);
    fetch(`${API_BASE}/api/account/regions/`, { headers: getAuthHeaders() })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(r.status === 401 ? "Please sign in." : `Failed ${r.status}`))))
      .then((data: OrgRegion[]) => setRegions(data))
      .catch((e: Error) => setRegionsError(e.message))
      .finally(() => setRegionsLoading(false));
  }, [getAuthHeaders]);

  const fetchCountries = useCallback(() => {
    fetch(`${API_BASE}/api/account/countries/`, { headers: getAuthHeaders() })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("Failed to load countries"))))
      .then((data: CountryOption[]) => setCountries(data))
      .catch(() => setCountries([]));
  }, [getAuthHeaders]);

  const fetchDepartments = useCallback(() => {
    fetch(`${API_BASE}/api/account/departments/`, { headers: getAuthHeaders() })
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => setDepartments(data))
      .catch(() => setDepartments([]));
  }, [getAuthHeaders]);

  const syncDepartments = useCallback(() => {
    setDepartmentsLoading(true);
    fetch(`${API_BASE}/api/account/departments/sync/`, { method: "POST", headers: getAuthHeaders() })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => { setDepartments(data); toast.success("Departments synced from People."); })
      .catch(() => toast.error("Failed to sync departments."))
      .finally(() => setDepartmentsLoading(false));
  }, [getAuthHeaders]);

  const fetchCurrencies = useCallback(() => {
    fetch(`${API_BASE}/api/account/currencies/`, { headers: getAuthHeaders() })
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => setCurrencies(data))
      .catch(() => setCurrencies([]));
  }, [getAuthHeaders]);

  const fetchTimezones = useCallback(() => {
    fetch(`${API_BASE}/api/account/timezones/`, { headers: getAuthHeaders() })
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => setTimezones(data))
      .catch(() => setTimezones([]));
  }, [getAuthHeaders]);

  const fetchOrgCurrencies = useCallback(() => {
    setOrgCurrenciesLoading(true);
    fetch(`${API_BASE}/api/account/org-currencies/`, { headers: getAuthHeaders() })
      .then((r) => (r.ok ? r.json() : []))
      .then((data: OrgCurrencyItem[]) => setOrgCurrencies(data))
      .catch(() => setOrgCurrencies([]))
      .finally(() => setOrgCurrenciesLoading(false));
  }, [getAuthHeaders]);

  const fetchStates = useCallback((countryCode: string) => {
    if (!countryCode) { setStates([]); return; }
    fetch(`${API_BASE}/api/account/states/?country=${countryCode}`, { headers: getAuthHeaders() })
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => setStates(data))
      .catch(() => setStates([]));
  }, [getAuthHeaders]);

  const fetchOrg = useCallback(() => {
    fetch(`${API_BASE}/api/account/organization/`, { headers: getAuthHeaders() })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("Failed to load org"))))
      .then((data: Record<string, any>) => {
        if (data.org_id != null) setOrgId(data.org_id);
        setForm((f) => ({
          ...f,
          legal_name: data.legal_name ?? f.legal_name,
          display_name: data.display_name ?? data.name ?? f.display_name,
          primary_domain: data.primary_domain ?? f.primary_domain,
          physical_address: data.physical_address ?? f.physical_address,
          primary_contact_email: data.primary_contact_email ?? f.primary_contact_email,
          secondary_domains: data.secondary_domains ?? f.secondary_domains,
          industry: data.industry ?? f.industry,
          jurisdiction_country: data.jurisdiction_country ?? f.jurisdiction_country,
          jurisdiction_state: data.jurisdiction_state ?? f.jurisdiction_state,
          timezone: data.timezone ?? f.timezone,
          currency: data.currency ?? f.currency,
          fiscal_year_start_month: data.fiscal_year_start_month != null ? String(data.fiscal_year_start_month) : f.fiscal_year_start_month,
          primary_contact_name: data.primary_contact_name ?? f.primary_contact_name,
          billing_contact_email: data.billing_contact_email ?? f.billing_contact_email,
          security_contact_email: data.security_contact_email ?? f.security_contact_email,
          data_residency_region: data.data_residency_region ?? f.data_residency_region,
          default_environment_id: data.default_environment_id ?? f.default_environment_id,
          enforce_mfa: data.enforce_mfa ?? f.enforce_mfa,
          sso_enabled: data.sso_enabled ?? f.sso_enabled,
          status: data.status ?? f.status,
        }));
      })
      .catch(() => {});
  }, [getAuthHeaders]);

  useEffect(() => {
    fetchOrg();
    fetchRegions();
    fetchCountries();
    fetchCurrencies();
    fetchTimezones();
    fetchOrgCurrencies();
    fetchDepartments();
  }, [fetchOrg, fetchRegions, fetchCountries, fetchCurrencies, fetchTimezones, fetchOrgCurrencies, fetchDepartments]);

  useEffect(() => {
    fetchStates(form.jurisdiction_country);
  }, [form.jurisdiction_country, fetchStates]);

  const openRegionAdd = () => {
    setEditingRegion(null);
    setRegionForm({ country_id: "", name: "", city: "", currency_code: "", primary_contact_name: "", primary_contact_email: "", address: "" });
    setRegionDrawerOpen("add");
    setRegionSaveStatus("idle");
  };

  const openRegionEdit = (r: OrgRegion) => {
    setEditingRegion(r);
    setRegionForm({
      country_id: r.country_id,
      name: r.name,
      city: r.city || "",
      currency_code: r.currency_code || "",
      primary_contact_name: r.primary_contact_name,
      primary_contact_email: r.primary_contact_email,
      address: r.address,
    });
    setRegionDrawerOpen("edit");
    setRegionSaveStatus("idle");
  };

  const handleRegionSave = () => {
    if (!regionForm.country_id.trim()) {
      setRegionSaveStatus("error");
      setRegionsError("Select a country.");
      return;
    }
    setRegionsError(null);
    setRegionSaveStatus("loading");
    const headers = getAuthHeaders();
    const body = {
      country_id: regionForm.country_id,
      name: regionForm.name.trim() || undefined,
      city: regionForm.city.trim() || "",
      currency_code: regionForm.currency_code || "",
      primary_contact_name: regionForm.primary_contact_name.trim() || "",
      primary_contact_email: regionForm.primary_contact_email.trim() || "",
      address: regionForm.address.trim() || "",
    };
    if (regionDrawerOpen === "add") {
      fetch(`${API_BASE}/api/account/regions/`, { method: "POST", headers, body: JSON.stringify(body) })
        .then((r) => {
          if (!r.ok) return r.json().then((d: { error?: string }) => Promise.reject(new Error(d.error || "Failed")));
          return r.json();
        })
        .then((created: OrgRegion) => {
          setRegions((prev) => [...prev, created].sort((a, b) => a.country_name.localeCompare(b.country_name)));
          setRegionDrawerOpen(null);
          toast.success("Region added successfully");
        })
        .catch((e: Error) => {
          setRegionsError(e.message);
          setRegionSaveStatus("error");
          toast.error(e.message || "Failed to add region");
        });
    } else if (editingRegion) {
      fetch(`${API_BASE}/api/account/regions/${editingRegion.id}/`, { method: "PATCH", headers, body: JSON.stringify(body) })
        .then((r) => {
          if (!r.ok) return r.json().then((d: { error?: string }) => Promise.reject(new Error(d.error || "Failed")));
          return r.json();
        })
        .then((updated: OrgRegion) => {
          setRegions((prev) => prev.map((p) => (p.id === updated.id ? updated : p)).sort((a, b) => a.country_name.localeCompare(b.country_name)));
          setRegionDrawerOpen(null);
          toast.success("Region updated successfully");
        })
        .catch((e: Error) => {
          setRegionsError(e.message);
          setRegionSaveStatus("error");
          toast.error(e.message || "Failed to update region");
        });
    }
  };

  const handleRegionDelete = (id: string) => {
    if (typeof window !== "undefined" && !window.confirm("Remove this region?")) return;
    const headers = getAuthHeaders();
    fetch(`${API_BASE}/api/account/regions/${id}/`, { method: "DELETE", headers })
      .then((r) => {
        if (!r.ok) throw new Error("Failed to delete");
        setRegions((prev) => prev.filter((p) => p.id !== id));
        if (editingRegion?.id === id) setRegionDrawerOpen(null);
        toast.success("Region removed");
      })
      .catch((e: Error) => {
        setRegionsError(e.message);
        toast.error(e.message || "Failed to remove region");
      });
  };

  const handleAddOrgCurrency = async (currencyId: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/account/org-currencies/`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ currency_id: currencyId }),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || "Failed");
      }
      toast.success("Currency added");
      fetchOrgCurrencies();
    } catch (e: any) {
      toast.error(e.message || "Failed to add currency");
    }
  };

  const handleSetDefaultCurrency = async (ocId: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/account/org-currencies/${ocId}/`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify({ is_default: true }),
      });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      if (data.code) {
        setForm((f) => ({ ...f, currency: data.code }));
        fetch(`${API_BASE}/api/account/organization/`, {
          method: "PATCH",
          headers: getAuthHeaders(),
          body: JSON.stringify({ currency: data.code }),
        }).catch(() => {});
      }
      toast.success("Primary currency updated");
      fetchOrgCurrencies();
    } catch (e: any) {
      toast.error(e.message || "Failed to update");
    }
  };

  const handleRemoveOrgCurrency = async (ocId: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/account/org-currencies/${ocId}/`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("Currency removed");
      fetchOrgCurrencies();
    } catch (e: any) {
      toast.error(e.message || "Failed to remove");
    }
  };

  const handleSave = async () => {
    setSaveStatus("loading");
    try {
      const res = await fetch(`${API_BASE}/api/account/organization/`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          name: form.display_name || form.legal_name,
          legal_name: form.legal_name,
          display_name: form.display_name,
          primary_domain: form.primary_domain,
          secondary_domains: form.secondary_domains,
          physical_address: form.physical_address,
          industry: form.industry,
          jurisdiction_country: form.jurisdiction_country,
          jurisdiction_state: form.jurisdiction_state,
          timezone: form.timezone,
          currency: form.currency,
          fiscal_year_start_month: form.fiscal_year_start_month,
          primary_contact_name: form.primary_contact_name,
          primary_contact_email: form.primary_contact_email,
          billing_contact_email: form.billing_contact_email,
          security_contact_email: form.security_contact_email,
          data_residency_region: form.data_residency_region,
          default_environment_id: form.default_environment_id,
          enforce_mfa: form.enforce_mfa,
          sso_enabled: form.sso_enabled,
          status: form.status,
        }),
      });
      if (!res.ok) throw new Error(`Save failed (${res.status})`);
      const data = await res.json();
      if (data.org_id != null) setOrgId(data.org_id);
      setSaveStatus("idle");
      setDrawerOpen(false);
      toast.success("Organization saved");
    } catch (e: any) {
      setSaveStatus("error");
      toast.error(e.message || "Failed to save organization");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="app-page-title">Organization</h1>
        <p className="text-muted-foreground mt-1">
          Single-tenant organization profile. All users, teams, and environments belong to this org.
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full max-w-2xl grid-cols-4">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="multi-region" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Multi-region
          </TabsTrigger>
          <TabsTrigger value="multi-currency" className="flex items-center gap-2">
            <Coins className="h-4 w-4" />
            Multi-currency
          </TabsTrigger>
          <TabsTrigger value="departments" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Departments
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Organization profile
                </CardTitle>
                <CardDescription>
                  Primary identity, domain, address, and mail contact. Edit full details in the drawer.
                </CardDescription>
              </div>
              <Button size="sm" onClick={() => setDrawerOpen(true)}>
                <Pencil className="h-4 w-4 mr-2" />
                Edit organization
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">Org ID</TableHead>
                      <TableHead>Primary</TableHead>
                      <TableHead>Domain</TableHead>
                      <TableHead>Physical address</TableHead>
                      <TableHead>Mail contact</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-mono font-semibold text-primary">
                        {orgId ?? "—"}
                      </TableCell>
                      <TableCell className="font-medium">
                        {form.display_name || form.legal_name || "—"}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {form.primary_domain || "—"}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {form.physical_address || "—"}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {form.primary_contact_email || "—"}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Edit" onClick={() => setDrawerOpen(true)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="multi-region" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Multi-region
                </CardTitle>
                <CardDescription>
                  Regions by country for compliance (e.g. EU vs US). Name, primary contact, and address per region.
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={fetchRegions} disabled={regionsLoading}>
                  <RefreshCw className={`h-4 w-4 mr-2 ${regionsLoading ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
                <Button size="sm" onClick={openRegionAdd}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add region
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {regionsError && (
                <div className="flex items-center gap-2 text-sm text-destructive mb-4">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {regionsError}
                </div>
              )}
              {regionsLoading ? (
                <p className="text-sm text-muted-foreground py-8">Loading regions…</p>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Region</TableHead>
                        <TableHead>Country</TableHead>
                        <TableHead>City</TableHead>
                        <TableHead>Currency</TableHead>
                        <TableHead>Primary contact</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {regions.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="h-24 text-center text-slate-500">
                            No regions. Add a region to get started.
                          </TableCell>
                        </TableRow>
                      ) : regions.map((r) => (
                          <TableRow key={r.id}>
                            <TableCell className="font-medium">{r.name || r.region_group}</TableCell>
                            <TableCell className="text-muted-foreground">
                              {r.country_name} ({r.country_code})
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {r.city || "—"}
                            </TableCell>
                            <TableCell className="font-mono text-muted-foreground">
                              {r.currency_code || "—"}
                            </TableCell>
                            <TableCell className="text-muted-foreground text-sm">
                              {r.primary_contact_name || r.primary_contact_email ? (
                                <>
                                  {r.primary_contact_name && <span>{r.primary_contact_name}</span>}
                                  {r.primary_contact_email && <span className="block text-xs">{r.primary_contact_email}</span>}
                                </>
                              ) : (
                                "—"
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Edit" onClick={() => openRegionEdit(r)}>
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" aria-label="Delete" onClick={() => handleRegionDelete(r.id)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Drawer: Add / Edit region */}
          {regionDrawerOpen &&
            typeof document !== "undefined" &&
            createPortal(
              <>
                <div className="fixed inset-0 bg-black/20 z-40" aria-hidden onClick={() => setRegionDrawerOpen(null)} />
                <aside
                  className={`fixed right-0 w-full ${DRAWER_WIDTH_HALF} bg-background border-l shadow-xl z-50 flex flex-col`}
                  style={{ top: 0, height: "100vh" }}
                  aria-label={regionDrawerOpen === "add" ? "Add region" : "Edit region"}
                >
                  <div className="flex h-16 shrink-0 items-center justify-between px-4 border-b">
                    <h2 className="text-lg font-semibold">{regionDrawerOpen === "add" ? "Add region" : "Edit region"}</h2>
                    <button type="button" className="p-2 rounded-md hover:bg-muted" onClick={() => setRegionDrawerOpen(null)} aria-label="Close">
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="region_country">Country *</Label>
                      <Select
                        value={regionForm.country_id}
                        onValueChange={(v) => setRegionForm((f) => ({ ...f, country_id: v }))}
                        disabled={regionDrawerOpen === "edit"}
                      >
                        <SelectTrigger id="region_country">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((c) => (
                            <SelectItem key={c.id} value={c.id}>
                              {c.name} ({c.code}) — {c.region_group}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {regionDrawerOpen === "edit" && <p className="text-xs text-muted-foreground">Country cannot be changed when editing.</p>}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="region_city">City</Label>
                      <Input
                        id="region_city"
                        value={regionForm.city}
                        onChange={(e) => setRegionForm((f) => ({ ...f, city: e.target.value }))}
                        placeholder="e.g. Tokyo, Frankfurt, Virginia"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="region_name">Label / Name</Label>
                      <Input
                        id="region_name"
                        value={regionForm.name}
                        onChange={(e) => setRegionForm((f) => ({ ...f, name: e.target.value }))}
                        placeholder="e.g. Asia Pacific (Tokyo), EU HQ"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="region_currency">Currency</Label>
                      <Select
                        value={regionForm.currency_code || "__default__"}
                        onValueChange={(v) => setRegionForm((f) => ({ ...f, currency_code: v === "__default__" ? "" : v }))}
                      >
                        <SelectTrigger id="region_currency">
                          <SelectValue placeholder="Use org default" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="__default__">Use org default</SelectItem>
                          {(orgCurrencies.length > 0
                            ? currencies.filter((c) => orgCurrencies.some((oc) => oc.currency_id === c.id))
                            : currencies
                          ).map((c) => (
                            <SelectItem key={c.id} value={c.code}>
                              {c.code} — {c.name} ({c.symbol})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">Override the org&apos;s primary currency for this region.</p>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="region_contact_name">Primary contact name</Label>
                      <Input
                        id="region_contact_name"
                        value={regionForm.primary_contact_name}
                        onChange={(e) => setRegionForm((f) => ({ ...f, primary_contact_name: e.target.value }))}
                        placeholder="Name"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="region_contact_email">Primary contact email</Label>
                      <Input
                        id="region_contact_email"
                        type="email"
                        value={regionForm.primary_contact_email}
                        onChange={(e) => setRegionForm((f) => ({ ...f, primary_contact_email: e.target.value }))}
                        placeholder="email@example.com"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="region_address">Address</Label>
                      <Input
                        id="region_address"
                        value={regionForm.address}
                        onChange={(e) => setRegionForm((f) => ({ ...f, address: e.target.value }))}
                        placeholder="Street, city, postal code, country"
                      />
                    </div>
                  </div>
                  <div className="shrink-0 border-t p-4 flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setRegionDrawerOpen(null)}>Cancel</Button>
                    <Button size="sm" onClick={handleRegionSave} disabled={regionSaveStatus === "loading"}>
                      {regionSaveStatus === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                      <span className="ml-2">{regionDrawerOpen === "add" ? "Add" : "Save"}</span>
                    </Button>
                  </div>
                </aside>
              </>,
              document.body
            )}
        </TabsContent>

        <TabsContent value="multi-currency" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coins className="h-5 w-5" />
                Multi-currency
              </CardTitle>
              <CardDescription>
                Enable the currencies your organization operates in. Click the star to set the primary currency used for billing and reporting.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {orgCurrenciesLoading ? (
                <p className="text-sm text-muted-foreground py-8">Loading currencies…</p>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[60px] text-center">Enabled</TableHead>
                        <TableHead className="w-[80px]">Code</TableHead>
                        <TableHead>Currency</TableHead>
                        <TableHead className="w-[70px] text-center">Symbol</TableHead>
                        <TableHead className="w-[100px] text-center">Primary</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currencies.map((c) => {
                        const oc = orgCurrencies.find((o) => o.currency_id === c.id);
                        const enabled = !!oc;
                        const isPrimary = oc?.is_default ?? false;
                        return (
                          <TableRow key={c.id} className={enabled ? "" : "opacity-60"}>
                            <TableCell className="text-center">
                              <Checkbox
                                checked={enabled}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    handleAddOrgCurrency(c.id);
                                  } else if (oc) {
                                    handleRemoveOrgCurrency(oc.id);
                                  }
                                }}
                              />
                            </TableCell>
                            <TableCell className="font-mono font-semibold">{c.code}</TableCell>
                            <TableCell>{c.name}</TableCell>
                            <TableCell className="text-center text-muted-foreground">{c.symbol}</TableCell>
                            <TableCell className="text-center">
                              {enabled && (
                                isPrimary ? (
                                  <span className="inline-flex items-center justify-center gap-1 text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                                    <Star className="h-3 w-3 fill-amber-500" />
                                    Primary
                                  </span>
                                ) : (
                                  <button
                                    type="button"
                                    className="text-muted-foreground hover:text-amber-500 transition-colors"
                                    title="Set as primary"
                                    onClick={() => handleSetDefaultCurrency(oc!.id)}
                                  >
                                    <Star className="h-4 w-4" />
                                  </button>
                                )
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}
              {orgCurrencies.length > 0 && (
                <p className="text-xs text-muted-foreground mt-3">
                  {orgCurrencies.length} currency{orgCurrencies.length !== 1 ? "ies" : ""} enabled
                  {orgCurrencies.find((o) => o.is_default)
                    ? ` · Primary: ${orgCurrencies.find((o) => o.is_default)!.code}`
                    : " · No primary set"}
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-base">Departments</CardTitle>
                <CardDescription className="text-xs mt-0.5">
                  Canonical department list derived from People records. Sync to populate from imported CSV/LDAP data.
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={syncDepartments} disabled={departmentsLoading} className="gap-1.5">
                {departmentsLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                Sync from People
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40px] text-center text-muted-foreground">#</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Code</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {departments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center text-muted-foreground py-8 text-sm">
                        No departments yet. Import a CSV with a <span className="font-mono">department_name</span> column in People, then click <strong>Sync from People</strong>.
                      </TableCell>
                    </TableRow>
                  ) : (
                    departments.map((d, idx) => (
                      <TableRow key={d.id}>
                        <TableCell className="text-center text-muted-foreground text-xs">{idx + 1}</TableCell>
                        <TableCell className="font-medium">{d.name}</TableCell>
                        <TableCell className="text-muted-foreground font-mono text-xs">{d.code}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Drawer: Edit organization — all fields */}
      {drawerOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <>
            <div className="fixed inset-0 bg-black/20 z-40" aria-hidden onClick={() => setDrawerOpen(false)} />
            <aside
              className={`fixed right-0 w-full ${DRAWER_WIDTH_FULL} bg-background border-l shadow-xl z-50 flex flex-col`}
              style={{ top: 0, height: "100vh" }}
              aria-label="Edit organization"
            >
              <div className="flex h-16 shrink-0 items-center justify-between px-4 border-b">
                <h2 className="text-lg font-semibold">Edit organization</h2>
                <button type="button" className="p-2 rounded-md hover:bg-muted" onClick={() => setDrawerOpen(false)} aria-label="Close">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-6">
                  {/* Core identity */}
                  <div className="space-y-2">
                    <h2 className="text-sm font-semibold text-muted-foreground">Core identity</h2>
                    <p className="text-xs text-muted-foreground">
                      Legal name, display name, domains, jurisdiction, timezone, currency, fiscal year.
                    </p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="legal_name">Legal name</Label>
                      <Input
                        id="legal_name"
                        value={form.legal_name}
                        onChange={(e) => setForm((f) => ({ ...f, legal_name: e.target.value }))}
                        placeholder="Legal entity name"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="display_name">Display name</Label>
                      <Input
                        id="display_name"
                        value={form.display_name}
                        onChange={(e) => setForm((f) => ({ ...f, display_name: e.target.value }))}
                        placeholder="Name shown in UI"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="primary_domain">Primary domain</Label>
                      <Input
                        id="primary_domain"
                        value={form.primary_domain}
                        onChange={(e) => setForm((f) => ({ ...f, primary_domain: e.target.value }))}
                        placeholder="example.com"
                      />
                    </div>
                    <div className="space-y-1.5 sm:col-span-2">
                      <Label htmlFor="physical_address">Physical address</Label>
                      <Input
                        id="physical_address"
                        value={form.physical_address}
                        onChange={(e) => setForm((f) => ({ ...f, physical_address: e.target.value }))}
                        placeholder="Street, city, state, postal code, country"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="secondary_domains">Secondary domains (comma-separated)</Label>
                      <Input
                        id="secondary_domains"
                        value={form.secondary_domains}
                        onChange={(e) => setForm((f) => ({ ...f, secondary_domains: e.target.value }))}
                        placeholder="dev.example.com, staging.example.com"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="industry">Industry (optional)</Label>
                      <Input
                        id="industry"
                        value={form.industry}
                        onChange={(e) => setForm((f) => ({ ...f, industry: e.target.value }))}
                        placeholder="e.g. SaaS, Healthcare"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="jurisdiction_country">Jurisdiction country</Label>
                      <Select
                        value={form.jurisdiction_country}
                        onValueChange={(value) => setForm((f) => ({ ...f, jurisdiction_country: value, jurisdiction_state: "" }))}
                      >
                        <SelectTrigger id="jurisdiction_country">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((c) => (
                            <SelectItem key={c.id} value={c.code}>
                              {c.name} ({c.code})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="jurisdiction_state">Jurisdiction state / region</Label>
                      {states.length > 0 ? (
                        <Select
                          value={form.jurisdiction_state}
                          onValueChange={(value) => setForm((f) => ({ ...f, jurisdiction_state: value }))}
                        >
                          <SelectTrigger id="jurisdiction_state">
                            <SelectValue placeholder="Select state / region" />
                          </SelectTrigger>
                          <SelectContent>
                            {states.map((s) => (
                              <SelectItem key={s.id} value={s.code}>
                                {s.name} ({s.code})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input
                          id="jurisdiction_state"
                          value={form.jurisdiction_state}
                          onChange={(e) => setForm((f) => ({ ...f, jurisdiction_state: e.target.value }))}
                          placeholder={form.jurisdiction_country ? "Type state / region" : "Select a country first"}
                          disabled={!form.jurisdiction_country}
                        />
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select
                        value={form.timezone}
                        onValueChange={(value) => setForm((f) => ({ ...f, timezone: value }))}
                      >
                        <SelectTrigger id="timezone">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          {timezones.map((tz) => (
                            <SelectItem key={tz.id} value={tz.name}>
                              {tz.label || tz.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="currency">Currency</Label>
                      <Select
                        value={form.currency}
                        onValueChange={(value) => setForm((f) => ({ ...f, currency: value }))}
                      >
                        <SelectTrigger id="currency">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          {(orgCurrencies.length > 0
                            ? currencies.filter((c) => orgCurrencies.some((oc) => oc.currency_id === c.id))
                            : currencies
                          ).map((cur) => (
                            <SelectItem key={cur.id} value={cur.code}>
                              {cur.code} — {cur.name} ({cur.symbol})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {orgCurrencies.length > 0 && (
                        <p className="text-xs text-muted-foreground">Only currencies enabled in Multi-currency are shown.</p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="fiscal_year_start_month">Fiscal year start month</Label>
                      <Select
                        value={form.fiscal_year_start_month}
                        onValueChange={(value) => setForm((f) => ({ ...f, fiscal_year_start_month: value }))}
                      >
                        <SelectTrigger id="fiscal_year_start_month">
                          <SelectValue placeholder="Select month" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m) => (
                            <SelectItem key={m} value={String(m)}>
                              {new Date(2000, m - 1, 1).toLocaleString("default", { month: "long" })}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="border-t pt-4 space-y-4">
                    <div className="space-y-1">
                      <h2 className="text-sm font-semibold text-muted-foreground">Contact</h2>
                      <p className="text-xs text-muted-foreground">
                        Who should we contact for primary, billing, and security issues.
                      </p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label htmlFor="primary_contact_name">Primary contact name</Label>
                        <Input
                          id="primary_contact_name"
                          value={form.primary_contact_name}
                          onChange={(e) => setForm((f) => ({ ...f, primary_contact_name: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="primary_contact_email">Primary contact email (mail contact)</Label>
                        <Input
                          id="primary_contact_email"
                          type="email"
                          value={form.primary_contact_email}
                          onChange={(e) => setForm((f) => ({ ...f, primary_contact_email: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="billing_contact_email">Billing contact email</Label>
                        <Input
                          id="billing_contact_email"
                          type="email"
                          value={form.billing_contact_email}
                          onChange={(e) => setForm((f) => ({ ...f, billing_contact_email: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="security_contact_email">Security contact email</Label>
                        <Input
                          id="security_contact_email"
                          type="email"
                          value={form.security_contact_email}
                          onChange={(e) => setForm((f) => ({ ...f, security_contact_email: e.target.value }))}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Governance */}
                  <div className="border-t pt-4 space-y-4">
                    <div className="space-y-1">
                      <h2 className="text-sm font-semibold text-muted-foreground">Governance</h2>
                      <p className="text-xs text-muted-foreground">
                        Data residency, default environment, MFA/SSO enforcement, and org status.
                      </p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label htmlFor="data_residency_region">Data residency region</Label>
                        <Input
                          id="data_residency_region"
                          value={form.data_residency_region}
                          onChange={(e) => setForm((f) => ({ ...f, data_residency_region: e.target.value }))}
                          placeholder="e.g. us-east-1 / EU"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="default_environment_id">Default environment (placeholder)</Label>
                        <Input
                          id="default_environment_id"
                          value={form.default_environment_id}
                          onChange={(e) => setForm((f) => ({ ...f, default_environment_id: e.target.value }))}
                          placeholder="Will be wired to Environments tab"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="enforce_mfa"
                          checked={form.enforce_mfa}
                          onCheckedChange={(checked) =>
                            setForm((f) => ({ ...f, enforce_mfa: Boolean(checked) }))
                          }
                        />
                        <Label htmlFor="enforce_mfa">Enforce MFA</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="sso_enabled"
                          checked={form.sso_enabled}
                          onCheckedChange={(checked) =>
                            setForm((f) => ({ ...f, sso_enabled: Boolean(checked) }))
                          }
                        />
                        <Label htmlFor="sso_enabled">SSO enabled</Label>
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="status">Status</Label>
                        <Select
                          value={form.status}
                          onValueChange={(value) => setForm((f) => ({ ...f, status: value as OrgStatus }))}
                        >
                          <SelectTrigger id="status">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {STATUS_OPTIONS.map((o) => (
                              <SelectItem key={o.value} value={o.value}>
                                {o.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="shrink-0 border-t p-4 flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setDrawerOpen(false)}>Cancel</Button>
                <Button size="sm" onClick={handleSave} disabled={saveStatus === "loading"}>
                  {saveStatus === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  <span className="ml-2">Save organization</span>
                </Button>
              </div>
            </aside>
          </>,
          document.body
        )}
    </div>
  );
}
