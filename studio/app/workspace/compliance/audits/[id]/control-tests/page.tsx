"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ListChecks } from "lucide-react";
import Link from "next/link";

/**
 * Control Test Cases — future implementation.
 * Not in product yet. Redirect to audits list.
 */
export default function AuditControlTestsPage() {
  const router = useRouter();
  const params = useParams();
  const auditId = params?.id as string;

  useEffect(() => {
    router.replace("/workspace/compliance/audits");
  }, [router]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/workspace/compliance/audits">
            <ListChecks className="h-6 w-6" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <ListChecks className="h-6 w-6" />
            Control test cases
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Coming soon — redirecting to audits…
          </p>
        </div>
      </div>
      <Button variant="outline" asChild>
        <Link href="/workspace/compliance/audits">Back to audits</Link>
      </Button>
    </div>
  );
}
