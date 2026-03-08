"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";

export default function AccountNotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="app-page-title">Notifications & Alerts</h1>
        <p className="text-muted-foreground mt-1">
          Notification and alert preferences for your account.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications & Alerts
          </CardTitle>
          <CardDescription>
            Configure how and when you receive notifications and alerts for your organization.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-600">
            Coming soon: email, in-app, and webhook notification settings.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
