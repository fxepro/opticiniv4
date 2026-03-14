"use client";

import Link from "next/link";
import { Check, ArrowRight, Zap, BarChart3, Building2, Building, Rocket, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-hero";
import { PageLayout } from "@/components/page-layout";

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Perfect for early-stage teams beginning their compliance journey",
    description:
      "Starter provides the foundational tools required to understand infrastructure assets and begin organizing compliance processes.",
    includes: [
      "Infrastructure discovery",
      "Asset inventory",
      "Basic security insights",
      "Compliance workspace",
      "Policy and control library",
      "Manual evidence uploads",
      "Dashboard visibility",
      "Single compliance framework",
    ],
    bestFor: ["Startups", "Early compliance preparation", "Small DevOps teams"],
    closing: "Starter helps teams establish a structured approach to compliance while maintaining simplicity.",
    icon: Zap,
    color: "#10b981",
    isHighlighted: false,
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "For organizations actively preparing for compliance audits",
    description:
      "Growth expands the platform with automation and integrations that streamline evidence collection and compliance monitoring.",
    includes: [
      "Everything in Starter plus",
      "Automated evidence collection",
      "Integrations with infrastructure platforms",
      "Configuration monitoring",
      "Risk tracking",
      "Multi-environment support",
      "Audit preparation workspace",
      "Compliance reporting",
      "Additional frameworks",
    ],
    bestFor: ["Growing SaaS companies", "SOC 2 or ISO preparation", "Security teams scaling operations"],
    closing: "Growth enables teams to move beyond manual processes and operate with continuous compliance visibility.",
    icon: BarChart3,
    color: "#2563eb",
    isHighlighted: true,
  },
  {
    id: "business",
    name: "Business",
    tagline: "For organizations operating mature compliance programs",
    description:
      "Business introduces advanced governance and workflow capabilities that support ongoing compliance operations across multiple teams.",
    includes: [
      "Everything in Growth plus",
      "Control testing workflows",
      "Remediation tracking",
      "Exception management",
      "Advanced dashboards",
      "Audit lifecycle management",
      "Role-based access controls",
      "Cross-team collaboration tools",
    ],
    bestFor: ["Companies maintaining annual certifications", "Internal compliance teams", "Multi-department governance"],
    closing: "Business is designed for organizations conducting recurring audits and managing compliance as a continuous program.",
    icon: Building2,
    color: "#8b5cf6",
    isHighlighted: false,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "For large organizations and complex compliance environments",
    description:
      "Enterprise provides the full power of the Opticini platform with advanced customization, integration, and deployment options.",
    includes: [
      "Everything in Business plus",
      "Multi-organization architecture",
      "Unlimited compliance frameworks",
      "Enterprise integrations",
      "API and webhook access",
      "Single sign-on (SSO / SAML)",
      "Custom reporting",
      "Dedicated onboarding and support",
    ],
    bestFor: ["Large enterprises", "Regulated industries", "Multi-subsidiary organizations"],
    closing: "Enterprise enables organizations to operate compliance across global infrastructure environments.",
    icon: Building,
    color: "#0ea5e9",
    isHighlighted: false,
  },
];

const WHY_UPGRADE = [
  "Infrastructure discovery",
  "Security monitoring",
  "Compliance frameworks",
  "Audit evidence",
  "Risk management",
  "Governance workflows",
];

const IMPLEMENTATION_SERVICES = [
  "Compliance framework configuration",
  "Infrastructure integrations",
  "Policy and control mapping",
  "Audit readiness preparation",
];

export function UpgradeContent() {
  return (
    <PageLayout>
      <PageHero
        badge="Plans & Pricing"
        title="Upgrade Your Compliance Infrastructure"
        subtitle="Move from manual compliance management to a fully automated audit readiness platform."
      />

      {/* Intro */}
      <section className="pt-16 mt-12 py-12 px-4 border-b" style={{ background: "var(--rd-bg-white)", borderColor: "var(--rd-border-light)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg leading-relaxed" style={{ color: "var(--rd-text-secondary)" }}>
            Opticini helps teams manage infrastructure visibility, evidence collection, risk monitoring, and audit preparation from a single platform. Whether you're starting your first compliance journey or operating across multiple frameworks, Opticini scales with your organization.
          </p>
        </div>
      </section>

      {/* Why Upgrade */}
      <section className="py-16 px-4" style={{ background: "var(--rd-bg-subtle)" }}>
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--font-sora), sans-serif" }}>
            Why Upgrade
          </h2>
          <p className="text-lg mb-8 text-center" style={{ color: "var(--rd-text-secondary)" }}>
            Compliance today requires more than spreadsheets and scattered tools. Opticini provides a unified platform that connects:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {WHY_UPGRADE.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 px-5 py-4 rounded-xl bg-white border-[1.5px]"
                style={{ borderColor: "var(--rd-border-light)" }}
              >
                <Check className="h-5 w-5 shrink-0" style={{ color: "var(--rd-blue-600)" }} />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 font-medium" style={{ color: "var(--rd-text-heading)" }}>
            Upgrade your workspace to unlock deeper automation, reporting, and audit readiness.
          </p>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16 px-4" style={{ background: "var(--rd-bg-white)" }}>
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--font-sora), sans-serif" }}>
              Plans
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--rd-text-secondary)" }}>
              Choose the plan that matches your organization's needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PLANS.map((plan) => {
              const Icon = plan.icon;
              return (
                <div
                  key={plan.id}
                  className={`relative flex flex-col bg-white border-[1.5px] rounded-[18px] overflow-hidden transition-all hover:shadow-lg ${
                    plan.isHighlighted ? "border-[var(--rd-blue-600)] shadow-lg" : "hover:border-[#93c5fd]"
                  }`}
                  style={{ borderColor: plan.isHighlighted ? "var(--rd-blue-600)" : "var(--rd-border-light)" }}
                >
                  {plan.isHighlighted && (
                    <div className="absolute top-0 left-0 right-0 py-2 text-center text-xs font-bold uppercase tracking-wider text-white" style={{ background: "var(--rd-blue-600)" }}>
                      Most Popular
                    </div>
                  )}
                  <div className={`p-8 ${plan.isHighlighted ? "pt-14" : ""}`}>
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                      style={{ backgroundColor: `${plan.color}20`, color: plan.color }}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--font-sora), sans-serif" }}>
                      {plan.name}
                    </h3>
                    <p className="text-sm font-medium italic mb-4" style={{ color: "var(--rd-text-secondary)" }}>
                      {plan.tagline}
                    </p>
                    <p className="text-sm mb-5 leading-relaxed" style={{ color: "var(--rd-text-secondary)" }}>
                      {plan.description}
                    </p>
                    <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "var(--rd-blue-600)" }}>
                      Includes
                    </p>
                    <ul className="space-y-2 mb-5">
                      {plan.includes.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--rd-text-secondary)" }}>
                          <Check className="h-4 w-4 mt-0.5 shrink-0" style={{ color: plan.color }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm mb-5 leading-relaxed" style={{ color: "var(--rd-text-secondary)" }}>
                      {plan.closing}
                    </p>
                    <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "var(--rd-blue-600)" }}>
                      Best for
                    </p>
                    <ul className="space-y-1 mb-6">
                      {plan.bestFor.map((item, i) => (
                        <li key={i} className="text-sm" style={{ color: "var(--rd-text-secondary)" }}>
                          • {item}
                        </li>
                      ))}
                    </ul>
                    <Button
                      asChild
                      className="w-full rounded-lg font-semibold"
                      style={{ background: plan.color, color: "#fff" }}
                    >
                      <Link href="/request-demo">
                        Request Demo
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Consultant & Auditor Program */}
      <section className="py-16 px-4" style={{ background: "var(--rd-bg-subtle)" }}>
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--font-sora), sans-serif" }}>
            Consultant & Auditor Program
          </h2>
          <p className="text-lg font-semibold mb-6 text-center" style={{ color: "var(--rd-text-secondary)" }}>
            Grow Your Compliance Practice with Opticini
          </p>
          <p className="text-lg mb-8 text-center leading-relaxed" style={{ color: "var(--rd-text-secondary)" }}>
            Opticini partners with consultants, auditors, and advisory firms to help their clients achieve compliance faster and more efficiently. Through the Opticini Consultant Program, partners can:
          </p>
          <ul className="space-y-3 mb-8 max-w-2xl mx-auto">
            {["Onboard their own clients", "Manage multiple organizations from a unified workspace", "Conduct compliance readiness assessments", "Prepare clients for formal audits"].map((item) => (
              <li key={item} className="flex items-center gap-3" style={{ color: "var(--rd-text-secondary)" }}>
                <Check className="h-5 w-5 shrink-0" style={{ color: "var(--rd-blue-600)" }} />
                {item}
              </li>
            ))}
          </ul>
          <p className="text-center leading-relaxed" style={{ color: "var(--rd-text-secondary)" }}>
            Consultants receive affiliate revenue for client subscriptions and can deliver their advisory services directly through the platform. This model allows consultants and auditors to scale their practice while providing clients with a modern compliance management platform.
          </p>
          <div className="text-center mt-8">
            <Button asChild size="lg" className="rounded-lg font-semibold" style={{ background: "var(--rd-blue-600)", color: "#fff" }}>
              <Link href="/consult">
                <Users className="mr-2 h-5 w-5" />
                Learn About the Partner Program
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Implementation & Advisory */}
      <section className="py-16 px-4" style={{ background: "var(--rd-bg-white)" }}>
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--font-sora), sans-serif" }}>
            Implementation & Advisory
          </h2>
          <p className="text-lg mb-8 text-center leading-relaxed" style={{ color: "var(--rd-text-secondary)" }}>
            Many organizations benefit from expert guidance when implementing compliance frameworks. Opticini offers optional implementation services including:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {IMPLEMENTATION_SERVICES.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 px-6 py-4 rounded-xl border-[1.5px]"
                style={{ borderColor: "var(--rd-border-light)", background: "var(--rd-bg-subtle)" }}
              >
                <Check className="h-5 w-5 shrink-0" style={{ color: "var(--rd-blue-600)" }} />
                <span style={{ color: "var(--rd-text-heading)" }}>{item}</span>
              </div>
            ))}
          </div>
          <p className="text-center mt-8" style={{ color: "var(--rd-text-secondary)" }}>
            These services ensure teams can begin operating effectively on the platform from day one.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 text-white" style={{ background: "linear-gradient(160deg, var(--rd-blue-700), var(--rd-blue-600), var(--rd-blue-500))" }}>
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: "var(--font-sora), sans-serif" }}>
            Start your compliance journey with Opticini today
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Choose the plan that matches your organization's needs and begin building a structured, scalable compliance program.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white rounded-lg font-semibold hover:bg-white/95" style={{ color: "var(--rd-blue-700)" }}>
              <Link href="/request-demo">
                <Rocket className="mr-2 h-5 w-5" />
                Request Demo
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-white/50 text-white hover:bg-white/10 rounded-lg">
              <Link href="/#platform">
                See Platform
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
