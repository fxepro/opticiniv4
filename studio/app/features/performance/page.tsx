import { FeatureDetailPage } from "@/components/feature-detail-page";
import { performanceConfig } from "@/lib/feature-configs";

export default function PerformancePage() {
  return <FeatureDetailPage config={performanceConfig} />;
}
