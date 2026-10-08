"use client";

import { useMemo, useState } from "react";
import {
  Button,
  CalcForm,
  ERR_GT_ZERO,
  Field,
  ResultCard,
  SelectInput,
  TextInput,
  UnitInput,
  isNonNegative,
} from "@/components/ui/Field";

const GRADE_POINTS: Record<string, number> = {
  "A+": 4.0,
  A: 4.0,
  "A-": 3.7,
  "B+": 3.3,
  B: 3.0,
  "B-": 2.7,
  "C+": 2.3,
  C: 2.0,
  "C-": 1.7,
  "D+": 1.3,
  D: 1.0,
  "D-": 0.7,
  F: 0.0,
};

type Row = { id: number; course: string; credits: string; grade: string };

let nextId = 3;

export function GpaCalculator() {
  const [rows, setRows] = useState<Row[]>([
    { id: 1, course: "Math", credits: "3", grade: "A" },
    { id: 2, course: "History", credits: "3", grade: "B" },
  ]);

  const creditErrors = rows.map((r) => !isNonNegative(r.credits));
  const anyBad = creditErrors.some(Boolean);

  const result = useMemo(() => {
    if (anyBad) return null;
    let points = 0;
    let creditsSum = 0;
    for (const row of rows) {
      const c = Number(row.credits);
      points += GRADE_POINTS[row.grade] * c;
      creditsSum += c;
    }
    if (creditsSum <= 0) return null;
    return { gpa: points / creditsSum, totalCredits: creditsSum };
  }, [anyBad, rows]);

  function updateRow(id: number, patch: Partial<Row>) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  function addRow() {
    nextId += 1;
    setRows((prev) => [
      ...prev,
      { id: nextId, course: "", credits: "3", grade: "B" },
    ]);
  }

  function removeRow(id: number) {
    setRows((prev) =>
      prev.length <= 1 ? prev : prev.filter((r) => r.id !== id)
    );
  }

  function reset() {
    nextId = 3;
    setRows([
      { id: 1, course: "Math", credits: "3", grade: "A" },
      { id: 2, course: "History", credits: "3", grade: "B" },
    ]);
  }

  return (
    <div className="space-y-4">
      <CalcForm>
        {rows.map((row, index) => (
          <div key={row.id} className="space-y-3 border-b border-zinc-200 pb-4">
            <Field label="Course name" htmlFor={`gpa-c-${row.id}`}>
              <TextInput
                id={`gpa-c-${row.id}`}
                value={row.course}
                placeholder={`Course ${index + 1}`}
                onChange={(e) => updateRow(row.id, { course: e.target.value })}
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field
                label="Credits"
                htmlFor={`gpa-cr-${row.id}`}
                error={creditErrors[index] ? ERR_GT_ZERO : null}
              >
                <UnitInput
                  id={`gpa-cr-${row.id}`}
                  value={row.credits}
                  onChange={(v) => updateRow(row.id, { credits: v })}
                  unit="cr"
                  invalid={creditErrors[index]}
                  min={0}
                  step="0.5"
                />
              </Field>
              <Field label="Letter grade" htmlFor={`gpa-g-${row.id}`}>
                <SelectInput
                  id={`gpa-g-${row.id}`}
                  value={row.grade}
                  onChange={(e) => updateRow(row.id, { grade: e.target.value })}
                >
                  {Object.keys(GRADE_POINTS).map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </SelectInput>
              </Field>
            </div>
            {rows.length > 1 ? (
              <button
                type="button"
                onClick={() => removeRow(row.id)}
                className="text-sm text-zinc-500 underline-offset-2 hover:text-zinc-800 hover:underline"
              >
                Remove course
              </button>
            ) : null}
          </div>
        ))}

        <div className="flex flex-wrap gap-2">
          <Button onClick={addRow}>Add course</Button>
          <Button onClick={reset}>Reset</Button>
        </div>
      </CalcForm>

      {result ? (
        <ResultCard
          value={result.gpa.toFixed(2)}
          unit="GPA"
          breakdown={`${result.totalCredits} credits on a 4.0 scale`}
        />
      ) : (
        <ResultCard value="—" unit="GPA" />
      )}
    </div>
  );
}
