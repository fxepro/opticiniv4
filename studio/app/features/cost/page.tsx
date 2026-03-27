import { FeatureDetailPage } from "@/components/feature-detail-page";
import { costConfig } from "@/lib/feature-configs";

export default function CostPage() {
  return <FeatureDetailPage config={costConfig} slug="cost" />;
}
