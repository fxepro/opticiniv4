import type { LandingOverlay } from "./merge-landing"
import { mergeLandingOverlay } from "./merge-landing"
import { clonePublicPages, deepMergePublicPages } from "./deep-merge-public-pages"
import { derivePublicPagesFromLanding } from "./derive-public-pages-from-landing"
import { DISCOVERY_PAGE_PATCH_BY_LANG } from "./features/discovery-page-i18n"
import { COMPLIANCE_PAGE_PATCH_BY_LANG } from "./features/compliance-page-i18n"
import { HEALTH_PAGE_PATCH_BY_LANG } from "./features/health-page-i18n"
import { PERFORMANCE_PAGE_PATCH_BY_LANG } from "./features/performance-page-i18n"
import { SECURITY_PAGE_PATCH_BY_LANG } from "./features/security-page-i18n"
import { CONFIGURATION_PAGE_PATCH_BY_LANG } from "./features/configuration-page-i18n"
import { EVIDENCE_PAGE_PATCH_BY_LANG } from "./features/evidence-page-i18n"
import { CHANGE_PAGE_PATCH_BY_LANG } from "./features/change-page-i18n"
import { COST_PAGE_PATCH_BY_LANG } from "./features/cost-page-i18n"
import { RISK_PAGE_PATCH_BY_LANG } from "./features/risk-page-i18n"
import { CONTACT_SALES_PAGE_PATCH_BY_LANG } from "./contact-sales-page-i18n"
import { REQUEST_DEMO_PAGE_PATCH_BY_LANG } from "./request-demo-page-i18n"
import { PRIVACY_PAGE_PATCH_BY_LANG } from "./privacy-page-i18n"
import { TERMS_PAGE_PATCH_BY_LANG } from "./terms-page-i18n"
import { ABOUT_PAGE_PATCH_BY_LANG } from "./about-page-i18n"
import { BLOG_PAGE_PATCH_BY_LANG } from "./blog-page-i18n"
import { CONSULT_PAGE_PATCH_BY_LANG } from "./consult-page-i18n"
import { WORKSPACE_LOGIN_PAGE_PATCH_BY_LANG } from "./workspace-login-page-i18n"
import { PUBLIC_PAGES_SPARSE_BY_LANG } from "./public-pages-locale-overlays"
import { PUBLIC_PAGES_EN } from "./public-pages-en"

function shallowMergeTop(
  base: Record<string, unknown>,
  patch: Record<string, unknown>
): Record<string, unknown> {
  const out = { ...base }
  for (const k of Object.keys(patch)) {
    const pv = patch[k]
    const bv = out[k]
    if (
      pv !== null &&
      typeof pv === "object" &&
      !Array.isArray(pv) &&
      bv !== null &&
      typeof bv === "object" &&
      !Array.isArray(bv)
    ) {
      out[k] = { ...(bv as object), ...(pv as object) }
    } else {
      out[k] = pv
    }
  }
  return out
}

const CANONICAL_EN = PUBLIC_PAGES_EN as unknown as Record<string, unknown>

/**
 * Same resolution as landing: exact lng → primary → en.
 * 1) Clone English canonical public-pages tree
 * 2) Deep-merge strings/plane titles from this locale's landing overlay (homepage source of truth)
 * 3) Deep-merge sparse locale patches (e.g. full feedback translations)
 */
export function buildPublicPagesBundle(
  lng: string,
  landingOverlays: Record<string, LandingOverlay>
): Record<string, unknown> {
  const primary = lng.split("-")[0]
  const landing =
    landingOverlays[lng] ??
    landingOverlays[primary] ??
    landingOverlays.en

  let bundle = clonePublicPages(CANONICAL_EN)
  bundle = deepMergePublicPages(
    bundle,
    derivePublicPagesFromLanding(landing) as Record<string, unknown>
  )
  const sparse = PUBLIC_PAGES_SPARSE_BY_LANG[primary]
  if (sparse) {
    bundle = deepMergePublicPages(bundle, sparse)
  }
  const discoveryPatch = DISCOVERY_PAGE_PATCH_BY_LANG[primary]
  if (discoveryPatch) {
    bundle = deepMergePublicPages(bundle, discoveryPatch as Record<string, unknown>)
  }
  const compliancePatch = COMPLIANCE_PAGE_PATCH_BY_LANG[primary]
  if (compliancePatch) {
    bundle = deepMergePublicPages(bundle, compliancePatch as Record<string, unknown>)
  }
  const healthPatch = HEALTH_PAGE_PATCH_BY_LANG[primary]
  if (healthPatch) {
    bundle = deepMergePublicPages(bundle, healthPatch as Record<string, unknown>)
  }
  const performancePatch = PERFORMANCE_PAGE_PATCH_BY_LANG[primary]
  if (performancePatch) {
    bundle = deepMergePublicPages(bundle, performancePatch as Record<string, unknown>)
  }
  const securityPatch = SECURITY_PAGE_PATCH_BY_LANG[primary]
  if (securityPatch) {
    bundle = deepMergePublicPages(bundle, securityPatch as Record<string, unknown>)
  }
  const configurationPatch = CONFIGURATION_PAGE_PATCH_BY_LANG[primary]
  if (configurationPatch) {
    bundle = deepMergePublicPages(bundle, configurationPatch as Record<string, unknown>)
  }
  const evidencePatch = EVIDENCE_PAGE_PATCH_BY_LANG[primary]
  if (evidencePatch) {
    bundle = deepMergePublicPages(bundle, evidencePatch as Record<string, unknown>)
  }
  const changePatch = CHANGE_PAGE_PATCH_BY_LANG[primary]
  if (changePatch) {
    bundle = deepMergePublicPages(bundle, changePatch as Record<string, unknown>)
  }
  const costPatch = COST_PAGE_PATCH_BY_LANG[primary]
  if (costPatch) {
    bundle = deepMergePublicPages(bundle, costPatch as Record<string, unknown>)
  }
  const riskPatch = RISK_PAGE_PATCH_BY_LANG[primary]
  if (riskPatch) {
    bundle = deepMergePublicPages(bundle, riskPatch as Record<string, unknown>)
  }
  const contactSalesPatch = CONTACT_SALES_PAGE_PATCH_BY_LANG[primary]
  if (contactSalesPatch) {
    bundle = deepMergePublicPages(bundle, contactSalesPatch as Record<string, unknown>)
  }
  const requestDemoPatch = REQUEST_DEMO_PAGE_PATCH_BY_LANG[primary]
  if (requestDemoPatch) {
    bundle = deepMergePublicPages(bundle, requestDemoPatch as Record<string, unknown>)
  }
  const privacyPatch = PRIVACY_PAGE_PATCH_BY_LANG[primary]
  if (privacyPatch) {
    bundle = deepMergePublicPages(bundle, privacyPatch as Record<string, unknown>)
  }
  const termsPatch = TERMS_PAGE_PATCH_BY_LANG[primary]
  if (termsPatch) {
    bundle = deepMergePublicPages(bundle, termsPatch as Record<string, unknown>)
  }
  const aboutPatch = ABOUT_PAGE_PATCH_BY_LANG[primary]
  if (aboutPatch) {
    bundle = deepMergePublicPages(bundle, aboutPatch as Record<string, unknown>)
  }
  const blogPatch = BLOG_PAGE_PATCH_BY_LANG[primary]
  if (blogPatch) {
    bundle = deepMergePublicPages(bundle, blogPatch as Record<string, unknown>)
  }
  const consultPatch = CONSULT_PAGE_PATCH_BY_LANG[primary]
  if (consultPatch) {
    bundle = deepMergePublicPages(bundle, consultPatch as Record<string, unknown>)
  }
  const workspaceLoginPatch = WORKSPACE_LOGIN_PAGE_PATCH_BY_LANG[primary]
  if (workspaceLoginPatch) {
    bundle = deepMergePublicPages(bundle, workspaceLoginPatch as Record<string, unknown>)
  }
  return bundle
}

/** Landing (home / nav / footer) plus public pages (canonical + landing-derived + sparse). */
export function mergeAllLocaleContent(
  base: Record<string, unknown>,
  lng: string,
  landingOverlays: Record<string, LandingOverlay>
): Record<string, unknown> {
  const step1 = mergeLandingOverlay(base, lng, landingOverlays)
  const publicPages = buildPublicPagesBundle(lng, landingOverlays)
  return shallowMergeTop(step1 as Record<string, unknown>, publicPages)
}
