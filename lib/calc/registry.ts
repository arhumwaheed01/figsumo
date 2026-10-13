import { financialDefs } from "@/lib/calc/defs/financial";
import { applyFinancialOverrides } from "@/lib/calc/defs/financial-overrides";
import { fitnessDefs } from "@/lib/calc/defs/fitness";
import { mathDefs } from "@/lib/calc/defs/math";
import { otherDefs } from "@/lib/calc/defs/other";
import { embedDefs } from "@/lib/calc/defs/embed";
import type { CalcDef } from "@/lib/calc/types";

const allDefs: CalcDef[] = [
  ...applyFinancialOverrides(financialDefs),
  ...fitnessDefs,
  ...mathDefs,
  ...otherDefs,
  ...embedDefs,
];

export const calcDefBySlug: Record<string, CalcDef> = Object.fromEntries(
  allDefs.map((d) => [d.slug, d]),
);

export function getCalcDef(slug: string): CalcDef | undefined {
  return calcDefBySlug[slug];
}

export function allCalcDefs(): CalcDef[] {
  return allDefs;
}
