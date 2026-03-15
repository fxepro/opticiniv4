"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check, ArrowRight } from "lucide-react";

const FEATURE_LINKS = [
  { title: "Discovery", href: "/features/discovery" },
  { title: "Health", href: "/features/health" },
  { title: "Performance", href: "/features/performance" },
  { title: "Security", href: "/features/security" },
  { title: "Configuration", href: "/features/configuration" },
  { title: "Compliance", href: "/features/compliance" },
  { title: "Evidence", href: "/features/evidence" },
  { title: "Change", href: "/features/change" },
  { title: "Cost", href: "/features/cost" },
  { title: "Risk", href: "/features/risk" },
];

export type FeatureCard = {
  icon: string;
  title: string;
  items?: string[];
  sub?: string;
};

export type FeatureDetailConfig = {
  title: string;
  subtitle: string;
  tagline: string;
  planeNum: number;
  stats: { value: string; label: string }[];
  posStrong: string;
  posBody: string;
  sectionLabel: string;
  sectionTitle: string;
  cards: FeatureCard[];
  compareLabel: string;
  compareTitle: string;
  compareOld: string;
  compareNew: string;
  compareRows: { old: string; new: string }[];
  outcomeLabel: string;
  outcomeText: string;
  ctaTitle: string;
  ctaSubtitle: string;
  colors: {
    primary: string;
    badgeBg: string;
    badgeBorder: string;
    taglineBg: string;
    taglineBorder: string;
    cardIconBg: string;
    outcomeBorder: string;
    outcomeBg: string;
    ctaGradient: string;
    ctaBtnColor: string;
  };
  extraSection?: {
    label: string;
    title: string;
    cards?: { title: string; sub: string }[];
    miniCards?: { title: string; sub: string }[];
  };
};

export function FeatureDetailPage({ config }: { config: FeatureDetailConfig }) {
  const c = config.colors;
  const pathname = usePathname();
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "var(--rd-bg-page)", fontFamily: "var(--rd-font-body)" }}>
      {/* Hero */}
      <section className="relative py-20 px-4 sm:px-8 overflow-hidden" style={{ background: `linear-gradient(160deg, ${c.badgeBg} 0%, #fff 55%, ${c.badgeBg} 100%)` }}>
        <div className="absolute inset-0 opacity-60" style={{ backgroundImage: `linear-gradient(${c.primary}0f 1px, transparent 1px), linear-gradient(90deg, ${c.primary}0f 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 70% 60% at 60% 40%, ${c.primary}12, transparent)` }} />
        <div className="relative max-w-[860px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 text-xs font-bold uppercase tracking-wider" style={{ borderColor: c.badgeBorder, background: c.badgeBg, color: c.primary }}>
            <span className="w-[7px] h-[7px] rounded-full animate-pulse" style={{ background: c.primary }} />
            Insight Plane {String(config.planeNum).padStart(2, "0")}
          </div>
          <h1 className="text-[clamp(40px,6vw,72px)] font-extrabold tracking-tight mb-3" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--font-sora), sans-serif" }}>
            {config.title}
          </h1>
          <p className="text-[clamp(18px,2.5vw,24px)] font-medium mb-5" style={{ color: "var(--rd-text-secondary)" }}>
            {config.subtitle}
          </p>
          <div className="inline-block px-5 py-2.5 rounded-lg border-l-4 mb-9 text-[15px] italic" style={{ borderColor: c.taglineBorder, background: c.taglineBg, color: c.primary }}>
            {config.tagline}
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {config.stats.map((s, i) => (
              <div key={i} className="bg-white border rounded-xl px-5 py-3 flex flex-col items-center gap-0.5 min-w-[110px] shadow-sm" style={{ borderColor: "var(--rd-border-light)" }}>
                <span className="text-[22px] font-extrabold" style={{ color: c.primary, fontFamily: "var(--font-sora), sans-serif" }}>{s.value}</span>
                <span className="text-[11px] font-medium" style={{ color: "var(--rd-text-muted)" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grey bar with feature nav inside */}
      <div className="px-4 sm:px-8 -mt-6 mb-10">
        <div
          className="max-w-[1180px] mx-auto rounded-2xl py-6 px-8 flex items-center justify-center"
          style={{
            background: `linear-gradient(180deg, ${c.badgeBg} 0%, #e5e7eb 40%, #e5e7eb 60%, ${c.badgeBg} 100%)`,
            borderWidth: 1,
            borderColor: c.badgeBorder,
            borderStyle: "solid",
          }}
        >
          <nav className="flex flex-wrap justify-center items-center gap-3">
            {FEATURE_LINKS.map((f) => {
              const isActive = pathname === f.href || pathname === f.href + "/";
              return (
                <Link
                  key={f.href}
                  href={f.href}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive ? "shadow-sm" : "hover:opacity-90"
                  }`}
                  style={{
                    color: isActive ? c.primary : "var(--rd-text-heading)",
                    background: isActive ? c.badgeBg : "transparent",
                    border: isActive ? `1px solid ${c.badgeBorder}` : "1px solid transparent",
                  }}
                >
                  {f.title}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Positioning */}
      <div className="pt-12 pb-11 px-4 sm:px-8 border-b" style={{ background: `linear-gradient(135deg, ${c.badgeBg}, #fff)`, borderColor: c.badgeBorder }}>
        <div className="max-w-[760px] mx-auto text-center">
          <p className="text-[19px] font-bold mb-3" style={{ color: c.primary, fontFamily: "var(--font-sora), sans-serif" }}>{config.posStrong}</p>
          <p className="text-base leading-relaxed" style={{ color: "var(--rd-text-secondary)" }}>{config.posBody}</p>
        </div>
      </div>

      {/* Cards Section */}
      <section className="py-[72px] px-4 sm:px-8" style={{ background: "var(--rd-bg-white)" }}>
        <div className="max-w-[1180px] mx-auto">
          <p className="text-[11px] font-bold uppercase tracking-widest mb-2.5" style={{ color: "var(--rd-blue-600)" }}>{config.sectionLabel}</p>
          <h2 className="text-[clamp(24px,3vw,34px)] font-bold mb-10" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--font-sora), sans-serif" }}>{config.sectionTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {config.cards.map((card, i) => (
              <div key={i} className="bg-white border-[1.5px] rounded-[18px] p-7 transition-all hover:border-[#93c5fd] hover:shadow-lg hover:-translate-y-0.5" style={{ borderColor: "var(--rd-border-light)" }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-[22px] mb-4" style={{ background: c.cardIconBg }}>{card.icon}</div>
                <p className="text-base font-bold mb-2.5" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--font-sora), sans-serif" }}>{card.title}</p>
                {card.sub && <p className="text-[13px] mb-3.5 leading-relaxed" style={{ color: "var(--rd-text-secondary)" }}>{card.sub}</p>}
                {card.items && (
                  <ul className="space-y-2">
                    {card.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm leading-relaxed">
                        <Check className="h-4 w-4 mt-0.5 shrink-0" style={{ color: c.primary }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compare Table */}
      {config.compareRows.length > 0 && (
      <section className="py-[72px] px-4 sm:px-8" style={{ background: "var(--rd-bg-subtle)" }}>
        <div className="max-w-[820px] mx-auto">
          <p className="text-[11px] font-bold uppercase tracking-widest mb-2.5 text-center" style={{ color: "var(--rd-blue-600)" }}>{config.compareLabel}</p>
          <h2 className="text-[clamp(24px,3vw,34px)] font-bold mb-10 text-center" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--font-sora), sans-serif" }}>{config.compareTitle}</h2>
          <div className="border-[1.5px] rounded-[18px] overflow-hidden bg-white" style={{ borderColor: "var(--rd-border-light)" }}>
            <div className="grid grid-cols-2" style={{ background: "linear-gradient(135deg, #f0f6ff, var(--rd-bg-subtle))" }}>
              <div className="px-5 py-3.5 text-[13px] font-bold" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--font-sora), sans-serif" }}>{config.compareOld}</div>
              <div className="px-5 py-3.5 text-[13px] font-bold" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--font-sora), sans-serif" }}>{config.compareNew}</div>
            </div>
            {config.compareRows.map((row, i) => (
              <div key={i} className="grid grid-cols-2 border-t" style={{ borderColor: "var(--rd-border-light)", background: i % 2 === 0 ? "var(--rd-bg-white)" : "var(--rd-bg-subtle)" }}>
                <div className="px-5 py-3.5 text-sm flex items-center gap-2" style={{ color: "var(--rd-text-secondary)" }}>
                  <span className="text-red-500 font-bold">✗</span> {row.old}
                </div>
                <div className="px-5 py-3.5 text-sm font-medium flex items-center gap-2" style={{ color: "var(--rd-text-heading)" }}>
                  <Check className="h-4 w-4 shrink-0" style={{ color: c.primary }} />
                  {row.new}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Extra Section (for Cost, Risk, etc.) */}
      {config.extraSection && (
        <section className="py-[72px] px-4 sm:px-8" style={{ background: "var(--rd-bg-white)" }}>
          <div className="max-w-[1180px] mx-auto">
            <p className="text-[11px] font-bold uppercase tracking-widest mb-2.5 text-center" style={{ color: "var(--rd-blue-600)" }}>{config.extraSection.label}</p>
            <h2 className="text-[clamp(24px,3vw,34px)] font-bold mb-10 text-center" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--font-sora), sans-serif" }}>{config.extraSection.title}</h2>
            {config.extraSection.cards && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {config.extraSection.cards.map((card, i) => (
                  <div key={i} className="bg-white border-[1.5px] rounded-[18px] p-7" style={{ borderColor: "var(--rd-border-light)" }}>
                    <p className="text-base font-bold mb-2" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--font-sora), sans-serif" }}>{card.title}</p>
                    <p className="text-[13px]" style={{ color: "var(--rd-text-secondary)" }}>{card.sub}</p>
                  </div>
                ))}
              </div>
            )}
            {config.extraSection.miniCards && (
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                {config.extraSection.miniCards.map((card, i) => (
                  <div key={i} className="bg-white border-[1.5px] rounded-xl p-4 text-center transition-all hover:border-[#93c5fd] hover:shadow-md" style={{ borderColor: "var(--rd-border-light)" }}>
                    <p className="text-sm font-bold mb-1" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--font-sora), sans-serif" }}>{card.title}</p>
                    <p className="text-xs" style={{ color: "var(--rd-text-secondary)" }}>{card.sub}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Outcome */}
      <section className="py-[72px] px-4 sm:px-8" style={{ background: config.extraSection ? "var(--rd-bg-subtle)" : "var(--rd-bg-white)" }}>
        <div className="max-w-[820px] mx-auto">
          <div className="rounded-[18px] p-11 text-center border-[1.5px]" style={{ borderColor: c.outcomeBorder, background: `linear-gradient(135deg, ${c.outcomeBg}, #fff)` }}>
            <p className="text-[11px] font-bold uppercase tracking-widest mb-3.5" style={{ color: c.primary }}>{config.outcomeLabel}</p>
            <p className="text-xl font-semibold leading-snug max-w-[600px] mx-auto" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--font-sora), sans-serif" }}>{config.outcomeText}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[72px] px-4 sm:px-8" style={{ background: c.ctaGradient }}>
        <div className="max-w-[680px] mx-auto text-center">
          <h2 className="text-[clamp(26px,4vw,40px)] font-extrabold text-white mb-3" style={{ fontFamily: "var(--font-sora), sans-serif" }}>{config.ctaTitle}</h2>
          <p className="text-[17px] text-white/85 mb-9">{config.ctaSubtitle}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/request-demo" className="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-white font-bold text-[15px] transition-all hover:-translate-y-0.5" style={{ color: c.ctaBtnColor }}>
              Request Demo
            </Link>
            <Link href="/#platform" className="inline-flex items-center gap-2 px-7 py-3 rounded-lg border-2 border-white/50 text-white font-bold text-[15px] transition-all hover:bg-white/10 hover:border-white">
              See integrations →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
