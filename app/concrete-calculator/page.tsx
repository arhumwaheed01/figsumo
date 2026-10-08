import { CalculatorShell } from "@/components/CalculatorShell";
import { ConcreteCalculator } from "@/components/calculators/ConcreteCalculator";
import { pageMetadata } from "@/lib/seo";
import { getCalculator } from "@/lib/site";

const calc = getCalculator("concrete-calculator")!;

export const metadata = pageMetadata({
  title: "Concrete Calculator",
  description:
    "Free concrete calculator: cubic yards and 80 lb bags from length, width, and depth in feet or inches.",
  path: "/concrete-calculator",
});

export default function Page() {
  return (
    <CalculatorShell
      calc={calc}
      intro="Enter length, width, and depth for a rectangular pour."
      faqs={[
        {
          question: "How many 80 lb bags are in a cubic yard?",
          answer:
            "About 45 bags of 80 lb concrete mix make one cubic yard, since each bag yields roughly 0.022 cubic yards when mixed.",
        },
        {
          question: "Should I order extra concrete?",
          answer:
            "Yes. Waste, uneven subgrade, and spillage are common. Many people add 5–10% above the calculated volume.",
        },
        {
          question: "Does this work for footings or circles?",
          answer:
            "This tool is for a flat rectangle. For footings, break the pour into rectangular sections. For circles, use π × radius² × depth, then convert to yards.",
        },
      ]}
    >
      <ConcreteCalculator />
    </CalculatorShell>
  );
}
