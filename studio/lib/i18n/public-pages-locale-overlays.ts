/**
 * Sparse overrides layered after landing-derived + English canonical.
 * Add per-locale keys here only when you need full page copy (e.g. feedback form).
 */
import { FEEDBACK_BY_LANG } from "./public-pages-feedback-by-lang"

export const PUBLIC_PAGES_SPARSE_BY_LANG: Record<string, Record<string, unknown>> =
  Object.fromEntries(
    Object.entries(FEEDBACK_BY_LANG).map(([lang, feedback]) => [
      lang,
      { feedback: feedback as unknown as Record<string, unknown> },
    ])
  )
