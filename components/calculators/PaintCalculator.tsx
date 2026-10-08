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

export function PaintCalculator() {
  const [wallLength, setWallLength] = useState("12");
  const [wallHeight, setWallHeight] = useState("8");
  const [coats, setCoats] = useState("2");
  const [coverage, setCoverage] = useState("350");
  const [doorArea, setDoorArea] = useState("20");
  const [windowArea, setWindowArea] = useState("15");

  const lengthBad = !isPositive(wallLength);
  const heightBad = !isPositive(wallHeight);
  const coatsBad = !isPositive(coats);
  const coverageBad = !isPositive(coverage);
  const doorsBad = !isNonNegative(doorArea);
  const windowsBad = !isNonNegative(windowArea);
  const anyBad =
    lengthBad || heightBad || coatsBad || coverageBad || doorsBad || windowsBad;

  const { gallons, buy } = useMemo(() => {
    if (anyBad) {
      return { gallons: null as number | null, buy: null as number | null };
    }
    const paintable = Math.max(
      0,
      Number(wallLength) * Number(wallHeight) -
        Number(doorArea) -
        Number(windowArea)
    );
    const gals = (paintable * Number(coats)) / Number(coverage);
    return { gallons: gals, buy: Math.max(1, Math.ceil(gals)) };
  }, [
    anyBad,
    wallLength,
    wallHeight,
    coats,
    coverage,
    doorArea,
    windowArea,
  ]);

  return (
    <div className="space-y-4">
      <CalcForm>
        <Field
          label="Wall length"
          htmlFor="paint-length"
          error={lengthBad ? ERR_GT_ZERO : null}
        >
          <UnitInput
            id="paint-length"
            value={wallLength}
            onChange={setWallLength}
            unit="ft"
            invalid={lengthBad}
            min={0}
          />
        </Field>
        <Field
          label="Wall height"
          htmlFor="paint-height"
          error={heightBad ? ERR_GT_ZERO : null}
        >
          <UnitInput
            id="paint-height"
            value={wallHeight}
            onChange={setWallHeight}
            unit="ft"
            invalid={heightBad}
            min={0}
          />
        </Field>
        <Field
          label="Number of coats"
          htmlFor="paint-coats"
          error={coatsBad ? ERR_GT_ZERO : null}
        >
          <UnitInput
            id="paint-coats"
            value={coats}
            onChange={setCoats}
            unit=""
            invalid={coatsBad}
            min={1}
            step={1}
            inputMode="numeric"
          />
        </Field>
        <Field
          label="Coverage per gallon"
          htmlFor="paint-coverage"
          hint="From the paint can; 350 is typical."
          error={coverageBad ? ERR_GT_ZERO : null}
        >
          <UnitInput
            id="paint-coverage"
            value={coverage}
            onChange={setCoverage}
            unit="sq ft"
            invalid={coverageBad}
            min={1}
          />
        </Field>
        <Field
          label="Door area to subtract"
          htmlFor="paint-doors"
          hint="A standard door is about 20 sq ft."
          error={doorsBad ? ERR_GT_ZERO : null}
        >
          <UnitInput
            id="paint-doors"
            value={doorArea}
            onChange={setDoorArea}
            unit="sq ft"
            invalid={doorsBad}
            min={0}
          />
        </Field>
        <Field
          label="Window area to subtract"
          htmlFor="paint-windows"
          error={windowsBad ? ERR_GT_ZERO : null}
        >
          <UnitInput
            id="paint-windows"
            value={windowArea}
            onChange={setWindowArea}
            unit="sq ft"
            invalid={windowsBad}
            min={0}
          />
        </Field>
      </CalcForm>

      {gallons != null ? (
        <ResultCard
          value={gallons.toFixed(2)}
          unit="gallons"
          breakdown={`Buy ${buy} gallon${buy === 1 ? "" : "s"}.`}
        />
      ) : (
        <ResultCard value="—" unit="gallons" />
      )}
    </div>
  );
}
