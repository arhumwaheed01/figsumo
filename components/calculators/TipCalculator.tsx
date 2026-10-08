"use client";

import { useMemo, useState } from "react";
import {
  CalcForm,
  ERR_GT_ZERO,
  Field,
  ResultCard,
  UnitInput,
  isNonNegative,
  isPositive,
} from "@/components/ui/Field";

const PRESETS = [15, 18, 20, 25];

function money(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

export function TipCalculator() {
  const [bill, setBill] = useState("60");
  const [percent, setPercent] = useState("20");
  const [people, setPeople] = useState("3");

  const billBad = !isNonNegative(bill);
  const percentBad = !isNonNegative(percent);
  const peopleBad = !isPositive(people) || Number(people) < 1;
  const anyBad = billBad || percentBad || peopleBad;

  const result = useMemo(() => {
    if (anyBad) return null;
    const tip = Number(bill) * (Number(percent) / 100);
    const total = Number(bill) + tip;
    return { tip, total, perPerson: total / Number(people) };
  }, [anyBad, bill, percent, people]);

  return (
    <div className="space-y-4">
      <CalcForm>
        <Field
          label="Bill amount"
          htmlFor="tip-bill"
          error={billBad ? ERR_GT_ZERO : null}
        >
          <UnitInput
            id="tip-bill"
            value={bill}
            onChange={setBill}
            unit="$"
            invalid={billBad}
            min={0}
            step="0.01"
          />
        </Field>

        <div className="space-y-1">
          <p className="text-[15px] font-medium text-zinc-800">Tip percent</p>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPercent(String(p))}
                className={`h-12 min-w-[3.25rem] rounded-lg border px-3 text-sm font-medium ${
                  Number(percent) === p
                    ? "border-[#3f3f46] bg-[#3f3f46] text-white"
                    : "border-[#e4e4e7] bg-white text-[#18181b]"
                }`}
              >
                {p}%
              </button>
            ))}
          </div>
          <Field
            label="Or enter a tip percent"
            htmlFor="tip-percent"
            error={percentBad ? ERR_GT_ZERO : null}
          >
            <UnitInput
              id="tip-percent"
              value={percent}
              onChange={setPercent}
              unit="%"
              invalid={percentBad}
              min={0}
              step="0.5"
            />
          </Field>
        </div>

        <Field
          label="Split between"
          htmlFor="tip-people"
          error={peopleBad ? ERR_GT_ZERO : null}
        >
          <UnitInput
            id="tip-people"
            value={people}
            onChange={setPeople}
            unit="people"
            invalid={peopleBad}
            min={1}
            step={1}
            inputMode="numeric"
          />
        </Field>
      </CalcForm>

      {result ? (
        <ResultCard
          value={money(result.total)}
          unit="total with tip"
          breakdown={`Tip ${money(result.tip)}; ${money(result.perPerson)} per person.`}
        />
      ) : (
        <ResultCard value="—" unit="total with tip" />
      )}
    </div>
  );
}
