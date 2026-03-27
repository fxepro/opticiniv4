"use client";

import { useMemo, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { Check, ArrowRight, Zap, BarChart3, Building2, Building, Rocket, Users, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-hero";
import { PageLayout } from "@/components/page-layout";
import { PUBLIC_PAGES_EN } from "@/lib/i18n/public-pages-en";

const UPGRADE_EN = PUBLIC_PAGES_EN.upgrade;

type UpgradePlanI18n = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  includes: string[];
  bestFor: string[];
  closing: string;
};

const PLAN_UI: Record<
  string,
  { icon: LucideIcon; color: string; isHighlighted: boolean }
> = {
  starter: { icon: Zap, color: "#10b981", isHighlighted: false },
  growth: { icon: BarChart3, color: "#2563eb", isHighlighted: true },
  business: { icon: Building2, color: "#8b5cf6", isHighlighted: false },
  enterprise: { icon: Building, color: "#0ea5e9", isHighlighted: false },
};

export function UpgradeContent() {
  const { t, i18n } = useTranslation();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const tr = (key: string, fallback: string) => (hydrated ? t(key) : fallback);

  const plans = useMemo(
    () =>
      hydrated
        ? (t("upgrade.plans", { returnObjects: true }) as UpgradePlanI18n[])
        : (UPGRADE_EN.plans as unknown as UpgradePlanI18n[]),
    [t, hydrated, i18n.language]
  );
  const whyBullets = useMemo(
    () =>
      hydrated
        ? (t("upgrade.whyBullets", { returnObjects: true }) as string[])
        : UPGRADE_EN.whyBullets,
    [t, hydrated, i18n.language]
  );
  const consultantBullets = useMemo(
    () =>
      hydrated
        ? (t("upgrade.consultantBullets", { returnObjects: true }) as string[])
        : UPGRADE_EN.consultantBullets,
    [t, hydrated, i18n.language]
  );
  const implementationServices = useMemo(
    () =>
      hydrated
        ? (t("upgrade.implementationServices", { returnObjects: true }) as string[])
        : UPGRADE_EN.implementationServices,
    [t, hydrated, i18n.language]
  );

  return (
    <PageLayout>
      <PageHero
        badge={tr("upgrade.heroBadge", UPGRADE_EN.heroBadge)}
        title={tr("upgrade.heroTitle", UPGRADE_EN.heroTitle)}
        subtitle={tr("upgrade.heroSubtitle", UPGRADE_EN.heroSubtitle)}
      />

      <section className="pt-16 mt-12 py-12 px-4 border-b" style={{ background: "var(--rd-bg-white)", borderColor: "var(--rd-border-light)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg leading-relaxed" style={{ color: "var(--rd-text-secondary)" }}>
            {tr("upgrade.intro", UPGRADE_EN.intro)}
          </p>
        </div>
      </section>

      <section className="py-16 px-4" style={{ background: "var(--rd-bg-subtle)" }}>
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--font-sora), sans-serif" }}>
            {tr("upgrade.whyTitle", UPGRADE_EN.whyTitle)}
          </h2>
          <p className="text-lg mb-8 text-center" style={{ color: "var(--rd-text-secondary)" }}>
            {tr("upgrade.whySub", UPGRADE_EN.whySub)}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.isArray(whyBullets) &&
              whyBullets.map((item) => (
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
            {tr("upgrade.whyClosing", UPGRADE_EN.whyClosing)}
          </p>
        </div>
      </section>

      <section className="py-16 px-4" style={{ background: "var(--rd-bg-white)" }}>
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--font-sora), sans-serif" }}>
              {tr("upgrade.plansTitle", UPGRADE_EN.plansTitle)}
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--rd-text-secondary)" }}>
              {tr("upgrade.plansSub", UPGRADE_EN.plansSub)}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.isArray(plans) &&
              plans.map((plan) => {
                const ui = PLAN_UI[plan.id] ?? PLAN_UI.starter;
                const Icon = ui.icon;
                const isHighlighted = ui.isHighlighted;
                return (
                  <div
                    key={plan.id}
                    className={`relative flex flex-col bg-white border-[1.5px] rounded-[18px] overflow-hidden transition-all hover:shadow-lg ${
                      isHighlighted ? "border-[var(--rd-blue-600)] shadow-lg" : "hover:border-[#93c5fd]"
                    }`}
                    style={{ borderColor: isHighlighted ? "var(--rd-blue-600)" : "var(--rd-border-light)" }}
                  >
                    {isHighlighted && (
                      <div className="absolute top-0 left-0 right-0 py-2 text-center text-xs font-bold uppercase tracking-wider text-white" style={{ background: "var(--rd-blue-600)" }}>
                        {tr("upgrade.mostPopular", UPGRADE_EN.mostPopular)}
                      </div>
                    )}
                    <div className={`p-8 ${isHighlighted ? "pt-14" : ""}`}>
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                        style={{ backgroundColor: `${ui.color}20`, color: ui.color }}
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
                        {tr("upgrade.includesLabel", UPGRADE_EN.includesLabel)}
                      </p>
                      <ul className="space-y-2 mb-5">
                        {plan.includes.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--rd-text-secondary)" }}>
                            <Check className="h-4 w-4 mt-0.5 shrink-0" style={{ color: ui.color }} />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <p className="text-sm mb-5 leading-relaxed" style={{ color: "var(--rd-text-secondary)" }}>
                        {plan.closing}
                      </p>
                      <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "var(--rd-blue-600)" }}>
                        {tr("upgrade.bestForLabel", UPGRADE_EN.bestForLabel)}
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
                        style={{ background: ui.color, color: "#fff" }}
                      >
                        <Link href="/request-demo">
                          {tr("upgrade.requestDemo", UPGRADE_EN.requestDemo)}
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

      <section className="py-16 px-4" style={{ background: "var(--rd-bg-subtle)" }}>
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--font-sora), sans-serif" }}>
            {tr("upgrade.consultantTitle", UPGRADE_EN.consultantTitle)}
          </h2>
          <p className="text-lg font-semibold mb-6 text-center" style={{ color: "var(--rd-text-secondary)" }}>
            {tr("upgrade.consultantLead", UPGRADE_EN.consultantLead)}
          </p>
          <p className="text-lg mb-8 text-center leading-relaxed" style={{ color: "var(--rd-text-secondary)" }}>
            {tr("upgrade.consultantBody", UPGRADE_EN.consultantBody)}
          </p>
          <ul className="space-y-3 mb-8 max-w-2xl mx-auto">
            {Array.isArray(consultantBullets) &&
              consultantBullets.map((item) => (
                <li key={item} className="flex items-center gap-3" style={{ color: "var(--rd-text-secondary)" }}>
                  <Check className="h-5 w-5 shrink-0" style={{ color: "var(--rd-blue-600)" }} />
                  {item}
                </li>
              ))}
          </ul>
          <p className="text-center leading-relaxed" style={{ color: "var(--rd-text-secondary)" }}>
            {tr("upgrade.consultantClosing", UPGRADE_EN.consultantClosing)}
          </p>
          <div className="text-center mt-8">
            <Button asChild size="lg" className="rounded-lg font-semibold" style={{ background: "var(--rd-blue-600)", color: "#fff" }}>
              <Link href="/consult">
                <Users className="mr-2 h-5 w-5" />
                {tr("upgrade.learnPartner", UPGRADE_EN.learnPartner)}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 px-4" style={{ background: "var(--rd-bg-white)" }}>
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--font-sora), sans-serif" }}>
            {tr("upgrade.implementationTitle", UPGRADE_EN.implementationTitle)}
          </h2>
          <p className="text-lg mb-8 text-center leading-relaxed" style={{ color: "var(--rd-text-secondary)" }}>
            {tr("upgrade.implementationIntro", UPGRADE_EN.implementationIntro)}
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {Array.isArray(implementationServices) &&
              implementationServices.map((item) => (
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
            {tr("upgrade.implementationClosing", UPGRADE_EN.implementationClosing)}
          </p>
        </div>
      </section>

      <section className="py-16 px-4 text-white" style={{ background: "linear-gradient(160deg, var(--rd-blue-700), var(--rd-blue-600), var(--rd-blue-500))" }}>
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: "var(--font-sora), sans-serif" }}>
            {tr("upgrade.finalCtaTitle", UPGRADE_EN.finalCtaTitle)}
          </h2>
          <p className="text-lg text-white/90 mb-8">
            {tr("upgrade.finalCtaSub", UPGRADE_EN.finalCtaSub)}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white rounded-lg font-semibold hover:bg-white/95" style={{ color: "var(--rd-blue-700)" }}>
              <Link href="/request-demo">
                <Rocket className="mr-2 h-5 w-5" />
                {tr("upgrade.requestDemo", UPGRADE_EN.requestDemo)}
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-white/50 text-white hover:bg-white/10 rounded-lg">
              <Link href="/#platform">
                {tr("upgrade.seePlatform", UPGRADE_EN.seePlatform)}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
