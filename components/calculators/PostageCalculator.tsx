"use client";

import { useMemo, useState } from "react";
import {
  CalcForm,
  ERR_GT_ZERO,
  Field,
  ResultCard,
  SelectInput,
  UnitInput,
  isPositive,
} from "@/components/ui/Field";

const LETTER_RATES: { maxOz: number; price: number }[] = [
  { maxOz: 1, price: 0.73 },
  { maxOz: 2, price: 0.97 },
  { maxOz: 3, price: 1.21 },
  { maxOz: 3.5, price: 1.45 },
];

const FLAT_RATES: { maxOz: number; price: number }[] = [
  { maxOz: 1, price: 1.5 },
  { maxOz: 2, price: 1.74 },
  { maxOz: 3, price: 1.98 },
  { maxOz: 4, price: 2.22 },
  { maxOz: 5, price: 2.46 },
  { maxOz: 6, price: 2.7 },
  { maxOz: 7, price: 2.94 },
  { maxOz: 8, price: 3.18 },
  { maxOz: 9, price: 3.42 },
  { maxOz: 10, price: 3.66 },
  { maxOz: 11, price: 3.9 },
  { maxOz: 12, price: 4.14 },
  { maxOz: 13, price: 4.38 },
];

function lookup(weight: number, table: { maxOz: number; price: number }[]) {
  for (const row of table) {
    if (weight <= row.maxOz) return row.price;
  }
  return null;
}

function money(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

export function PostageCalculator() {
  const [weight, setWeight] = useState("1");
  const [mailType, setMailType] = useState<"letter" | "flat">("letter");

  const weightBad = !isPositive(weight);

  const result = useMemo(() => {
    if (weightBad) {
      return { price: null as number | null, note: null as string | null };
    }
    const w = Number(weight);

    if (mailType === "letter") {
      if (w > 3.5) {
        return {
          price: null,
          note: "Over 3.5 oz — try Flat, or check USPS.",
        };
      }
      return { price: lookup(w, LETTER_RATES), note: null };
    }

    if (w > 13) {
      return {
        price: null,
        note: "Over 13 oz needs package rates at usps.com.",
      };
    }
    return { price: lookup(w, FLAT_RATES), note: null };
  }, [weightBad, weight, mailType]);

  return (
    <div className="space-y-4">
      <CalcForm>
        <Field
          label="Weight"
          htmlFor="postage-weight"
          error={weightBad ? ERR_GT_ZERO : null}
        >
          <UnitInput
            id="postage-weight"
            value={weight}
            onChange={setWeight}
            unit="oz"
            invalid={weightBad}
            min={0}
            step="0.1"
          />
        </Field>
        <Field label="Mail type" htmlFor="postage-type">
          <SelectInput
            id="postage-type"
            value={mailType}
            onChange={(e) => setMailType(e.target.value as "letter" | "flat")}
            className="max-w-xs"
          >
            <option value="letter">Letter</option>
            <option value="flat">Large envelope (flat)</option>
          </SelectInput>
        </Field>
      </CalcForm>

      {result.price != null ? (
        <ResultCard
          value={money(result.price)}
          unit="guide rate"
          breakdown={`Domestic US ${mailType === "letter" ? "letter" : "flat"} — confirm at usps.com.`}
        />
      ) : (
        <ResultCard
          value="—"
          unit="guide rate"
          breakdown={result.note ?? undefined}
        />
      )}
    </div>
  );
}
