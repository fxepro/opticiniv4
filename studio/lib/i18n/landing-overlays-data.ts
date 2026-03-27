import type { LandingOverlay } from "./merge-landing"
import {
  ov,
  HOME_EN,
  NAV_EXTRA_EN,
  FOOTER_EXTRA_EN,
  HOME_ES,
  NAV_EXTRA_ES,
  FOOTER_EXTRA_ES,
} from "./landing-core"
import { extraLandingOverlays } from "./landing-rest-locales"

export const landingOverlays: Record<string, LandingOverlay> = {
  en: ov(HOME_EN, NAV_EXTRA_EN, FOOTER_EXTRA_EN),
  es: ov(HOME_ES as unknown as typeof HOME_EN, NAV_EXTRA_ES, FOOTER_EXTRA_ES),
  ...extraLandingOverlays,
}
