"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Network } from "lucide-react";

const MOCK_RELATIONSHIPS = [
  { id: "1", source: "lb-frontend", target: "web-api-prod-01", type: "routes_to" },
  { id: "2", source: "web-api-prod-01", target: "db-primary", type: "depends_on" },
  { id: "3", source: "web-api-prod-01", target: "cache-redis-01", type: "connects_to" },
  { id: "4", source: "cache-redis-01", target: "web-api-prod-01", type: "hosts" },
];

export default function DiscoveryDependencyMappingPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="app-page-title">Dependency Mapping</h1>
          <p className="text-muted-foreground mt-1">
            Relationships between assets and services for impact analysis and audit scoping.
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Network className="h-4 w-4 mr-2" />
          View graph
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Relationships
          </CardTitle>
          <p className="text-sm text-slate-500 font-normal">
            Source → target and relationship type. Graph and blast-radius view when API is connected.
          </p>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="text-left p-3 font-medium">Source</th>
                  <th className="text-left p-3 font-medium">Target</th>
                  <th className="text-left p-3 font-medium">Type</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_RELATIONSHIPS.map((row) => (
                  <tr key={row.id} className="border-b last:border-0 hover:bg-slate-50">
                    <td className="p-3 font-medium">{row.source}</td>
                    <td className="p-3">{row.target}</td>
                    <td className="p-3 text-slate-600 font-mono">{row.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-4">Mock data. Connect API for real dependency graph and blast radius.</p>
        </CardContent>
      </Card>
    </div>
  );
}
