import type { CalcResult, FieldDef } from "@/components/calc/FormulaCalculator";
import type { CalcSuccess } from "@/lib/calc/result-types";
import { fmt, fmtMoney, fmtPct, parseNum, round } from "@/lib/calc/format";

const BRAND = "#2563EB";
const INK = "#101010";

function ok(
  rows: { label: string; value: string; emphasize?: boolean }[],
  extra?: Omit<CalcSuccess, "rows">,
): CalcResult {
  return { rows, ...extra };
}

export type CalcDef = {
  slug: string;
  fields: FieldDef[];
  compute: (values: Record<string, string>) => CalcResult;
};

function err(message: string): CalcResult {
  return { error: message };
}

function parseIsoDate(s: string): Date | null {
  const m = s.trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return null;
  const d = new Date(`${m[1]}-${m[2]}-${m[3]}T12:00:00`);
  return Number.isNaN(d.getTime()) ? null : d;
}

function diffCalendarParts(from: Date, to: Date) {
  let years = to.getFullYear() - from.getFullYear();
  let months = to.getMonth() - from.getMonth();
  let days = to.getDate() - from.getDate();
  if (days < 0) {
    months -= 1;
    const prev = new Date(to.getFullYear(), to.getMonth(), 0);
    days += prev.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  const ms = to.getTime() - from.getTime();
  const totalDays = Math.floor(ms / 86400000);
  return { years, months, days, totalDays };
}

function parseIpv4(ip: string): number | null {
  const parts = ip.trim().split(".");
  if (parts.length !== 4) return null;
  let n = 0;
  for (const p of parts) {
    const v = Number(p);
    if (!Number.isInteger(v) || v < 0 || v > 255) return null;
    n = (n << 8) + v;
  }
  return n >>> 0;
}

function formatIpv4(n: number): string {
  return [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join(".");
}

function subnetInfo(ipNum: number, prefix: number) {
  const mask = prefix === 0 ? 0 : ((0xffffffff << (32 - prefix)) >>> 0);
  const network = (ipNum & mask) >>> 0;
  const broadcast = (network | (~mask >>> 0)) >>> 0;
  const total = 2 ** (32 - prefix);
  const usable = prefix >= 31 ? (prefix === 32 ? 1 : 2) : Math.max(0, total - 2);
  return { mask, network, broadcast, total, usable };
}

function loveScore(nameA: string, nameB: string): number {
  const s = `${nameA.trim().toLowerCase()}${nameB.trim().toLowerCase()}`.replace(/\s+/g, "");
  if (!s) return NaN;
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(h, 33) + s.charCodeAt(i)) >>> 0;
  }
  return (h % 86) + 13;
}

const ROMAN: [string, number][] = [
  ["M", 1000],
  ["CM", 900],
  ["D", 500],
  ["CD", 400],
  ["C", 100],
  ["XC", 90],
  ["L", 50],
  ["XL", 40],
  ["X", 10],
  ["IX", 9],
  ["V", 5],
  ["IV", 4],
  ["I", 1],
];

function intToRoman(n: number): string | null {
  if (!Number.isInteger(n) || n <= 0 || n > 3999) return null;
  let x = n;
  let out = "";
  for (const [sym, val] of ROMAN) {
    while (x >= val) {
      out += sym;
      x -= val;
    }
  }
  return out;
}

function romanToInt(s: string): number | null {
  const t = s.trim().toUpperCase();
  if (!/^[IVXLCDM]+$/.test(t)) return null;
  let i = 0;
  let total = 0;
  while (i < t.length) {
    const two = t.slice(i, i + 2);
    const one = t[i];
    const pair = ROMAN.find(([sym]) => sym === two);
    if (pair) {
      total += pair[1];
      i += 2;
      continue;
    }
    const single = ROMAN.find(([sym]) => sym === one);
    if (!single) return null;
    total += single[1];
    i += 1;
  }
  return total;
}

type UnitMap = Record<string, number>;

const LENGTH_TO_M: UnitMap = {
  m: 1,
  km: 1000,
  cm: 0.01,
  mm: 0.001,
  ft: 0.3048,
  in: 0.0254,
  yd: 0.9144,
  mi: 1609.344,
};

const MASS_TO_KG: UnitMap = {
  kg: 1,
  g: 0.001,
  lb: 0.45359237,
  oz: 0.028349523125,
  t: 1000,
};

function convertLength(value: number, from: string, to: string): number {
  const fm = LENGTH_TO_M[from];
  const tm = LENGTH_TO_M[to];
  if (fm === undefined || tm === undefined) return NaN;
  return (value * fm) / tm;
}

function convertMass(value: number, from: string, to: string): number {
  const fm = MASS_TO_KG[from];
  const tm = MASS_TO_KG[to];
  if (fm === undefined || tm === undefined) return NaN;
  return (value * fm) / tm;
}

function convertTemp(value: number, from: string, to: string): number {
  let c: number;
  if (from === "C") c = value;
  else if (from === "F") c = ((value - 32) * 5) / 9;
  else if (from === "K") c = value - 273.15;
  else return NaN;
  if (to === "C") return c;
  if (to === "F") return (c * 9) / 5 + 32;
  if (to === "K") return c + 273.15;
  return NaN;
}

function genPassword(
  length: number,
  upper: boolean,
  lower: boolean,
  digits: boolean,
  symbols: boolean,
): string | null {
  let pool = "";
  if (upper) pool += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (lower) pool += "abcdefghijklmnopqrstuvwxyz";
  if (digits) pool += "0123456789";
  if (symbols) pool += "!@#$%^&*()-_=+[]{}";
  if (!pool) return null;
  let out = "";
  for (let i = 0; i < length; i++) {
    out += pool[Math.floor(Math.random() * pool.length)];
  }
  return out;
}

function parseTimeHM(s: string): number | null {
  const m = s.trim().match(/^(\d{1,2}):(\d{2})$/);
  if (!m) return null;
  const h = Number(m[1]);
  const min = Number(m[2]);
  if (h < 0 || h > 23 || min < 0 || min > 59) return null;
  return h * 60 + min;
}

function formatHM(totalMin: number): string {
  const norm = ((totalMin % 1440) + 1440) % 1440;
  const h = Math.floor(norm / 60);
  const m = norm % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function utf8ToBase64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
}

function base64ToUtf8(b64: string): string {
  const bin = atob(b64);
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function windChillF(tempF: number, windMph: number): number {
  if (tempF > 50 || windMph < 3) return tempF;
  return (
    35.74 +
    0.6215 * tempF -
    35.75 * windMph ** 0.16 +
    0.4275 * tempF * windMph ** 0.16
  );
}

function heatIndexF(tempF: number, rh: number): number {
  if (tempF < 80) return tempF;
  const c1 = -42.379;
  const c2 = 2.04901523;
  const c3 = 10.14333127;
  const c4 = -0.22475541;
  const c5 = -0.00683783;
  const c6 = -0.05481717;
  const c7 = 0.00122874;
  const c8 = 0.00085282;
  const c9 = -0.00000199;
  return (
    c1 +
    c2 * tempF +
    c3 * rh +
    c4 * tempF * rh +
    c5 * tempF ** 2 +
    c6 * rh ** 2 +
    c7 * tempF ** 2 * rh +
    c8 * tempF * rh ** 2 +
    c9 * tempF ** 2 * rh ** 2
  );
}

function dewPointF(tempF: number, rh: number): number {
  const t = ((tempF - 32) * 5) / 9;
  const a = 17.27;
  const b = 237.7;
  const alpha = (a * t) / (b + t) + Math.log(rh / 100);
  const dpC = (b * alpha) / (a - alpha);
  return (dpC * 9) / 5 + 32;
}

function dayOfWeekName(d: Date): string {
  return d.toLocaleDateString(undefined, { weekday: "long" });
}

function shoeUsToEu(us: number): number {
  return round(3 * us + 22, 0);
}

function shoeEuToUs(eu: number): number {
  return round((eu - 22) / 3, 1);
}

export const otherDefs: CalcDef[] = [
  {
    slug: "age-calculator",
    fields: [
      { name: "birth", label: "Date of birth", type: "date", defaultValue: "1990-06-15" },
      { name: "asOf", label: "Calculate age as of", type: "date", defaultValue: "2026-01-01" },
    ],
    compute(values) {
      const birth = parseIsoDate(values.birth);
      const asOf = parseIsoDate(values.asOf);
      if (!birth || !asOf) return err("Enter valid dates (YYYY-MM-DD).");
      if (asOf < birth) return err("As-of date must be on or after birth date.");
      const parts = diffCalendarParts(birth, asOf);
      return ok(
        [
          { label: "Age", value: `${parts.years} years`, emphasize: true },
          { label: "Years, months, days", value: `${parts.years} y, ${parts.months} mo, ${parts.days} d` },
          { label: "Total days", value: fmt(parts.totalDays, 0) },
        ],
        {
          table: {
            caption: "Age breakdown",
            headers: ["Unit", "Amount"],
            rows: [
              ["Years", String(parts.years)],
              ["Months", String(parts.months)],
              ["Days", String(parts.days)],
              ["Total days", fmt(parts.totalDays, 0)],
            ],
          },
        },
      );
    },
  },
  {
    slug: "date-calculator",
    fields: [
      { name: "start", label: "Start date", type: "date", defaultValue: "2026-01-01" },
      {
        name: "op",
        label: "Operation",
        type: "select",
        options: [
          { value: "add", label: "Add days" },
          { value: "sub", label: "Subtract days" },
        ],
      },
      { name: "days", label: "Days", type: "number", defaultValue: "30", min: 0, step: "1" },
    ],
    compute(values) {
      const start = parseIsoDate(values.start);
      const days = parseNum(values.days);
      if (!start || days < 0 || !Number.isFinite(days)) return err("Enter a valid start date and days.");
      const delta = values.op === "sub" ? -Math.round(days) : Math.round(days);
      const out = new Date(start);
      out.setDate(out.getDate() + delta);
      const iso = out.toISOString().slice(0, 10);
      return {
        rows: [
          { label: "Result date", value: iso, emphasize: true },
          { label: "Day of week", value: dayOfWeekName(out) },
        ],
      };
    },
  },
  {
    slug: "time-calculator",
    fields: [
      { name: "h1", label: "Hours (first)", type: "number", defaultValue: "2", min: 0, step: "1" },
      { name: "m1", label: "Minutes (first)", type: "number", defaultValue: "45", min: 0, max: 59, step: "1" },
      { name: "h2", label: "Hours (second)", type: "number", defaultValue: "1", min: 0, step: "1" },
      { name: "m2", label: "Minutes (second)", type: "number", defaultValue: "30", min: 0, max: 59, step: "1" },
      {
        name: "op",
        label: "Operation",
        type: "select",
        options: [
          { value: "add", label: "Add" },
          { value: "sub", label: "Subtract" },
        ],
      },
    ],
    compute(values) {
      const t1 = parseNum(values.h1) * 60 + parseNum(values.m1);
      const t2 = parseNum(values.h2) * 60 + parseNum(values.m2);
      if (!Number.isFinite(t1) || !Number.isFinite(t2)) return err("Enter valid hours and minutes.");
      const total = values.op === "sub" ? t1 - t2 : t1 + t2;
      const h = Math.floor(Math.abs(total) / 60);
      const m = Math.abs(total) % 60;
      const sign = total < 0 ? "-" : "";
      return {
        rows: [
          { label: "Total time", value: `${sign}${h} h ${m} min`, emphasize: true },
          { label: "Total minutes", value: fmt(total, 0) },
        ],
      };
    },
  },
  {
    slug: "hours-calculator",
    fields: [
      { name: "hours", label: "Hours", type: "number", defaultValue: "8", min: 0, step: "1" },
      { name: "minutes", label: "Minutes", type: "number", defaultValue: "30", min: 0, max: 59, step: "1" },
    ],
    compute(values) {
      const h = parseNum(values.hours);
      const m = parseNum(values.minutes);
      if (h < 0 || m < 0 || m >= 60) return err("Enter valid hours and minutes (0–59).");
      const decimal = h + m / 60;
      return {
        rows: [
          { label: "Decimal hours", value: fmt(decimal, 4), emphasize: true },
          { label: "Total minutes", value: fmt(h * 60 + m, 0) },
        ],
      };
    },
  },
  {
    slug: "gpa-calculator",
    fields: [
      { name: "g1", label: "Course 1 grade (4.0 scale)", type: "number", defaultValue: "3.7", min: 0, max: 4, step: "0.1" },
      { name: "c1", label: "Course 1 credits", type: "number", defaultValue: "3", min: 0, step: "0.5" },
      { name: "g2", label: "Course 2 grade", type: "number", defaultValue: "3.3", min: 0, max: 4, step: "0.1" },
      { name: "c2", label: "Course 2 credits", type: "number", defaultValue: "3", min: 0, step: "0.5" },
      { name: "g3", label: "Course 3 grade", type: "number", defaultValue: "4", min: 0, max: 4, step: "0.1" },
      { name: "c3", label: "Course 3 credits", type: "number", defaultValue: "4", min: 0, step: "0.5" },
    ],
    compute(values) {
      let pts = 0;
      let cr = 0;
      for (let i = 1; i <= 3; i++) {
        const g = parseNum(values[`g${i}`]);
        const c = parseNum(values[`c${i}`]);
        if (c > 0 && g >= 0) {
          pts += g * c;
          cr += c;
        }
      }
      if (cr <= 0) return err("Enter at least one course with credits.");
      const gpa = pts / cr;
      const courseRows: string[][] = [];
      for (let i = 1; i <= 3; i++) {
        const g = parseNum(values[`g${i}`]);
        const c = parseNum(values[`c${i}`]);
        if (c > 0 && g >= 0) {
          courseRows.push([`Course ${i}`, fmt(g, 2), fmt(c, 1), fmt(g * c, 2)]);
        }
      }
      return ok(
        [
          { label: "Term GPA", value: fmt(gpa, 2), emphasize: true },
          { label: "Credit hours", value: fmt(cr, 1) },
        ],
        courseRows.length
          ? {
              table: {
                caption: "Courses entered",
                headers: ["Course", "Grade", "Credits", "Quality pts"],
                rows: courseRows,
              },
            }
          : undefined,
      );
    },
  },
  {
    slug: "grade-calculator",
    fields: [
      { name: "current", label: "Current grade (%)", type: "number", defaultValue: "88", min: 0, max: 100, step: "0.1" },
      { name: "weight", label: "Current weight (%)", type: "number", defaultValue: "70", min: 0, max: 100, step: "1" },
      { name: "exam", label: "Final exam score (%)", type: "number", defaultValue: "92", min: 0, max: 100, step: "0.1" },
      { name: "examWeight", label: "Final exam weight (%)", type: "number", defaultValue: "30", min: 0, max: 100, step: "1" },
    ],
    compute(values) {
      const current = parseNum(values.current);
      const weight = parseNum(values.weight);
      const exam = parseNum(values.exam);
      const examWeight = parseNum(values.examWeight);
      if (weight + examWeight <= 0) return err("Weights must sum to a positive percentage.");
      const totalW = weight + examWeight;
      const finalGrade = (current * weight + exam * examWeight) / totalW;
      return {
        rows: [
          { label: "Weighted course grade", value: fmtPct(finalGrade, 1), emphasize: true },
          { label: "Weight total used", value: fmtPct(totalW, 0) },
        ],
      };
    },
  },
  {
    slug: "height-calculator",
    fields: [
      {
        name: "mode",
        label: "Convert",
        type: "select",
        options: [
          { value: "cmToFt", label: "Centimeters → feet & inches" },
          { value: "ftToCm", label: "Feet & inches → centimeters" },
        ],
      },
      { name: "cm", label: "Height (cm)", type: "number", defaultValue: "175", min: 0, step: "0.1" },
      { name: "feet", label: "Feet", type: "number", defaultValue: "5", min: 0, step: "1" },
      { name: "inches", label: "Inches", type: "number", defaultValue: "9", min: 0, max: 11.99, step: "0.1" },
    ],
    compute(values) {
      if (values.mode === "cmToFt") {
        const cm = parseNum(values.cm);
        if (cm <= 0) return err("Enter height in centimeters.");
        const totalIn = cm / 2.54;
        const ft = Math.floor(totalIn / 12);
        const inch = totalIn - ft * 12;
        return {
          rows: [
            { label: "Feet & inches", value: `${ft} ft ${fmt(inch, 1)} in`, emphasize: true },
            { label: "Total inches", value: fmt(totalIn, 2) },
          ],
        };
      }
      const ft = parseNum(values.feet);
      const inch = parseNum(values.inches);
      if (ft < 0 || inch < 0) return err("Enter valid feet and inches.");
      const cm = (ft * 12 + inch) * 2.54;
      return { rows: [{ label: "Centimeters", value: fmt(cm, 1), emphasize: true }] };
    },
  },
  {
    slug: "concrete-calculator",
    fields: [
      { name: "length", label: "Length (ft)", type: "number", defaultValue: "12", min: 0, step: "0.1" },
      { name: "width", label: "Width (ft)", type: "number", defaultValue: "10", min: 0, step: "0.1" },
      { name: "depth", label: "Depth (in)", type: "number", defaultValue: "4", min: 0, step: "0.25" },
    ],
    compute(values) {
      const l = parseNum(values.length);
      const w = parseNum(values.width);
      const d = parseNum(values.depth);
      if (l <= 0 || w <= 0 || d <= 0) return err("Enter positive dimensions.");
      const cuFt = l * w * (d / 12);
      const yards = cuFt / 27;
      const fullYdFt = Math.floor(yards) * 27;
      const extraFt = cuFt - fullYdFt;
      return ok(
        [
          { label: "Cubic yards", value: fmt(yards, 2), emphasize: true },
          { label: "Cubic feet", value: fmt(cuFt, 2) },
        ],
        {
          breakdown: [
            { label: "Full yd³ (×27 ft³)", value: fullYdFt, color: BRAND },
            { label: "Extra ft³", value: Math.max(0, extraFt), color: INK },
          ],
          note: "Volume = length × width × depth; 1 yd³ = 27 ft³. Order concrete in cubic yards.",
        },
      );
    },
  },
  {
    slug: "ip-subnet-calculator",
    fields: [
      { name: "ip", label: "IPv4 address", type: "text", defaultValue: "192.168.1.10", placeholder: "192.168.1.10" },
      { name: "prefix", label: "CIDR prefix (/n)", type: "number", defaultValue: "24", min: 0, max: 32, step: "1" },
    ],
    compute(values) {
      const ipNum = parseIpv4(values.ip);
      const prefix = Math.round(parseNum(values.prefix));
      if (ipNum === null) return err("Enter a valid IPv4 address.");
      if (prefix < 0 || prefix > 32) return err("Prefix must be between 0 and 32.");
      const info = subnetInfo(ipNum, prefix);
      const firstHost = prefix >= 31 ? info.network : (info.network + 1) >>> 0;
      const lastHost = prefix >= 31 ? info.broadcast : (info.broadcast - 1) >>> 0;
      return {
        rows: [
          { label: "Network address", value: formatIpv4(info.network), emphasize: true },
          { label: "Subnet mask", value: formatIpv4(info.mask) },
          { label: "Broadcast address", value: formatIpv4(info.broadcast) },
          { label: "First host", value: formatIpv4(firstHost) },
          { label: "Last host", value: formatIpv4(lastHost) },
          { label: "Total addresses", value: fmt(info.total, 0) },
          { label: "Usable host addresses", value: fmt(info.usable, 0) },
        ],
      };
    },
  },
  {
    slug: "bra-size-calculator",
    fields: [
      { name: "band", label: "Underbust (in)", type: "number", defaultValue: "32", min: 20, step: "0.5" },
      { name: "bust", label: "Bust (in)", type: "number", defaultValue: "36", min: 20, step: "0.5" },
    ],
    compute(values) {
      const band = parseNum(values.band);
      const bust = parseNum(values.bust);
      if (band <= 0 || bust <= 0) return err("Enter positive measurements in inches.");
      const diff = Math.round(bust - band);
      const cups = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const cup = diff <= 0 ? "AA" : cups[Math.min(diff - 1, cups.length - 1)] ?? "Z";
      const bandSize = Math.round(band);
      return { rows: [{ label: "Suggested US size", value: `${bandSize}${cup}`, emphasize: true }, { label: "Cup difference (in)", value: fmt(diff, 0) }] };
    },
  },
  {
    slug: "password-generator",
    fields: [
      { name: "length", label: "Password length", type: "number", defaultValue: "16", min: 4, max: 128, step: "1" },
      {
        name: "upper",
        label: "Uppercase (A–Z)",
        type: "select",
        options: [
          { value: "yes", label: "Include" },
          { value: "no", label: "Exclude" },
        ],
      },
      {
        name: "lower",
        label: "Lowercase (a–z)",
        type: "select",
        options: [
          { value: "yes", label: "Include" },
          { value: "no", label: "Exclude" },
        ],
        defaultValue: "yes",
      },
      {
        name: "digits",
        label: "Numbers (0–9)",
        type: "select",
        options: [
          { value: "yes", label: "Include" },
          { value: "no", label: "Exclude" },
        ],
        defaultValue: "yes",
      },
      {
        name: "symbols",
        label: "Symbols",
        type: "select",
        options: [
          { value: "yes", label: "Include" },
          { value: "no", label: "Exclude" },
        ],
      },
    ],
    compute(values) {
      const len = Math.round(parseNum(values.length));
      if (len < 4 || len > 128) return err("Length must be between 4 and 128.");
      const pwd = genPassword(
        len,
        values.upper === "yes",
        values.lower === "yes",
        values.digits === "yes",
        values.symbols === "yes",
      );
      if (!pwd) return err("Select at least one character set.");
      return { rows: [{ label: "Generated password", value: pwd, emphasize: true }] };
    },
  },
  {
    slug: "dice-roller",
    fields: [
      { name: "count", label: "Number of dice", type: "number", defaultValue: "2", min: 1, max: 20, step: "1" },
      { name: "sides", label: "Sides per die", type: "number", defaultValue: "6", min: 2, max: 100, step: "1" },
    ],
    compute(values) {
      const count = Math.round(parseNum(values.count));
      const sides = Math.round(parseNum(values.sides));
      if (count < 1 || sides < 2) return err("Use at least one die with 2+ sides.");
      const rolls: number[] = [];
      for (let i = 0; i < count; i++) rolls.push(1 + Math.floor(Math.random() * sides));
      const sum = rolls.reduce((a, b) => a + b, 0);
      return {
        rows: [
          { label: "Total", value: fmt(sum, 0), emphasize: true },
          { label: "Rolls", value: rolls.join(", ") },
          { label: "Average", value: fmt(sum / count, 2) },
        ],
      };
    },
  },
  {
    slug: "conversion-calculator",
    fields: [
      {
        name: "category",
        label: "Category",
        type: "select",
        options: [
          { value: "length", label: "Length" },
          { value: "mass", label: "Mass / weight" },
          { value: "temp", label: "Temperature" },
        ],
      },
      { name: "value", label: "Value", type: "number", defaultValue: "1", step: "any" },
      {
        name: "from",
        label: "From unit",
        type: "select",
        options: [
          { value: "m", label: "Meters" },
          { value: "km", label: "Kilometers" },
          { value: "ft", label: "Feet" },
          { value: "in", label: "Inches" },
          { value: "mi", label: "Miles" },
          { value: "kg", label: "Kilograms" },
          { value: "lb", label: "Pounds" },
          { value: "C", label: "°C" },
          { value: "F", label: "°F" },
        ],
      },
      {
        name: "to",
        label: "To unit",
        type: "select",
        options: [
          { value: "m", label: "Meters" },
          { value: "km", label: "Kilometers" },
          { value: "ft", label: "Feet" },
          { value: "in", label: "Inches" },
          { value: "mi", label: "Miles" },
          { value: "kg", label: "Kilograms" },
          { value: "lb", label: "Pounds" },
          { value: "C", label: "°C" },
          { value: "F", label: "°F" },
        ],
        defaultValue: "ft",
      },
    ],
    compute(values) {
      const v = parseNum(values.value);
      if (!Number.isFinite(v)) return err("Enter a value to convert.");
      let out: number;
      if (values.category === "length") out = convertLength(v, values.from, values.to);
      else if (values.category === "mass") out = convertMass(v, values.from, values.to);
      else out = convertTemp(v, values.from, values.to);
      if (!Number.isFinite(out)) return err("Choose units that match the selected category.");
      return { rows: [{ label: "Converted value", value: fmt(out, 6), emphasize: true }] };
    },
  },
  {
    slug: "fuel-cost-calculator",
    fields: [
      { name: "distance", label: "Trip distance (mi)", type: "number", defaultValue: "120", min: 0, step: "0.1" },
      { name: "mpg", label: "Fuel economy (mpg)", type: "number", defaultValue: "28", min: 0.1, step: "0.1" },
      { name: "price", label: "Price per gallon ($)", type: "number", defaultValue: "3.75", min: 0, step: "0.01" },
    ],
    compute(values) {
      const dist = parseNum(values.distance);
      const mpg = parseNum(values.mpg);
      const price = parseNum(values.price);
      if (dist <= 0 || mpg <= 0 || price < 0) return err("Enter positive distance, mpg, and fuel price.");
      const gallons = dist / mpg;
      const cost = gallons * price;
      return {
        rows: [
          { label: "Trip fuel cost", value: fmtMoney(cost), emphasize: true },
          { label: "Gallons used", value: fmt(gallons, 2) },
        ],
      };
    },
  },
  {
    slug: "voltage-drop-calculator",
    fields: [
      { name: "current", label: "Current (A)", type: "number", defaultValue: "15", min: 0, step: "0.1" },
      { name: "length", label: "One-way wire length (ft)", type: "number", defaultValue: "100", min: 0, step: "1" },
      { name: "resistance", label: "Wire resistance (Ω / 1000 ft)", type: "number", defaultValue: "1.02", min: 0, step: "0.01" },
      { name: "voltage", label: "System voltage (V)", type: "number", defaultValue: "120", min: 0, step: "1" },
    ],
    compute(values) {
      const i = parseNum(values.current);
      const len = parseNum(values.length);
      const rPerK = parseNum(values.resistance);
      const v = parseNum(values.voltage);
      if (i <= 0 || len <= 0 || rPerK <= 0 || v <= 0) return err("Enter positive electrical values.");
      const r = (rPerK * len * 2) / 1000;
      const drop = i * r;
      const pct = (drop / v) * 100;
      return {
        rows: [
          { label: "Voltage drop", value: `${fmt(drop, 2)} V`, emphasize: true },
          { label: "Drop percentage", value: fmtPct(pct, 2) },
          { label: "Voltage at load", value: `${fmt(v - drop, 2)} V` },
        ],
      };
    },
  },
  {
    slug: "btu-calculator",
    fields: [
      { name: "length", label: "Room length (ft)", type: "number", defaultValue: "14", min: 0, step: "0.1" },
      { name: "width", label: "Room width (ft)", type: "number", defaultValue: "12", min: 0, step: "0.1" },
      { name: "height", label: "Ceiling height (ft)", type: "number", defaultValue: "8", min: 0, step: "0.1" },
      {
        name: "climate",
        label: "Climate factor",
        type: "select",
        options: [
          { value: "25", label: "Mild (25 BTU/ft³)" },
          { value: "35", label: "Average (35 BTU/ft³)" },
          { value: "45", label: "Cold / sunny (45 BTU/ft³)" },
        ],
      },
    ],
    compute(values) {
      const l = parseNum(values.length);
      const w = parseNum(values.width);
      const h = parseNum(values.height);
      const factor = parseNum(values.climate);
      if (l <= 0 || w <= 0 || h <= 0) return err("Enter positive room dimensions.");
      const volume = l * w * h;
      const btu = volume * factor;
      return {
        rows: [
          { label: "Estimated BTU/hr", value: fmt(btu, 0), emphasize: true },
          { label: "Room volume (ft³)", value: fmt(volume, 0) },
        ],
      };
    },
  },
  {
    slug: "square-footage-calculator",
    fields: [
      { name: "length", label: "Length (ft)", type: "number", defaultValue: "15", min: 0, step: "0.1" },
      { name: "width", label: "Width (ft)", type: "number", defaultValue: "12", min: 0, step: "0.1" },
    ],
    compute(values) {
      const l = parseNum(values.length);
      const w = parseNum(values.width);
      if (l <= 0 || w <= 0) return err("Enter positive length and width.");
      const sqFt = l * w;
      const sqM = sqFt * 0.092903;
      return {
        rows: [
          { label: "Area", value: `${fmt(sqFt, 2)} ft²`, emphasize: true },
          { label: "Area (metric)", value: `${fmt(sqM, 2)} m²` },
        ],
      };
    },
  },
  {
    slug: "time-card-calculator",
    fields: [
      { name: "in", label: "Clock in (HH:MM)", type: "text", defaultValue: "09:00", placeholder: "09:00" },
      { name: "out", label: "Clock out (HH:MM)", type: "text", defaultValue: "17:30", placeholder: "17:30" },
      { name: "breakMin", label: "Unpaid break (min)", type: "number", defaultValue: "30", min: 0, step: "5" },
    ],
    compute(values) {
      const start = parseTimeHM(values.in);
      const end = parseTimeHM(values.out);
      const brk = parseNum(values.breakMin);
      if (start === null || end === null) return err("Use 24-hour times like 09:00 and 17:30.");
      let mins = end - start;
      if (mins < 0) mins += 24 * 60;
      mins -= Math.max(0, brk);
      if (mins < 0) return err("Break exceeds worked time.");
      const dec = mins / 60;
      return {
        rows: [
          { label: "Hours worked", value: fmt(dec, 2), emphasize: true },
          { label: "Time on clock", value: `${Math.floor(mins / 60)} h ${mins % 60} min` },
        ],
      };
    },
  },
  {
    slug: "time-zone-calculator",
    fields: [
      { name: "time", label: "Local time (HH:MM)", type: "text", defaultValue: "14:00", placeholder: "14:00" },
      {
        name: "fromOffset",
        label: "From UTC offset (hours)",
        type: "number",
        defaultValue: "-5",
        min: -12,
        max: 14,
        step: "0.5",
      },
      {
        name: "toOffset",
        label: "To UTC offset (hours)",
        type: "number",
        defaultValue: "1",
        min: -12,
        max: 14,
        step: "0.5",
      },
    ],
    compute(values) {
      const local = parseTimeHM(values.time);
      const from = parseNum(values.fromOffset);
      const to = parseNum(values.toOffset);
      if (local === null || !Number.isFinite(from) || !Number.isFinite(to)) return err("Enter time and UTC offsets.");
      const utcMin = local - from * 60;
      const target = utcMin + to * 60;
      return {
        rows: [
          { label: "Converted time", value: formatHM(target), emphasize: true },
          { label: "UTC time", value: formatHM(utcMin) },
        ],
      };
    },
  },
  {
    slug: "love-calculator",
    fields: [
      { name: "nameA", label: "First name", type: "text", defaultValue: "Alex", placeholder: "Name 1" },
      { name: "nameB", label: "Second name", type: "text", defaultValue: "Jordan", placeholder: "Name 2" },
    ],
    compute(values) {
      const a = values.nameA.trim();
      const b = values.nameB.trim();
      if (!a || !b) return err("Enter both names.");
      const score = loveScore(a, b);
      return { rows: [{ label: "Compatibility", value: `${score}%`, emphasize: true }] };
    },
  },
  {
    slug: "gdp-calculator",
    fields: [
      { name: "gdp", label: "Starting GDP ($)", type: "number", defaultValue: "1000000", min: 0, step: "1000" },
      { name: "growth", label: "Annual growth rate (%)", type: "number", defaultValue: "3", step: "0.1" },
      { name: "years", label: "Years", type: "number", defaultValue: "5", min: 0, step: "1" },
    ],
    compute(values) {
      const g0 = parseNum(values.gdp);
      const g = parseNum(values.growth);
      const y = parseNum(values.years);
      if (g0 < 0 || y < 0) return err("Enter valid GDP and years.");
      const future = g0 * (1 + g / 100) ** y;
      const gain = future - g0;
      return {
        rows: [
          { label: "Future GDP", value: fmtMoney(future), emphasize: true },
          { label: "Total growth", value: fmtMoney(gain) },
          { label: "Growth multiple", value: fmt(future / (g0 || 1), 3) },
        ],
      };
    },
  },
  {
    slug: "gas-mileage-calculator",
    fields: [
      { name: "miles", label: "Miles driven", type: "number", defaultValue: "300", min: 0, step: "0.1" },
      { name: "gallons", label: "Gallons used", type: "number", defaultValue: "10.5", min: 0, step: "0.01" },
    ],
    compute(values) {
      const miles = parseNum(values.miles);
      const gal = parseNum(values.gallons);
      if (miles <= 0 || gal <= 0) return err("Enter positive miles and gallons.");
      const mpg = miles / gal;
      const l100 = (gal * 3.785411784) / (miles * 1.609344) * 100;
      return {
        rows: [
          { label: "Fuel economy", value: `${fmt(mpg, 2)} mpg`, emphasize: true },
          { label: "Liters per 100 km", value: fmt(l100, 2) },
        ],
      };
    },
  },
  {
    slug: "horsepower-calculator",
    fields: [
      { name: "torque", label: "Torque (lb·ft)", type: "number", defaultValue: "250", min: 0, step: "1" },
      { name: "rpm", label: "Engine speed (RPM)", type: "number", defaultValue: "5500", min: 0, step: "10" },
    ],
    compute(values) {
      const t = parseNum(values.torque);
      const rpm = parseNum(values.rpm);
      if (t <= 0 || rpm <= 0) return err("Enter positive torque and RPM.");
      const hp = (t * rpm) / 5252;
      return { rows: [{ label: "Horsepower", value: fmt(hp, 1), emphasize: true }] };
    },
  },
  {
    slug: "engine-horsepower-calculator",
    fields: [
      { name: "bore", label: "Bore (in)", type: "number", defaultValue: "3.5", min: 0, step: "0.01" },
      { name: "stroke", label: "Stroke (in)", type: "number", defaultValue: "3.2", min: 0, step: "0.01" },
      { name: "cylinders", label: "Cylinders", type: "number", defaultValue: "4", min: 1, max: 16, step: "1" },
      { name: "rpm", label: "RPM", type: "number", defaultValue: "6000", min: 0, step: "10" },
      { name: "ve", label: "Volumetric efficiency (%)", type: "number", defaultValue: "85", min: 1, max: 120, step: "1" },
    ],
    compute(values) {
      const bore = parseNum(values.bore);
      const stroke = parseNum(values.stroke);
      const cyl = Math.round(parseNum(values.cylinders));
      const rpm = parseNum(values.rpm);
      const ve = parseNum(values.ve) / 100;
      if (bore <= 0 || stroke <= 0 || cyl <= 0 || rpm <= 0 || ve <= 0) return err("Enter positive engine parameters.");
      const dispIn3 = ((Math.PI / 4) * bore ** 2 * stroke * cyl);
      const hp = (dispIn3 * rpm * ve) / 792001.6;
      return {
        rows: [
          { label: "Estimated horsepower", value: fmt(hp, 1), emphasize: true },
          { label: "Displacement (L)", value: fmt(dispIn3 * 0.016387064, 2) },
        ],
      };
    },
  },
  {
    slug: "stair-calculator",
    fields: [
      { name: "riseTotal", label: "Total rise (in)", type: "number", defaultValue: "108", min: 0, step: "0.1" },
      { name: "targetRise", label: "Target riser height (in)", type: "number", defaultValue: "7.5", min: 4, max: 8, step: "0.125" },
      { name: "targetRun", label: "Target tread depth (in)", type: "number", defaultValue: "10", min: 8, step: "0.1" },
    ],
    compute(values) {
      const total = parseNum(values.riseTotal);
      const target = parseNum(values.targetRise);
      const run = parseNum(values.targetRun);
      if (total <= 0 || target <= 0 || run <= 0) return err("Enter positive stair dimensions.");
      const steps = Math.max(1, Math.round(total / target));
      const riser = total / steps;
      const stringer = Math.sqrt(riser ** 2 + run ** 2) * steps;
      return {
        rows: [
          { label: "Number of steps", value: fmt(steps, 0), emphasize: true },
          { label: "Actual riser height", value: `${fmt(riser, 3)} in` },
          { label: "Total run", value: `${fmt(run * (steps - 1), 2)} in` },
          { label: "Approx. stringer length", value: `${fmt(stringer, 2)} in` },
        ],
      };
    },
  },
  {
    slug: "resistor-calculator",
    fields: [
      {
        name: "mode",
        label: "Configuration",
        type: "select",
        options: [
          { value: "parallel", label: "Parallel (R1 ∥ R2)" },
          { value: "series", label: "Series (R1 + R2)" },
        ],
      },
      { name: "r1", label: "R1 (Ω)", type: "number", defaultValue: "100", min: 0, step: "1" },
      { name: "r2", label: "R2 (Ω)", type: "number", defaultValue: "220", min: 0, step: "1" },
    ],
    compute(values) {
      const r1 = parseNum(values.r1);
      const r2 = parseNum(values.r2);
      if (r1 <= 0 || r2 <= 0) return err("Enter positive resistances.");
      const eq = values.mode === "series" ? r1 + r2 : (r1 * r2) / (r1 + r2);
      return { rows: [{ label: "Equivalent resistance", value: `${fmt(eq, 4)} Ω`, emphasize: true }] };
    },
  },
  {
    slug: "ohms-law-calculator",
    fields: [
      { name: "voltage", label: "Voltage (V)", type: "number", defaultValue: "", placeholder: "Leave blank to solve" },
      { name: "current", label: "Current (A)", type: "number", defaultValue: "2", placeholder: "Leave blank to solve" },
      { name: "resistance", label: "Resistance (Ω)", type: "number", defaultValue: "10", placeholder: "Leave blank to solve" },
    ],
    compute(values) {
      const vRaw = values.voltage.trim();
      const iRaw = values.current.trim();
      const rRaw = values.resistance.trim();
      const known = [vRaw, iRaw, rRaw].filter((x) => x !== "").length;
      if (known !== 2) return err("Enter exactly two values; leave the third blank to solve.");
      const v = vRaw ? parseNum(vRaw) : NaN;
      const i = iRaw ? parseNum(iRaw) : NaN;
      const r = rRaw ? parseNum(rRaw) : NaN;
      if (vRaw && v <= 0) return err("Voltage must be positive.");
      if (iRaw && i <= 0) return err("Current must be positive.");
      if (rRaw && r <= 0) return err("Resistance must be positive.");
      let sv = v;
      let si = i;
      let sr = r;
      if (!vRaw) sv = si * sr;
      else if (!iRaw) si = sv / sr;
      else sr = sv / si;
      return {
        rows: [
          { label: "Voltage", value: `${fmt(sv, 4)} V` },
          { label: "Current", value: `${fmt(si, 4)} A` },
          { label: "Resistance", value: `${fmt(sr, 4)} Ω`, emphasize: true },
          { label: "Power", value: `${fmt(sv * si, 4)} W` },
        ],
      };
    },
  },
  {
    slug: "electricity-calculator",
    fields: [
      { name: "voltage", label: "Voltage (V)", type: "number", defaultValue: "120", min: 0, step: "0.1" },
      { name: "current", label: "Current (A)", type: "number", defaultValue: "12", min: 0, step: "0.01" },
      { name: "hours", label: "Hours of use", type: "number", defaultValue: "2", min: 0, step: "0.1" },
      { name: "rate", label: "Electricity rate ($/kWh)", type: "number", defaultValue: "0.16", min: 0, step: "0.001" },
    ],
    compute(values) {
      const v = parseNum(values.voltage);
      const i = parseNum(values.current);
      const h = parseNum(values.hours);
      const rate = parseNum(values.rate);
      if (v <= 0 || i <= 0 || h < 0 || rate < 0) return err("Enter positive voltage, current, and usage.");
      const watts = v * i;
      const kwh = (watts * h) / 1000;
      const cost = kwh * rate;
      return {
        rows: [
          { label: "Power", value: `${fmt(watts, 1)} W`, emphasize: true },
          { label: "Energy used", value: `${fmt(kwh, 3)} kWh` },
          { label: "Estimated cost", value: fmtMoney(cost) },
        ],
      };
    },
  },
  {
    slug: "shoe-size-conversion",
    fields: [
      {
        name: "direction",
        label: "Convert",
        type: "select",
        options: [
          { value: "usToEu", label: "US men's → EU" },
          { value: "euToUs", label: "EU → US men's" },
        ],
      },
      { name: "size", label: "Shoe size", type: "number", defaultValue: "10", min: 0, step: "0.5" },
    ],
    compute(values) {
      const size = parseNum(values.size);
      if (size <= 0) return err("Enter a positive shoe size.");
      if (values.direction === "usToEu") {
        const eu = shoeUsToEu(size);
        return { rows: [{ label: "EU size (approx.)", value: fmt(eu, 0), emphasize: true }] };
      }
      const us = shoeEuToUs(size);
      return { rows: [{ label: "US men's size (approx.)", value: fmt(us, 1), emphasize: true }] };
    },
  },
  {
    slug: "tip-calculator",
    fields: [
      { name: "bill", label: "Bill amount ($)", type: "number", defaultValue: "85", min: 0, step: "0.01" },
      { name: "tipPct", label: "Tip (%)", type: "number", defaultValue: "18", min: 0, step: "0.5" },
      { name: "people", label: "Split between (people)", type: "number", defaultValue: "2", min: 1, step: "1" },
    ],
    compute(values) {
      const bill = parseNum(values.bill);
      const tipPct = parseNum(values.tipPct);
      const people = Math.round(parseNum(values.people));
      if (bill < 0 || tipPct < 0 || people < 1) return err("Enter a valid bill, tip, and party size.");
      const tip = bill * (tipPct / 100);
      const total = bill + tip;
      return ok(
        [
          { label: "Tip amount", value: fmtMoney(tip), emphasize: true },
          { label: "Total with tip", value: fmtMoney(total) },
          { label: "Per person", value: fmtMoney(total / people) },
        ],
        {
          breakdown: [
            { label: "Bill", value: bill, color: INK },
            { label: "Tip", value: tip, color: BRAND },
          ],
        },
      );
    },
  },
  {
    slug: "mileage-calculator",
    fields: [
      { name: "start", label: "Starting odometer", type: "number", defaultValue: "10250", min: 0, step: "0.1" },
      { name: "end", label: "Ending odometer", type: "number", defaultValue: "10580", min: 0, step: "0.1" },
    ],
    compute(values) {
      const start = parseNum(values.start);
      const end = parseNum(values.end);
      if (end < start) return err("Ending odometer must be ≥ starting odometer.");
      const miles = end - start;
      return { rows: [{ label: "Distance driven", value: `${fmt(miles, 1)} mi`, emphasize: true }] };
    },
  },
  {
    slug: "density-calculator",
    fields: [
      { name: "mass", label: "Mass (kg)", type: "number", defaultValue: "2.5", min: 0, step: "0.001" },
      { name: "volume", label: "Volume (L)", type: "number", defaultValue: "1", min: 0, step: "0.001" },
    ],
    compute(values) {
      const mass = parseNum(values.mass);
      const volL = parseNum(values.volume);
      if (mass <= 0 || volL <= 0) return err("Enter positive mass and volume.");
      const volM3 = volL / 1000;
      const density = mass / volM3;
      return {
        rows: [
          { label: "Density", value: `${fmt(density, 2)} kg/m³`, emphasize: true },
          { label: "Density (g/cm³)", value: fmt(density / 1000, 4) },
        ],
      };
    },
  },
  {
    slug: "mass-calculator",
    fields: [
      { name: "density", label: "Density (kg/m³)", type: "number", defaultValue: "7850", min: 0, step: "1" },
      { name: "volume", label: "Volume (m³)", type: "number", defaultValue: "0.01", min: 0, step: "0.0001" },
    ],
    compute(values) {
      const d = parseNum(values.density);
      const v = parseNum(values.volume);
      if (d <= 0 || v <= 0) return err("Enter positive density and volume.");
      const mass = d * v;
      return { rows: [{ label: "Mass", value: `${fmt(mass, 3)} kg`, emphasize: true }] };
    },
  },
  {
    slug: "weight-calculator",
    fields: [
      {
        name: "direction",
        label: "Convert",
        type: "select",
        options: [
          { value: "kgToLb", label: "Kilograms → pounds" },
          { value: "lbToKg", label: "Pounds → kilograms" },
        ],
      },
      { name: "value", label: "Weight", type: "number", defaultValue: "70", min: 0, step: "0.1" },
    ],
    compute(values) {
      const v = parseNum(values.value);
      if (v < 0) return err("Enter a non-negative weight.");
      if (values.direction === "kgToLb") {
        const lb = v * 2.2046226218;
        return { rows: [{ label: "Pounds", value: `${fmt(lb, 2)} lb`, emphasize: true }] };
      }
      const kg = v * 0.45359237;
      return { rows: [{ label: "Kilograms", value: `${fmt(kg, 2)} kg`, emphasize: true }] };
    },
  },
  {
    slug: "speed-calculator",
    fields: [
      { name: "distance", label: "Distance (mi)", type: "number", defaultValue: "26.2", min: 0, step: "0.01" },
      { name: "hours", label: "Hours", type: "number", defaultValue: "0", min: 0, step: "1" },
      { name: "minutes", label: "Minutes", type: "number", defaultValue: "45", min: 0, max: 59, step: "1" },
    ],
    compute(values) {
      const dist = parseNum(values.distance);
      const h = parseNum(values.hours);
      const m = parseNum(values.minutes);
      const timeH = h + m / 60;
      if (dist <= 0 || timeH <= 0) return err("Enter positive distance and time.");
      const mph = dist / timeH;
      const kph = mph * 1.609344;
      return {
        rows: [
          { label: "Average speed", value: `${fmt(mph, 2)} mph`, emphasize: true },
          { label: "Kilometers per hour", value: `${fmt(kph, 2)} km/h` },
        ],
      };
    },
  },
  {
    slug: "molarity-calculator",
    fields: [
      { name: "moles", label: "Amount (mol)", type: "number", defaultValue: "0.5", min: 0, step: "0.001" },
      { name: "liters", label: "Volume (L)", type: "number", defaultValue: "1", min: 0, step: "0.001" },
    ],
    compute(values) {
      const moles = parseNum(values.moles);
      const liters = parseNum(values.liters);
      if (moles < 0 || liters <= 0) return err("Enter moles ≥ 0 and volume > 0.");
      const molarity = moles / liters;
      return { rows: [{ label: "Molarity", value: `${fmt(molarity, 4)} mol/L`, emphasize: true }] };
    },
  },
  {
    slug: "molecular-weight-calculator",
    fields: [
      { name: "mass", label: "Sample mass (g)", type: "number", defaultValue: "18", min: 0, step: "0.001" },
      { name: "moles", label: "Amount (mol)", type: "number", defaultValue: "1", min: 0, step: "0.0001" },
    ],
    compute(values) {
      const mass = parseNum(values.mass);
      const moles = parseNum(values.moles);
      if (mass <= 0 || moles <= 0) return err("Enter positive mass and moles.");
      const mw = mass / moles;
      return { rows: [{ label: "Molecular weight", value: `${fmt(mw, 4)} g/mol`, emphasize: true }] };
    },
  },
  {
    slug: "roman-numeral-converter",
    fields: [
      {
        name: "mode",
        label: "Direction",
        type: "select",
        options: [
          { value: "toRoman", label: "Arabic number → Roman" },
          { value: "toArabic", label: "Roman → Arabic number" },
        ],
      },
      { name: "input", label: "Value", type: "text", defaultValue: "2026", placeholder: "Number or Roman numeral" },
    ],
    compute(values) {
      const input = values.input.trim();
      if (!input) return err("Enter a value to convert.");
      if (values.mode === "toRoman") {
        const n = Math.round(parseNum(input));
        const roman = intToRoman(n);
        if (!roman) return err("Enter an integer from 1 to 3999.");
        return { rows: [{ label: "Roman numeral", value: roman, emphasize: true }] };
      }
      const n = romanToInt(input);
      if (n === null) return err("Enter a valid Roman numeral (I, V, X, L, C, D, M).");
      return { rows: [{ label: "Arabic number", value: fmt(n, 0), emphasize: true }] };
    },
  },
  {
    slug: "golf-handicap-calculator",
    fields: [
      { name: "score", label: "Score", type: "number", defaultValue: "92", min: 1, step: "1" },
      { name: "rating", label: "Course rating", type: "number", defaultValue: "72.1", step: "0.1" },
      { name: "slope", label: "Slope rating", type: "number", defaultValue: "125", min: 55, max: 155, step: "1" },
      { name: "par", label: "Course par", type: "number", defaultValue: "72", min: 54, max: 80, step: "1" },
    ],
    compute(values) {
      const score = parseNum(values.score);
      const rating = parseNum(values.rating);
      const slope = parseNum(values.slope);
      const par = parseNum(values.par);
      if (score <= 0 || slope <= 0) return err("Enter valid score and slope.");
      const diff = score - rating;
      const index = (diff * 113) / slope;
      return {
        rows: [
          { label: "Score differential (approx.)", value: fmt(index, 1), emphasize: true },
          { label: "Score vs par", value: fmt(score - par, 0) },
        ],
      };
    },
  },
  {
    slug: "sleep-calculator",
    fields: [
      { name: "wake", label: "Wake-up time (HH:MM)", type: "text", defaultValue: "07:00", placeholder: "07:00" },
      {
        name: "cycles",
        label: "Sleep cycles (90 min each)",
        type: "number",
        defaultValue: "5",
        min: 3,
        max: 6,
        step: "1",
      },
    ],
    compute(values) {
      const wake = parseTimeHM(values.wake);
      const cycles = Math.round(parseNum(values.cycles));
      if (wake === null) return err("Enter wake time as HH:MM.");
      if (cycles < 3 || cycles > 6) return err("Choose 3–6 sleep cycles.");
      const sleepMin = cycles * 90 + 15;
      const bed = wake - sleepMin;
      return {
        rows: [
          { label: "Suggested bedtime", value: formatHM(bed), emphasize: true },
          { label: "Time in bed", value: `${fmt(sleepMin / 60, 1)} hours` },
        ],
      };
    },
  },
  {
    slug: "tire-size-calculator",
    fields: [
      { name: "width", label: "Section width (mm)", type: "number", defaultValue: "225", min: 0, step: "1" },
      { name: "aspect", label: "Aspect ratio (%)", type: "number", defaultValue: "45", min: 0, step: "1" },
      { name: "rim", label: "Wheel diameter (in)", type: "number", defaultValue: "17", min: 0, step: "0.5" },
    ],
    compute(values) {
      const w = parseNum(values.width);
      const ar = parseNum(values.aspect);
      const rim = parseNum(values.rim);
      if (w <= 0 || ar <= 0 || rim <= 0) return err("Enter positive tire dimensions.");
      const sidewallIn = ((w * (ar / 100)) / 25.4) * 2;
      const overall = sidewallIn + rim;
      const revsPerMile = 63360 / (overall * Math.PI);
      return {
        rows: [
          { label: "Overall diameter", value: `${fmt(overall, 2)} in`, emphasize: true },
          { label: "Sidewall height (each)", value: `${fmt(sidewallIn / 2, 2)} in` },
          { label: "Revolutions per mile", value: fmt(revsPerMile, 0) },
        ],
      };
    },
  },
  {
    slug: "roofing-calculator",
    fields: [
      { name: "length", label: "Roof length (ft)", type: "number", defaultValue: "40", min: 0, step: "0.1" },
      { name: "width", label: "Roof width (ft)", type: "number", defaultValue: "30", min: 0, step: "0.1" },
      { name: "pitch", label: "Pitch rise (in per 12 in run)", type: "number", defaultValue: "6", min: 0, step: "0.5" },
      { name: "waste", label: "Waste factor (%)", type: "number", defaultValue: "10", min: 0, step: "1" },
    ],
    compute(values) {
      const l = parseNum(values.length);
      const w = parseNum(values.width);
      const pitch = parseNum(values.pitch);
      const waste = parseNum(values.waste);
      if (l <= 0 || w <= 0) return err("Enter positive roof footprint dimensions.");
      const slopeFactor = Math.sqrt(1 + (pitch / 12) ** 2);
      const area = l * w * slopeFactor;
      const withWaste = area * (1 + waste / 100);
      const squares = withWaste / 100;
      const slopeArea = l * w * slopeFactor;
      const wasteArea = withWaste - slopeArea;
      return ok(
        [
          { label: "Roof area (with waste)", value: `${fmt(withWaste, 0)} ft²`, emphasize: true },
          { label: "Roofing squares", value: fmt(squares, 2) },
        ],
        {
          breakdown: [
            { label: "Sloped surface", value: slopeArea, color: BRAND },
            { label: "Waste allowance", value: Math.max(0, wasteArea), color: INK },
          ],
          note: "Footprint adjusted for pitch, then waste factor applied.",
        },
      );
    },
  },
  {
    slug: "tile-calculator",
    fields: [
      { name: "area", label: "Area to cover (ft²)", type: "number", defaultValue: "120", min: 0, step: "0.1" },
      { name: "tile", label: "Tile size (in)", type: "number", defaultValue: "12", min: 0, step: "0.1" },
      { name: "waste", label: "Waste (%)", type: "number", defaultValue: "10", min: 0, step: "1" },
    ],
    compute(values) {
      const area = parseNum(values.area);
      const tile = parseNum(values.tile);
      const waste = parseNum(values.waste);
      if (area <= 0 || tile <= 0) return err("Enter positive area and tile size.");
      const tileFt = tile / 12;
      const tileArea = tileFt ** 2;
      const withWaste = area * (1 + waste / 100);
      const count = Math.ceil(withWaste / tileArea);
      const wasteArea = withWaste - area;
      return ok(
        [
          { label: "Tiles needed", value: fmt(count, 0), emphasize: true },
          { label: "Tile area", value: `${fmt(tileArea, 3)} ft²` },
        ],
        {
          breakdown: [
            { label: "Coverage area", value: area, color: BRAND },
            { label: "Waste buffer", value: Math.max(0, wasteArea), color: INK },
          ],
        },
      );
    },
  },
  {
    slug: "mulch-calculator",
    fields: [
      { name: "length", label: "Bed length (ft)", type: "number", defaultValue: "20", min: 0, step: "0.1" },
      { name: "width", label: "Bed width (ft)", type: "number", defaultValue: "8", min: 0, step: "0.1" },
      { name: "depth", label: "Depth (in)", type: "number", defaultValue: "3", min: 0, step: "0.5" },
    ],
    compute(values) {
      const l = parseNum(values.length);
      const w = parseNum(values.width);
      const d = parseNum(values.depth);
      if (l <= 0 || w <= 0 || d <= 0) return err("Enter positive bed dimensions.");
      const cuFt = l * w * (d / 12);
      const cuYd = cuFt / 27;
      const fullYdFt = Math.floor(cuYd) * 27;
      const extraFt = cuFt - fullYdFt;
      return ok(
        [
          { label: "Mulch volume", value: `${fmt(cuYd, 2)} yd³`, emphasize: true },
          { label: "Cubic feet", value: fmt(cuFt, 1) },
        ],
        {
          breakdown: [
            { label: "Full yd³ (×27 ft³)", value: fullYdFt, color: BRAND },
            { label: "Extra ft³", value: Math.max(0, extraFt), color: INK },
          ],
          note: "Bed volume in ft³; bulk mulch is often quoted in cubic yards.",
        },
      );
    },
  },
  {
    slug: "gravel-calculator",
    fields: [
      { name: "length", label: "Area length (ft)", type: "number", defaultValue: "15", min: 0, step: "0.1" },
      { name: "width", label: "Area width (ft)", type: "number", defaultValue: "10", min: 0, step: "0.1" },
      { name: "depth", label: "Depth (in)", type: "number", defaultValue: "4", min: 0, step: "0.5" },
    ],
    compute(values) {
      const l = parseNum(values.length);
      const w = parseNum(values.width);
      const d = parseNum(values.depth);
      if (l <= 0 || w <= 0 || d <= 0) return err("Enter positive area dimensions.");
      const cuFt = l * w * (d / 12);
      const cuYd = cuFt / 27;
      const tons = (cuFt * 100) / 2000;
      return ok(
        [
          { label: "Estimated gravel", value: `${fmt(tons, 2)} tons`, emphasize: true },
          { label: "Cubic yards", value: fmt(cuYd, 2) },
        ],
        {
          breakdown: [
            { label: "Volume (ft³)", value: cuFt, color: BRAND },
            { label: "Weight (tons, ~100 lb/ft³)", value: tons, color: INK },
          ],
          note: "Tons assume roughly 100 lb per cubic foot; adjust for your stone type.",
        },
      );
    },
  },
  {
    slug: "wind-chill-calculator",
    fields: [
      { name: "temp", label: "Air temperature (°F)", type: "number", defaultValue: "20", step: "1" },
      { name: "wind", label: "Wind speed (mph)", type: "number", defaultValue: "15", min: 0, step: "1" },
    ],
    compute(values) {
      const temp = parseNum(values.temp);
      const wind = parseNum(values.wind);
      if (wind < 0) return err("Wind speed cannot be negative.");
      const wc = windChillF(temp, wind);
      return {
        rows: [
          { label: "Wind chill", value: `${fmt(wc, 1)} °F`, emphasize: true },
          { label: "Note", value: temp > 50 || wind < 3 ? "Formula applies below 50 °F and 3+ mph wind." : "NWS wind chill equation" },
        ],
      };
    },
  },
  {
    slug: "heat-index-calculator",
    fields: [
      { name: "temp", label: "Air temperature (°F)", type: "number", defaultValue: "92", step: "0.1" },
      { name: "rh", label: "Relative humidity (%)", type: "number", defaultValue: "65", min: 0, max: 100, step: "1" },
    ],
    compute(values) {
      const temp = parseNum(values.temp);
      const rh = parseNum(values.rh);
      if (rh < 0 || rh > 100) return err("Humidity must be between 0 and 100%.");
      const hi = heatIndexF(temp, rh);
      return { rows: [{ label: "Heat index", value: `${fmt(hi, 1)} °F`, emphasize: true }] };
    },
  },
  {
    slug: "dew-point-calculator",
    fields: [
      { name: "temp", label: "Air temperature (°F)", type: "number", defaultValue: "75", step: "0.1" },
      { name: "rh", label: "Relative humidity (%)", type: "number", defaultValue: "55", min: 0, max: 100, step: "1" },
    ],
    compute(values) {
      const temp = parseNum(values.temp);
      const rh = parseNum(values.rh);
      if (rh <= 0 || rh > 100) return err("Humidity must be between 1 and 100%.");
      const dp = dewPointF(temp, rh);
      return { rows: [{ label: "Dew point", value: `${fmt(dp, 1)} °F`, emphasize: true }] };
    },
  },
  {
    slug: "bandwidth-calculator",
    fields: [
      { name: "size", label: "File size (MB)", type: "number", defaultValue: "850", min: 0, step: "0.1" },
      { name: "speed", label: "Download speed (Mbps)", type: "number", defaultValue: "100", min: 0, step: "0.1" },
    ],
    compute(values) {
      const sizeMb = parseNum(values.size);
      const mbps = parseNum(values.speed);
      if (sizeMb <= 0 || mbps <= 0) return err("Enter positive file size and speed.");
      const bits = sizeMb * 8 * 1_000_000;
      const seconds = bits / (mbps * 1_000_000);
      const min = Math.floor(seconds / 60);
      const sec = seconds % 60;
      return {
        rows: [
          { label: "Download time", value: min > 0 ? `${min} min ${fmt(sec, 0)} s` : `${fmt(sec, 1)} s`, emphasize: true },
          { label: "Seconds", value: fmt(seconds, 2) },
        ],
      };
    },
  },
  {
    slug: "base64-encode-decode",
    fields: [
      {
        name: "mode",
        label: "Mode",
        type: "select",
        options: [
          { value: "encode", label: "Encode to Base64" },
          { value: "decode", label: "Decode from Base64" },
        ],
      },
      { name: "text", label: "Text", type: "text", defaultValue: "Hello, FigSumo!", placeholder: "Input text" },
    ],
    compute(values) {
      const text = values.text;
      if (!text) return err("Enter text to transform.");
      try {
        if (values.mode === "encode") {
          return { rows: [{ label: "Base64", value: utf8ToBase64(text), emphasize: true }] };
        }
        const out = base64ToUtf8(text.trim());
        return { rows: [{ label: "Decoded text", value: out, emphasize: true }] };
      } catch {
        return err("Could not decode — check that input is valid Base64.");
      }
    },
  },
  {
    slug: "url-encode-decode",
    fields: [
      {
        name: "mode",
        label: "Mode",
        type: "select",
        options: [
          { value: "encode", label: "URL-encode" },
          { value: "decode", label: "URL-decode" },
        ],
      },
      { name: "text", label: "Text", type: "text", defaultValue: "figsumo calculators", placeholder: "Input text" },
    ],
    compute(values) {
      const text = values.text;
      if (!text) return err("Enter text to transform.");
      try {
        if (values.mode === "encode") {
          return { rows: [{ label: "Encoded", value: encodeURIComponent(text), emphasize: true }] };
        }
        return { rows: [{ label: "Decoded", value: decodeURIComponent(text), emphasize: true }] };
      } catch {
        return err("Could not decode — check for malformed escape sequences.");
      }
    },
  },
  {
    slug: "time-duration-calculator",
    fields: [
      { name: "start", label: "Start (HH:MM)", type: "text", defaultValue: "08:15", placeholder: "08:15" },
      { name: "end", label: "End (HH:MM)", type: "text", defaultValue: "12:45", placeholder: "12:45" },
    ],
    compute(values) {
      const s = parseTimeHM(values.start);
      const e = parseTimeHM(values.end);
      if (s === null || e === null) return err("Enter start and end times as HH:MM.");
      let diff = e - s;
      if (diff < 0) diff += 24 * 60;
      return {
        rows: [
          { label: "Duration", value: `${Math.floor(diff / 60)} h ${diff % 60} min`, emphasize: true },
          { label: "Total minutes", value: fmt(diff, 0) },
        ],
      };
    },
  },
  {
    slug: "day-counter",
    fields: [
      { name: "from", label: "From date", type: "date", defaultValue: "2026-01-01" },
      { name: "to", label: "To date", type: "date", defaultValue: "2026-12-31" },
    ],
    compute(values) {
      const from = parseIsoDate(values.from);
      const to = parseIsoDate(values.to);
      if (!from || !to) return err("Enter valid dates.");
      const days = diffCalendarParts(from, to).totalDays;
      const absDays = Math.abs(days);
      const weeks = absDays / 7;
      return {
        rows: [
          { label: "Days between", value: fmt(absDays, 0), emphasize: true },
          { label: "Weeks (approx.)", value: fmt(weeks, 2) },
          { label: "Direction", value: days >= 0 ? "Forward" : "Backward (|days| shown)" },
        ],
      };
    },
  },
  {
    slug: "day-of-the-week-calculator",
    fields: [{ name: "date", label: "Date", type: "date", defaultValue: "2026-07-04" }],
    compute(values) {
      const d = parseIsoDate(values.date);
      if (!d) return err("Enter a valid date.");
      return {
        rows: [
          { label: "Day of week", value: dayOfWeekName(d), emphasize: true },
          { label: "ISO date", value: d.toISOString().slice(0, 10) },
        ],
      };
    },
  },
];
