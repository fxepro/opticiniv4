"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plug, Plus, Settings } from "lucide-react";

const MOCK_CONNECTORS = [
  { id: "1", name: "AWS", type: "Cloud", status: "healthy", last_sync: "2024-01-15 12:00" },
  { id: "2", name: "Azure", type: "Cloud", status: "healthy", last_sync: "2024-01-15 11:30" },
  { id: "3", name: "ServiceNow CMDB", type: "CMDB", status: "configured", last_sync: "—" },
  { id: "4", name: "GitHub", type: "CI/CD", status: "disabled", last_sync: "—" },
];

const STATUS_COLOR: Record<string, string> = {
  healthy: "bg-green-100 text-green-800",
  configured: "bg-slate-100 text-slate-800",
  disabled: "bg-slate-100 text-slate-600",
  error: "bg-red-100 text-red-800",
};

export default function DiscoveryIntegrationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="app-page-title">Integrations</h1>
          <p className="text-muted-foreground mt-1">
            Configure and monitor discovery connectors: CMDB, CI/CD, IdP, cloud, monitoring.
          </p>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add connector
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plug className="h-5 w-5" />
            Connector catalog
          </CardTitle>
          <p className="text-sm text-slate-500 font-normal">
            Connector type, health status, last sync. Setup wizard and reconciliation when API is connected.
          </p>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="text-left p-3 font-medium">Name</th>
                  <th className="text-left p-3 font-medium">Type</th>
                  <th className="text-left p-3 font-medium">Status</th>
                  <th className="text-left p-3 font-medium">Last sync</th>
                  <th className="text-left p-3 font-medium w-24">Actions</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_CONNECTORS.map((row) => (
                  <tr key={row.id} className="border-b last:border-0 hover:bg-slate-50">
                    <td className="p-3 font-medium">{row.name}</td>
                    <td className="p-3">{row.type}</td>
                    <td className="p-3">
                      <Badge className={STATUS_COLOR[row.status] ?? "bg-slate-100"}>{row.status}</Badge>
                    </td>
                    <td className="p-3 text-slate-600">{row.last_sync}</td>
                    <td className="p-3">
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-4">Mock data. Connect API for real connector health and setup.</p>
        </CardContent>
      </Card>
    </div>
  );
}
