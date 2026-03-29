"use client";

import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { PageHero } from "@/components/page-hero";
import { PageLayout } from "@/components/page-layout";
import { Button } from "@/components/ui/button";
import type { FrameworkContent, FrameworkSection } from "@/lib/frameworks-data";
import { useFrameworkPageContent } from "@/lib/i18n/use-footer-linked-page-content";
import { PUBLIC_PAGES_EN } from "@/lib/i18n/public-pages-en";

const sectionStyles = {
  bullets: "py-16 px-4 border-b",
  table: "py-16 px-4 border-b",
  subsections: "py-16 px-4 border-b",
};
const FLP_EN = PUBLIC_PAGES_EN.footerLinkedPages;

export function FrameworkPageTemplate({ content }: { content: FrameworkContent }) {
  const { t } = useTranslation();
  const [hydrated, setHydrated] = useState(false);
  const tr = (key: string, fallback: string) => (hydrated ? t(key) : fallback);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const page = useFrameworkPageContent(content);

  return (
    <PageLayout>
      <PageHero
        badge={tr("footerLinkedPages.frameworksBadge", FLP_EN.frameworksBadge)}
        title={page.title}
        subtitle={page.subtitle}
      />

      {/* Intro */}
      <section className="pt-16 mt-12 py-12 px-4 border-b" style={{ background: "var(--rd-bg-white)", borderColor: "var(--rd-border-light)" }}>
        <div className="max-w-3xl mx-auto">
          {page.intro.map((p, i) => (
            <p key={i} className={`text-base leading-relaxed ${i < page.intro.length - 1 ? "mb-4" : ""}`} style={{ color: "var(--rd-text-secondary)" }}>
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* Sections */}
      {page.sections.map((section, idx) => (
        <SectionBlock key={idx} section={section} idx={idx} />
      ))}

      {/* CTA */}
      <section className="py-16 px-4 text-white" style={{ background: "linear-gradient(160deg, var(--rd-blue-700), var(--rd-blue-600), var(--rd-blue-500))" }}>
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: "var(--rd-font-heading)" }}>
            {hydrated
              ? t("footerLinkedPages.ctaFrameworkTitle", { title: page.title })
              : FLP_EN.ctaFrameworkTitle.replace("{{title}}", page.title)}
          </h2>
          <p className="text-lg text-white/90 mb-8">
            {tr("footerLinkedPages.ctaFrameworkSubtitle", FLP_EN.ctaFrameworkSubtitle)}
          </p>
          <Button asChild size="lg" className="bg-white rounded-lg font-semibold hover:bg-white/95" style={{ color: "var(--rd-blue-700)" }}>
            <Link href="/request-demo">
              {tr("footerLinkedPages.requestDemo", FLP_EN.requestDemo)}
            </Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
}

function SectionBlock({ section, idx }: { section: FrameworkSection; idx: number }) {
  const bg = idx % 2 === 0 ? "var(--rd-bg-white)" : "var(--rd-bg-subtle)";

  if (section.type === "bullets") {
    return (
      <section className={sectionStyles.bullets} style={{ background: bg, borderColor: "var(--rd-border-light)" }}>
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--rd-font-heading)" }}>
            {section.heading}
          </h2>
          <ul className="space-y-3">
            {section.items.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-base" style={{ color: "var(--rd-text-secondary)" }}>
                <CheckCircle className="h-5 w-5 mt-0.5 shrink-0" style={{ color: "var(--rd-blue-600)" }} />
                {item}
              </li>
            ))}
          </ul>
          {section.outro && (
            <p className="mt-4 text-base" style={{ color: "var(--rd-text-secondary)" }}>
              {section.outro}
            </p>
          )}
        </div>
      </section>
    );
  }

  if (section.type === "table") {
    return (
      <section className={sectionStyles.table} style={{ background: bg, borderColor: "var(--rd-border-light)" }}>
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--rd-font-heading)" }}>
            {section.heading}
          </h2>
          <div className="space-y-3">
            {section.rows.map((row, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:gap-4 py-3 border-b border-slate-200 last:border-0">
                <span className="font-semibold shrink-0 sm:w-40" style={{ color: "var(--rd-text-heading)" }}>
                  {row.label}
                </span>
                <span className="text-base" style={{ color: "var(--rd-text-secondary)" }}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>
          {section.outro && (
            <p className="mt-4 text-base" style={{ color: "var(--rd-text-secondary)" }}>
              {section.outro}
            </p>
          )}
        </div>
      </section>
    );
  }

  if (section.type === "subsections") {
    return (
      <section className={sectionStyles.subsections} style={{ background: bg, borderColor: "var(--rd-border-light)" }}>
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--rd-font-heading)" }}>
            {section.heading}
          </h2>
          <div className="space-y-8">
            {section.subsections.map((sub, i) => (
              <div key={i}>
                <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--rd-text-heading)" }}>
                  {sub.heading}
                </h3>
                <ul className="space-y-2">
                  {sub.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-base" style={{ color: "var(--rd-text-secondary)" }}>
                      <CheckCircle className="h-5 w-5 mt-0.5 shrink-0" style={{ color: "var(--rd-blue-600)" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return null;
}
