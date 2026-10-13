/**
 * Accuracy + registry smoke tests.
 * Run: npm run test:calcs
 */
import {
  amortizationSchedule,
  compoundFutureValue,
  interestRateFromPayment,
  irr,
  payment,
  simpleInterest,
} from "../lib/calc/finance-core";
import { bmi, bmrMifflin, tdee } from "../lib/calc/fitness-core";
import { evaluateExpression } from "../lib/sci-eval";
import { allCalcDefs } from "../lib/calc/registry";
import { round } from "../lib/calc/format";
import { interestRateDetailResult, loanDetailResult } from "../lib/calc/loan-detail";

function assertClose(name: string, actual: number, expected: number, tol = 0.02) {
  if (!Number.isFinite(actual) || Math.abs(actual - expected) > tol) {
    throw new Error(`${name}: expected ~${expected}, got ${actual}`);
  }
}

function assertOk(name: string, cond: boolean) {
  if (!cond) throw new Error(name);
}

// --- Core finance ---
assertClose("payment 200k 6% 30y", payment(200000, 6, 30), 1199.1, 0.5);
assertClose("simple interest", simpleInterest(1000, 5, 2), 100);
assertClose("compound FV", compoundFutureValue(1000, 5, 1, 1), 1050, 0.01);

const sched = amortizationSchedule(200000, 6, 30);
assertOk("schedule length 360", sched.length === 360);
assertClose("schedule first interest", sched[0].interest, 1000, 0.5);
assertClose(
  "schedule pays down",
  sched[sched.length - 1].balance,
  0,
  0.05,
);

// Round-trip: payment -> implied rate
const pmt = payment(30000, 7.5, 5);
const solved = interestRateFromPayment(30000, pmt, 5);
assertClose("rate round-trip", solved, 7.5, 0.05);

assertOk(
  "rate too-small payment is NaN",
  !Number.isFinite(interestRateFromPayment(10000, 10, 5)),
);

assertClose("irr", irr([-100, 60, 60]), 13.07, 0.05);

// --- Fitness ---
assertClose("bmi", bmi(70, 175), 22.86, 0.05);
assertClose("bmr male", bmrMifflin("male", 70, 175, 30), 1648.75, 1);
assertClose("tdee", tdee(1648.75, "moderate"), 1648.75 * 1.55, 1);

// --- Scientific ---
assertClose("sci 2+2", evaluateExpression("2+2", { mode: "deg", ans: 0 }), 4, 0);
assertClose("sci sin30", evaluateExpression("sin(30)", { mode: "deg", ans: 0 }), 0.5, 1e-10);
assertClose("sci 2π", evaluateExpression("2π", { mode: "deg", ans: 0 }), 2 * Math.PI, 1e-9);
assertClose("sci power", evaluateExpression("2^10", { mode: "deg", ans: 0 }), 1024, 0);

// --- Rich loan helpers ---
const loan = loanDetailResult({ principal: 30000, annualRatePct: 7.5, years: 5 });
assertOk("loan detail success", !("error" in loan));
if (!("error" in loan)) {
  assertOk("loan has breakdown", (loan.breakdown?.length ?? 0) >= 2);
  assertOk("loan has series", (loan.series?.length ?? 0) >= 3);
  assertOk("loan has table", (loan.table?.rows.length ?? 0) === 12);
}

const rateDetail = interestRateDetailResult({
  principal: 32000,
  monthlyPayment: 960,
  years: 3,
});
assertOk("interest rate detail success", !("error" in rateDetail));
// calculator.net-style sample: $32,000 / 3y / $960 → ~5.065% APR
assertClose("calc.net interest-rate sample", interestRateFromPayment(32000, 960, 3), 5.065, 0.01);

// --- Every registered def ---
let ok = 0;
let softErrors = 0;
for (const def of allCalcDefs()) {
  const values: Record<string, string> = {};
  for (const f of def.fields) {
    if (f.defaultValue !== undefined) values[f.name] = f.defaultValue;
    else if (f.type === "select" && f.options?.length) values[f.name] = f.options[0].value;
    else values[f.name] = f.type === "number" ? "1" : f.type === "date" ? "2026-01-01" : "test";
  }
  let result;
  try {
    result = def.compute(values);
  } catch (e) {
    throw new Error(`${def.slug} threw: ${e}`);
  }
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

assertOk("no soft errors on defaults", softErrors === 0);

console.log(
  JSON.stringify(
    {
      core: "passed",
      defsOk: ok,
      defsSoftErrorOnDefaults: softErrors,
      defsTotal: allCalcDefs().length,
      samplePayment: round(payment(200000, 6, 30), 2),
      rateRoundTrip: round(solved, 3),
    },
    null,
    2,
  ),
);
