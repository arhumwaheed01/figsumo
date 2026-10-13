import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { CalculatorTool } from "@/components/calc/CalculatorTool";
import type { CalculatorEntry, CalculatorCategory } from "@/lib/calculators";
import { calculatorCategories } from "@/lib/calculators";
import { webAppJsonLd } from "@/lib/seo";
import type { ToolPage } from "@/lib/site";

function toToolPage(tool: CalculatorEntry): ToolPage {
  return {
    slug: tool.slug,
    path: tool.path,
    title: tool.title,
    shortTitle: tool.title.replace(/ Calculator$/, ""),
    description: tool.description,
  };
}

function findCategory(slug: string): CalculatorCategory | undefined {
  return calculatorCategories.find((c) =>
    c.items.some((item) => item.slug === slug),
  );
}

export function CalculatorToolPage({ tool }: { tool: CalculatorEntry }) {
  const category = findCategory(tool.slug);
  const metaTool = toToolPage(tool);

  return (
    <>
      <JsonLd data={webAppJsonLd(metaTool)} />
      <article className="py-8 sm:py-12">
        <header className="mb-8 max-w-3xl">
          <p className="text-sm font-semibold tracking-wide text-brand">
            <Link href="/" className="hover:underline">
              Figsumo
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
            {tool.description} Adjust the inputs, then review the detailed
            results, charts, and breakdowns below.
          </p>
        </header>

        <div className="mx-auto max-w-6xl">
          <CalculatorTool slug={tool.slug} />
        </div>

        <section
          className="mx-auto mt-12 max-w-3xl"
          aria-labelledby="about-tool-heading"
        >
          <h2
            id="about-tool-heading"
            className="text-xl font-bold tracking-tight text-ink"
          >
            About this calculator
          </h2>
          <p className="mt-3 text-base leading-relaxed text-ink/75">
            Figsumo runs this tool in your browser. Results are for planning and
            education — confirm important decisions with a qualified
            professional when needed.
          </p>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-base leading-relaxed text-ink/75">
            <li>Enter your numbers in the form (defaults are editable examples).</li>
            <li>Press Calculate to refresh the results panel.</li>
            <li>
              Review the highlighted primary result, totals, charts, and tables
              when available.
            </li>
            <li>Use Related links to open similar calculators in this category.</li>
          </ol>
        </section>
      </article>
    </>
  );
}
