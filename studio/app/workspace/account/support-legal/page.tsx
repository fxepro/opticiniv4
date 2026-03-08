"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

export default function AccountSupportLegalPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="app-page-title">Support & Legal</h1>
        <p className="text-muted-foreground mt-1">
          Support resources and legal information.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Support & Legal
          </CardTitle>
          <CardDescription>
            Help documentation, contact support, terms of service, and privacy policy.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-600">
            Coming soon: support links, legal documents, and compliance information.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
