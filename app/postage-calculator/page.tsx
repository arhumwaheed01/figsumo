import { CalculatorShell } from "@/components/CalculatorShell";
import { PostageCalculator } from "@/components/calculators/PostageCalculator";
import { pageMetadata } from "@/lib/seo";
import { getCalculator } from "@/lib/site";

const calc = getCalculator("postage-calculator")!;

export const metadata = pageMetadata({
  title: "Postage Calculator",
  description:
    "Domestic US postage guide by weight for letters and flats. Not USPS—confirm rates before you mail.",
  path: "/postage-calculator",
});

export default function Page() {
  return (
    <CalculatorShell
      calc={calc}
      intro="Enter weight in ounces and choose letter or flat. Guide only—not USPS."
      faqs={[
        {
          question: "Is this an official USPS calculator?",
          answer:
            "No. It is a simple guide for planning. Always confirm postage at usps.com or a Post Office before you mail.",
        },
        {
          question: "When is mail a letter vs a flat?",
          answer:
            "Letters are small and flexible within letter size limits. Larger or thicker pieces often mail as flats at higher rates.",
        },
        {
          question: "Why might my stamp cost differ?",
          answer:
            "USPS updates prices, and shape, thickness, and destination matter. Forever stamps also track the current one-ounce letter rate.",
        },
      ]}
    >
      <PostageCalculator />
    </CalculatorShell>
  );
}
