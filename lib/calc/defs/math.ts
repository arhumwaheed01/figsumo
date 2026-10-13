import type { CalcResult } from "@/components/calc/FormulaCalculator";
import type { CalcDef } from "@/lib/calc/types";
import type { CalcSuccess } from "@/lib/calc/result-types";
import { fmt, parseNum, round } from "@/lib/calc/format";
import { evaluateExpression, formatNumber } from "@/lib/sci-eval";

const BRAND = "#2563EB";
const INK = "#101010";

function ok(
  rows: { label: string; value: string; emphasize?: boolean }[],
  extra?: Omit<CalcSuccess, "rows">,
): CalcResult {
  return { rows, ...extra };
}

function statsSummaryTable(stats: { label: string; value: string }[]): CalcSuccess["table"] {
  return {
    caption: "Summary statistics",
    headers: ["Statistic", "Value"],
    rows: stats.map((s) => [s.label, s.value]),
  };
}

function err(message: string): CalcResult {
  return { error: message };
}

function parseList(s: string): number[] | null {
  const trimmed = s.trim();
  if (!trimmed) return null;
  const parts = trimmed.split(/[,;\s]+/).filter(Boolean);
  const nums = parts.map((p) => parseNum(p));
  if (nums.some((n) => Number.isNaN(n))) return null;
  return nums;
}

function gcdInt(a: number, b: number): number {
  a = Math.abs(Math.trunc(a));
  b = Math.abs(Math.trunc(b));
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

function lcmInt(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcdInt(a, b);
}

function parseFraction(s: string): { num: number; den: number } | null {
  const t = s.trim();
  const slash = t.match(/^(-?\d+)\s*\/\s*(-?\d+)$/);
  if (slash) {
    const den = parseInt(slash[2], 10);
    if (den === 0) return null;
    return { num: parseInt(slash[1], 10), den };
  }
  const n = parseNum(t);
  if (Number.isNaN(n)) return null;
  return { num: n, den: 1 };
}

function reduceFrac(num: number, den: number): { num: number; den: number } {
  if (den === 0) return { num: NaN, den: NaN };
  if (den < 0) {
    num = -num;
    den = -den;
  }
  const g = gcdInt(num, den);
  return { num: num / g, den: den / g };
}

function fracToString(num: number, den: number): string {
  const r = reduceFrac(num, den);
  if (r.den === 1) return String(r.num);
  return `${r.num}/${r.den}`;
}

function medianSorted(sorted: number[]): number {
  const n = sorted.length;
  if (n === 0) return NaN;
  const mid = Math.floor(n / 2);
  return n % 2 === 1 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function stdDevSample(nums: number[]): number {
  const n = nums.length;
  if (n < 2) return NaN;
  const mean = nums.reduce((a, b) => a + b, 0) / n;
  const v = nums.reduce((s, x) => s + (x - mean) ** 2, 0) / (n - 1);
  return Math.sqrt(v);
}

function stdDevPop(nums: number[]): number {
  const n = nums.length;
  if (n === 0) return NaN;
  const mean = nums.reduce((a, b) => a + b, 0) / n;
  const v = nums.reduce((s, x) => s + (x - mean) ** 2, 0) / n;
  return Math.sqrt(v);
}

function nCr(n: number, r: number): number {
  if (!Number.isInteger(n) || !Number.isInteger(r) || r < 0 || n < 0 || r > n) return NaN;
  r = Math.min(r, n - r);
  let num = 1;
  let den = 1;
  for (let i = 0; i < r; i++) {
    num *= n - i;
    den *= i + 1;
  }
  return num / den;
}

function nPr(n: number, r: number): number {
  if (!Number.isInteger(n) || !Number.isInteger(r) || r < 0 || n < 0 || r > n) return NaN;
  let p = 1;
  for (let i = 0; i < r; i++) p *= n - i;
  return p;
}

/** Standard normal CDF (Abramowitz & Stegun). */
function normalCdf(z: number): number {
  const x = Math.abs(z);
  const t = 1 / (1 + 0.2316419 * x);
  const d = 0.3989423 * Math.exp(-x * x / 2);
  const p =
    d *
    t *
    (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return z >= 0 ? 1 - p : p;
}

function zCritical(confidencePct: number): number {
  const alpha = (100 - confidencePct) / 100;
  const p = 1 - alpha / 2;
  let lo = 0;
  let hi = 4;
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    if (normalCdf(mid) < p) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

function parseMatrixRows(rows: string[], size: number): number[][] | null {
  if (rows.length !== size) return null;
  const m: number[][] = [];
  for (const row of rows) {
    const parts = row.split(/[,;\s]+/).filter(Boolean);
    if (parts.length !== size) return null;
    const nums = parts.map(parseNum);
    if (nums.some((n) => Number.isNaN(n))) return null;
    m.push(nums);
  }
  return m;
}

function det2(m: number[][]): number {
  return m[0][0] * m[1][1] - m[0][1] * m[1][0];
}

function det3(m: number[][]): number {
  const a = m[0];
  const b = m[1];
  const c = m[2];
  return (
    a[0] * (b[1] * c[2] - b[2] * c[1]) -
    a[1] * (b[0] * c[2] - b[2] * c[0]) +
    a[2] * (b[0] * c[1] - b[1] * c[0])
  );
}

function addMatrices(a: number[][], b: number[][]): number[][] {
  return a.map((row, i) => row.map((v, j) => v + b[i][j]));
}

function matrixToString(m: number[][]): string {
  return m.map((row) => row.map((v) => fmt(v, 6)).join(", ")).join(" | ");
}

function allFactors(n: number): number[] {
  n = Math.abs(Math.trunc(n));
  if (n === 0) return [];
  const out: number[] = [];
  for (let i = 1; i * i <= n; i++) {
    if (n % i === 0) {
      out.push(i);
      if (i !== n / i) out.push(n / i);
    }
  }
  return out.sort((a, b) => a - b);
}

function primeFactors(n: number): number[] {
  n = Math.abs(Math.trunc(n));
  if (n < 2) return [];
  const out: number[] = [];
  let x = n;
  for (let p = 2; p * p <= x; p++) {
    while (x % p === 0) {
      out.push(p);
      x = Math.trunc(x / p);
    }
  }
  if (x > 1) out.push(x);
  return out;
}

function roundToSigFig(n: number, sig: number): number {
  if (!Number.isFinite(n) || n === 0 || sig < 1) return NaN;
  const d = Math.ceil(Math.log10(Math.abs(n)));
  const f = 10 ** (sig - d);
  return Math.round(n * f) / f;
}

function toSciNotation(n: number): { coeff: number; exp: number } {
  if (n === 0) return { coeff: 0, exp: 0 };
  const exp = Math.floor(Math.log10(Math.abs(n)));
  const coeff = n / 10 ** exp;
  return { coeff, exp };
}

function parseSciInput(s: string): number | null {
  const t = s.trim().toLowerCase();
  const m = t.match(/^([+-]?\d+(?:\.\d+)?)\s*[e×x]\s*([+-]?\d+)$/i);
  if (m) {
    const v = parseNum(`${m[1]}e${m[2]}`);
    return Number.isNaN(v) ? null : v;
  }
  const m2 = t.match(/^([+-]?\d+(?:\.\d+)?)\s*\*\s*10\s*\^\s*([+-]?\d+)$/);
  if (m2) {
    const base = parseNum(m2[1]);
    const exp = parseInt(m2[2], 10);
    if (Number.isNaN(base)) return null;
    return base * 10 ** exp;
  }
  const v = parseNum(t);
  return Number.isNaN(v) ? null : v;
}

function parseBigIntSafe(s: string): bigint | null {
  const t = s.trim().replace(/,/g, "");
  if (!/^-?\d+$/.test(t)) return null;
  try {
    return BigInt(t);
  } catch {
    return null;
  }
}

export const mathDefs: CalcDef[] = [
  {
    slug: "fraction-calculator",
    fields: [
      { name: "a", label: "First fraction (e.g. 1/2)", type: "text", defaultValue: "1/2" },
      {
        name: "op",
        label: "Operation",
        type: "select",
        options: [
          { value: "+", label: "+" },
          { value: "-", label: "−" },
          { value: "*", label: "×" },
          { value: "/", label: "÷" },
        ],
      },
      { name: "b", label: "Second fraction (e.g. 1/3)", type: "text", defaultValue: "1/3" },
    ],
    compute(v) {
      const f1 = parseFraction(v.a);
      const f2 = parseFraction(v.b);
      if (!f1 || !f2) return err("Enter valid fractions like 3/4 or whole numbers.");
      let num = 0;
      let den = 1;
      switch (v.op) {
        case "+":
          num = f1.num * f2.den + f2.num * f1.den;
          den = f1.den * f2.den;
          break;
        case "-":
          num = f1.num * f2.den - f2.num * f1.den;
          den = f1.den * f2.den;
          break;
        case "*":
          num = f1.num * f2.num;
          den = f1.den * f2.den;
          break;
        case "/":
          if (f2.num === 0) return err("Cannot divide by zero.");
          num = f1.num * f2.den;
          den = f1.den * f2.num;
          break;
        default:
          return err("Unknown operation.");
      }
      const dec = num / den;
      return ok([
        { label: "Result (reduced)", value: fracToString(num, den), emphasize: true },
        { label: "Decimal", value: fmt(dec, 8) },
      ]);
    },
  },
  {
    slug: "percentage-calculator",
    fields: [
      {
        name: "mode",
        label: "Calculation",
        type: "select",
        options: [
          { value: "of", label: "What is X% of Y?" },
          { value: "pct", label: "X is what % of Y?" },
          { value: "inc", label: "Y increased by X%" },
          { value: "dec", label: "Y decreased by X%" },
        ],
      },
      { name: "x", label: "X (percent or value)", type: "number", defaultValue: "20" },
      { name: "y", label: "Y", type: "number", defaultValue: "150" },
    ],
    compute(v) {
      const x = parseNum(v.x);
      const y = parseNum(v.y);
      if (Number.isNaN(x) || Number.isNaN(y)) return err("Enter valid numbers.");
      switch (v.mode) {
        case "of": {
          const part = (x / 100) * y;
          const rest = y - part;
          return ok(
            [{ label: "Result", value: fmt(part, 4), emphasize: true }],
            {
              breakdown: [
                { label: `${fmt(x, 4)}% of total`, value: part, color: BRAND },
                { label: "Remainder", value: Math.max(0, rest), color: INK },
              ],
              note: `X% of Y: ${fmt(x, 4)}% × ${fmt(y, 4)}.`,
            },
          );
        }
        case "pct":
          if (y === 0) return err("Y cannot be zero.");
          return ok(
            [{ label: "Percent", value: `${fmt((x / y) * 100, 4)}%`, emphasize: true }],
            {
              breakdown: [
                { label: "Part (X)", value: x, color: BRAND },
                { label: "Whole (Y)", value: y, color: INK },
              ],
            },
          );
        case "inc": {
          const result = y * (1 + x / 100);
          const increase = result - y;
          return ok(
            [{ label: "Result", value: fmt(result, 4), emphasize: true }],
            {
              breakdown: [
                { label: "Original (Y)", value: y, color: INK },
                { label: "Increase", value: increase, color: BRAND },
              ],
            },
          );
        }
        case "dec": {
          const result = y * (1 - x / 100);
          const decrease = y - result;
          return ok(
            [{ label: "Result", value: fmt(result, 4), emphasize: true }],
            {
              breakdown: [
                { label: "Original (Y)", value: y, color: INK },
                { label: "Decrease", value: decrease, color: BRAND },
              ],
            },
          );
        }
        default:
          return err("Unknown mode.");
      }
    },
  },
  {
    slug: "triangle-calculator",
    fields: [
      { name: "a", label: "Side a", type: "number", min: 0, step: "any" },
      { name: "b", label: "Side b", type: "number", min: 0, step: "any" },
      { name: "c", label: "Side c", type: "number", min: 0, step: "any" },
    ],
    compute(v) {
      const a = parseNum(v.a);
      const b = parseNum(v.b);
      const c = parseNum(v.c);
      if ([a, b, c].some((n) => Number.isNaN(n) || n <= 0)) return err("Enter three positive side lengths.");
      if (a + b <= c || a + c <= b || b + c <= a) return err("Sides do not form a valid triangle.");
      const s = (a + b + c) / 2;
      const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
      const angleA = (Math.acos((b * b + c * c - a * a) / (2 * b * c)) * 180) / Math.PI;
      const angleB = (Math.acos((a * a + c * c - b * b) / (2 * a * c)) * 180) / Math.PI;
      const angleC = 180 - angleA - angleB;
      return ok(
        [
          { label: "Area", value: fmt(area, 4), emphasize: true },
          { label: "Perimeter", value: fmt(a + b + c, 4) },
          { label: "Angle A (°)", value: fmt(angleA, 2) },
          { label: "Angle B (°)", value: fmt(angleB, 2) },
          { label: "Angle C (°)", value: fmt(angleC, 2) },
        ],
        { note: "Area uses Heron's formula from three side lengths (SSS)." },
      );
    },
  },
  {
    slug: "volume-calculator",
    fields: [
      {
        name: "shape",
        label: "Shape",
        type: "select",
        options: [
          { value: "cube", label: "Cube (edge)" },
          { value: "box", label: "Rectangular prism (l × w × h)" },
          { value: "cylinder", label: "Cylinder (r, h)" },
          { value: "sphere", label: "Sphere (radius)" },
          { value: "cone", label: "Cone (r, h)" },
        ],
      },
      { name: "d1", label: "Dimension 1", type: "number", min: 0, step: "any", defaultValue: "5" },
      { name: "d2", label: "Dimension 2", type: "number", min: 0, step: "any", defaultValue: "4" },
      { name: "d3", label: "Dimension 3", type: "number", min: 0, step: "any", defaultValue: "3" },
    ],
    compute(v) {
      const d1 = parseNum(v.d1);
      const d2 = parseNum(v.d2);
      const d3 = parseNum(v.d3);
      let vol = NaN;
      switch (v.shape) {
        case "cube":
          if (Number.isNaN(d1) || d1 <= 0) return err("Enter a positive edge length.");
          vol = d1 ** 3;
          break;
        case "box":
          if ([d1, d2, d3].some((n) => Number.isNaN(n) || n <= 0)) return err("Enter positive length, width, height.");
          vol = d1 * d2 * d3;
          break;
        case "cylinder":
          if (Number.isNaN(d1) || Number.isNaN(d2) || d1 <= 0 || d2 <= 0) return err("Enter positive radius and height.");
          vol = Math.PI * d1 ** 2 * d2;
          break;
        case "sphere":
          if (Number.isNaN(d1) || d1 <= 0) return err("Enter a positive radius.");
          vol = (4 / 3) * Math.PI * d1 ** 3;
          break;
        case "cone":
          if (Number.isNaN(d1) || Number.isNaN(d2) || d1 <= 0 || d2 <= 0) return err("Enter positive radius and height.");
          vol = (Math.PI * d1 ** 2 * d2) / 3;
          break;
        default:
          return err("Unknown shape.");
      }
      return ok([{ label: "Volume", value: fmt(vol, 4), emphasize: true }]);
    },
  },
  {
    slug: "standard-deviation-calculator",
    fields: [
      {
        name: "data",
        label: "Numbers (comma-separated)",
        type: "text",
        placeholder: "2, 4, 4, 4, 5, 5, 7, 9",
        defaultValue: "2, 4, 4, 4, 5, 5, 7, 9",
      },
    ],
    compute(v) {
      const nums = parseList(v.data);
      if (!nums || nums.length < 2) return err("Enter at least two numbers.");
      const mean = nums.reduce((a, b) => a + b, 0) / nums.length;
      const sample = stdDevSample(nums);
      const pop = stdDevPop(nums);
      const sorted = [...nums].sort((a, b) => a - b);
      const med = medianSorted(sorted);
      const min = sorted[0];
      const max = sorted[sorted.length - 1];
      return ok(
        [
          { label: "Sample std. dev. (n−1)", value: fmt(sample, 6), emphasize: true },
          { label: "Population std. dev. (n)", value: fmt(pop, 6) },
          { label: "Mean", value: fmt(mean, 6) },
          { label: "Count", value: String(nums.length) },
        ],
        {
          table: statsSummaryTable([
            { label: "Count (n)", value: String(nums.length) },
            { label: "Mean", value: fmt(mean, 6) },
            { label: "Median", value: fmt(med, 6) },
            { label: "Min", value: fmt(min, 6) },
            { label: "Max", value: fmt(max, 6) },
            { label: "Range", value: fmt(max - min, 6) },
            { label: "Sample σ", value: fmt(sample, 6) },
            { label: "Population σ", value: fmt(pop, 6) },
          ]),
        },
      );
    },
  },
  {
    slug: "random-number-generator",
    fields: [
      { name: "min", label: "Minimum (integer)", type: "number", defaultValue: "1" },
      { name: "max", label: "Maximum (integer)", type: "number", defaultValue: "100" },
      { name: "count", label: "How many numbers", type: "number", min: 1, max: 500, defaultValue: "5" },
    ],
    compute(v) {
      const min = parseNum(v.min);
      const max = parseNum(v.max);
      const count = parseNum(v.count);
      if ([min, max, count].some((n) => Number.isNaN(n))) return err("Enter valid numbers.");
      if (!Number.isInteger(min) || !Number.isInteger(max) || !Number.isInteger(count)) {
        return err("Min, max, and count must be integers.");
      }
      if (count < 1 || count > 500) return err("Count must be between 1 and 500.");
      if (min > max) return err("Minimum cannot exceed maximum.");
      const out: number[] = [];
      for (let i = 0; i < count; i++) {
        out.push(Math.floor(Math.random() * (max - min + 1)) + min);
      }
      return ok([{ label: "Random integers", value: out.join(", "), emphasize: true }]);
    },
  },
  {
    slug: "number-sequence-calculator",
    fields: [
      {
        name: "type",
        label: "Sequence type",
        type: "select",
        options: [
          { value: "arith", label: "Arithmetic" },
          { value: "geom", label: "Geometric" },
        ],
      },
      { name: "a1", label: "First term (a₁)", type: "number", defaultValue: "2" },
      { name: "r", label: "Common difference / ratio", type: "number", defaultValue: "3" },
      { name: "n", label: "Term number (n)", type: "number", min: 1, defaultValue: "10" },
    ],
    compute(v) {
      const a1 = parseNum(v.a1);
      const r = parseNum(v.r);
      const n = parseNum(v.n);
      if ([a1, r, n].some((x) => Number.isNaN(x))) return err("Enter valid numbers.");
      if (!Number.isInteger(n) || n < 1) return err("n must be a positive integer.");
      if (v.type === "arith") {
        const nth = a1 + (n - 1) * r;
        const sum = (n / 2) * (2 * a1 + (n - 1) * r);
        return ok([
          { label: "nth term", value: fmt(nth, 6), emphasize: true },
          { label: "Sum of first n terms", value: fmt(sum, 6) },
        ]);
      }
      if (r === 0) return err("Geometric ratio cannot be zero.");
      const nth = a1 * r ** (n - 1);
      const sum = r === 1 ? a1 * n : (a1 * (1 - r ** n)) / (1 - r);
      return ok([
        { label: "nth term", value: fmt(nth, 6), emphasize: true },
        { label: "Sum of first n terms", value: fmt(sum, 6) },
      ]);
    },
  },
  {
    slug: "percent-error-calculator",
    fields: [
      { name: "observed", label: "Observed (experimental) value", type: "number", step: "any" },
      { name: "accepted", label: "Accepted (true) value", type: "number", step: "any" },
    ],
    compute(v) {
      const obs = parseNum(v.observed);
      const acc = parseNum(v.accepted);
      if (Number.isNaN(obs) || Number.isNaN(acc)) return err("Enter valid numbers.");
      if (acc === 0) return err("Accepted value cannot be zero.");
      const pct = (Math.abs(obs - acc) / Math.abs(acc)) * 100;
      return ok([
        { label: "Percent error", value: `${fmt(pct, 4)}%`, emphasize: true },
        { label: "Absolute error", value: fmt(Math.abs(obs - acc), 6) },
      ]);
    },
  },
  {
    slug: "exponent-calculator",
    fields: [
      { name: "base", label: "Base", type: "number", step: "any", defaultValue: "2" },
      { name: "exp", label: "Exponent", type: "number", step: "any", defaultValue: "10" },
    ],
    compute(v) {
      const base = parseNum(v.base);
      const exp = parseNum(v.exp);
      if (Number.isNaN(base) || Number.isNaN(exp)) return err("Enter valid numbers.");
      const result = base ** exp;
      if (!Number.isFinite(result)) return err("Result is not finite (overflow or invalid).");
      return ok([{ label: "Result", value: formatNumber(result), emphasize: true }]);
    },
  },
  {
    slug: "binary-calculator",
    fields: [
      {
        name: "mode",
        label: "Mode",
        type: "select",
        options: [
          { value: "dec2bin", label: "Decimal → binary" },
          { value: "bin2dec", label: "Binary → decimal" },
          { value: "add", label: "Add two binary numbers" },
        ],
      },
      { name: "a", label: "Value A", type: "text", defaultValue: "42" },
      { name: "b", label: "Value B (add only)", type: "text", defaultValue: "1010" },
    ],
    compute(v) {
      if (v.mode === "dec2bin") {
        const n = parseNum(v.a);
        if (Number.isNaN(n) || !Number.isInteger(n)) return err("Enter an integer decimal value.");
        return ok([{ label: "Binary", value: (n >>> 0).toString(2), emphasize: true }]);
      }
      if (v.mode === "bin2dec") {
        const t = v.a.trim();
        if (!/^[01]+$/.test(t)) return err("Enter a valid binary string (0 and 1 only).");
        return ok([{ label: "Decimal", value: String(parseInt(t, 2)), emphasize: true }]);
      }
      const t1 = v.a.trim();
      const t2 = v.b.trim();
      if (!/^[01]+$/.test(t1) || !/^[01]+$/.test(t2)) return err("Both values must be binary strings.");
      const sum = parseInt(t1, 2) + parseInt(t2, 2);
      return ok([
        { label: "Sum (decimal)", value: String(sum) },
        { label: "Sum (binary)", value: sum.toString(2), emphasize: true },
      ]);
    },
  },
  {
    slug: "hex-calculator",
    fields: [
      {
        name: "mode",
        label: "Mode",
        type: "select",
        options: [
          { value: "dec2hex", label: "Decimal → hexadecimal" },
          { value: "hex2dec", label: "Hexadecimal → decimal" },
          { value: "add", label: "Add two hex values" },
        ],
      },
      { name: "a", label: "Value A", type: "text", defaultValue: "255" },
      { name: "b", label: "Value B (add only)", type: "text", defaultValue: "FF" },
    ],
    compute(v) {
      if (v.mode === "dec2hex") {
        const n = parseNum(v.a);
        if (Number.isNaN(n) || !Number.isInteger(n)) return err("Enter an integer decimal value.");
        return ok([{ label: "Hexadecimal", value: (n >>> 0).toString(16).toUpperCase(), emphasize: true }]);
      }
      if (v.mode === "hex2dec") {
        const t = v.a.trim();
        if (!/^[0-9a-fA-F]+$/.test(t)) return err("Enter valid hexadecimal.");
        return ok([{ label: "Decimal", value: String(parseInt(t, 16)), emphasize: true }]);
      }
      const t1 = v.a.trim();
      const t2 = v.b.trim();
      if (!/^[0-9a-fA-F]+$/.test(t1) || !/^[0-9a-fA-F]+$/.test(t2)) return err("Both values must be hexadecimal.");
      const sum = parseInt(t1, 16) + parseInt(t2, 16);
      return ok([
        { label: "Sum (decimal)", value: String(sum) },
        { label: "Sum (hex)", value: sum.toString(16).toUpperCase(), emphasize: true },
      ]);
    },
  },
  {
    slug: "half-life-calculator",
    fields: [
      { name: "n0", label: "Initial amount (N₀)", type: "number", min: 0, step: "any", defaultValue: "100" },
      { name: "half", label: "Half-life", type: "number", min: 0, step: "any", defaultValue: "5" },
      { name: "time", label: "Elapsed time", type: "number", min: 0, step: "any", defaultValue: "10" },
    ],
    compute(v) {
      const n0 = parseNum(v.n0);
      const half = parseNum(v.half);
      const time = parseNum(v.time);
      if ([n0, half, time].some((x) => Number.isNaN(x))) return err("Enter valid numbers.");
      if (half <= 0) return err("Half-life must be positive.");
      const remaining = n0 * 0.5 ** (time / half);
      const decayed = n0 - remaining;
      return ok([
        { label: "Remaining amount", value: fmt(remaining, 6), emphasize: true },
        { label: "Amount decayed", value: fmt(decayed, 6) },
      ]);
    },
  },
  {
    slug: "quadratic-formula-calculator",
    fields: [
      { name: "a", label: "Coefficient a", type: "number", step: "any", defaultValue: "1" },
      { name: "b", label: "Coefficient b", type: "number", step: "any", defaultValue: "-3" },
      { name: "c", label: "Coefficient c", type: "number", step: "any", defaultValue: "2" },
    ],
    compute(v) {
      const a = parseNum(v.a);
      const b = parseNum(v.b);
      const c = parseNum(v.c);
      if ([a, b, c].some((x) => Number.isNaN(x))) return err("Enter valid coefficients.");
      if (a === 0) return err("a cannot be zero (not quadratic).");
      const disc = b * b - 4 * a * c;
      if (disc < 0) {
        const re = -b / (2 * a);
        const im = Math.sqrt(-disc) / (2 * a);
        return ok(
          [
            { label: "Discriminant", value: fmt(disc, 6) },
            { label: "Roots", value: `${fmt(re, 6)} ± ${fmt(im, 6)}i`, emphasize: true },
          ],
          {
            table: {
              caption: "Roots (complex conjugates)",
              headers: ["Root", "Value"],
              rows: [
                ["x₁", `${fmt(re, 6)} + ${fmt(im, 6)}i`],
                ["x₂", `${fmt(re, 6)} − ${fmt(im, 6)}i`],
              ],
            },
            note: "Negative discriminant → non-real roots.",
          },
        );
      }
      const sqrtD = Math.sqrt(disc);
      const x1 = (-b + sqrtD) / (2 * a);
      const x2 = (-b - sqrtD) / (2 * a);
      const same = Math.abs(x1 - x2) < 1e-10;
      return ok(
        [
          { label: "Discriminant", value: fmt(disc, 6) },
          { label: "Root 1", value: fmt(x1, 6), emphasize: true },
          { label: "Root 2", value: fmt(x2, 6) },
        ],
        {
          table: {
            caption: "Roots",
            headers: ["Root", "Value"],
            rows: same
              ? [["x (double)", fmt(x1, 6)]]
              : [
                  ["x₁", fmt(x1, 6)],
                  ["x₂", fmt(x2, 6)],
                ],
          },
        },
      );
    },
  },
  {
    slug: "slope-calculator",
    fields: [
      { name: "x1", label: "x₁", type: "number", step: "any", defaultValue: "1" },
      { name: "y1", label: "y₁", type: "number", step: "any", defaultValue: "2" },
      { name: "x2", label: "x₂", type: "number", step: "any", defaultValue: "4" },
      { name: "y2", label: "y₂", type: "number", step: "any", defaultValue: "6" },
    ],
    compute(v) {
      const x1 = parseNum(v.x1);
      const y1 = parseNum(v.y1);
      const x2 = parseNum(v.x2);
      const y2 = parseNum(v.y2);
      if ([x1, y1, x2, y2].some((n) => Number.isNaN(n))) return err("Enter valid coordinates.");
      if (x1 === x2) return ok([{ label: "Slope", value: "Undefined (vertical line)", emphasize: true }]);
      const m = (y2 - y1) / (x2 - x1);
      const angle = (Math.atan(m) * 180) / Math.PI;
      return ok([
        { label: "Slope (m)", value: fmt(m, 6), emphasize: true },
        { label: "Angle from x-axis (°)", value: fmt(angle, 2) },
      ]);
    },
  },
  {
    slug: "log-calculator",
    fields: [
      { name: "base", label: "Base", type: "number", min: 0, step: "any", defaultValue: "10" },
      { name: "x", label: "Value (x)", type: "number", min: 0, step: "any", defaultValue: "100" },
    ],
    compute(v) {
      const base = parseNum(v.base);
      const x = parseNum(v.x);
      if (Number.isNaN(base) || Number.isNaN(x)) return err("Enter valid numbers.");
      if (base <= 0 || base === 1) return err("Base must be positive and not equal to 1.");
      if (x <= 0) return err("x must be positive.");
      const result = Math.log(x) / Math.log(base);
      return ok([{ label: `log₍${fmt(base, 4)}₎(${fmt(x, 4)})`, value: fmt(result, 8), emphasize: true }]);
    },
  },
  {
    slug: "area-calculator",
    fields: [
      {
        name: "shape",
        label: "Shape",
        type: "select",
        options: [
          { value: "rect", label: "Rectangle" },
          { value: "tri", label: "Triangle (base × height / 2)" },
          { value: "trap", label: "Trapezoid" },
          { value: "circle", label: "Circle" },
        ],
      },
      { name: "d1", label: "Dimension 1", type: "number", min: 0, step: "any", defaultValue: "10" },
      { name: "d2", label: "Dimension 2", type: "number", min: 0, step: "any", defaultValue: "6" },
      { name: "d3", label: "Dimension 3 (trapezoid top base)", type: "number", min: 0, step: "any", defaultValue: "4" },
    ],
    compute(v) {
      const d1 = parseNum(v.d1);
      const d2 = parseNum(v.d2);
      const d3 = parseNum(v.d3);
      let area = NaN;
      switch (v.shape) {
        case "rect":
          if (Number.isNaN(d1) || Number.isNaN(d2) || d1 <= 0 || d2 <= 0) return err("Enter positive length and width.");
          area = d1 * d2;
          break;
        case "tri":
          if (Number.isNaN(d1) || Number.isNaN(d2) || d1 <= 0 || d2 <= 0) return err("Enter positive base and height.");
          area = (d1 * d2) / 2;
          break;
        case "trap":
          if ([d1, d2, d3].some((n) => Number.isNaN(n) || n <= 0)) return err("Enter positive bases and height.");
          area = ((d1 + d3) / 2) * d2;
          break;
        case "circle":
          if (Number.isNaN(d1) || d1 <= 0) return err("Enter a positive radius.");
          area = Math.PI * d1 ** 2;
          break;
        default:
          return err("Unknown shape.");
      }
      const shapeNotes: Record<string, string> = {
        rect: "Rectangle: length × width.",
        tri: "Triangle: ½ × base × height.",
        trap: "Trapezoid: average of parallel sides × height.",
        circle: "Circle: π × radius².",
      };
      return ok([{ label: "Area", value: fmt(area, 4), emphasize: true }], {
        note: shapeNotes[v.shape ?? "rect"] ?? "Area from entered dimensions.",
      });
    },
  },
  {
    slug: "sample-size-calculator",
    fields: [
      {
        name: "confidence",
        label: "Confidence level",
        type: "select",
        options: [
          { value: "90", label: "90%" },
          { value: "95", label: "95%" },
          { value: "99", label: "99%" },
        ],
      },
      { name: "margin", label: "Margin of error (±%)", type: "number", min: 0, step: "any", defaultValue: "5" },
      { name: "p", label: "Estimated proportion p (0–1)", type: "number", min: 0, max: 1, step: "any", defaultValue: "0.5" },
    ],
    compute(v) {
      const conf = parseNum(v.confidence);
      const margin = parseNum(v.margin);
      const p = parseNum(v.p);
      if (Number.isNaN(conf) || Number.isNaN(margin) || Number.isNaN(p)) return err("Enter valid values.");
      if (margin <= 0) return err("Margin of error must be positive.");
      if (p < 0 || p > 1) return err("p must be between 0 and 1.");
      const z = zCritical(conf);
      const e = margin / 100;
      const n = (z ** 2 * p * (1 - p)) / (e * e);
      return ok([
        { label: "Required sample size (rounded up)", value: String(Math.ceil(n)), emphasize: true },
        { label: "Z critical", value: fmt(z, 4) },
      ]);
    },
  },
  {
    slug: "probability-calculator",
    fields: [
      {
        name: "mode",
        label: "Mode",
        type: "select",
        options: [
          { value: "binomial", label: "Binomial: P(X = k)" },
          { value: "and", label: "Independent: P(A and B) = p₁ × p₂" },
          { value: "or", label: "Mutually exclusive: P(A or B) = p₁ + p₂" },
        ],
      },
      { name: "n", label: "n trials (binomial)", type: "number", min: 0, defaultValue: "10" },
      { name: "k", label: "k successes (binomial)", type: "number", min: 0, defaultValue: "3" },
      { name: "p", label: "Success probability p", type: "number", min: 0, max: 1, step: "any", defaultValue: "0.5" },
      { name: "p2", label: "Second probability p₂", type: "number", min: 0, max: 1, step: "any", defaultValue: "0.4" },
    ],
    compute(v) {
      if (v.mode === "binomial") {
        const n = parseNum(v.n);
        const k = parseNum(v.k);
        const p = parseNum(v.p);
        if ([n, k, p].some((x) => Number.isNaN(x))) return err("Enter valid numbers.");
        if (!Number.isInteger(n) || !Number.isInteger(k) || n < 0 || k < 0 || k > n) {
          return err("n and k must be integers with 0 ≤ k ≤ n.");
        }
        if (p < 0 || p > 1) return err("p must be between 0 and 1.");
        const prob = nCr(n, k) * p ** k * (1 - p) ** (n - k);
        return ok([{ label: "P(X = k)", value: fmt(prob, 8), emphasize: true }]);
      }
      const p1 = parseNum(v.p);
      const p2 = parseNum(v.p2);
      if (Number.isNaN(p1) || Number.isNaN(p2)) return err("Enter valid probabilities.");
      if (p1 < 0 || p1 > 1 || p2 < 0 || p2 > 1) return err("Probabilities must be between 0 and 1.");
      if (v.mode === "and") {
        return ok([{ label: "P(A and B)", value: fmt(p1 * p2, 8), emphasize: true }]);
      }
      if (v.mode === "or") {
        return ok([{ label: "P(A or B)", value: fmt(p1 + p2, 8), emphasize: true }]);
      }
      return err("Unknown mode.");
    },
  },
  {
    slug: "statistics-calculator",
    fields: [
      {
        name: "data",
        label: "Numbers (comma-separated)",
        type: "text",
        defaultValue: "3, 7, 7, 2, 9, 4",
      },
    ],
    compute(v) {
      const nums = parseList(v.data);
      if (!nums || nums.length === 0) return err("Enter at least one number.");
      const sorted = [...nums].sort((a, b) => a - b);
      const n = nums.length;
      const sum = nums.reduce((a, b) => a + b, 0);
      const mean = sum / n;
      const min = sorted[0];
      const max = sorted[n - 1];
      const range = max - min;
      const med = medianSorted(sorted);
      const freq = new Map<number, number>();
      for (const x of nums) freq.set(x, (freq.get(x) ?? 0) + 1);
      let modeVal = sorted[0];
      let modeCount = 0;
      for (const [val, c] of freq) {
        if (c > modeCount) {
          modeCount = c;
          modeVal = val;
        }
      }
      const sampleSd = n > 1 ? stdDevSample(nums) : NaN;
      const popSd = n > 0 ? stdDevPop(nums) : NaN;
      return ok(
        [
          { label: "Count", value: String(n) },
          { label: "Sum", value: fmt(sum, 6) },
          { label: "Mean", value: fmt(mean, 6), emphasize: true },
          { label: "Median", value: fmt(med, 6) },
          { label: "Mode", value: modeCount > 1 ? fmt(modeVal, 6) : "No mode" },
          { label: "Min / Max / Range", value: `${fmt(min, 6)} / ${fmt(max, 6)} / ${fmt(range, 6)}` },
          { label: "Sample std. dev.", value: fmt(sampleSd, 6) },
        ],
        {
          table: statsSummaryTable([
            { label: "Count", value: String(n) },
            { label: "Sum", value: fmt(sum, 6) },
            { label: "Mean", value: fmt(mean, 6) },
            { label: "Median", value: fmt(med, 6) },
            { label: "Mode", value: modeCount > 1 ? fmt(modeVal, 6) : "—" },
            { label: "Min", value: fmt(min, 6) },
            { label: "Max", value: fmt(max, 6) },
            { label: "Range", value: fmt(range, 6) },
            { label: "Sample σ", value: fmt(sampleSd, 6) },
            { label: "Population σ", value: fmt(popSd, 6) },
          ]),
        },
      );
    },
  },
  {
    slug: "mean-median-mode-range-calculator",
    fields: [
      {
        name: "data",
        label: "Numbers (comma-separated)",
        type: "text",
        defaultValue: "8, 3, 5, 3, 9, 3",
      },
    ],
    compute(v) {
      const nums = parseList(v.data);
      if (!nums || nums.length === 0) return err("Enter at least one number.");
      const sorted = [...nums].sort((a, b) => a - b);
      const mean = nums.reduce((a, b) => a + b, 0) / nums.length;
      const med = medianSorted(sorted);
      const min = sorted[0];
      const max = sorted[sorted.length - 1];
      const freq = new Map<number, number>();
      for (const x of nums) freq.set(x, (freq.get(x) ?? 0) + 1);
      const modes = [...freq.entries()].filter(([, c]) => c === Math.max(...freq.values())).map(([k]) => k);
      const maxFreq = Math.max(...freq.values());
      const modeStr = maxFreq > 1 && modes.length ? modes.map((m) => fmt(m, 6)).join(", ") : "—";
      return ok(
        [
          { label: "Mean", value: fmt(mean, 6), emphasize: true },
          { label: "Median", value: fmt(med, 6) },
          { label: "Mode", value: modeStr },
          { label: "Range", value: fmt(max - min, 6) },
        ],
        {
          table: statsSummaryTable([
            { label: "Mean", value: fmt(mean, 6) },
            { label: "Median", value: fmt(med, 6) },
            { label: "Mode", value: modeStr },
            { label: "Minimum", value: fmt(min, 6) },
            { label: "Maximum", value: fmt(max, 6) },
            { label: "Range", value: fmt(max - min, 6) },
            { label: "Count", value: String(nums.length) },
          ]),
        },
      );
    },
  },
  {
    slug: "permutation-and-combination-calculator",
    fields: [
      { name: "n", label: "n (total items)", type: "number", min: 0, defaultValue: "10" },
      { name: "r", label: "r (chosen items)", type: "number", min: 0, defaultValue: "3" },
    ],
    compute(v) {
      const n = parseNum(v.n);
      const r = parseNum(v.r);
      if (Number.isNaN(n) || Number.isNaN(r)) return err("Enter valid integers.");
      if (!Number.isInteger(n) || !Number.isInteger(r)) return err("n and r must be integers.");
      const perm = nPr(n, r);
      const comb = nCr(n, r);
      if (Number.isNaN(perm) || Number.isNaN(comb)) return err("Require 0 ≤ r ≤ n.");
      return ok([
        { label: "Permutations nPr", value: fmt(perm, 0), emphasize: true },
        { label: "Combinations nCr", value: fmt(comb, 0) },
      ]);
    },
  },
  {
    slug: "z-score-calculator",
    fields: [
      { name: "x", label: "Value (x)", type: "number", step: "any" },
      { name: "mean", label: "Mean (μ)", type: "number", step: "any" },
      { name: "std", label: "Standard deviation (σ)", type: "number", min: 0, step: "any" },
    ],
    compute(v) {
      const x = parseNum(v.x);
      const mean = parseNum(v.mean);
      const std = parseNum(v.std);
      if ([x, mean, std].some((n) => Number.isNaN(n))) return err("Enter valid numbers.");
      if (std <= 0) return err("Standard deviation must be positive.");
      const z = (x - mean) / std;
      return ok([{ label: "Z-score", value: fmt(z, 6), emphasize: true }]);
    },
  },
  {
    slug: "confidence-interval-calculator",
    fields: [
      { name: "mean", label: "Sample mean", type: "number", step: "any", defaultValue: "50" },
      { name: "std", label: "Sample std. dev.", type: "number", min: 0, step: "any", defaultValue: "10" },
      { name: "n", label: "Sample size (n)", type: "number", min: 1, defaultValue: "30" },
      {
        name: "confidence",
        label: "Confidence level",
        type: "select",
        options: [
          { value: "90", label: "90%" },
          { value: "95", label: "95%" },
          { value: "99", label: "99%" },
        ],
      },
    ],
    compute(v) {
      const mean = parseNum(v.mean);
      const std = parseNum(v.std);
      const n = parseNum(v.n);
      const conf = parseNum(v.confidence);
      if ([mean, std, n, conf].some((x) => Number.isNaN(x))) return err("Enter valid values.");
      if (std <= 0 || n < 1) return err("Std. dev. must be positive and n ≥ 1.");
      const z = zCritical(conf);
      const se = std / Math.sqrt(n);
      const margin = z * se;
      return ok([
        { label: "Confidence interval", value: `${fmt(mean - margin, 4)} to ${fmt(mean + margin, 4)}`, emphasize: true },
        { label: "Margin of error (±)", value: fmt(margin, 4) },
        { label: "Z critical", value: fmt(z, 4) },
      ]);
    },
  },
  {
    slug: "ratio-calculator",
    fields: [
      { name: "a", label: "A", type: "number", step: "any", defaultValue: "3" },
      { name: "b", label: "B", type: "number", step: "any", defaultValue: "4" },
      { name: "c", label: "C", type: "number", step: "any", defaultValue: "75" },
    ],
    compute(v) {
      const a = parseNum(v.a);
      const b = parseNum(v.b);
      const c = parseNum(v.c);
      if ([a, b, c].some((n) => Number.isNaN(n))) return err("Enter valid numbers.");
      if (a === 0) return err("A cannot be zero.");
      const d = (b * c) / a;
      return ok([
        { label: "A : B = C : D", value: `${fmt(a, 4)} : ${fmt(b, 4)} = ${fmt(c, 4)} : ${fmt(d, 4)}`, emphasize: true },
        { label: "Missing value D", value: fmt(d, 6) },
      ]);
    },
  },
  {
    slug: "distance-calculator",
    fields: [
      {
        name: "dim",
        label: "Dimensions",
        type: "select",
        options: [
          { value: "2", label: "2D" },
          { value: "3", label: "3D" },
        ],
      },
      { name: "x1", label: "x₁", type: "number", step: "any", defaultValue: "0" },
      { name: "y1", label: "y₁", type: "number", step: "any", defaultValue: "0" },
      { name: "z1", label: "z₁ (3D only)", type: "number", step: "any", defaultValue: "0" },
      { name: "x2", label: "x₂", type: "number", step: "any", defaultValue: "3" },
      { name: "y2", label: "y₂", type: "number", step: "any", defaultValue: "4" },
      { name: "z2", label: "z₂ (3D only)", type: "number", step: "any", defaultValue: "0" },
    ],
    compute(v) {
      const x1 = parseNum(v.x1);
      const y1 = parseNum(v.y1);
      const x2 = parseNum(v.x2);
      const y2 = parseNum(v.y2);
      if ([x1, y1, x2, y2].some((n) => Number.isNaN(n))) return err("Enter valid coordinates.");
      if (v.dim === "2") {
        const d = Math.hypot(x2 - x1, y2 - y1);
        return ok([{ label: "Distance", value: fmt(d, 6), emphasize: true }]);
      }
      const z1 = parseNum(v.z1);
      const z2 = parseNum(v.z2);
      if (Number.isNaN(z1) || Number.isNaN(z2)) return err("Enter valid z coordinates.");
      const d = Math.hypot(x2 - x1, y2 - y1, z2 - z1);
      return ok([{ label: "Distance", value: fmt(d, 6), emphasize: true }]);
    },
  },
  {
    slug: "circle-calculator",
    fields: [{ name: "r", label: "Radius", type: "number", min: 0, step: "any", defaultValue: "5" }],
    compute(v) {
      const r = parseNum(v.r);
      if (Number.isNaN(r) || r <= 0) return err("Enter a positive radius.");
      return ok(
        [
          { label: "Area", value: fmt(Math.PI * r * r, 4), emphasize: true },
          { label: "Circumference", value: fmt(2 * Math.PI * r, 4) },
          { label: "Diameter", value: fmt(2 * r, 4) },
        ],
        { note: "Circle formulas use π × r² for area and 2πr for circumference." },
      );
    },
  },
  {
    slug: "surface-area-calculator",
    fields: [
      {
        name: "shape",
        label: "Shape",
        type: "select",
        options: [
          { value: "cube", label: "Cube" },
          { value: "box", label: "Rectangular prism" },
          { value: "sphere", label: "Sphere" },
          { value: "cylinder", label: "Cylinder (closed)" },
        ],
      },
      { name: "d1", label: "Dimension 1", type: "number", min: 0, step: "any", defaultValue: "3" },
      { name: "d2", label: "Dimension 2", type: "number", min: 0, step: "any", defaultValue: "4" },
      { name: "d3", label: "Dimension 3", type: "number", min: 0, step: "any", defaultValue: "5" },
    ],
    compute(v) {
      const d1 = parseNum(v.d1);
      const d2 = parseNum(v.d2);
      const d3 = parseNum(v.d3);
      let sa = NaN;
      switch (v.shape) {
        case "cube":
          if (Number.isNaN(d1) || d1 <= 0) return err("Enter positive edge length.");
          sa = 6 * d1 ** 2;
          break;
        case "box":
          if ([d1, d2, d3].some((n) => Number.isNaN(n) || n <= 0)) return err("Enter positive length, width, height.");
          sa = 2 * (d1 * d2 + d1 * d3 + d2 * d3);
          break;
        case "sphere":
          if (Number.isNaN(d1) || d1 <= 0) return err("Enter positive radius.");
          sa = 4 * Math.PI * d1 ** 2;
          break;
        case "cylinder":
          if (Number.isNaN(d1) || Number.isNaN(d2) || d1 <= 0 || d2 <= 0) return err("Enter positive radius and height.");
          sa = 2 * Math.PI * d1 * (d1 + d2);
          break;
        default:
          return err("Unknown shape.");
      }
      return ok([{ label: "Surface area", value: fmt(sa, 4), emphasize: true }]);
    },
  },
  {
    slug: "pythagorean-theorem-calculator",
    fields: [
      {
        name: "find",
        label: "Find",
        type: "select",
        options: [
          { value: "c", label: "Hypotenuse c (legs a, b)" },
          { value: "leg", label: "Leg a (hypotenuse c, leg b)" },
        ],
      },
      { name: "a", label: "Side a", type: "number", min: 0, step: "any", defaultValue: "3" },
      { name: "b", label: "Side b", type: "number", min: 0, step: "any", defaultValue: "4" },
    ],
    compute(v) {
      const a = parseNum(v.a);
      const b = parseNum(v.b);
      if (Number.isNaN(a) || Number.isNaN(b)) return err("Enter valid sides.");
      if (a <= 0 || b <= 0) return err("Sides must be positive.");
      if (v.find === "c") {
        const c = Math.hypot(a, b);
        return ok([{ label: "Hypotenuse c", value: fmt(c, 6), emphasize: true }]);
      }
      const c = a;
      const leg = b;
      if (c <= leg) return err("Hypotenuse must be longer than the known leg.");
      const missing = Math.sqrt(c * c - leg * leg);
      return ok([{ label: "Missing leg", value: fmt(missing, 6), emphasize: true }]);
    },
  },
  {
    slug: "right-triangle-calculator",
    fields: [
      { name: "a", label: "Leg a", type: "number", min: 0, step: "any", defaultValue: "5" },
      { name: "b", label: "Leg b", type: "number", min: 0, step: "any", defaultValue: "12" },
    ],
    compute(v) {
      const a = parseNum(v.a);
      const b = parseNum(v.b);
      if (Number.isNaN(a) || Number.isNaN(b) || a <= 0 || b <= 0) return err("Enter two positive legs.");
      const c = Math.hypot(a, b);
      const area = (a * b) / 2;
      const angleA = (Math.atan(a / b) * 180) / Math.PI;
      const angleB = 90 - angleA;
      return ok([
        { label: "Hypotenuse", value: fmt(c, 6), emphasize: true },
        { label: "Area", value: fmt(area, 4) },
        { label: "Angle opposite a (°)", value: fmt(angleA, 2) },
        { label: "Angle opposite b (°)", value: fmt(angleB, 2) },
      ]);
    },
  },
  {
    slug: "root-calculator",
    fields: [
      { name: "n", label: "Degree n (2 = square root)", type: "number", min: 1, defaultValue: "2" },
      { name: "x", label: "Value (x)", type: "number", step: "any", defaultValue: "16" },
    ],
    compute(v) {
      const n = parseNum(v.n);
      const x = parseNum(v.x);
      if (Number.isNaN(n) || Number.isNaN(x)) return err("Enter valid numbers.");
      if (!Number.isInteger(n) || n < 1) return err("n must be a positive integer.");
      if (x < 0 && n % 2 === 0) return err("Even root of a negative number is not real.");
      const result = x < 0 ? -((-x) ** (1 / n)) : x ** (1 / n);
      return ok([{ label: `${n}${n === 2 ? "" : "th"} root of x`, value: fmt(result, 8), emphasize: true }]);
    },
  },
  {
    slug: "least-common-multiple-calculator",
    fields: [
      { name: "a", label: "First integer", type: "number", defaultValue: "12" },
      { name: "b", label: "Second integer", type: "number", defaultValue: "18" },
    ],
    compute(v) {
      const a = parseNum(v.a);
      const b = parseNum(v.b);
      if (Number.isNaN(a) || Number.isNaN(b)) return err("Enter valid integers.");
      if (!Number.isInteger(a) || !Number.isInteger(b)) return err("Both values must be integers.");
      return ok([{ label: "LCM", value: String(lcmInt(a, b)), emphasize: true }]);
    },
  },
  {
    slug: "greatest-common-factor-calculator",
    fields: [
      { name: "a", label: "First integer", type: "number", defaultValue: "48" },
      { name: "b", label: "Second integer", type: "number", defaultValue: "18" },
    ],
    compute(v) {
      const a = parseNum(v.a);
      const b = parseNum(v.b);
      if (Number.isNaN(a) || Number.isNaN(b)) return err("Enter valid integers.");
      if (!Number.isInteger(a) || !Number.isInteger(b)) return err("Both values must be integers.");
      return ok([{ label: "GCF (GCD)", value: String(gcdInt(a, b)), emphasize: true }]);
    },
  },
  {
    slug: "factor-calculator",
    fields: [{ name: "n", label: "Integer n", type: "number", defaultValue: "36" }],
    compute(v) {
      const n = parseNum(v.n);
      if (Number.isNaN(n) || !Number.isInteger(n) || n === 0) return err("Enter a non-zero integer.");
      const factors = allFactors(n);
      return ok([
        { label: "Factors", value: factors.join(", "), emphasize: true },
        { label: "Count", value: String(factors.length) },
      ]);
    },
  },
  {
    slug: "rounding-calculator",
    fields: [
      {
        name: "mode",
        label: "Mode",
        type: "select",
        options: [
          { value: "dec", label: "Decimal places" },
          { value: "sig", label: "Significant figures" },
        ],
      },
      { name: "value", label: "Number", type: "number", step: "any", defaultValue: "3.14159265" },
      { name: "n", label: "Decimal places / sig figs", type: "number", min: 0, max: 15, defaultValue: "3" },
    ],
    compute(v) {
      const value = parseNum(v.value);
      const n = parseNum(v.n);
      if (Number.isNaN(value) || Number.isNaN(n)) return err("Enter valid values.");
      if (!Number.isInteger(n) || n < 0) return err("n must be a non-negative integer.");
      const result = v.mode === "sig" ? roundToSigFig(value, n) : round(value, n);
      return ok([{ label: "Rounded value", value: fmt(result, 10), emphasize: true }]);
    },
  },
  {
    slug: "matrix-calculator",
    fields: [
      {
        name: "size",
        label: "Matrix size",
        type: "select",
        options: [
          { value: "2", label: "2×2" },
          { value: "3", label: "3×3" },
        ],
      },
      {
        name: "op",
        label: "Operation",
        type: "select",
        options: [
          { value: "detA", label: "Determinant of A" },
          { value: "add", label: "A + B" },
        ],
      },
      { name: "rowA1", label: "Matrix A row 1", type: "text", defaultValue: "1, 2" },
      { name: "rowA2", label: "Matrix A row 2", type: "text", defaultValue: "3, 4" },
      { name: "rowA3", label: "Matrix A row 3 (3×3)", type: "text", defaultValue: "0, 0, 1" },
      { name: "rowB1", label: "Matrix B row 1 (add)", type: "text", defaultValue: "5, 6" },
      { name: "rowB2", label: "Matrix B row 2 (add)", type: "text", defaultValue: "7, 8" },
      { name: "rowB3", label: "Matrix B row 3 (3×3 add)", type: "text", defaultValue: "1, 0, 0" },
    ],
    compute(v) {
      const size = parseInt(v.size, 10);
      const rowsA = size === 2 ? [v.rowA1, v.rowA2] : [v.rowA1, v.rowA2, v.rowA3];
      const A = parseMatrixRows(rowsA, size);
      if (!A) return err("Enter valid matrix A rows (comma-separated entries).");
      if (v.op === "detA") {
        const det = size === 2 ? det2(A) : det3(A);
        return ok([{ label: "det(A)", value: fmt(det, 6), emphasize: true }]);
      }
      const rowsB = size === 2 ? [v.rowB1, v.rowB2] : [v.rowB1, v.rowB2, v.rowB3];
      const B = parseMatrixRows(rowsB, size);
      if (!B) return err("Enter valid matrix B rows.");
      const sum = addMatrices(A, B);
      return ok([
        { label: "A + B", value: matrixToString(sum), emphasize: true },
      ]);
    },
  },
  {
    slug: "scientific-notation-calculator",
    fields: [
      {
        name: "mode",
        label: "Mode",
        type: "select",
        options: [
          { value: "toSci", label: "Decimal → scientific notation" },
          { value: "fromSci", label: "Scientific notation → decimal" },
        ],
      },
      { name: "value", label: "Value", type: "text", defaultValue: "602000000000000000000000" },
    ],
    compute(v) {
      if (v.mode === "toSci") {
        const n = parseNum(v.value);
        if (Number.isNaN(n)) return err("Enter a valid number.");
        const { coeff, exp } = toSciNotation(n);
        return ok([
          { label: "Scientific notation", value: `${fmt(coeff, 6)} × 10^${exp}`, emphasize: true },
        ]);
      }
      const n = parseSciInput(v.value);
      if (n === null) return err("Enter like 3.2e8 or 3.2*10^8");
      return ok([{ label: "Decimal", value: formatNumber(n), emphasize: true }]);
    },
  },
  {
    slug: "big-number-calculator",
    fields: [
      {
        name: "op",
        label: "Operation",
        type: "select",
        options: [
          { value: "add", label: "Add" },
          { value: "mul", label: "Multiply" },
          { value: "pow", label: "Power (small exponent)" },
        ],
      },
      { name: "a", label: "Integer A", type: "text", defaultValue: "999999999999999999" },
      { name: "b", label: "Integer B / exponent", type: "text", defaultValue: "1" },
    ],
    compute(v) {
      const a = parseBigIntSafe(v.a);
      const b = parseBigIntSafe(v.b);
      if (a === null || b === null) return err("Enter integers only (no decimals).");
      if (v.op === "add") return ok([{ label: "A + B", value: (a + b).toString(), emphasize: true }]);
      if (v.op === "mul") return ok([{ label: "A × B", value: (a * b).toString(), emphasize: true }]);
      if (b < BigInt(0) || b > BigInt(1000)) return err("Exponent must be an integer from 0 to 1000.");
      let result = BigInt(1);
      for (let i = BigInt(0); i < b; i += BigInt(1)) result *= a;
      return ok([{ label: "A^B", value: result.toString(), emphasize: true }]);
    },
  },
  {
    slug: "prime-factorization-calculator",
    fields: [{ name: "n", label: "Integer n (> 1)", type: "number", min: 2, defaultValue: "360" }],
    compute(v) {
      const n = parseNum(v.n);
      if (Number.isNaN(n) || !Number.isInteger(n) || n < 2) return err("Enter an integer ≥ 2.");
      const factors = primeFactors(n);
      const grouped = new Map<number, number>();
      for (const p of factors) grouped.set(p, (grouped.get(p) ?? 0) + 1);
      const expr = [...grouped.entries()].map(([p, c]) => (c === 1 ? String(p) : `${p}^${c}`)).join(" × ");
      return ok([
        { label: "Prime factors", value: factors.join(" × "), emphasize: true },
        { label: "Factorization", value: expr },
      ]);
    },
  },
  {
    slug: "common-factor-calculator",
    fields: [
      {
        name: "data",
        label: "Integers (comma-separated)",
        type: "text",
        defaultValue: "24, 36, 60",
      },
    ],
    compute(v) {
      const nums = parseList(v.data);
      if (!nums || nums.length < 2) return err("Enter at least two integers.");
      if (nums.some((n) => !Number.isInteger(n))) return err("All values must be integers.");
      let g = Math.abs(Math.trunc(nums[0]));
      for (let i = 1; i < nums.length; i++) g = gcdInt(g, nums[i]);
      return ok([{ label: "Greatest common factor", value: String(g), emphasize: true }]);
    },
  },
  {
    slug: "basic-calculator",
    fields: [
      {
        name: "expr",
        label: "Expression",
        type: "text",
        placeholder: "2 + 3 * 4",
        defaultValue: "2 + 3 * 4",
      },
    ],
    compute(v) {
      const result = evaluateExpression(v.expr, { mode: "deg", ans: 0 });
      if (Number.isNaN(result)) return err("Could not evaluate expression. Use + − × ÷ ^ ( ) and numbers.");
      return ok([{ label: "Result", value: formatNumber(result), emphasize: true }]);
    },
  },
  {
    slug: "long-division-calculator",
    fields: [
      { name: "dividend", label: "Dividend", type: "number", defaultValue: "100" },
      { name: "divisor", label: "Divisor", type: "number", defaultValue: "7" },
    ],
    compute(v) {
      const dividend = parseNum(v.dividend);
      const divisor = parseNum(v.divisor);
      if (Number.isNaN(dividend) || Number.isNaN(divisor)) return err("Enter valid numbers.");
      if (!Number.isInteger(dividend) || !Number.isInteger(divisor)) return err("Use integers for long division.");
      if (divisor === 0) return err("Divisor cannot be zero.");
      const q = Math.trunc(dividend / divisor);
      const r = dividend - q * divisor;
      return ok([
        { label: "Quotient", value: String(q), emphasize: true },
        { label: "Remainder", value: String(r) },
        { label: "Decimal", value: fmt(dividend / divisor, 8) },
      ]);
    },
  },
  {
    slug: "average-calculator",
    fields: [
      {
        name: "data",
        label: "Numbers (comma-separated)",
        type: "text",
        defaultValue: "10, 20, 30, 40",
      },
    ],
    compute(v) {
      const nums = parseList(v.data);
      if (!nums || nums.length === 0) return err("Enter at least one number.");
      const sum = nums.reduce((a, b) => a + b, 0);
      const avg = sum / nums.length;
      return ok([
        { label: "Average (mean)", value: fmt(avg, 6), emphasize: true },
        { label: "Sum", value: fmt(sum, 6) },
        { label: "Count", value: String(nums.length) },
      ]);
    },
  },
  {
    slug: "p-value-calculator",
    fields: [
      { name: "z", label: "Z statistic", type: "number", step: "any", defaultValue: "1.96" },
    ],
    compute(v) {
      const z = parseNum(v.z);
      if (Number.isNaN(z)) return err("Enter a valid z statistic.");
      const pTwo = 2 * (1 - normalCdf(Math.abs(z)));
      return ok([
        { label: "Two-tailed p-value", value: fmt(pTwo, 6), emphasize: true },
        { label: "One-tailed p-value", value: fmt(1 - normalCdf(Math.abs(z)), 6) },
      ]);
    },
  },
];
