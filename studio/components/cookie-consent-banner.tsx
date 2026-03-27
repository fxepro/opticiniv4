"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Cookie } from "lucide-react";

const CONSENT_KEY = "cookie_consent";
const CONSENT_VERSION = "1";

export type ConsentStatus = "pending" | "accepted" | "rejected";

export function getConsent(): { analytics: boolean; status: ConsentStatus } | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    if (parsed?.version !== CONSENT_VERSION) return null;
    return {
      analytics: !!parsed.analytics,
      status: parsed.status || "pending",
    };
  } catch {
    return null;
  }
}

export function setConsent(analytics: boolean) {
  if (typeof window === "undefined") return;
  const status: ConsentStatus = analytics ? "accepted" : "rejected";
  localStorage.setItem(
    CONSENT_KEY,
    JSON.stringify({
      version: CONSENT_VERSION,
      analytics,
      status,
      timestamp: new Date().toISOString(),
    })
  );
}

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getConsent();
    if (!consent) {
      setVisible(true);
    }

    const onReset = () => setVisible(true);
    window.addEventListener("cookie-consent-reset", onReset);
    return () => window.removeEventListener("cookie-consent-reset", onReset);
  }, []);

  const handleAccept = () => {
    setConsent(true);
    setVisible(false);
    window.dispatchEvent(new CustomEvent("cookie-consent-updated", { detail: { analytics: true } }));
  };

  const handleReject = () => {
    setConsent(false);
    setVisible(false);
    window.dispatchEvent(new CustomEvent("cookie-consent-updated", { detail: { analytics: false } }));
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[9999] p-4 shadow-lg border-t"
      style={{
        background: "var(--rd-bg-white)",
        borderColor: "var(--rd-border-light)",
      }}
    >
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: "var(--rd-bg-subtle)" }}
          >
            <Cookie className="h-5 w-5" style={{ color: "var(--rd-blue-600)" }} />
          </div>
          <div>
            <p className="font-semibold text-sm" style={{ color: "var(--rd-text-heading)" }}>
              We use cookies
            </p>
            <p className="text-sm mt-0.5" style={{ color: "var(--rd-text-secondary)" }}>
              We use essential cookies for the site to work and optional analytics cookies to improve your experience.{" "}
              <Link href="/cookies" className="underline hover:no-underline" style={{ color: "var(--rd-blue-600)" }}>
                Cookie Policy
              </Link>
              {" · "}
              <Link href="/privacy" className="underline hover:no-underline" style={{ color: "var(--rd-blue-600)" }}>
                Privacy
              </Link>
            </p>
          </div>
        </div>
        <div className="flex gap-2 w-full sm:w-auto shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReject}
            className="rounded-lg"
            style={{ borderColor: "var(--rd-border-light)" }}
          >
            Essential only
          </Button>
          <Button
            size="sm"
            onClick={handleAccept}
            className="rounded-lg"
            style={{ background: "var(--rd-blue-600)", color: "#fff" }}
          >
            Accept all
          </Button>
        </div>
      </div>
    </div>
  );
}
