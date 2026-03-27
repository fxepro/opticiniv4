"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { useTranslation } from "react-i18next";

type ChallengeCard = { title: string; sub: string };
type SolutionLabel = { emoji: string; label: string };
type Plane = { slug: string; emoji: string; title: string; tagline: string };
type Audience = { emoji: string; role: string; focus: string };
type CompareRow = { old: string; new: string };
type DeployItem = { emoji: string; label: string };

export default function HomePage() {
  const { t } = useTranslation();

  const trustSignals = t("home.trust.signals", { returnObjects: true }) as string[];
  const challengeCards = t("home.challenge.cards", { returnObjects: true }) as ChallengeCard[];
  const solutionLabels = t("home.solution.labels", { returnObjects: true }) as SolutionLabel[];
  const planes = t("home.platform.planes", { returnObjects: true }) as Plane[];
  const audiences = t("home.audiences.items", { returnObjects: true }) as Audience[];
  const comparisonRows = t("home.comparison.rows", { returnObjects: true }) as CompareRow[];
  const deployItems = t("home.deploy.items", { returnObjects: true }) as DeployItem[];

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "var(--rd-bg-page)", fontFamily: "var(--rd-font-body)" }}>
      <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden px-4 sm:px-9 pt-[110px] pb-[90px]" style={{ background: "linear-gradient(160deg, var(--rd-bg-blue-wash) 0%, var(--rd-bg-white) 55%, var(--rd-blue-50) 100%)" }}>
        <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "linear-gradient(var(--rd-border-blue) 1px, transparent 1px), linear-gradient(90deg, var(--rd-border-blue) 1px, transparent 1px)", backgroundSize: "72px 72px" }} />
        <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(37,99,235,.07) 0%, transparent 68%)" }} />
        <div className="absolute -top-14 -right-14 w-[500px] h-[500px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(99,102,241,.06) 0%, transparent 65%)" }} />
        <div className="relative z-10 text-center max-w-[920px] animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border mb-9" style={{ borderColor: "var(--rd-blue-200)", background: "var(--rd-blue-50)", color: "var(--rd-blue-600)", fontSize: "13px", fontWeight: 700, letterSpacing: ".09em", textTransform: "uppercase" }}>
            <span className="w-[7px] h-[7px] rounded-full bg-[var(--rd-blue-500)] animate-pulse" />
            {t("home.hero.badge")}
          </div>
          <h1 className="text-[clamp(48px,6.5vw,82px)] font-extrabold leading-[1.04] tracking-tight mb-7" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--rd-font-heading)" }}>
            {t("home.hero.title1")}
            <br />
            <span className="bg-gradient-to-br from-[var(--rd-blue-600)] to-[var(--rd-indigo-400)] bg-clip-text text-transparent">{t("home.hero.title2")}</span>
          </h1>
          <p className="text-[clamp(20px,2.5vw,24px)] max-w-[720px] mx-auto mb-5 font-light leading-[1.55]" style={{ color: "var(--rd-text-secondary)" }}>
            {t("home.hero.subtitle")}
          </p>
          <p className="text-[17px] mb-[52px]" style={{ color: "var(--rd-text-muted)" }}>
            {t("home.hero.subline")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-[60px]">
            <Link
              href="/request-demo"
              className="inline-flex items-center gap-2.5 px-9 py-4 rounded-lg text-white text-lg font-semibold transition-all hover:-translate-y-0.5"
              style={{ background: "var(--rd-blue-600)", boxShadow: "0 6px 24px rgba(37,99,235,.22)" }}
            >
              {t("home.hero.requestDemo")} <ArrowRight className="h-[17px] w-[17px]" />
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-7">
            {Array.isArray(trustSignals) && trustSignals.map((s) => (
              <span key={s} className="flex items-center gap-2 text-base" style={{ color: "var(--rd-text-muted)" }}>
                <Check className="h-[17px] w-[17px] shrink-0" style={{ color: "var(--rd-emerald-500)" }} />
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
          <div className="w-px h-9" style={{ background: "linear-gradient(to bottom, transparent, var(--rd-border-medium))" }} />
          <div className="w-1 h-1 rounded-full animate-bounce" style={{ background: "var(--rd-text-muted)" }} />
        </div>
      </section>

      <section className="py-[108px] px-4 sm:px-9 border-y" style={{ background: "var(--rd-bg-subtle)", borderColor: "var(--rd-border-light)" }}>
        <div className="max-w-[840px] mx-auto">
          <div className="text-center mb-[68px]">
            <p className="text-sm font-bold uppercase tracking-widest mb-3.5" style={{ color: "var(--rd-blue-600)" }}>{t("home.challenge.kicker")}</p>
            <h2 className="text-[clamp(32px,4vw,46px)] font-bold tracking-tight mb-4 leading-tight" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--rd-font-heading)" }}>{t("home.challenge.title")}</h2>
            <p className="text-xl max-w-[640px] mx-auto leading-relaxed" style={{ color: "var(--rd-text-secondary)" }}>
              {t("home.challenge.body")}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-3.5 mb-4">
            {Array.isArray(challengeCards) && challengeCards.map((card, i) => (
              <div key={i} className="flex gap-4 p-6 rounded-xl border bg-white" style={{ borderColor: "var(--rd-border-light)", boxShadow: "0 1px 4px rgba(37,99,235,.05)" }}>
                <span className="w-[9px] h-[9px] rounded-full shrink-0 mt-2" style={{ background: "var(--rd-amber-500)" }} />
                <div>
                  <p className="text-lg font-semibold mb-1" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--rd-font-heading)" }}>{card.title}</p>
                  <p className="text-base" style={{ color: "var(--rd-text-secondary)" }}>{card.sub}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-7 rounded-xl text-center border" style={{ borderColor: "#fecaca", background: "#fff5f5" }}>
            <p className="text-xl font-semibold mb-2" style={{ color: "#c53030", fontFamily: "var(--rd-font-heading)" }}>{t("home.challenge.alertTitle")}</p>
            <p className="text-[17px]" style={{ color: "#9b6b6b" }}>{t("home.challenge.alertBody")}</p>
          </div>
        </div>
      </section>

      <section className="py-[108px] px-4 sm:px-9" style={{ background: "var(--rd-bg-white)" }}>
        <div className="max-w-[840px] mx-auto">
          <div className="text-center mb-[68px]">
            <p className="text-sm font-bold uppercase tracking-widest mb-3.5" style={{ color: "var(--rd-blue-600)" }}>{t("home.solution.kicker")}</p>
            <h2 className="text-[clamp(32px,4vw,46px)] font-bold tracking-tight mb-4 leading-tight" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--rd-font-heading)" }}>{t("home.solution.title")}</h2>
            <p className="text-xl max-w-[640px] mx-auto leading-relaxed" style={{ color: "var(--rd-text-secondary)" }}>
              {t("home.solution.body")}
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-3.5 mb-4">
            {Array.isArray(solutionLabels) && solutionLabels.map(({ emoji, label }) => (
              <div key={label} className="flex items-center gap-4 p-6 rounded-xl border bg-white" style={{ borderColor: "var(--rd-blue-200)", boxShadow: "0 1px 4px rgba(37,99,235,.06)" }}>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0 text-2xl" style={{ background: "var(--rd-blue-100)" }}>{emoji}</div>
                <span className="text-[17px] font-medium" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--rd-font-heading)" }}>{label}</span>
              </div>
            ))}
          </div>
          <div className="p-6 rounded-xl text-center border" style={{ borderColor: "#a7f3d0", background: "#f0fdf4" }}>
            <p className="text-xl font-semibold" style={{ color: "var(--rd-emerald-600)", fontFamily: "var(--rd-font-heading)" }}>{t("home.solution.banner")}</p>
          </div>
        </div>
      </section>

      <section id="platform" className="py-[108px] px-4 sm:px-9 border-y" style={{ background: "var(--rd-bg-blue-wash)", borderColor: "var(--rd-border-blue)" }}>
        <div className="max-w-[1140px] mx-auto">
          <div className="text-center mb-[68px]">
            <p className="text-sm font-bold uppercase tracking-widest mb-3.5" style={{ color: "var(--rd-blue-600)" }}>{t("home.platform.kicker")}</p>
            <h2 className="text-[clamp(32px,4vw,46px)] font-bold tracking-tight mb-4 leading-tight" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--rd-font-heading)" }}>{t("home.platform.title")}</h2>
            <p className="text-xl max-w-[640px] mx-auto leading-relaxed" style={{ color: "var(--rd-text-secondary)" }}>
              {t("home.platform.body")}
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {Array.isArray(planes) && planes.map((p) => (
              <Link
                key={p.slug}
                href={`/features/${p.slug}`}
                className="group p-6 rounded-xl border bg-white transition-all hover:-translate-y-0.5 hover:border-[var(--rd-blue-300)] hover:shadow-lg"
                style={{ borderColor: "var(--rd-border-light)", boxShadow: "0 1px 3px rgba(37,99,235,.04)" }}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 text-xl transition-colors group-hover:bg-[var(--rd-blue-100)]" style={{ background: "var(--rd-blue-50)" }}>{p.emoji}</div>
                <p className="text-[17px] font-semibold mb-1.5" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--rd-font-heading)" }}>{p.title}</p>
                <p className="text-sm leading-snug opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--rd-blue-500)" }}>{t("home.platform.learnMore")}</p>
                <p className="text-sm leading-[1.45]" style={{ color: "var(--rd-text-secondary)" }}>{p.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-[108px] px-4 sm:px-9" style={{ background: "var(--rd-bg-white)" }}>
        <div className="max-w-[1140px] mx-auto">
          <div className="text-center mb-[68px]">
            <p className="text-sm font-bold uppercase tracking-widest mb-3.5" style={{ color: "var(--rd-blue-600)" }}>{t("home.audiences.kicker")}</p>
            <h2 className="text-[clamp(32px,4vw,46px)] font-bold tracking-tight leading-tight" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--rd-font-heading)" }}>{t("home.audiences.title")}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.isArray(audiences) && audiences.map((a) => (
              <div key={a.role} className="p-7 rounded-xl border bg-white transition-all hover:border-[var(--rd-blue-300)] hover:shadow-md" style={{ borderColor: "var(--rd-border-light)", boxShadow: "0 1px 3px rgba(37,99,235,.04)" }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-5 text-xl" style={{ background: "var(--rd-blue-50)" }}>{a.emoji}</div>
                <p className="text-xl font-semibold mb-3" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--rd-font-heading)" }}>{a.role}</p>
                <p className="text-base leading-[1.55]" style={{ color: "var(--rd-text-secondary)" }}>{a.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-[108px] px-4 sm:px-9 border-y" style={{ background: "var(--rd-bg-subtle)", borderColor: "var(--rd-border-light)" }}>
        <div className="max-w-[840px] mx-auto">
          <div className="text-center mb-[68px]">
            <p className="text-sm font-bold uppercase tracking-widest mb-3.5" style={{ color: "var(--rd-blue-600)" }}>{t("home.comparison.kicker")}</p>
            <h2 className="text-[clamp(32px,4vw,46px)] font-bold tracking-tight leading-tight" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--rd-font-heading)" }}>{t("home.comparison.title")}</h2>
          </div>
          <div className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--rd-border-light)", boxShadow: "0 2px 10px rgba(37,99,235,.06)" }}>
            <div className="grid grid-cols-2" style={{ background: "var(--rd-bg-subtle)" }}>
              <div className="px-7 py-4 text-sm font-bold uppercase tracking-wider" style={{ color: "var(--rd-text-muted)" }}>{t("home.comparison.colOld")}</div>
              <div className="px-7 py-4 text-sm font-bold uppercase tracking-wider" style={{ color: "var(--rd-blue-600)" }}>{t("home.comparison.colNew")}</div>
            </div>
            {Array.isArray(comparisonRows) && comparisonRows.map((row, i) => (
              <div key={i} className="grid grid-cols-2 border-t" style={{ borderColor: "var(--rd-border-light)", background: i % 2 === 0 ? "var(--rd-bg-white)" : "var(--rd-bg-subtle)" }}>
                <div className="flex items-center gap-3 px-7 py-5 text-[17px]" style={{ color: "var(--rd-text-muted)" }}>
                  <span className="w-[7px] h-[7px] rounded-full shrink-0" style={{ background: "#fca5a5" }} />
                  {row.old}
                </div>
                <div className="flex items-center gap-3 px-7 py-5 text-[17px] font-medium" style={{ color: "var(--rd-text-heading)" }}>
                  <Check className="h-[17px] w-[17px] shrink-0" style={{ color: "var(--rd-emerald-500)" }} />
                  {row.new}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-[108px] px-4 sm:px-9" style={{ background: "var(--rd-bg-white)" }}>
        <div className="max-w-[1140px] mx-auto text-center">
          <p className="text-sm font-bold uppercase tracking-widest mb-3.5" style={{ color: "var(--rd-blue-600)" }}>{t("home.deploy.kicker")}</p>
          <h2 className="text-[clamp(32px,4vw,46px)] font-bold tracking-tight mb-4 leading-tight" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--rd-font-heading)" }}>{t("home.deploy.title")}</h2>
          <p className="text-xl mb-12" style={{ color: "var(--rd-text-secondary)" }}>{t("home.deploy.subtitle")}</p>
          <div className="flex flex-wrap justify-center gap-3">
            {Array.isArray(deployItems) && deployItems.map(({ emoji, label }) => (
              <div key={label} className="flex items-center gap-3 px-6 py-4 rounded-xl border bg-white text-[17px] font-medium transition-all hover:border-[var(--rd-blue-300)] hover:bg-[var(--rd-blue-50)]" style={{ borderColor: "var(--rd-border-light)", color: "var(--rd-text-secondary)", boxShadow: "0 1px 3px rgba(37,99,235,.04)" }}>
                <span className="text-2xl">{emoji}</span> {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-[108px] px-4 sm:px-9" style={{ background: "linear-gradient(160deg, var(--rd-blue-600) 0%, #3b5bdb 60%, #4c6ef5 100%)" }}>
        <div className="max-w-[660px] mx-auto text-center">
          <h2 className="text-[clamp(36px,4.5vw,56px)] font-bold tracking-tight text-white mb-5" style={{ fontFamily: "var(--rd-font-heading)" }}>{t("home.finalCta.title")}</h2>
          <p className="text-xl text-white/80 mb-12 leading-[1.55]">{t("home.finalCta.body")}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/request-demo"
              className="inline-flex items-center gap-2.5 px-9 py-4 rounded-lg bg-white text-lg font-bold transition-all hover:-translate-y-0.5"
              style={{ color: "var(--rd-blue-600)", boxShadow: "0 6px 24px rgba(0,0,0,.15)" }}
            >
              {t("home.finalCta.requestDemo")} <ArrowRight className="h-[17px] w-[17px]" style={{ color: "var(--rd-blue-600)" }} />
            </Link>
          </div>
          <p className="text-base text-white/50 mt-8">{t("home.finalCta.footnote")}</p>
        </div>
      </section>
    </div>
  );
}
