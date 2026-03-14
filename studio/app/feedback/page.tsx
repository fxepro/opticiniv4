import { Suspense } from "react";
import FeedbackMain from "@/components/feedback-main";

export default function FeedbackPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--rd-bg-page)" }}>
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--rd-blue-600)]"></div>
        </div>
      }>
        <FeedbackMain />
      </Suspense>
    </div>
  );
}
