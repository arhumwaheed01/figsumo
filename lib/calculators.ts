export type CalculatorStatus = "live" | "planned";

export type CalculatorEntry = {
  title: string;
  slug: string;
  path: string;
  status: CalculatorStatus;
  description: string;
};

export type CalculatorCategory = {
  id: string;
  title: string;
  shortTitle: string;
  path: string;
  description: string;
  items: CalculatorEntry[];
};

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function tool(
  title: string,
  status: CalculatorStatus = "live",
  slug = slugify(title),
): CalculatorEntry {
  return {
    title,
    slug,
    path: `/${slug}`,
    status,
    description: `Free online ${title.toLowerCase()}.`,
  };
}

function tools(...titles: string[]): CalculatorEntry[] {
  return titles.map((title) => tool(title));
}

export const calculatorCategories: CalculatorCategory[] = [
  {
    id: "financial",
    title: "Financial Calculators",
    shortTitle: "Financial",
    path: "/financial-calculators",
    description:
      "Mortgage, loan, tax, investment, retirement, and other money calculators.",
    items: tools(
      "Mortgage Calculator",
      "Loan Calculator",
      "Auto Loan Calculator",
      "Interest Calculator",
      "Payment Calculator",
      "Retirement Calculator",
      "Amortization Calculator",
      "Investment Calculator",
      "Currency Calculator",
      "Inflation Calculator",
      "Finance Calculator",
      "Mortgage Payoff Calculator",
      "Income Tax Calculator",
      "Compound Interest Calculator",
      "Salary Calculator",
      "401K Calculator",
      "Interest Rate Calculator",
      "Sales Tax Calculator",
      "House Affordability Calculator",
      "Savings Calculator",
      "Rent Calculator",
      "Marriage Tax Calculator",
      "Estate Tax Calculator",
      "Pension Calculator",
      "Social Security Calculator",
      "Annuity Calculator",
      "Annuity Payout Calculator",
      "Credit Card Calculator",
      "Credit Cards Payoff Calculator",
      "Debt Payoff Calculator",
      "Debt Consolidation Calculator",
      "Repayment Calculator",
      "Student Loan Calculator",
      "College Cost Calculator",
      "Simple Interest Calculator",
      "CD Calculator",
      "Bond Calculator",
      "Mutual Fund Calculator",
      "Roth IRA Calculator",
      "IRA Calculator",
      "RMD Calculator",
      "VAT Calculator",
      "Cash Back or Low Interest Calculator",
      "Auto Lease Calculator",
      "Depreciation Calculator",
      "Average Return Calculator",
      "Margin Calculator",
      "Discount Calculator",
      "Business Loan Calculator",
      "Debt-to-Income Ratio Calculator",
      "Real Estate Calculator",
      "Take-Home-Paycheck Calculator",
      "Personal Loan Calculator",
      "Boat Loan Calculator",
      "Lease Calculator",
      "Refinance Calculator",
      "Budget Calculator",
      "Rental Property Calculator",
      "IRR Calculator",
      "ROI Calculator",
      "APR Calculator",
      "FHA Loan Calculator",
      "VA Mortgage Calculator",
      "Home Equity Loan Calculator",
      "HELOC Calculator",
      "Down Payment Calculator",
      "Rent vs. Buy Calculator",
      "Payback Period Calculator",
      "Present Value Calculator",
      "Future Value Calculator",
      "Commission Calculator",
      "Mortgage Calculator UK",
      "Canadian Mortgage Calculator",
      "Mortgage Amortization Calculator",
      "Percent Off Calculator",
    ),
  },
  {
    id: "fitness-health",
    title: "Fitness and Health Calculators",
    shortTitle: "Fitness",
    path: "/fitness-health-calculators",
    description:
      "BMI, calories, body fat, pregnancy, macros, and other health tools.",
    items: tools(
      "BMI Calculator",
      "Calorie Calculator",
      "Body Fat Calculator",
      "BMR Calculator",
      "Macro Calculator",
      "Ideal Weight Calculator",
      "Pregnancy Calculator",
      "Pregnancy Weight Gain Calculator",
      "Pregnancy Conception Calculator",
      "Due Date Calculator",
      "Pace Calculator",
      "Army Body Fat Calculator",
      "Carbohydrate Calculator",
      "Lean Body Mass Calculator",
      "Healthy Weight Calculator",
      "Calories Burned Calculator",
      "One Rep Max Calculator",
      "Target Heart Rate Calculator",
      "Protein Calculator",
      "Fat Intake Calculator",
      "TDEE Calculator",
      "Ovulation Calculator",
      "Conception Calculator",
      "Period Calculator",
      "GFR Calculator",
      "Body Type Calculator",
      "Body Surface Area Calculator",
      "BAC Calculator",
      "Anorexic BMI Calculator",
      "Weight Watcher Points Calculator",
      "Overweight Calculator",
    ),
  },
  {
    id: "math",
    title: "Math Calculators",
    shortTitle: "Math",
    path: "/math-calculators",
    description:
      "Scientific, fraction, percentage, geometry, statistics, and algebra tools.",
    items: [
      tool("Scientific Calculator", "live", "scientific-calculator"),
      ...tools(
        "Fraction Calculator",
        "Percentage Calculator",
        "Triangle Calculator",
        "Volume Calculator",
        "Standard Deviation Calculator",
        "Random Number Generator",
        "Number Sequence Calculator",
        "Percent Error Calculator",
        "Exponent Calculator",
        "Binary Calculator",
        "Hex Calculator",
        "Half-Life Calculator",
        "Quadratic Formula Calculator",
        "Slope Calculator",
        "Log Calculator",
        "Area Calculator",
        "Sample Size Calculator",
        "Probability Calculator",
        "Statistics Calculator",
        "Mean, Median, Mode, Range Calculator",
        "Permutation and Combination Calculator",
        "Z-score Calculator",
        "Confidence Interval Calculator",
        "Ratio Calculator",
        "Distance Calculator",
        "Circle Calculator",
        "Surface Area Calculator",
        "Pythagorean Theorem Calculator",
        "Right Triangle Calculator",
        "Root Calculator",
        "Least Common Multiple Calculator",
        "Greatest Common Factor Calculator",
        "Factor Calculator",
        "Rounding Calculator",
        "Matrix Calculator",
        "Scientific Notation Calculator",
        "Big Number Calculator",
        "Prime Factorization Calculator",
        "Common Factor Calculator",
        "Basic Calculator",
        "Long Division Calculator",
        "Average Calculator",
        "P-value Calculator",
      ),
    ],
  },
  {
    id: "other",
    title: "Other Calculators",
    shortTitle: "Other",
    path: "/other-calculators",
    description:
      "Age, date, time, GPA, conversion, construction, and everyday tools.",
    items: tools(
      "Age Calculator",
      "Date Calculator",
      "Time Calculator",
      "Hours Calculator",
      "GPA Calculator",
      "Grade Calculator",
      "Height Calculator",
      "Concrete Calculator",
      "IP Subnet Calculator",
      "Bra Size Calculator",
      "Password Generator",
      "Dice Roller",
      "Conversion Calculator",
      "Fuel Cost Calculator",
      "Voltage Drop Calculator",
      "BTU Calculator",
      "Square Footage Calculator",
      "Time Card Calculator",
      "Time Zone Calculator",
      "Love Calculator",
      "GDP Calculator",
      "Gas Mileage Calculator",
      "Horsepower Calculator",
      "Engine Horsepower Calculator",
      "Stair Calculator",
      "Resistor Calculator",
      "Ohms Law Calculator",
      "Electricity Calculator",
      "Shoe Size Conversion",
      "Tip Calculator",
      "Mileage Calculator",
      "Density Calculator",
      "Mass Calculator",
      "Weight Calculator",
      "Speed Calculator",
      "Molarity Calculator",
      "Molecular Weight Calculator",
      "Roman Numeral Converter",
      "Golf Handicap Calculator",
      "Sleep Calculator",
      "Tire Size Calculator",
      "Roofing Calculator",
      "Tile Calculator",
      "Mulch Calculator",
      "Gravel Calculator",
      "Wind Chill Calculator",
      "Heat Index Calculator",
      "Dew Point Calculator",
      "Bandwidth Calculator",
      "Base64 Encode / Decode",
      "URL Encode / Decode",
      "Time Duration Calculator",
      "Day Counter",
      "Day of the Week Calculator",
    ),
  },
  {
    id: "for-your-site",
    title: "Calculators for Your Site",
    shortTitle: "Embed",
    path: "/calculators-for-your-site",
    description:
      "Embeddable calculators you can add to your own website.",
    items: tools(
      "Mortgage Calculator for Your Site",
      "Math Calculator for Your Site",
      "Scientific Calculator for Your Site",
      "Love Calculator for Your Site",
      "Concrete Calculator for Your Site",
    ),
  },
];

export const allCalculators: CalculatorEntry[] =
  calculatorCategories.flatMap((category) => category.items);

export const liveCalculators = allCalculators.filter((c) => c.status === "live");

export function getCalculatorBySlug(slug: string) {
  return allCalculators.find((c) => c.slug === slug);
}

export function getCategoryById(id: string) {
  return calculatorCategories.find((c) => c.id === id);
}

export function getCategoryByPath(path: string) {
  return calculatorCategories.find((c) => c.path === path);
}
