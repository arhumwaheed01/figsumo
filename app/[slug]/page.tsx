import { Suspense } from "react";
import { notFound } from "next/navigation";
import { CalculatorToolPage } from "@/components/calc/CalculatorToolPage";
import {
  allCalculators,
  getCalculatorBySlug,
} from "@/lib/calculators";
import { createPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

/** Only slugs from generateStaticParams exist — unknown paths are real 404s. */
export const dynamicParams = false;

export function generateStaticParams() {
  return allCalculators
    .filter((tool) => tool.slug !== "scientific-calculator")
    .map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const tool = getCalculatorBySlug(slug);
  if (!tool || tool.slug === "scientific-calculator") {
    return { robots: { index: false, follow: false } };
  }

  return createPageMetadata({
    title: tool.title,
    description: tool.description,
    path: tool.path,
  });
}

function CalculatorSlugFallback() {
  return (
    <article
      className="py-8 sm:py-12"
      aria-busy="true"
      aria-label="Loading calculator"
    >
      <header className="mb-8 max-w-3xl">
        <div className="h-4 w-40 animate-pulse rounded bg-ink/10" />
        <div className="mt-3 h-10 w-3/4 max-w-xl animate-pulse rounded bg-ink/10" />
        <div className="mt-4 h-5 w-full max-w-2xl animate-pulse rounded bg-ink/10" />
      </header>
      <div className="h-80 animate-pulse rounded-xl bg-ink/5" />
    </article>
  );
}

async function CalculatorSlugDetails({ params }: Props) {
  const { slug } = await params;
  const tool = getCalculatorBySlug(slug);

  if (!tool || tool.slug === "scientific-calculator") notFound();

  return <CalculatorToolPage tool={tool} />;
}

export default function CalculatorSlugPage({ params }: Props) {
  return (
    <Suspense fallback={<CalculatorSlugFallback />}>
      <CalculatorSlugDetails params={params} />
    </Suspense>
  );
}
