/**
 * Deep-merge for public-page JSON trees: objects merge recursively; arrays and
 * primitives from patch replace base. Used to layer landing-derived + sparse
 * locale patches over English canonical (PUBLIC_PAGES_EN).
 */
export function deepMergePublicPages(
  base: Record<string, unknown>,
  patch: Record<string, unknown> | undefined
): Record<string, unknown> {
  if (!patch || typeof patch !== "object") {
    return base
  }
  const out: Record<string, unknown> = { ...base }
  for (const key of Object.keys(patch)) {
    const pv = patch[key]
    const bv = out[key]
    if (
      pv !== null &&
      typeof pv === "object" &&
      !Array.isArray(pv) &&
      bv !== null &&
      typeof bv === "object" &&
      !Array.isArray(bv)
    ) {
      out[key] = deepMergePublicPages(
        bv as Record<string, unknown>,
        pv as Record<string, unknown>
      )
    } else {
      out[key] = pv
    }
  }
  return out
}

export function clonePublicPages(
  source: Record<string, unknown>
): Record<string, unknown> {
  return JSON.parse(JSON.stringify(source)) as Record<string, unknown>
}
