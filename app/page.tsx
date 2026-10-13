import Link from "next/link";
import { HomeDirectory } from "@/components/HomeDirectory";
import { JsonLd } from "@/components/JsonLd";
import { ScientificCalculator } from "@/components/ScientificCalculator";
import { createPageMetadata, websiteJsonLd } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "FigSumo — Free Online Calculators",
  description:
    "Free online calculators. Use the FigSumo scientific calculator for trig, logs, powers, roots, and memory — Deg or Rad, tap or type.",
  path: "/",
  absoluteTitle: true,
});

export default function Home() {
  return (
    <>
      <JsonLd data={websiteJsonLd()} />

      <section className="py-10 sm:py-14" aria-labelledby="home-heading">
        <div className="mb-8 text-center sm:mb-10">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-brand">
            Free online calculators
          </p>
          <h1
            id="home-heading"
            className="mt-3 text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl"
          >
            FigSumo
          </h1>
          <p className="text-body mx-auto mt-4 max-w-2xl text-lg sm:text-xl">
            Fast, accurate tools that run in your browser — finance, fitness,
            math, and everyday calculators in one place.
          </p>
        </div>

        <div className="mx-auto max-w-5xl rounded-2xl border-2 border-ink/15 bg-paper p-2 shadow-[0_16px_40px_-20px_rgba(16,16,16,0.35)] sm:p-3">
          <ScientificCalculator />
        </div>

        <p className="mx-auto mt-5 max-w-5xl text-center text-base font-medium text-ink/75">
          Need the full page with tips? Open the{" "}
          <Link
            href="/scientific-calculator"
            className="font-bold text-brand underline underline-offset-2 hover:text-ink"
          >
            Scientific Calculator
          </Link>
          .
        </p>
      </section>

      <HomeDirectory />
    </>
  );
}
