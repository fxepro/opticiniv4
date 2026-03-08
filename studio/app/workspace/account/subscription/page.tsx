"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Repeat, Loader2, Trash2, DollarSign, CalendarRange, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? (typeof window !== "undefined" ? "" : "http://localhost:8000");

interface Subscription {
  id: number;
  plan_name: string;
  role: string;
  price_monthly?: number | string;
  price_yearly?: number | string;
  billing_period?: "monthly" | "annual";
  discount_code?: string;
  start_date: string;
  end_date: string | null;
  is_recurring: boolean;
  status: string;
  notes: string;
  created_at: string;
}

const planPricing: Record<string, { monthly: number; yearly: number }> = {
  Trial: { monthly: 0, yearly: 0 },
  Viewer: { monthly: 9.99, yearly: 99.99 },
  Auditor: { monthly: 29.99, yearly: 299.99 },
  Analyst: { monthly: 109.99, yearly: 1099.99 },
  Manager: { monthly: 249.99, yearly: 2499.99 },
  Director: { monthly: 499.99, yearly: 4999.99 },
};

const defaultNewSubscription = {
  plan_name: "Trial",
  role: "viewer",
  price_monthly: "0",
  price_yearly: "0",
  billing_period: "monthly" as "monthly" | "annual",
  discount_code: "",
  start_date: new Date().toISOString().slice(0, 10),
  end_date: "",
  is_recurring: true,
  notes: "",
};

export default function AccountSubscriptionPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [newSubscription, setNewSubscription] = useState(defaultNewSubscription);
  const [loading, setLoading] = useState(true);
  const [addingSubscription, setAddingSubscription] = useState(false);
  const [subscriptionError, setSubscriptionError] = useState<string | null>(null);

  const authHeaders = () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    if (!token) return null;
    return { Authorization: `Bearer ${token}` } as HeadersInit;
  };

  const fetchSubscriptions = async (headers: HeadersInit) => {
    setSubscriptionError(null);
    try {
      const response = await fetch(`${API_BASE}/api/profile/subscriptions/`, { headers });
      if (!response.ok) throw new Error(`Failed to load subscriptions (${response.status})`);
      const data = await response.json();
      setSubscriptions(data);
    } catch (err: unknown) {
      setSubscriptionError(err instanceof Error ? err.message : "Unable to load subscriptions");
    }
  };

  useEffect(() => {
    const headers = authHeaders();
    if (!headers) {
      setLoading(false);
      return;
    }
    fetchSubscriptions(headers).finally(() => setLoading(false));
  }, []);

  async function handleAddSubscription() {
    setSubscriptionError(null);
    if (!newSubscription.plan_name) {
      setSubscriptionError("Plan name is required");
      return;
    }
    if (
      newSubscription.price_monthly &&
      (isNaN(parseFloat(newSubscription.price_monthly as string)) || parseFloat(newSubscription.price_monthly as string) < 0)
    ) {
      setSubscriptionError("Price/month must be a valid positive number");
      return;
    }
    if (
      newSubscription.price_yearly &&
      (isNaN(parseFloat(newSubscription.price_yearly as string)) || parseFloat(newSubscription.price_yearly as string) < 0)
    ) {
      setSubscriptionError("Price/year must be a valid positive number");
      return;
    }

    setAddingSubscription(true);
    try {
      const headers = authHeaders();
      if (!headers) {
        setSubscriptionError("Not authenticated.");
        setAddingSubscription(false);
        return;
      }
      const response = await fetch(`${API_BASE}/api/profile/subscriptions/`, {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify(newSubscription),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to create subscription (${response.status})`);
      }
      const created = await response.json();
      setSubscriptions((prev) => [created, ...prev]);
      toast.success("Subscription added");
      setNewSubscription(defaultNewSubscription);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to add subscription";
      setSubscriptionError(message);
      toast.error(message);
    } finally {
      setAddingSubscription(false);
    }
  }

  async function handleCancelSubscription(id: number) {
    try {
      const headers = authHeaders();
      if (!headers) return;
      const response = await fetch(`${API_BASE}/api/profile/subscriptions/${id}/`, { method: "DELETE", headers });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to cancel (${response.status})`);
      }
      toast.success("Subscription cancelled");
      fetchSubscriptions(headers);
    } catch (err: unknown) {
      setSubscriptionError(err instanceof Error ? err.message : "Failed to cancel subscription");
    }
  }

  async function handleToggleSubscriptionRecurring(id: number, isRecurring: boolean) {
    try {
      const headers = authHeaders();
      if (!headers) return;
      const response = await fetch(`${API_BASE}/api/profile/subscriptions/${id}/`, {
        method: "PATCH",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({ is_recurring: isRecurring }),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to update (${response.status})`);
      }
      const updated = await response.json();
      setSubscriptions((prev) => prev.map((sub) => (sub.id === updated.id ? updated : sub)));
      toast.success("Subscription updated");
    } catch (err: unknown) {
      setSubscriptionError(err instanceof Error ? err.message : "Failed to update subscription");
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-palette-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="app-page-title">Subscription</h1>
        <p className="text-muted-foreground mt-1">Manage subscription plans and billing cycle for your account.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Repeat className="h-5 w-5 text-palette-primary" />
                Subscriptions & Access
              </CardTitle>
              <CardDescription>Manage auditor, analyst and other access plans</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {subscriptionError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <span className="text-red-800 text-sm">{subscriptionError}</span>
            </div>
          )}

          <div className="border border-dashed border-slate-200 rounded-lg p-4 bg-slate-50/60">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="plan_name">Plan *</Label>
                <Select
                  value={newSubscription.plan_name}
                  onValueChange={(value) => {
                    const roleMap: Record<string, string> = {
                      Trial: "viewer",
                      Viewer: "viewer",
                      Auditor: "analyst",
                      Analyst: "analyst",
                      Manager: "manager",
                      Director: "director",
                    };
                    const pricing = planPricing[value] || { monthly: 0, yearly: 0 };
                    setNewSubscription((prev) => ({
                      ...prev,
                      plan_name: value,
                      role: roleMap[value] || "viewer",
                      price_monthly: pricing.monthly.toString(),
                      price_yearly: pricing.yearly.toString(),
                    }));
                  }}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Trial">Trial</SelectItem>
                    <SelectItem value="Viewer">Viewer</SelectItem>
                    <SelectItem value="Auditor">Auditor</SelectItem>
                    <SelectItem value="Analyst">Analyst</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Director">Director</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="billing_period">Billing Period</Label>
                <Select
                  value={newSubscription.billing_period}
                  onValueChange={(value: "monthly" | "annual") =>
                    setNewSubscription((prev) => ({ ...prev, billing_period: value }))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="annual">Annual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="price_monthly">Price/Month ($)</Label>
                <Input
                  id="price_monthly"
                  type="number"
                  step="0.01"
                  min="0"
                  value={newSubscription.price_monthly}
                  readOnly
                  disabled
                  className="mt-1 bg-slate-100 cursor-not-allowed"
                  placeholder="0.00"
                />
                <p className="text-xs text-slate-500 mt-1">Set by plan selection</p>
              </div>
              <div>
                <Label htmlFor="price_yearly">Price/Year ($)</Label>
                <Input
                  id="price_yearly"
                  type="number"
                  step="0.01"
                  min="0"
                  value={newSubscription.price_yearly}
                  readOnly
                  disabled
                  className="mt-1 bg-slate-100 cursor-not-allowed"
                  placeholder="0.00"
                />
                <p className="text-xs text-slate-500 mt-1">Set by plan selection</p>
              </div>
              <div>
                <Label htmlFor="discount_code">Discount Code</Label>
                <Input
                  id="discount_code"
                  type="text"
                  value={newSubscription.discount_code}
                  onChange={(e) =>
                    setNewSubscription((prev) => ({ ...prev, discount_code: e.target.value.toUpperCase() }))
                  }
                  className="mt-1"
                  placeholder="Enter discount code"
                  maxLength={20}
                />
                <p className="text-xs text-slate-500 mt-1">Optional promotional code</p>
              </div>
              <div>
                <Label htmlFor="start_date">Start Date</Label>
                <Input
                  id="start_date"
                  type="date"
                  value={newSubscription.start_date}
                  readOnly
                  disabled
                  className="mt-1 bg-slate-100 cursor-not-allowed"
                />
                <p className="text-xs text-slate-500 mt-1">Auto-set to today</p>
              </div>
              <div>
                <Label htmlFor="end_date">End Date</Label>
                <Input
                  id="end_date"
                  type="date"
                  value={newSubscription.end_date || ""}
                  readOnly
                  disabled
                  className="mt-1 bg-slate-100 cursor-not-allowed"
                />
                <p className="text-xs text-slate-500 mt-1">Calculated automatically</p>
              </div>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={newSubscription.notes}
                  onChange={(e) => setNewSubscription((prev) => ({ ...prev, notes: e.target.value }))}
                  className="mt-1"
                  placeholder="Optional description or reference"
                  rows={3}
                />
              </div>
              <div className="flex items-center gap-3">
                <Switch
                  id="is_recurring"
                  checked={newSubscription.is_recurring}
                  onCheckedChange={(checked) => setNewSubscription((prev) => ({ ...prev, is_recurring: checked }))}
                />
                <div>
                  <Label htmlFor="is_recurring" className="cursor-pointer">Recurring billing</Label>
                  <p className="text-xs text-slate-500">Auto-renew until cancelled</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-4 border-t">
              <Button
                onClick={handleAddSubscription}
                disabled={addingSubscription}
                className="bg-palette-primary hover:bg-palette-primary-hover"
              >
                {addingSubscription ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Repeat className="h-4 w-4 mr-2" />
                    Add Subscription
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                disabled={addingSubscription}
                onClick={() => setNewSubscription(defaultNewSubscription)}
              >
                Clear
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {subscriptions.length === 0 ? (
              <div className="text-sm text-slate-600 bg-slate-50 border border-slate-200 rounded-lg p-6 text-center">
                No subscriptions yet.
              </div>
            ) : (
              subscriptions.map((sub) => (
                <div key={sub.id} className="border border-slate-200 rounded-lg p-4 bg-white shadow-sm">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <p className="font-semibold text-slate-900">
                        {sub.plan_name}
                        <span className="ml-2 text-sm text-slate-500">Role: {sub.role}</span>
                        {sub.billing_period && (
                          <span className="ml-2 text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded capitalize">
                            {sub.billing_period}
                          </span>
                        )}
                      </p>
                      <div className="text-xs text-slate-500 flex flex-wrap gap-3 mt-2">
                        {(sub.price_monthly || sub.price_yearly) && (
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3" />
                            {sub.price_monthly && `$${sub.price_monthly}/mo`}
                            {sub.price_monthly && sub.price_yearly && " • "}
                            {sub.price_yearly && `$${sub.price_yearly}/yr`}
                          </span>
                        )}
                        {sub.discount_code && (
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium">
                            Code: {sub.discount_code}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <CalendarRange className="h-3 w-3" />
                          {sub.start_date} {sub.end_date ? `→ ${sub.end_date}` : ""}
                        </span>
                        <span className="capitalize">Status: {sub.status}</span>
                        <span>Recurring: {sub.is_recurring ? "Yes" : "No"}</span>
                      </div>
                      {sub.notes && <p className="text-xs text-slate-500 mt-2">Notes: {sub.notes}</p>}
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={sub.is_recurring}
                        onCheckedChange={(checked) => handleToggleSubscriptionRecurring(sub.id, checked)}
                      />
                      <span className="text-xs text-slate-500">Auto-renew</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleCancelSubscription(sub.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
