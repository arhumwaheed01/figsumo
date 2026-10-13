/** Lightweight scientific expression evaluator (no npm math package). */

export type AngleMode = "deg" | "rad";

export type EvalContext = {
  mode: AngleMode;
  ans: number;
};

function toRad(x: number, mode: AngleMode): number {
  return mode === "deg" ? (x * Math.PI) / 180 : x;
}

function fromRad(x: number, mode: AngleMode): number {
  return mode === "deg" ? (x * 180) / Math.PI : x;
}

export function factorial(n: number): number {
  if (!Number.isInteger(n) || n < 0 || n > 170) return NaN;
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

type Tok =
  | { t: "num"; v: number }
  | { t: "op"; v: string }
  | { t: "fn"; v: string }
  | { t: "lp" }
  | { t: "rp" };

const FNS = new Set([
  "sin",
  "cos",
  "tan",
  "asin",
  "acos",
  "atan",
  "ln",
  "log",
  "sqrt",
  "cbrt",
]);

function needsTimes(a: Tok, b: Tok): boolean {
  const left = a.t === "num" || a.t === "rp";
  const right = b.t === "num" || b.t === "lp" || b.t === "fn";
  return left && right;
}

function tokenize(input: string, ctx: EvalContext): Tok[] {
  let s = input
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/−/g, "-")
    .replace(/π/g, `(${Math.PI})`)
    .replace(/\bAns\b/g, `(${ctx.ans})`)
    .replace(/\be\b/g, `(${Math.E})`)
    .replace(/(\d+(?:\.\d+)?)E([+-]?\d+)/gi, "($1*10^($2))")
    .replace(/(\d+(?:\.\d+)?)%/g, "($1/100)");

  const raw: Tok[] = [];
  let i = 0;

  while (i < s.length) {
    const c = s[i];
    if (c === " " || c === "\t") {
      i++;
      continue;
    }
    if (c === "(") {
      raw.push({ t: "lp" });
      i++;
      continue;
    }
    if (c === ")") {
      raw.push({ t: "rp" });
      i++;
      continue;
    }
    if ("+-*/^".includes(c)) {
      raw.push({ t: "op", v: c });
      i++;
      continue;
    }
    if (/[0-9.]/.test(c)) {
      let j = i + 1;
      while (j < s.length && /[0-9.]/.test(s[j])) j++;
      const n = Number(s.slice(i, j));
      if (!Number.isFinite(n)) throw new Error("bad number");
      raw.push({ t: "num", v: n });
      i = j;
      continue;
    }
    if (/[A-Za-z]/.test(c)) {
      let j = i + 1;
      while (j < s.length && /[A-Za-z]/.test(s[j])) j++;
      const name = s.slice(i, j).toLowerCase();
      if (!FNS.has(name)) throw new Error(`unknown ${name}`);
      raw.push({ t: "fn", v: name });
      i = j;
      continue;
    }
    throw new Error("bad character");
  }

  const tokens: Tok[] = [];
  for (let k = 0; k < raw.length; k++) {
    if (k > 0 && needsTimes(raw[k - 1], raw[k])) {
      tokens.push({ t: "op", v: "*" });
    }
    tokens.push(raw[k]);
  }
  return tokens;
}

class Parser {
  private i = 0;

  constructor(
    private tokens: Tok[],
    private ctx: EvalContext
  ) {}

  private peek(): Tok | undefined {
    return this.tokens[this.i];
  }

  private take(): Tok {
    const t = this.tokens[this.i++];
    if (!t) throw new Error("unexpected end");
    return t;
  }

  parse(): number {
    const v = this.expr();
    if (this.peek()) throw new Error("trailing input");
    return v;
  }

  private expr(): number {
    let v = this.term();
    for (;;) {
      const t = this.peek();
      if (t?.t !== "op" || (t.v !== "+" && t.v !== "-")) break;
      this.take();
      const r = this.term();
      v = t.v === "+" ? v + r : v - r;
    }
    return v;
  }

  private term(): number {
    let v = this.power();
    for (;;) {
      const t = this.peek();
      if (t?.t !== "op" || (t.v !== "*" && t.v !== "/")) break;
      this.take();
      const r = this.power();
      v = t.v === "*" ? v * r : v / r;
    }
    return v;
  }

  private power(): number {
    const v = this.unary();
    const t = this.peek();
    if (t?.t === "op" && t.v === "^") {
      this.take();
      return Math.pow(v, this.power());
    }
    return v;
  }

  private unary(): number {
    const t = this.peek();
    if (t?.t === "op" && t.v === "+") {
      this.take();
      return this.unary();
    }
    if (t?.t === "op" && t.v === "-") {
      this.take();
      return -this.unary();
    }
    return this.primary();
  }

  private primary(): number {
    const t = this.peek();
    if (!t) throw new Error("expected value");

    if (t.t === "num") {
      this.take();
      return t.v;
    }

    if (t.t === "fn") {
      this.take();
      if (this.peek()?.t !== "lp") throw new Error("expected (");
      this.take();
      const arg = this.expr();
      if (this.peek()?.t !== "rp") throw new Error("expected )");
      this.take();
      return this.call(t.v, arg);
    }

    if (t.t === "lp") {
      this.take();
      const v = this.expr();
      if (this.peek()?.t !== "rp") throw new Error("expected )");
      this.take();
      return v;
    }

    throw new Error("expected value");
  }

  private call(name: string, x: number): number {
    const { mode } = this.ctx;
    switch (name) {
      case "sin":
        return Math.sin(toRad(x, mode));
      case "cos":
        return Math.cos(toRad(x, mode));
      case "tan":
        return Math.tan(toRad(x, mode));
      case "asin":
        return fromRad(Math.asin(x), mode);
      case "acos":
        return fromRad(Math.acos(x), mode);
      case "atan":
        return fromRad(Math.atan(x), mode);
      case "ln":
        return Math.log(x);
      case "log":
        return Math.log10(x);
      case "sqrt":
        return Math.sqrt(x);
      case "cbrt":
        return Math.cbrt(x);
      default:
        return NaN;
    }
  }
}

export function evaluateExpression(input: string, ctx: EvalContext): number {
  const trimmed = input.trim();
  if (!trimmed || trimmed === "Error") return NaN;
  const tokens = tokenize(trimmed, ctx);
  if (tokens.length === 0) return NaN;
  const value = new Parser(tokens, ctx).parse();
  if (!Number.isFinite(value)) return NaN;
  return value;
}

export function formatNumber(n: number): string {
  if (!Number.isFinite(n)) return "Error";
  const cleaned = Math.abs(n) < 1e-12 ? 0 : n;
  if (Object.is(cleaned, -0)) return "0";

  if (Math.abs(cleaned) >= 1e12 || (Math.abs(cleaned) > 0 && Math.abs(cleaned) < 1e-9)) {
    return cleaned.toExponential(10).replace(/\.?0+e/, "e");
  }

  // Trim float noise: 0.30000000000000004 → 0.3
  const fixed = Number(cleaned.toPrecision(12));
  return String(fixed);
}
