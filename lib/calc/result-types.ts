import type { CalcResultRow } from "@/components/calc/FormulaCalculator";

export type BreakdownSlice = {
  label: string;
  value: number;
  color?: string;
};

export type SeriesPoint = {
  x: number;
  y: number;
  label?: string;
};

export type ChartSeries = {
  name: string;
  color: string;
  points: SeriesPoint[];
};

export type ResultTable = {
  caption?: string;
  headers: string[];
  rows: string[][];
};

export type CalcSuccess = {
  rows: CalcResultRow[];
  breakdown?: BreakdownSlice[];
  series?: ChartSeries[];
  table?: ResultTable;
  note?: string;
};

export type CalcResult = CalcSuccess | { error: string };

export function isCalcError(r: CalcResult): r is { error: string } {
  return "error" in r;
}
