"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { MessageCircle, BarChart3, LogOut, User, FileText } from "lucide-react";
import { LanguageSelector } from "@/components/language-selector";
import { useTranslation } from "react-i18next";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? (typeof window !== "undefined" ? "" : "http://localhost:8000");

export function TopNavigation() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    const checkAuthState = () => {
      if (typeof window === "undefined") return;
      const token = localStorage.getItem("access_token");
      setLoggedIn(!!token);
    };
    checkAuthState();
    window.addEventListener("storage", checkAuthState);
    return () => window.removeEventListener("storage", checkAuthState);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setLoggedIn(!!localStorage.getItem("access_token"));
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("pagerodeo_analysis_state");
    setLoggedIn(false);
    router.push("/");
  };

  const tr = (key: string, fallback: string) => (hydrated ? t(key) : fallback);

  const navLink = (href: string, label: string, Icon?: React.ComponentType<{ className?: string }>) => (
    <Link
      href={href}
      className={cn(
        "text-sm px-3 py-1.5 rounded-md transition-colors",
        pathname === href || pathname.startsWith(href + "/")
          ? "text-[var(--rd-blue-600)] bg-[var(--rd-blue-50)] font-semibold"
          : "text-[var(--rd-text-secondary)] hover:text-[var(--rd-blue-600)] hover:bg-[var(--rd-blue-50)]"
      )}
    >
      {Icon && <Icon className="h-3.5 w-3.5 mr-1 inline" />}
      {label}
    </Link>
  );

  return (
    <nav
      className="sticky top-0 z-50 flex h-11 items-center justify-between px-4 sm:px-9 border-b"
      style={{ background: "var(--rd-bg-white)", borderColor: "var(--rd-border-light)", fontFamily: "var(--rd-font-body)" }}
    >
      <div className="hidden sm:flex items-center gap-2 text-sm" style={{ color: "var(--rd-text-muted)" }}>
        <span className="w-[7px] h-[7px] rounded-full bg-[var(--rd-emerald-500)] animate-pulse" />
        {tr("navigation.allSystemsOperational", "All systems operational")}
        <span className="mx-1" style={{ color: "var(--rd-text-faint)" }}>·</span>
        <Link href="/contact-sales" className="hover:text-[var(--rd-blue-600)] transition-colors">
          {tr("navigation.talkToSales", "Talk to Sales")}
        </Link>
      </div>
      <div className="flex items-center gap-0.5 ml-auto">
        <LanguageSelector />
        {navLink("/blog", tr("navigation.blog", "Blog"), FileText)}
        {navLink("/feedback", tr("navigation.feedback", "Feedback"), MessageCircle)}
        {navLink("/consult", tr("navigation.consult", "Consult"), User)}
        {navLink("/upgrade", tr("navigation.upgrade", "Upgrade"), BarChart3)}
        <div className="w-px h-4 mx-1.5" style={{ background: "var(--rd-border-light)" }} />
        {navLink(loggedIn ? "/workspace" : "/workspace/login", tr("navigation.workspace", "Workspace"), User)}
        {loggedIn && (
          <button
            onClick={handleLogout}
            className="text-sm px-3 py-1.5 rounded-md text-[var(--rd-text-secondary)] hover:text-[var(--rd-blue-600)] hover:bg-[var(--rd-blue-50)] transition-colors"
          >
            <LogOut className="h-3.5 w-3.5 mr-1 inline" />
            {tr("navigation.logout", "Logout")}
          </button>
        )}
      </div>
    </nav>
  );
}
