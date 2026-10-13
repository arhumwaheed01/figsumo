"use client";

import { useEffect, useRef, useState } from "react";
import {
  evaluateExpression,
  factorial,
  formatNumber,
  type AngleMode,
} from "@/lib/sci-eval";

type Tone = "num" | "fn";

type Key =
  | { kind: "text"; label: string; insert: string; tone?: Tone }
  | { kind: "act"; label: string; act: string; tone?: Tone }
  | { kind: "mode" };

const ROWS: Key[][] = [
  [
    { kind: "text", label: "sin", insert: "sin(" },
    { kind: "text", label: "cos", insert: "cos(" },
    { kind: "text", label: "tan", insert: "tan(" },
    { kind: "mode" },
    { kind: "text", label: "7", insert: "7", tone: "num" },
    { kind: "text", label: "8", insert: "8", tone: "num" },
    { kind: "text", label: "9", insert: "9", tone: "num" },
    { kind: "text", label: "+", insert: "+" },
    { kind: "act", label: "Back", act: "back" },
  ],
  [
    { kind: "text", label: "sin⁻¹", insert: "asin(" },
    { kind: "text", label: "cos⁻¹", insert: "acos(" },
    { kind: "text", label: "tan⁻¹", insert: "atan(" },
    { kind: "text", label: "π", insert: "π" },
    { kind: "text", label: "e", insert: "e" },
    { kind: "text", label: "4", insert: "4", tone: "num" },
    { kind: "text", label: "5", insert: "5", tone: "num" },
    { kind: "text", label: "6", insert: "6", tone: "num" },
    { kind: "text", label: "−", insert: "-" },
    { kind: "act", label: "Ans", act: "ans" },
  ],
  [
    { kind: "text", label: "xʸ", insert: "^" },
    { kind: "act", label: "x³", act: "cube" },
    { kind: "act", label: "x²", act: "square" },
    { kind: "act", label: "eˣ", act: "exp" },
    { kind: "act", label: "10ˣ", act: "ten" },
    { kind: "text", label: "1", insert: "1", tone: "num" },
    { kind: "text", label: "2", insert: "2", tone: "num" },
    { kind: "text", label: "3", insert: "3", tone: "num" },
    { kind: "text", label: "×", insert: "×" },
    { kind: "act", label: "M+", act: "mplus" },
  ],
  [
    { kind: "text", label: "ʸ√x", insert: "^(1/" },
    { kind: "act", label: "³√x", act: "cbrt" },
    { kind: "act", label: "√x", act: "sqrt" },
    { kind: "text", label: "ln", insert: "ln(" },
    { kind: "text", label: "log", insert: "log(" },
    { kind: "text", label: "0", insert: "0", tone: "num" },
    { kind: "text", label: ".", insert: ".", tone: "num" },
    { kind: "text", label: "EXP", insert: "E", tone: "num" },
    { kind: "text", label: "/", insert: "/" },
    { kind: "act", label: "M−", act: "mminus" },
  ],
  [
    { kind: "text", label: "(", insert: "(" },
    { kind: "text", label: ")", insert: ")" },
    { kind: "act", label: "1/x", act: "inv" },
    { kind: "text", label: "%", insert: "%" },
    { kind: "act", label: "n!", act: "fact" },
    { kind: "act", label: "±", act: "neg", tone: "num" },
    { kind: "act", label: "RND", act: "rnd", tone: "num" },
    { kind: "act", label: "AC", act: "ac", tone: "num" },
    { kind: "act", label: "=", act: "eq", tone: "num" },
    { kind: "act", label: "MR", act: "mr" },
  ],
];

function btnClass(tone: Tone = "fn", emphasize?: "eq" | "ac") {
  const base =
    "flex h-12 items-center justify-center rounded-lg border text-[13px] font-semibold tracking-tight text-ink transition-colors active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand sm:h-14 sm:text-sm";
  if (emphasize === "eq") {
    return `${base} border-brand bg-brand text-paper hover:bg-brand/90`;
  }
  if (emphasize === "ac") {
    return `${base} border-ink/20 bg-ink/[0.08] hover:bg-ink/15`;
  }
  if (tone === "num") {
    return `${base} border-brand/25 bg-brand/[0.08] hover:bg-brand hover:text-paper`;
  }
  return `${base} border-ink/15 bg-paper hover:bg-brand hover:text-paper`;
}

export function ScientificCalculator() {
  const [expr, setExpr] = useState("");
  const [mode, setMode] = useState<AngleMode>("deg");
  const [ans, setAns] = useState(0);
  const [memory, setMemory] = useState(0);
  const [fresh, setFresh] = useState(true);

  const ref = useRef({ expr, mode, ans, memory, fresh });
  ref.current = { expr, mode, ans, memory, fresh };

  const display = expr === "" ? "0" : expr;

  function readValue(source: string): number {
    const { mode: m, ans: a } = ref.current;
    return evaluateExpression(source === "" || source === "Error" ? "0" : source, {
      mode: m,
      ans: a,
    });
  }

  function setResult(n: number) {
    const text = formatNumber(n);
    setExpr(text);
    setFresh(true);
    if (Number.isFinite(n)) setAns(n);
  }

  function insert(chunk: string) {
    const { fresh: isFresh, expr: cur } = ref.current;
    if (isFresh || cur === "Error") setExpr(chunk);
    else setExpr(cur + chunk);
    setFresh(false);
  }

  function apply(fn: (n: number) => number) {
    try {
      setResult(fn(readValue(ref.current.expr)));
    } catch {
      setExpr("Error");
      setFresh(true);
    }
  }

  function equals() {
    try {
      const { expr: cur } = ref.current;
      if (!cur || cur === "Error") return;
      setResult(readValue(cur));
    } catch {
      setExpr("Error");
      setFresh(true);
    }
  }

  function clear() {
    setExpr("");
    setFresh(true);
  }

  function back() {
    const { fresh: isFresh, expr: cur } = ref.current;
    if (isFresh || cur === "Error") {
      clear();
      return;
    }
    setExpr(cur.slice(0, -1));
  }

  function run(act: string) {
    switch (act) {
      case "back":
        back();
        break;
      case "ac":
        clear();
        break;
      case "eq":
        equals();
        break;
      case "ans":
        insert(formatNumber(ref.current.ans));
        break;
      case "square":
        apply((n) => n * n);
        break;
      case "cube":
        apply((n) => n * n * n);
        break;
      case "exp":
        apply((n) => Math.exp(n));
        break;
      case "ten":
        apply((n) => 10 ** n);
        break;
      case "sqrt":
        apply((n) => Math.sqrt(n));
        break;
      case "cbrt":
        apply((n) => Math.cbrt(n));
        break;
      case "inv":
        apply((n) => 1 / n);
        break;
      case "fact":
        apply((n) => factorial(n));
        break;
      case "neg":
        apply((n) => -n);
        break;
      case "rnd":
        setResult(Math.random());
        break;
      case "mplus":
        try {
          const n = readValue(ref.current.expr);
          if (Number.isFinite(n)) setMemory((m) => m + n);
        } catch {
          /* ignore */
        }
        break;
      case "mminus":
        try {
          const n = readValue(ref.current.expr);
          if (Number.isFinite(n)) setMemory((m) => m - n);
        } catch {
          /* ignore */
        }
        break;
      case "mr":
        insert(formatNumber(ref.current.memory));
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const el = e.target as HTMLElement | null;
      if (
        el &&
        (el.tagName === "INPUT" || el.tagName === "TEXTAREA") &&
        el.id !== "sci-display"
      ) {
        return;
      }

      if (e.key >= "0" && e.key <= "9") {
        e.preventDefault();
        insert(e.key);
        return;
      }

      const actions: Record<string, () => void> = {
        ".": () => insert("."),
        "+": () => insert("+"),
        "-": () => insert("-"),
        "/": () => insert("/"),
        "*": () => insert("×"),
        Enter: () => equals(),
        "=": () => equals(),
        Escape: () => clear(),
        Backspace: () => back(),
        "(": () => insert("("),
        ")": () => insert(")"),
        "^": () => insert("^"),
      };

      const fn = actions[e.key];
      if (fn) {
        e.preventDefault();
        fn();
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="w-full overflow-hidden rounded-2xl border-2 border-ink/20 bg-paper shadow-[0_12px_40px_-12px_rgba(16,16,16,0.18)]">
      <div className="h-1.5 bg-brand" aria-hidden="true" />
      <div className="border-b border-ink/10 bg-ink/[0.03] px-5 py-6 sm:px-7 sm:py-8">
        <label htmlFor="sci-display" className="sr-only">
          Calculator display
        </label>
        <input
          id="sci-display"
          readOnly
          value={display}
          className="w-full bg-transparent text-right text-4xl font-bold tracking-tight text-ink tabular-nums outline-none sm:text-5xl"
        />
        <p className="mt-2 h-5 truncate text-right text-sm font-medium text-ink/45">
          {memory !== 0 ? `M ${formatNumber(memory)}` : "\u00a0"}
        </p>
      </div>

      <div className="grid gap-2 bg-ink/[0.02] p-3 sm:gap-2.5 sm:p-4">
        {ROWS.map((row, ri) => (
          <div
            key={ri}
            className="grid grid-cols-5 gap-2 sm:grid-cols-10 sm:gap-2.5"
          >
            {row.map((key, ki) => {
              if (key.kind === "mode") {
                return (
                  <div
                    key={`${ri}-${ki}`}
                    className="col-span-2 flex items-center justify-center gap-4 rounded-lg border border-ink/15 bg-paper px-2 text-sm font-semibold text-ink"
                  >
                    <label className="inline-flex cursor-pointer items-center gap-1.5">
                      <input
                        type="radio"
                        name="angle-mode"
                        checked={mode === "deg"}
                        onChange={() => setMode("deg")}
                        className="accent-brand"
                      />
                      Deg
                    </label>
                    <label className="inline-flex cursor-pointer items-center gap-1.5">
                      <input
                        type="radio"
                        name="angle-mode"
                        checked={mode === "rad"}
                        onChange={() => setMode("rad")}
                        className="accent-brand"
                      />
                      Rad
                    </label>
                  </div>
                );
              }

              const emphasize =
                key.kind === "act" && key.act === "eq"
                  ? "eq"
                  : key.kind === "act" && key.act === "ac"
                    ? "ac"
                    : undefined;

              if (key.kind === "text") {
                return (
                  <button
                    key={`${ri}-${ki}`}
                    type="button"
                    className={btnClass(key.tone)}
                    onClick={() => insert(key.insert)}
                  >
                    {key.label}
                  </button>
                );
              }

              return (
                <button
                  key={`${ri}-${ki}`}
                  type="button"
                  className={btnClass(key.tone, emphasize)}
                  onClick={() => run(key.act)}
                >
                  {key.label}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
