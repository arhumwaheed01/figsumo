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

export function generateStaticParams() {
  return allCalculators
    .filter((tool) => tool.slug !== "scientific-calculator")
    .map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const tool = getCalculatorBySlug(slug);
  if (!tool || tool.slug === "scientific-calculator") return {};

  return createPageMetadata({
    title: tool.title,
    description: tool.description,
    path: tool.path,
  });
}

export default async function CalculatorSlugPage({ params }: Props) {
  const { slug } = await params;
  const tool = getCalculatorBySlug(slug);

  if (!tool || tool.slug === "scientific-calculator") notFound();

  return <CalculatorToolPage tool={tool} />;
}
