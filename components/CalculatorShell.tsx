import type { ReactNode } from "react";
import { AdSlot } from "./AdSlot";
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
    <article className="mx-auto w-full max-w-[640px] px-4 py-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
        {calc.title}
      </h1>
      <p className="mt-2 text-[15px] leading-snug text-zinc-600">{intro}</p>

      <div className="mt-5">{children}</div>

      <section className="mt-10 space-y-5 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
        <div>
          <h2 className="text-sm font-medium text-zinc-600">Formula</h2>
          <p className="mt-1 leading-relaxed">{calc.formula}</p>
        </div>
        <div>
          <h2 className="text-sm font-medium text-zinc-600">Example</h2>
          <p className="mt-1 leading-relaxed">{calc.example}</p>
        </div>
        <div>
          <h2 className="text-sm font-medium text-zinc-600">
            When this is wrong
          </h2>
          <p className="mt-1 leading-relaxed">{calc.whenWrong}</p>
        </div>
      </section>

      <section className="mt-8 border-t border-zinc-200 pt-6">
        <h2 className="text-sm font-medium text-zinc-600">FAQ</h2>
        <dl className="mt-3 space-y-4">
          {faqs.map((faq) => (
            <div key={faq.question}>
              <dt className="text-sm font-medium text-zinc-700">
                {faq.question}
              </dt>
              <dd className="mt-1 text-sm leading-relaxed text-zinc-500">
                {faq.answer}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <AdSlot />
    </article>
  );
}
