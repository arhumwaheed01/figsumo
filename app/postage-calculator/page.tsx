import { CalculatorShell } from "@/components/CalculatorShell";
import { PostageCalculator } from "@/components/calculators/PostageCalculator";
import { pageMetadata } from "@/lib/seo";
import { getCalculator } from "@/lib/site";

const calc = getCalculator("postage-calculator")!;
const intro =
  "Estimates rough domestic US postage for letters and flats by weight. Guide only—not USPS.";

export const metadata = pageMetadata({
  title: "Postage Calculator",
  description: intro,
  path: "/postage-calculator",
});

export default function Page() {
  return (
    <CalculatorShell
      calc={calc}
      intro={intro}
      faqs={[
        {
          question: "Is this an official USPS calculator?",
          answer:
            "No. It is a planning guide. Confirm postage at usps.com or a Post Office before you mail.",
        },
        {
          question: "When is mail a letter vs a flat?",
          answer:
            "Letters stay within small letter size limits. Larger or thicker pieces often mail as flats.",
        },
        {
          question: "Why might my stamp cost differ?",
          answer:
            "USPS updates prices, and shape and thickness matter. Forever stamps track the current one-ounce letter rate.",
        },
      ]}
    >
      <PostageCalculator />
    </CalculatorShell>
  );
}
