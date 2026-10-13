import { notFound } from "next/navigation";
import { PlannedCalculator } from "@/components/PlannedCalculator";
import {
  allCalculators,
  getCalculatorBySlug,
} from "@/lib/calculators";
import { createPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return allCalculators
    .filter((tool) => tool.status === "planned")
    .map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const tool = getCalculatorBySlug(slug);
  if (!tool || tool.status === "live") return {};

  return createPageMetadata({
    title: tool.title,
    description: `${tool.description} Coming soon on Figsumo.`,
    path: tool.path,
    noIndex: true,
  });
}

export default async function CalculatorSlugPage({ params }: Props) {
  const { slug } = await params;
  const tool = getCalculatorBySlug(slug);

  if (!tool || tool.status === "live") notFound();

  return <PlannedCalculator tool={tool} />;
}
