import { CalculatorShell } from "@/components/CalculatorShell";
import { GpaCalculator } from "@/components/calculators/GpaCalculator";
import { pageMetadata } from "@/lib/seo";
import { getCalculator } from "@/lib/site";

const calc = getCalculator("gpa-calculator")!;
const intro =
  "Estimates a weighted GPA on a standard 4.0 scale from course credits and letter grades.";

export const metadata = pageMetadata({
  title: "GPA Calculator",
  description: intro,
  path: "/gpa-calculator",
});

export default function Page() {
  return (
    <CalculatorShell
      calc={calc}
      intro={intro}
      faqs={[
        {
          question: "What letter grades are supported?",
          answer:
            "A+ through F with plus/minus steps (A+=4.0, A=4.0, A-=3.7, down to F=0).",
        },
        {
          question: "Is this weighted for AP or honors?",
          answer:
            "No. Use the points your school assigns, or adjust grades if your school adds weight.",
        },
        {
          question: "Does pass/fail count?",
          answer:
            "Usually not. Leave pass/fail courses out unless your school assigns grade points.",
        },
      ]}
    >
      <GpaCalculator />
    </CalculatorShell>
  );
}
