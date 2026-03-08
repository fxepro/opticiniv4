"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

export default function AccountAuditCompliancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="app-page-title">Audit & Compliance</h1>
        <p className="text-muted-foreground mt-1">
          Auditing and compliance overview for your organization.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5" />
            Audit & Compliance
          </CardTitle>
          <CardDescription>
            Account-level audit and compliance summary. Full compliance workflows are in the Compliance app.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-600">
            Coming soon: audit status, compliance summary, and key controls for your organization.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
