import type { CalcDef } from "@/lib/calc/types";
import { parseNum } from "@/lib/calc/format";
import {
  interestRateDetailResult,
  loanDetailResult,
} from "@/lib/calc/loan-detail";
import { compoundFutureValue } from "@/lib/calc/finance-core";
import { fmtMoney, fmtPct, round } from "@/lib/calc/format";
import type { CalcResult } from "@/lib/calc/result-types";

function num(v: Record<string, string>, key: string) {
  return parseNum(v[key] ?? "");
}

function termYears(v: Record<string, string>) {
  const y = num(v, "years");
  const m = num(v, "months");
  const years = (Number.isFinite(y) ? y : 0) + (Number.isFinite(m) ? m : 0) / 12;
  return { years, y: Number.isFinite(y) ? y : 0, m: Number.isFinite(m) ? m : 0 };
}

const loanFields = (
  amountDefault: string,
  rateDefault: string,
  yearsDefault: string,
): CalcDef["fields"] => [
  {
    name: "amount",
    label: "Loan amount",
    type: "number",
    defaultValue: amountDefault,
    prefix: "$",
  },
  {
    name: "rate",
    label: "Interest rate",
    type: "number",
    defaultValue: rateDefault,
    suffix: "%",
    step: "0.001",
  },
  {
    name: "years",
    label: "Loan term (years)",
    type: "number",
    defaultValue: yearsDefault,
    step: "1",
    min: 0,
  },
  {
    name: "months",
    label: "Loan term (months)",
    type: "number",
    defaultValue: "0",
    step: "1",
    min: 0,
    max: 11,
  },
];

function loanCompute(v: Record<string, string>): CalcResult {
  const amount = num(v, "amount");
  const rate = num(v, "rate");
  const { years, y, m } = termYears(v);
  if (!(amount > 0)) return { error: "Enter a valid loan amount." };
  if (!(rate >= 0)) return { error: "Enter a valid interest rate." };
  if (!(years > 0)) return { error: "Enter a valid loan term." };
  return loanDetailResult({
    principal: amount,
    annualRatePct: rate,
    years: y,
    months: m,
  });
}

const loanSlugs = [
  "mortgage-calculator",
  "loan-calculator",
  "auto-loan-calculator",
  "payment-calculator",
  "amortization-calculator",
  "student-loan-calculator",
  "business-loan-calculator",
  "personal-loan-calculator",
  "boat-loan-calculator",
  "fha-loan-calculator",
  "va-mortgage-calculator",
  "home-equity-loan-calculator",
  "heloc-calculator",
  "mortgage-calculator-uk",
  "canadian-mortgage-calculator",
  "mortgage-amortization-calculator",
  "refinance-calculator",
] as const;

export const financialOverrides: CalcDef[] = [
  ...loanSlugs.map(
    (slug): CalcDef => ({
      slug,
      fields: loanFields(
        slug.includes("mortgage") || slug.includes("fha") || slug.includes("va")
          ? "400000"
          : slug.includes("auto") || slug.includes("boat")
            ? "30000"
            : "20000",
        slug.includes("mortgage") || slug.includes("fha") || slug.includes("va")
          ? "6.5"
          : "7.5",
        slug.includes("mortgage") || slug.includes("fha") || slug.includes("va")
          ? "30"
          : "5",
      ),
      compute: loanCompute,
    }),
  ),
  {
    slug: "interest-rate-calculator",
    fields: [
      {
        name: "amount",
        label: "Loan amount",
        type: "number",
        defaultValue: "2000",
        prefix: "$",
      },
      {
        name: "years",
        label: "Loan term (years)",
        type: "number",
        defaultValue: "3",
        step: "1",
        min: 0,
      },
      {
        name: "months",
        label: "Loan term (months)",
        type: "number",
        defaultValue: "0",
        step: "1",
        min: 0,
        max: 11,
      },
      {
        name: "payment",
        label: "Monthly payment",
        type: "number",
        defaultValue: "60",
        prefix: "$",
      },
    ],
    compute(v) {
      const amount = num(v, "amount");
      const paymentAmt = num(v, "payment");
      const { y, m, years } = termYears(v);
      if (!(amount > 0)) return { error: "Enter a valid loan amount." };
      if (!(paymentAmt > 0)) return { error: "Enter a valid monthly payment." };
      if (!(years > 0)) return { error: "Enter a valid loan term." };
      return interestRateDetailResult({
        principal: amount,
        monthlyPayment: paymentAmt,
        years: y,
        months: m,
      });
    },
  },
  {
    slug: "compound-interest-calculator",
    fields: [
      { name: "principal", label: "Starting amount", type: "number", defaultValue: "10000", prefix: "$" },
      { name: "rate", label: "Annual rate", type: "number", defaultValue: "6", suffix: "%" },
      { name: "years", label: "Years", type: "number", defaultValue: "10", step: "1" },
      { name: "compounds", label: "Compounds / year", type: "number", defaultValue: "12", step: "1" },
      { name: "pmt", label: "Monthly contribution", type: "number", defaultValue: "200", prefix: "$" },
    ],
    compute(v) {
      const principal = num(v, "principal");
      const rate = num(v, "rate");
      const years = num(v, "years");
      const compounds = num(v, "compounds") || 12;
      const pmt = num(v, "pmt") || 0;
      if (!(principal >= 0) || !(rate >= 0) || !(years > 0)) {
        return { error: "Enter valid principal, rate, and years." };
      }
      const fv = compoundFutureValue(principal, rate, years, compounds, pmt);
      const contributed = principal + pmt * years * 12;
      const interest = fv - contributed;
      const yearly: { x: number; y: number }[] = [];
      for (let y = 0; y <= years; y++) {
        yearly.push({
          x: y,
          y: compoundFutureValue(principal, rate, y, compounds, pmt),
        });
      }
      return {
        rows: [
          { label: "Future value", value: fmtMoney(fv), emphasize: true },
          { label: "Total contributions", value: fmtMoney(contributed) },
          { label: "Total interest", value: fmtMoney(interest) },
          { label: "Effective growth", value: fmtPct(round(((fv / Math.max(contributed, 1)) - 1) * 100, 2)) },
        ],
        breakdown: [
          { label: "Contributions", value: Math.max(0, contributed), color: "#2563EB" },
          { label: "Interest", value: Math.max(0, interest), color: "#101010" },
        ],
        series: [
          {
            name: "Balance",
            color: "#2563EB",
            points: yearly.map((p) => ({ ...p, label: String(p.x) })),
          },
        ],
        note: "Assumes contributions at period end and a fixed rate.",
      };
    },
  },
];

/** Merge overrides on top of base defs by slug. */
export function applyFinancialOverrides(base: CalcDef[]): CalcDef[] {
  const map = new Map(base.map((d) => [d.slug, d]));
  for (const o of financialOverrides) map.set(o.slug, o);
  return [...map.values()];
}
