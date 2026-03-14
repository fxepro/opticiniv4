import { FeatureDetailPage } from "@/components/feature-detail-page";
import { changeConfig } from "@/lib/feature-configs";

export default function ChangePage() {
  return <FeatureDetailPage config={changeConfig} />;
}
