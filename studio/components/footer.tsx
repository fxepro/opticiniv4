"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FOOTER_EXTRA_EN } from "@/lib/i18n/landing-core";

const PLATFORM_SLUGS = [
  "discovery",
  "health",
  "performance",
  "security",
  "configuration",
  "compliance",
  "evidence",
  "change",
  "cost",
  "risk",
] as const;

const FOOTER_PLATFORM_KEYS: Record<(typeof PLATFORM_SLUGS)[number], string> = {
  discovery: "platformDiscovery",
  health: "platformHealth",
  performance: "platformPerformance",
  security: "platformSecurity",
  configuration: "platformConfiguration",
  compliance: "platformCompliance",
  evidence: "platformEvidence",
  change: "platformChange",
  cost: "platformCost",
  risk: "platformRisk",
};

const VERTICALS = [
  { slug: "nonprofits", key: "verticalNonprofits" },
  { slug: "startups", key: "verticalStartups" },
  { slug: "smb", key: "verticalSMB" },
  { slug: "government", key: "verticalGovernment" },
  { slug: "healthcare", key: "verticalHealthcare" },
  { slug: "fintech", key: "verticalFintech" },
  { slug: "education", key: "verticalEducation" },
] as const;

const FRAMEWORKS = [
  { slug: "iso-27002", key: "fwIso27002" },
  { slug: "hipaa", key: "fwHipaaRule" },
  { slug: "soc2", key: "fwSoc2" },
  { slug: "nist-800-53", key: "fwNist800" },
  { slug: "nist-csf", key: "fwNistCsf" },
  { slug: "iso-27001", key: "fwIso27001" },
  { slug: "pci-dss", key: "fwPciDss" },
  { slug: "cis-controls", key: "fwCis" },
] as const;

const FOOTER_LEGAL_FALLBACK = {
  privacyPolicy: "Privacy Policy",
  termsOfService: "Terms of Service",
  cookiePolicy: "Cookie Policy",
} as const;

export function Footer() {
  const { t } = useTranslation();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const tr = (key: string, fallback: string) => (hydrated ? t(key) : fallback);

  return (
    <footer style={{ fontFamily: "var(--rd-font-body)" }}>
      <div className="border-y py-12 px-4 sm:px-9" style={{ background: "var(--rd-bg-subtle)", borderColor: "var(--rd-border-light)" }}>
        <div className="max-w-[1140px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-7">
          <div>
            <p className="text-xl font-bold mb-1.5" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--rd-font-heading)" }}>
              {tr("footer.landingCtaTitle", FOOTER_EXTRA_EN.landingCtaTitle)}
            </p>
            <p className="text-base" style={{ color: "var(--rd-text-secondary)" }}>
              {tr("footer.landingCtaSubtitle", FOOTER_EXTRA_EN.landingCtaSubtitle)}
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link
              href="/request-demo"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold transition-all"
              style={{ background: "var(--rd-blue-600)", boxShadow: "0 3px 14px rgba(37,99,235,.22)" }}
            >
              {tr("footer.requestDemo", FOOTER_EXTRA_EN.requestDemo)} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="py-[68px] px-4 sm:px-9 pt-16 pb-11" style={{ background: "var(--rd-bg-white)" }}>
        <div className="max-w-[1140px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-12">
          <div>
            <Link href="/" className="font-extrabold text-xl block mb-3.5" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--rd-font-heading)" }}>
              Opticini<span style={{ color: "var(--rd-blue-600)" }}>.</span>
            </Link>
            <p className="text-base leading-[1.65] mb-5" style={{ color: "var(--rd-text-secondary)" }}>
              {tr("footer.brandTagline", FOOTER_EXTRA_EN.brandTagline)}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {["SOC 2", "ISO 27001", "HIPAA", "PCI"].map((chip) => (
                <span key={chip} className="text-[13px] px-2.5 py-1 rounded-md border" style={{ borderColor: "var(--rd-border-light)", color: "var(--rd-text-muted)", background: "var(--rd-bg-subtle)" }}>
                  {chip}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[13px] font-bold uppercase tracking-wider mb-5" style={{ color: "var(--rd-text-muted)", fontFamily: "var(--rd-font-heading)" }}>
              {tr("footer.colPlatform", FOOTER_EXTRA_EN.colPlatform)}
            </p>
            <ul className="flex flex-col gap-3.5">
              {PLATFORM_SLUGS.map((slug) => (
                <li key={slug}>
                  <Link href={`/features/${slug}`} className="text-base hover:text-[var(--rd-blue-600)] transition-colors" style={{ color: "var(--rd-text-secondary)" }}>
                    {tr(
                      `footer.${FOOTER_PLATFORM_KEYS[slug]}`,
                      FOOTER_EXTRA_EN[FOOTER_PLATFORM_KEYS[slug] as keyof typeof FOOTER_EXTRA_EN]
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[13px] font-bold uppercase tracking-wider mb-5" style={{ color: "var(--rd-text-muted)", fontFamily: "var(--rd-font-heading)" }}>
              {tr("footer.colCompany", FOOTER_EXTRA_EN.colCompany)}
            </p>
            <ul className="flex flex-col gap-3.5">
              <li><Link href="/about" className="text-base hover:text-[var(--rd-blue-600)] transition-colors" style={{ color: "var(--rd-text-secondary)" }}>{tr("footer.linkAbout", FOOTER_EXTRA_EN.linkAbout)}</Link></li>
              <li><Link href="/blog" className="text-base hover:text-[var(--rd-blue-600)] transition-colors" style={{ color: "var(--rd-text-secondary)" }}>{tr("footer.linkBlog", FOOTER_EXTRA_EN.linkBlog)}</Link></li>
              <li><Link href="/request-demo" className="text-base hover:text-[var(--rd-blue-600)] transition-colors" style={{ color: "var(--rd-text-secondary)" }}>{tr("footer.linkRequestDemo", FOOTER_EXTRA_EN.linkRequestDemo)}</Link></li>
              <li><Link href="/contact-sales" className="text-base hover:text-[var(--rd-blue-600)] transition-colors" style={{ color: "var(--rd-text-secondary)" }}>{tr("footer.linkContactSales", FOOTER_EXTRA_EN.linkContactSales)}</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-[13px] font-bold uppercase tracking-wider mb-5" style={{ color: "var(--rd-text-muted)", fontFamily: "var(--rd-font-heading)" }}>
              {tr("footer.colPartnerships", FOOTER_EXTRA_EN.colPartnerships)}
            </p>
            <ul className="flex flex-col gap-3.5">
              <li><Link href="/partnerships/affiliates" className="text-base hover:text-[var(--rd-blue-600)] transition-colors" style={{ color: "var(--rd-text-secondary)" }}>{tr("footer.linkAffiliates", FOOTER_EXTRA_EN.linkAffiliates)}</Link></li>
              <li><Link href="/partnerships/consultants" className="text-base hover:text-[var(--rd-blue-600)] transition-colors" style={{ color: "var(--rd-text-secondary)" }}>{tr("footer.linkConsultants", FOOTER_EXTRA_EN.linkConsultants)}</Link></li>
              <li><Link href="/partnerships/audit-partners" className="text-base hover:text-[var(--rd-blue-600)] transition-colors" style={{ color: "var(--rd-text-secondary)" }}>{tr("footer.linkAuditPartners", FOOTER_EXTRA_EN.linkAuditPartners)}</Link></li>
              <li><Link href="/partnerships/technology-partners" className="text-base hover:text-[var(--rd-blue-600)] transition-colors" style={{ color: "var(--rd-text-secondary)" }}>{tr("footer.linkTechnologyPartners", FOOTER_EXTRA_EN.linkTechnologyPartners)}</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-[13px] font-bold uppercase tracking-wider mb-5" style={{ color: "var(--rd-text-muted)", fontFamily: "var(--rd-font-heading)" }}>
              {tr("footer.colVerticals", FOOTER_EXTRA_EN.colVerticals)}
            </p>
            <ul className="flex flex-col gap-3.5">
              {VERTICALS.map(({ slug, key }) => (
                <li key={slug}>
                  <Link href={`/verticals/${slug}`} className="text-base hover:text-[var(--rd-blue-600)] transition-colors" style={{ color: "var(--rd-text-secondary)" }}>
                    {tr(`footer.${key}`, FOOTER_EXTRA_EN[key as keyof typeof FOOTER_EXTRA_EN])}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="min-w-[180px]">
            <p className="text-[13px] font-bold uppercase tracking-wider mb-5" style={{ color: "var(--rd-text-muted)", fontFamily: "var(--rd-font-heading)" }}>
              {tr("footer.colFrameworks", FOOTER_EXTRA_EN.colFrameworks)}
            </p>
            <ul className="flex flex-col gap-3.5">
              {FRAMEWORKS.map(({ slug, key }) => (
                <li key={slug}>
                  <Link href={`/frameworks/${slug}`} className="text-base hover:text-[var(--rd-blue-600)] transition-colors whitespace-nowrap" style={{ color: "var(--rd-text-secondary)" }}>
                    {tr(`footer.${key}`, FOOTER_EXTRA_EN[key as keyof typeof FOOTER_EXTRA_EN])}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="py-5 px-4 sm:px-9 border-t" style={{ background: "var(--rd-bg-subtle)", borderColor: "var(--rd-border-light)" }}>
        <div className="max-w-[1140px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[15px]" style={{ color: "var(--rd-text-muted)" }}>
            {tr("footer.copyrightLine", FOOTER_EXTRA_EN.copyrightLine)}
          </p>
          <div className="flex gap-7">
            <Link href="/privacy" className="text-[15px] hover:text-[var(--rd-blue-600)] transition-colors" style={{ color: "var(--rd-text-muted)" }}>
              {tr("footer.privacyPolicy", FOOTER_LEGAL_FALLBACK.privacyPolicy)}
            </Link>
            <Link href="/terms" className="text-[15px] hover:text-[var(--rd-blue-600)] transition-colors" style={{ color: "var(--rd-text-muted)" }}>
              {tr("footer.termsOfService", FOOTER_LEGAL_FALLBACK.termsOfService)}
            </Link>
            <Link href="/cookies" className="text-[15px] hover:text-[var(--rd-blue-600)] transition-colors" style={{ color: "var(--rd-text-muted)" }}>
              {tr("footer.cookiePolicy", FOOTER_LEGAL_FALLBACK.cookiePolicy)}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
