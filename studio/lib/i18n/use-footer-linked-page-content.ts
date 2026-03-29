"use client"

import { useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import type { PartnershipContent } from "@/lib/partnerships-data"
import type { VerticalContent } from "@/lib/verticals-data"
import type { FrameworkContent } from "@/lib/frameworks-data"

function isRecord(v: unknown): v is Record<string, unknown> {
  return v !== null && typeof v === "object" && !Array.isArray(v)
}

/** After hydration, resolve full page object from merged i18n bundle; before hydration, keep server English. */
export function usePartnershipPageContent(content: PartnershipContent): PartnershipContent {
  const { t, i18n } = useTranslation()
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => setHydrated(true), [])

  return useMemo(() => {
    if (!hydrated) return content
    const key = `partnershipsPages.${content.slug}`
    const obj = t(key, { returnObjects: true })
    if (isRecord(obj) && typeof obj.title === "string") {
      return { ...(obj as unknown as PartnershipContent), ctaHref: content.ctaHref }
    }
    return content
  }, [hydrated, t, i18n.language, content])
}

export function useVerticalPageContent(content: VerticalContent): VerticalContent {
  const { t, i18n } = useTranslation()
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => setHydrated(true), [])

  return useMemo(() => {
    if (!hydrated) return content
    const key = `verticalsPages.${content.slug}`
    const obj = t(key, { returnObjects: true })
    if (isRecord(obj) && typeof obj.title === "string") {
      return obj as unknown as VerticalContent
    }
    return content
  }, [hydrated, t, i18n.language, content])
}

export function useFrameworkPageContent(content: FrameworkContent): FrameworkContent {
  const { t, i18n } = useTranslation()
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => setHydrated(true), [])

  return useMemo(() => {
    if (!hydrated) return content
    const key = `frameworksPages.${content.slug}`
    const obj = t(key, { returnObjects: true })
    if (isRecord(obj) && typeof obj.title === "string") {
      return obj as unknown as FrameworkContent
    }
    return content
  }, [hydrated, t, i18n.language, content])
}
