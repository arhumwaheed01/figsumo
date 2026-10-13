"use client";

import type { ChartSeries } from "@/lib/calc/result-types";
import { fmtMoney } from "@/lib/calc/format";

export function LineChart({
  series,
  title = "Amortization over time",
  yIsMoney = true,
}: {
  series: ChartSeries[];
  title?: string;
  yIsMoney?: boolean;
}) {
  if (!series.length || series.every((s) => s.points.length < 2)) return null;

  const all = series.flatMap((s) => s.points);
  const minX = Math.min(...all.map((p) => p.x));
  const maxX = Math.max(...all.map((p) => p.x));
  const minY = 0;
  const maxY = Math.max(...all.map((p) => p.y), 1);
  const w = 560;
  const h = 240;
  const pad = { t: 16, r: 12, b: 36, l: 56 };
  const iw = w - pad.l - pad.r;
  const ih = h - pad.t - pad.b;

  const sx = (x: number) => pad.l + ((x - minX) / (maxX - minX || 1)) * iw;
  const sy = (y: number) =>
    pad.t + ih - ((y - minY) / (maxY - minY || 1)) * ih;

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((t) => minY + t * (maxY - minY));

  return (
    <div className="h-full rounded-xl border border-ink/10 bg-paper p-4 sm:p-5">
      <h3 className="text-sm font-bold text-ink">{title}</h3>
      <div className="mt-3 overflow-x-auto">
        <svg
          width={w}
          height={h}
          viewBox={`0 0 ${w} ${h}`}
          className="max-w-full"
          role="img"
          aria-label={title}
        >
          {yTicks.map((y) => (
            <g key={y}>
              <line
                x1={pad.l}
                x2={w - pad.r}
                y1={sy(y)}
                y2={sy(y)}
                stroke="#101010"
                strokeOpacity="0.08"
              />
              <text
                x={pad.l - 8}
                y={sy(y) + 3}
                textAnchor="end"
                className="fill-ink/45 text-[10px]"
              >
                {yIsMoney ? fmtMoney(y).replace(/\.00$/, "") : y.toFixed(0)}
              </text>
            </g>
          ))}
          <text
            x={(pad.l + w - pad.r) / 2}
            y={h - 8}
            textAnchor="middle"
            className="fill-ink/45 text-[10px]"
          >
            Period
          </text>
          {series.map((s) => {
            const d = s.points
              .map((p, i) => `${i === 0 ? "M" : "L"}${sx(p.x)},${sy(p.y)}`)
              .join(" ");
            return (
              <path
                key={s.name}
                d={d}
                fill="none"
                stroke={s.color}
                strokeWidth="2.25"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            );
          })}
        </svg>
      </div>
      <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink">
        {series.map((s) => (
          <li key={s.name} className="inline-flex items-center gap-1.5">
            <span
              className="h-0.5 w-4 rounded"
              style={{ background: s.color }}
              aria-hidden
            />
            {s.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
