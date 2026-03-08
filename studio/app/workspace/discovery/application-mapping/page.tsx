"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Plus } from "lucide-react";

const MOCK_APPS = [
  { id: "1", name: "Customer Portal", owner: "Product Team", environment: "Production", asset_count: 12 },
  { id: "2", name: "Payment Service", owner: "Platform Team", environment: "Production", asset_count: 8 },
  { id: "3", name: "Reporting API", owner: "Data Team", environment: "Staging", asset_count: 5 },
];

export default function DiscoveryApplicationMappingPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="app-page-title">Application Mapping</h1>
          <p className="text-muted-foreground mt-1">
            Group assets into logical applications/services. Full mapping deferred until all apps are built.
          </p>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add application
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Applications
          </CardTitle>
          <p className="text-sm text-slate-500 font-normal">
            Application list with owner and asset count. Map assets to apps when feature is enabled.
          </p>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="text-left p-3 font-medium">Application</th>
                  <th className="text-left p-3 font-medium">Owner</th>
                  <th className="text-left p-3 font-medium">Environment</th>
                  <th className="text-left p-3 font-medium">Assets</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_APPS.map((row) => (
                  <tr key={row.id} className="border-b last:border-0 hover:bg-slate-50">
                    <td className="p-3 font-medium">{row.name}</td>
                    <td className="p-3">{row.owner}</td>
                    <td className="p-3">{row.environment}</td>
                    <td className="p-3">{row.asset_count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-4">Mock data. Asset-to-application mapping will be added later.</p>
        </CardContent>
      </Card>
    </div>
  );
}
