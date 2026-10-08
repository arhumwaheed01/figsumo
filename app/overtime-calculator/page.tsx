import { CalculatorShell } from "@/components/CalculatorShell";
import { OvertimeCalculator } from "@/components/calculators/OvertimeCalculator";
import { pageMetadata } from "@/lib/seo";
import { getCalculator } from "@/lib/site";

const calc = getCalculator("overtime-calculator")!;
const heading = "Overtime Calculator — Hourly Pay Estimate";
const description =
  "Estimate regular pay, overtime at 1.5×, and total from your hourly rate. Free, no signup.";

export const metadata = pageMetadata({
  title: `${heading} | Figsumo`,
  description,
  path: "/overtime-calculator",
});

export default function Page() {
  return (
    <CalculatorShell
      calc={calc}
      heading={heading}
      intro="Enter hourly rate, regular hours, overtime hours, and the overtime multiplier."
      metaDescription={description}
      faqs={[
        {
          question: "Is overtime always 1.5 times pay?",
          answer:
            "Under the US Fair Labor Standards Act, many non-exempt hourly workers get 1.5× after 40 hours in a workweek. Some states or contracts use different rules.",
        },
        {
          question: "Does this include taxes?",
          answer:
            "No. The result is gross pay before taxes, benefits, and other deductions.",
        },
        {
          question: "What about salaried workers?",
          answer:
            "Many salaried employees are exempt from overtime. This tool is aimed at hourly estimates, not exemption tests.",
        },
      ]}
    >
      <OvertimeCalculator />
    </CalculatorShell>
  );
}
