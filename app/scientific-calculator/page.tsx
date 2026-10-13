import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { ScientificCalculator } from "@/components/ScientificCalculator";
import { createToolMetadata, webAppJsonLd } from "@/lib/seo";
import { tools } from "@/lib/site";

const tool = tools[0];

export const metadata = createToolMetadata(tool);

export default function ScientificCalculatorPage() {
  return (
    <>
      <JsonLd data={webAppJsonLd(tool)} />

      <article className="py-8 sm:py-12">
        <header className="mb-8 max-w-3xl">
          <p className="text-sm font-semibold tracking-wide text-brand">
            <Link href="/" className="hover:underline">
              Figsumo
            </Link>
            {" / "}
            Calculators
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {tool.title}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-ink/70 sm:text-lg">
            {tool.description} Switch Deg or Rad, use memory keys, and type with
            your keyboard.
          </p>
        </header>

        <div className="mx-auto max-w-5xl">
          <ScientificCalculator />
        </div>

        <section className="mx-auto mt-12 max-w-3xl" aria-labelledby="how-heading">
          <h2
            id="how-heading"
            className="text-xl font-bold tracking-tight text-ink"
          >
            How to use this calculator
          </h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-base leading-relaxed text-ink/75">
            <li>Choose Deg or Rad for trigonometric functions.</li>
            <li>Tap keys or type expressions; press = or Enter to evaluate.</li>
            <li>Use M+, M−, and MR for memory; Ans recalls the last result.</li>
            <li>AC clears the display; Back deletes the last character.</li>
          </ol>
        </section>

        <section
          className="mx-auto mt-10 max-w-3xl"
          aria-labelledby="features-heading"
        >
          <h2
            id="features-heading"
            className="text-xl font-bold tracking-tight text-ink"
          >
            Features
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-ink/75">
            <li>Trig and inverse trig: sin, cos, tan, sin⁻¹, cos⁻¹, tan⁻¹</li>
            <li>Logs and exponentials: ln, log, eˣ, 10ˣ</li>
            <li>Powers and roots: xʸ, x², x³, √x, ³√x, ʸ√x</li>
            <li>Constants π and e, factorial, percent, and random (RND)</li>
            <li>Runs locally in your browser — no account required</li>
          </ul>
        </section>
      </article>
    </>
  );
}
