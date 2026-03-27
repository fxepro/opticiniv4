import { FeatureDetailPage } from "@/components/feature-detail-page";
import { healthConfig } from "@/lib/feature-configs";

export default function HealthPage() {
  return <FeatureDetailPage config={healthConfig} slug="health" />;
}
