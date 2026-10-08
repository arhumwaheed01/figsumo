import { CalculatorShell } from "@/components/CalculatorShell";
import { TipCalculator } from "@/components/calculators/TipCalculator";
import { pageMetadata } from "@/lib/seo";
import { getCalculator } from "@/lib/site";

const calc = getCalculator("tip-calculator")!;

export const metadata = pageMetadata({
  title: "Tip Calculator",
  description:
    "Free tip calculator with 15/18/20/25% presets. See tip, total, and per-person split.",
  path: "/tip-calculator",
});

export default function Page() {
  return (
    <CalculatorShell
      calc={calc}
      intro="Enter the bill, tip percent, and how many people split it."
      faqs={[
        {
          question: "Should I tip on pre-tax or post-tax?",
          answer:
            "Either is common. Many people tip on the pre-tax subtotal; others tip on the total. Use whichever you prefer.",
        },
        {
          question: "What if the restaurant added a service charge?",
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
