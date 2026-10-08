import Link from "next/link";
import type { ReactNode } from "react";
import {
  faqPageJsonLd,
  jsonLdScript,
  webApplicationJsonLd,
  type FaqItem,
} from "@/lib/seo";
import { CALCULATORS, type CalculatorMeta } from "@/lib/site";

type CalculatorShellProps = {
  calc: CalculatorMeta;
  intro: string;
  faqs: FaqItem[];
  children: ReactNode;
};

export function CalculatorShell({
  calc,
  intro,
  faqs,
  children,
}: CalculatorShellProps) {
  const path = `/${calc.slug}`;
  const webApp = webApplicationJsonLd({
    name: calc.title,
    description: intro,
    path,
    formula: calc.formula,
  });
  const faqLd = faqPageJsonLd(faqs);
  const others = CALCULATORS.filter((c) => c.slug !== calc.slug);

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
        {calc.title}
      </h1>
      <p className="mt-2 text-[15px] leading-relaxed text-[#71717a]">{intro}</p>

      {/* Form + result first — before any long text */}
      <div className="mt-5">{children}</div>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-[#18181b]">How it works</h2>
        <p className="mt-2 text-[15px] leading-relaxed text-[#3f3f46]">
          {calc.formula}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[#71717a]">
          {calc.whenWrong}
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-[#18181b]">Example</h2>
        <p className="mt-2 text-[15px] leading-relaxed text-[#3f3f46]">
          {calc.example}
        </p>
      </section>

      <section className="mt-8 space-y-6">
        {faqs.map((faq) => (
          <div key={faq.question}>
            <h2 className="text-lg font-semibold text-[#18181b]">
              {faq.question}
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-[#3f3f46]">
              {faq.answer}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-10 border-t border-[#e4e4e7] pt-6">
        <h2 className="text-lg font-semibold text-[#18181b]">
          Other calculators
        </h2>
        <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-2 text-[15px]">
          {others.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/${c.slug}`}
                className="text-[#3f3f46] underline-offset-2 hover:underline"
              >
                {c.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
