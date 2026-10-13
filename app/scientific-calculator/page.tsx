import { notFound } from "next/navigation";
import { CalculatorToolPage } from "@/components/calc/CalculatorToolPage";
import { getCalculatorBySlug } from "@/lib/calculators";
import { createToolMetadata } from "@/lib/seo";

const tool = getCalculatorBySlug("scientific-calculator");

export const metadata = tool
  ? createToolMetadata({
      slug: tool.slug,
      path: tool.path,
      title: tool.title,
      shortTitle: "Scientific",
      description: tool.description,
    })
  : {};

export default function ScientificCalculatorPage() {
  if (!tool) notFound();
  return <CalculatorToolPage tool={tool} />;
}
