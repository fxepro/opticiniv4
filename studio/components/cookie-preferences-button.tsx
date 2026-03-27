"use client";

import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

const CONSENT_KEY = "cookie_consent";

export function CookiePreferencesButton() {
  const handleClick = () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(CONSENT_KEY);
    window.dispatchEvent(new CustomEvent("cookie-consent-reset"));
    window.location.reload();
  };

  return (
    <Button variant="outline" size="sm" onClick={handleClick} className="gap-2">
      <Settings className="h-4 w-4" />
      Manage cookie preferences
    </Button>
  );
}
