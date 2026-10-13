import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";
import {
  business,
  IS_PRODUCTION_SITE,
  publicContactEmail,
  siteConfig,
} from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Contact FigSumo",
  description:
    "Report an error, suggest a calculator or get in touch with the FigSumo team.",
  path: "/contact",
  absoluteTitle: true,
});

export default function ContactPage() {
  const email = publicContactEmail();
  const privacyEmail = IS_PRODUCTION_SITE ? siteConfig.privacyEmail : null;
  const businessEmail = IS_PRODUCTION_SITE ? siteConfig.businessEmail : null;

  return (
    <article className="mx-auto max-w-3xl py-12">
      <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        Contact us
      </h1>

      <div className="mt-6 space-y-6 text-base leading-relaxed text-ink/80">
        <p>
          We read every message. Until the contact form ships, the best way to
          reach us is email
          {email ? " at the address below" : " once the production domain is live"}
          . We aim to reply within {business.responseBusinessDays} business days.
        </p>

        <ul className="space-y-2">
          <li>
            <strong className="text-ink">Email:</strong>{" "}
            {email ? (
              <a
                href={`mailto:${email}`}
                className="font-semibold text-brand hover:underline"
              >
                {email}
              </a>
            ) : (
              <span>
                Available on https://{siteConfig.canonicalHost}/ after launch
                (staging does not publish mailbox addresses).
              </span>
            )}
          </li>
          {business.postalAddress ? (
            <li>
              <strong className="text-ink">Postal address:</strong>{" "}
              {business.postalAddress}
            </li>
          ) : null}
          <li>
            <strong className="text-ink">Response time:</strong> within{" "}
            {business.responseBusinessDays} business days
          </li>
        </ul>

        <section aria-labelledby="error-heading">
          <h2
            id="error-heading"
            className="text-xl font-bold tracking-tight text-ink"
          >
            Reporting a calculation error
          </h2>
          <p className="mt-3">To help us check quickly, please include:</p>
          <ol className="mt-3 list-decimal space-y-2 pl-5">
            <li>The page URL, or a share link for your result.</li>
            <li>The inputs you used and the result you got.</li>
            <li>
              What you expected, and the source for the expected figure if you
              have one (for example a page on irs.gov, canada.ca or gov.uk).
            </li>
          </ol>
          <p className="mt-3">
            We review every error report. If we confirm a mistake, we fix it and
            note the correction on the page.
          </p>
        </section>

        <section aria-labelledby="suggest-heading">
          <h2
            id="suggest-heading"
            className="text-xl font-bold tracking-tight text-ink"
          >
            Suggestions
          </h2>
          <p className="mt-3">
            Tell us which calculator you&apos;d like to see next, or what would
            make an existing one more useful.
          </p>
        </section>

        <section aria-labelledby="biz-heading">
          <h2
            id="biz-heading"
            className="text-xl font-bold tracking-tight text-ink"
          >
            Business enquiries
          </h2>
          <p className="mt-3">
            For partnerships or embed licensing:{" "}
            {businessEmail ? (
              <a
                href={`mailto:${businessEmail}`}
                className="font-semibold text-brand hover:underline"
              >
                {businessEmail}
              </a>
            ) : (
              <span>use the production contact address after launch</span>
            )}
            . We don&apos;t accept payment to change calculator results or
            editorial content.
          </p>
        </section>

        <section aria-labelledby="privacy-heading">
          <h2
            id="privacy-heading"
            className="text-xl font-bold tracking-tight text-ink"
          >
            Privacy requests
          </h2>
          <p className="mt-3">
            For data access or deletion requests,{" "}
            {privacyEmail ? (
              <>
                email{" "}
                <a
                  href={`mailto:${privacyEmail}`}
                  className="font-semibold text-brand hover:underline"
                >
                  {privacyEmail}
                </a>
              </>
            ) : (
              "use the Contact channel above"
            )}
            . See the{" "}
            <Link href="/privacy" className="font-semibold text-brand hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </section>

        <p className="rounded-lg border border-ink/10 bg-paper px-4 py-3 text-sm text-ink/70">
          Please don&apos;t send sensitive personal information, such as tax ID
          numbers, account numbers or health records. We don&apos;t need it to
          answer your question.
        </p>
      </div>
    </article>
  );
}
