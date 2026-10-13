import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";
import {
  business,
  IS_PRODUCTION_SITE,
  siteConfig,
} from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Privacy Policy | FigSumo",
  description:
    "What data FigSumo collects, how cookies work on the site, and your privacy rights.",
  path: "/privacy",
  absoluteTitle: true,
});

export default function PrivacyPage() {
  const privacyEmail = IS_PRODUCTION_SITE ? siteConfig.privacyEmail : null;

  return (
    <article className="mx-auto max-w-3xl py-12">
      <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        Privacy Policy
      </h1>

      <div className="mt-6 space-y-6 text-base leading-relaxed text-ink/80">
        <p className="text-sm text-ink/60">
          <strong className="text-ink">Effective date:</strong>{" "}
          {business.privacyEffectiveDate}
          <br />
          <strong className="text-ink">Controller:</strong> {business.legalName}
          {business.postalAddress ? `, ${business.postalAddress}` : ""} (
          {siteConfig.name}, &quot;we&quot;, &quot;us&quot;)
          <br />
          <strong className="text-ink">Contact:</strong>{" "}
          {privacyEmail ? (
            <a
              href={`mailto:${privacyEmail}`}
              className="font-semibold text-brand hover:underline"
            >
              {privacyEmail}
            </a>
          ) : (
            <Link href="/contact" className="font-semibold text-brand hover:underline">
              Contact form
            </Link>
          )}
        </p>

        <section aria-labelledby="summary-heading">
          <h2
            id="summary-heading"
            className="text-xl font-bold tracking-tight text-ink"
          >
            1. Summary
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>You can use FigSumo without an account.</li>
            <li>
              The values you type into calculators are processed in your browser
              and are not sent to our servers for storage.
            </li>
            <li>
              We use cookies and similar technologies only for essential site
              functions today. Analytics and advertising cookies will be used
              only with your consent where the law requires it, and only after
              those features are enabled.
            </li>
          </ul>
        </section>

        <section aria-labelledby="collect-heading">
          <h2
            id="collect-heading"
            className="text-xl font-bold tracking-tight text-ink"
          >
            2. Information we collect
          </h2>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-ink/15 text-ink">
                  <th className="py-2 pr-3 font-semibold">Category</th>
                  <th className="py-2 pr-3 font-semibold">Examples</th>
                  <th className="py-2 pr-3 font-semibold">Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-ink/10">
                  <td className="py-2 pr-3 align-top">Technical data</td>
                  <td className="py-2 pr-3 align-top">
                    IP address, browser type, device, pages visited, referring
                    site
                  </td>
                  <td className="py-2 pr-3 align-top">
                    Deliver and secure the site via our hosting provider (
                    {business.hostingProvider})
                  </td>
                </tr>
                <tr className="border-b border-ink/10">
                  <td className="py-2 pr-3 align-top">Messages you send us</td>
                  <td className="py-2 pr-3 align-top">Name, email, message</td>
                  <td className="py-2 pr-3 align-top">Respond to you</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3">
            We don&apos;t knowingly collect personal information from children
            under 13 (US) or under the age of digital consent in your country.
            FigSumo is not directed at children.
          </p>
        </section>

        <section aria-labelledby="analytics-heading">
          <h2
            id="analytics-heading"
            className="text-xl font-bold tracking-tight text-ink"
          >
            3. Analytics
          </h2>
          <p className="mt-3">
            {business.analyticsProvider
              ? `We use ${business.analyticsProvider} to understand how the site is used.`
              : "We do not currently run a third-party analytics product on FigSumo. If we add one, this page will be updated before it goes live, and consent will be required in the UK, EEA and Switzerland where the law requires it."}
          </p>
        </section>

        <section aria-labelledby="ads-heading">
          <h2
            id="ads-heading"
            className="text-xl font-bold tracking-tight text-ink"
          >
            4. Advertising
          </h2>
          <p className="mt-3">
            {business.showsAdvertising
              ? "Third-party vendors, including Google, may use cookies to serve ads. Personalised ads require consent where the law requires it."
              : "FigSumo does not currently show advertising or use advertising cookies."}
          </p>
        </section>

        <section aria-labelledby="cookies-heading">
          <h2
            id="cookies-heading"
            className="text-xl font-bold tracking-tight text-ink"
          >
            5. Cookies
          </h2>
          <p className="mt-3">
            Essential cookies or local storage may be used by our host to
            deliver the site securely. Preference storage in your browser (if
            enabled later) stays on your device. Non-essential cookies will not
            be set without consent where required.
          </p>
        </section>

        <section aria-labelledby="sharing-heading">
          <h2
            id="sharing-heading"
            className="text-xl font-bold tracking-tight text-ink"
          >
            6. Sharing
          </h2>
          <p className="mt-3">
            We share data with service providers who act for us (hosting:{" "}
            {business.hostingProvider}
            ). We don&apos;t sell personal information for money.
          </p>
        </section>

        <section aria-labelledby="rights-heading">
          <h2
            id="rights-heading"
            className="text-xl font-bold tracking-tight text-ink"
          >
            7. Your rights
          </h2>
          <p className="mt-3">
            Depending on where you live, you may have rights to access,
            correct, delete or restrict processing of your personal information,
            and to withdraw consent. To exercise a right, use the{" "}
            <Link href="/contact" className="font-semibold text-brand hover:underline">
              Contact
            </Link>{" "}
            page
            {privacyEmail ? (
              <>
                {" "}
                or email{" "}
                <a
                  href={`mailto:${privacyEmail}`}
                  className="font-semibold text-brand hover:underline"
                >
                  {privacyEmail}
                </a>
              </>
            ) : null}
            . We&apos;ll respond within the period the law requires.
          </p>
        </section>

        <section aria-labelledby="security-heading">
          <h2
            id="security-heading"
            className="text-xl font-bold tracking-tight text-ink"
          >
            8. Security and changes
          </h2>
          <p className="mt-3">
            We use HTTPS and limit access to the data we hold. No online service
            can guarantee absolute security. We&apos;ll update this page and its
            effective date when our practices change.
          </p>
        </section>
      </div>
    </article>
  );
}
