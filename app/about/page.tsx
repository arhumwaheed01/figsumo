import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";
import { business, publicContactEmail, siteConfig } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "About FigSumo | Free Calculators for Money, Health & Everyday Maths",
  description:
    "Who runs FigSumo, how our calculators are built and checked, and how the site is funded.",
  path: "/about",
  absoluteTitle: true,
});

export default function AboutPage() {
  const email = publicContactEmail();

  return (
    <article className="mx-auto max-w-3xl py-12">
      <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        About FigSumo
      </h1>

      <div className="mt-6 space-y-6 text-base leading-relaxed text-ink/80">
        <p>
          FigSumo is a free collection of online calculators for money, health,
          maths and everyday questions. Where the rules differ by country, we
          build separate versions for the United States, Canada and the United
          Kingdom.
        </p>

        <section aria-labelledby="who-heading">
          <h2
            id="who-heading"
            className="text-xl font-bold tracking-tight text-ink"
          >
            Who we are
          </h2>
          <p className="mt-3">
            FigSumo is run by{" "}
            <strong className="text-ink">{business.legalName}</strong>, trading as
            FigSumo, based in{" "}
            <strong className="text-ink">{business.location}</strong>.
          </p>
        </section>

        <section aria-labelledby="diff-heading">
          <h2
            id="diff-heading"
            className="text-xl font-bold tracking-tight text-ink"
          >
            What we do differently
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              <strong className="text-ink">Country-correct results.</strong> Tax,
              payroll, mortgage and savings rules differ between the US, Canada
              and the UK. Country calculators use each government&apos;s
              published figures and show the tax year those figures apply to.
            </li>
            <li>
              <strong className="text-ink">We show the working.</strong> Every
              calculator page explains the formula, works through examples, and
              lists the official sources we used.
            </li>
            <li>
              <strong className="text-ink">Dated and reviewed.</strong> Each page
              shows when it was last updated. Tax and rate figures are checked
              again when governments publish new ones.
            </li>
            <li>
              <strong className="text-ink">Your inputs stay on your device.</strong>{" "}
              Calculations run in your browser. We don&apos;t ask you to create
              an account. See our{" "}
              <Link href="/privacy" className="font-semibold text-brand hover:underline">
                Privacy Policy
              </Link>
              .
            </li>
          </ul>
        </section>

        <section aria-labelledby="funding-heading">
          <h2
            id="funding-heading"
            className="text-xl font-bold tracking-tight text-ink"
          >
            How FigSumo is funded
          </h2>
          <p className="mt-3">
            FigSumo is free to use.{" "}
            {business.showsAdvertising
              ? "The site is supported by advertising, shown according to your cookie choices."
              : "The site currently shows no advertising."}{" "}
            Advertisers have no influence over our calculations or content. We
            don&apos;t accept payment to change results or rankings.
          </p>
        </section>

        <section aria-labelledby="not-heading">
          <h2
            id="not-heading"
            className="text-xl font-bold tracking-tight text-ink"
          >
            What FigSumo is not
          </h2>
          <p className="mt-3">
            Our calculators give estimates for education and planning. They are
            not financial, tax, legal or medical advice, and they don&apos;t
            replace a qualified professional.
          </p>
        </section>

        <section aria-labelledby="corrections-heading">
          <h2
            id="corrections-heading"
            className="text-xl font-bold tracking-tight text-ink"
          >
            Corrections
          </h2>
          <p className="mt-3">
            If you think a result, a figure or a source is wrong, please tell us
            through the{" "}
            <Link href="/contact" className="font-semibold text-brand hover:underline">
              Contact
            </Link>{" "}
            page. Include the page URL and the inputs you used. We aim to review
            correction reports within {business.responseBusinessDays} business
            days and to note significant corrections on the page.
          </p>
        </section>

        <section aria-labelledby="contact-heading">
          <h2
            id="contact-heading"
            className="text-xl font-bold tracking-tight text-ink"
          >
            Contact
          </h2>
          <p className="mt-3">
            {email ? (
              <>
                <a
                  href={`mailto:${email}`}
                  className="font-semibold text-brand hover:underline"
                >
                  {email}
                </a>
                {" · "}
              </>
            ) : null}
            <Link href="/contact" className="font-semibold text-brand hover:underline">
              Contact form
            </Link>
            {business.postalAddress ? (
              <>
                <br />
                {business.postalAddress}
              </>
            ) : null}
          </p>
          <p className="mt-2 text-sm text-ink/60">
            Public brand: {siteConfig.name}. Canonical site: https://
            {siteConfig.canonicalHost}/
          </p>
        </section>
      </div>
    </article>
  );
}
