import { CalculatorShell } from "@/components/CalculatorShell";
import { PaintCalculator } from "@/components/calculators/PaintCalculator";
import { pageMetadata } from "@/lib/seo";
import { getCalculator } from "@/lib/site";

const calc = getCalculator("paint-calculator")!;

export const metadata = pageMetadata({
  title: "Paint Calculator",
  description:
    "Free paint calculator: estimate gallons from wall size, coats, coverage, doors, and windows.",
  path: "/paint-calculator",
});

export default function Page() {
  return (
    <CalculatorShell
      calc={calc}
      intro="Enter wall size, coats, coverage, and any doors or windows to subtract."
      faqs={[
        {
          question: "How do I paint a whole room?",
          answer:
            "Use the room perimeter as wall length (sum of all walls), keep the ceiling height, and subtract all doors and windows once.",
        },
        {
          question: "What coverage should I use?",
          answer:
            "Start with the number on the paint can. 350 sq ft per gallon is a common interior estimate; textured walls need more.",
        },
        {
          question: "Do I need primer in this total?",
          answer:
            "No. Primer is separate. If you are priming, run the calculator again for one coat of primer, or follow the primer label.",
        },
      ]}
    >
      <PaintCalculator />
    </CalculatorShell>
  );
}
