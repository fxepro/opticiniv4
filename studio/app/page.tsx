"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Play, Check } from "lucide-react";

const PLANES = [
  { emoji: "🔍", title: "Discovery", tagline: "Know everything that exists", href: "/features/discovery" },
  { emoji: "💓", title: "Health", tagline: "Know what's up — and what's about to go down", href: "/features/health" },
  { emoji: "⚡", title: "Performance", tagline: "Measure what matters to users and teams", href: "/features/performance" },
  { emoji: "🔐", title: "Security", tagline: "See risk before attackers do", href: "/features/security" },
  { emoji: "⚙️", title: "Configuration", tagline: "Prevent silent configuration decay", href: "/features/configuration" },
  { emoji: "📋", title: "Compliance", tagline: "Always audit-ready, never scrambling", href: "/features/compliance" },
  { emoji: "📂", title: "Evidence", tagline: "No screenshots. No spreadsheets.", href: "/features/evidence" },
  { emoji: "🔄", title: "Change", tagline: "Every incident starts with a change", href: "/features/change" },
  { emoji: "💰", title: "Cost", tagline: "Visibility before optimization", href: "/features/cost" },
  { emoji: "⚠️", title: "Risk", tagline: "Not all alerts are equal", href: "/features/risk" },
];

const AUDIENCES = [
  { emoji: "📊", role: "IT Operations & SRE", focus: "Real-time infrastructure health, uptime, and performance visibility across your entire stack." },
  { emoji: "🛡️", role: "Security Teams", focus: "Continuous exposure monitoring, misconfiguration detection, and attack surface reduction." },
  { emoji: "📋", role: "GRC & Compliance", focus: "Always-on control monitoring, automated evidence collection, and audit-ready reporting." },
  { emoji: "💵", role: "FinOps & Finance", focus: "Cloud cost attribution, waste identification, and infrastructure spend optimization." },
  { emoji: "🏢", role: "Executives", focus: "Real risk posture, operational readiness, and business-context insight — not dashboard noise." },
];

const COMPARISON = [
  { old: "Siloed tools", new: "Unified insight platform" },
  { old: "Reactive alerts", new: "Continuous monitoring" },
  { old: "Point-in-time audits", new: "Always audit-ready" },
  { old: "Data overload", new: "Prioritized risk scores" },
  { old: "Manual evidence collection", new: "Automated proof" },
  { old: "Audit panic", new: "Compliance confidence" },
];

const INFRA = [
  { emoji: "🖥️", label: "On-Premise" },
  { emoji: "☁️", label: "Cloud (AWS / GCP / Azure)" },
  { emoji: "🔀", label: "Hybrid" },
  { emoji: "📦", label: "Containers & K8s" },
  { emoji: "🔌", label: "APIs & Services" },
  { emoji: "🔑", label: "Identity Systems" },
  { emoji: "🌐", label: "Networks" },
];

const TRUST_SIGNALS = ["SOC 2 Ready", "ISO 27001", "HIPAA", "PCI DSS", "Agent-based or agentless"];

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "var(--rd-bg-page)", fontFamily: "var(--rd-font-body)" }}>
      {/* Hero */}
      <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden px-4 sm:px-9 pt-[110px] pb-[90px]" style={{ background: "linear-gradient(160deg, var(--rd-bg-blue-wash) 0%, var(--rd-bg-white) 55%, var(--rd-blue-50) 100%)" }}>
        <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "linear-gradient(var(--rd-border-blue) 1px, transparent 1px), linear-gradient(90deg, var(--rd-border-blue) 1px, transparent 1px)", backgroundSize: "72px 72px" }} />
        <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(37,99,235,.07) 0%, transparent 68%)" }} />
        <div className="absolute -top-14 -right-14 w-[500px] h-[500px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(99,102,241,.06) 0%, transparent 65%)" }} />
        <div className="relative z-10 text-center max-w-[920px] animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border mb-9" style={{ borderColor: "var(--rd-blue-200)", background: "var(--rd-blue-50)", color: "var(--rd-blue-600)", fontSize: "13px", fontWeight: 700, letterSpacing: ".09em", textTransform: "uppercase" }}>
            <span className="w-[7px] h-[7px] rounded-full bg-[var(--rd-blue-500)] animate-pulse" />
            B2B Infrastructure Compliance Platform
          </div>
          <h1 className="text-[clamp(48px,6.5vw,82px)] font-extrabold leading-[1.04] tracking-tight mb-7" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--rd-font-heading)" }}>
            Complete Visibility.
            <br />
            <span className="bg-gradient-to-br from-[var(--rd-blue-600)] to-[var(--rd-indigo-400)] bg-clip-text text-transparent">Total Confidence.</span>
          </h1>
          <p className="text-[clamp(20px,2.5vw,24px)] max-w-[720px] mx-auto mb-5 font-light leading-[1.55]" style={{ color: "var(--rd-text-secondary)" }}>
            One platform for discovery, operations, security, compliance, cost, and risk — across local, hybrid, and cloud infrastructure.
          </p>
          <p className="text-[17px] mb-[52px]" style={{ color: "var(--rd-text-muted)" }}>
            Know what you have · Know how it performs · Prove compliance · Reduce risk
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-[60px]">
            <Link
              href="/request-demo"
              className="inline-flex items-center gap-2.5 px-9 py-4 rounded-lg text-white text-lg font-semibold transition-all hover:-translate-y-0.5"
              style={{ background: "var(--rd-blue-600)", boxShadow: "0 6px 24px rgba(37,99,235,.22)" }}
            >
              Request Demo <ArrowRight className="h-[17px] w-[17px]" />
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-7">
            {TRUST_SIGNALS.map((s) => (
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

      {/* Problem */}
      <section className="py-[108px] px-4 sm:px-9 border-y" style={{ background: "var(--rd-bg-subtle)", borderColor: "var(--rd-border-light)" }}>
        <div className="max-w-[840px] mx-auto">
          <div className="text-center mb-[68px]">
            <p className="text-sm font-bold uppercase tracking-widest mb-3.5" style={{ color: "var(--rd-blue-600)" }}>The Challenge</p>
            <h2 className="text-[clamp(32px,4vw,46px)] font-bold tracking-tight mb-4 leading-tight" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--rd-font-heading)" }}>Modern infrastructure is fragmented</h2>
            <p className="text-xl max-w-[640px] mx-auto leading-relaxed" style={{ color: "var(--rd-text-secondary)" }}>
              Your tools don&apos;t talk to each other — leaving security and compliance gaps invisible until it&apos;s too late.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-3.5 mb-4">
            {["Monitoring tools — Only show performance metrics", "Security scanners — Only show vulnerability lists", "Compliance tools — Only show point-in-time evidence", "Finance tools — Only show disconnected cost data"].map((item, i) => {
              const [title, sub] = item.split(" — ");
              return (
                <div key={i} className="flex gap-4 p-6 rounded-xl border bg-white" style={{ borderColor: "var(--rd-border-light)", boxShadow: "0 1px 4px rgba(37,99,235,.05)" }}>
                  <span className="w-[9px] h-[9px] rounded-full shrink-0 mt-2" style={{ background: "var(--rd-amber-500)" }} />
                  <div>
                    <p className="text-lg font-semibold mb-1" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--rd-font-heading)" }}>{title}</p>
                    <p className="text-base" style={{ color: "var(--rd-text-secondary)" }}>{sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="p-7 rounded-xl text-center border" style={{ borderColor: "#fecaca", background: "#fff5f5" }}>
            <p className="text-xl font-semibold mb-2" style={{ color: "#c53030", fontFamily: "var(--rd-font-heading)" }}>None of them talk to each other.</p>
            <p className="text-[17px]" style={{ color: "#9b6b6b" }}>Teams stitch together dashboards, screenshots, and spreadsheets — while risk quietly grows.</p>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-[108px] px-4 sm:px-9" style={{ background: "var(--rd-bg-white)" }}>
        <div className="max-w-[840px] mx-auto">
          <div className="text-center mb-[68px]">
            <p className="text-sm font-bold uppercase tracking-widest mb-3.5" style={{ color: "var(--rd-blue-600)" }}>The Opticini Solution</p>
            <h2 className="text-[clamp(32px,4vw,46px)] font-bold tracking-tight mb-4 leading-tight" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--rd-font-heading)" }}>One unified insight plane</h2>
            <p className="text-xl max-w-[640px] mx-auto leading-relaxed" style={{ color: "var(--rd-text-secondary)" }}>
              Opticini replaces dozens of disconnected tools with a single, continuous view — mapped to health, security, compliance, cost, and risk in real time.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-3.5 mb-4">
            {[
              { emoji: "🖥️", label: "On-premise infrastructure" },
              { emoji: "☁️", label: "Cloud & hybrid environments" },
              { emoji: "🔌", label: "Apps, APIs & identity systems" },
            ].map(({ emoji, label }) => (
              <div key={label} className="flex items-center gap-4 p-6 rounded-xl border bg-white" style={{ borderColor: "var(--rd-blue-200)", boxShadow: "0 1px 4px rgba(37,99,235,.06)" }}>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0 text-2xl" style={{ background: "var(--rd-blue-100)" }}>{emoji}</div>
                <span className="text-[17px] font-medium" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--rd-font-heading)" }}>{label}</span>
              </div>
            ))}
          </div>
          <div className="p-6 rounded-xl text-center border" style={{ borderColor: "#a7f3d0", background: "#f0fdf4" }}>
            <p className="text-xl font-semibold" style={{ color: "var(--rd-emerald-600)", fontFamily: "var(--rd-font-heading)" }}>All mapped to health, security, compliance, cost, and risk — in real time.</p>
          </div>
        </div>
      </section>

      {/* 10 Insight Planes */}
      <section id="platform" className="py-[108px] px-4 sm:px-9 border-y" style={{ background: "var(--rd-bg-blue-wash)", borderColor: "var(--rd-border-blue)" }}>
        <div className="max-w-[1140px] mx-auto">
          <div className="text-center mb-[68px]">
            <p className="text-sm font-bold uppercase tracking-widest mb-3.5" style={{ color: "var(--rd-blue-600)" }}>Platform</p>
            <h2 className="text-[clamp(32px,4vw,46px)] font-bold tracking-tight mb-4 leading-tight" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--rd-font-heading)" }}>10 Insight Planes. One Platform.</h2>
            <p className="text-xl max-w-[640px] mx-auto leading-relaxed" style={{ color: "var(--rd-text-secondary)" }}>
              Each insight plane is deeply integrated — a change in one domain instantly surfaces across all others.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {PLANES.map((p) => (
              <Link
                key={p.title}
                href={p.href}
                className="group p-6 rounded-xl border bg-white transition-all hover:-translate-y-0.5 hover:border-[var(--rd-blue-300)] hover:shadow-lg"
                style={{ borderColor: "var(--rd-border-light)", boxShadow: "0 1px 3px rgba(37,99,235,.04)" }}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 text-xl transition-colors group-hover:bg-[var(--rd-blue-100)]" style={{ background: "var(--rd-blue-50)" }}>{p.emoji}</div>
                <p className="text-[17px] font-semibold mb-1.5" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--rd-font-heading)" }}>{p.title}</p>
                <p className="text-sm leading-snug opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--rd-blue-500)" }}>Learn more →</p>
                <p className="text-sm leading-[1.45]" style={{ color: "var(--rd-text-secondary)" }}>{p.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Audiences */}
      <section className="py-[108px] px-4 sm:px-9" style={{ background: "var(--rd-bg-white)" }}>
        <div className="max-w-[1140px] mx-auto">
          <div className="text-center mb-[68px]">
            <p className="text-sm font-bold uppercase tracking-widest mb-3.5" style={{ color: "var(--rd-blue-600)" }}>Built for Teams</p>
            <h2 className="text-[clamp(32px,4vw,46px)] font-bold tracking-tight leading-tight" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--rd-font-heading)" }}>The right insights for every stakeholder</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {AUDIENCES.map((a) => (
              <div key={a.role} className="p-7 rounded-xl border bg-white transition-all hover:border-[var(--rd-blue-300)] hover:shadow-md" style={{ borderColor: "var(--rd-border-light)", boxShadow: "0 1px 3px rgba(37,99,235,.04)" }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-5 text-xl" style={{ background: "var(--rd-blue-50)" }}>{a.emoji}</div>
                <p className="text-xl font-semibold mb-3" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--rd-font-heading)" }}>{a.role}</p>
                <p className="text-base leading-[1.55]" style={{ color: "var(--rd-text-secondary)" }}>{a.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-[108px] px-4 sm:px-9 border-y" style={{ background: "var(--rd-bg-subtle)", borderColor: "var(--rd-border-light)" }}>
        <div className="max-w-[840px] mx-auto">
          <div className="text-center mb-[68px]">
            <p className="text-sm font-bold uppercase tracking-widest mb-3.5" style={{ color: "var(--rd-blue-600)" }}>Why Opticini</p>
            <h2 className="text-[clamp(32px,4vw,46px)] font-bold tracking-tight leading-tight" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--rd-font-heading)" }}>The last tool you&apos;ll need to add</h2>
          </div>
          <div className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--rd-border-light)", boxShadow: "0 2px 10px rgba(37,99,235,.06)" }}>
            <div className="grid grid-cols-2" style={{ background: "var(--rd-bg-subtle)" }}>
              <div className="px-7 py-4 text-sm font-bold uppercase tracking-wider" style={{ color: "var(--rd-text-muted)" }}>Traditional Approach</div>
              <div className="px-7 py-4 text-sm font-bold uppercase tracking-wider" style={{ color: "var(--rd-blue-600)" }}>With Opticini</div>
            </div>
            {COMPARISON.map((row, i) => (
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

      {/* Infrastructure */}
      <section className="py-[108px] px-4 sm:px-9" style={{ background: "var(--rd-bg-white)" }}>
        <div className="max-w-[1140px] mx-auto text-center">
          <p className="text-sm font-bold uppercase tracking-widest mb-3.5" style={{ color: "var(--rd-blue-600)" }}>Deployment</p>
          <h2 className="text-[clamp(32px,4vw,46px)] font-bold tracking-tight mb-4 leading-tight" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--rd-font-heading)" }}>Works with your infrastructure, not against it</h2>
          <p className="text-xl mb-12" style={{ color: "var(--rd-text-secondary)" }}>Agent-based or agentless. Your choice.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {INFRA.map(({ emoji, label }) => (
              <div key={label} className="flex items-center gap-3 px-6 py-4 rounded-xl border bg-white text-[17px] font-medium transition-all hover:border-[var(--rd-blue-300)] hover:bg-[var(--rd-blue-50)]" style={{ borderColor: "var(--rd-border-light)", color: "var(--rd-text-secondary)", boxShadow: "0 1px 3px rgba(37,99,235,.04)" }}>
                <span className="text-2xl">{emoji}</span> {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-[108px] px-4 sm:px-9" style={{ background: "linear-gradient(160deg, var(--rd-blue-600) 0%, #3b5bdb 60%, #4c6ef5 100%)" }}>
        <div className="max-w-[660px] mx-auto text-center">
          <h2 className="text-[clamp(36px,4.5vw,56px)] font-bold tracking-tight text-white mb-5" style={{ fontFamily: "var(--rd-font-heading)" }}>From visibility to confidence</h2>
          <p className="text-xl text-white/80 mb-12 leading-[1.55]">Opticini doesn&apos;t just show you data. It shows what matters, why it matters, and what to do next.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/request-demo"
              className="inline-flex items-center gap-2.5 px-9 py-4 rounded-lg bg-white text-lg font-bold transition-all hover:-translate-y-0.5"
              style={{ color: "var(--rd-blue-600)", boxShadow: "0 6px 24px rgba(0,0,0,.15)" }}
            >
              Request Demo <ArrowRight className="h-[17px] w-[17px]" style={{ color: "var(--rd-blue-600)" }} />
            </Link>
          </div>
          <p className="text-base text-white/50 mt-8">No credit card required · SOC 2 compliant · Enterprise-ready</p>
        </div>
      </section>
    </div>
  );
}
