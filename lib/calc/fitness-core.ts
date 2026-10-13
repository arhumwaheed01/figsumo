/** Shared fitness / health formulas. */

export function bmi(weightKg: number, heightCm: number): number {
  const m = heightCm / 100;
  return weightKg / (m * m);
}

export function bmiCategory(value: number): string {
  if (value < 18.5) return "Underweight";
  if (value < 25) return "Normal";
  if (value < 30) return "Overweight";
  return "Obese";
}

export function bmrMifflin(sex: "male" | "female", weightKg: number, heightCm: number, age: number): number {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return sex === "male" ? base + 5 : base - 161;
}

const ACTIVITY: Record<string, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very: 1.9,
};

export function tdee(bmr: number, activity: string): number {
  return bmr * (ACTIVITY[activity] ?? 1.2);
}

export function idealWeightRobinson(sex: "male" | "female", heightCm: number): number {
  const inches = heightCm / 2.54;
  const over5 = Math.max(0, inches - 60);
  return sex === "male" ? 52 + 1.9 * over5 : 49 + 1.7 * over5;
}

export function bodyFatNavy(sex: "male" | "female", heightCm: number, neckCm: number, waistCm: number, hipCm = 0): number {
  if (sex === "male") {
    return (
      495 /
        (1.0324 -
          0.19077 * Math.log10(waistCm - neckCm) +
          0.15456 * Math.log10(heightCm)) -
      450
    );
  }
  return (
    495 /
      (1.29579 -
        0.35004 * Math.log10(waistCm + hipCm - neckCm) +
        0.221 * Math.log10(heightCm)) -
    450
  );
}

export function addDays(iso: string, days: number): string {
  const d = new Date(iso + "T12:00:00");
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export function paceFromTimeDistance(minutes: number, distance: number): { paceMin: number; speed: number } {
  return { paceMin: minutes / distance, speed: distance / (minutes / 60) };
}

export function oneRepMaxEpley(weight: number, reps: number): number {
  if (reps <= 1) return weight;
  return weight * (1 + reps / 30);
}

export function targetHeartRate(age: number, resting = 0): { low: number; high: number; max: number } {
  const max = 220 - age;
  if (resting > 0) {
    const hrr = max - resting;
    return { max, low: resting + 0.5 * hrr, high: resting + 0.85 * hrr };
  }
  return { max, low: 0.5 * max, high: 0.85 * max };
}

export function gfrCkdEpi(sex: "male" | "female", age: number, creatinineMgDl: number): number {
  const kappa = sex === "female" ? 0.7 : 0.9;
  const alpha = sex === "female" ? -0.241 : -0.302;
  const min = Math.min(creatinineMgDl / kappa, 1);
  const max = Math.max(creatinineMgDl / kappa, 1);
  const sexFactor = sex === "female" ? 1.012 : 1;
  return 142 * Math.pow(min, alpha) * Math.pow(max, -1.2) * Math.pow(0.9938, age) * sexFactor;
}

export function bodySurfaceAreaMosteller(weightKg: number, heightCm: number): number {
  return Math.sqrt((heightCm * weightKg) / 3600);
}

export function widmarkBac(
  alcoholGrams: number,
  weightKg: number,
  sex: "male" | "female",
  hours: number,
): number {
  const r = sex === "male" ? 0.68 : 0.55;
  return Math.max(0, alcoholGrams / (weightKg * 1000 * r) * 100 - 0.015 * hours);
}
