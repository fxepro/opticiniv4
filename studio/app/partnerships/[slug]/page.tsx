import { notFound } from "next/navigation";
import { getPartnershipBySlug, getAllPartnershipSlugs } from "@/lib/partnerships-data";
import { PartnershipPageTemplate } from "@/components/partnership-page-template";

export function generateStaticParams() {
  return getAllPartnershipSlugs().map((slug) => ({ slug }));
}

export default async function PartnershipPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = getPartnershipBySlug(slug);

  if (!content) {
    notFound();
  }

  return <PartnershipPageTemplate content={content} />;
}
