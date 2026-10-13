import { amortizationSchedule, interestRateFromPayment, payment } from "@/lib/calc/finance-core";
import { fmt, fmtMoney, fmtPct, round } from "@/lib/calc/format";
import type { CalcSuccess } from "@/lib/calc/result-types";

const BRAND = "#2563EB";
const INK = "#101010";
const MUTED = "#94A3B8";

export function loanDetailResult(opts: {
  principal: number;
  annualRatePct: number;
  years: number;
  months?: number;
  periodsPerYear?: number;
  primaryLabel?: string;
}): CalcSuccess {
  const months = opts.months ?? 0;
  const years = opts.years + months / 12;
  const ppy = opts.periodsPerYear ?? 12;
  const pmt = payment(opts.principal, opts.annualRatePct, years, ppy);
  const schedule = amortizationSchedule(opts.principal, opts.annualRatePct, years, ppy);
  const totalPaid = schedule.reduce((s, r) => s + r.payment, 0);
  const totalInterest = totalPaid - opts.principal;

  const step = Math.max(1, Math.floor(schedule.length / 36));
  const sampled = schedule.filter((_, i) => i % step === 0 || i === schedule.length - 1);

  let cumInterest = 0;
  let cumPayment = 0;
  const balancePts = [{ x: 0, y: opts.principal, label: "0" }];
  const interestPts = [{ x: 0, y: 0, label: "0" }];
  const paymentPts = [{ x: 0, y: 0, label: "0" }];

  for (const row of sampled) {
    cumInterest += row.interest * step;
    cumPayment += row.payment * step;
    // Use exact cumulative from full schedule up to this period
  }

  cumInterest = 0;
  cumPayment = 0;
  let si = 0;
  for (let i = 0; i < schedule.length; i++) {
    cumInterest += schedule[i].interest;
    cumPayment += schedule[i].payment;
    if (i % step === 0 || i === schedule.length - 1) {
      const x = (i + 1) / ppy;
      balancePts.push({ x, y: schedule[i].balance, label: fmt(x, 1) });
      interestPts.push({ x, y: cumInterest, label: fmt(x, 1) });
      paymentPts.push({ x, y: cumPayment, label: fmt(x, 1) });
      si++;
    }
  }
  void si;

  const tableRows = schedule.slice(0, 12).map((r) => [
    String(r.period),
    fmtMoney(r.payment),
    fmtMoney(r.principal),
    fmtMoney(r.interest),
    fmtMoney(r.balance),
  ]);

  return {
    rows: [
      {
        label: opts.primaryLabel ?? "Monthly payment",
        value: fmtMoney(pmt),
        emphasize: true,
      },
      {
        label: `Total of ${schedule.length} payments`,
        value: fmtMoney(totalPaid),
      },
      {
        label: "Total interest paid",
        value: fmtMoney(totalInterest),
      },
      {
        label: "Interest rate",
        value: fmtPct(opts.annualRatePct, 3),
      },
    ],
    breakdown: [
      { label: "Principal", value: opts.principal, color: BRAND },
      { label: "Interest", value: Math.max(0, totalInterest), color: INK },
    ],
    series: [
      { name: "Balance", color: BRAND, points: balancePts },
      { name: "Interest (cum.)", color: MUTED, points: interestPts },
      { name: "Payment (cum.)", color: INK, points: paymentPts },
    ],
    table: {
      caption: "First 12 payment periods",
      headers: ["Period", "Payment", "Principal", "Interest", "Balance"],
      rows: tableRows,
    },
    note: "Figures are estimates for planning. Actual lender terms may differ.",
  };
}

export function interestRateDetailResult(opts: {
  principal: number;
  monthlyPayment: number;
  years: number;
  months?: number;
}): CalcSuccess | { error: string } {
  const years = opts.years + (opts.months ?? 0) / 12;
  if (years <= 0) return { error: "Enter a valid loan term." };
  const rate = interestRateFromPayment(opts.principal, opts.monthlyPayment, years);
  if (!Number.isFinite(rate) || rate < 0) {
    return { error: "Payment is too low to repay this loan in the given term." };
  }
  const n = Math.round(years * 12);
  const totalPaid = opts.monthlyPayment * n;
  const totalInterest = totalPaid - opts.principal;
  const rich = loanDetailResult({
    principal: opts.principal,
    annualRatePct: rate,
    years: opts.years,
    months: opts.months,
    primaryLabel: "Interest rate",
  });
  return {
    ...rich,
    rows: [
      {
        label: "Interest rate",
        value: fmtPct(round(rate, 3), 3),
        emphasize: true,
      },
      {
        label: `Total of ${n} monthly payments`,
        value: fmtMoney(totalPaid),
      },
      {
        label: "Total interest paid",
        value: fmtMoney(totalInterest),
      },
    ],
  };
}
