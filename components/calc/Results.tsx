"use client";

import { DonutChart } from "@/components/calc/DonutChart";
import { LineChart } from "@/components/calc/LineChart";
import type { CalcSuccess } from "@/lib/calc/result-types";

export type ResultRow = {
  label: string;
  value: string;
  emphasize?: boolean;
};

/** Summary panel only (inputs column partner). Charts/tables render separately. */
export function ResultsSummary({ result }: { result: CalcSuccess }) {
  const { rows, note } = result;
  if (rows.length === 0) return null;

  const primary = rows.find((r) => r.emphasize) ?? rows[0];
  const secondary = rows.filter((r) => r !== primary);

  return (
    <div className="overflow-hidden rounded-xl border-2 border-ink/15 bg-paper shadow-[0_8px_24px_-18px_rgba(16,16,16,0.3)]">
      <div className="flex items-center justify-between bg-brand px-4 py-3 text-white">
        <h2 className="text-base font-bold tracking-wide text-white">Results</h2>
      </div>

      <div className="space-y-3.5 p-5 sm:p-6">
        {primary ? (
          <div className="rounded-lg bg-brand/[0.1] px-4 py-4">
            <p className="text-[15px] font-semibold text-ink/75">{primary.label}</p>
            <p className="mt-1 text-3xl font-bold tabular-nums tracking-tight text-ink sm:text-4xl">
              {primary.value}
            </p>
          </div>
        ) : null}

        {secondary.map((row) => (
          <div
            key={row.label}
            className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-ink/10 pb-2.5 text-[15px] last:border-0 last:pb-0"
          >
            <span className="font-medium text-ink/75">{row.label}</span>
            <span className="font-bold tabular-nums text-ink">{row.value}</span>
          </div>
        ))}

        {note ? (
          <p className="pt-1 text-sm leading-relaxed text-ink/55">{note}</p>
        ) : null}
      </div>
    </div>
  );
}

export function ResultsVisuals({ result }: { result: CalcSuccess }) {
  const { breakdown, series, table } = result;
  const hasCharts =
    (breakdown && breakdown.length > 0) || (series && series.length > 0);
  const hasTable = Boolean(table && table.rows.length > 0);
  if (!hasCharts && !hasTable) return null;

  return (
    <div className="space-y-4" role="region" aria-label="Detailed charts and tables">
      {hasCharts ? (
        <div className="grid gap-4 xl:grid-cols-2">
          {series && series.length > 0 ? <LineChart series={series} /> : null}
          {breakdown && breakdown.length > 0 ? (
            <DonutChart slices={breakdown} />
          ) : null}
        </div>
      ) : null}

      {hasTable ? (
        <div className="overflow-hidden rounded-xl border border-ink/10 bg-paper">
          {table!.caption ? (
            <p className="border-b border-ink/10 bg-ink/[0.03] px-4 py-2 text-sm font-bold text-ink">
              {table!.caption}
            </p>
          ) : null}
          <div className="max-h-80 overflow-auto">
            <table className="w-full min-w-[28rem] border-collapse text-left text-sm">
              <thead className="sticky top-0 bg-paper">
                <tr>
                  {table!.headers.map((h) => (
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
                {table!.rows.map((row, i) => (
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
    </div>
  );
}

/** @deprecated Prefer ResultsSummary + ResultsVisuals for layout control */
export function Results({ result }: { result: CalcSuccess }) {
  return (
    <div className="space-y-4">
      <ResultsSummary result={result} />
      <ResultsVisuals result={result} />
    </div>
  );
}
