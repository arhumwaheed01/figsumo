import { CalculatorShell } from "@/components/CalculatorShell";
import { GpaCalculator } from "@/components/calculators/GpaCalculator";
import { pageMetadata } from "@/lib/seo";
import { getCalculator } from "@/lib/site";

const calc = getCalculator("gpa-calculator")!;
const heading = "GPA Calculator — 4.0 Scale Credits";
const description =
  "Compute a weighted GPA on a 4.0 scale from course credits and letter grades. Free, no signup.";

export const metadata = pageMetadata({
  title: `${heading} | Figsumo`,
  description,
  path: "/gpa-calculator",
});

export default function Page() {
  return (
    <CalculatorShell
      calc={calc}
      heading={heading}
      intro="Enter each course, its credits, and letter grade."
      metaDescription={description}
      faqs={[
        {
          question: "What letter grades are supported?",
          answer:
            "A+ through F with plus/minus steps (A+=4.0, A=4.0, A-=3.7, and so on down to F=0).",
        },
        {
          question: "Is this weighted for AP or honors?",
          answer:
            "No. Enter the points your school uses, or adjust grades manually if your school adds weight.",
        },
        {
          question: "Does pass/fail count?",
          answer:
            "Usually not in GPA. Leave pass/fail courses out of the list unless your school assigns points.",
        },
      ]}
    >
      <GpaCalculator />
    </CalculatorShell>
  );
}
