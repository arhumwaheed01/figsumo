import Link from "next/link";
import type { CalculatorEntry } from "@/lib/calculators";
import { calculatorCategories } from "@/lib/calculators";

export function PlannedCalculator({ tool }: { tool: CalculatorEntry }) {
  const category = calculatorCategories.find((c) =>
    c.items.some((item) => item.slug === tool.slug),
  );

  return (
    <article className="py-10 sm:py-12">
      <header className="max-w-3xl">
        <p className="text-sm font-semibold tracking-wide text-brand">
          <Link href="/" className="hover:underline">
            FigSumo
          </Link>
          {category ? (
            <>
              {" / "}
              <Link href={category.path} className="hover:underline">
                {category.shortTitle}
              </Link>
            </>
          ) : null}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {tool.title}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-ink/70 sm:text-lg">
          {tool.description} This tool is on the FigSumo roadmap and will be
          available here soon.
        </p>
      </header>

      <p className="mt-8 max-w-2xl rounded-xl border border-ink/15 bg-ink/[0.03] px-5 py-4 text-sm leading-relaxed text-ink/70">
        Meanwhile, try the{" "}
        <Link
          href="/scientific-calculator"
          className="font-semibold text-ink underline underline-offset-2 hover:text-brand"
        >
          Scientific Calculator
        </Link>
        {category ? (
          <>
            {" "}
            or browse{" "}
            <Link
              href={category.path}
              className="font-semibold text-ink underline underline-offset-2 hover:text-brand"
            >
              {category.title}
            </Link>
            .
          </>
        ) : (
          "."
        )}
      </p>
    </article>
  );
}
