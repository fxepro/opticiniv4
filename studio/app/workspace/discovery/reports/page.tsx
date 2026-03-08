"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Download, Calendar } from "lucide-react";

const MOCK_REPORTS = [
  { id: "1", name: "Asset inventory summary", type: "Inventory", last_run: "2024-01-15 08:00", format: "PDF, CSV" },
  { id: "2", name: "Ownership coverage", type: "Coverage", last_run: "2024-01-15 07:00", format: "PDF, XLS" },
  { id: "3", name: "Compliance scoping", type: "Compliance", last_run: "2024-01-14 18:00", format: "PDF, JSON" },
  { id: "4", name: "Stale & unclassified", type: "Classification", last_run: "—", format: "CSV" },
];

export default function DiscoveryReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="app-page-title">Reports</h1>
          <p className="text-muted-foreground mt-1">
            Asset summaries, compliance scoping, ownership coverage, stale/classification reports. Export and schedule.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule
          </Button>
          <Button size="sm">
            <Download className="h-4 w-4 mr-2" />
            Run report
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Report catalog
          </CardTitle>
          <p className="text-sm text-slate-500 font-normal">
            Report types, last run, export formats. PDF/CSV/XLS/JSON and scheduling when API is connected.
          </p>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="text-left p-3 font-medium">Report</th>
                  <th className="text-left p-3 font-medium">Type</th>
                  <th className="text-left p-3 font-medium">Last run</th>
                  <th className="text-left p-3 font-medium">Formats</th>
                  <th className="text-left p-3 font-medium w-24">Actions</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_REPORTS.map((row) => (
                  <tr key={row.id} className="border-b last:border-0 hover:bg-slate-50">
                    <td className="p-3 font-medium">{row.name}</td>
                    <td className="p-3">{row.type}</td>
                    <td className="p-3 text-slate-600">{row.last_run}</td>
                    <td className="p-3 text-slate-600">{row.format}</td>
                    <td className="p-3">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-4">Mock data. Connect API for real report generation and scheduling.</p>
        </CardContent>
      </Card>
    </div>
  );
}
