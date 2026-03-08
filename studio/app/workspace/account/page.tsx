"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  Building2,
  Users,
  CreditCard,
  Receipt,
  FileText,
  Database,
  ShieldCheck,
  Plug,
  Bell,
  HelpCircle,
  ChevronRight,
  BookOpen,
} from "lucide-react";

const accountSections = [
  {
    title: "Organization",
    description: "Organization settings and information.",
    href: "/workspace/account/organization",
    icon: Building2,
  },
  {
    title: "Users & Access",
    description: "Manage users, roles, permissions, and access controls.",
    href: "/workspace/account/users-access",
    icon: Users,
  },
  {
    title: "Financials",
    description: "Payment providers, plans, and financial management.",
    href: "/workspace/account/financials",
    icon: CreditCard,
  },
  {
    title: "Subscription",
    description: "Manage subscription plans and billing cycle.",
    href: "/workspace/account/subscription",
    icon: Receipt,
  },
  {
    title: "Billing History",
    description: "View past billing statements and transaction history.",
    href: "/workspace/account/billing-history",
    icon: FileText,
  },
  {
    title: "Data & Retention",
    description: "Data management policies, storage, and retention.",
    href: "/workspace/account/data-retention",
    icon: Database,
  },
  {
    title: "Frameworks",
    description: "Enable which compliance frameworks your organization uses.",
    href: "/workspace/account/frameworks",
    icon: BookOpen,
  },
  {
    title: "Audit & Compliance",
    description: "Auditing activities and compliance management.",
    href: "/workspace/account/audit-compliance",
    icon: ShieldCheck,
  },
  {
    title: "Integrations & APIs",
    description: "Connections and integrations with other services.",
    href: "/workspace/account/integrations",
    icon: Plug,
  },
  {
    title: "Notifications & Alerts",
    description: "Notification and alert settings.",
    href: "/workspace/account/notifications",
    icon: Bell,
  },
  {
    title: "Support & Legal",
    description: "Support resources and legal information.",
    href: "/workspace/account/support-legal",
    icon: HelpCircle,
  },
];

export default function AccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="app-page-title">Account</h1>
        <p className="text-muted-foreground mt-1">
          Manage your organization, financials, access, and account settings.
        </p>
      </div>

      <Card className="border border-palette-accent-1">
        <CardContent className="p-0">
          <nav className="divide-y divide-slate-200/80">
            {accountSections.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href + item.title}
                  href={item.href}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50/80 transition-colors"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-palette-accent-2/40">
                    <Icon className="h-5 w-5 text-palette-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-slate-900">{item.title}</p>
                    <p className="text-sm text-slate-600 truncate">{item.description}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 shrink-0 text-slate-400" />
                </Link>
              );
            })}
          </nav>
        </CardContent>
      </Card>
    </div>
  );
}
