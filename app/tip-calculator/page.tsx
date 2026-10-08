import { CalculatorShell } from "@/components/CalculatorShell";
import { TipCalculator } from "@/components/calculators/TipCalculator";
import { pageMetadata } from "@/lib/seo";
import { getCalculator } from "@/lib/site";

const calc = getCalculator("tip-calculator")!;
const intro =
  "Estimates tip, total bill, and the amount each person pays when you split evenly.";

export const metadata = pageMetadata({
  title: "Tip Calculator",
  description: intro,
  path: "/tip-calculator",
});

export default function Page() {
  return (
    <CalculatorShell
      calc={calc}
      intro={intro}
      faqs={[
        {
          question: "Should I tip on pre-tax or post-tax?",
          answer:
            "Either is common. Many people tip on the pre-tax subtotal; others tip on the total.",
        },
        {
          question: "What if there is a service charge?",
          answer:
            "A mandatory service charge is not the same as a tip. Check the receipt before adding more.",
        },
        {
          question: "How do I split unevenly?",
          answer:
            "This tool splits evenly. For uneven shares, calculate the tip total, then divide manually.",
        },
      ]}
    >
      <TipCalculator />
    </CalculatorShell>
  );
}
