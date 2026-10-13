"use client";

import { FormulaCalculator } from "@/components/calc/FormulaCalculator";
import { RelatedLinks } from "@/components/calc/RelatedLinks";
import { ScientificCalculator } from "@/components/ScientificCalculator";
import { calculatorCategories } from "@/lib/calculators";
import { getCalcDef } from "@/lib/calc/registry";

function relatedFor(slug: string) {
  const category = calculatorCategories.find((c) =>
    c.items.some((item) => item.slug === slug),
  );
  if (!category) return [];
  return category.items
    .filter((item) => item.slug !== slug)
    .slice(0, 8)
    .map((item) => ({ href: item.path, title: item.title }));
}

export function CalculatorTool({ slug }: { slug: string }) {
  const related = relatedFor(slug);

  if (slug === "scientific-calculator") {
    return (
      <div className="space-y-6">
        <ScientificCalculator />
        <RelatedLinks items={related} />
      </div>
    );
  }

  const def = getCalcDef(slug);

  if (!def) {
    return (
      <p className="rounded-xl border border-ink/15 px-4 py-3 text-sm text-ink/70">
        Calculator not found.
      </p>
    );
  }

  return (
    <FormulaCalculator
      fields={def.fields}
      compute={def.compute}
      related={related}
    />
  );
}
