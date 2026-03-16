import { notFound } from "next/navigation";
import { getFrameworkBySlug, getAllFrameworkSlugs } from "@/lib/frameworks-data";
import { FrameworkPageTemplate } from "@/components/framework-page-template";

export function generateStaticParams() {
  return getAllFrameworkSlugs().map((slug) => ({ slug }));
}

export default async function FrameworkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = getFrameworkBySlug(slug);

  if (!content) {
    notFound();
  }

  return <FrameworkPageTemplate content={content} />;
}
