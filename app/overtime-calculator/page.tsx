import { CalculatorShell } from "@/components/CalculatorShell";
import { OvertimeCalculator } from "@/components/calculators/OvertimeCalculator";
import { pageMetadata } from "@/lib/seo";
import { getCalculator } from "@/lib/site";

const calc = getCalculator("overtime-calculator")!;
const intro =
  "Estimates regular pay, overtime pay, and total from an hourly rate. US-style estimate only.";

export const metadata = pageMetadata({
  title: "Overtime Calculator",
  description: intro,
  path: "/overtime-calculator",
});

export default function Page() {
  return (
    <CalculatorShell
      calc={calc}
      intro={intro}
      faqs={[
        {
          question: "Is overtime always 1.5 times pay?",
          answer:
            "Many non-exempt US hourly workers get 1.5× after 40 hours in a workweek. Some states use different rules.",
        },
        {
          question: "Does this include taxes?",
          answer:
            "No. The result is gross pay before taxes and deductions.",
        },
        {
          question: "What about salaried workers?",
          answer:
            "Many salaried employees are exempt from overtime. This tool is for hourly estimates.",
        },
      ]}
    >
      <OvertimeCalculator />
    </CalculatorShell>
  );
}
