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

function money(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

export function OvertimeCalculator() {
  const [rate, setRate] = useState("20");
  const [regularHours, setRegularHours] = useState("40");
  const [otHours, setOtHours] = useState("5");
  const [multiplier, setMultiplier] = useState("1.5");

  const rateBad = !isNonNegative(rate);
  const regularBad = !isNonNegative(regularHours);
  const otBad = !isNonNegative(otHours);
  const multBad = !isPositive(multiplier);
  const anyBad = rateBad || regularBad || otBad || multBad;

  const pay = useMemo(() => {
    if (anyBad) return null;
    const regularPay = Number(rate) * Number(regularHours);
    const otPay = Number(rate) * Number(otHours) * Number(multiplier);
    return { regularPay, otPay, total: regularPay + otPay };
  }, [anyBad, rate, regularHours, otHours, multiplier]);

  return (
    <div className="space-y-5">
      <CalcForm>
        <Field
          label="Hourly rate"
          htmlFor="ot-rate"
          error={rateBad ? ERR_GT_ZERO : null}
        >
          <UnitInput
            id="ot-rate"
            value={rate}
            onChange={setRate}
            unit="$/hr"
            invalid={rateBad}
            min={0}
            step="0.01"
          />
        </Field>
        <Field
          label="Regular hours"
          htmlFor="ot-regular"
          error={regularBad ? ERR_GT_ZERO : null}
        >
          <UnitInput
            id="ot-regular"
            value={regularHours}
            onChange={setRegularHours}
            unit="hrs"
            invalid={regularBad}
            min={0}
          />
        </Field>
        <Field
          label="Overtime hours"
          htmlFor="ot-hours"
          error={otBad ? ERR_GT_ZERO : null}
        >
          <UnitInput
            id="ot-hours"
            value={otHours}
            onChange={setOtHours}
            unit="hrs"
            invalid={otBad}
            min={0}
          />
        </Field>
        <Field
          label="Overtime multiplier"
          htmlFor="ot-mult"
          hint="US time-and-a-half is 1.5"
          error={multBad ? ERR_GT_ZERO : null}
        >
          <UnitInput
            id="ot-mult"
            value={multiplier}
            onChange={setMultiplier}
            unit="×"
            invalid={multBad}
            min={0}
            step="0.1"
          />
        </Field>
      </CalcForm>

      {pay ? (
        <ResultCard
          value={money(pay.total)}
          unit="total pay"
          breakdown={`Regular ${money(pay.regularPay)} · Overtime ${money(pay.otPay)} · estimate only`}
        />
      ) : (
        <ResultCard value="—" unit="total pay" />
      )}
    </div>
  );
}
