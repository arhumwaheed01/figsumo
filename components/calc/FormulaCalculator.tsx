"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Field } from "@/components/calc/Field";
import { ResultsSummary, ResultsVisuals } from "@/components/calc/Results";
import type { CalcResult } from "@/lib/calc/result-types";
import { isCalcError } from "@/lib/calc/result-types";

export type FieldDef = {
  name: string;
  label: string;
  type: "number" | "select" | "text" | "date";
  defaultValue?: string;
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
  step?: string;
  placeholder?: string;
  suffix?: string;
  prefix?: string;
  wide?: boolean;
};

export type CalcResultRow = {
  label: string;
  value: string;
  emphasize?: boolean;
};

export type { CalcResult };

export type FormulaCalculatorProps = {
  fields: FieldDef[];
  compute: (values: Record<string, string>) => CalcResult;
  submitLabel?: string;
  autoRun?: boolean;
};

function initialValues(fields: FieldDef[]): Record<string, string> {
  const out: Record<string, string> = {};
  for (const f of fields) {
    if (f.defaultValue !== undefined) {
      out[f.name] = f.defaultValue;
    } else if (f.type === "select" && f.options?.length) {
      out[f.name] = f.options[0].value;
    } else {
      out[f.name] = "";
    }
  }
  return out;
}

export function FormulaCalculator({
  fields,
  compute,
  submitLabel = "Calculate",
  autoRun = true,
}: FormulaCalculatorProps) {
  const defaults = useMemo(() => initialValues(fields), [fields]);
  const [values, setValues] = useState(defaults);
  const [result, setResult] = useState<CalcResult | null>(null);

  const setField = useCallback((name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const runCalculate = useCallback(
    (next = values) => {
      setResult(compute(next));
    },
    [compute, values],
  );

  useEffect(() => {
    if (autoRun) setResult(compute(defaults));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runCalculate();
  };

  const onClear = () => {
    setValues(defaults);
    if (autoRun) setResult(compute(defaults));
    else setResult(null);
  };

  const success =
    result && !isCalcError(result) ? result : null;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
        <form
          onSubmit={onSubmit}
          className="rounded-xl border border-ink/15 bg-ink/[0.03] p-4 sm:p-5"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {fields.map((field) => {
              const value = values[field.name] ?? "";
              const common = {
                label: field.label,
                name: field.name,
                value,
                onChange: (v: string) => setField(field.name, v),
                suffix: field.suffix,
                prefix: field.prefix,
              };
              const wrap = field.wide ? "sm:col-span-2" : "";

              let control = null;
              if (field.type === "select") {
                control = (
                  <Field
                    type="select"
                    options={field.options ?? []}
                    {...common}
                  />
                );
              } else if (field.type === "number") {
                control = (
                  <Field
                    type="number"
                    min={field.min}
                    max={field.max}
                    step={field.step}
                    placeholder={field.placeholder}
                    {...common}
                  />
                );
              } else if (field.type === "date") {
                control = <Field type="date" {...common} />;
              } else {
                control = (
                  <Field
                    type="text"
                    placeholder={field.placeholder}
                    {...common}
                  />
                );
              }

              return (
                <div key={field.name} className={wrap}>
                  {control}
                </div>
              );
            })}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-brand px-6 text-sm font-semibold text-paper transition-colors hover:bg-brand/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              <span aria-hidden>▶</span>
              {submitLabel}
            </button>
            <button
              type="button"
              onClick={onClear}
              className="inline-flex h-11 items-center justify-center rounded-lg border border-ink/20 bg-paper px-5 text-sm font-semibold text-ink hover:bg-ink/[0.04]"
            >
              Clear
            </button>
          </div>
        </form>

        <div>
          {result !== null ? (
            isCalcError(result) ? (
              <p
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
                role="alert"
              >
                {result.error}
              </p>
            ) : (
              <ResultsSummary result={result} />
            )
          ) : (
            <div className="rounded-xl border border-dashed border-ink/20 px-4 py-10 text-center text-sm text-ink/45">
              Enter values and press Calculate to see detailed results.
            </div>
          )}
        </div>
      </div>

      {success ? <ResultsVisuals result={success} /> : null}
    </div>
  );
}
