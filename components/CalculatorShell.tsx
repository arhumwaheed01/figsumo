import type { ReactNode } from "react";
import { calculatorJsonLd } from "@/lib/seo";
import type { CalculatorMeta } from "@/lib/site";

type Faq = { question: string; answer: string };

type CalculatorShellProps = {
  calc: CalculatorMeta;
  intro: string;
  faqs: Faq[];
  children: ReactNode;
};

export function CalculatorShell({
  calc,
  intro,
  faqs,
  children,
}: CalculatorShellProps) {
  const path = `/${calc.slug}`;
  const jsonLd = calculatorJsonLd({
    name: calc.title,
    description: calc.description,
    path,
    formula: calc.formula,
  });

  return (
    <article className="mx-auto w-full max-w-[640px] px-4 py-6 sm:py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <h1 className="text-2xl font-semibold tracking-tight text-[#18181b]">
        {calc.title}
      </h1>
      <p className="mt-2 text-[15px] leading-snug text-[#71717a]">{intro}</p>

      <div className="mt-6">{children}</div>

      <section className="mt-12 space-y-5 text-sm text-[#71717a]">
        <div>
          <h2 className="font-medium text-[#71717a]">Formula</h2>
          <p className="mt-1 leading-relaxed">{calc.formula}</p>
        </div>
        <div>
          <h2 className="font-medium text-[#71717a]">Example</h2>
          <p className="mt-1 leading-relaxed">{calc.example}</p>
        </div>
        <div>
          <h2 className="font-medium text-[#71717a]">When this is wrong</h2>
          <p className="mt-1 leading-relaxed">{calc.whenWrong}</p>
        </div>
      </section>

      <section className="mt-10 text-sm text-[#71717a]">
        <h2 className="font-medium text-[#71717a]">FAQ</h2>
        <dl className="mt-3 space-y-4">
          {faqs.map((faq) => (
            <div key={faq.question}>
              <dt className="font-medium text-[#52525b]">{faq.question}</dt>
              <dd className="mt-1 leading-relaxed">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Ad slot: place AdSense (or similar) here later, below the FAQ only. */}
    </article>
  );
}
