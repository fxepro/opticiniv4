"use client";

import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { PageLayout } from "@/components/page-layout";
import { Button } from "@/components/ui/button";
import type { PartnershipContent, PartnershipSection } from "@/lib/partnerships-data";

const sectionStyles = {
  prose: "py-16 px-4 border-b",
  bullets: "py-16 px-4 border-b",
  closing: "py-16 px-4",
};

export function PartnershipPageTemplate({ content }: { content: PartnershipContent }) {
  return (
    <PageLayout>
      <PageHero
        badge="Partnerships"
        title={content.title}
        subtitle={content.subtitle}
      />

      {/* Intro */}
      <section className="pt-16 mt-12 py-12 px-4 border-b" style={{ background: "var(--rd-bg-white)", borderColor: "var(--rd-border-light)" }}>
        <div className="max-w-3xl mx-auto">
          {content.intro.map((p, i) => (
            <p key={i} className={`text-base leading-relaxed ${i < content.intro.length - 1 ? "mb-4" : ""}`} style={{ color: "var(--rd-text-secondary)" }}>
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* Sections */}
      {content.sections.map((section, idx) => (
        <SectionBlock key={idx} section={section} idx={idx} />
      ))}

      {/* CTA */}
      <section className="py-16 px-4 text-white" style={{ background: "linear-gradient(160deg, var(--rd-blue-700), var(--rd-blue-600), var(--rd-blue-500))" }}>
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: "var(--rd-font-heading)" }}>
            {content.ctaText}
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Get in touch to learn more about partnering with Opticini.
          </p>
          <Button asChild size="lg" className="bg-white rounded-lg font-semibold hover:bg-white/95" style={{ color: "var(--rd-blue-700)" }}>
            <Link href={content.ctaHref}>
              {content.ctaText}
            </Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
}

function SectionBlock({ section, idx }: { section: PartnershipSection; idx: number }) {
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
        </div>
      </section>
    );
  }

  if (section.type === "prose") {
    return (
      <section className={sectionStyles.prose} style={{ background: bg, borderColor: "var(--rd-border-light)" }}>
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--rd-font-heading)" }}>
            {section.heading}
          </h2>
          <div className="space-y-4">
            {section.paragraphs.map((p, i) => (
              <p key={i} className="text-base leading-relaxed" style={{ color: "var(--rd-text-secondary)" }}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (section.type === "closing") {
    return (
      <section className={sectionStyles.closing} style={{ background: bg }}>
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <div className="space-y-4">
            {section.paragraphs.map((p, i) => (
              <p key={i} className="text-base leading-relaxed" style={{ color: "var(--rd-text-secondary)" }}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return null;
}
