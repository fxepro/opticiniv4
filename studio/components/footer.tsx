"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer style={{ fontFamily: "var(--rd-font-body)" }}>
      {/* CTA Band */}
      <div className="border-y py-12 px-4 sm:px-9" style={{ background: "var(--rd-bg-subtle)", borderColor: "var(--rd-border-light)" }}>
        <div className="max-w-[1140px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-7">
          <div>
            <p className="text-xl font-bold mb-1.5" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--rd-font-heading)" }}>
              Ready to bring clarity to your infrastructure?
            </p>
            <p className="text-base" style={{ color: "var(--rd-text-secondary)" }}>
              Join teams using Opticini to unify visibility, compliance, and risk.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link
              href="/request-demo"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold transition-all"
              style={{ background: "var(--rd-blue-600)", boxShadow: "0 3px 14px rgba(37,99,235,.22)" }}
            >
              Request Demo <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-[68px] px-4 sm:px-9 pt-16 pb-11" style={{ background: "var(--rd-bg-white)" }}>
        <div className="max-w-[1140px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-12">
          <div>
            <Link href="/" className="font-extrabold text-xl block mb-3.5" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--rd-font-heading)" }}>
              Opticini<span style={{ color: "var(--rd-blue-600)" }}>.</span>
            </Link>
            <p className="text-base leading-[1.65] mb-5" style={{ color: "var(--rd-text-secondary)" }}>
              One platform for discovery, operations, security, compliance, cost, and risk.
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
              Platform
            </p>
            <ul className="flex flex-col gap-3.5">
              {["Discovery", "Health", "Performance", "Security", "Configuration", "Compliance", "Evidence", "Change", "Cost", "Risk"].map((name) => (
                <li key={name}>
                  <Link href={`/features/${name.toLowerCase()}`} className="text-base hover:text-[var(--rd-blue-600)] transition-colors" style={{ color: "var(--rd-text-secondary)" }}>
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[13px] font-bold uppercase tracking-wider mb-5" style={{ color: "var(--rd-text-muted)", fontFamily: "var(--rd-font-heading)" }}>
              Company
            </p>
            <ul className="flex flex-col gap-3.5">
              <li><Link href="/about" className="text-base hover:text-[var(--rd-blue-600)] transition-colors" style={{ color: "var(--rd-text-secondary)" }}>About</Link></li>
              <li><Link href="/blog" className="text-base hover:text-[var(--rd-blue-600)] transition-colors" style={{ color: "var(--rd-text-secondary)" }}>Blog</Link></li>
              <li><Link href="/request-demo" className="text-base hover:text-[var(--rd-blue-600)] transition-colors" style={{ color: "var(--rd-text-secondary)" }}>Request Demo</Link></li>
              <li><Link href="/contact-sales" className="text-base hover:text-[var(--rd-blue-600)] transition-colors" style={{ color: "var(--rd-text-secondary)" }}>Contact Sales</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-[13px] font-bold uppercase tracking-wider mb-5" style={{ color: "var(--rd-text-muted)", fontFamily: "var(--rd-font-heading)" }}>
              Partnerships
            </p>
            <ul className="flex flex-col gap-3.5">
              <li><Link href="/partnerships/affiliates" className="text-base hover:text-[var(--rd-blue-600)] transition-colors" style={{ color: "var(--rd-text-secondary)" }}>Affiliates</Link></li>
              <li><Link href="/partnerships/consultants" className="text-base hover:text-[var(--rd-blue-600)] transition-colors" style={{ color: "var(--rd-text-secondary)" }}>Consultants</Link></li>
              <li><Link href="/partnerships/audit-partners" className="text-base hover:text-[var(--rd-blue-600)] transition-colors" style={{ color: "var(--rd-text-secondary)" }}>Audit Partners</Link></li>
              <li><Link href="/partnerships/technology-partners" className="text-base hover:text-[var(--rd-blue-600)] transition-colors" style={{ color: "var(--rd-text-secondary)" }}>Technology Partners</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-[13px] font-bold uppercase tracking-wider mb-5" style={{ color: "var(--rd-text-muted)", fontFamily: "var(--rd-font-heading)" }}>
              Verticals
            </p>
            <ul className="flex flex-col gap-3.5">
              {["Nonprofits", "Startups", "SMB", "Government", "Healthcare", "Fintech", "Education"].map((name) => (
                <li key={name}>
                  <Link href={`/verticals/${name.toLowerCase()}`} className="text-base hover:text-[var(--rd-blue-600)] transition-colors" style={{ color: "var(--rd-text-secondary)" }}>
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="min-w-[180px]">
            <p className="text-[13px] font-bold uppercase tracking-wider mb-5" style={{ color: "var(--rd-text-muted)", fontFamily: "var(--rd-font-heading)" }}>
              Frameworks
            </p>
            <ul className="flex flex-col gap-3.5">
              {[
                { name: "ISO/IEC 27002", slug: "iso-27002" },
                { name: "HIPAA Security Rule", slug: "hipaa" },
                { name: "SOC 2", slug: "soc2" },
                { name: "NIST SP 800-53", slug: "nist-800-53" },
                { name: "NIST Cybersecurity", slug: "nist-csf" },
                { name: "ISO/IEC 27001", slug: "iso-27001" },
                { name: "PCI DSS", slug: "pci-dss" },
                { name: "CIS Critical Security", slug: "cis-controls" },
              ].map(({ name, slug }) => (
                <li key={slug}>
                  <Link href={`/frameworks/${slug}`} className="text-base hover:text-[var(--rd-blue-600)] transition-colors whitespace-nowrap" style={{ color: "var(--rd-text-secondary)" }}>
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="py-5 px-4 sm:px-9 border-t" style={{ background: "var(--rd-bg-subtle)", borderColor: "var(--rd-border-light)" }}>
        <div className="max-w-[1140px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[15px]" style={{ color: "var(--rd-text-muted)" }}>
            © 2025 Opticini. All rights reserved.
          </p>
          <div className="flex gap-7">
            <Link href="/privacy" className="text-[15px] hover:text-[var(--rd-blue-600)] transition-colors" style={{ color: "var(--rd-text-muted)" }}>
              {t("footer.privacyPolicy")}
            </Link>
            <Link href="/terms" className="text-[15px] hover:text-[var(--rd-blue-600)] transition-colors" style={{ color: "var(--rd-text-muted)" }}>
              {t("footer.termsOfService")}
            </Link>
            <Link href="/cookies" className="text-[15px] hover:text-[var(--rd-blue-600)] transition-colors" style={{ color: "var(--rd-text-muted)" }}>
              {t("footer.cookiePolicy")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
