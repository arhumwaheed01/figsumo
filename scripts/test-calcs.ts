/**
 * Accuracy smoke tests for core formulas + every registered compute().
 * Run: npx tsx scripts/test-calcs.ts
 */
import { payment, compoundFutureValue, simpleInterest, irr } from "../lib/calc/finance-core";
import { bmi, bmrMifflin } from "../lib/calc/fitness-core";
import { evaluateExpression } from "../lib/sci-eval";
import { allCalcDefs } from "../lib/calc/registry";
import { round } from "../lib/calc/format";

function assertClose(name: string, actual: number, expected: number, tol = 0.02) {
  if (!Number.isFinite(actual) || Math.abs(actual - expected) > tol) {
    throw new Error(`${name}: expected ~${expected}, got ${actual}`);
  }
}

// Known values
assertClose("payment 200k 6% 30y", payment(200000, 6, 30), 1199.1, 0.5);
assertClose("simple interest", simpleInterest(1000, 5, 2), 100);
assertClose("compound FV", compoundFutureValue(1000, 5, 1, 1), 1050, 0.01);
assertClose("bmi", bmi(70, 175), 22.86, 0.05);
assertClose("bmr male", bmrMifflin("male", 70, 175, 30), 1648.75, 1);
assertClose("sci 2+2", evaluateExpression("2+2", { mode: "deg", ans: 0 }), 4, 0);
assertClose("sci sin30", evaluateExpression("sin(30)", { mode: "deg", ans: 0 }), 0.5, 1e-10);
assertClose("irr", irr([-100, 60, 60]), 13.07, 0.05);

let ok = 0;
let softErrors = 0;
for (const def of allCalcDefs()) {
  const values: Record<string, string> = {};
  for (const f of def.fields) {
    if (f.defaultValue !== undefined) values[f.name] = f.defaultValue;
    else if (f.type === "select" && f.options?.length) values[f.name] = f.options[0].value;
    else values[f.name] = f.type === "number" ? "1" : f.type === "date" ? "2026-01-01" : "test";
  }
  const result = def.compute(values);
  if ("error" in result) {
    softErrors++;
    continue;
  }
  if (!result.rows.length) throw new Error(`${def.slug}: empty rows`);
  for (const row of result.rows) {
    if (!row.label || row.value === undefined || row.value === null) {
      throw new Error(`${def.slug}: bad row`);
    }
  }
  ok++;
}

console.log(
  JSON.stringify(
    {
      core: "passed",
      defsOk: ok,
      defsSoftErrorOnDefaults: softErrors,
      defsTotal: allCalcDefs().length,
      samplePayment: round(payment(200000, 6, 30), 2),
    },
    null,
    2,
  ),
);
