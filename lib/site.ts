export const SITE_NAME = "Figsumo";
export const SITE_URL = "https://figsumo.com";
export const SITE_TAGLINE = "Free online calculators.";
export const CONTACT_EMAIL = "hello@figsumo.com";

export type CalculatorMeta = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  group: "Home and build" | "Work and money" | "Other";
  formula: string;
  example: string;
  whenWrong: string;
};

export const HOME_GROUPS: {
  name: CalculatorMeta["group"];
  slugs: string[];
}[] = [
  {
    name: "Home and build",
    slugs: ["concrete-calculator", "paint-calculator", "tile-calculator"],
  },
  {
    name: "Work and money",
    slugs: ["overtime-calculator", "tip-calculator"],
  },
  {
    name: "Other",
    slugs: ["age-calculator", "gpa-calculator", "postage-calculator"],
  },
];

export const CALCULATORS: CalculatorMeta[] = [
  {
    slug: "concrete-calculator",
    title: "Concrete Calculator",
    shortTitle: "Concrete",
    description: "Cubic yards and 80 lb bags from length, width, and depth.",
    group: "Home and build",
    formula:
      "Cubic yards = (length × width × depth in feet) ÷ 27. Bags ≈ cubic yards × 45 for 80 lb bags (about 0.022 yd³ each).",
    example:
      "A 10 ft × 10 ft slab poured 4 in deep needs about 1.23 yd³, or roughly 56 bags of 80 lb concrete.",
    whenWrong:
      "This assumes a flat rectangle. Slopes, footings, and waste are not included.",
  },
  {
    slug: "paint-calculator",
    title: "Paint Calculator",
    shortTitle: "Paint",
    description: "Gallons for a wall from size, coats, coverage, doors, and windows.",
    group: "Home and build",
    formula:
      "Gallons = ((wall length × height − door area − window area) × coats) ÷ coverage per gallon.",
    example:
      "A 12 ft × 8 ft wall, minus 20 sq ft door and 15 sq ft window, with 2 coats at 350 sq ft/gal needs about 0.35 gallons (buy 1 gallon).",
    whenWrong:
      "Texture, primer, and dark colors often use more paint than the can suggests.",
  },
  {
    slug: "tile-calculator",
    title: "Tile Calculator",
    shortTitle: "Tile",
    description: "Tiles for a room with size, grout gap, and 10% waste.",
    group: "Home and build",
    formula:
      "Tiles along each side = ceil(room size ÷ (tile size + grout)). Total = length count × width count, then add 10% waste.",
    example:
      "An 8 ft × 10 ft room with 12 in tiles and a 1/8 in grout gap needs about 88 tiles including 10% waste.",
    whenWrong:
      "Diagonal layouts and complex cuts often need more than 10% waste.",
  },
  {
    slug: "overtime-calculator",
    title: "Overtime Calculator",
    shortTitle: "Overtime",
    description: "Regular pay, overtime pay, and total from an hourly rate.",
    group: "Work and money",
    formula:
      "Regular pay = rate × regular hours. Overtime pay = rate × overtime hours × multiplier (default 1.5). Total = regular + overtime.",
    example:
      "At $20/hour with 40 regular hours and 5 overtime hours at 1.5×: $800 regular + $150 overtime = $950.",
    whenWrong:
      "US-style estimate only. State rules and exemptions differ. Not legal advice.",
  },
  {
    slug: "tip-calculator",
    title: "Tip Calculator",
    shortTitle: "Tip",
    description: "Tip, total, and per-person split from a bill amount.",
    group: "Work and money",
    formula:
      "Tip = bill × tip percent. Total = bill + tip. Per person = total ÷ number of people.",
    example:
      "A $60 bill with 20% tip split by 3 people: tip $12, total $72, $24 each.",
    whenWrong:
      "A service charge on the bill is not the same as a tip.",
  },
  {
    slug: "age-calculator",
    title: "Age Calculator",
    shortTitle: "Age",
    description: "Years, months, and days between two dates.",
    group: "Other",
    formula:
      "Age = end date − birth date, as whole years, then remaining months, then remaining days.",
    example:
      "Born March 10, 1990; as of March 10, 2025 the age is 35 years, 0 months, 0 days.",
    whenWrong:
      "Leap days and time zones can shift the day count by one.",
  },
  {
    slug: "gpa-calculator",
    title: "GPA Calculator",
    shortTitle: "GPA",
    description: "Weighted GPA on a 4.0 scale from credits and letter grades.",
    group: "Other",
    formula:
      "GPA = Σ(grade points × credits) ÷ Σ(credits). A=4, B=3, C=2, D=1, F=0 (plus/minus included).",
    example:
      "3 credits A (4.0) and 3 credits B (3.0) → GPA = (12 + 9) ÷ 6 = 3.5.",
    whenWrong:
      "Schools may weight AP or honors differently. Check your transcript policy.",
  },
  {
    slug: "postage-calculator",
    title: "Postage Calculator",
    shortTitle: "Postage",
    description: "Rough domestic US letter and flat postage by weight.",
    group: "Other",
    formula:
      "Look up weight in a simple letter vs large envelope (flat) rate table. Rates are a guide and change.",
    example:
      "A 1 oz domestic letter is about $0.73 on this guide; a heavier flat costs more.",
    whenWrong:
      "Not USPS. Confirm current rates at usps.com before you mail.",
  },
];

export function getCalculator(slug: string): CalculatorMeta | undefined {
  return CALCULATORS.find((c) => c.slug === slug);
}
