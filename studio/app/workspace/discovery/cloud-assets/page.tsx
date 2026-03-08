"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Cloud, RefreshCw, Plus } from "lucide-react";

const MOCK_ACCOUNTS = [
  { id: "1", name: "Production AWS", provider: "AWS", environment: "Production", last_sync: "2024-01-15 12:00", status: "synced", resources: 142 },
  { id: "2", name: "Staging Azure", provider: "Azure", environment: "Staging", last_sync: "2024-01-15 11:30", status: "synced", resources: 38 },
  { id: "3", name: "Dev GCP", provider: "GCP", environment: "Development", last_sync: "2024-01-14 18:00", status: "stale", resources: 21 },
];

const STATUS_COLOR: Record<string, string> = {
  synced: "bg-green-100 text-green-800",
  stale: "bg-amber-100 text-amber-800",
  error: "bg-red-100 text-red-800",
};

export default function DiscoveryCloudAssetsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="app-page-title">Cloud Assets</h1>
          <p className="text-muted-foreground mt-1">
            Ingest and normalize assets from AWS, Azure, GCP so cloud footprints are complete.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync all
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add account
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="h-5 w-5" />
            Cloud accounts
          </CardTitle>
          <p className="text-sm text-slate-500 font-normal">
            Account/project/subscription inventory, sync status, resource counts. Connect API for live data.
          </p>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="text-left p-3 font-medium">Account</th>
                  <th className="text-left p-3 font-medium">Provider</th>
                  <th className="text-left p-3 font-medium">Environment</th>
                  <th className="text-left p-3 font-medium">Last sync</th>
                  <th className="text-left p-3 font-medium">Status</th>
                  <th className="text-left p-3 font-medium">Resources</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_ACCOUNTS.map((row) => (
                  <tr key={row.id} className="border-b last:border-0 hover:bg-slate-50">
                    <td className="p-3 font-medium">{row.name}</td>
                    <td className="p-3">{row.provider}</td>
                    <td className="p-3">{row.environment}</td>
                    <td className="p-3 text-slate-600">{row.last_sync}</td>
                    <td className="p-3">
                      <Badge className={STATUS_COLOR[row.status] ?? "bg-slate-100"}>{row.status}</Badge>
                    </td>
                    <td className="p-3">{row.resources}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-4">Mock data. Connect API for real cloud accounts and sync.</p>
        </CardContent>
      </Card>
    </div>
  );
}
