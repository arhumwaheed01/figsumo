import type { FieldDef } from "@/components/calc/FormulaCalculator";
import type { CalcResult } from "@/lib/calc/result-types";

export type CalcDef = {
  slug: string;
  fields: FieldDef[];
  compute: (values: Record<string, string>) => CalcResult;
};

export type { CalcResult };
