import type { FieldDef, CalcResult } from "@/components/calc/FormulaCalculator";
import type { CalcSuccess } from "@/lib/calc/result-types";
import {
  addDays,
  bmi,
  bmiCategory,
  bodyFatNavy,
  bodySurfaceAreaMosteller,
  bmrMifflin,
  gfrCkdEpi,
  idealWeightRobinson,
  oneRepMaxEpley,
  paceFromTimeDistance,
  targetHeartRate,
  tdee,
  widmarkBac,
} from "@/lib/calc/fitness-core";
import { fmt, fmtPct, parseNum, round } from "@/lib/calc/format";

export type CalcDef = {
  slug: string;
  fields: FieldDef[];
  compute: (v: Record<string, string>) => CalcResult;
};

const LB_KG = 0.45359237;
const IN_CM = 2.54;

const ACTIVITY_OPTIONS = [
  { value: "sedentary", label: "Sedentary (little or no exercise)" },
  { value: "light", label: "Light (1–3 days/week)" },
  { value: "moderate", label: "Moderate (3–5 days/week)" },
  { value: "active", label: "Active (6–7 days/week)" },
  { value: "very", label: "Very active (hard exercise daily)" },
];

const SEX_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

const UNITS_OPTIONS = [
  { value: "metric", label: "Metric (kg, cm)" },
  { value: "imperial", label: "Imperial (lb, in)" },
];

function error(message: string): CalcResult {
  return { error: message };
}

const BRAND = "#2563EB";
const INK = "#101010";

function ok(
  rows: { label: string; value: string; emphasize?: boolean }[],
  extra?: Omit<CalcSuccess, "rows">,
): CalcResult {
  return { rows, ...extra };
}

function bmiCategoryNote(val: number): string {
  const cat = bmiCategory(val);
  if (cat === "Underweight") return "Below 18.5 — consider whether weight is healthy for you with a clinician.";
  if (cat === "Normal") return "18.5–24.9 is the usual healthy range for adults; BMI is a screening tool only.";
  if (cat === "Overweight") return "25–29.9 — higher BMI can reflect extra fat or muscle; context matters.";
  return "30+ — elevated BMI warrants lifestyle review and professional guidance if needed.";
}

function calorieMacroBreakdown(cals: number, cPct: number, pPct: number, fPct: number) {
  return [
    { label: "Carbs", value: (cals * cPct) / 4, color: BRAND },
    { label: "Protein", value: (cals * pPct) / 4, color: INK },
    { label: "Fat", value: (cals * fPct) / 9, color: "#64748B" },
  ];
}

function requirePositive(n: number, label: string): string | null {
  if (!Number.isFinite(n)) return `Enter a valid ${label}.`;
  if (n <= 0) return `${label} must be greater than zero.`;
  return null;
}

function parseSex(v: Record<string, string>): "male" | "female" | null {
  const s = v.sex?.trim();
  if (s === "male" || s === "female") return s;
  return null;
}

function weightKgFrom(v: Record<string, string>, weightKey = "weight"): number {
  const w = parseNum(v[weightKey] ?? "");
  if (!Number.isFinite(w)) return NaN;
  return (v.units ?? "metric") === "imperial" ? w * LB_KG : w;
}

function heightCmFrom(v: Record<string, string>): number {
  const units = v.units ?? "metric";
  if (units === "imperial") {
    const ft = parseNum(v.heightFt ?? "");
    const inch = parseNum(v.heightIn ?? "");
    if (!Number.isFinite(ft) && !Number.isFinite(inch)) return NaN;
    const totalIn = (Number.isFinite(ft) ? ft : 0) * 12 + (Number.isFinite(inch) ? inch : 0);
    return totalIn * IN_CM;
  }
  return parseNum(v.height ?? "");
}

function lengthCmFrom(v: Record<string, string>, key: string): number {
  const n = parseNum(v[key] ?? "");
  if (!Number.isFinite(n)) return NaN;
  return (v.units ?? "metric") === "imperial" ? n * IN_CM : n;
}

function lengthInFrom(v: Record<string, string>, key: string): number {
  const n = parseNum(v[key] ?? "");
  if (!Number.isFinite(n)) return NaN;
  return (v.units ?? "metric") === "imperial" ? n : n / IN_CM;
}

function gestationalAgeFromLmp(lmp: string, asOf = new Date()): { weeks: number; days: number } | null {
  const start = new Date(lmp + "T12:00:00");
  if (Number.isNaN(start.getTime())) return null;
  const ms = asOf.getTime() - start.getTime();
  if (ms < 0) return null;
  const totalDays = Math.floor(ms / 86400000);
  return { weeks: Math.floor(totalDays / 7), days: totalDays % 7 };
}

function trimester(weeks: number): string {
  if (weeks < 13) return "First trimester (weeks 1–12)";
  if (weeks < 27) return "Second trimester (weeks 13–26)";
  return "Third trimester (week 27+)";
}

function pregnancyWeightGainRange(preBmi: number): { kgLow: number; kgHigh: number } {
  if (preBmi < 18.5) return { kgLow: 12.5, kgHigh: 18 };
  if (preBmi < 25) return { kgLow: 11.5, kgHigh: 16 };
  if (preBmi < 30) return { kgLow: 7, kgHigh: 11.5 };
  return { kgLow: 5, kgHigh: 9 };
}

function armyBodyFatPct(
  sex: "male" | "female",
  heightIn: number,
  neckIn: number,
  waistIn: number,
  hipIn: number,
): number {
  if (sex === "male") {
    return 86.01 * Math.log10(waistIn - neckIn) - 70.041 * Math.log10(heightIn) + 36.76;
  }
  return 163.205 * Math.log10(waistIn + hipIn - neckIn) - 97.684 * Math.log10(heightIn) - 78.387;
}

function frameSize(sex: "male" | "female", heightCm: number, wristCm: number): string {
  const ratio = heightCm / wristCm;
  if (sex === "male") {
    if (ratio > 10.9) return "Small frame";
    if (ratio >= 9.6) return "Medium frame";
    return "Large frame";
  }
  if (ratio > 11) return "Small frame";
  if (ratio >= 9.6) return "Medium frame";
  return "Large frame";
}

function bodyTypeHeuristic(sex: "male" | "female", bmiVal: number, frame: string): string {
  if (bmiVal < 18.5) return "Ectomorph-lean (typical traits: lower BMI, lean build)";
  if (bmiVal >= 25) return "Endomorph-leaning (typical traits: higher BMI, store fat more easily)";
  if (frame.includes("Large")) return "Mesomorph-leaning (typical traits: broader frame, muscular potential)";
  return "Mesomorph / balanced (typical traits: moderate frame and composition)";
}

const bmiFields: FieldDef[] = [
  { name: "units", label: "Units", type: "select", options: UNITS_OPTIONS, defaultValue: "metric" },
  { name: "weight", label: "Weight", type: "number", min: 0, step: "0.1", placeholder: "70", suffix: "kg or lb" },
  { name: "height", label: "Height (cm)", type: "number", min: 0, step: "0.1", placeholder: "175" },
  { name: "heightFt", label: "Height (ft)", type: "number", min: 0, step: "1", placeholder: "5" },
  { name: "heightIn", label: "Height (in)", type: "number", min: 0, step: "0.1", placeholder: "9" },
];

function computeBmi(v: Record<string, string>): CalcResult {
  const w = weightKgFrom(v);
  const h = heightCmFrom(v);
  const wErr = requirePositive(w, "Weight");
  if (wErr) return error(wErr);
  const hErr = requirePositive(h, "Height");
  if (hErr) return error(hErr);
  const val = bmi(w, h);
  const cat = bmiCategory(val);
  return ok(
    [
      { label: "BMI", value: fmt(val, 1), emphasize: true },
      { label: "Category", value: cat },
    ],
    { note: bmiCategoryNote(val) },
  );
}

const anthropometryFields = (extra: FieldDef[] = []): FieldDef[] => [
  { name: "units", label: "Units", type: "select", options: UNITS_OPTIONS, defaultValue: "metric" },
  { name: "sex", label: "Sex", type: "select", options: SEX_OPTIONS },
  ...extra,
];

const bmrBaseFields: FieldDef[] = [
  { name: "age", label: "Age", type: "number", min: 1, max: 120, step: "1", placeholder: "30" },
  { name: "weight", label: "Weight", type: "number", min: 0, step: "0.1", placeholder: "70", suffix: "kg or lb" },
  { name: "height", label: "Height (cm)", type: "number", min: 0, step: "0.1", placeholder: "175" },
  { name: "heightFt", label: "Height (ft)", type: "number", min: 0, step: "1", placeholder: "5" },
  { name: "heightIn", label: "Height (in)", type: "number", min: 0, step: "0.1", placeholder: "9" },
];

type BmrInputs = { bmr: number; sex: "male" | "female"; w: number; h: number; age: number };

function isCalcResult(x: BmrInputs | CalcResult): x is CalcResult {
  return "error" in x;
}

function computeBmrBlock(v: Record<string, string>): BmrInputs | CalcResult {
  const sex = parseSex(v);
  if (!sex) return error("Select sex.");
  const age = parseNum(v.age ?? "");
  const ageErr = requirePositive(age, "Age");
  if (ageErr) return error(ageErr);
  const w = weightKgFrom(v);
  const h = heightCmFrom(v);
  const wErr = requirePositive(w, "Weight");
  if (wErr) return error(wErr);
  const hErr = requirePositive(h, "Height");
  if (hErr) return error(hErr);
  return { bmr: bmrMifflin(sex, w, h, age), sex, w, h, age };
}

export const fitnessDefs: CalcDef[] = [
  {
    slug: "bmi-calculator",
    fields: bmiFields,
    compute: computeBmi,
  },
  {
    slug: "calorie-calculator",
    fields: [
      ...anthropometryFields(bmrBaseFields),
      { name: "activity", label: "Activity level", type: "select", options: ACTIVITY_OPTIONS, defaultValue: "moderate" },
    ],
    compute(v) {
      const block = computeBmrBlock(v);
      if (isCalcResult(block)) return block;
      const { bmr: b } = block;
      const act = v.activity ?? "moderate";
      const maintenance = tdee(b, act);
      const activityCals = maintenance - b;
      return ok(
        [
          { label: "BMR (Mifflin–St Jeor)", value: `${fmt(b, 0)} kcal/day` },
          { label: "Estimated maintenance calories", value: `${fmt(maintenance, 0)} kcal/day`, emphasize: true },
          { label: "Activity multiplier", value: fmt(maintenance / b, 2) },
        ],
        {
          breakdown: [
            { label: "Basal (BMR)", value: b, color: INK },
            { label: "Activity", value: Math.max(0, activityCals), color: BRAND },
          ],
          note: "Maintenance ≈ BMR × activity factor (Mifflin–St Jeor BMR).",
        },
      );
    },
  },
  {
    slug: "body-fat-calculator",
    fields: anthropometryFields([
      { name: "height", label: "Height (cm)", type: "number", min: 0, step: "0.1", defaultValue: "175" },
      { name: "heightFt", label: "Height (ft)", type: "number", min: 0, step: "1", defaultValue: "5" },
      { name: "heightIn", label: "Height (in)", type: "number", min: 0, step: "0.1", defaultValue: "9" },
      { name: "neck", label: "Neck circumference", type: "number", min: 0, step: "0.1", suffix: "cm or in", defaultValue: "38" },
      { name: "waist", label: "Waist circumference", type: "number", min: 0, step: "0.1", suffix: "cm or in", defaultValue: "84" },
      { name: "hip", label: "Hip circumference (women)", type: "number", min: 0, step: "0.1", suffix: "cm or in", defaultValue: "95", placeholder: "Optional for men" },
    ]),
    compute(v) {
      const sex = parseSex(v);
      if (!sex) return error("Select sex.");
      const h = heightCmFrom(v);
      const hErr = requirePositive(h, "Height");
      if (hErr) return error(hErr);
      const neck = lengthCmFrom(v, "neck");
      const waist = lengthCmFrom(v, "waist");
      const hip = lengthCmFrom(v, "hip");
      if (!Number.isFinite(neck) || !Number.isFinite(waist)) return error("Enter valid neck and waist measurements.");
      if (sex === "female" && (!Number.isFinite(hip) || hip <= 0)) return error("Hip measurement is required for women.");
      if (waist <= neck) return error("Waist must be larger than neck for this formula.");
      const pct = bodyFatNavy(sex, h, neck, waist, hip || 0);
      if (!Number.isFinite(pct) || pct < 0 || pct > 70) return error("Could not estimate body fat — check measurements.");
      const leanPct = Math.max(0, 100 - pct);
      return ok(
        [
          { label: "Body fat (US Navy method)", value: fmtPct(pct, 1), emphasize: true },
          { label: "Lean mass estimate", value: "Use weight and body fat % in the lean body mass calculator." },
        ],
        {
          breakdown: [
            { label: "Body fat", value: pct, color: INK },
            { label: "Lean (est.)", value: leanPct, color: BRAND },
          ],
          note: "Circumference method; enter weight in the lean body mass calculator for kg/lb estimates.",
        },
      );
    },
  },
  {
    slug: "bmr-calculator",
    fields: anthropometryFields(bmrBaseFields),
    compute(v) {
      const block = computeBmrBlock(v);
      if (isCalcResult(block)) return block;
      const { bmr: b } = block;
      const maintenance = tdee(b, "moderate");
      return ok(
        [{ label: "Basal metabolic rate (BMR)", value: `${fmt(b, 0)} kcal/day`, emphasize: true }],
        {
          breakdown: [
            { label: "BMR", value: b, color: INK },
            { label: "Moderate activity (est.)", value: Math.max(0, maintenance - b), color: BRAND },
          ],
          note: "BMR is energy at rest (Mifflin–St Jeor); shaded activity shows moderate TDEE minus BMR.",
        },
      );
    },
  },
  {
    slug: "macro-calculator",
    fields: [
      ...anthropometryFields(bmrBaseFields),
      { name: "activity", label: "Activity level", type: "select", options: ACTIVITY_OPTIONS, defaultValue: "moderate" },
      {
        name: "split",
        label: "Macro split",
        type: "select",
        options: [
          { value: "balanced", label: "Balanced (40% carb / 30% protein / 30% fat)" },
          { value: "high_protein", label: "High protein (30% carb / 40% protein / 30% fat)" },
          { value: "low_carb", label: "Low carb (20% carb / 35% protein / 45% fat)" },
        ],
        defaultValue: "balanced",
      },
    ],
    compute(v) {
      const block = computeBmrBlock(v);
      if (isCalcResult(block)) return block;
      const { bmr: b } = block;
      const cals = tdee(b, v.activity ?? "moderate");
      const splits: Record<string, [number, number, number]> = {
        balanced: [0.4, 0.3, 0.3],
        high_protein: [0.3, 0.4, 0.3],
        low_carb: [0.2, 0.35, 0.45],
      };
      const [cPct, pPct, fPct] = splits[v.split ?? "balanced"] ?? splits.balanced;
      const carbG = (cals * cPct) / 4;
      const proteinG = (cals * pPct) / 4;
      const fatG = (cals * fPct) / 9;
      return ok(
        [
          { label: "Daily calories (TDEE)", value: `${fmt(cals, 0)} kcal`, emphasize: true },
          { label: "Carbohydrates", value: `${fmt(carbG, 0)} g (${fmt(cPct * 100, 0)}%)` },
          { label: "Protein", value: `${fmt(proteinG, 0)} g (${fmt(pPct * 100, 0)}%)` },
          { label: "Fat", value: `${fmt(fatG, 0)} g (${fmt(fPct * 100, 0)}%)` },
        ],
        {
          breakdown: calorieMacroBreakdown(cals, cPct, pPct, fPct),
          note: "Gram targets from your TDEE and selected macro split (4 kcal/g carb & protein, 9 kcal/g fat).",
        },
      );
    },
  },
  {
    slug: "ideal-weight-calculator",
    fields: anthropometryFields([
      { name: "height", label: "Height (cm)", type: "number", min: 0, step: "0.1", placeholder: "175" },
      { name: "heightFt", label: "Height (ft)", type: "number", min: 0, step: "1", placeholder: "5" },
      { name: "heightIn", label: "Height (in)", type: "number", min: 0, step: "0.1", placeholder: "9" },
    ]),
    compute(v) {
      const sex = parseSex(v);
      if (!sex) return error("Select sex.");
      const h = heightCmFrom(v);
      const hErr = requirePositive(h, "Height");
      if (hErr) return error(hErr);
      const kg = idealWeightRobinson(sex, h);
      const imperial = kg / LB_KG;
      return ok([
        { label: "Ideal weight (Robinson formula)", value: `${fmt(kg, 1)} kg`, emphasize: true },
        { label: "Ideal weight", value: `${fmt(imperial, 1)} lb` },
      ]);
    },
  },
  {
    slug: "pregnancy-calculator",
    fields: [{ name: "lmp", label: "First day of last menstrual period (LMP)", type: "date" }],
    compute(v) {
      const lmp = v.lmp?.trim();
      if (!lmp) return error("Enter your LMP date.");
      const ga = gestationalAgeFromLmp(lmp);
      if (!ga) return error("LMP must be on or before today.");
      const due = addDays(lmp, 280);
      return ok([
        { label: "Gestational age", value: `${ga.weeks} weeks, ${ga.days} days`, emphasize: true },
        { label: "Estimated due date", value: due },
        { label: "Trimester", value: trimester(ga.weeks) },
      ]);
    },
  },
  {
    slug: "pregnancy-weight-gain-calculator",
    fields: [
      { name: "units", label: "Units", type: "select", options: UNITS_OPTIONS, defaultValue: "metric" },
      { name: "preWeight", label: "Pre-pregnancy weight", type: "number", min: 0, step: "0.1", suffix: "kg or lb" },
      { name: "height", label: "Height (cm)", type: "number", min: 0, step: "0.1", placeholder: "165" },
      { name: "heightFt", label: "Height (ft)", type: "number", min: 0, step: "1", placeholder: "5" },
      { name: "heightIn", label: "Height (in)", type: "number", min: 0, step: "0.1", placeholder: "5" },
      { name: "weeks", label: "Current pregnancy week", type: "number", min: 1, max: 42, step: "1", placeholder: "20" },
    ],
    compute(v) {
      const w = weightKgFrom(v, "preWeight");
      const h = heightCmFrom(v);
      const wErr = requirePositive(w, "Pre-pregnancy weight");
      if (wErr) return error(wErr);
      const hErr = requirePositive(h, "Height");
      if (hErr) return error(hErr);
      const weeks = parseNum(v.weeks ?? "");
      const wkErr = requirePositive(weeks, "Pregnancy week");
      if (wkErr) return error(wkErr);
      if (weeks > 42) return error("Pregnancy week must be 42 or less.");
      const preBmi = bmi(w, h);
      const range = pregnancyWeightGainRange(preBmi);
      const fraction = weeks / 40;
      const targetMid = ((range.kgLow + range.kgHigh) / 2) * Math.min(1, fraction);
      return ok([
        { label: "Pre-pregnancy BMI", value: fmt(preBmi, 1) },
        {
          label: "Total recommended gain (full term)",
          value: `${fmt(range.kgLow, 1)}–${fmt(range.kgHigh, 1)} kg (${fmt(range.kgLow / LB_KG, 0)}–${fmt(range.kgHigh / LB_KG, 0)} lb)`,
          emphasize: true,
        },
        { label: "Approx. gain by current week (mid-range)", value: `${fmt(targetMid, 1)} kg` },
        { label: "Source", value: "IOM guidelines (educational estimate)" },
      ]);
    },
  },
  {
    slug: "pregnancy-conception-calculator",
    fields: [
      {
        name: "mode",
        label: "Calculate from",
        type: "select",
        options: [
          { value: "lmp", label: "Last menstrual period (LMP)" },
          { value: "due", label: "Due date" },
        ],
        defaultValue: "lmp",
      },
      { name: "lmp", label: "LMP date", type: "date" },
      { name: "due", label: "Due date", type: "date" },
      { name: "cycle", label: "Average cycle length (days)", type: "number", min: 21, max: 45, step: "1", defaultValue: "28" },
    ],
    compute(v) {
      const cycle = parseNum(v.cycle ?? "28");
      if (!Number.isFinite(cycle) || cycle < 21 || cycle > 45) return error("Cycle length should be between 21 and 45 days.");
      const ovulationOffset = cycle - 14;
      if (v.mode === "due") {
        const due = v.due?.trim();
        if (!due) return error("Enter a due date.");
        const lmp = addDays(due, -280);
        const conception = addDays(lmp, ovulationOffset);
        return ok([
          { label: "Estimated conception date", value: conception, emphasize: true },
          { label: "Estimated LMP", value: lmp },
          { label: "Assumption", value: `Ovulation ≈ LMP + ${ovulationOffset} days (14-day luteal phase)` },
        ]);
      }
      const lmp = v.lmp?.trim();
      if (!lmp) return error("Enter LMP date.");
      const conception = addDays(lmp, ovulationOffset);
      return ok([
        { label: "Estimated conception date", value: conception, emphasize: true },
        { label: "Estimated due date", value: addDays(lmp, 280) },
        { label: "Assumption", value: `Ovulation ≈ LMP + ${ovulationOffset} days` },
      ]);
    },
  },
  {
    slug: "due-date-calculator",
    fields: [
      {
        name: "mode",
        label: "Calculate from",
        type: "select",
        options: [
          { value: "lmp", label: "Last menstrual period (LMP)" },
          { value: "conception", label: "Conception date" },
        ],
        defaultValue: "lmp",
      },
      { name: "lmp", label: "LMP date", type: "date" },
      { name: "conception", label: "Conception date", type: "date" },
    ],
    compute(v) {
      if (v.mode === "conception") {
        const c = v.conception?.trim();
        if (!c) return error("Enter conception date.");
        const due = addDays(c, 266);
        return ok([
          { label: "Estimated due date", value: due, emphasize: true },
          { label: "Method", value: "Conception + 266 days (38 weeks)" },
        ]);
      }
      const lmp = v.lmp?.trim();
      if (!lmp) return error("Enter LMP date.");
      const due = addDays(lmp, 280);
      return ok([
        { label: "Estimated due date", value: due, emphasize: true },
        { label: "Method", value: "LMP + 280 days (40 weeks)" },
      ]);
    },
  },
  {
    slug: "pace-calculator",
    fields: [
      {
        name: "distanceUnit",
        label: "Distance unit",
        type: "select",
        options: [
          { value: "km", label: "Kilometers" },
          { value: "mi", label: "Miles" },
        ],
        defaultValue: "km",
      },
      { name: "distance", label: "Distance", type: "number", min: 0, step: "0.01", placeholder: "5" },
      { name: "hours", label: "Time (hours)", type: "number", min: 0, step: "1", placeholder: "0" },
      { name: "minutes", label: "Time (minutes)", type: "number", min: 0, step: "1", placeholder: "28" },
      { name: "seconds", label: "Time (seconds)", type: "number", min: 0, step: "1", placeholder: "0" },
    ],
    compute(v) {
      let dist = parseNum(v.distance ?? "");
      const dErr = requirePositive(dist, "Distance");
      if (dErr) return error(dErr);
      if (v.distanceUnit === "mi") dist = dist * 1.609344;
      const h = parseNum(v.hours ?? "0") || 0;
      const m = parseNum(v.minutes ?? "0") || 0;
      const s = parseNum(v.seconds ?? "0") || 0;
      const totalMin = h * 60 + m + s / 60;
      if (totalMin <= 0) return error("Enter a valid time greater than zero.");
      const { paceMin, speed } = paceFromTimeDistance(totalMin, dist);
      const paceMinPart = Math.floor(paceMin);
      const paceSecPart = Math.round((paceMin - paceMinPart) * 60);
      const miPace = paceMin * 1.609344;
      const miPaceMin = Math.floor(miPace);
      const miPaceSec = Math.round((miPace - miPaceMin) * 60);
      return ok([
        { label: "Pace", value: `${paceMinPart}:${String(paceSecPart).padStart(2, "0")} min/km`, emphasize: true },
        { label: "Pace", value: `${miPaceMin}:${String(miPaceSec).padStart(2, "0")} min/mi` },
        { label: "Speed", value: `${fmt(speed, 2)} km/h` },
        { label: "Speed", value: `${fmt(speed / 1.609344, 2)} mph` },
      ]);
    },
  },
  {
    slug: "army-body-fat-calculator",
    fields: [
      { name: "units", label: "Units", type: "select", options: UNITS_OPTIONS, defaultValue: "imperial" },
      { name: "sex", label: "Sex", type: "select", options: SEX_OPTIONS },
      { name: "height", label: "Height (in)", type: "number", min: 0, step: "0.1", defaultValue: "69", suffix: "in if imperial" },
      { name: "heightCm", label: "Height (cm)", type: "number", min: 0, step: "0.1", defaultValue: "175" },
      { name: "neck", label: "Neck (at narrowest)", type: "number", min: 0, step: "0.1", suffix: "in or cm", defaultValue: "15" },
      { name: "waist", label: "Abdomen / waist", type: "number", min: 0, step: "0.1", suffix: "in or cm", defaultValue: "34" },
      { name: "hip", label: "Hip (women only)", type: "number", min: 0, step: "0.1", suffix: "in or cm", defaultValue: "38" },
    ],
    compute(v) {
      const sex = parseSex(v);
      if (!sex) return error("Select sex.");
      const heightIn =
        (v.units ?? "metric") === "imperial"
          ? parseNum(v.height ?? "")
          : lengthInFrom(v, "heightCm");
      const neckIn = lengthInFrom(v, "neck");
      const waistIn = lengthInFrom(v, "waist");
      const hipIn = lengthInFrom(v, "hip");
      const hErr = requirePositive(heightIn, "Height");
      if (hErr) return error(hErr);
      if (!Number.isFinite(neckIn) || !Number.isFinite(waistIn)) return error("Enter neck and waist measurements.");
      if (sex === "female" && (!Number.isFinite(hipIn) || hipIn <= 0)) return error("Hip measurement is required for women.");
      if (waistIn <= neckIn) return error("Waist must be greater than neck.");
      const pct = armyBodyFatPct(sex, heightIn, neckIn, waistIn, hipIn || 0);
      if (!Number.isFinite(pct) || pct < 0 || pct > 70) return error("Could not compute body fat — check measurements.");
      return ok([
        { label: "Body fat (U.S. Army / DoD circumference)", value: fmtPct(pct, 1), emphasize: true },
        { label: "Note", value: "Official screening uses age-specific maximums; this is the standard formula only." },
      ]);
    },
  },
  {
    slug: "carbohydrate-calculator",
    fields: [
      { name: "calories", label: "Daily calories", type: "number", min: 0, step: "1", placeholder: "2000" },
      {
        name: "method",
        label: "Method",
        type: "select",
        options: [
          { value: "percent", label: "% of calories from carbs" },
          { value: "gkg", label: "Grams per kg body weight" },
        ],
        defaultValue: "percent",
      },
      { name: "carbPct", label: "Carbohydrate %", type: "number", min: 0, max: 100, step: "1", defaultValue: "45" },
      { name: "units", label: "Units", type: "select", options: UNITS_OPTIONS, defaultValue: "metric" },
      { name: "weight", label: "Body weight", type: "number", min: 0, step: "0.1", placeholder: "70", suffix: "kg or lb" },
      { name: "gPerKg", label: "Carbs (g per kg)", type: "number", min: 0, step: "0.1", defaultValue: "3" },
    ],
    compute(v) {
      if (v.method === "gkg") {
        const w = weightKgFrom(v);
        const wErr = requirePositive(w, "Weight");
        if (wErr) return error(wErr);
        const gpk = parseNum(v.gPerKg ?? "");
        const gErr = requirePositive(gpk, "Grams per kg");
        if (gErr) return error(gErr);
        const grams = w * gpk;
        return ok([
          { label: "Daily carbohydrates", value: `${fmt(grams, 0)} g`, emphasize: true },
          { label: "Calories from carbs", value: `${fmt(grams * 4, 0)} kcal` },
        ]);
      }
      const cals = parseNum(v.calories ?? "");
      const cErr = requirePositive(cals, "Calories");
      if (cErr) return error(cErr);
      const pct = parseNum(v.carbPct ?? "");
      if (!Number.isFinite(pct) || pct < 0 || pct > 100) return error("Carb percentage must be between 0 and 100.");
      const grams = (cals * (pct / 100)) / 4;
      return ok([
        { label: "Daily carbohydrates", value: `${fmt(grams, 0)} g`, emphasize: true },
        { label: "Share of calories", value: fmtPct(pct, 0) },
      ]);
    },
  },
  {
    slug: "lean-body-mass-calculator",
    fields: [
      { name: "units", label: "Units", type: "select", options: UNITS_OPTIONS, defaultValue: "metric" },
      { name: "weight", label: "Weight", type: "number", min: 0, step: "0.1", placeholder: "75" },
      { name: "bodyFatPct", label: "Body fat %", type: "number", min: 0, max: 70, step: "0.1", placeholder: "18" },
    ],
    compute(v) {
      const w = weightKgFrom(v);
      const wErr = requirePositive(w, "Weight");
      if (wErr) return error(wErr);
      const bf = parseNum(v.bodyFatPct ?? "");
      if (!Number.isFinite(bf) || bf < 0 || bf >= 100) return error("Enter a valid body fat percentage (0–99).");
      const lbm = w * (1 - bf / 100);
      const fatMass = w - lbm;
      return ok([
        { label: "Lean body mass", value: `${fmt(lbm, 1)} kg (${fmt(lbm / LB_KG, 1)} lb)`, emphasize: true },
        { label: "Fat mass", value: `${fmt(fatMass, 1)} kg (${fmt(fatMass / LB_KG, 1)} lb)` },
      ]);
    },
  },
  {
    slug: "healthy-weight-calculator",
    fields: [
      { name: "units", label: "Units", type: "select", options: UNITS_OPTIONS, defaultValue: "metric" },
      { name: "height", label: "Height (cm)", type: "number", min: 0, step: "0.1", placeholder: "170" },
      { name: "heightFt", label: "Height (ft)", type: "number", min: 0, step: "1", placeholder: "5" },
      { name: "heightIn", label: "Height (in)", type: "number", min: 0, step: "0.1", placeholder: "7" },
    ],
    compute(v) {
      const h = heightCmFrom(v);
      const hErr = requirePositive(h, "Height");
      if (hErr) return error(hErr);
      const m = h / 100;
      const low = 18.5 * m * m;
      const high = 24.9 * m * m;
      return ok([
        {
          label: "Healthy weight range (BMI 18.5–24.9)",
          value: `${fmt(low, 1)}–${fmt(high, 1)} kg`,
          emphasize: true,
        },
        { label: "Healthy weight range", value: `${fmt(low / LB_KG, 1)}–${fmt(high / LB_KG, 1)} lb` },
      ]);
    },
  },
  {
    slug: "calories-burned-calculator",
    fields: [
      { name: "units", label: "Units", type: "select", options: UNITS_OPTIONS, defaultValue: "metric" },
      { name: "weight", label: "Body weight", type: "number", min: 0, step: "0.1", placeholder: "70" },
      { name: "met", label: "Activity MET value", type: "number", min: 0.1, step: "0.1", placeholder: "6", suffix: "e.g. walking 3.5, running 9.8" },
      { name: "minutes", label: "Duration (minutes)", type: "number", min: 1, step: "1", placeholder: "30" },
    ],
    compute(v) {
      const w = weightKgFrom(v);
      const wErr = requirePositive(w, "Weight");
      if (wErr) return error(wErr);
      const met = parseNum(v.met ?? "");
      const mErr = requirePositive(met, "MET value");
      if (mErr) return error(mErr);
      const minutes = parseNum(v.minutes ?? "");
      const minErr = requirePositive(minutes, "Duration");
      if (minErr) return error(minErr);
      const hours = minutes / 60;
      const kcal = met * w * hours;
      return ok([
        { label: "Calories burned (estimate)", value: `${fmt(kcal, 0)} kcal`, emphasize: true },
        { label: "Formula", value: "MET × weight (kg) × time (hours)" },
      ]);
    },
  },
  {
    slug: "one-rep-max-calculator",
    fields: [
      { name: "units", label: "Units", type: "select", options: UNITS_OPTIONS, defaultValue: "metric" },
      { name: "weight", label: "Weight lifted", type: "number", min: 0, step: "0.5", placeholder: "100", suffix: "kg or lb" },
      { name: "reps", label: "Repetitions (1–12)", type: "number", min: 1, max: 12, step: "1", placeholder: "5" },
    ],
    compute(v) {
      const w = weightKgFrom(v);
      const wErr = requirePositive(w, "Weight");
      if (wErr) return error(wErr);
      const reps = parseNum(v.reps ?? "");
      if (!Number.isFinite(reps) || reps < 1 || reps > 12) return error("Reps must be between 1 and 12 for Epley estimate.");
      const ormKg = oneRepMaxEpley(w, reps);
      return ok([
        { label: "Estimated one-rep max (Epley)", value: `${fmt(ormKg, 1)} kg (${fmt(ormKg / LB_KG, 1)} lb)`, emphasize: true },
        { label: "Training note", value: "Estimates vary; avoid max attempts without proper warm-up and spotting." },
      ]);
    },
  },
  {
    slug: "target-heart-rate-calculator",
    fields: [
      { name: "age", label: "Age", type: "number", min: 1, max: 120, step: "1", placeholder: "35" },
      { name: "restingHr", label: "Resting heart rate (optional)", type: "number", min: 30, max: 120, step: "1", placeholder: "60" },
    ],
    compute(v) {
      const age = parseNum(v.age ?? "");
      const ageErr = requirePositive(age, "Age");
      if (ageErr) return error(ageErr);
      if (age > 120) return error("Age must be 120 or less.");
      const resting = parseNum(v.restingHr ?? "0");
      const rhr = Number.isFinite(resting) && resting > 0 ? resting : 0;
      const { low, high, max } = targetHeartRate(age, rhr);
      const method = rhr > 0 ? "Karvonen (50–85% heart rate reserve)" : "Percent of max heart rate (50–85%)";
      return ok([
        { label: "Estimated max HR (220 − age)", value: `${fmt(max, 0)} bpm`, emphasize: true },
        { label: "Target zone (low)", value: `${fmt(low, 0)} bpm` },
        { label: "Target zone (high)", value: `${fmt(high, 0)} bpm` },
        { label: "Method", value: method },
      ]);
    },
  },
  {
    slug: "protein-calculator",
    fields: [
      { name: "units", label: "Units", type: "select", options: UNITS_OPTIONS, defaultValue: "metric" },
      { name: "weight", label: "Body weight", type: "number", min: 0, step: "0.1", placeholder: "70" },
      {
        name: "goal",
        label: "Goal",
        type: "select",
        options: [
          { value: "sedentary", label: "General health (0.8 g/kg)" },
          { value: "active", label: "Active / endurance (1.2 g/kg)" },
          { value: "strength", label: "Strength / muscle gain (1.6 g/kg)" },
          { value: "high", label: "High intake (2.0 g/kg)" },
        ],
        defaultValue: "active",
      },
    ],
    compute(v) {
      const w = weightKgFrom(v);
      const wErr = requirePositive(w, "Weight");
      if (wErr) return error(wErr);
      const mult: Record<string, number> = { sedentary: 0.8, active: 1.2, strength: 1.6, high: 2.0 };
      const gpk = mult[v.goal ?? "active"] ?? 1.2;
      const grams = w * gpk;
      return ok([
        { label: "Daily protein", value: `${fmt(grams, 0)} g`, emphasize: true },
        { label: "Calories from protein", value: `${fmt(grams * 4, 0)} kcal` },
        { label: "Guideline", value: `${gpk} g per kg body weight` },
      ]);
    },
  },
  {
    slug: "fat-intake-calculator",
    fields: [
      { name: "calories", label: "Daily calories", type: "number", min: 0, step: "1", placeholder: "2000" },
      { name: "fatPct", label: "Fat as % of calories", type: "number", min: 10, max: 70, step: "1", defaultValue: "30" },
    ],
    compute(v) {
      const cals = parseNum(v.calories ?? "");
      const cErr = requirePositive(cals, "Calories");
      if (cErr) return error(cErr);
      const pct = parseNum(v.fatPct ?? "");
      if (!Number.isFinite(pct) || pct < 10 || pct > 70) return error("Fat percentage is usually estimated between 10% and 70%.");
      const grams = (cals * (pct / 100)) / 9;
      return ok([
        { label: "Daily fat intake", value: `${fmt(grams, 0)} g`, emphasize: true },
        { label: "Calories from fat", value: `${fmt(grams * 9, 0)} kcal (${fmtPct(pct, 0)})` },
      ]);
    },
  },
  {
    slug: "tdee-calculator",
    fields: [
      ...anthropometryFields(bmrBaseFields),
      { name: "activity", label: "Activity level", type: "select", options: ACTIVITY_OPTIONS, defaultValue: "moderate" },
    ],
    compute(v) {
      const block = computeBmrBlock(v);
      if (isCalcResult(block)) return block;
      const { bmr: b } = block;
      const act = v.activity ?? "moderate";
      const total = tdee(b, act);
      const activityCals = total - b;
      return ok(
        [
          { label: "BMR", value: `${fmt(b, 0)} kcal/day` },
          { label: "TDEE (maintenance)", value: `${fmt(total, 0)} kcal/day`, emphasize: true },
          { label: "Suggested weight loss (~500 kcal/day)", value: `${fmt(total - 500, 0)} kcal/day` },
          { label: "Suggested weight gain (~500 kcal/day)", value: `${fmt(total + 500, 0)} kcal/day` },
        ],
        {
          breakdown: [
            { label: "BMR", value: b, color: INK },
            { label: "Activity", value: Math.max(0, activityCals), color: BRAND },
          ],
          table: {
            caption: "Daily calorie targets",
            headers: ["Goal", "kcal/day"],
            rows: [
              ["Maintenance (TDEE)", fmt(total, 0)],
              ["Moderate deficit (−500)", fmt(total - 500, 0)],
              ["Moderate surplus (+500)", fmt(total + 500, 0)],
            ],
          },
        },
      );
    },
  },
  {
    slug: "ovulation-calculator",
    fields: [
      { name: "lmp", label: "First day of last period (LMP)", type: "date" },
      { name: "cycle", label: "Average cycle length (days)", type: "number", min: 21, max: 45, step: "1", defaultValue: "28" },
    ],
    compute(v) {
      const lmp = v.lmp?.trim();
      if (!lmp) return error("Enter LMP date.");
      const cycle = parseNum(v.cycle ?? "28");
      if (!Number.isFinite(cycle) || cycle < 21 || cycle > 45) return error("Cycle length should be between 21 and 45 days.");
      const ovulation = addDays(lmp, cycle - 14);
      const fertileStart = addDays(ovulation, -5);
      const fertileEnd = addDays(ovulation, 1);
      return ok([
        { label: "Estimated ovulation", value: ovulation, emphasize: true },
        { label: "Fertile window (estimate)", value: `${fertileStart} – ${fertileEnd}` },
        { label: "Next period (estimate)", value: addDays(lmp, cycle) },
      ]);
    },
  },
  {
    slug: "conception-calculator",
    fields: [
      {
        name: "mode",
        label: "Known date",
        type: "select",
        options: [
          { value: "lmp", label: "Last menstrual period" },
          { value: "due", label: "Due date" },
        ],
        defaultValue: "lmp",
      },
      { name: "lmp", label: "LMP date", type: "date" },
      { name: "due", label: "Due date", type: "date" },
      { name: "cycle", label: "Cycle length (days)", type: "number", min: 21, max: 45, step: "1", defaultValue: "28" },
    ],
    compute(v) {
      const cycle = parseNum(v.cycle ?? "28");
      if (!Number.isFinite(cycle) || cycle < 21 || cycle > 45) return error("Cycle length should be between 21 and 45 days.");
      const ovulationOffset = cycle - 14;
      if (v.mode === "due") {
        const due = v.due?.trim();
        if (!due) return error("Enter due date.");
        const lmp = addDays(due, -280);
        const conception = addDays(lmp, ovulationOffset);
        return ok([
          { label: "Estimated conception date", value: conception, emphasize: true },
          { label: "Estimated LMP", value: lmp },
        ]);
      }
      const lmp = v.lmp?.trim();
      if (!lmp) return error("Enter LMP date.");
      return ok([
        { label: "Estimated conception date", value: addDays(lmp, ovulationOffset), emphasize: true },
        { label: "Estimated due date", value: addDays(lmp, 280) },
      ]);
    },
  },
  {
    slug: "period-calculator",
    fields: [
      { name: "lmp", label: "First day of last period", type: "date" },
      { name: "cycle", label: "Average cycle length (days)", type: "number", min: 21, max: 45, step: "1", defaultValue: "28" },
      { name: "periodLength", label: "Period length (days)", type: "number", min: 2, max: 10, step: "1", defaultValue: "5" },
    ],
    compute(v) {
      const lmp = v.lmp?.trim();
      if (!lmp) return error("Enter the first day of your last period.");
      const cycle = parseNum(v.cycle ?? "28");
      if (!Number.isFinite(cycle) || cycle < 21 || cycle > 45) return error("Cycle length should be between 21 and 45 days.");
      const plen = parseNum(v.periodLength ?? "5");
      if (!Number.isFinite(plen) || plen < 2 || plen > 10) return error("Period length is usually 2–10 days.");
      const nextStart = addDays(lmp, cycle);
      const nextEnd = addDays(nextStart, plen - 1);
      const following = addDays(nextStart, cycle);
      return ok([
        { label: "Next period start", value: nextStart, emphasize: true },
        { label: "Next period end (estimate)", value: nextEnd },
        { label: "Following period start", value: following },
      ]);
    },
  },
  {
    slug: "gfr-calculator",
    fields: [
      { name: "sex", label: "Sex", type: "select", options: SEX_OPTIONS },
      { name: "age", label: "Age", type: "number", min: 18, max: 120, step: "1", defaultValue: "45" },
      {
        name: "creatinine",
        label: "Serum creatinine",
        type: "number",
        min: 0,
        step: "0.01",
        defaultValue: "1.0",
        suffix: "mg/dL (U.S. units)",
      },
    ],
    compute(v) {
      const sex = parseSex(v);
      if (!sex) return error("Select sex.");
      const age = parseNum(v.age ?? "");
      if (!Number.isFinite(age) || age < 18) return error("Age must be at least 18 for this adult eGFR equation.");
      const cr = parseNum(v.creatinine ?? "");
      const crErr = requirePositive(cr, "Creatinine");
      if (crErr) return error(crErr);
      const egfr = gfrCkdEpi(sex, age, cr);
      let stage = "G1 (normal or high)";
      if (egfr < 15) stage = "G5 (kidney failure)";
      else if (egfr < 30) stage = "G4 (severely decreased)";
      else if (egfr < 45) stage = "G3b (moderately to severely decreased)";
      else if (egfr < 60) stage = "G3a (mildly to moderately decreased)";
      else if (egfr < 90) stage = "G2 (mildly decreased)";
      return ok([
        { label: "eGFR (CKD-EPI 2021)", value: `${fmt(egfr, 0)} mL/min/1.73 m²`, emphasize: true },
        { label: "CKD stage (creatinine-based estimate)", value: stage },
        { label: "Disclaimer", value: "Not a diagnosis — confirm with a clinician and lab context." },
      ]);
    },
  },
  {
    slug: "body-type-calculator",
    fields: anthropometryFields([
      { name: "weight", label: "Weight", type: "number", min: 0, step: "0.1", placeholder: "70" },
      { name: "height", label: "Height (cm)", type: "number", min: 0, step: "0.1", placeholder: "175" },
      { name: "heightFt", label: "Height (ft)", type: "number", min: 0, step: "1", placeholder: "5" },
      { name: "heightIn", label: "Height (in)", type: "number", min: 0, step: "0.1", placeholder: "9" },
      { name: "wrist", label: "Wrist circumference", type: "number", min: 0, step: "0.1", suffix: "cm or in", placeholder: "17" },
    ]),
    compute(v) {
      const sex = parseSex(v);
      if (!sex) return error("Select sex.");
      const w = weightKgFrom(v);
      const h = heightCmFrom(v);
      const wErr = requirePositive(w, "Weight");
      if (wErr) return error(wErr);
      const hErr = requirePositive(h, "Height");
      if (hErr) return error(hErr);
      const wrist = lengthCmFrom(v, "wrist");
      const wrErr = requirePositive(wrist, "Wrist circumference");
      if (wrErr) return error(wrErr);
      const bmiVal = bmi(w, h);
      const frame = frameSize(sex, h, wrist);
      const type = bodyTypeHeuristic(sex, bmiVal, frame);
      return ok([
        { label: "Suggested body type", value: type, emphasize: true },
        { label: "Frame size (wrist vs height)", value: frame },
        { label: "BMI", value: `${fmt(bmiVal, 1)} (${bmiCategory(bmiVal)})` },
        { label: "Note", value: "Somatotype labels are rough estimates, not medical classifications." },
      ]);
    },
  },
  {
    slug: "body-surface-area-calculator",
    fields: [
      { name: "units", label: "Units", type: "select", options: UNITS_OPTIONS, defaultValue: "metric" },
      { name: "weight", label: "Weight", type: "number", min: 0, step: "0.1", placeholder: "70" },
      { name: "height", label: "Height (cm)", type: "number", min: 0, step: "0.1", placeholder: "175" },
      { name: "heightFt", label: "Height (ft)", type: "number", min: 0, step: "1", placeholder: "5" },
      { name: "heightIn", label: "Height (in)", type: "number", min: 0, step: "0.1", placeholder: "9" },
    ],
    compute(v) {
      const w = weightKgFrom(v);
      const h = heightCmFrom(v);
      const wErr = requirePositive(w, "Weight");
      if (wErr) return error(wErr);
      const hErr = requirePositive(h, "Height");
      if (hErr) return error(hErr);
      const bsa = bodySurfaceAreaMosteller(w, h);
      return ok([
        { label: "Body surface area (Mosteller)", value: `${fmt(bsa, 2)} m²`, emphasize: true },
      ]);
    },
  },
  {
    slug: "bac-calculator",
    fields: [
      { name: "units", label: "Units", type: "select", options: UNITS_OPTIONS, defaultValue: "metric" },
      { name: "sex", label: "Sex", type: "select", options: SEX_OPTIONS },
      { name: "weight", label: "Body weight", type: "number", min: 0, step: "0.1", placeholder: "75" },
      { name: "drinks", label: "Standard drinks consumed", type: "number", min: 0, step: "0.5", placeholder: "3", suffix: "1 drink ≈ 14 g alcohol" },
      { name: "hours", label: "Hours since first drink", type: "number", min: 0, step: "0.25", placeholder: "2" },
    ],
    compute(v) {
      const sex = parseSex(v);
      if (!sex) return error("Select sex.");
      const w = weightKgFrom(v);
      const wErr = requirePositive(w, "Weight");
      if (wErr) return error(wErr);
      const drinks = parseNum(v.drinks ?? "");
      if (!Number.isFinite(drinks) || drinks < 0) return error("Enter standard drinks (0 or more).");
      const hours = parseNum(v.hours ?? "0");
      if (!Number.isFinite(hours) || hours < 0) return error("Enter hours since drinking started (0 or more).");
      const alcoholGrams = drinks * 14;
      const bac = widmarkBac(alcoholGrams, w, sex, hours);
      return ok([
        { label: "Estimated BAC (Widmark)", value: fmtPct(bac, 3), emphasize: true },
        { label: "Alcohol consumed", value: `${fmt(alcoholGrams, 0)} g (${fmt(drinks, 1)} standard drinks)` },
        { label: "Disclaimer", value: "Estimate only — never drive if impaired; laws vary by region." },
      ]);
    },
  },
  {
    slug: "anorexic-bmi-calculator",
    fields: bmiFields,
    compute(v) {
      const base = computeBmi(v);
      if ("error" in base) return base;
      const w = weightKgFrom(v);
      const h = heightCmFrom(v);
      const val = bmi(w, h);
      let note =
        "BMI is a screening tool, not a diagnosis. Eating disorders require professional evaluation and support.";
      if (val < 17.5) {
        note =
          "BMI under 17.5 is sometimes cited in clinical literature as a severity marker for underweight — not a diagnosis. If you are struggling with food or weight, seek qualified medical help.";
      } else if (val < 18.5) {
        note = "Underweight BMI may warrant medical follow-up. This calculator does not provide medical advice.";
      }
      const rows = [...(base as { rows: { label: string; value: string; emphasize?: boolean }[] }).rows];
      rows.push({ label: "Educational note", value: note });
      return ok(rows);
    },
  },
  {
    slug: "weight-watcher-points-calculator",
    fields: [
      { name: "calories", label: "Calories per serving", type: "number", min: 0, step: "1", placeholder: "250" },
      { name: "fatG", label: "Fat (grams)", type: "number", min: 0, step: "0.1", placeholder: "12" },
      { name: "fiberG", label: "Dietary fiber (grams)", type: "number", min: 0, step: "0.1", placeholder: "3" },
    ],
    compute(v) {
      const cals = parseNum(v.calories ?? "");
      const fat = parseNum(v.fatG ?? "");
      const fiber = parseNum(v.fiberG ?? "0");
      if (!Number.isFinite(cals) || cals < 0) return error("Enter valid calories.");
      if (!Number.isFinite(fat) || fat < 0) return error("Enter valid fat grams.");
      if (!Number.isFinite(fiber) || fiber < 0) return error("Enter valid fiber grams.");
      const raw = cals / 50 + fat / 12 - Math.min(fiber, 4) / 5;
      const points = Math.max(1, round(raw * 2, 0) / 2);
      return ok([
        { label: "Estimated Points (legacy formula)", value: fmt(points, 1), emphasize: true },
        { label: "Formula (approx.)", value: "calories÷50 + fat÷12 − min(fiber,4)÷5, rounded to nearest 0.5, min 1" },
        { label: "Note", value: "Weight Watchers / WW plans changed over time; this is an unofficial estimate only." },
      ]);
    },
  },
  {
    slug: "overweight-calculator",
    fields: bmiFields,
    compute(v) {
      const w = weightKgFrom(v);
      const h = heightCmFrom(v);
      const wErr = requirePositive(w, "Weight");
      if (wErr) return error(wErr);
      const hErr = requirePositive(h, "Height");
      if (hErr) return error(hErr);
      const val = bmi(w, h);
      const m = h / 100;
      const maxNormal = 24.9 * m * m;
      const at25 = 25 * m * m;
      const excess = w - at25;
      const toNormal = w - maxNormal;
      const rows: { label: string; value: string; emphasize?: boolean }[] = [
        { label: "BMI", value: fmt(val, 1), emphasize: true },
        { label: "Category", value: bmiCategory(val) },
      ];
      if (val >= 25) {
        rows.push({
          label: "Weight above BMI 25 threshold",
          value: `${fmt(Math.max(0, excess), 1)} kg (${fmt(Math.max(0, excess) / LB_KG, 1)} lb)`,
        });
        rows.push({
          label: "Approx. loss to reach BMI 24.9",
          value: `${fmt(Math.max(0, toNormal), 1)} kg (${fmt(Math.max(0, toNormal) / LB_KG, 1)} lb)`,
        });
      } else {
        rows.push({ label: "Relative to overweight threshold", value: "Below BMI 25 (not overweight by this definition)" });
      }
      return ok(rows);
    },
  },
];
