import type { i18n as I18nInstance } from "i18next"

/** Primary language code for resource bundles (resources use `it`, not `it-IT`). */
function primaryLng(i18n: I18nInstance): string {
  return (i18n.resolvedLanguage || i18n.language || "en").split("-")[0]
}

/**
 * Read `translation.features[slug]` from the merged bundle.
 * Avoids `t(\`features.${slug}\`, { returnObjects: true })` which breaks for slugs
 * that collide with top-level keys in common.json (e.g. `performance`, `change`).
 */
export function getFeaturesPlaneResource(
  i18n: I18nInstance,
  slug: string
): unknown {
  const tryCode = (code: string) => {
    const root = i18n.getResourceBundle(code, "translation") as
      | Record<string, unknown>
      | undefined
    const features = root?.features as Record<string, unknown> | undefined
    return features?.[slug]
  }
  const p = tryCode(primaryLng(i18n))
  if (p && typeof p === "object" && !Array.isArray(p)) return p
  if (primaryLng(i18n) !== "en") {
    const en = tryCode("en")
    if (en && typeof en === "object" && !Array.isArray(en)) return en
  }
  return undefined
}

/** Same source as homepage platform section — avoids `t()` path quirks. */
export function getHomePlatformPlanesResource(i18n: I18nInstance): {
  slug: string
  title: string
  tagline?: string
}[] {
  const tryCode = (code: string) => {
    const root = i18n.getResourceBundle(code, "translation") as
      | Record<string, unknown>
      | undefined
    const home = root?.home as Record<string, unknown> | undefined
    const platform = home?.platform as Record<string, unknown> | undefined
    const planes = platform?.planes
    if (Array.isArray(planes) && planes.length > 0) {
      return planes as { slug: string; title: string; tagline?: string }[]
    }
    return undefined
  }
  return tryCode(primaryLng(i18n)) ?? tryCode("en") ?? []
}
