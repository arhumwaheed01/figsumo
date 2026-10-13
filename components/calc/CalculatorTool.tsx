"use client";

import { FormulaCalculator } from "@/components/calc/FormulaCalculator";
import { ScientificCalculator } from "@/components/ScientificCalculator";
import { getCalcDef } from "@/lib/calc/registry";

export function CalculatorTool({ slug }: { slug: string }) {
  if (slug === "scientific-calculator") {
    return <ScientificCalculator />;
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
    <FormulaCalculator fields={def.fields} compute={def.compute} />
  );
}
