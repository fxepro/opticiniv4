import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { mergeAllLocaleContent } from './merge-public-pages'
import { landingOverlays } from './landing-overlays-data'

// Import translation files - Recommended SaaS language set
import enTranslations from '../locales/en/common.json'
import esTranslations from '../locales/es/common.json'
import frTranslations from '../locales/fr/common.json'
import deTranslations from '../locales/de/common.json'
import itTranslations from '../locales/it/common.json'
import ptTranslations from '../locales/pt/common.json'
import ruTranslations from '../locales/ru/common.json'
import svTranslations from '../locales/sv/common.json'
import noTranslations from '../locales/no/common.json'
import daTranslations from '../locales/da/common.json'
import zhTranslations from '../locales/zh/common.json'
import jaTranslations from '../locales/ja/common.json'
import koTranslations from '../locales/ko/common.json'
import hiTranslations from '../locales/hi/common.json'
import arTranslations from '../locales/ar/common.json'
import heTranslations from '../locales/he/common.json'

function withFullI18n(
  base: Record<string, unknown>,
  lng: string
): Record<string, unknown> {
  return mergeAllLocaleContent(base, lng, landingOverlays)
}

const resources = {
  en: { translation: withFullI18n(enTranslations as Record<string, unknown>, 'en') },
  es: { translation: withFullI18n(esTranslations as Record<string, unknown>, 'es') },
  fr: { translation: withFullI18n(frTranslations as Record<string, unknown>, 'fr') },
  de: { translation: withFullI18n(deTranslations as Record<string, unknown>, 'de') },
  it: { translation: withFullI18n(itTranslations as Record<string, unknown>, 'it') },
  pt: { translation: withFullI18n(ptTranslations as Record<string, unknown>, 'pt') },
  ru: { translation: withFullI18n(ruTranslations as Record<string, unknown>, 'ru') },
  sv: { translation: withFullI18n(svTranslations as Record<string, unknown>, 'sv') },
  no: { translation: withFullI18n(noTranslations as Record<string, unknown>, 'no') },
  da: { translation: withFullI18n(daTranslations as Record<string, unknown>, 'da') },
  zh: { translation: withFullI18n(zhTranslations as Record<string, unknown>, 'zh') },
  ja: { translation: withFullI18n(jaTranslations as Record<string, unknown>, 'ja') },
  ko: { translation: withFullI18n(koTranslations as Record<string, unknown>, 'ko') },
  hi: { translation: withFullI18n(hiTranslations as Record<string, unknown>, 'hi') },
  ar: { translation: withFullI18n(arTranslations as Record<string, unknown>, 'ar') },
  he: { translation: withFullI18n(heTranslations as Record<string, unknown>, 'he') },
}

/**
 * Initial language must match SSR (`en`) so the first client render hydrates without text mismatches.
 * User preference (localStorage / navigator) is applied after mount in `I18nProvider`.
 */
const initConfig = {
  resources,
  fallbackLng: 'en',
  lng: 'en',
  defaultNS: 'translation',
  interpolation: {
    escapeValue: false, // React already escapes values
  },
  react: {
    useSuspense: false, // Disable suspense for better compatibility
  },
}

i18n.use(initReactI18next).init(initConfig)

export default i18n

