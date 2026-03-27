import type { LandingOverlay } from "./merge-landing"

/** Build partial public-pages patch from the same landing overlay as the homepage (all 16 locales). */
export function derivePublicPagesFromLanding(
  landing: LandingOverlay
): Record<string, unknown> {
  const home = landing.home as Record<string, unknown>
  const nav = landing.navigation as Record<string, string>
  const foot = landing.footer as Record<string, string>

  const platform = (home?.platform ?? {}) as {
    learnMore?: string
    planes?: { slug: string; title: string; tagline: string }[]
  }
  const finalCta = (home?.finalCta ?? {}) as {
    requestDemo?: string
  }

  const requestDemo = foot.requestDemo ?? finalCta.requestDemo ?? "Request Demo"
  const learnMore = platform.learnMore ?? "Learn more →"

  const patch: Record<string, unknown> = {
    featureUi: {
      requestDemo,
      seeIntegrations: learnMore,
    },
    blog: {
      heroTitle: foot.linkBlog,
    },
    about: {
      heroBadge: foot.linkAbout,
    },
    consult: {
      heroBadge: nav.talkToSales,
      requestDemo,
    },
    upgrade: {
      requestDemo,
      learnPartner: foot.linkConsultants,
    },
    workspaceOverview: {
      badge: nav.workspace,
    },
  }

  const planes = platform.planes
  if (Array.isArray(planes) && planes.length > 0) {
    const featuresPatch: Record<string, unknown> = {}
    for (const p of planes) {
      if (!p?.slug || !p.title) continue
      const slice: Record<string, unknown> = { title: p.title }
      if (p.tagline) slice.subtitle = p.tagline
      featuresPatch[p.slug] = slice
    }
    if (Object.keys(featuresPatch).length > 0) {
      patch.features = featuresPatch
    }
  }

  return patch
}
