import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { ScientificCalculator } from "@/components/ScientificCalculator";
import { calculatorCategories } from "@/lib/calculators";
import { createPageMetadata, websiteJsonLd } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Figsumo — Free Online Calculators",
  description:
    "Free online calculators. Use the Figsumo scientific calculator for trig, logs, powers, roots, and memory — Deg or Rad, tap or type.",
  path: "/",
  absoluteTitle: true,
});

export default function Home() {
  return (
    <>
      <JsonLd data={websiteJsonLd()} />

      <section className="py-8 sm:py-12" aria-labelledby="home-heading">
        <div className="mb-8 text-center sm:mb-10">
          <p className="text-sm font-semibold tracking-wide text-brand">
            Free online calculators
          </p>
          <h1
            id="home-heading"
            className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-5xl"
          >
            Figsumo
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-ink/65 sm:text-lg">
            Accurate tools that run in your browser. Start with a full scientific
            calculator — trigonometry, logs, powers, roots, and memory.
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          <ScientificCalculator />
        </div>

        <p className="mx-auto mt-5 max-w-5xl text-center text-sm text-ink/60">
          Open the{" "}
          <Link
            href="/scientific-calculator"
            className="font-semibold text-ink underline underline-offset-2 hover:text-brand"
          >
            Scientific Calculator
          </Link>{" "}
          page for details and keyboard tips.
        </p>
      </section>

      <section
        className="border-t border-ink/10 py-10 sm:py-12"
        aria-labelledby="categories-heading"
      >
        <h2
          id="categories-heading"
          className="text-xl font-bold tracking-tight text-ink sm:text-2xl"
        >
          Calculator categories
        </h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {calculatorCategories.map((category) => (
            <li key={category.id}>
              <Link
                href={category.path}
                className="block rounded-xl border border-ink/15 px-5 py-4 transition-colors hover:border-brand/40 hover:bg-brand/[0.04]"
              >
                <span className="text-base font-semibold text-ink">
                  {category.title}
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-ink/60">
                  {category.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
