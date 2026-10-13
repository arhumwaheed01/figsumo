"use client";

import { DonutChart } from "@/components/calc/DonutChart";
import { LineChart } from "@/components/calc/LineChart";
import type { CalcSuccess } from "@/lib/calc/result-types";

export type ResultRow = {
  label: string;
  value: string;
  emphasize?: boolean;
};

export function Results({ result }: { result: CalcSuccess }) {
  const { rows, breakdown, series, table, note } = result;
  if (rows.length === 0 && !breakdown && !series && !table) return null;

  const primary = rows.find((r) => r.emphasize) ?? rows[0];
  const secondary = rows.filter((r) => r !== primary);

  return (
    <div className="space-y-4" role="region" aria-label="Calculation results">
      <div className="overflow-hidden rounded-xl border border-ink/15 bg-paper">
        <div className="flex items-center justify-between bg-brand px-4 py-2.5">
          <h2 className="text-sm font-bold tracking-wide text-paper">Results</h2>
        </div>

        <div className="space-y-3 p-4 sm:p-5">
          {primary ? (
            <div className="rounded-lg bg-brand/[0.08] px-4 py-3">
              <p className="text-sm font-medium text-ink/70">{primary.label}</p>
              <p className="mt-1 text-2xl font-bold tabular-nums tracking-tight text-ink sm:text-3xl">
                {primary.value}
              </p>
            </div>
          ) : null}

          {secondary.map((row) => (
            <div
              key={row.label}
              className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-ink/8 pb-2 text-sm last:border-0 last:pb-0"
            >
              <span className="text-ink/70">{row.label}</span>
              <span className="font-semibold tabular-nums text-ink">{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      {(breakdown && breakdown.length > 0) || (series && series.length > 0) ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {series && series.length > 0 ? <LineChart series={series} /> : null}
          {breakdown && breakdown.length > 0 ? (
            <DonutChart slices={breakdown} />
          ) : null}
        </div>
      ) : null}

      {table && table.rows.length > 0 ? (
        <div className="overflow-hidden rounded-xl border border-ink/10">
          {table.caption ? (
            <p className="border-b border-ink/10 bg-ink/[0.03] px-4 py-2 text-sm font-bold text-ink">
              {table.caption}
            </p>
          ) : null}
          <div className="max-h-80 overflow-auto">
            <table className="w-full min-w-[28rem] border-collapse text-left text-sm">
              <thead className="sticky top-0 bg-paper">
                <tr>
                  {table.headers.map((h) => (
                    <th
                      key={h}
                      className="border-b border-ink/10 px-3 py-2 font-semibold text-ink"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, i) => (
                  <tr key={i} className="odd:bg-ink/[0.02]">
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className="border-b border-ink/5 px-3 py-1.5 tabular-nums text-ink/80"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}

      {note ? (
        <p className="text-xs leading-relaxed text-ink/50">{note}</p>
      ) : null}
    </div>
  );
}
