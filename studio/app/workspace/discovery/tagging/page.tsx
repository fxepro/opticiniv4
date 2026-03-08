"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tags, Plus } from "lucide-react";

const MOCK_TAGS = [
  { key: "environment", values: ["Production", "Staging", "Development"], usage: 45 },
  { key: "cost_center", values: ["CC-100", "CC-200"], usage: 38 },
  { key: "compliance_scope", values: ["PCI", "SOC2"], usage: 12 },
  { key: "risk_tier", values: ["critical", "high", "medium", "low"], usage: 45 },
];

export default function DiscoveryTaggingPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="app-page-title">Tagging & Classification</h1>
          <p className="text-muted-foreground mt-1">
            Key-value and controlled vocabularies for environment, BU, cost center, compliance scope.
          </p>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add tag key
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tags className="h-5 w-5" />
            Tag taxonomy
          </CardTitle>
          <p className="text-sm text-slate-500 font-normal">
            Tag keys, allowed values, and asset usage. Bulk updates and rules when API is connected.
          </p>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="text-left p-3 font-medium">Key</th>
                  <th className="text-left p-3 font-medium">Values</th>
                  <th className="text-left p-3 font-medium">Assets using</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_TAGS.map((row, i) => (
                  <tr key={i} className="border-b last:border-0 hover:bg-slate-50">
                    <td className="p-3 font-medium font-mono">{row.key}</td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-1">
                        {row.values.map((v) => (
                          <Badge key={v} variant="secondary" className="text-xs">{v}</Badge>
                        ))}
                      </div>
                    </td>
                    <td className="p-3">{row.usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-4">Mock data. Connect API for real taxonomy and missing-tag reports.</p>
        </CardContent>
      </Card>
    </div>
  );
}
