"use client";

import { useMemo, useState } from "react";
import {
  CalcForm,
  ERR_GT_ZERO,
  Field,
  ResultCard,
  UnitInput,
  UnitToggle,
  isPositive,
} from "@/components/ui/Field";

type Unit = "ft" | "in";

function toFeet(value: number, unit: Unit): number {
  return unit === "in" ? value / 12 : value;
}

export function ConcreteCalculator() {
  const [length, setLength] = useState("10");
  const [width, setWidth] = useState("10");
  const [depth, setDepth] = useState("4");
  const [depthUnit, setDepthUnit] = useState<Unit>("in");

  const lengthBad = !isPositive(length);
  const widthBad = !isPositive(width);
  const depthBad = !isPositive(depth);
  const anyBad = lengthBad || widthBad || depthBad;

  const { cubicYards, bags } = useMemo(() => {
    if (anyBad) {
      return { cubicYards: null as number | null, bags: null as number | null };
    }
    const cuFt =
      Number(length) * Number(width) * toFeet(Number(depth), depthUnit);
    const yd = cuFt / 27;
    return { cubicYards: yd, bags: Math.ceil(yd * 45) };
  }, [anyBad, length, width, depth, depthUnit]);

  return (
    <div className="space-y-4">
      <CalcForm>
        <Field
          label="Length"
          htmlFor="concrete-length"
          error={lengthBad ? ERR_GT_ZERO : null}
        >
          <UnitInput
            id="concrete-length"
            value={length}
            onChange={setLength}
            unit="ft"
            invalid={lengthBad}
            min={0}
          />
        </Field>
        <Field
          label="Width"
          htmlFor="concrete-width"
          error={widthBad ? ERR_GT_ZERO : null}
        >
          <UnitInput
            id="concrete-width"
            value={width}
            onChange={setWidth}
            unit="ft"
            invalid={widthBad}
            min={0}
          />
        </Field>
        <Field
          label="Depth"
          htmlFor="concrete-depth"
          hint="Slabs are often measured in inches."
          error={depthBad ? ERR_GT_ZERO : null}
        >
          <div className="flex flex-wrap items-center gap-2">
            <UnitInput
              id="concrete-depth"
              value={depth}
              onChange={setDepth}
              unit=""
              invalid={depthBad}
              min={0}
            />
            <UnitToggle
              value={depthUnit}
              onChange={setDepthUnit}
              label="Depth unit"
            />
          </div>
        </Field>
      </CalcForm>

      {cubicYards != null ? (
        <ResultCard
          value={cubicYards.toFixed(2)}
          unit="cubic yards"
          breakdown={`About ${bags} bags of 80 lb mix.`}
        />
      ) : (
        <ResultCard value="—" unit="cubic yards" />
      )}
    </div>
  );
}
