import type { CalcResult, FieldDef } from "@/components/calc/FormulaCalculator";
import {
  amortizationSchedule,
  compoundFutureValue,
  interestRateFromPayment,
  irr,
  payment,
  presentValue,
  simpleInterest,
} from "@/lib/calc/finance-core";
import { fmt, fmtMoney, fmtPct, parseNum, round } from "@/lib/calc/format";

export type CalcDef = {
  slug: string;
  fields: FieldDef[];
  compute: (v: Record<string, string>) => CalcResult;
};

type Row = { label: string; value: string; emphasize?: boolean };

function val(v: Record<string, string>, key: string): number {
  return parseNum(v[key] ?? "");
}

function err(msg: string): CalcResult {
  return { error: msg };
}

function ok(rows: Row[]): CalcResult {
  return { rows };
}

function needNum(n: number, label: string): string | null {
  if (!Number.isFinite(n)) return `Enter a valid ${label}.`;
  return null;
}

function needPos(n: number, label: string): string | null {
  const e = needNum(n, label);
  if (e) return e;
  if (n <= 0) return `${label} must be greater than zero.`;
  return null;
}

function needNonNeg(n: number, label: string): string | null {
  const e = needNum(n, label);
  if (e) return e;
  if (n < 0) return `${label} cannot be negative.`;
  return null;
}

function federalTax(taxable: number, married: boolean): number {
  const t = Math.max(0, taxable);
  const brackets = married
    ? [
        [23200, 0.1],
        [94300, 0.12],
        [201050, 0.22],
        [383900, 0.24],
        [487450, 0.32],
        [731200, 0.35],
        [Infinity, 0.37],
      ]
    : [
        [11600, 0.1],
        [47150, 0.12],
        [100525, 0.22],
        [191950, 0.24],
        [243725, 0.32],
        [609350, 0.35],
        [Infinity, 0.37],
      ];
  let tax = 0;
  let prev = 0;
  for (const [top, rate] of brackets) {
    if (t <= prev) break;
    const slice = Math.min(t, top) - prev;
    tax += slice * rate;
    prev = top;
  }
  return tax;
}

function canadianMonthlyRate(nominalAnnualPct: number): number {
  const r = nominalAnnualPct / 100;
  return Math.pow(1 + r / 2, 2 / 12) - 1;
}

function creditPayoffMonths(
  balance: number,
  aprPct: number,
  minPct: number,
  minFixed: number,
): { months: number; interest: number } {
  let b = balance;
  let months = 0;
  let interest = 0;
  const r = aprPct / 100 / 12;
  while (b > 0.005 && months < 600) {
    months += 1;
    const int = b * r;
    interest += int;
    let pmt = Math.max(minFixed, (b * minPct) / 100);
    pmt = Math.min(pmt, b + int);
    b = b + int - pmt;
  }
  return { months, interest };
}

function amortSummaryRows(
  principal: number,
  rate: number,
  years: number,
): CalcResult {
  const e = needPos(principal, "Loan amount") ?? needPos(years, "Term");
  if (e) return err(e);
  const sched = amortizationSchedule(principal, rate, years);
  const pmt = payment(principal, rate, years);
  const totalInt = sched.reduce((s, row) => s + row.interest, 0);
  const rows: Row[] = [
    { label: "Monthly payment", value: fmtMoney(pmt), emphasize: true },
    { label: "Total payments", value: fmtMoney(pmt * sched.length) },
    { label: "Total interest", value: fmtMoney(totalInt) },
  ];
  for (let i = 0; i < Math.min(12, sched.length); i++) {
    const row = sched[i];
    rows.push({
      label: `Period ${row.period} payment`,
      value: `${fmtMoney(row.payment)} (prin ${fmtMoney(row.principal)}, int ${fmtMoney(row.interest)})`,
    });
  }
  return ok(rows);
}

function standardLoanCompute(v: Record<string, string>, amountKey = "amount"): CalcResult {
  const p = val(v, amountKey);
  const r = val(v, "rate");
  const y = val(v, "years");
  const e = needPos(p, "Loan amount") ?? needPos(y, "Term");
  if (e) return err(e);
  const pmt = payment(p, r, y);
  if (!Number.isFinite(pmt)) return err("Could not compute payment.");
  const total = pmt * y * 12;
  return ok([
    { label: "Monthly payment", value: fmtMoney(pmt), emphasize: true },
    { label: "Total of payments", value: fmtMoney(total) },
    { label: "Total interest", value: fmtMoney(total - p) },
  ]);
}

const LOAN_FIELDS: FieldDef[] = [
  { name: "amount", label: "Loan amount", type: "number", defaultValue: "25000", suffix: "$" },
  { name: "rate", label: "Annual interest rate", type: "number", defaultValue: "6.5", suffix: "%", step: "0.01" },
  { name: "years", label: "Term (years)", type: "number", defaultValue: "5", step: "1" },
];

const MORTGAGE_FIELDS: FieldDef[] = [
  { name: "price", label: "Home price", type: "number", defaultValue: "350000", suffix: "$" },
  { name: "downPct", label: "Down payment", type: "number", defaultValue: "20", suffix: "%" },
  { name: "rate", label: "Interest rate", type: "number", defaultValue: "6.75", suffix: "%", step: "0.01" },
  { name: "years", label: "Loan term (years)", type: "number", defaultValue: "30", step: "1" },
];

function mortgageLoan(v: Record<string, string>): { loan: number; e: string | null } {
  const price = val(v, "price");
  const downPct = val(v, "downPct");
  const e =
    needPos(price, "Home price") ??
    needNonNeg(downPct, "Down payment") ??
    (downPct >= 100 ? "Down payment must be less than 100%." : null);
  if (e) return { loan: NaN, e };
  return { loan: price * (1 - downPct / 100), e: null };
}

function mortgageCompute(v: Record<string, string>): CalcResult {
  const { loan, e } = mortgageLoan(v);
  if (e) return err(e);
  const y = val(v, "years");
  const r = val(v, "rate");
  const te = needPos(y, "Term");
  if (te) return err(te);
  const pmt = payment(loan, r, y);
  const total = pmt * y * 12;
  return ok([
    { label: "Loan amount", value: fmtMoney(loan) },
    { label: "Monthly payment", value: fmtMoney(pmt), emphasize: true },
    { label: "Total interest", value: fmtMoney(total - loan) },
  ]);
}

export const financialDefs: CalcDef[] = [
  { slug: "mortgage-calculator", fields: MORTGAGE_FIELDS, compute: mortgageCompute },
  { slug: "loan-calculator", fields: LOAN_FIELDS, compute: (v) => standardLoanCompute(v) },
  {
    slug: "auto-loan-calculator",
    fields: [
      { name: "price", label: "Vehicle price", type: "number", defaultValue: "32000", suffix: "$" },
      { name: "down", label: "Down payment", type: "number", defaultValue: "4000", suffix: "$" },
      { name: "trade", label: "Trade-in value", type: "number", defaultValue: "0", suffix: "$" },
      { name: "rate", label: "APR", type: "number", defaultValue: "5.9", suffix: "%", step: "0.01" },
      { name: "years", label: "Term (years)", type: "number", defaultValue: "5", step: "1" },
    ],
    compute(v) {
      const price = val(v, "price");
      const down = val(v, "down");
      const trade = val(v, "trade");
      const e =
        needPos(price, "Vehicle price") ??
        needNonNeg(down, "Down payment") ??
        needNonNeg(trade, "Trade-in");
      if (e) return err(e);
      const loan = Math.max(0, price - down - trade);
      if (loan <= 0) return err("Loan amount must be greater than zero.");
      return standardLoanCompute({ ...v, amount: String(loan) }, "amount");
    },
  },
  {
    slug: "interest-calculator",
    fields: [
      { name: "principal", label: "Principal", type: "number", defaultValue: "10000", suffix: "$" },
      { name: "rate", label: "Annual rate", type: "number", defaultValue: "5", suffix: "%" },
      { name: "years", label: "Time (years)", type: "number", defaultValue: "3", step: "0.5" },
    ],
    compute(v) {
      const p = val(v, "principal");
      const r = val(v, "rate");
      const y = val(v, "years");
      const e = needPos(p, "Principal") ?? needPos(y, "Time");
      if (e) return err(e);
      const interest = simpleInterest(p, r, y);
      return ok([
        { label: "Simple interest earned", value: fmtMoney(interest), emphasize: true },
        { label: "Total amount", value: fmtMoney(p + interest) },
      ]);
    },
  },
  {
    slug: "payment-calculator",
    fields: LOAN_FIELDS,
    compute: (v) => standardLoanCompute(v),
  },
  {
    slug: "retirement-calculator",
    fields: [
      { name: "currentAge", label: "Current age", type: "number", defaultValue: "35", step: "1" },
      { name: "retireAge", label: "Retirement age", type: "number", defaultValue: "65", step: "1" },
      { name: "savings", label: "Current savings", type: "number", defaultValue: "50000", suffix: "$" },
      { name: "monthly", label: "Monthly contribution", type: "number", defaultValue: "500", suffix: "$" },
      { name: "return", label: "Expected return", type: "number", defaultValue: "7", suffix: "%" },
    ],
    compute(v) {
      const age = val(v, "currentAge");
      const retire = val(v, "retireAge");
      const savings = val(v, "savings");
      const monthly = val(v, "monthly");
      const ret = val(v, "return");
      const e =
        needNum(age, "Current age") ??
        needNum(retire, "Retirement age") ??
        needNonNeg(savings, "Savings") ??
        needNonNeg(monthly, "Contribution");
      if (e) return err(e);
      if (retire <= age) return err("Retirement age must be after current age.");
      const years = retire - age;
      const fv = compoundFutureValue(savings, ret, years, 12, monthly);
      return ok([
        { label: "Years to retirement", value: String(years) },
        { label: "Projected balance at retirement", value: fmtMoney(fv), emphasize: true },
        { label: "Total contributions", value: fmtMoney(savings + monthly * years * 12) },
      ]);
    },
  },
  {
    slug: "amortization-calculator",
    fields: LOAN_FIELDS,
    compute(v) {
      const p = val(v, "amount");
      const r = val(v, "rate");
      const y = val(v, "years");
      return amortSummaryRows(p, r, y);
    },
  },
  {
    slug: "investment-calculator",
    fields: [
      { name: "initial", label: "Initial investment", type: "number", defaultValue: "10000", suffix: "$" },
      { name: "monthly", label: "Monthly contribution", type: "number", defaultValue: "200", suffix: "$" },
      { name: "years", label: "Years", type: "number", defaultValue: "20", step: "1" },
      { name: "rate", label: "Expected annual return", type: "number", defaultValue: "8", suffix: "%" },
    ],
    compute(v) {
      const initial = val(v, "initial");
      const monthly = val(v, "monthly");
      const years = val(v, "years");
      const rate = val(v, "rate");
      const e =
        needNonNeg(initial, "Initial investment") ??
        needNonNeg(monthly, "Contribution") ??
        needPos(years, "Years");
      if (e) return err(e);
      const fv = compoundFutureValue(initial, rate, years, 12, monthly);
      const contrib = initial + monthly * years * 12;
      return ok([
        { label: "Future value", value: fmtMoney(fv), emphasize: true },
        { label: "Total contributions", value: fmtMoney(contrib) },
        { label: "Investment growth", value: fmtMoney(fv - contrib) },
      ]);
    },
  },
  {
    slug: "currency-calculator",
    fields: [
      { name: "amount", label: "Amount", type: "number", defaultValue: "100", suffix: "$" },
      { name: "fromRate", label: "From currency (units per 1 USD)", type: "number", defaultValue: "1", step: "0.0001" },
      { name: "toRate", label: "To currency (units per 1 USD)", type: "number", defaultValue: "0.92", step: "0.0001" },
    ],
    compute(v) {
      const amount = val(v, "amount");
      const from = val(v, "fromRate");
      const to = val(v, "toRate");
      const e = needPos(amount, "Amount") ?? needPos(from, "From rate") ?? needPos(to, "To rate");
      if (e) return err(e);
      const usd = amount / from;
      const converted = usd * to;
      return ok([
        { label: "Amount in USD (estimate)", value: fmtMoney(usd) },
        { label: "Converted amount", value: fmt(converted, 4), emphasize: true },
      ]);
    },
  },
  {
    slug: "inflation-calculator",
    fields: [
      { name: "amount", label: "Amount today", type: "number", defaultValue: "1000", suffix: "$" },
      { name: "years", label: "Years", type: "number", defaultValue: "10", step: "1" },
      { name: "inflation", label: "Inflation rate", type: "number", defaultValue: "3", suffix: "%" },
    ],
    compute(v) {
      const amount = val(v, "amount");
      const years = val(v, "years");
      const inflation = val(v, "inflation");
      const e = needPos(amount, "Amount") ?? needPos(years, "Years");
      if (e) return err(e);
      const futureCost = amount * Math.pow(1 + inflation / 100, years);
      const purchasing = amount / Math.pow(1 + inflation / 100, years);
      return ok([
        { label: "Future cost (same purchasing power)", value: fmtMoney(futureCost), emphasize: true },
        { label: "Today's dollars equivalent", value: fmtMoney(purchasing) },
      ]);
    },
  },
  {
    slug: "finance-calculator",
    fields: [
      { name: "loan", label: "Loan balance", type: "number", defaultValue: "15000", suffix: "$" },
      { name: "rate", label: "Annual rate", type: "number", defaultValue: "7", suffix: "%" },
      { name: "years", label: "Years", type: "number", defaultValue: "4", step: "1" },
      { name: "monthlySave", label: "Monthly savings", type: "number", defaultValue: "250", suffix: "$" },
    ],
    compute(v) {
      const loan = val(v, "loan");
      const rate = val(v, "rate");
      const years = val(v, "years");
      const monthlySave = val(v, "monthlySave");
      const e = needPos(loan, "Loan") ?? needPos(years, "Years") ?? needNonNeg(monthlySave, "Savings");
      if (e) return err(e);
      const pmt = payment(loan, rate, years);
      const fv = compoundFutureValue(0, rate, years, 12, monthlySave);
      return ok([
        { label: "Loan payment (monthly)", value: fmtMoney(pmt) },
        { label: "Savings future value", value: fmtMoney(fv), emphasize: true },
        { label: "Net monthly (save − payment)", value: fmtMoney(monthlySave - pmt) },
      ]);
    },
  },
  {
    slug: "mortgage-payoff-calculator",
    fields: [
      ...MORTGAGE_FIELDS,
      { name: "extra", label: "Extra monthly payment", type: "number", defaultValue: "200", suffix: "$" },
    ],
    compute(v) {
      const { loan, e } = mortgageLoan(v);
      if (e) return err(e);
      const r = val(v, "rate");
      const y = val(v, "years");
      const extra = val(v, "extra");
      const te = needPos(y, "Term") ?? needNonNeg(extra, "Extra payment");
      if (te) return err(te);
      const basePmt = payment(loan, r, y);
      const monthly = basePmt + extra;
      const rm = r / 100 / 12;
      let balance = loan;
      let months = 0;
      let interest = 0;
      while (balance > 0.01 && months < y * 12 + 600) {
        months += 1;
        const int = balance * rm;
        interest += int;
        let prin = monthly - int;
        if (prin > balance) prin = balance;
        balance -= prin;
      }
      const baseSched = amortizationSchedule(loan, r, y);
      const baseInt = baseSched.reduce((s, row) => s + row.interest, 0);
      return ok([
        { label: "Standard monthly payment", value: fmtMoney(basePmt) },
        { label: "With extra payment", value: fmtMoney(monthly), emphasize: true },
        { label: "Payoff time", value: `${months} months (${fmt(months / 12, 1)} years)` },
        { label: "Interest saved (estimate)", value: fmtMoney(Math.max(0, baseInt - interest)) },
      ]);
    },
  },
  {
    slug: "income-tax-calculator",
    fields: [
      { name: "income", label: "Taxable income", type: "number", defaultValue: "75000", suffix: "$" },
      {
        name: "filing",
        label: "Filing status",
        type: "select",
        defaultValue: "single",
        options: [
          { value: "single", label: "Single" },
          { value: "married", label: "Married filing jointly" },
        ],
      },
    ],
    compute(v) {
      const income = val(v, "income");
      const e = needNonNeg(income, "Income");
      if (e) return err(e);
      const married = v.filing === "married";
      const tax = federalTax(income, married);
      const eff = income > 0 ? (tax / income) * 100 : 0;
      return ok([
        { label: "Estimated federal income tax", value: fmtMoney(tax), emphasize: true },
        { label: "Effective tax rate (estimate)", value: fmtPct(round(eff, 2)) },
        { label: "Note", value: "Illustrative U.S. brackets only; not tax advice." },
      ]);
    },
  },
  {
    slug: "compound-interest-calculator",
    fields: [
      { name: "principal", label: "Principal", type: "number", defaultValue: "5000", suffix: "$" },
      { name: "rate", label: "Annual rate", type: "number", defaultValue: "6", suffix: "%" },
      { name: "years", label: "Years", type: "number", defaultValue: "10", step: "1" },
      { name: "compounds", label: "Compounds per year", type: "number", defaultValue: "12", step: "1" },
    ],
    compute(v) {
      const p = val(v, "principal");
      const r = val(v, "rate");
      const y = val(v, "years");
      const c = val(v, "compounds");
      const e = needPos(p, "Principal") ?? needPos(y, "Years") ?? needPos(c, "Compounds");
      if (e) return err(e);
      const fv = compoundFutureValue(p, r, y, c, 0);
      return ok([
        { label: "Future value", value: fmtMoney(fv), emphasize: true },
        { label: "Interest earned", value: fmtMoney(fv - p) },
      ]);
    },
  },
  {
    slug: "salary-calculator",
    fields: [
      { name: "amount", label: "Pay amount", type: "number", defaultValue: "30", suffix: "$" },
      {
        name: "mode",
        label: "Pay is per",
        type: "select",
        defaultValue: "hour",
        options: [
          { value: "hour", label: "Hour" },
          { value: "week", label: "Week" },
          { value: "month", label: "Month" },
          { value: "year", label: "Year" },
        ],
      },
      { name: "hours", label: "Hours per week", type: "number", defaultValue: "40", step: "1" },
    ],
    compute(v) {
      const amount = val(v, "amount");
      const hours = val(v, "hours");
      const e = needPos(amount, "Pay amount") ?? needPos(hours, "Hours");
      if (e) return err(e);
      let annual: number;
      switch (v.mode) {
        case "hour":
          annual = amount * hours * 52;
          break;
        case "week":
          annual = amount * 52;
          break;
        case "month":
          annual = amount * 12;
          break;
        default:
          annual = amount;
      }
      return ok([
        { label: "Estimated annual salary", value: fmtMoney(annual), emphasize: true },
        { label: "Monthly (gross)", value: fmtMoney(annual / 12) },
        { label: "Weekly (gross)", value: fmtMoney(annual / 52) },
        { label: "Hourly (gross)", value: fmtMoney(annual / (hours * 52)) },
      ]);
    },
  },
  {
    slug: "401k-calculator",
    fields: [
      { name: "salary", label: "Annual salary", type: "number", defaultValue: "80000", suffix: "$" },
      { name: "contribPct", label: "Your contribution", type: "number", defaultValue: "6", suffix: "%" },
      { name: "matchPct", label: "Employer match", type: "number", defaultValue: "50", suffix: "% of contrib" },
      { name: "matchCap", label: "Match cap (% of salary)", type: "number", defaultValue: "6", suffix: "%" },
      { name: "years", label: "Years until retirement", type: "number", defaultValue: "25", step: "1" },
      { name: "return", label: "Expected return", type: "number", defaultValue: "7", suffix: "%" },
      { name: "balance", label: "Current 401(k) balance", type: "number", defaultValue: "25000", suffix: "$" },
    ],
    compute(v) {
      const salary = val(v, "salary");
      const contribPct = val(v, "contribPct");
      const matchPct = val(v, "matchPct");
      const matchCap = val(v, "matchCap");
      const years = val(v, "years");
      const ret = val(v, "return");
      const balance = val(v, "balance");
      const e =
        needPos(salary, "Salary") ??
        needNonNeg(contribPct, "Contribution") ??
        needPos(years, "Years") ??
        needNonNeg(balance, "Balance");
      if (e) return err(e);
      const employee = salary * (contribPct / 100);
      const matchable = salary * (matchCap / 100);
      const employer = Math.min(employee, matchable) * (matchPct / 100);
      const annual = employee + employer;
      const fv = compoundFutureValue(balance, ret, years, 1, annual);
      return ok([
        { label: "Annual employee deferral", value: fmtMoney(employee) },
        { label: "Annual employer match", value: fmtMoney(employer) },
        { label: "Projected 401(k) balance", value: fmtMoney(fv), emphasize: true },
      ]);
    },
  },
  {
    slug: "interest-rate-calculator",
    fields: [
      { name: "amount", label: "Loan amount", type: "number", defaultValue: "20000", suffix: "$" },
      { name: "payment", label: "Monthly payment", type: "number", defaultValue: "400", suffix: "$" },
      { name: "years", label: "Term (years)", type: "number", defaultValue: "5", step: "1" },
    ],
    compute(v) {
      const p = val(v, "amount");
      const pmt = val(v, "payment");
      const y = val(v, "years");
      const e = needPos(p, "Loan amount") ?? needPos(pmt, "Payment") ?? needPos(y, "Term");
      if (e) return err(e);
      const rate = interestRateFromPayment(p, pmt, y);
      if (!Number.isFinite(rate)) return err("Payment too low to repay this loan in the term given.");
      return ok([{ label: "Implied annual interest rate", value: fmtPct(round(rate, 3)), emphasize: true }]);
    },
  },
  {
    slug: "sales-tax-calculator",
    fields: [
      { name: "price", label: "Price before tax", type: "number", defaultValue: "99.99", suffix: "$" },
      { name: "taxRate", label: "Sales tax rate", type: "number", defaultValue: "8.25", suffix: "%" },
    ],
    compute(v) {
      const price = val(v, "price");
      const taxRate = val(v, "taxRate");
      const e = needNonNeg(price, "Price") ?? needNonNeg(taxRate, "Tax rate");
      if (e) return err(e);
      const tax = price * (taxRate / 100);
      return ok([
        { label: "Sales tax", value: fmtMoney(tax) },
        { label: "Total price", value: fmtMoney(price + tax), emphasize: true },
      ]);
    },
  },
  {
    slug: "house-affordability-calculator",
    fields: [
      { name: "income", label: "Annual gross income", type: "number", defaultValue: "120000", suffix: "$" },
      { name: "debts", label: "Monthly debt payments", type: "number", defaultValue: "500", suffix: "$" },
      { name: "dti", label: "Max DTI for housing", type: "number", defaultValue: "28", suffix: "%" },
      { name: "rate", label: "Mortgage rate", type: "number", defaultValue: "6.5", suffix: "%" },
      { name: "years", label: "Term (years)", type: "number", defaultValue: "30", step: "1" },
      { name: "downPct", label: "Down payment", type: "number", defaultValue: "20", suffix: "%" },
    ],
    compute(v) {
      const income = val(v, "income");
      const debts = val(v, "debts");
      const dti = val(v, "dti");
      const rate = val(v, "rate");
      const years = val(v, "years");
      const downPct = val(v, "downPct");
      const e =
        needPos(income, "Income") ??
        needNonNeg(debts, "Debts") ??
        needPos(dti, "DTI") ??
        needPos(years, "Term");
      if (e) return err(e);
      const maxHousing = (income / 12) * (dti / 100) - debts;
      if (maxHousing <= 0) return err("Debt payments exceed affordable housing budget.");
      const r = rate / 100 / 12;
      const n = years * 12;
      const loan =
        r === 0
          ? maxHousing * n
          : (maxHousing * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n));
      const maxPrice = loan / (1 - downPct / 100);
      return ok([
        { label: "Affordable monthly payment", value: fmtMoney(maxHousing), emphasize: true },
        { label: "Max loan amount", value: fmtMoney(loan) },
        { label: "Max home price (estimate)", value: fmtMoney(maxPrice) },
      ]);
    },
  },
  {
    slug: "savings-calculator",
    fields: [
      { name: "goal", label: "Savings goal", type: "number", defaultValue: "20000", suffix: "$" },
      { name: "current", label: "Current savings", type: "number", defaultValue: "3000", suffix: "$" },
      { name: "monthly", label: "Monthly contribution", type: "number", defaultValue: "300", suffix: "$" },
      { name: "rate", label: "Annual interest rate", type: "number", defaultValue: "4.5", suffix: "%" },
    ],
    compute(v) {
      const goal = val(v, "goal");
      const current = val(v, "current");
      const monthly = val(v, "monthly");
      const rate = val(v, "rate");
      const e = needPos(goal, "Goal") ?? needNonNeg(current, "Current savings") ?? needPos(monthly, "Contribution");
      if (e) return err(e);
      if (current >= goal) {
        return ok([{ label: "Goal already met", value: fmtMoney(current), emphasize: true }]);
      }
      const rm = rate / 100 / 12;
      let balance = current;
      let months = 0;
      while (balance < goal && months < 1200) {
        months += 1;
        balance = balance * (1 + rm) + monthly;
      }
      if (months >= 1200) return err("Goal not reachable with these inputs.");
      return ok([
        { label: "Months to goal", value: String(months), emphasize: true },
        { label: "Years (approx.)", value: fmt(months / 12, 1) },
        { label: "Projected balance", value: fmtMoney(balance) },
      ]);
    },
  },
  {
    slug: "rent-calculator",
    fields: [
      { name: "income", label: "Monthly gross income", type: "number", defaultValue: "6000", suffix: "$" },
      { name: "ratio", label: "Max rent (% of income)", type: "number", defaultValue: "30", suffix: "%" },
    ],
    compute(v) {
      const income = val(v, "income");
      const ratio = val(v, "ratio");
      const e = needPos(income, "Income") ?? needPos(ratio, "Ratio");
      if (e) return err(e);
      const rent = income * (ratio / 100);
      return ok([{ label: "Affordable monthly rent", value: fmtMoney(rent), emphasize: true }]);
    },
  },
  {
    slug: "marriage-tax-calculator",
    fields: [
      { name: "income1", label: "Partner 1 taxable income", type: "number", defaultValue: "90000", suffix: "$" },
      { name: "income2", label: "Partner 2 taxable income", type: "number", defaultValue: "60000", suffix: "$" },
    ],
    compute(v) {
      const i1 = val(v, "income1");
      const i2 = val(v, "income2");
      const e = needNonNeg(i1, "Income 1") ?? needNonNeg(i2, "Income 2");
      if (e) return err(e);
      const singleTotal = federalTax(i1, false) + federalTax(i2, false);
      const married = federalTax(i1 + i2, true);
      const diff = married - singleTotal;
      return ok([
        { label: "Tax if both file single (estimate)", value: fmtMoney(singleTotal) },
        { label: "Tax if married filing jointly (estimate)", value: fmtMoney(married), emphasize: true },
        { label: "Marriage bonus / penalty", value: fmtMoney(diff) },
        { label: "Note", value: "Illustrative U.S. federal estimate only." },
      ]);
    },
  },
  {
    slug: "estate-tax-calculator",
    fields: [
      { name: "estate", label: "Taxable estate value", type: "number", defaultValue: "15000000", suffix: "$" },
      { name: "exemption", label: "Federal exemption", type: "number", defaultValue: "13610000", suffix: "$" },
    ],
    compute(v) {
      const estate = val(v, "estate");
      const exemption = val(v, "exemption");
      const e = needPos(estate, "Estate") ?? needNonNeg(exemption, "Exemption");
      if (e) return err(e);
      const taxable = Math.max(0, estate - exemption);
      const tax = taxable * 0.4;
      return ok([
        { label: "Taxable amount above exemption", value: fmtMoney(taxable) },
        { label: "Estimated federal estate tax (40%)", value: fmtMoney(tax), emphasize: true },
        { label: "Note", value: "Simplified estimate; not legal or tax advice." },
      ]);
    },
  },
  {
    slug: "pension-calculator",
    fields: [
      { name: "years", label: "Years of service", type: "number", defaultValue: "25", step: "1" },
      { name: "salary", label: "Final average salary", type: "number", defaultValue: "85000", suffix: "$" },
      { name: "factor", label: "Benefit factor (% per year)", type: "number", defaultValue: "2", suffix: "%" },
    ],
    compute(v) {
      const years = val(v, "years");
      const salary = val(v, "salary");
      const factor = val(v, "factor");
      const e = needPos(years, "Years") ?? needPos(salary, "Salary") ?? needPos(factor, "Factor");
      if (e) return err(e);
      const annual = salary * (factor / 100) * years;
      return ok([
        { label: "Estimated annual pension", value: fmtMoney(annual), emphasize: true },
        { label: "Estimated monthly pension", value: fmtMoney(annual / 12) },
      ]);
    },
  },
  {
    slug: "social-security-calculator",
    fields: [
      { name: "aime", label: "Average indexed monthly earnings", type: "number", defaultValue: "5500", suffix: "$" },
      { name: "claimAge", label: "Claim age", type: "number", defaultValue: "67", step: "1" },
      { name: "fra", label: "Full retirement age", type: "number", defaultValue: "67", step: "1" },
    ],
    compute(v) {
      const aime = val(v, "aime");
      const claim = val(v, "claimAge");
      const fra = val(v, "fra");
      const e = needPos(aime, "AIME") ?? needNum(claim, "Claim age") ?? needNum(fra, "FRA");
      if (e) return err(e);
      const bend1 = 1174;
      const bend2 = 7078;
      let pia =
        Math.min(aime, bend1) * 0.9 +
        Math.max(0, Math.min(aime, bend2) - bend1) * 0.32 +
        Math.max(0, aime - bend2) * 0.15;
      const monthsDiff = (claim - fra) * 12;
      let benefit = pia;
      if (monthsDiff < 0) {
        const earlyMonths = Math.min(36, -monthsDiff);
        const laterMonths = Math.max(0, -monthsDiff - 36);
        benefit *= 1 - earlyMonths * (5 / 900) - laterMonths * (5 / 1200);
      } else if (monthsDiff > 0) {
        benefit *= 1 + monthsDiff * (2 / 3) / 100;
      }
      return ok([
        { label: "Estimated monthly benefit", value: fmtMoney(benefit), emphasize: true },
        { label: "Primary insurance amount (at FRA)", value: fmtMoney(pia) },
        { label: "Note", value: "Illustrative U.S. Social Security estimate." },
      ]);
    },
  },
  {
    slug: "annuity-calculator",
    fields: [
      { name: "payment", label: "Periodic payment", type: "number", defaultValue: "500", suffix: "$" },
      { name: "rate", label: "Annual return", type: "number", defaultValue: "5", suffix: "%" },
      { name: "years", label: "Years", type: "number", defaultValue: "20", step: "1" },
      { name: "periods", label: "Payments per year", type: "number", defaultValue: "12", step: "1" },
    ],
    compute(v) {
      const pmt = val(v, "payment");
      const rate = val(v, "rate");
      const years = val(v, "years");
      const periods = val(v, "periods");
      const e = needPos(pmt, "Payment") ?? needPos(years, "Years") ?? needPos(periods, "Periods");
      if (e) return err(e);
      const fv = compoundFutureValue(0, rate, years, periods, pmt);
      return ok([
        { label: "Accumulated value at end", value: fmtMoney(fv), emphasize: true },
        { label: "Total payments made", value: fmtMoney(pmt * years * periods) },
      ]);
    },
  },
  {
    slug: "annuity-payout-calculator",
    fields: [
      { name: "balance", label: "Account balance", type: "number", defaultValue: "500000", suffix: "$" },
      { name: "rate", label: "Annual return", type: "number", defaultValue: "5", suffix: "%" },
      { name: "years", label: "Payout period (years)", type: "number", defaultValue: "25", step: "1" },
    ],
    compute(v) {
      const balance = val(v, "balance");
      const rate = val(v, "rate");
      const years = val(v, "years");
      const e = needPos(balance, "Balance") ?? needPos(years, "Years");
      if (e) return err(e);
      const pmt = payment(balance, rate, years);
      return ok([
        { label: "Monthly payout (level)", value: fmtMoney(pmt), emphasize: true },
        { label: "Total paid out", value: fmtMoney(pmt * years * 12) },
      ]);
    },
  },
  {
    slug: "credit-card-calculator",
    fields: [
      { name: "balance", label: "Balance", type: "number", defaultValue: "5000", suffix: "$" },
      { name: "apr", label: "APR", type: "number", defaultValue: "21.99", suffix: "%" },
      { name: "minPct", label: "Minimum payment (% of balance)", type: "number", defaultValue: "2", suffix: "%" },
      { name: "minFixed", label: "Minimum payment floor", type: "number", defaultValue: "25", suffix: "$" },
    ],
    compute(v) {
      const balance = val(v, "balance");
      const apr = val(v, "apr");
      const minPct = val(v, "minPct");
      const minFixed = val(v, "minFixed");
      const e = needPos(balance, "Balance") ?? needNonNeg(apr, "APR");
      if (e) return err(e);
      const { months, interest } = creditPayoffMonths(balance, apr, minPct, minFixed);
      return ok([
        { label: "Months to pay off (min payments)", value: String(months), emphasize: true },
        { label: "Total interest paid", value: fmtMoney(interest) },
        { label: "Total amount paid", value: fmtMoney(balance + interest) },
      ]);
    },
  },
  {
    slug: "credit-cards-payoff-calculator",
    fields: [
      { name: "balance", label: "Combined balance", type: "number", defaultValue: "12000", suffix: "$" },
      { name: "apr", label: "Weighted average APR", type: "number", defaultValue: "19.5", suffix: "%" },
      { name: "payment", label: "Fixed monthly payment", type: "number", defaultValue: "400", suffix: "$" },
    ],
    compute(v) {
      const balance = val(v, "balance");
      const apr = val(v, "apr");
      const pmt = val(v, "payment");
      const e = needPos(balance, "Balance") ?? needPos(pmt, "Payment");
      if (e) return err(e);
      const r = apr / 100 / 12;
      let b = balance;
      let months = 0;
      let interest = 0;
      while (b > 0.01 && months < 600) {
        months += 1;
        const int = b * r;
        interest += int;
        if (pmt <= int) return err("Payment must exceed monthly interest.");
        b = b + int - pmt;
      }
      return ok([
        { label: "Months to payoff", value: String(months), emphasize: true },
        { label: "Total interest", value: fmtMoney(interest) },
        { label: "Total paid", value: fmtMoney(balance + interest) },
      ]);
    },
  },
  {
    slug: "debt-payoff-calculator",
    fields: [
      { name: "balance", label: "Debt balance", type: "number", defaultValue: "8000", suffix: "$" },
      { name: "rate", label: "APR", type: "number", defaultValue: "12", suffix: "%" },
      { name: "payment", label: "Monthly payment", type: "number", defaultValue: "250", suffix: "$" },
    ],
    compute(v) {
      const balance = val(v, "balance");
      const rate = val(v, "rate");
      const pmt = val(v, "payment");
      const e = needPos(balance, "Balance") ?? needPos(pmt, "Payment");
      if (e) return err(e);
      const r = rate / 100 / 12;
      let b = balance;
      let months = 0;
      let interest = 0;
      while (b > 0.01 && months < 600) {
        months += 1;
        const int = b * r;
        if (pmt <= int) return err("Payment must exceed monthly interest.");
        interest += int;
        b = b + int - pmt;
      }
      return ok([
        { label: "Months to payoff", value: String(months), emphasize: true },
        { label: "Total interest", value: fmtMoney(interest) },
      ]);
    },
  },
  {
    slug: "debt-consolidation-calculator",
    fields: [
      { name: "oldBalance", label: "Total existing debt", type: "number", defaultValue: "15000", suffix: "$" },
      { name: "oldRate", label: "Current weighted APR", type: "number", defaultValue: "18", suffix: "%" },
      { name: "oldPayment", label: "Current total monthly payment", type: "number", defaultValue: "450", suffix: "$" },
      { name: "newRate", label: "Consolidation loan APR", type: "number", defaultValue: "9.5", suffix: "%" },
      { name: "newYears", label: "New loan term (years)", type: "number", defaultValue: "5", step: "1" },
    ],
    compute(v) {
      const oldBalance = val(v, "oldBalance");
      const oldRate = val(v, "oldRate");
      const oldPayment = val(v, "oldPayment");
      const newRate = val(v, "newRate");
      const newYears = val(v, "newYears");
      const e = needPos(oldBalance, "Debt") ?? needPos(oldPayment, "Payment") ?? needPos(newYears, "Term");
      if (e) return err(e);
      const newPmt = payment(oldBalance, newRate, newYears);
      const rOld = oldRate / 100 / 12;
      let b = oldBalance;
      let oldMonths = 0;
      let oldInt = 0;
      while (b > 0.01 && oldMonths < 600) {
        oldMonths += 1;
        const int = b * rOld;
        if (oldPayment <= int) return err("Current payment must exceed interest.");
        oldInt += int;
        b = b + int - oldPayment;
      }
      const newTotal = newPmt * newYears * 12;
      const oldTotal = oldBalance + oldInt;
      return ok([
        { label: "New monthly payment", value: fmtMoney(newPmt), emphasize: true },
        { label: "Old payoff time", value: `${oldMonths} months` },
        { label: "Interest — current path", value: fmtMoney(oldInt) },
        { label: "Interest — consolidation", value: fmtMoney(newTotal - oldBalance) },
        { label: "Interest savings (estimate)", value: fmtMoney(oldInt - (newTotal - oldBalance)) },
      ]);
    },
  },
  {
    slug: "repayment-calculator",
    fields: LOAN_FIELDS,
    compute: (v) => standardLoanCompute(v),
  },
  {
    slug: "student-loan-calculator",
    fields: [
      { name: "amount", label: "Loan balance", type: "number", defaultValue: "35000", suffix: "$" },
      { name: "rate", label: "Interest rate", type: "number", defaultValue: "5.5", suffix: "%" },
      { name: "years", label: "Repayment term (years)", type: "number", defaultValue: "10", step: "1" },
    ],
    compute: (v) => standardLoanCompute(v),
  },
  {
    slug: "college-cost-calculator",
    fields: [
      { name: "cost", label: "Annual cost today", type: "number", defaultValue: "30000", suffix: "$" },
      { name: "years", label: "Years until enrollment", type: "number", defaultValue: "10", step: "1" },
      { name: "inflation", label: "Education inflation", type: "number", defaultValue: "5", suffix: "%" },
      { name: "yearsCollege", label: "Years of college", type: "number", defaultValue: "4", step: "1" },
    ],
    compute(v) {
      const cost = val(v, "cost");
      const years = val(v, "years");
      const inflation = val(v, "inflation");
      const yearsCollege = val(v, "yearsCollege");
      const e = needPos(cost, "Cost") ?? needNonNeg(years, "Years") ?? needPos(yearsCollege, "Years of college");
      if (e) return err(e);
      let total = 0;
      for (let i = 0; i < yearsCollege; i++) {
        const yr = years + i;
        total += cost * Math.pow(1 + inflation / 100, yr);
      }
      return ok([
        { label: "Estimated total college cost", value: fmtMoney(total), emphasize: true },
        { label: "First year cost (at enrollment)", value: fmtMoney(cost * Math.pow(1 + inflation / 100, years)) },
      ]);
    },
  },
  {
    slug: "simple-interest-calculator",
    fields: [
      { name: "principal", label: "Principal", type: "number", defaultValue: "10000", suffix: "$" },
      { name: "rate", label: "Annual rate", type: "number", defaultValue: "4.5", suffix: "%" },
      { name: "years", label: "Time (years)", type: "number", defaultValue: "2", step: "0.5" },
    ],
    compute(v) {
      const p = val(v, "principal");
      const r = val(v, "rate");
      const y = val(v, "years");
      const e = needPos(p, "Principal") ?? needPos(y, "Time");
      if (e) return err(e);
      const interest = simpleInterest(p, r, y);
      return ok([
        { label: "Simple interest", value: fmtMoney(interest), emphasize: true },
        { label: "Final amount", value: fmtMoney(p + interest) },
      ]);
    },
  },
  {
    slug: "cd-calculator",
    fields: [
      { name: "deposit", label: "Initial deposit", type: "number", defaultValue: "10000", suffix: "$" },
      { name: "rate", label: "Annual APY", type: "number", defaultValue: "4.25", suffix: "%" },
      { name: "months", label: "Term (months)", type: "number", defaultValue: "12", step: "1" },
    ],
    compute(v) {
      const deposit = val(v, "deposit");
      const rate = val(v, "rate");
      const months = val(v, "months");
      const e = needPos(deposit, "Deposit") ?? needPos(months, "Term");
      if (e) return err(e);
      const fv = deposit * Math.pow(1 + rate / 100 / 12, months);
      return ok([
        { label: "Maturity value", value: fmtMoney(fv), emphasize: true },
        { label: "Interest earned", value: fmtMoney(fv - deposit) },
      ]);
    },
  },
  {
    slug: "bond-calculator",
    fields: [
      { name: "face", label: "Face value", type: "number", defaultValue: "1000", suffix: "$" },
      { name: "coupon", label: "Annual coupon rate", type: "number", defaultValue: "4", suffix: "%" },
      { name: "years", label: "Years to maturity", type: "number", defaultValue: "10", step: "1" },
      { name: "ytm", label: "Yield to maturity", type: "number", defaultValue: "5", suffix: "%" },
    ],
    compute(v) {
      const face = val(v, "face");
      const coupon = val(v, "coupon");
      const years = val(v, "years");
      const ytm = val(v, "ytm");
      const e = needPos(face, "Face value") ?? needPos(years, "Years");
      if (e) return err(e);
      const c = face * (coupon / 100);
      const y = ytm / 100;
      let price = 0;
      for (let t = 1; t <= years; t++) {
        price += c / Math.pow(1 + y, t);
      }
      price += face / Math.pow(1 + y, years);
      const currentYield = (c / price) * 100;
      return ok([
        { label: "Estimated bond price", value: fmtMoney(price), emphasize: true },
        { label: "Annual coupon payment", value: fmtMoney(c) },
        { label: "Current yield", value: fmtPct(round(currentYield, 2)) },
      ]);
    },
  },
  {
    slug: "mutual-fund-calculator",
    fields: [
      { name: "initial", label: "Initial investment", type: "number", defaultValue: "5000", suffix: "$" },
      { name: "monthly", label: "Monthly investment", type: "number", defaultValue: "200", suffix: "$" },
      { name: "years", label: "Years", type: "number", defaultValue: "15", step: "1" },
      { name: "return", label: "Gross annual return", type: "number", defaultValue: "8", suffix: "%" },
      { name: "expense", label: "Expense ratio", type: "number", defaultValue: "0.5", suffix: "%" },
    ],
    compute(v) {
      const initial = val(v, "initial");
      const monthly = val(v, "monthly");
      const years = val(v, "years");
      const ret = val(v, "return");
      const expense = val(v, "expense");
      const e = needNonNeg(initial, "Initial") ?? needNonNeg(monthly, "Monthly") ?? needPos(years, "Years");
      if (e) return err(e);
      const net = ret - expense;
      const fv = compoundFutureValue(initial, net, years, 12, monthly);
      const fvGross = compoundFutureValue(initial, ret, years, 12, monthly);
      return ok([
        { label: "Future value (after expenses)", value: fmtMoney(fv), emphasize: true },
        { label: "Future value (before expenses)", value: fmtMoney(fvGross) },
        { label: "Cost of expenses (estimate)", value: fmtMoney(fvGross - fv) },
      ]);
    },
  },
  {
    slug: "roth-ira-calculator",
    fields: [
      { name: "initial", label: "Current balance", type: "number", defaultValue: "15000", suffix: "$" },
      { name: "annual", label: "Annual contribution", type: "number", defaultValue: "7000", suffix: "$" },
      { name: "years", label: "Years", type: "number", defaultValue: "20", step: "1" },
      { name: "return", label: "Expected return", type: "number", defaultValue: "7", suffix: "%" },
    ],
    compute(v) {
      const initial = val(v, "initial");
      const annual = val(v, "annual");
      const years = val(v, "years");
      const ret = val(v, "return");
      const e = needNonNeg(initial, "Balance") ?? needNonNeg(annual, "Contribution") ?? needPos(years, "Years");
      if (e) return err(e);
      const fv = compoundFutureValue(initial, ret, years, 1, annual);
      return ok([
        { label: "Tax-free balance at end", value: fmtMoney(fv), emphasize: true },
        { label: "Total contributions", value: fmtMoney(initial + annual * years) },
      ]);
    },
  },
  {
    slug: "ira-calculator",
    fields: [
      { name: "initial", label: "Current balance", type: "number", defaultValue: "20000", suffix: "$" },
      { name: "annual", label: "Annual contribution", type: "number", defaultValue: "7000", suffix: "$" },
      { name: "years", label: "Years until withdrawal", type: "number", defaultValue: "20", step: "1" },
      { name: "return", label: "Expected return", type: "number", defaultValue: "7", suffix: "%" },
      { name: "taxRate", label: "Tax rate at withdrawal", type: "number", defaultValue: "22", suffix: "%" },
    ],
    compute(v) {
      const initial = val(v, "initial");
      const annual = val(v, "annual");
      const years = val(v, "years");
      const ret = val(v, "return");
      const taxRate = val(v, "taxRate");
      const e = needNonNeg(initial, "Balance") ?? needNonNeg(annual, "Contribution") ?? needPos(years, "Years");
      if (e) return err(e);
      const fv = compoundFutureValue(initial, ret, years, 1, annual);
      const afterTax = fv * (1 - taxRate / 100);
      return ok([
        { label: "Pre-tax balance", value: fmtMoney(fv) },
        { label: "After-tax balance (estimate)", value: fmtMoney(afterTax), emphasize: true },
      ]);
    },
  },
  {
    slug: "rmd-calculator",
    fields: [
      { name: "age", label: "Your age", type: "number", defaultValue: "75", step: "1" },
      { name: "balance", label: "Prior Dec. 31 account balance", type: "number", defaultValue: "500000", suffix: "$" },
    ],
    compute(v) {
      const age = val(v, "age");
      const balance = val(v, "balance");
      const e = needNum(age, "Age") ?? needPos(balance, "Balance");
      if (e) return err(e);
      if (age < 73) return err("RMDs generally begin at age 73 (illustrative).");
      const divisors: Record<number, number> = {
        73: 26.5,
        74: 25.5,
        75: 24.6,
        76: 23.7,
        77: 22.9,
        78: 22.0,
        79: 21.1,
        80: 20.2,
        85: 16.0,
        90: 12.2,
        95: 8.9,
      };
      const ages = Object.keys(divisors).map(Number).sort((a, b) => a - b);
      let divisor = divisors[ages[ages.length - 1]];
      for (const a of ages) {
        if (age <= a) {
          divisor = divisors[a];
          break;
        }
      }
      const rmd = balance / divisor;
      return ok([
        { label: "Distribution period (IRS table)", value: fmt(divisor, 1) },
        { label: "Required minimum distribution", value: fmtMoney(rmd), emphasize: true },
        { label: "Note", value: "Illustrative Uniform Lifetime Table factor." },
      ]);
    },
  },
  {
    slug: "vat-calculator",
    fields: [
      { name: "amount", label: "Amount", type: "number", defaultValue: "100", suffix: "$" },
      { name: "vatRate", label: "VAT rate", type: "number", defaultValue: "20", suffix: "%" },
      {
        name: "mode",
        label: "Amount is",
        type: "select",
        defaultValue: "net",
        options: [
          { value: "net", label: "Excluding VAT" },
          { value: "gross", label: "Including VAT" },
        ],
      },
    ],
    compute(v) {
      const amount = val(v, "amount");
      const vatRate = val(v, "vatRate");
      const e = needNonNeg(amount, "Amount") ?? needNonNeg(vatRate, "VAT rate");
      if (e) return err(e);
      const rate = vatRate / 100;
      if (v.mode === "net") {
        const vat = amount * rate;
        return ok([
          { label: "VAT amount", value: fmtMoney(vat) },
          { label: "Total including VAT", value: fmtMoney(amount + vat), emphasize: true },
        ]);
      }
      const net = amount / (1 + rate);
      const vat = amount - net;
      return ok([
        { label: "Net (ex-VAT)", value: fmtMoney(net) },
        { label: "VAT amount", value: fmtMoney(vat), emphasize: true },
      ]);
    },
  },
  {
    slug: "cash-back-or-low-interest-calculator",
    fields: [
      { name: "price", label: "Vehicle price", type: "number", defaultValue: "35000", suffix: "$" },
      { name: "rebate", label: "Cash rebate", type: "number", defaultValue: "2000", suffix: "$" },
      { name: "standardRate", label: "Standard loan APR (no rebate)", type: "number", defaultValue: "6.9", suffix: "%" },
      { name: "promoRate", label: "Promotional APR (with rebate forfeited)", type: "number", defaultValue: "1.9", suffix: "%" },
      { name: "years", label: "Loan term (years)", type: "number", defaultValue: "5", step: "1" },
    ],
    compute(v) {
      const price = val(v, "price");
      const rebate = val(v, "rebate");
      const standardRate = val(v, "standardRate");
      const promoRate = val(v, "promoRate");
      const years = val(v, "years");
      const e = needPos(price, "Price") ?? needPos(years, "Term");
      if (e) return err(e);
      const loanRebate = Math.max(0, price - rebate);
      const pmtRebate = payment(loanRebate, standardRate, years);
      const pmtPromo = payment(price, promoRate, years);
      const totalRebate = pmtRebate * years * 12;
      const totalPromo = pmtPromo * years * 12;
      const better = totalRebate < totalPromo ? "Take cash rebate" : "Take low APR";
      return ok([
        { label: "Total cost — rebate + standard APR", value: fmtMoney(totalRebate) },
        { label: "Total cost — low APR (no rebate)", value: fmtMoney(totalPromo) },
        { label: "Better option (lower total)", value: better, emphasize: true },
        { label: "Savings", value: fmtMoney(Math.abs(totalRebate - totalPromo)) },
      ]);
    },
  },
  {
    slug: "auto-lease-calculator",
    fields: [
      { name: "msrp", label: "MSRP / capitalized cost", type: "number", defaultValue: "38000", suffix: "$" },
      { name: "residual", label: "Residual value", type: "number", defaultValue: "22000", suffix: "$" },
      { name: "moneyFactor", label: "Money factor", type: "number", defaultValue: "0.00125", step: "0.00001" },
      { name: "months", label: "Lease term (months)", type: "number", defaultValue: "36", step: "1" },
      { name: "down", label: "Down payment", type: "number", defaultValue: "2000", suffix: "$" },
    ],
    compute(v) {
      const msrp = val(v, "msrp");
      const residual = val(v, "residual");
      const mf = val(v, "moneyFactor");
      const months = val(v, "months");
      const down = val(v, "down");
      const e = needPos(msrp, "MSRP") ?? needPos(residual, "Residual") ?? needPos(months, "Term");
      if (e) return err(e);
      const depreciation = (msrp - down - residual) / months;
      const finance = (msrp + residual) * mf;
      const monthly = depreciation + finance;
      const apr = mf * 2400;
      return ok([
        { label: "Estimated monthly lease payment", value: fmtMoney(monthly), emphasize: true },
        { label: "Implied APR (money factor × 2400)", value: fmtPct(round(apr, 2)) },
        { label: "Total of monthly payments", value: fmtMoney(monthly * months) },
      ]);
    },
  },
  {
    slug: "depreciation-calculator",
    fields: [
      { name: "cost", label: "Asset cost", type: "number", defaultValue: "50000", suffix: "$" },
      { name: "salvage", label: "Salvage value", type: "number", defaultValue: "5000", suffix: "$" },
      { name: "life", label: "Useful life (years)", type: "number", defaultValue: "7", step: "1" },
    ],
    compute(v) {
      const cost = val(v, "cost");
      const salvage = val(v, "salvage");
      const life = val(v, "life");
      const e = needPos(cost, "Cost") ?? needNonNeg(salvage, "Salvage") ?? needPos(life, "Life");
      if (e) return err(e);
      if (salvage >= cost) return err("Salvage must be less than cost.");
      const annual = (cost - salvage) / life;
      return ok([
        { label: "Straight-line annual depreciation", value: fmtMoney(annual), emphasize: true },
        { label: "Monthly depreciation", value: fmtMoney(annual / 12) },
        { label: "Book value after full life", value: fmtMoney(salvage) },
      ]);
    },
  },
  {
    slug: "average-return-calculator",
    fields: [
      {
        name: "returns",
        label: "Annual returns (comma-separated %)",
        type: "text",
        defaultValue: "10, -5, 8, 12, 6",
        placeholder: "e.g. 10, 5, -2",
      },
    ],
    compute(v) {
      const parts = (v.returns ?? "")
        .split(",")
        .map((s) => parseNum(s.trim()))
        .filter((n) => Number.isFinite(n));
      if (parts.length === 0) return err("Enter at least one return value.");
      let product = 1;
      for (const r of parts) {
        product *= 1 + r / 100;
      }
      const cagr = (Math.pow(product, 1 / parts.length) - 1) * 100;
      const simpleAvg = parts.reduce((a, b) => a + b, 0) / parts.length;
      return ok([
        { label: "Geometric average (CAGR)", value: fmtPct(round(cagr, 2)), emphasize: true },
        { label: "Arithmetic average", value: fmtPct(round(simpleAvg, 2)) },
        { label: "Periods", value: String(parts.length) },
      ]);
    },
  },
  {
    slug: "margin-calculator",
    fields: [
      { name: "revenue", label: "Revenue", type: "number", defaultValue: "250000", suffix: "$" },
      { name: "cost", label: "Cost of goods sold", type: "number", defaultValue: "150000", suffix: "$" },
    ],
    compute(v) {
      const revenue = val(v, "revenue");
      const cost = val(v, "cost");
      const e = needPos(revenue, "Revenue") ?? needNonNeg(cost, "Cost");
      if (e) return err(e);
      const profit = revenue - cost;
      const margin = revenue > 0 ? (profit / revenue) * 100 : NaN;
      return ok([
        { label: "Gross profit", value: fmtMoney(profit) },
        { label: "Gross margin", value: fmtPct(round(margin, 2)), emphasize: true },
      ]);
    },
  },
  {
    slug: "discount-calculator",
    fields: [
      { name: "price", label: "Original price", type: "number", defaultValue: "89.99", suffix: "$" },
      { name: "discount", label: "Discount", type: "number", defaultValue: "25", suffix: "%" },
    ],
    compute(v) {
      const price = val(v, "price");
      const discount = val(v, "discount");
      const e = needPos(price, "Price") ?? needNonNeg(discount, "Discount");
      if (e) return err(e);
      const savings = price * (discount / 100);
      return ok([
        { label: "You save", value: fmtMoney(savings) },
        { label: "Sale price", value: fmtMoney(price - savings), emphasize: true },
      ]);
    },
  },
  {
    slug: "business-loan-calculator",
    fields: [
      { name: "amount", label: "Loan amount", type: "number", defaultValue: "100000", suffix: "$" },
      { name: "rate", label: "Annual rate", type: "number", defaultValue: "8.5", suffix: "%" },
      { name: "years", label: "Term (years)", type: "number", defaultValue: "7", step: "1" },
    ],
    compute: (v) => standardLoanCompute(v),
  },
  {
    slug: "debt-to-income-ratio-calculator",
    fields: [
      { name: "income", label: "Monthly gross income", type: "number", defaultValue: "8000", suffix: "$" },
      { name: "housing", label: "Monthly housing payment", type: "number", defaultValue: "1800", suffix: "$" },
      { name: "debts", label: "Other monthly debt payments", type: "number", defaultValue: "600", suffix: "$" },
    ],
    compute(v) {
      const income = val(v, "income");
      const housing = val(v, "housing");
      const debts = val(v, "debts");
      const e = needPos(income, "Income") ?? needNonNeg(housing, "Housing") ?? needNonNeg(debts, "Debts");
      if (e) return err(e);
      const front = (housing / income) * 100;
      const back = ((housing + debts) / income) * 100;
      return ok([
        { label: "Front-end DTI (housing)", value: fmtPct(round(front, 2)), emphasize: true },
        { label: "Back-end DTI (all debts)", value: fmtPct(round(back, 2)) },
      ]);
    },
  },
  {
    slug: "real-estate-calculator",
    fields: [
      { name: "noi", label: "Net operating income (annual)", type: "number", defaultValue: "48000", suffix: "$" },
      { name: "capRate", label: "Cap rate", type: "number", defaultValue: "6", suffix: "%" },
    ],
    compute(v) {
      const noi = val(v, "noi");
      const capRate = val(v, "capRate");
      const e = needNonNeg(noi, "NOI") ?? needPos(capRate, "Cap rate");
      if (e) return err(e);
      const value = noi / (capRate / 100);
      return ok([
        { label: "Estimated property value", value: fmtMoney(value), emphasize: true },
        { label: "Monthly NOI", value: fmtMoney(noi / 12) },
      ]);
    },
  },
  {
    slug: "take-home-paycheck-calculator",
    fields: [
      { name: "gross", label: "Gross pay (per period)", type: "number", defaultValue: "5000", suffix: "$" },
      {
        name: "period",
        label: "Pay frequency",
        type: "select",
        defaultValue: "monthly",
        options: [
          { value: "monthly", label: "Monthly" },
          { value: "biweekly", label: "Bi-weekly" },
          { value: "weekly", label: "Weekly" },
        ],
      },
      { name: "pretax", label: "Pre-tax deductions (per period)", type: "number", defaultValue: "300", suffix: "$" },
      {
        name: "filing",
        label: "Filing status",
        type: "select",
        defaultValue: "single",
        options: [
          { value: "single", label: "Single" },
          { value: "married", label: "Married filing jointly" },
        ],
      },
    ],
    compute(v) {
      const gross = val(v, "gross");
      const pretax = val(v, "pretax");
      const e = needPos(gross, "Gross pay") ?? needNonNeg(pretax, "Pre-tax deductions");
      if (e) return err(e);
      const periods =
        v.period === "weekly" ? 52 : v.period === "biweekly" ? 26 : 12;
      const annualGross = gross * periods;
      const annualPretax = pretax * periods;
      const taxable = Math.max(0, annualGross - annualPretax);
      const federal = federalTax(taxable, v.filing === "married");
      const fica = annualGross * 0.0765;
      const netAnnual = annualGross - annualPretax - federal - fica;
      const netPeriod = netAnnual / periods;
      return ok([
        { label: "Estimated take-home (per period)", value: fmtMoney(netPeriod), emphasize: true },
        { label: "Estimated annual take-home", value: fmtMoney(netAnnual) },
        { label: "Federal tax (estimate)", value: fmtMoney(federal / periods) },
        { label: "FICA (7.65%, estimate)", value: fmtMoney(fica / periods) },
        { label: "Note", value: "Illustrative U.S. estimate; state/local not included." },
      ]);
    },
  },
  {
    slug: "personal-loan-calculator",
    fields: LOAN_FIELDS,
    compute: (v) => standardLoanCompute(v),
  },
  {
    slug: "boat-loan-calculator",
    fields: [
      { name: "amount", label: "Loan amount", type: "number", defaultValue: "75000", suffix: "$" },
      { name: "rate", label: "APR", type: "number", defaultValue: "7.25", suffix: "%" },
      { name: "years", label: "Term (years)", type: "number", defaultValue: "15", step: "1" },
    ],
    compute: (v) => standardLoanCompute(v),
  },
  {
    slug: "lease-calculator",
    fields: [
      { name: "asset", label: "Asset value", type: "number", defaultValue: "40000", suffix: "$" },
      { name: "residual", label: "Residual / buyout", type: "number", defaultValue: "15000", suffix: "$" },
      { name: "rate", label: "Financing rate (APR)", type: "number", defaultValue: "6", suffix: "%" },
      { name: "months", label: "Lease term (months)", type: "number", defaultValue: "48", step: "1" },
    ],
    compute(v) {
      const asset = val(v, "asset");
      const residual = val(v, "residual");
      const rate = val(v, "rate");
      const months = val(v, "months");
      const e = needPos(asset, "Asset value") ?? needPos(months, "Term");
      if (e) return err(e);
      const r = rate / 100 / 12;
      const dep = (asset - residual) / months;
      const finance = (asset + residual) * r / 2;
      const monthly = dep + finance;
      return ok([
        { label: "Estimated monthly lease payment", value: fmtMoney(monthly), emphasize: true },
        { label: "Total lease payments", value: fmtMoney(monthly * months) },
      ]);
    },
  },
  {
    slug: "refinance-calculator",
    fields: [
      { name: "balance", label: "Current loan balance", type: "number", defaultValue: "280000", suffix: "$" },
      { name: "oldRate", label: "Current rate", type: "number", defaultValue: "7.25", suffix: "%" },
      { name: "oldYearsLeft", label: "Years remaining", type: "number", defaultValue: "27", step: "1" },
      { name: "newRate", label: "New rate", type: "number", defaultValue: "6.0", suffix: "%" },
      { name: "newYears", label: "New term (years)", type: "number", defaultValue: "30", step: "1" },
      { name: "closing", label: "Closing costs", type: "number", defaultValue: "4000", suffix: "$" },
    ],
    compute(v) {
      const balance = val(v, "balance");
      const oldRate = val(v, "oldRate");
      const oldYearsLeft = val(v, "oldYearsLeft");
      const newRate = val(v, "newRate");
      const newYears = val(v, "newYears");
      const closing = val(v, "closing");
      const e =
        needPos(balance, "Balance") ??
        needPos(oldYearsLeft, "Years remaining") ??
        needPos(newYears, "New term") ??
        needNonNeg(closing, "Closing costs");
      if (e) return err(e);
      const oldPmt = payment(balance, oldRate, oldYearsLeft);
      const newBal = balance + closing;
      const newPmt = payment(newBal, newRate, newYears);
      const oldTotal = oldPmt * oldYearsLeft * 12;
      const newTotal = newPmt * newYears * 12;
      return ok([
        { label: "Current monthly payment", value: fmtMoney(oldPmt) },
        { label: "New monthly payment", value: fmtMoney(newPmt), emphasize: true },
        { label: "Monthly savings", value: fmtMoney(oldPmt - newPmt) },
        { label: "Total interest — keep current", value: fmtMoney(oldTotal - balance) },
        { label: "Total interest — refinance", value: fmtMoney(newTotal - newBal) },
      ]);
    },
  },
  {
    slug: "budget-calculator",
    fields: [
      { name: "income", label: "Monthly income", type: "number", defaultValue: "6500", suffix: "$" },
      { name: "housing", label: "Housing", type: "number", defaultValue: "1800", suffix: "$" },
      { name: "transport", label: "Transportation", type: "number", defaultValue: "500", suffix: "$" },
      { name: "food", label: "Food", type: "number", defaultValue: "700", suffix: "$" },
      { name: "other", label: "Other expenses", type: "number", defaultValue: "900", suffix: "$" },
      { name: "savings", label: "Savings goal", type: "number", defaultValue: "500", suffix: "$" },
    ],
    compute(v) {
      const income = val(v, "income");
      const housing = val(v, "housing");
      const transport = val(v, "transport");
      const food = val(v, "food");
      const other = val(v, "other");
      const savings = val(v, "savings");
      const e = needPos(income, "Income");
      if (e) return err(e);
      const expenses = housing + transport + food + other + savings;
      const surplus = income - expenses;
      return ok([
        { label: "Total planned outflows", value: fmtMoney(expenses) },
        { label: "Monthly surplus / deficit", value: fmtMoney(surplus), emphasize: true },
        { label: "Savings rate", value: fmtPct(income > 0 ? round((savings / income) * 100, 1) : 0) },
      ]);
    },
  },
  {
    slug: "rental-property-calculator",
    fields: [
      { name: "rent", label: "Monthly rent", type: "number", defaultValue: "2200", suffix: "$" },
      { name: "mortgage", label: "Monthly mortgage (P&I)", type: "number", defaultValue: "1400", suffix: "$" },
      { name: "taxes", label: "Monthly taxes & insurance", type: "number", defaultValue: "350", suffix: "$" },
      { name: "maintenance", label: "Maintenance / vacancy", type: "number", defaultValue: "200", suffix: "$" },
    ],
    compute(v) {
      const rent = val(v, "rent");
      const mortgage = val(v, "mortgage");
      const taxes = val(v, "taxes");
      const maintenance = val(v, "maintenance");
      const e = needNonNeg(rent, "Rent");
      if (e) return err(e);
      const expenses = mortgage + taxes + maintenance;
      const cashFlow = rent - expenses;
      const annualNoi = (rent - taxes - maintenance) * 12;
      return ok([
        { label: "Monthly cash flow", value: fmtMoney(cashFlow), emphasize: true },
        { label: "Annual NOI (before debt service)", value: fmtMoney(annualNoi) },
        { label: "Operating expense ratio", value: fmtPct(rent > 0 ? round(((taxes + maintenance) / rent) * 100, 1) : 0) },
      ]);
    },
  },
  {
    slug: "irr-calculator",
    fields: [
      {
        name: "flows",
        label: "Cash flows (comma-separated, t=0 first)",
        type: "text",
        defaultValue: "-100000, 25000, 30000, 35000, 40000, 45000",
      },
    ],
    compute(v) {
      const flows = (v.flows ?? "")
        .split(",")
        .map((s) => parseNum(s.trim()))
        .filter((_, i, arr) => arr.length > 0);
      if (flows.length < 2) return err("Enter at least two cash flows.");
      if (!flows.every((n) => Number.isFinite(n))) return err("Invalid number in cash flows.");
      const rate = irr(flows);
      if (!Number.isFinite(rate)) return err("IRR could not be computed for these flows.");
      return ok([
        { label: "Internal rate of return (IRR)", value: fmtPct(round(rate, 3)), emphasize: true },
        { label: "NPV at 0% discount", value: fmtMoney(flows.reduce((a, b) => a + b, 0)) },
      ]);
    },
  },
  {
    slug: "roi-calculator",
    fields: [
      { name: "gain", label: "Amount gained (net profit)", type: "number", defaultValue: "15000", suffix: "$" },
      { name: "cost", label: "Cost of investment", type: "number", defaultValue: "100000", suffix: "$" },
    ],
    compute(v) {
      const gain = val(v, "gain");
      const cost = val(v, "cost");
      const e = needNum(gain, "Gain") ?? needPos(cost, "Cost");
      if (e) return err(e);
      const roi = (gain / cost) * 100;
      return ok([
        { label: "Return on investment (ROI)", value: fmtPct(round(roi, 2)), emphasize: true },
        { label: "Final value", value: fmtMoney(cost + gain) },
      ]);
    },
  },
  {
    slug: "apr-calculator",
    fields: [
      { name: "amount", label: "Loan amount", type: "number", defaultValue: "20000", suffix: "$" },
      { name: "fees", label: "Upfront fees", type: "number", defaultValue: "500", suffix: "$" },
      { name: "rate", label: "Nominal interest rate", type: "number", defaultValue: "6.5", suffix: "%" },
      { name: "years", label: "Term (years)", type: "number", defaultValue: "5", step: "1" },
    ],
    compute(v) {
      const amount = val(v, "amount");
      const fees = val(v, "fees");
      const rate = val(v, "rate");
      const years = val(v, "years");
      const e = needPos(amount, "Loan amount") ?? needPos(years, "Term");
      if (e) return err(e);
      const proceeds = amount - fees;
      if (proceeds <= 0) return err("Fees exceed loan amount.");
      const pmt = payment(amount, rate, years);
      const apr = interestRateFromPayment(proceeds, pmt, years);
      return ok([
        { label: "Monthly payment", value: fmtMoney(pmt) },
        { label: "APR (includes fees)", value: fmtPct(round(apr, 3)), emphasize: true },
        { label: "Nominal rate", value: fmtPct(rate) },
      ]);
    },
  },
  {
    slug: "fha-loan-calculator",
    fields: [
      { name: "price", label: "Home price", type: "number", defaultValue: "300000", suffix: "$" },
      { name: "downPct", label: "Down payment", type: "number", defaultValue: "3.5", suffix: "%" },
      { name: "rate", label: "Base interest rate", type: "number", defaultValue: "6.5", suffix: "%" },
      { name: "years", label: "Term (years)", type: "number", defaultValue: "30", step: "1" },
      { name: "ufmip", label: "Upfront MIP", type: "number", defaultValue: "1.75", suffix: "%" },
      { name: "annualMip", label: "Annual MIP", type: "number", defaultValue: "0.55", suffix: "%" },
    ],
    compute(v) {
      const price = val(v, "price");
      const downPct = val(v, "downPct");
      const rate = val(v, "rate");
      const years = val(v, "years");
      const ufmip = val(v, "ufmip");
      const annualMip = val(v, "annualMip");
      const e = needPos(price, "Home price") ?? needPos(years, "Term");
      if (e) return err(e);
      const baseLoan = price * (1 - downPct / 100);
      const upfront = baseLoan * (ufmip / 100);
      const totalLoan = baseLoan + upfront;
      const basePmt = payment(totalLoan, rate, years);
      const mipMonthly = (baseLoan * (annualMip / 100)) / 12;
      return ok([
        { label: "Base loan", value: fmtMoney(baseLoan) },
        { label: "Loan with upfront MIP", value: fmtMoney(totalLoan) },
        { label: "P&I payment", value: fmtMoney(basePmt) },
        { label: "Estimated MIP (monthly)", value: fmtMoney(mipMonthly) },
        { label: "Total monthly (estimate)", value: fmtMoney(basePmt + mipMonthly), emphasize: true },
      ]);
    },
  },
  {
    slug: "va-mortgage-calculator",
    fields: [
      { name: "price", label: "Home price", type: "number", defaultValue: "350000", suffix: "$" },
      { name: "down", label: "Down payment", type: "number", defaultValue: "0", suffix: "$" },
      { name: "rate", label: "Interest rate", type: "number", defaultValue: "6.25", suffix: "%" },
      { name: "years", label: "Term (years)", type: "number", defaultValue: "30", step: "1" },
      { name: "fundingFee", label: "VA funding fee", type: "number", defaultValue: "2.15", suffix: "%" },
    ],
    compute(v) {
      const price = val(v, "price");
      const down = val(v, "down");
      const rate = val(v, "rate");
      const years = val(v, "years");
      const fundingFee = val(v, "fundingFee");
      const e = needPos(price, "Home price") ?? needPos(years, "Term");
      if (e) return err(e);
      const baseLoan = Math.max(0, price - down);
      const fee = baseLoan * (fundingFee / 100);
      const loan = baseLoan + fee;
      const pmt = payment(loan, rate, years);
      return ok([
        { label: "Base loan", value: fmtMoney(baseLoan) },
        { label: "Funding fee", value: fmtMoney(fee) },
        { label: "Total loan amount", value: fmtMoney(loan) },
        { label: "Monthly payment", value: fmtMoney(pmt), emphasize: true },
      ]);
    },
  },
  {
    slug: "home-equity-loan-calculator",
    fields: [
      { name: "amount", label: "Loan amount", type: "number", defaultValue: "50000", suffix: "$" },
      { name: "rate", label: "Interest rate", type: "number", defaultValue: "8", suffix: "%" },
      { name: "years", label: "Term (years)", type: "number", defaultValue: "15", step: "1" },
    ],
    compute: (v) => standardLoanCompute(v),
  },
  {
    slug: "heloc-calculator",
    fields: [
      { name: "limit", label: "HELOC credit limit", type: "number", defaultValue: "100000", suffix: "$" },
      { name: "draw", label: "Amount drawn", type: "number", defaultValue: "40000", suffix: "$" },
      { name: "rate", label: "Interest rate", type: "number", defaultValue: "8.75", suffix: "%" },
    ],
    compute(v) {
      const limit = val(v, "limit");
      const draw = val(v, "draw");
      const rate = val(v, "rate");
      const e = needPos(limit, "Limit") ?? needNonNeg(draw, "Draw");
      if (e) return err(e);
      if (draw > limit) return err("Draw cannot exceed credit limit.");
      const interestOnly = (draw * (rate / 100)) / 12;
      const available = limit - draw;
      return ok([
        { label: "Interest-only monthly payment", value: fmtMoney(interestOnly), emphasize: true },
        { label: "Available credit", value: fmtMoney(available) },
      ]);
    },
  },
  {
    slug: "down-payment-calculator",
    fields: [
      { name: "price", label: "Home price", type: "number", defaultValue: "400000", suffix: "$" },
      { name: "downPct", label: "Down payment percent", type: "number", defaultValue: "20", suffix: "%" },
    ],
    compute(v) {
      const price = val(v, "price");
      const downPct = val(v, "downPct");
      const e = needPos(price, "Home price") ?? needNonNeg(downPct, "Down payment");
      if (e) return err(e);
      const down = price * (downPct / 100);
      return ok([
        { label: "Down payment amount", value: fmtMoney(down), emphasize: true },
        { label: "Loan amount", value: fmtMoney(price - down) },
      ]);
    },
  },
  {
    slug: "rent-vs-buy-calculator",
    fields: [
      { name: "homePrice", label: "Home price", type: "number", defaultValue: "400000", suffix: "$" },
      { name: "downPct", label: "Down payment", type: "number", defaultValue: "20", suffix: "%" },
      { name: "rate", label: "Mortgage rate", type: "number", defaultValue: "6.5", suffix: "%" },
      { name: "years", label: "Comparison period (years)", type: "number", defaultValue: "7", step: "1" },
      { name: "rent", label: "Monthly rent", type: "number", defaultValue: "2200", suffix: "$" },
      { name: "rentIncrease", label: "Rent increase per year", type: "number", defaultValue: "3", suffix: "%" },
      { name: "maintenance", label: "Home maintenance (% of value / yr)", type: "number", defaultValue: "1", suffix: "%" },
    ],
    compute(v) {
      const homePrice = val(v, "homePrice");
      const downPct = val(v, "downPct");
      const rate = val(v, "rate");
      const years = val(v, "years");
      const rent = val(v, "rent");
      const rentIncrease = val(v, "rentIncrease");
      const maintenance = val(v, "maintenance");
      const e = needPos(homePrice, "Home price") ?? needPos(years, "Years") ?? needPos(rent, "Rent");
      if (e) return err(e);
      const loan = homePrice * (1 - downPct / 100);
      const down = homePrice - loan;
      const pmt = payment(loan, rate, years);
      let buyCost = down;
      let rentCost = 0;
      let r = rent;
      let balance = loan;
      const rm = rate / 100 / 12;
      for (let y = 0; y < years; y++) {
        for (let m = 0; m < 12; m++) {
          const int = balance * rm;
          buyCost += pmt;
          balance = Math.max(0, balance - (pmt - int));
        }
        buyCost += homePrice * (maintenance / 100);
        for (let m = 0; m < 12; m++) rentCost += r;
        r *= 1 + rentIncrease / 100;
      }
      const equity = homePrice - balance;
      const netBuy = buyCost - equity;
      const diff = netBuy - rentCost;
      return ok([
        { label: "Total rent cost", value: fmtMoney(rentCost) },
        { label: "Net buy cost (after equity)", value: fmtMoney(netBuy), emphasize: true },
        { label: "Buy vs rent difference", value: fmtMoney(diff) },
        { label: "Note", value: diff < 0 ? "Buying costs less in this scenario." : "Renting costs less in this scenario." },
      ]);
    },
  },
  {
    slug: "payback-period-calculator",
    fields: [
      { name: "investment", label: "Initial investment", type: "number", defaultValue: "50000", suffix: "$" },
      { name: "annualCF", label: "Annual cash flow", type: "number", defaultValue: "12000", suffix: "$" },
    ],
    compute(v) {
      const investment = val(v, "investment");
      const annualCF = val(v, "annualCF");
      const e = needPos(investment, "Investment") ?? needPos(annualCF, "Cash flow");
      if (e) return err(e);
      const years = investment / annualCF;
      return ok([
        { label: "Simple payback period", value: `${fmt(years, 2)} years`, emphasize: true },
        { label: "Months (approx.)", value: fmt(years * 12, 0) },
      ]);
    },
  },
  {
    slug: "present-value-calculator",
    fields: [
      { name: "future", label: "Future value", type: "number", defaultValue: "100000", suffix: "$" },
      { name: "rate", label: "Discount rate", type: "number", defaultValue: "6", suffix: "%" },
      { name: "years", label: "Years", type: "number", defaultValue: "10", step: "1" },
    ],
    compute(v) {
      const future = val(v, "future");
      const rate = val(v, "rate");
      const years = val(v, "years");
      const e = needPos(future, "Future value") ?? needPos(years, "Years");
      if (e) return err(e);
      const pv = presentValue(future, rate, years);
      return ok([{ label: "Present value", value: fmtMoney(pv), emphasize: true }]);
    },
  },
  {
    slug: "future-value-calculator",
    fields: [
      { name: "present", label: "Present value", type: "number", defaultValue: "10000", suffix: "$" },
      { name: "rate", label: "Annual rate", type: "number", defaultValue: "7", suffix: "%" },
      { name: "years", label: "Years", type: "number", defaultValue: "10", step: "1" },
      { name: "compounds", label: "Compounds per year", type: "number", defaultValue: "12", step: "1" },
    ],
    compute(v) {
      const present = val(v, "present");
      const rate = val(v, "rate");
      const years = val(v, "years");
      const compounds = val(v, "compounds");
      const e = needPos(present, "Present value") ?? needPos(years, "Years") ?? needPos(compounds, "Compounds");
      if (e) return err(e);
      const fv = compoundFutureValue(present, rate, years, compounds, 0);
      return ok([{ label: "Future value", value: fmtMoney(fv), emphasize: true }]);
    },
  },
  {
    slug: "commission-calculator",
    fields: [
      { name: "sale", label: "Sale amount", type: "number", defaultValue: "450000", suffix: "$" },
      { name: "rate", label: "Commission rate", type: "number", defaultValue: "3", suffix: "%" },
    ],
    compute(v) {
      const sale = val(v, "sale");
      const rate = val(v, "rate");
      const e = needPos(sale, "Sale amount") ?? needNonNeg(rate, "Rate");
      if (e) return err(e);
      const commission = sale * (rate / 100);
      return ok([
        { label: "Commission earned", value: fmtMoney(commission), emphasize: true },
        { label: "Net to seller (before other fees)", value: fmtMoney(sale - commission) },
      ]);
    },
  },
  {
    slug: "mortgage-calculator-uk",
    fields: MORTGAGE_FIELDS,
    compute(v) {
      const { loan, e } = mortgageLoan(v);
      if (e) return err(e);
      const y = val(v, "years");
      const r = val(v, "rate");
      const te = needPos(y, "Term");
      if (te) return err(te);
      const pmt = payment(loan, r, y);
      const total = pmt * y * 12;
      return ok([
        { label: "Repayment mortgage (capital & interest)", value: fmtMoney(pmt), emphasize: true },
        { label: "Loan amount", value: fmtMoney(loan) },
        { label: "Total amount payable", value: fmtMoney(total) },
        { label: "Total interest", value: fmtMoney(total - loan) },
      ]);
    },
  },
  {
    slug: "canadian-mortgage-calculator",
    fields: MORTGAGE_FIELDS,
    compute(v) {
      const { loan, e } = mortgageLoan(v);
      if (e) return err(e);
      const y = val(v, "years");
      const nominal = val(v, "rate");
      const te = needPos(y, "Term");
      if (te) return err(te);
      const rm = canadianMonthlyRate(nominal);
      const n = y * 12;
      const pmt = rm === 0 ? loan / n : (loan * rm * Math.pow(1 + rm, n)) / (Math.pow(1 + rm, n) - 1);
      const total = pmt * n;
      return ok([
        { label: "Monthly payment (semi-annual compounding)", value: fmtMoney(pmt), emphasize: true },
        { label: "Loan amount", value: fmtMoney(loan) },
        { label: "Total interest", value: fmtMoney(total - loan) },
      ]);
    },
  },
  {
    slug: "mortgage-amortization-calculator",
    fields: MORTGAGE_FIELDS,
    compute(v) {
      const { loan, e } = mortgageLoan(v);
      if (e) return err(e);
      const r = val(v, "rate");
      const y = val(v, "years");
      return amortSummaryRows(loan, r, y);
    },
  },
  {
    slug: "percent-off-calculator",
    fields: [
      { name: "price", label: "Original price", type: "number", defaultValue: "120", suffix: "$" },
      { name: "percentOff", label: "Percent off", type: "number", defaultValue: "30", suffix: "%" },
    ],
    compute(v) {
      const price = val(v, "price");
      const percentOff = val(v, "percentOff");
      const e = needPos(price, "Price") ?? needNonNeg(percentOff, "Percent off");
      if (e) return err(e);
      const finalPrice = price * (1 - percentOff / 100);
      const saved = price - finalPrice;
      return ok([
        { label: "Final price", value: fmtMoney(finalPrice), emphasize: true },
        { label: "You save", value: fmtMoney(saved) },
        { label: "Discount amount", value: fmtPct(percentOff) },
      ]);
    },
  },
];
