import type { CalcResult, FieldDef } from "@/components/calc/FormulaCalculator";
import { payment } from "@/lib/calc/finance-core";
import { fmt, fmtMoney, parseNum, round } from "@/lib/calc/format";
import { evaluateExpression } from "@/lib/sci-eval";
import { absoluteUrl } from "@/lib/site";

export type CalcDef = {
  slug: string;
  fields: FieldDef[];
  compute: (values: Record<string, string>) => CalcResult;
};

function err(message: string): CalcResult {
  return { error: message };
}

function embedIframe(path: string, height = 520): string {
  const src = absoluteUrl(path);
  return `<iframe src="${src}" width="100%" height="${height}" style="max-width:480px;border:0;border-radius:8px" loading="lazy" title="FigSumo calculator"></iframe>`;
}

function loveScore(nameA: string, nameB: string): number {
  const s = `${nameA.trim().toLowerCase()}${nameB.trim().toLowerCase()}`.replace(/\s+/g, "");
  if (!s) return NaN;
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(h, 33) + s.charCodeAt(i)) >>> 0;
  }
  return (h % 86) + 13;
}

function concreteCubicYards(lengthFt: number, widthFt: number, depthIn: number): number {
  const cuFt = lengthFt * widthFt * (depthIn / 12);
  return cuFt / 27;
}

export const embedDefs: CalcDef[] = [
  {
    slug: "mortgage-calculator-for-your-site",
    fields: [
      { name: "principal", label: "Loan amount", type: "number", defaultValue: "320000", min: 0, step: "1000" },
      { name: "rate", label: "Interest rate (APR %)", type: "number", defaultValue: "6.5", min: 0, step: "0.01" },
      { name: "years", label: "Loan term (years)", type: "number", defaultValue: "30", min: 1, max: 40, step: "1" },
      {
        name: "width",
        label: "Embed width (px)",
        type: "number",
        defaultValue: "480",
        min: 280,
        max: 960,
        step: "10",
      },
    ],
    compute(values) {
      const principal = parseNum(values.principal);
      const rate = parseNum(values.rate);
      const years = parseNum(values.years);
      const width = parseNum(values.width);
      if (principal <= 0 || years <= 0) return err("Enter a positive loan amount and term.");
      const pmt = payment(principal, rate, years);
      if (!Number.isFinite(pmt)) return err("Could not compute payment with these inputs.");
      const w = Number.isFinite(width) && width > 0 ? Math.round(width) : 480;
      const src = absoluteUrl("/mortgage-calculator");
      const snippet = `<iframe src="${src}" width="${w}" height="520" style="border:0;border-radius:8px" loading="lazy" title="Mortgage calculator"></iframe>`;
      return {
        rows: [
          { label: "Estimated monthly payment", value: fmtMoney(pmt), emphasize: true },
          { label: "Total of payments", value: fmtMoney(pmt * years * 12) },
          { label: "Embed code", value: snippet },
        ],
      };
    },
  },
  {
    slug: "math-calculator-for-your-site",
    fields: [
      {
        name: "expression",
        label: "Sample expression",
        type: "text",
        defaultValue: "12*(3+4)",
        placeholder: "e.g. 12*(3+4)",
      },
      {
        name: "width",
        label: "Embed width (px)",
        type: "number",
        defaultValue: "480",
        min: 280,
        max: 960,
        step: "10",
      },
    ],
    compute(values) {
      const expr = values.expression.trim();
      if (!expr) return err("Enter an expression to preview.");
      let result: number;
      try {
        result = evaluateExpression(expr, { mode: "deg", ans: 0 });
      } catch {
        return err("Invalid expression for preview.");
      }
      if (!Number.isFinite(result)) return err("Expression did not produce a finite number.");
      const w = parseNum(values.width);
      const width = Number.isFinite(w) && w > 0 ? Math.round(w) : 480;
      const src = absoluteUrl("/scientific-calculator");
      const snippet = `<iframe src="${src}" width="${width}" height="520" style="border:0;border-radius:8px" loading="lazy" title="Math calculator"></iframe>`;
      return {
        rows: [
          { label: "Preview result", value: fmt(result, 8), emphasize: true },
          { label: "Embed code", value: snippet },
        ],
      };
    },
  },
  {
    slug: "scientific-calculator-for-your-site",
    fields: [
      {
        name: "expression",
        label: "Sample expression",
        type: "text",
        defaultValue: "sin(30)+sqrt(16)",
        placeholder: "e.g. sin(30)+sqrt(16)",
      },
      {
        name: "width",
        label: "Embed width (px)",
        type: "number",
        defaultValue: "480",
        min: 280,
        max: 960,
        step: "10",
      },
    ],
    compute(values) {
      const expr = values.expression.trim();
      if (!expr) return err("Enter an expression to preview.");
      let result: number;
      try {
        result = evaluateExpression(expr, { mode: "deg", ans: 0 });
      } catch {
        return err("Invalid expression for preview.");
      }
      if (!Number.isFinite(result)) return err("Expression did not produce a finite number.");
      const w = parseNum(values.width);
      const width = Number.isFinite(w) && w > 0 ? Math.round(w) : 480;
      const snippet = embedIframe("/scientific-calculator", 560).replace(
        'width="100%"',
        `width="${width}"`,
      );
      return {
        rows: [
          { label: "Preview result", value: fmt(result, 8), emphasize: true },
          { label: "Embed code", value: snippet },
        ],
      };
    },
  },
  {
    slug: "love-calculator-for-your-site",
    fields: [
      { name: "nameA", label: "First name", type: "text", defaultValue: "Alex", placeholder: "Name 1" },
      { name: "nameB", label: "Second name", type: "text", defaultValue: "Jordan", placeholder: "Name 2" },
      {
        name: "width",
        label: "Embed width (px)",
        type: "number",
        defaultValue: "400",
        min: 280,
        max: 720,
        step: "10",
      },
    ],
    compute(values) {
      const a = values.nameA.trim();
      const b = values.nameB.trim();
      if (!a || !b) return err("Enter both names.");
      const score = loveScore(a, b);
      const w = parseNum(values.width);
      const width = Number.isFinite(w) && w > 0 ? Math.round(w) : 400;
      const src = absoluteUrl("/love-calculator");
      const snippet = `<iframe src="${src}" width="${width}" height="420" style="border:0;border-radius:8px" loading="lazy" title="Love calculator"></iframe>`;
      return {
        rows: [
          { label: "Compatibility", value: `${score}%`, emphasize: true },
          { label: "Embed code", value: snippet },
        ],
      };
    },
  },
  {
    slug: "concrete-calculator-for-your-site",
    fields: [
      { name: "length", label: "Length (ft)", type: "number", defaultValue: "12", min: 0, step: "0.1" },
      { name: "width", label: "Width (ft)", type: "number", defaultValue: "10", min: 0, step: "0.1" },
      { name: "depth", label: "Depth (in)", type: "number", defaultValue: "4", min: 0, step: "0.25" },
      {
        name: "embedWidth",
        label: "Embed width (px)",
        type: "number",
        defaultValue: "480",
        min: 280,
        max: 960,
        step: "10",
      },
    ],
    compute(values) {
      const length = parseNum(values.length);
      const width = parseNum(values.width);
      const depth = parseNum(values.depth);
      if (length <= 0 || width <= 0 || depth <= 0) {
        return err("Enter positive length, width, and depth.");
      }
      const yards = round(concreteCubicYards(length, width, depth), 2);
      const ew = parseNum(values.embedWidth);
      const embedW = Number.isFinite(ew) && ew > 0 ? Math.round(ew) : 480;
      const src = absoluteUrl("/concrete-calculator");
      const snippet = `<iframe src="${src}" width="${embedW}" height="480" style="border:0;border-radius:8px" loading="lazy" title="Concrete calculator"></iframe>`;
      return {
        rows: [
          { label: "Concrete needed", value: `${fmt(yards, 2)} yd³`, emphasize: true },
          { label: "Embed code", value: snippet },
        ],
      };
    },
  },
];
