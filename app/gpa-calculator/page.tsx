import { CalculatorShell } from "@/components/CalculatorShell";
import { GpaCalculator } from "@/components/calculators/GpaCalculator";
import { pageMetadata } from "@/lib/seo";
import { getCalculator } from "@/lib/site";

const calc = getCalculator("gpa-calculator")!;

export const metadata = pageMetadata({
  title: "GPA Calculator",
  description:
    "Free GPA calculator on a 4.0 scale. Add courses, credits, and letter grades; GPA updates as you type.",
  path: "/gpa-calculator",
});

export default function Page() {
  return (
    <CalculatorShell
      calc={calc}
      intro="Enter each course, its credits, and letter grade."
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
