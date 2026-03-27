"use client"

import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { PUBLIC_PAGES_EN } from "@/lib/i18n/public-pages-en"
import {
  Target,
  Heart,
  Lightbulb,
  CheckCircle,
  Search,
  Activity,
  Shield,
  FileCheck,
  FolderOpen,
  BarChart3,
} from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { PageLayout } from "@/components/page-layout"

const CAPABILITY_ICONS = [
  Search,
  Activity,
  Shield,
  FileCheck,
  FolderOpen,
  BarChart3,
] as const

const ABOUT_EN = PUBLIC_PAGES_EN.about

export function AboutMain() {
  const { t } = useTranslation()
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  const tr = (key: string, fallback: string) => (hydrated ? t(key) : fallback)

  const intro = (
    hydrated ? (t("about.intro", { returnObjects: true }) as string[]) : ABOUT_EN.intro
  ) as string[]
  const storyParagraphs = (
    hydrated ? (t("about.storyParagraphs", { returnObjects: true }) as string[]) : ABOUT_EN.storyParagraphs
  ) as string[]
  const storyClosing = (
    hydrated ? (t("about.storyClosing", { returnObjects: true }) as string[]) : ABOUT_EN.storyClosing
  ) as string[]
  const missionBody = (
    hydrated ? (t("about.missionBody", { returnObjects: true }) as string[]) : ABOUT_EN.missionBody
  ) as string[]
  const values = (
    hydrated
      ? (t("about.values", { returnObjects: true }) as { title: string; desc: string }[])
      : ABOUT_EN.values
  ) as { title: string; desc: string }[]
  const capabilities = (
    hydrated
      ? (t("about.capabilities", { returnObjects: true }) as { title: string; desc: string }[])
      : ABOUT_EN.capabilities
  ) as { title: string; desc: string }[]
  const audiences = (
    hydrated ? (t("about.audiences", { returnObjects: true }) as string[]) : ABOUT_EN.audiences
  ) as string[]

  return (
    <PageLayout>
      <PageHero
        badge={tr("about.heroBadge", ABOUT_EN.heroBadge)}
        title={tr("about.heroTitle", ABOUT_EN.heroTitle)}
        subtitle={tr("about.heroSubtitle", ABOUT_EN.heroSubtitle)}
      />

      <div style={{ background: "var(--rd-bg-page)", fontFamily: "var(--rd-font-body)" }}>
        <div className="container mx-auto px-4 pt-16 pb-16 max-w-7xl">
          <section className="mb-16 mt-12">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              {Array.isArray(intro) &&
                intro.map((p, i) => (
                  <p
                    key={i}
                    className={
                      i === 0
                        ? "text-xl leading-relaxed"
                        : i === 2
                          ? "text-xl font-medium leading-relaxed"
                          : "text-lg leading-relaxed"
                    }
                    style={{
                      color:
                        i === 1
                          ? "var(--rd-text-secondary)"
                          : i === 2
                            ? "var(--rd-text-heading)"
                            : "var(--rd-text-body)",
                    }}
                  >
                    {p}
                  </p>
                ))}
            </div>
          </section>

          <div className="mb-16">
            <div className="rounded-[18px] border-[1.5px] shadow-lg overflow-hidden" style={{ background: "var(--rd-bg-white)", borderColor: "var(--rd-border-light)" }}>
              <div className="px-6 py-4 border-b" style={{ borderColor: "var(--rd-border-light)" }}>
                <h2 className="flex items-center gap-2 text-2xl font-bold" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--rd-font-heading)" }}>
                  <Lightbulb className="h-8 w-8" style={{ color: "var(--rd-blue-600)" }} />
                  {tr("about.storyTitle", ABOUT_EN.storyTitle)}
                </h2>
                <p className="text-lg mt-1" style={{ color: "var(--rd-text-secondary)" }}>
                  {tr("about.storySubtitle", ABOUT_EN.storySubtitle)}
                </p>
              </div>
              <div className="p-6 space-y-6">
                <div className="prose prose-lg max-w-none space-y-6" style={{ color: "var(--rd-text-body)" }}>
                  {Array.isArray(storyParagraphs) &&
                    storyParagraphs.map((p, i) => (
                      <p key={i} className="leading-relaxed">
                        {p}
                      </p>
                    ))}
                  <p className="leading-relaxed font-semibold">{tr("about.storyHighlight", ABOUT_EN.storyHighlight)}</p>
                  {Array.isArray(storyClosing) &&
                    storyClosing.map((p, i) => (
                      <p key={i} className="leading-relaxed">
                        {p}
                      </p>
                    ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="rounded-[18px] border-[1.5px] shadow-lg overflow-hidden" style={{ background: "var(--rd-bg-white)", borderColor: "var(--rd-border-light)" }}>
              <div className="px-6 py-4 border-b" style={{ borderColor: "var(--rd-border-light)" }}>
                <h3 className="flex items-center gap-2 font-semibold" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--rd-font-heading)" }}>
                  <Target className="h-6 w-6" style={{ color: "var(--rd-blue-600)" }} />
                  {tr("about.missionTitle", ABOUT_EN.missionTitle)}
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <p className="leading-relaxed font-medium" style={{ color: "var(--rd-text-body)" }}>
                  {tr("about.missionLead", ABOUT_EN.missionLead)}
                </p>
                {Array.isArray(missionBody) &&
                  missionBody.map((p, i) => (
                    <p key={i} className="leading-relaxed text-sm" style={{ color: "var(--rd-text-secondary)" }}>
                      {p}
                    </p>
                  ))}
              </div>
            </div>

            <div className="rounded-[18px] border-[1.5px] shadow-lg overflow-hidden" style={{ background: "var(--rd-bg-white)", borderColor: "var(--rd-border-light)" }}>
              <div className="px-6 py-4 border-b" style={{ borderColor: "var(--rd-border-light)" }}>
                <h3 className="flex items-center gap-2 font-semibold" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--rd-font-heading)" }}>
                  <Heart className="h-6 w-6" style={{ color: "var(--rd-blue-600)" }} />
                  {tr("about.valuesTitle", ABOUT_EN.valuesTitle)}
                </h3>
              </div>
              <div className="p-6">
                <ul className="space-y-4" style={{ color: "var(--rd-text-body)" }}>
                  {Array.isArray(values) &&
                    values.map((v) => (
                      <li key={v.title} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: "var(--rd-emerald-500)" }} />
                        <div>
                          <span className="font-medium" style={{ color: "var(--rd-text-heading)" }}>{v.title}</span>
                          <p className="text-sm mt-0.5" style={{ color: "var(--rd-text-secondary)" }}>{v.desc}</p>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <div className="rounded-[18px] border-[1.5px] shadow-lg overflow-hidden" style={{ background: "var(--rd-bg-white)", borderColor: "var(--rd-border-light)" }}>
              <div className="px-6 py-4 border-b" style={{ borderColor: "var(--rd-border-light)" }}>
                <h3 className="text-2xl font-semibold" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--rd-font-heading)" }}>
                  {tr("about.providesTitle", ABOUT_EN.providesTitle)}
                </h3>
                <p className="text-lg mt-1" style={{ color: "var(--rd-text-secondary)" }}>
                  {tr("about.providesSubtitle", ABOUT_EN.providesSubtitle)}
                </p>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.isArray(capabilities) &&
                    capabilities.map((cap, idx) => {
                      const Icon = CAPABILITY_ICONS[idx] ?? Search
                      return (
                        <div key={cap.title} className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg flex items-center justify-center" style={{ background: "var(--rd-bg-subtle)" }}>
                              <Icon className="h-5 w-5" style={{ color: "var(--rd-blue-600)" }} />
                            </div>
                            <h4 className="font-semibold" style={{ color: "var(--rd-text-heading)" }}>{cap.title}</h4>
                          </div>
                          <p className="text-sm leading-relaxed" style={{ color: "var(--rd-text-secondary)" }}>{cap.desc}</p>
                        </div>
                      )
                    })}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <div className="rounded-[18px] border-[1.5px] shadow-lg overflow-hidden" style={{ background: "var(--rd-bg-white)", borderColor: "var(--rd-border-light)" }}>
              <div className="px-6 py-4 border-b" style={{ borderColor: "var(--rd-border-light)" }}>
                <h3 className="text-2xl font-semibold" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--rd-font-heading)" }}>
                  {tr("about.builtForTitle", ABOUT_EN.builtForTitle)}
                </h3>
                <p className="text-lg mt-1" style={{ color: "var(--rd-text-secondary)" }}>
                  {tr("about.builtForSubtitle", ABOUT_EN.builtForSubtitle)}
                </p>
              </div>
              <div className="p-6 space-y-6">
                <p className="leading-relaxed" style={{ color: "var(--rd-text-body)" }}>
                  {tr("about.builtForIncludes", ABOUT_EN.builtForIncludes)}
                </p>
                <ul className="grid sm:grid-cols-2 gap-3" style={{ color: "var(--rd-text-body)" }}>
                  {Array.isArray(audiences) &&
                    audiences.map((audience) => (
                      <li key={audience} className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 flex-shrink-0" style={{ color: "var(--rd-emerald-500)" }} />
                        <span className="capitalize">{audience}</span>
                      </li>
                    ))}
                </ul>
                <p className="leading-relaxed pt-2" style={{ color: "var(--rd-text-body)" }}>
                  {tr("about.builtForClosing", ABOUT_EN.builtForClosing)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
