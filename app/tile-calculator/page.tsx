import { CalculatorShell } from "@/components/CalculatorShell";
import { TileCalculator } from "@/components/calculators/TileCalculator";
import { pageMetadata } from "@/lib/seo";
import { getCalculator } from "@/lib/site";

const calc = getCalculator("tile-calculator")!;
const intro =
  "Estimates how many tiles you need for a rectangular room, including grout gap and 10% waste.";

export const metadata = pageMetadata({
  title: "Tile Calculator",
  description: intro,
  path: "/tile-calculator",
});

export default function Page() {
  return (
    <CalculatorShell
      calc={calc}
      intro={intro}
      faqs={[
        {
          question: "Why add 10% waste?",
          answer:
            "Cuts, breakage, and pattern matching use extra tile. Straight layouts often need about 10%.",
        },
        {
          question: "What if my tiles are not square?",
          answer:
            "Use the edge length that runs along each room direction, or calculate each axis with the matching tile size.",
        },
        {
          question: "Does grout gap change the count?",
          answer:
            "Yes. Each joint adds spacing. Over a large floor, even 1/8 inch changes how many tiles fit.",
        },
      ]}
    >
      <TileCalculator />
    </CalculatorShell>
  );
}
