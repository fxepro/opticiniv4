import { FeatureDetailPage } from "@/components/feature-detail-page";
import { securityConfig } from "@/lib/feature-configs";

export default function SecurityPage() {
  return <FeatureDetailPage config={securityConfig} slug="security" />;
}
