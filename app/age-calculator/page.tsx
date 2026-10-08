import { CalculatorShell } from "@/components/CalculatorShell";
import { AgeCalculator } from "@/components/calculators/AgeCalculator";
import { pageMetadata } from "@/lib/seo";
import { getCalculator } from "@/lib/site";

const calc = getCalculator("age-calculator")!;
const heading = "Age Calculator — Years, Months, Days";
const description =
  "Find age in years, months, and days from a birth date to today or another date. Free, no signup.";

export const metadata = pageMetadata({
  title: `${heading} | Figsumo`,
  description,
  path: "/age-calculator",
});

export default function Page() {
  return (
    <CalculatorShell
      calc={calc}
      heading={heading}
      intro="Enter a birth date and an as-of date (defaults to today)."
      metaDescription={description}
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
