"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/#platform", label: "Platform" },
  { href: "/about", label: "About" },
];

export function MainNavigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinkClass = (href: string) =>
    cn(
      "text-base font-medium px-4 py-2 rounded-md transition-colors",
      (pathname === href || (href === "/#platform" && pathname === "/")) || (href !== "/#platform" && pathname.startsWith(href))
        ? "text-[var(--rd-blue-600)] bg-[var(--rd-blue-50)]"
        : "text-[var(--rd-text-secondary)] hover:text-[var(--rd-blue-600)] hover:bg-[var(--rd-blue-50)]"
    );

  return (
    <nav
      className="sticky top-11 z-40 flex h-[68px] items-center px-4 sm:px-9 border-b"
      style={{ background: "var(--rd-bg-white)", borderColor: "var(--rd-border-light)", boxShadow: "0 1px 8px rgba(37,99,235,.06)", fontFamily: "var(--rd-font-body)" }}
    >
      <div className="max-w-[1200px] mx-auto w-full flex items-center gap-10">
        <Link href="/" className="font-extrabold text-[22px] tracking-tight shrink-0" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--rd-font-heading)" }}>
          Opticini<span style={{ color: "var(--rd-blue-600)" }}>.</span>
        </Link>
        <div className="hidden lg:flex items-center gap-0.5">
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className={navLinkClass(href)} onClick={() => href.startsWith("#") && setMobileMenuOpen(false)}>
              {label}
            </Link>
          ))}
        </div>
        <div className="flex-1" />
        <div className="hidden lg:flex items-center gap-2.5">
          <Link
            href="/request-demo"
            className="text-[15px] font-semibold px-5 py-2.5 rounded-md text-white transition-all"
            style={{ background: "var(--rd-blue-600)", boxShadow: "0 3px 14px rgba(37,99,235,.22)" }}
          >
            Request Demo
          </Link>
        </div>
        <button
          className="lg:hidden p-2 rounded-md text-[var(--rd-text-secondary)] hover:text-[var(--rd-blue-600)] hover:bg-[var(--rd-blue-50)]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 border-b bg-white/95 backdrop-blur-md" style={{ borderColor: "var(--rd-border-light)" }}>
          <div className="px-6 py-4 space-y-2">
            {NAV_LINKS.map(({ href, label }) => (
              <Link key={href} href={href} className={cn("block px-4 py-3 rounded-lg", navLinkClass(href))} onClick={() => setMobileMenuOpen(false)}>
                {label}
              </Link>
            ))}
            <div className="pt-4">
              <Link href="/request-demo" className="block w-full text-center py-3 rounded-lg text-white font-semibold" style={{ background: "var(--rd-blue-600)" }} onClick={() => setMobileMenuOpen(false)}>
                Request Demo
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
