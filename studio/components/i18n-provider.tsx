"use client"

import { useEffect } from "react"
import { I18nextProvider } from "react-i18next"
import { i18n } from "@/lib/i18n"

const SUPPORTED = new Set([
  "en",
  "es",
  "fr",
  "de",
  "it",
  "pt",
  "ru",
  "sv",
  "no",
  "da",
  "zh",
  "ja",
  "ko",
  "hi",
  "ar",
  "he",
])

function resolveClientLanguage(): string {
  const stored = localStorage.getItem("preferred_language")
  if (stored && SUPPORTED.has(stored)) return stored

  const candidates = navigator.languages?.length
    ? navigator.languages
    : [navigator.language || "en"]
  for (const raw of candidates) {
    const code = (raw || "en").split("-")[0]?.toLowerCase() || "en"
    if (SUPPORTED.has(code)) return code
  }
  return "en"
}

/**
 * I18n Provider - Wraps the app with i18next context
 * This ensures translations are available throughout the app
 */
export function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lang = resolveClientLanguage()
    if (lang !== i18n.language) {
      void i18n.changeLanguage(lang)
    }

    // Listen for language changes from LanguageSelector
    const handleLanguageChange = (event: CustomEvent) => {
      const next = event.detail?.lang
      if (next && i18n.language !== next) {
        void i18n.changeLanguage(next)
      }
    }

    window.addEventListener("languageChanged", handleLanguageChange as EventListener)

    return () => {
      window.removeEventListener("languageChanged", handleLanguageChange as EventListener)
    }
  }, [])

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}

