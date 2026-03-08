"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, AlertCircle } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? (typeof window !== "undefined" ? "" : "http://localhost:8000");

interface BillingTransaction {
  id: number;
  amount: string;
  currency: string;
  description: string;
  invoice_id: string;
  status: string;
  created_at: string;
}

export default function AccountBillingHistoryPage() {
  const [billingHistory, setBillingHistory] = useState<BillingTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [billingError, setBillingError] = useState<string | null>(null);

  const authHeaders = () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    if (!token) return null;
    return { Authorization: `Bearer ${token}` } as HeadersInit;
  };

  const formatCurrency = (amount: string, currency: string) => {
    const value = parseFloat(amount);
    if (isNaN(value)) return `${amount} ${currency}`;
    return new Intl.NumberFormat(undefined, { style: "currency", currency: currency || "USD" }).format(value);
  };

  const formatDateTime = (value: string) => {
    try {
      return new Date(value).toLocaleString();
    } catch {
      return value;
    }
  };

  useEffect(() => {
    const headers = authHeaders();
    if (!headers) {
      setLoading(false);
      return;
    }
    setBillingError(null);
    fetch(`${API_BASE}/api/profile/billing-history/`, { headers })
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load billing history (${res.status})`);
        return res.json();
      })
      .then((data) => {
        const sorted = [...data].sort(
          (a: BillingTransaction, b: BillingTransaction) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setBillingHistory(sorted);
      })
      .catch((err) => setBillingError(err instanceof Error ? err.message : "Unable to load billing history"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <DollarSign className="h-8 w-8 animate-pulse text-palette-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="app-page-title">Billing History</h1>
        <p className="text-muted-foreground mt-1">View past billing statements and transaction history.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-palette-primary" />
                Billing History
              </CardTitle>
              <CardDescription>View all invoices and payment transactions</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {billingError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 mb-4">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <span className="text-red-800 text-sm">{billingError}</span>
            </div>
          )}

          {billingHistory.length === 0 ? (
            <div className="text-sm text-slate-600 bg-slate-50 border border-slate-200 rounded-lg p-6 text-center">
              No billing history recorded yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Amount</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Description</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Invoice ID</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {billingHistory.map((entry) => (
                    <tr
                      key={entry.id}
                      className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                    >
                      <td className="py-3 px-4 text-sm text-slate-600">
                        {formatDateTime(entry.created_at)}
                      </td>
                      <td className="py-3 px-4 text-sm font-medium text-slate-900">
                        {formatCurrency(entry.amount, entry.currency)}
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-600">
                        {entry.description || "—"}
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-600 font-mono">
                        {entry.invoice_id || "—"}
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          className={
                            entry.status === "paid"
                              ? "bg-green-100 text-green-800"
                              : entry.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : entry.status === "failed"
                                  ? "bg-red-100 text-red-800"
                                  : entry.status === "refunded"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-slate-100 text-slate-800"
                          }
                        >
                          {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
