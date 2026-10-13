import { createRequire } from "module";
import { register } from "node:module";
import { pathToFileURL } from "node:url";

// Compile-free tests by duplicating critical cases via dynamic import of built JS is hard.
// Use a minimal inline reimplementation check by spawning next build instead.
// This file imports via tsx register:

register("tsx/esm", pathToFileURL("./"));

const { evaluateExpression, formatNumber } = await import("../lib/sci-eval.ts");

const ctx = { mode: "deg", ans: 0 };
const cases = [
  ["2+3*4", 14],
  ["(2+3)*4", 20],
  ["2^3", 8],
  ["sin(30)", 0.5],
  ["cos(0)", 1],
  ["sqrt(9)", 3],
  ["log(100)", 2],
  ["ln(1)", 0],
  ["1/2", 0.5],
  ["10%", 0.1],
  ["2π", 2 * Math.PI],
];

let failed = 0;
for (const [expr, want] of cases) {
  const got = evaluateExpression(expr, ctx);
  const ok = Math.abs(got - want) < 1e-10;
  console.log(ok ? "OK" : "FAIL", expr, "=", got, "want", want);
  if (!ok) failed++;
}

const rad = evaluateExpression("sin(1)", { mode: "rad", ans: 0 });
const radOk = Math.abs(rad - Math.sin(1)) < 1e-12;
console.log(radOk ? "OK" : "FAIL", "sin(1) rad", rad);
if (!radOk) failed++;

console.log("format(0.1+0.2)=", formatNumber(0.1 + 0.2));
process.exit(failed ? 1 : 0);
