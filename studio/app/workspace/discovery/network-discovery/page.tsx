"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Network, Play, RefreshCw } from "lucide-react";

const MOCK_SCAN_TARGETS = [
  { id: "1", name: "10.0.1.0/24", method: "Agentless", last_scanned: "2024-01-15 14:30", status: "success", hosts_found: 12 },
  { id: "2", name: "10.0.2.0/24", method: "Agent-based", last_scanned: "2024-01-15 13:00", status: "success", hosts_found: 8 },
  { id: "3", name: "VLAN 100", method: "IPAM sync", last_scanned: "2024-01-14 09:00", status: "partial", hosts_found: 24 },
];

const STATUS_COLOR: Record<string, string> = {
  success: "bg-green-100 text-green-800",
  partial: "bg-amber-100 text-amber-800",
  failed: "bg-red-100 text-red-800",
};

export default function DiscoveryNetworkDiscoveryPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="app-page-title">Network Discovery</h1>
          <p className="text-muted-foreground mt-1">
            Discover on-prem and network-layer assets not visible via cloud APIs.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync IPAM
          </Button>
          <Button size="sm">
            <Play className="h-4 w-4 mr-2" />
            New scan
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Network className="h-5 w-5" />
            Scan targets
          </CardTitle>
          <p className="text-sm text-slate-500 font-normal">
            IP ranges, VLANs, agent/agentless methods. Last scanned and host counts. Connect API for live data.
          </p>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="text-left p-3 font-medium">Target</th>
                  <th className="text-left p-3 font-medium">Method</th>
                  <th className="text-left p-3 font-medium">Last scanned</th>
                  <th className="text-left p-3 font-medium">Status</th>
                  <th className="text-left p-3 font-medium">Hosts found</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_SCAN_TARGETS.map((row) => (
                  <tr key={row.id} className="border-b last:border-0 hover:bg-slate-50">
                    <td className="p-3 font-medium">{row.name}</td>
                    <td className="p-3">{row.method}</td>
                    <td className="p-3 text-slate-600">{row.last_scanned}</td>
                    <td className="p-3">
                      <Badge className={STATUS_COLOR[row.status] ?? "bg-slate-100"}>{row.status}</Badge>
                    </td>
                    <td className="p-3">{row.hosts_found}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-4">Mock data. Connect API for real scan targets and results.</p>
        </CardContent>
      </Card>
    </div>
  );
}
