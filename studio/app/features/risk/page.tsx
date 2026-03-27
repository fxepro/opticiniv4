import { FeatureDetailPage } from "@/components/feature-detail-page";
import { riskConfig } from "@/lib/feature-configs";

export default function RiskPage() {
  return <FeatureDetailPage config={riskConfig} slug="risk" />;
}
