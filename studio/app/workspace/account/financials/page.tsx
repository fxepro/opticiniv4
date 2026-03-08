"use client";

import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreditCard, Banknote, Plus, Pencil, Trash2, RefreshCw, X, Loader2, AlertCircle } from "lucide-react";
import { DRAWER_WIDTH_HALF } from "@/lib/drawer-sizes";
import { toast } from "sonner";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? (typeof window !== "undefined" ? "" : "http://localhost:8000");

interface PaymentMethod {
  id: number;
  nickname: string;
  method_type: "card" | "ach";
  cardholder_name?: string;
  brand?: string;
  last4?: string;
  exp_month?: number | null;
  exp_year?: number | null;
  billing_address_line1?: string;
  billing_address_line2?: string;
  billing_city?: string;
  billing_state?: string;
  billing_postal_code?: string;
  billing_country?: string;
  bank_name?: string;
  account_type?: string;
  is_default: boolean;
  created_at: string;
}

type PaymentFormType = "card" | "ach";

interface PaymentFormState {
  method_type: PaymentFormType;
  nickname: string;
  cardholder_name: string;
  card_number: string;
  brand: string;
  exp_month: string;
  exp_year: string;
  billing_address_line1: string;
  billing_address_line2: string;
  billing_city: string;
  billing_state: string;
  billing_postal_code: string;
  billing_country: string;
  bank_name: string;
  account_type: string;
  account_number: string;
  routing_number: string;
  bank_address_line1: string;
  bank_address_line2: string;
  bank_city: string;
  bank_state: string;
  bank_postal_code: string;
  bank_country: string;
  is_default: boolean;
}

const emptyForm: PaymentFormState = {
  method_type: "card",
  nickname: "",
  cardholder_name: "",
  card_number: "",
  brand: "",
  exp_month: "",
  exp_year: "",
  billing_address_line1: "",
  billing_address_line2: "",
  billing_city: "",
  billing_state: "",
  billing_postal_code: "",
  billing_country: "",
  bank_name: "",
  account_type: "checking",
  account_number: "",
  routing_number: "",
  bank_address_line1: "",
  bank_address_line2: "",
  bank_city: "",
  bank_state: "",
  bank_postal_code: "",
  bank_country: "",
  is_default: false,
};

function paymentToForm(pm: PaymentMethod): PaymentFormState {
  return {
    method_type: pm.method_type,
    nickname: pm.nickname ?? "",
    cardholder_name: pm.cardholder_name ?? "",
    card_number: "",
    brand: pm.brand ?? "",
    exp_month: pm.exp_month != null ? String(pm.exp_month) : "",
    exp_year: pm.exp_year != null ? String(pm.exp_year) : "",
    billing_address_line1: pm.billing_address_line1 ?? "",
    billing_address_line2: pm.billing_address_line2 ?? "",
    billing_city: pm.billing_city ?? "",
    billing_state: pm.billing_state ?? "",
    billing_postal_code: pm.billing_postal_code ?? "",
    billing_country: pm.billing_country ?? "",
    bank_name: pm.bank_name ?? "",
    account_type: pm.account_type ?? "checking",
    account_number: "",
    routing_number: "",
    bank_address_line1: "",
    bank_address_line2: "",
    bank_city: "",
    bank_state: "",
    bank_postal_code: "",
    bank_country: "",
    is_default: pm.is_default,
  };
}

function formToPayload(form: PaymentFormState): Record<string, unknown> {
  const base: Record<string, unknown> = {
    method_type: form.method_type,
    nickname: form.nickname.trim(),
    is_default: form.is_default,
  };
  if (form.method_type === "card") {
    base.cardholder_name = form.cardholder_name;
    base.brand = form.brand;
    base.billing_address_line1 = form.billing_address_line1;
    base.billing_address_line2 = form.billing_address_line2;
    base.billing_city = form.billing_city;
    base.billing_state = form.billing_state;
    base.billing_postal_code = form.billing_postal_code;
    base.billing_country = form.billing_country;
    if (form.card_number) base.card_number = form.card_number.replace(/\s/g, "");
    if (form.exp_month) base.exp_month = parseInt(form.exp_month, 10);
    if (form.exp_year) base.exp_year = parseInt(form.exp_year, 10);
  } else {
    base.bank_name = form.bank_name;
    base.account_type = form.account_type;
    base.bank_address_line1 = form.bank_address_line1;
    base.bank_address_line2 = form.bank_address_line2;
    base.bank_city = form.bank_city;
    base.bank_state = form.bank_state;
    base.bank_postal_code = form.bank_postal_code;
    base.bank_country = form.bank_country;
    if (form.account_number) base.account_number = form.account_number;
    if (form.routing_number) base.routing_number = form.routing_number.replace(/\s/g, "");
  }
  return base;
}

export default function AccountFinancialsPage() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState<"add" | "edit" | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<PaymentFormState>(emptyForm);
  const [saveStatus, setSaveStatus] = useState<"idle" | "loading" | "error">("idle");

  const getAuthHeaders = useCallback((): HeadersInit => {
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    } as HeadersInit;
  }, []);

  const fetchPaymentMethods = useCallback(() => {
    setError(null);
    setLoading(true);
    fetch(`${API_BASE}/api/profile/payment-methods/`, { headers: getAuthHeaders() })
      .then((res) => {
        if (!res.ok) throw new Error(res.status === 401 ? "Please sign in." : `Failed to load (${res.status})`);
        return res.json();
      })
      .then((data: PaymentMethod[]) => {
        setPaymentMethods(data);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [getAuthHeaders]);

  useEffect(() => {
    fetchPaymentMethods();
  }, [fetchPaymentMethods]);

  const openAdd = () => {
    setEditingId(null);
    setForm({ ...emptyForm, is_default: paymentMethods.length === 0 });
    setDrawerOpen("add");
    setSaveStatus("idle");
  };

  const openEdit = (pm: PaymentMethod) => {
    setEditingId(pm.id);
    setForm(paymentToForm(pm));
    setDrawerOpen("edit");
    setSaveStatus("idle");
  };

  const validateForm = (): string | null => {
    if (form.method_type === "card") {
      if (!form.cardholder_name?.trim()) return "Cardholder name is required.";
      if (drawerOpen === "add") {
        const cardNumber = form.card_number.replace(/\s/g, "");
        if (cardNumber.length !== 16 || !/^\d+$/.test(cardNumber)) return "Card number must be 16 digits.";
        const expMonth = parseInt(form.exp_month, 10);
        const expYear = parseInt(form.exp_year, 10);
        if (isNaN(expMonth) || expMonth < 1 || expMonth > 12) return "Expiry month must be 1–12.";
        if (isNaN(expYear) || expYear < new Date().getFullYear()) return "Expiry year must be current or future.";
      }
    } else {
      if (!form.bank_name?.trim()) return "Bank name is required.";
      if (drawerOpen === "add") {
        if (!form.account_number?.trim()) return "Account number is required.";
        const routing = form.routing_number.replace(/\s/g, "");
        if (routing.length !== 9 || !/^\d+$/.test(routing)) return "Routing number must be 9 digits.";
      }
    }
    return null;
  };

  const handleSave = () => {
    const err = validateForm();
    if (err) {
      setError(err);
      setSaveStatus("error");
      toast.error(err);
      return;
    }
    setError(null);
    setSaveStatus("loading");
    const payload = formToPayload(form);
    const headers = getAuthHeaders();

    if (drawerOpen === "add") {
      fetch(`${API_BASE}/api/profile/payment-methods/`, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      })
        .then((res) => {
          if (!res.ok) return res.json().then((d: { error?: string }) => { throw new Error(d.error || `Failed (${res.status})`); });
          return res.json();
        })
        .then((created: PaymentMethod) => {
          setPaymentMethods((prev) => [created, ...prev.filter((p) => p.id !== created.id)].sort((a, b) => (a.is_default === b.is_default ? 0 : a.is_default ? -1 : 1)));
          setDrawerOpen(null);
          toast.success("Payment method added");
        })
        .catch((err: Error) => {
          setError(err.message);
          setSaveStatus("error");
          toast.error(err.message || "Failed to add payment method");
        });
    } else if (editingId != null) {
      fetch(`${API_BASE}/api/profile/payment-methods/${editingId}/`, {
        method: "PATCH",
        headers,
        body: JSON.stringify(payload),
      })
        .then((res) => {
          if (!res.ok) return res.json().then((d: { error?: string }) => { throw new Error(d.error || `Failed (${res.status})`); });
          return res.json();
        })
        .then((updated: PaymentMethod) => {
          setPaymentMethods((prev) =>
            prev.map((p) => (p.id === updated.id ? updated : p)).sort((a, b) => (a.is_default === b.is_default ? 0 : a.is_default ? -1 : 1))
          );
          setDrawerOpen(null);
          toast.success("Payment method updated");
        })
        .catch((err: Error) => {
          setError(err.message);
          setSaveStatus("error");
          toast.error(err.message || "Failed to update payment method");
        });
    }
  };

  const handleSetDefault = (id: number, isDefault: boolean) => {
    const headers = getAuthHeaders();
    fetch(`${API_BASE}/api/profile/payment-methods/${id}/`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ is_default: isDefault }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update default");
        return res.json();
      })
      .then((updated: PaymentMethod) => {
        setPaymentMethods((prev) =>
          prev.map((p) => (p.id === updated.id ? updated : { ...p, is_default: false })).sort((a, b) => (a.is_default === b.is_default ? 0 : a.is_default ? -1 : 1))
        );
        toast.success(isDefault ? "Set as default payment method" : "Default payment method cleared");
      })
      .catch((err: Error) => {
        setError(err.message);
        toast.error(err.message || "Failed to update default");
      });
  };

  const handleDelete = (id: number) => {
    if (typeof window !== "undefined" && !window.confirm("Remove this payment method?")) return;
    const headers = getAuthHeaders();
    fetch(`${API_BASE}/api/profile/payment-methods/${id}/`, { method: "DELETE", headers })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete");
        setPaymentMethods((prev) => prev.filter((p) => p.id !== id));
        if (editingId === id) setDrawerOpen(null);
        toast.success("Payment method removed");
      })
      .catch((err: Error) => {
        setError(err.message);
        toast.error(err.message || "Failed to remove payment method");
      });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="app-page-title">Financials</h1>
        <p className="text-muted-foreground mt-1">Payment methods and billing for your account.</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment methods
            </CardTitle>
            <CardDescription>Manage cards and bank accounts for billing. Add or edit in the drawer.</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => fetchPaymentMethods()} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button size="sm" onClick={openAdd}>
              <Plus className="h-4 w-4 mr-2" />
              Add payment method
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="flex items-center gap-2 text-sm text-destructive mb-4">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}
          {loading ? (
            <p className="text-sm text-muted-foreground py-8">Loading payment methods…</p>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Label</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Default</TableHead>
                    <TableHead className="w-[140px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentMethods.map((pm) => (
                    <TableRow key={pm.id}>
                      <TableCell>
                        <Badge variant={pm.method_type === "card" ? "default" : "secondary"}>
                          {pm.method_type === "card" ? (
                            <><CreditCard className="h-3 w-3 mr-1" /> Card</>
                          ) : (
                            <><Banknote className="h-3 w-3 mr-1" /> ACH</>
                          )}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{pm.nickname || "—"}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {pm.method_type === "card"
                          ? `${pm.brand || "Card"} •••• ${pm.last4 || "XXXX"}`
                          : `${pm.bank_name || "Bank"} •••• ${pm.last4 || "XXXX"}`}
                        {pm.exp_month != null && pm.exp_year != null && pm.method_type === "card" && (
                          <span className="ml-2">Exp {String(pm.exp_month).padStart(2, "0")}/{pm.exp_year}</span>
                        )}
                      </TableCell>
                      <TableCell>{pm.is_default ? <Badge variant="outline">Default</Badge> : "—"}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Switch
                            checked={pm.is_default}
                            onCheckedChange={(checked) => handleSetDefault(pm.id, checked)}
                          />
                          <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Edit" onClick={() => openEdit(pm)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" aria-label="Delete" onClick={() => handleDelete(pm.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {paymentMethods.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                        No payment methods yet. Add one to use for billing.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Drawer: Add / Edit payment method */}
      {drawerOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <>
            <div className="fixed inset-0 bg-black/20 z-40" aria-hidden onClick={() => setDrawerOpen(null)} />
            <aside
              className={`fixed right-0 w-full ${DRAWER_WIDTH_HALF} bg-background border-l shadow-xl z-50 flex flex-col`}
              style={{ top: 0, height: "100vh" }}
              aria-label={drawerOpen === "add" ? "Add payment method" : "Edit payment method"}
            >
              <div className="flex h-16 shrink-0 items-center justify-between px-4 border-b">
                <h2 className="text-lg font-semibold">{drawerOpen === "add" ? "Add payment method" : "Edit payment method"}</h2>
                <button type="button" className="p-2 rounded-md hover:bg-muted" onClick={() => setDrawerOpen(null)} aria-label="Close">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-6">
                  <section className="rounded-lg border bg-muted/30 p-4">
                    <h4 className="mb-3 text-sm font-semibold text-muted-foreground">Method type</h4>
                    <Select
                      value={form.method_type}
                      onValueChange={(v: PaymentFormType) => setForm((f) => ({ ...f, method_type: v }))}
                      disabled={drawerOpen === "edit"}
                    >
                      <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="card">Credit / Debit Card</SelectItem>
                        <SelectItem value="ach">Bank transfer (ACH)</SelectItem>
                      </SelectContent>
                    </Select>
                    {drawerOpen === "edit" && <p className="text-xs text-muted-foreground mt-1">Type cannot be changed when editing.</p>}
                  </section>

                  <section className="rounded-lg border bg-muted/30 p-4">
                    <h4 className="mb-3 text-sm font-semibold text-muted-foreground">Label & default</h4>
                    <div className="space-y-3">
                      <div className="space-y-1.5">
                        <Label htmlFor="pm_nickname">Label</Label>
                        <Input id="pm_nickname" className="h-9" placeholder="e.g. Corporate Visa" value={form.nickname} onChange={(e) => setForm((f) => ({ ...f, nickname: e.target.value }))} />
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch id="pm_default" checked={form.is_default} onCheckedChange={(c) => setForm((f) => ({ ...f, is_default: !!c }))} />
                        <Label htmlFor="pm_default" className="cursor-pointer">Set as default</Label>
                      </div>
                    </div>
                  </section>

                  {form.method_type === "card" ? (
                    <section className="rounded-lg border bg-muted/30 p-4">
                      <h4 className="mb-3 text-sm font-semibold text-muted-foreground">Card details</h4>
                      <div className="space-y-3">
                        <div className="space-y-1.5">
                          <Label htmlFor="cardholder">Cardholder name *</Label>
                          <Input id="cardholder" className="h-9" value={form.cardholder_name} onChange={(e) => setForm((f) => ({ ...f, cardholder_name: e.target.value }))} placeholder="John Doe" />
                        </div>
                        {drawerOpen === "add" && (
                          <>
                            <div className="space-y-1.5">
                              <Label htmlFor="card_number">Card number (16 digits) *</Label>
                              <Input
                                id="card_number"
                                className="h-9 font-mono"
                                value={form.card_number.replace(/(\d{4})/g, "$1 ").trim()}
                                onChange={(e) => setForm((f) => ({ ...f, card_number: e.target.value.replace(/\s/g, "").replace(/[^0-9]/g, "").slice(0, 16) }))}
                                placeholder="1234 5678 9012 3456"
                                maxLength={19}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="space-y-1.5">
                                <Label htmlFor="exp_month">Expiry month *</Label>
                                <Input id="exp_month" className="h-9" placeholder="MM" maxLength={2} value={form.exp_month} onChange={(e) => setForm((f) => ({ ...f, exp_month: e.target.value.replace(/[^0-9]/g, "").slice(0, 2) }))} />
                              </div>
                              <div className="space-y-1.5">
                                <Label htmlFor="exp_year">Expiry year *</Label>
                                <Input id="exp_year" className="h-9" placeholder="YYYY" maxLength={4} value={form.exp_year} onChange={(e) => setForm((f) => ({ ...f, exp_year: e.target.value.replace(/[^0-9]/g, "").slice(0, 4) }))} />
                              </div>
                            </div>
                          </>
                        )}
                        {drawerOpen === "edit" && (
                          <p className="text-xs text-muted-foreground">Card number and expiry cannot be changed. Update billing address below if needed.</p>
                        )}
                        <div className="space-y-1.5">
                          <Label htmlFor="brand">Card brand</Label>
                          <Input id="brand" className="h-9" value={form.brand} onChange={(e) => setForm((f) => ({ ...f, brand: e.target.value }))} placeholder="Visa, Mastercard" />
                        </div>
                        <div className="border-t pt-3 mt-3">
                          <h5 className="text-xs font-medium text-muted-foreground mb-2">Billing address (optional)</h5>
                          <div className="grid grid-cols-2 gap-2">
                            <Input className="h-9" placeholder="Line 1" value={form.billing_address_line1} onChange={(e) => setForm((f) => ({ ...f, billing_address_line1: e.target.value }))} />
                            <Input className="h-9" placeholder="Line 2" value={form.billing_address_line2} onChange={(e) => setForm((f) => ({ ...f, billing_address_line2: e.target.value }))} />
                            <Input className="h-9" placeholder="City" value={form.billing_city} onChange={(e) => setForm((f) => ({ ...f, billing_city: e.target.value }))} />
                            <Input className="h-9" placeholder="State" value={form.billing_state} onChange={(e) => setForm((f) => ({ ...f, billing_state: e.target.value }))} />
                            <Input className="h-9" placeholder="Postal code" value={form.billing_postal_code} onChange={(e) => setForm((f) => ({ ...f, billing_postal_code: e.target.value }))} />
                            <Input className="h-9" placeholder="Country" value={form.billing_country} onChange={(e) => setForm((f) => ({ ...f, billing_country: e.target.value }))} />
                          </div>
                        </div>
                      </div>
                    </section>
                  ) : (
                    <section className="rounded-lg border bg-muted/30 p-4">
                      <h4 className="mb-3 text-sm font-semibold text-muted-foreground">Bank details</h4>
                      <div className="space-y-3">
                        <div className="space-y-1.5">
                          <Label htmlFor="bank_name">Bank name *</Label>
                          <Input id="bank_name" className="h-9" value={form.bank_name} onChange={(e) => setForm((f) => ({ ...f, bank_name: e.target.value }))} placeholder="Chase Bank" />
                        </div>
                        <div className="space-y-1.5">
                          <Label>Account type</Label>
                          <Select value={form.account_type} onValueChange={(v) => setForm((f) => ({ ...f, account_type: v }))}>
                            <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="checking">Checking</SelectItem>
                              <SelectItem value="savings">Savings</SelectItem>
                              <SelectItem value="business">Business</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        {drawerOpen === "add" && (
                          <>
                            <div className="space-y-1.5">
                              <Label htmlFor="routing">Routing number (9 digits) *</Label>
                              <Input id="routing" className="h-9" placeholder="123456789" maxLength={9} value={form.routing_number} onChange={(e) => setForm((f) => ({ ...f, routing_number: e.target.value.replace(/\D/g, "").slice(0, 9) }))} />
                            </div>
                            <div className="space-y-1.5">
                              <Label htmlFor="account_number">Account number *</Label>
                              <Input id="account_number" type="password" className="h-9" value={form.account_number} onChange={(e) => setForm((f) => ({ ...f, account_number: e.target.value }))} placeholder="Full account number" />
                            </div>
                          </>
                        )}
                        {drawerOpen === "edit" && <p className="text-xs text-muted-foreground">Account and routing numbers cannot be changed for security.</p>}
                        <div className="border-t pt-3 mt-3">
                          <h5 className="text-xs font-medium text-muted-foreground mb-2">Bank address (optional)</h5>
                          <div className="grid grid-cols-2 gap-2">
                            <Input className="h-9" placeholder="Line 1" value={form.bank_address_line1} onChange={(e) => setForm((f) => ({ ...f, bank_address_line1: e.target.value }))} />
                            <Input className="h-9" placeholder="City" value={form.bank_city} onChange={(e) => setForm((f) => ({ ...f, bank_city: e.target.value }))} />
                            <Input className="h-9" placeholder="State" value={form.bank_state} onChange={(e) => setForm((f) => ({ ...f, bank_state: e.target.value }))} />
                            <Input className="h-9" placeholder="Postal code" value={form.bank_postal_code} onChange={(e) => setForm((f) => ({ ...f, bank_postal_code: e.target.value }))} />
                            <Input className="h-9" placeholder="Country" value={form.bank_country} onChange={(e) => setForm((f) => ({ ...f, bank_country: e.target.value }))} />
                          </div>
                        </div>
                      </div>
                    </section>
                  )}
                </div>
              </div>
              <div className="shrink-0 border-t p-4 flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setDrawerOpen(null)}>Cancel</Button>
                <Button size="sm" onClick={handleSave} disabled={saveStatus === "loading"}>
                  {saveStatus === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  <span className="ml-2">{drawerOpen === "add" ? "Add" : "Save"}</span>
                </Button>
              </div>
            </aside>
          </>,
          document.body
        )}
    </div>
  );
}
