import { CalculatorShell } from "@/components/CalculatorShell";
import { AgeCalculator } from "@/components/calculators/AgeCalculator";
import { pageMetadata } from "@/lib/seo";
import { getCalculator } from "@/lib/site";

const calc = getCalculator("age-calculator")!;

export const metadata = pageMetadata({
  title: "Age Calculator",
  description:
    "Free age calculator: years, months, and days from a birth date to today or another date.",
  path: "/age-calculator",
});

export default function Page() {
  return (
    <CalculatorShell
      calc={calc}
      intro="Enter a birth date and an as-of date (defaults to today)."
      faqs={[
        {
          question: "How is age in months and days calculated?",
          answer:
            "Whole years are counted first, then remaining months, then remaining days using calendar month lengths.",
        },
        {
          question: "What about leap years?",
          answer:
            "February 29 birthdays are handled by the calendar math. Crossing a leap day can change the day count by one versus a non-leap span.",
        },
        {
          question: "Can I calculate age on a future date?",
          answer:
            "Yes. Set the “as of” date to any day on or after the birth date.",
        },
      ]}
    >
      <AgeCalculator />
    </CalculatorShell>
  );
}
