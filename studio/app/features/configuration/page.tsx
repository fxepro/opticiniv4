import { FeatureDetailPage } from "@/components/feature-detail-page";
import { configurationConfig } from "@/lib/feature-configs";

export default function ConfigurationPage() {
  return <FeatureDetailPage config={configurationConfig} slug="configuration" />;
}
