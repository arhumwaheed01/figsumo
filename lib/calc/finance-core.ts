/** Shared financial formulas (no external math package). */

export function payment(principal: number, annualRatePct: number, years: number, periodsPerYear = 12): number {
  const n = years * periodsPerYear;
  const r = annualRatePct / 100 / periodsPerYear;
  if (n <= 0) return NaN;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
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
  if (r === 0) return Math.max(0, principal - pmt * paymentsMade);
  return (
    principal * Math.pow(1 + r, paymentsMade) -
    pmt * ((Math.pow(1 + r, paymentsMade) - 1) / r)
  );
}

export function compoundFutureValue(
  principal: number,
  annualRatePct: number,
  years: number,
  compoundsPerYear = 12,
  payment = 0,
  paymentAtBegin = false,
): number {
  const r = annualRatePct / 100 / compoundsPerYear;
  const n = years * compoundsPerYear;
  if (r === 0) return principal + payment * n;
  const growth = Math.pow(1 + r, n);
  const annuity = payment * ((growth - 1) / r) * (paymentAtBegin ? 1 + r : 1);
  return principal * growth + annuity;
}

export function presentValue(future: number, annualRatePct: number, years: number, compoundsPerYear = 12): number {
  const r = annualRatePct / 100 / compoundsPerYear;
  const n = years * compoundsPerYear;
  if (r === 0) return future;
  return future / Math.pow(1 + r, n);
}

export function simpleInterest(principal: number, annualRatePct: number, years: number): number {
  return principal * (annualRatePct / 100) * years;
}

export function amortizationSchedule(
  principal: number,
  annualRatePct: number,
  years: number,
  periodsPerYear = 12,
): { period: number; payment: number; interest: number; principal: number; balance: number }[] {
  const pmt = payment(principal, annualRatePct, years, periodsPerYear);
  const r = annualRatePct / 100 / periodsPerYear;
  const n = Math.round(years * periodsPerYear);
  const rows = [];
  let balance = principal;
  for (let i = 1; i <= n; i++) {
    const interest = balance * r;
    let prin = pmt - interest;
    if (i === n || prin > balance) prin = balance;
    const actualPmt = prin + interest;
    balance = Math.max(0, balance - prin);
    rows.push({
      period: i,
      payment: actualPmt,
      interest,
      principal: prin,
      balance,
    });
  }
  return rows;
}

export function interestRateFromPayment(
  principal: number,
  pmt: number,
  years: number,
  periodsPerYear = 12,
): number {
  const n = years * periodsPerYear;
  if (principal <= 0 || pmt <= 0 || n <= 0) return NaN;
  if (pmt * n <= principal) return 0;
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 80; i++) {
    const mid = (lo + hi) / 2;
    const trial =
      mid === 0
        ? principal / n
        : (principal * mid * Math.pow(1 + mid, n)) / (Math.pow(1 + mid, n) - 1);
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
  let rate = guess;
  for (let i = 0; i < 100; i++) {
    let f = 0;
    let df = 0;
    for (let t = 0; t < cashFlows.length; t++) {
      const denom = Math.pow(1 + rate, t);
      f += cashFlows[t] / denom;
      if (t > 0) df -= (t * cashFlows[t]) / Math.pow(1 + rate, t + 1);
    }
    if (Math.abs(df) < 1e-12) break;
    const next = rate - f / df;
    if (!Number.isFinite(next)) break;
    if (Math.abs(next - rate) < 1e-10) return next * 100;
    rate = next;
  }
  return rate * 100;
}
