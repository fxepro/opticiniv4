/** Deep-enough merge for landing i18n overlays into locale bundles. */
export function mergeLandingOverlay(
  base: Record<string, unknown>,
  lng: string,
  overlayByLng: Record<string, LandingOverlay>
): Record<string, unknown> {
  const primary = lng.split("-")[0]
  const overlay =
    overlayByLng[lng] ?? overlayByLng[primary] ?? overlayByLng.en
  const b = base as Record<string, any>
  const foot = overlay.footer
  return {
    ...b,
    home: overlay.home,
    navigation: {
      ...b.navigation,
      ...overlay.navigation,
      ...(foot.linkBlog ? { blog: foot.linkBlog } : {}),
    },
    footer: { ...b.footer, ...foot },
  }
}

export type LandingOverlay = {
  home: Record<string, unknown>
  navigation: Record<string, string>
  footer: Record<string, string>
}
