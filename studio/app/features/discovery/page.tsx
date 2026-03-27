import { FeatureDetailPage } from "@/components/feature-detail-page";
import { discoveryConfig } from "@/lib/feature-configs";

export default function DiscoveryPage() {
  return <FeatureDetailPage config={discoveryConfig} slug="discovery" />;
}
