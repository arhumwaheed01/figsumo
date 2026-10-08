export const SITE_NAME = "Figsumo";
export const SITE_URL = "https://figsumo.com";
export const SITE_TAGLINE = "Free calculators for jobs people actually search.";
export const CONTACT_EMAIL = "hello@figsumo.com";

export type CalculatorMeta = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  group: string;
  formula: string;
  example: string;
  whenWrong: string;
};

export const CALCULATORS: CalculatorMeta[] = [
  {
    slug: "concrete-calculator",
    title: "Concrete Calculator",
    shortTitle: "Concrete",
    description: "Estimate cubic yards and 80 lb bags from length, width, and depth.",
    group: "Jobsite",
    formula:
      "Cubic yards = (length × width × depth in feet) ÷ 27. Bags ≈ cubic yards × 45 for 80 lb bags (about 0.022 yd³ each).",
    example: "A 10 ft × 10 ft slab poured 4 in deep needs about 1.23 yd³, or roughly 56 bags of 80 lb concrete.",
    whenWrong:
      "This assumes a flat rectangle. Slopes, footings, waste, and over-excavation are not included. Always order a little extra.",
  },
  {
    slug: "paint-calculator",
    title: "Paint Calculator",
    shortTitle: "Paint",
    description: "Estimate gallons from wall area, coats, coverage, doors, and windows.",
    group: "Jobsite",
    formula:
      "Gallons = ((wall length × height − door area − window area) × coats) ÷ coverage per gallon.",
    example:
      "A 12 ft × 8 ft wall with 2 coats at 350 sq ft/gal needs about 0.55 gallons (buy 1 gallon).",
    whenWrong:
      "Texture, primer, dark colors, and porous surfaces use more paint. Coverage on the can is usually optimistic.",
  },
  {
    slug: "tile-calculator",
    title: "Tile Calculator",
    shortTitle: "Tile",
    description: "Count tiles for a room, including grout gap and 10% waste.",
    group: "Jobsite",
    formula:
      "Tiles along each side = ceil(room size ÷ (tile size + grout)). Total = length count × width count, then add 10% waste.",
    example:
      "An 8 ft × 10 ft room with 12 in tiles and a 1/8 in grout gap needs about 88 tiles including 10% waste.",
    whenWrong:
      "Diagonal layouts, niches, and cuts increase waste. Complex patterns often need 15% or more.",
  },
  {
    slug: "overtime-calculator",
    title: "Overtime Calculator",
    shortTitle: "Overtime",
    description: "Estimate regular pay, overtime pay, and total from hourly rates.",
    group: "Paycheck",
    formula:
      "Regular pay = rate × regular hours. Overtime pay = rate × overtime hours × multiplier (default 1.5). Total = regular + overtime.",
    example:
      "At $20/hour with 40 regular hours and 5 overtime hours at 1.5×: $800 regular + $150 overtime = $950.",
    whenWrong:
      "US-style estimate only. State rules, salaried exemptions, double time, and premiums differ. Not legal advice.",
  },
  {
    slug: "age-calculator",
    title: "Age Calculator",
    shortTitle: "Age",
    description: "Find years, months, and days between a birth date and today or another date.",
    group: "Everyday",
    formula:
      "Age = end date − birth date, expressed as whole years, then remaining months, then remaining days.",
    example: "Born March 10, 1990; as of March 10, 2025 the age is 35 years, 0 months, 0 days.",
    whenWrong:
      "Leap days and time zones can shift the day count by one. This does not handle time of day.",
  },
  {
    slug: "gpa-calculator",
    title: "GPA Calculator",
    shortTitle: "GPA",
    description: "Compute a 4.0-scale GPA from course credits and letter grades.",
    group: "School",
    formula:
      "GPA = Σ(grade points × credits) ÷ Σ(credits). Standard 4.0 scale: A=4, B=3, C=2, D=1, F=0 (plus/minus variants included).",
    example: "3 credits A (4.0) and 3 credits B (3.0) → GPA = (12 + 9) ÷ 6 = 3.5.",
    whenWrong:
      "Schools weight AP/honors differently and may use unique scales. Check your transcript policy.",
  },
  {
    slug: "postage-calculator",
    title: "Postage Calculator",
    shortTitle: "Postage",
    description: "Rough domestic US letter and flat postage by weight in ounces.",
    group: "Everyday",
    formula:
      "Look up weight in a simple letter vs large envelope (flat) rate table. Rates are a guide and change.",
    example: "A 1 oz First-Class letter is typically the base letter rate; a 3 oz flat costs more.",
    whenWrong:
      "Not USPS. Shape, thickness, destination, and current rates matter. Confirm at usps.com before mailing.",
  },
  {
    slug: "tip-calculator",
    title: "Tip Calculator",
    shortTitle: "Tip",
    description: "Split tip and total across people with common tip percents.",
    group: "Everyday",
    formula: "Tip = bill × tip percent. Total = bill + tip. Per person = total ÷ number of people.",
    example: "A $60 bill with 20% tip split by 3 people: tip $12, total $72, $24 each.",
    whenWrong:
      "Some restaurants include service charge. Tip on pre-tax or post-tax is a personal choice.",
  },
];

export const CALCULATOR_GROUPS = ["Jobsite", "Paycheck", "School", "Everyday"] as const;

export function getCalculator(slug: string): CalculatorMeta | undefined {
  return CALCULATORS.find((c) => c.slug === slug);
}
