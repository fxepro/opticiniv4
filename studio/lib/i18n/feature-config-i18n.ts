import type { FeatureDetailConfig } from "@/components/feature-detail-page"

/** Text-only payload for i18n (colors stay in code). */
export function featureConfigToI18nPayload(
  config: FeatureDetailConfig
): Omit<FeatureDetailConfig, "colors"> {
  const { colors: _c, ...rest } = config
  return rest
}
