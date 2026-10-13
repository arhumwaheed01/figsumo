"use client";

import type { BreakdownSlice } from "@/lib/calc/result-types";
import { fmtMoney } from "@/lib/calc/format";

const PALETTE = ["#2563EB", "#101010", "#94A3B8", "#64748B", "#CBD5E1"];

export function DonutChart({
  slices,
  title = "Payment breakdown",
}: {
  slices: BreakdownSlice[];
  title?: string;
}) {
  const total = slices.reduce((s, x) => s + Math.max(0, x.value), 0);
  if (total <= 0) return null;

  const size = 180;
  const stroke = 28;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div className="rounded-xl border border-ink/10 bg-ink/[0.02] p-4">
      <h3 className="text-sm font-bold text-ink">{title}</h3>
      <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:items-center">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0">
          <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
            {slices.map((slice, i) => {
              const value = Math.max(0, slice.value);
              const len = (value / total) * c;
              const color = slice.color ?? PALETTE[i % PALETTE.length];
              const el = (
                <circle
                  key={slice.label}
                  cx={size / 2}
                  cy={size / 2}
                  r={r}
                  fill="none"
                  stroke={color}
                  strokeWidth={stroke}
                  strokeDasharray={`${len} ${c - len}`}
                  strokeDashoffset={-offset}
                />
              );
              offset += len;
              return el;
            })}
          </g>
          <text
            x="50%"
            y="48%"
            textAnchor="middle"
            className="fill-ink text-[11px] font-semibold"
          >
            Total
          </text>
          <text
            x="50%"
            y="62%"
            textAnchor="middle"
            className="fill-ink text-[12px] font-bold"
          >
            {fmtMoney(total)}
          </text>
        </svg>
        <ul className="w-full space-y-2 text-sm">
          {slices.map((slice, i) => {
            const pct = (Math.max(0, slice.value) / total) * 100;
            const color = slice.color ?? PALETTE[i % PALETTE.length];
            return (
              <li key={slice.label} className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 text-ink">
                  <span
                    className="h-2.5 w-2.5 rounded-sm"
                    style={{ background: color }}
                    aria-hidden
                  />
                  {slice.label}
                </span>
                <span className="tabular-nums text-ink/70">
                  {pct.toFixed(0)}% · {fmtMoney(slice.value)}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
