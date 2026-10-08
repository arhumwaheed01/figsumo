import type { ReactNode } from "react";
import {
  faqPageJsonLd,
  jsonLdScript,
  webApplicationJsonLd,
  type FaqItem,
} from "@/lib/seo";
import type { CalculatorMeta } from "@/lib/site";

type CalculatorShellProps = {
  calc: CalculatorMeta;
  /** Visible H1 — same words as the title topic (no | Figsumo). */
  heading: string;
  intro: string;
  metaDescription: string;
  faqs: FaqItem[];
  children: ReactNode;
};

export function CalculatorShell({
  calc,
  heading,
  intro,
  metaDescription,
  faqs,
  children,
}: CalculatorShellProps) {
  const path = `/${calc.slug}`;
  const webApp = webApplicationJsonLd({
    name: heading,
    description: metaDescription,
    path,
    formula: calc.formula,
  });
  const faqLd = faqPageJsonLd(faqs);

  return (
    <article className="mx-auto w-full max-w-[640px] px-4 py-6 sm:py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(webApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqLd) }}
      />

      <h1 className="text-2xl font-semibold tracking-tight text-[#18181b]">
        {heading}
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
          <p className="mt-3 leading-relaxed">{calc.whenWrong}</p>
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
