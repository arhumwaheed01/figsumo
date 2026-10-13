export function round(n: number, d = 2): number {
  if (!Number.isFinite(n)) return NaN;
  const f = 10 ** d;
  return Math.round(n * f) / f;
}

/** Parse user input: "$32,000", "5.5%", "1 200" → number */
export function parseNum(s: string): number {
  const trimmed = s.trim();
  if (!trimmed) return NaN;
  const normalized = trimmed
    .replace(/[$€£¥%\s]/g, "")
    .replace(/,/g, "");
  if (!normalized || normalized === "-" || normalized === "." || normalized === "-.") {
    return NaN;
  }
  const n = Number(normalized);
  return Number.isFinite(n) ? n : NaN;
}

export function fmt(n: number, digits = 2): string {
  if (!Number.isFinite(n)) return "—";
  return new Intl.NumberFormat(undefined, {
    maximumFractionDigits: digits,
    minimumFractionDigits: 0,
  }).format(n);
}

export function fmtMoney(n: number, currency = "USD"): string {
  if (!Number.isFinite(n)) return "—";
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(n);
}

/** Formats a percentage value (e.g. 5.25 → "5.25%"). */
export function fmtPct(n: number, digits = 2): string {
  if (!Number.isFinite(n)) return "—";
  return `${fmt(n, digits)}%`;
}
