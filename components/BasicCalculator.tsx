"use client";

import { useCallback, useEffect, useState } from "react";

type Op = "+" | "-" | "*" | "/";

function formatDisplay(n: number): string {
  if (!Number.isFinite(n)) return "Error";
  const rounded = Math.round(n * 1e10) / 1e10;
  const s = String(rounded);
  return s.length > 14 ? rounded.toPrecision(10) : s;
}

function compute(a: number, b: number, op: Op): number {
  if (op === "+") return a + b;
  if (op === "-") return a - b;
  if (op === "*") return a * b;
  return b === 0 ? NaN : a / b;
}

export function BasicCalculator() {
  const [display, setDisplay] = useState("0");
  const [acc, setAcc] = useState<number | null>(null);
  const [pendingOp, setPendingOp] = useState<Op | null>(null);
  const [overwrite, setOverwrite] = useState(true);

  const clear = useCallback(() => {
    setDisplay("0");
    setAcc(null);
    setPendingOp(null);
    setOverwrite(true);
  }, []);

  const inputDigit = useCallback(
    (d: string) => {
      setDisplay((prev) => {
        if (overwrite || prev === "Error") return d;
        if (prev === "0") return d;
        if (prev.replace("-", "").replace(".", "").length >= 12) return prev;
        return prev + d;
      });
      setOverwrite(false);
    },
    [overwrite]
  );

  const inputDot = useCallback(() => {
    setDisplay((prev) => {
      if (overwrite || prev === "Error") return "0.";
      if (prev.includes(".")) return prev;
      return prev + ".";
    });
    setOverwrite(false);
  }, [overwrite]);

  const chooseOp = useCallback(
    (next: Op) => {
      const cur = Number(display);
      if (display === "Error" || !Number.isFinite(cur)) {
        clear();
        setPendingOp(next);
        return;
      }
      if (acc !== null && pendingOp !== null && !overwrite) {
        const result = compute(acc, cur, pendingOp);
        setDisplay(formatDisplay(result));
        setAcc(Number.isFinite(result) ? result : null);
      } else {
        setAcc(cur);
      }
      setPendingOp(next);
      setOverwrite(true);
    },
    [acc, clear, display, overwrite, pendingOp]
  );

  const equals = useCallback(() => {
    if (acc === null || pendingOp === null || display === "Error") return;
    const cur = Number(display);
    const result = compute(acc, cur, pendingOp);
    setDisplay(formatDisplay(result));
    setAcc(null);
    setPendingOp(null);
    setOverwrite(true);
  }, [acc, display, pendingOp]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement | null;
      if (
        t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.tagName === "SELECT") &&
        t.id !== "basic-calc-display"
      ) {
        return;
      }

      if (e.key >= "0" && e.key <= "9") {
        e.preventDefault();
        inputDigit(e.key);
      } else if (e.key === ".") {
        e.preventDefault();
        inputDot();
      } else if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
        e.preventDefault();
        chooseOp(e.key);
      } else if (e.key === "Enter" || e.key === "=") {
        e.preventDefault();
        equals();
      } else if (e.key === "Escape" || e.key === "Delete") {
        e.preventDefault();
        clear();
      } else if (e.key === "Backspace") {
        e.preventDefault();
        if (overwrite) return;
        setDisplay((prev) => {
          if (prev.length <= 1 || prev === "Error") return "0";
          return prev.slice(0, -1);
        });
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [chooseOp, clear, equals, inputDigit, inputDot, overwrite]);

  const btn =
    "h-12 rounded border border-[#e4e4e7] bg-white text-base font-medium text-[#18181b] hover:bg-[#f4f4f5]";
  const btnOp =
    "h-12 rounded border border-[#e4e4e7] bg-[#f4f4f5] text-base font-medium text-[#18181b] hover:bg-[#e4e4e7]";

  return (
    <div className="border border-[#e4e4e7] bg-white p-3">
      <label htmlFor="basic-calc-display" className="sr-only">
        Calculator display
      </label>
      <input
        id="basic-calc-display"
        readOnly
        value={display}
        className="mb-3 h-14 w-full rounded border border-[#e4e4e7] bg-[#f4f4f5] px-3 text-right text-2xl font-semibold tabular-nums text-[#18181b] outline-none"
      />
      <div className="grid grid-cols-4 gap-2">
        <button type="button" className={`${btnOp} col-span-2`} onClick={clear}>
          Clear
        </button>
        <button type="button" className={btnOp} onClick={() => chooseOp("/")}>
          ÷
        </button>
        <button type="button" className={btnOp} onClick={() => chooseOp("*")}>
          ×
        </button>

        {["7", "8", "9"].map((d) => (
          <button key={d} type="button" className={btn} onClick={() => inputDigit(d)}>
            {d}
          </button>
        ))}
        <button type="button" className={btnOp} onClick={() => chooseOp("-")}>
          −
        </button>

        {["4", "5", "6"].map((d) => (
          <button key={d} type="button" className={btn} onClick={() => inputDigit(d)}>
            {d}
          </button>
        ))}
        <button type="button" className={btnOp} onClick={() => chooseOp("+")}>
          +
        </button>

        {["1", "2", "3"].map((d) => (
          <button key={d} type="button" className={btn} onClick={() => inputDigit(d)}>
            {d}
          </button>
        ))}
        <button
          type="button"
          className={`${btnOp} row-span-2 h-auto min-h-[6.5rem]`}
          onClick={equals}
        >
          =
        </button>

        <button
          type="button"
          className={`${btn} col-span-2`}
          onClick={() => inputDigit("0")}
        >
          0
        </button>
        <button type="button" className={btn} onClick={inputDot}>
          .
        </button>
      </div>
    </div>
  );
}
