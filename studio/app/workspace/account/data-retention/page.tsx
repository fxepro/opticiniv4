"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Database } from "lucide-react";

export default function AccountDataRetentionPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="app-page-title">Data & Retention</h1>
        <p className="text-muted-foreground mt-1">
          Data management policies, storage, and retention settings.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Data & Retention
          </CardTitle>
          <CardDescription>
            Configure data retention periods and storage policies. This section can be expanded with org-level retention rules and backups.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-600">
            Coming soon: retention policies, backup settings, and data export options.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
