import { FeatureDetailPage } from "@/components/feature-detail-page";
import { complianceConfig } from "@/lib/feature-configs";

export default function CompliancePage() {
  return <FeatureDetailPage config={complianceConfig} slug="compliance" />;
}
