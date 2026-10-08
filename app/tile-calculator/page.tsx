import { CalculatorShell } from "@/components/CalculatorShell";
import { TileCalculator } from "@/components/calculators/TileCalculator";
import { pageMetadata } from "@/lib/seo";
import { getCalculator } from "@/lib/site";

const calc = getCalculator("tile-calculator")!;

export const metadata = pageMetadata({
  title: "Tile Calculator",
  description:
    "Free tile calculator: tiles needed for a room with tile size, grout gap, and 10% waste.",
  path: "/tile-calculator",
});

export default function Page() {
  return (
    <CalculatorShell
      calc={calc}
      intro="Enter room size, tile size, and grout gap. Includes 10% waste."
      faqs={[
        {
          question: "Why add 10% waste?",
          answer:
            "Cuts, breakage, and matching patterns use extra tile. Straight layouts often need about 10%; diagonals need more.",
        },
        {
          question: "What if my tiles are rectangular, not square?",
          answer:
            "Enter the size that runs along each direction carefully, or calculate each axis with the matching tile edge length.",
        },
        {
          question: "Does grout gap really change the count?",
          answer:
            "Yes. Each joint adds to the spacing. Over a large floor, even 1/8 inch shifts how many tiles fit along a wall.",
        },
      ]}
    >
      <TileCalculator />
    </CalculatorShell>
  );
}
