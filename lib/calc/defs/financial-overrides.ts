import type { CalcDef } from "@/lib/calc/types";
import {
  canadianMortgagePayment,
  compoundFutureValueMonthly,
  compoundInterestAmount,
  interestRateFromPayment,
  simpleInterest,
} from "@/lib/calc/finance-core";
import { fmtMoney, fmtPct, parseNum, round } from "@/lib/calc/format";
import {
  interestRateDetailResult,
  loanDetailResult,
} from "@/lib/calc/loan-detail";
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

function canadianCompute(v: Record<string, string>): CalcResult {
  const amount = num(v, "amount");
  const rate = num(v, "rate");
  const { years, y, m } = termYears(v);
  if (!(amount > 0)) return { error: "Enter a valid loan amount." };
  if (!(rate >= 0)) return { error: "Enter a valid interest rate." };
  if (!(years > 0)) return { error: "Enter a valid loan term." };

  // Convert Canadian semi-annual nominal rate to equivalent US monthly rate
  // for schedule building, while showing Canadian payment as primary.
  const canPmt = canadianMortgagePayment(amount, rate, years);
  if (!Number.isFinite(canPmt)) {
    return { error: "Could not compute Canadian mortgage payment." };
  }
  const equivAnnual = interestRateFromPayment(amount, canPmt, years);

  const detail = loanDetailResult({
    principal: amount,
    annualRatePct: Number.isFinite(equivAnnual) ? equivAnnual : rate,
    years: y,
    months: m,
    primaryLabel: "Monthly payment",
  });
  if ("error" in detail) return detail;
  return {
    ...detail,
    rows: [
      {
        label: "Monthly payment",
        value: fmtMoney(canPmt),
        emphasize: true,
      },
      ...detail.rows.filter((r) => r.label !== "Monthly payment"),
      {
        label: "Quoted rate (semi-annual)",
        value: fmtPct(rate, 3),
      },
    ],
    note: "Canadian mortgages compound interest semi-annually. Payment uses that convention; schedule uses an equivalent monthly rate.",
  };
}

const standardLoanSlugs = [
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
  "mortgage-amortization-calculator",
  "refinance-calculator",
] as const;

export const financialOverrides: CalcDef[] = [
  ...standardLoanSlugs.map(
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
    slug: "canadian-mortgage-calculator",
    fields: loanFields("400000", "5", "25"),
    compute: canadianCompute,
  },
  {
    slug: "interest-rate-calculator",
    fields: [
      {
        name: "amount",
        label: "Loan amount",
        type: "number",
        defaultValue: "32000",
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
        defaultValue: "960",
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
    slug: "interest-calculator",
    fields: [
      {
        name: "principal",
        label: "Principal",
        type: "number",
        defaultValue: "10000",
        prefix: "$",
      },
      {
        name: "rate",
        label: "Annual rate",
        type: "number",
        defaultValue: "5",
        suffix: "%",
      },
      {
        name: "years",
        label: "Time (years)",
        type: "number",
        defaultValue: "3",
        step: "0.25",
      },
      {
        name: "mode",
        label: "Interest type",
        type: "select",
        defaultValue: "compound",
        options: [
          { value: "simple", label: "Simple" },
          { value: "compound", label: "Compound (monthly)" },
        ],
      },
    ],
    compute(v) {
      const p = num(v, "principal");
      const r = num(v, "rate");
      const y = num(v, "years");
      if (!(p > 0)) return { error: "Enter a valid principal." };
      if (!(r >= 0)) return { error: "Enter a valid rate." };
      if (!(y > 0)) return { error: "Enter a valid time period." };
      const simple = simpleInterest(p, r, y);
      const compound = compoundInterestAmount(p, r, y, 12);
      const interest = v.mode === "simple" ? simple : compound;
      const total = p + interest;
      return {
        rows: [
          {
            label: v.mode === "simple" ? "Simple interest" : "Compound interest",
            value: fmtMoney(interest),
            emphasize: true,
          },
          { label: "Total amount", value: fmtMoney(total) },
          { label: "Principal", value: fmtMoney(p) },
          {
            label: "Compare other method",
            value:
              v.mode === "simple"
                ? `Compound ≈ ${fmtMoney(compound)}`
                : `Simple ≈ ${fmtMoney(simple)}`,
          },
        ],
        breakdown: [
          { label: "Principal", value: p, color: "#2563EB" },
          { label: "Interest", value: Math.max(0, interest), color: "#101010" },
        ],
        note: "Compound option assumes monthly compounding.",
      };
    },
  },
  {
    slug: "compound-interest-calculator",
    fields: [
      {
        name: "principal",
        label: "Starting amount",
        type: "number",
        defaultValue: "10000",
        prefix: "$",
      },
      {
        name: "rate",
        label: "Annual rate",
        type: "number",
        defaultValue: "6",
        suffix: "%",
      },
      {
        name: "years",
        label: "Years",
        type: "number",
        defaultValue: "10",
        step: "1",
      },
      {
        name: "compounds",
        label: "Compounds / year",
        type: "number",
        defaultValue: "12",
        step: "1",
      },
      {
        name: "pmt",
        label: "Monthly contribution",
        type: "number",
        defaultValue: "200",
        prefix: "$",
      },
    ],
    compute(v) {
      const principal = num(v, "principal");
      const rate = num(v, "rate");
      const years = num(v, "years");
      const compounds = num(v, "compounds") || 12;
      const monthly = num(v, "pmt") || 0;
      if (!(principal >= 0) || !(rate >= 0) || !(years > 0)) {
        return { error: "Enter valid principal, rate, and years." };
      }
      const fv = compoundFutureValueMonthly(
        principal,
        rate,
        years,
        compounds,
        monthly,
      );
      const contributed = principal + monthly * years * 12;
      const interest = fv - contributed;
      const yearly = [];
      for (let y = 0; y <= years; y++) {
        yearly.push({
          x: y,
          y: compoundFutureValueMonthly(principal, rate, y, compounds, monthly),
          label: String(y),
        });
      }
      return {
        rows: [
          { label: "Future value", value: fmtMoney(fv), emphasize: true },
          { label: "Total contributions", value: fmtMoney(contributed) },
          { label: "Total interest", value: fmtMoney(interest) },
          {
            label: "Effective growth",
            value: fmtPct(
              round((fv / Math.max(contributed, 1) - 1) * 100, 2),
            ),
          },
        ],
        breakdown: [
          {
            label: "Contributions",
            value: Math.max(0, contributed),
            color: "#2563EB",
          },
          { label: "Interest", value: Math.max(0, interest), color: "#101010" },
        ],
        series: [{ name: "Balance", color: "#2563EB", points: yearly }],
        note: "Monthly contributions are converted to each compounding period. Assumes end-of-period deposits.",
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
