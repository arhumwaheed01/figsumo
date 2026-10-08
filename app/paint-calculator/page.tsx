import { CalculatorShell } from "@/components/CalculatorShell";
import { PaintCalculator } from "@/components/calculators/PaintCalculator";
import { pageMetadata } from "@/lib/seo";
import { getCalculator } from "@/lib/site";

const calc = getCalculator("paint-calculator")!;
const heading = "Paint Calculator — Gallons for One Wall";
const description =
  "Estimate paint gallons for one wall from size, coats, doors, and windows. Free, no signup.";

export const metadata = pageMetadata({
  title: `${heading} | Figsumo`,
  description,
  path: "/paint-calculator",
});

export default function Page() {
  return (
    <CalculatorShell
      calc={calc}
      heading={heading}
      intro="Enter wall size, coats, coverage, and any doors or windows to subtract."
      metaDescription={description}
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
