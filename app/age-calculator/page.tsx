import { CalculatorShell } from "@/components/CalculatorShell";
import { AgeCalculator } from "@/components/calculators/AgeCalculator";
import { pageMetadata } from "@/lib/seo";
import { getCalculator } from "@/lib/site";

const calc = getCalculator("age-calculator")!;
const intro =
  "Estimates age in years, months, and days from a birth date to today or another date.";

export const metadata = pageMetadata({
  title: "Age Calculator",
  description: intro,
  path: "/age-calculator",
});

export default function Page() {
  return (
    <CalculatorShell
      calc={calc}
      intro={intro}
      faqs={[
        {
          question: "How are months and days counted?",
          answer:
            "Whole years first, then remaining months, then remaining days using calendar month lengths.",
        },
        {
          question: "What about leap years?",
          answer:
            "February 29 is handled by calendar math. Crossing a leap day can change the day count by one.",
        },
        {
          question: "Can I use a future date?",
          answer:
            "Yes. Set the as-of date to any day on or after the birth date.",
        },
      ]}
    >
      <AgeCalculator />
    </CalculatorShell>
  );
}
