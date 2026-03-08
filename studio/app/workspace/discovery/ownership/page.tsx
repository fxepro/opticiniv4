"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, UserCheck } from "lucide-react";

const MOCK_OWNERSHIP = [
  { asset: "web-api-prod-01", technical_owner: "Platform Team", business_owner: "Product" },
  { asset: "db-primary", technical_owner: "Data Team", business_owner: "Data" },
  { asset: "cache-redis-01", technical_owner: "—", business_owner: "—" },
  { asset: "legacy-app-server", technical_owner: "Infra", business_owner: "—" },
  { asset: "lb-frontend", technical_owner: "Platform Team", business_owner: "Product" },
];

export default function DiscoveryOwnershipPage() {
  const withOwner = MOCK_OWNERSHIP.filter((r) => r.technical_owner !== "—").length;
  const total = MOCK_OWNERSHIP.length;
  const coverage = total ? Math.round((withOwner / total) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="app-page-title">Ownership & Accountability</h1>
          <p className="text-muted-foreground mt-1">
            Technical and business owner per asset; orphan detection and escalation.
          </p>
        </div>
        <Button size="sm">
          <UserCheck className="h-4 w-4 mr-2" />
          Assign owners
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-semibold">{coverage}%</div>
            <p className="text-sm text-muted-foreground">Ownership coverage</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-semibold">{total - withOwner}</div>
            <p className="text-sm text-muted-foreground">Orphaned assets</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-semibold">{withOwner}</div>
            <p className="text-sm text-muted-foreground">With owner</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Asset ownership
          </CardTitle>
          <p className="text-sm text-slate-500 font-normal">
            Technical and business owner per asset. Directory sync when API is connected.
          </p>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="text-left p-3 font-medium">Asset</th>
                  <th className="text-left p-3 font-medium">Technical owner</th>
                  <th className="text-left p-3 font-medium">Business owner</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_OWNERSHIP.map((row, i) => (
                  <tr key={i} className="border-b last:border-0 hover:bg-slate-50">
                    <td className="p-3 font-medium">{row.asset}</td>
                    <td className="p-3">{row.technical_owner}</td>
                    <td className="p-3 text-slate-600">{row.business_owner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-4">Mock data. Connect API for real ownership and orphan reports.</p>
        </CardContent>
      </Card>
    </div>
  );
}
