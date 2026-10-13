/** Shared financial formulas (standard amortizing loan math). */

import { round } from "@/lib/calc/format";

export function payment(
  principal: number,
  annualRatePct: number,
  years: number,
  periodsPerYear = 12,
): number {
  const n = years * periodsPerYear;
  const r = annualRatePct / 100 / periodsPerYear;
  if (!(principal > 0) || !(n > 0) || !Number.isFinite(n)) return NaN;
  if (!Number.isFinite(r) || r < 0) return NaN;
  if (r === 0) return principal / n;
  const growth = Math.pow(1 + r, n);
  if (!Number.isFinite(growth) || growth === 1) return NaN;
  return (principal * r * growth) / (growth - 1);
}

/** Canadian mortgages: nominal rate compounds semi-annually. */
export function canadianMortgagePayment(
  principal: number,
  annualRatePct: number,
  years: number,
): number {
  const semi = annualRatePct / 100 / 2;
  const monthlyRate = Math.pow(1 + semi, 2 / 12) - 1;
  const n = years * 12;
  if (!(principal > 0) || !(n > 0)) return NaN;
  if (monthlyRate === 0) return principal / n;
  const growth = Math.pow(1 + monthlyRate, n);
  return (principal * monthlyRate * growth) / (growth - 1);
}

export function loanBalance(
  principal: number,
  annualRatePct: number,
  years: number,
  paymentsMade: number,
  periodsPerYear = 12,
): number {
  const pmt = payment(principal, annualRatePct, years, periodsPerYear);
  const r = annualRatePct / 100 / periodsPerYear;
  const n = years * periodsPerYear;
  if (!Number.isFinite(pmt)) return NaN;
  if (paymentsMade <= 0) return principal;
  if (paymentsMade >= n) return 0;
  if (r === 0) return Math.max(0, principal - pmt * paymentsMade);
  return (
    principal * Math.pow(1 + r, paymentsMade) -
    pmt * ((Math.pow(1 + r, paymentsMade) - 1) / r)
  );
}

/**
 * Future value with optional recurring contribution.
 * `contribPerPeriod` is the amount added each compounding period.
 * For monthly deposits with annual compounding, convert first:
 *   contribPerPeriod = monthly * 12 / compoundsPerYear
 */
export function compoundFutureValue(
  principal: number,
  annualRatePct: number,
  years: number,
  compoundsPerYear = 12,
  contribPerPeriod = 0,
  paymentAtBegin = false,
): number {
  const m = compoundsPerYear > 0 ? compoundsPerYear : 12;
  const r = annualRatePct / 100 / m;
  const n = years * m;
  if (!(n >= 0) || !Number.isFinite(n)) return NaN;
  if (r === 0) return principal + contribPerPeriod * n;
  const growth = Math.pow(1 + r, n);
  const annuity =
    contribPerPeriod * ((growth - 1) / r) * (paymentAtBegin ? 1 + r : 1);
  return principal * growth + annuity;
}

/** Convenience: monthly contribution + compounding frequency. */
export function compoundFutureValueMonthly(
  principal: number,
  annualRatePct: number,
  years: number,
  compoundsPerYear: number,
  monthlyContribution: number,
  paymentAtBegin = false,
): number {
  const m = compoundsPerYear > 0 ? compoundsPerYear : 12;
  const perPeriod = monthlyContribution * (12 / m);
  return compoundFutureValue(
    principal,
    annualRatePct,
    years,
    m,
    perPeriod,
    paymentAtBegin,
  );
}

export function presentValue(
  future: number,
  annualRatePct: number,
  years: number,
  compoundsPerYear = 12,
): number {
  const m = compoundsPerYear > 0 ? compoundsPerYear : 12;
  const r = annualRatePct / 100 / m;
  const n = years * m;
  if (r === 0) return future;
  return future / Math.pow(1 + r, n);
}

export function simpleInterest(
  principal: number,
  annualRatePct: number,
  years: number,
): number {
  return principal * (annualRatePct / 100) * years;
}

export function compoundInterestAmount(
  principal: number,
  annualRatePct: number,
  years: number,
  compoundsPerYear = 12,
): number {
  const fv = compoundFutureValue(principal, annualRatePct, years, compoundsPerYear, 0);
  return fv - principal;
}

/**
 * Bank-style amortization with cent rounding.
 * Payment is rounded to cents; final period adjusts to clear the balance.
 */
export function amortizationSchedule(
  principal: number,
  annualRatePct: number,
  years: number,
  periodsPerYear = 12,
): {
  period: number;
  payment: number;
  interest: number;
  principal: number;
  balance: number;
}[] {
  const rawPmt = payment(principal, annualRatePct, years, periodsPerYear);
  const r = annualRatePct / 100 / periodsPerYear;
  const n = Math.round(years * periodsPerYear);
  if (!Number.isFinite(rawPmt) || n <= 0) return [];

  const pmt = round(rawPmt, 2);
  const rows = [];
  let balance = round(principal, 2);

  for (let i = 1; i <= n; i++) {
    const interest = round(balance * r, 2);
    let prin = round(pmt - interest, 2);
    let actualPmt = pmt;

    if (i === n || prin >= balance) {
      prin = balance;
      actualPmt = round(prin + interest, 2);
    }

    balance = round(Math.max(0, balance - prin), 2);
    rows.push({
      period: i,
      payment: actualPmt,
      interest,
      principal: prin,
      balance,
    });
    if (balance <= 0) break;
  }
  return rows;
}

/**
 * Solve nominal annual rate (%) from fixed payment (bisection).
 * Matches standard amortizing-loan calculators (e.g. calculator.net style).
 */
export function interestRateFromPayment(
  principal: number,
  pmt: number,
  years: number,
  periodsPerYear = 12,
): number {
  const n = Math.round(years * periodsPerYear);
  if (!(principal > 0) || !(pmt > 0) || !(n > 0)) return NaN;
  if (pmt * n <= principal + 1e-9) return NaN;

  const target = (ratePerPeriod: number) => {
    if (Math.abs(ratePerPeriod) < 1e-15) return principal / n;
    const g = Math.pow(1 + ratePerPeriod, n);
    return (principal * ratePerPeriod * g) / (g - 1);
  };

  let lo = 0;
  let hi = 0.05;
  for (let i = 0; i < 80 && target(hi) < pmt; i++) {
    hi *= 2;
    if (hi > 100) return NaN;
  }
  if (!Number.isFinite(target(hi))) return NaN;

  for (let i = 0; i < 120; i++) {
    const mid = (lo + hi) / 2;
    const trial = target(mid);
    if (!Number.isFinite(trial)) {
      hi = mid;
      continue;
    }
    if (trial > pmt) hi = mid;
    else lo = mid;
  }
  return ((lo + hi) / 2) * periodsPerYear * 100;
}

export function npv(ratePct: number, cashFlows: number[]): number {
  const r = ratePct / 100;
  return cashFlows.reduce((sum, cf, t) => sum + cf / Math.pow(1 + r, t), 0);
}

export function irr(cashFlows: number[], guess = 0.1): number {
  if (cashFlows.length < 2) return NaN;
  let rate = guess;
  for (let i = 0; i < 100; i++) {
    let f = 0;
    let df = 0;
    for (let t = 0; t < cashFlows.length; t++) {
      const denom = Math.pow(1 + rate, t);
      f += cashFlows[t] / denom;
      if (t > 0) df -= (t * cashFlows[t]) / Math.pow(1 + rate, t + 1);
    }
    if (Math.abs(df) < 1e-14) break;
    const next = rate - f / df;
    if (!Number.isFinite(next)) break;
    if (Math.abs(next - rate) < 1e-12) return next * 100;
    rate = next;
  }
  return Number.isFinite(rate) ? rate * 100 : NaN;
}
