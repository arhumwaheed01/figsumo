import { CalculatorShell } from "@/components/CalculatorShell";
import { PaintCalculator } from "@/components/calculators/PaintCalculator";
import { pageMetadata } from "@/lib/seo";
import { getCalculator } from "@/lib/site";

const calc = getCalculator("paint-calculator")!;
const intro =
  "Estimates how many gallons of paint you need for one wall from length, height, coats, coverage, and openings.";

export const metadata = pageMetadata({
  title: "Paint Calculator",
  description: intro,
  path: "/paint-calculator",
});

export default function Page() {
  return (
    <CalculatorShell
      calc={calc}
      intro={intro}
      faqs={[
        {
          question: "How do I paint a whole room?",
          answer:
            "Use the room perimeter as wall length, keep the ceiling height, and subtract all doors and windows once.",
        },
        {
          question: "What coverage should I use?",
          answer:
            "Use the number on the paint can. 350 sq ft per gallon is a common interior default; textured walls need more.",
        },
        {
          question: "Do I need primer in this total?",
          answer:
            "No. Primer is separate. Run the calculator again for one coat of primer if you need it.",
        },
      ]}
    >
      <PaintCalculator />
    </CalculatorShell>
  );
}
