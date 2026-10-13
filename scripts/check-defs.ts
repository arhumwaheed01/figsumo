import { allCalculators } from "../lib/calculators";
import { financialDefs } from "../lib/calc/defs/financial";
import { fitnessDefs } from "../lib/calc/defs/fitness";
import { mathDefs } from "../lib/calc/defs/math";
import { otherDefs } from "../lib/calc/defs/other";
import { embedDefs } from "../lib/calc/defs/embed";
import type { CalcDef } from "../lib/calc/types";

const defs: CalcDef[] = [
  ...financialDefs,
  ...fitnessDefs,
  ...mathDefs,
  ...otherDefs,
  ...embedDefs,
];

const defSlugs = new Set(defs.map((d) => d.slug));
defSlugs.add("scientific-calculator");

const missing = allCalculators
  .filter((c) => !defSlugs.has(c.slug))
  .map((c) => c.slug);
const extra = [...defSlugs].filter(
  (s) => !allCalculators.some((c) => c.slug === s),
);
const dups = defs.map((d) => d.slug).filter((s, i, a) => a.indexOf(s) !== i);

console.log(
  JSON.stringify(
    {
      total: allCalculators.length,
      defs: defs.length + 1,
      missing,
      extra,
      dups: [...new Set(dups)],
    },
    null,
    2,
  ),
);

let failures = 0;
for (const def of defs) {
  const values: Record<string, string> = {};
  for (const f of def.fields) {
    if (f.defaultValue !== undefined) values[f.name] = f.defaultValue;
    else if (f.type === "select" && f.options?.length)
      values[f.name] = f.options[0].value;
    else values[f.name] = "";
  }
  try {
    const result = def.compute(values);
    if ("error" in result) {
      // defaults may intentionally error for some tools — only flag throws
    } else if (!result.rows?.length) {
      console.error("EMPTY", def.slug);
      failures++;
    }
  } catch (e) {
    console.error("THROW", def.slug, e);
    failures++;
  }
}
console.log(JSON.stringify({ computeFailures: failures }));
process.exit(failures > 0 ? 1 : 0);
