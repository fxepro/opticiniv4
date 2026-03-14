import { notFound } from "next/navigation";
import { getVerticalBySlug, getAllVerticalSlugs } from "@/lib/verticals-data";
import { VerticalPageTemplate } from "@/components/vertical-page-template";

export function generateStaticParams() {
  return getAllVerticalSlugs().map((slug) => ({ slug }));
}

export default async function VerticalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = getVerticalBySlug(slug);

  if (!content) {
    notFound();
  }

  return <VerticalPageTemplate content={content} />;
}
