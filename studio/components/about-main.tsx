"use client"

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

const CAPABILITIES = [
  {
    icon: Search,
    title: "Infrastructure Discovery",
    desc: "Automatically identify and catalog infrastructure assets across environments so teams know exactly what systems exist and how they are connected.",
  },
  {
    icon: Activity,
    title: "Operational Health Monitoring",
    desc: "Monitor system health, service availability, and infrastructure performance signals to detect issues early and maintain reliable operations.",
  },
  {
    icon: Shield,
    title: "Security & Risk Visibility",
    desc: "Identify configuration risks, security signals, and infrastructure vulnerabilities before they become operational problems.",
  },
  {
    icon: FileCheck,
    title: "Compliance & Governance",
    desc: "Track compliance frameworks, manage controls, and organize audit evidence to maintain continuous readiness for external audits.",
  },
  {
    icon: FolderOpen,
    title: "Evidence & Audit Management",
    desc: "Centralize the documentation, records, and verification data required to demonstrate compliance during security reviews and audits.",
  },
  {
    icon: BarChart3,
    title: "Infrastructure Insight & Analytics",
    desc: "Convert raw infrastructure data into meaningful insights that help teams understand system behavior, identify trends, and improve operational resilience.",
  },
]

const VALUES = [
  { title: "Clarity over complexity", desc: "Technology should simplify decisions, not create more confusion." },
  { title: "Practical solutions", desc: "Every feature in Opticini is built around real operational challenges." },
  { title: "Transparency", desc: "Clear metrics and honest insights are the foundation of strong systems." },
  { title: "Continuous improvement", desc: "The platform evolves based on real-world feedback and changing infrastructure needs." },
]

const AUDIENCES = [
  "infrastructure teams",
  "DevOps engineers",
  "security teams",
  "compliance professionals",
  "consultants and auditors",
  "SaaS companies preparing for audits",
]

export function AboutMain() {
  return (
    <PageLayout>
      <PageHero
        badge="About"
        title="About Opticini"
        subtitle="Infrastructure insight, compliance intelligence, and operational clarity — all in one platform."
      />

      {/* Main Content */}
      <div style={{ background: "var(--rd-bg-page)", fontFamily: "var(--rd-font-body)" }}>
        <div className="container mx-auto px-4 pt-16 pb-16 max-w-7xl">
          {/* Intro */}
          <section className="mb-16 mt-12">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <p className="text-xl leading-relaxed" style={{ color: "var(--rd-text-body)" }}>
                Opticini was created to solve a problem that many technology teams face: understanding what is actually happening across their infrastructure, systems, and compliance environments.
              </p>
              <p className="text-lg leading-relaxed" style={{ color: "var(--rd-text-secondary)" }}>
                Modern organizations rely on dozens of platforms, services, and monitoring tools. Critical metrics are scattered, compliance requirements are difficult to track, and operational insights are often buried inside complex dashboards.
              </p>
              <p className="text-xl font-medium leading-relaxed" style={{ color: "var(--rd-text-heading)" }}>
                Opticini brings those signals together into one unified platform so teams can see what matters, understand risk, and operate with confidence.
              </p>
            </div>
          </section>

          {/* The Story Section */}
          <div className="mb-16">
            <div className="rounded-[18px] border-[1.5px] shadow-lg overflow-hidden" style={{ background: "var(--rd-bg-white)", borderColor: "var(--rd-border-light)" }}>
              <div className="px-6 py-4 border-b" style={{ borderColor: "var(--rd-border-light)" }}>
                <h2 className="flex items-center gap-2 text-2xl font-bold" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--rd-font-heading)" }}>
                  <Lightbulb className="h-8 w-8" style={{ color: "var(--rd-blue-600)" }} />
                  The Story Behind Opticini
                </h2>
                <p className="text-lg mt-1" style={{ color: "var(--rd-text-secondary)" }}>
                  A personal challenge that became a platform for everyone.
                </p>
              </div>
              <div className="p-6 space-y-6">
                <div className="prose prose-lg max-w-none space-y-6" style={{ color: "var(--rd-text-body)" }}>
                  <p className="leading-relaxed">
                    As a technologist and entrepreneur working from the mountains of Colorado, I often found myself chasing information across different systems just to understand what was happening inside my own infrastructure.
                  </p>
                  <p className="leading-relaxed">
                    Metrics lived in one tool. Security signals in another. Compliance data somewhere else entirely.
                  </p>
                  <p className="leading-relaxed">
                    The process of collecting information was exhausting. And even when the data was found, it was rarely clear what to do next.
                  </p>
                  <p className="leading-relaxed">
                    Hours turned into days researching solutions, comparing tools, reading documentation, and trying to piece together a complete picture of system health and operational risk.
                  </p>
                  <p className="leading-relaxed">
                    Eventually I realized the real problem wasn't the lack of data.
                  </p>
                  <p className="leading-relaxed font-semibold">
                    The problem was lack of clarity.
                  </p>
                  <p className="leading-relaxed">
                    So I built the platform I wished existed.
                  </p>
                  <p className="leading-relaxed">
                    Opticini began as a personal project to bring together performance insights, system monitoring, compliance signals, and infrastructure visibility into a single place where everything could be understood and acted upon.
                  </p>
                  <p className="leading-relaxed">
                    What started as a tool for myself evolved into something much bigger — a platform designed to help organizations understand their systems, prepare for audits, and operate with greater confidence.
                  </p>
                  <p className="leading-relaxed">
                    Today Opticini is built for developers, infrastructure teams, security professionals, consultants, and organizations that need clear visibility into their operational and compliance environments.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mission & Values */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="rounded-[18px] border-[1.5px] shadow-lg overflow-hidden" style={{ background: "var(--rd-bg-white)", borderColor: "var(--rd-border-light)" }}>
              <div className="px-6 py-4 border-b" style={{ borderColor: "var(--rd-border-light)" }}>
                <h3 className="flex items-center gap-2 font-semibold" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--rd-font-heading)" }}>
                  <Target className="h-6 w-6" style={{ color: "var(--rd-blue-600)" }} />
                  Our Mission
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <p className="leading-relaxed font-medium" style={{ color: "var(--rd-text-body)" }}>
                  To simplify infrastructure intelligence and compliance readiness.
                </p>
                <p className="leading-relaxed text-sm" style={{ color: "var(--rd-text-secondary)" }}>
                  We believe organizations should not need dozens of disconnected tools just to understand how their systems are performing or whether they are operating securely.
                </p>
                <p className="leading-relaxed text-sm" style={{ color: "var(--rd-text-secondary)" }}>
                  Opticini exists to provide a clear operational picture of infrastructure health, risk posture, and compliance readiness in one accessible platform.
                </p>
                <p className="leading-relaxed text-sm" style={{ color: "var(--rd-text-secondary)" }}>
                  Our goal is to make operational insight and governance available to organizations of every size.
                </p>
              </div>
            </div>

            <div className="rounded-[18px] border-[1.5px] shadow-lg overflow-hidden" style={{ background: "var(--rd-bg-white)", borderColor: "var(--rd-border-light)" }}>
              <div className="px-6 py-4 border-b" style={{ borderColor: "var(--rd-border-light)" }}>
                <h3 className="flex items-center gap-2 font-semibold" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--rd-font-heading)" }}>
                  <Heart className="h-6 w-6" style={{ color: "var(--rd-blue-600)" }} />
                  Our Values
                </h3>
              </div>
              <div className="p-6">
                <ul className="space-y-4" style={{ color: "var(--rd-text-body)" }}>
                  {VALUES.map((v) => (
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

          {/* What Opticini Provides */}
          <div className="mb-16">
            <div className="rounded-[18px] border-[1.5px] shadow-lg overflow-hidden" style={{ background: "var(--rd-bg-white)", borderColor: "var(--rd-border-light)" }}>
              <div className="px-6 py-4 border-b" style={{ borderColor: "var(--rd-border-light)" }}>
                <h3 className="text-2xl font-semibold" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--rd-font-heading)" }}>
                  What Opticini Provides
                </h3>
                <p className="text-lg mt-1" style={{ color: "var(--rd-text-secondary)" }}>
                  Opticini brings together multiple operational and compliance capabilities into a unified platform.
                </p>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {CAPABILITIES.map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg flex items-center justify-center" style={{ background: "var(--rd-bg-subtle)" }}>
                          <Icon className="h-5 w-5" style={{ color: "var(--rd-blue-600)" }} />
                        </div>
                        <h4 className="font-semibold" style={{ color: "var(--rd-text-heading)" }}>{title}</h4>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--rd-text-secondary)" }}>{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Built for Modern Technology Teams */}
          <div className="mb-16">
            <div className="rounded-[18px] border-[1.5px] shadow-lg overflow-hidden" style={{ background: "var(--rd-bg-white)", borderColor: "var(--rd-border-light)" }}>
              <div className="px-6 py-4 border-b" style={{ borderColor: "var(--rd-border-light)" }}>
                <h3 className="text-2xl font-semibold" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--rd-font-heading)" }}>
                  Built for Modern Technology Teams
                </h3>
                <p className="text-lg mt-1" style={{ color: "var(--rd-text-secondary)" }}>
                  Opticini is designed for organizations that need clarity across complex technology environments.
                </p>
              </div>
              <div className="p-6 space-y-6">
                <p className="leading-relaxed" style={{ color: "var(--rd-text-body)" }}>
                  This includes:
                </p>
                <ul className="grid sm:grid-cols-2 gap-3" style={{ color: "var(--rd-text-body)" }}>
                  {AUDIENCES.map((audience) => (
                    <li key={audience} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 flex-shrink-0" style={{ color: "var(--rd-emerald-500)" }} />
                      <span className="capitalize">{audience}</span>
                    </li>
                  ))}
                </ul>
                <p className="leading-relaxed pt-2" style={{ color: "var(--rd-text-body)" }}>
                  Whether you are preparing for your first compliance framework or operating across multiple infrastructure environments, Opticini provides the insight and structure needed to move forward with confidence.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </PageLayout>
  )
}
