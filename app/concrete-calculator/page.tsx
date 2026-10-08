import { CalculatorShell } from "@/components/CalculatorShell";
import { ConcreteCalculator } from "@/components/calculators/ConcreteCalculator";
import { pageMetadata } from "@/lib/seo";
import { getCalculator } from "@/lib/site";

const calc = getCalculator("concrete-calculator")!;
const intro =
  "Estimates cubic yards of concrete and about how many 80 lb bags you need for a rectangular pour.";

export const metadata = pageMetadata({
  title: "Concrete Calculator",
  description: intro,
  path: "/concrete-calculator",
});

export default function Page() {
  return (
    <CalculatorShell
      calc={calc}
      intro={intro}
      faqs={[
        {
          question: "How many 80 lb bags are in a cubic yard?",
          answer:
            "About 45 bags of 80 lb mix make one cubic yard, since each bag yields roughly 0.022 cubic yards.",
        },
        {
          question: "Should I order extra concrete?",
          answer:
            "Yes. Waste and uneven subgrade are common. Many people add 5–10% above the calculated volume.",
        },
        {
          question: "Does this work for footings or circles?",
          answer:
            "This tool is for a flat rectangle. Break footings into rectangles, or use π × radius² × depth for circles.",
        },
      ]}
    >
      <ConcreteCalculator />
    </CalculatorShell>
  );
}
