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

export function TileCalculator() {
  const [roomLength, setRoomLength] = useState("8");
  const [roomWidth, setRoomWidth] = useState("10");
  const [tileSize, setTileSize] = useState("12");
  const [grout, setGrout] = useState("0.125");

  const lengthBad = !isPositive(roomLength);
  const widthBad = !isPositive(roomWidth);
  const tileBad = !isPositive(tileSize);
  const groutBad = !isNonNegative(grout);
  const anyBad = lengthBad || widthBad || tileBad || groutBad;

  const result = useMemo(() => {
    if (anyBad) return null;
    const pitch = Number(tileSize) + Number(grout);
    const alongL = Math.ceil((Number(roomLength) * 12) / pitch);
    const alongW = Math.ceil((Number(roomWidth) * 12) / pitch);
    const tiles = alongL * alongW;
    return {
      tiles,
      withWaste: Math.ceil(tiles * 1.1),
      alongL,
      alongW,
    };
  }, [anyBad, roomLength, roomWidth, tileSize, grout]);

  return (
    <div className="space-y-5">
      <CalcForm>
        <Field
          label="Room length"
          htmlFor="tile-room-l"
          error={lengthBad ? ERR_GT_ZERO : null}
        >
          <UnitInput
            id="tile-room-l"
            value={roomLength}
            onChange={setRoomLength}
            unit="ft"
            invalid={lengthBad}
            min={0}
          />
        </Field>
        <Field
          label="Room width"
          htmlFor="tile-room-w"
          error={widthBad ? ERR_GT_ZERO : null}
        >
          <UnitInput
            id="tile-room-w"
            value={roomWidth}
            onChange={setRoomWidth}
            unit="ft"
            invalid={widthBad}
            min={0}
          />
        </Field>
        <Field
          label="Tile size"
          htmlFor="tile-size"
          error={tileBad ? ERR_GT_ZERO : null}
        >
          <UnitInput
            id="tile-size"
            value={tileSize}
            onChange={setTileSize}
            unit="in"
            invalid={tileBad}
            min={0}
          />
        </Field>
        <Field
          label="Grout gap"
          htmlFor="tile-grout"
          hint="1/8 inch is 0.125"
          error={groutBad ? ERR_GT_ZERO : null}
        >
          <UnitInput
            id="tile-grout"
            value={grout}
            onChange={setGrout}
            unit="in"
            invalid={groutBad}
            min={0}
          />
        </Field>
      </CalcForm>

      {result ? (
        <ResultCard
          value={String(result.withWaste)}
          unit="tiles"
          breakdown={`${result.tiles} exact (${result.alongL} × ${result.alongW}), plus 10% waste`}
        />
      ) : (
        <ResultCard value="—" unit="tiles" />
      )}
    </div>
  );
}
