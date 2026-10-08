"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CalcForm,
  Field,
  ResultCard,
  TextInput,
} from "@/components/ui/Field";

function parseDate(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [y, m, d] = value.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  if (
    date.getFullYear() !== y ||
    date.getMonth() !== m - 1 ||
    date.getDate() !== d
  ) {
    return null;
  }
  return date;
}

function formatLocal(n: Date): string {
  const y = n.getFullYear();
  const m = String(n.getMonth() + 1).padStart(2, "0");
  const d = String(n.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function diffYMD(birth: Date, end: Date) {
  let years = end.getFullYear() - birth.getFullYear();
  let months = end.getMonth() - birth.getMonth();
  let days = end.getDate() - birth.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return { years, months, days };
}

const EXAMPLE_END = "2025-03-10";

export function AgeCalculator() {
  const [birth, setBirth] = useState("1990-03-10");
  const [end, setEnd] = useState(EXAMPLE_END);

  useEffect(() => {
    setEnd(formatLocal(new Date()));
  }, []);

  const birthDate = parseDate(birth);
  const endDate = parseDate(end);
  const birthBad = !birthDate;
  const endBad = !endDate;
  const orderBad = !!(birthDate && endDate && endDate < birthDate);

  const age = useMemo(() => {
    if (!birthDate || !endDate || endDate < birthDate) return null;
    return diffYMD(birthDate, endDate);
  }, [birthDate, endDate]);

  return (
    <div className="space-y-4">
      <CalcForm>
        <Field
          label="Birth date"
          htmlFor="age-birth"
          error={birthBad ? "Enter a valid date." : null}
        >
          <TextInput
            id="age-birth"
            type="date"
            value={birth}
            invalid={birthBad}
            onChange={(e) => setBirth(e.target.value)}
            className="max-w-[14rem]"
          />
        </Field>
        <Field
          label="As of date"
          htmlFor="age-end"
          hint="Defaults to today."
          error={
            endBad
              ? "Enter a valid date."
              : orderBad
                ? "Must be on or after the birth date."
                : null
          }
        >
          <TextInput
            id="age-end"
            type="date"
            value={end}
            invalid={endBad || orderBad}
            onChange={(e) => setEnd(e.target.value)}
            className="max-w-[14rem]"
          />
        </Field>
      </CalcForm>

      {age ? (
        <ResultCard
          value={String(age.years)}
          unit="years"
          breakdown={`${age.months} months, ${age.days} days`}
        />
      ) : (
        <ResultCard value="—" unit="years" />
      )}
    </div>
  );
}
