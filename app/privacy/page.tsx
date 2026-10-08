import { pageMetadata } from "@/lib/seo";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Privacy",
  description:
    "Figsumo does not require accounts. Calculator inputs stay in your browser. How we handle privacy.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <article className="mx-auto w-full max-w-[640px] px-4 py-8">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
        Privacy
      </h1>
      <div className="mt-6 space-y-4 text-base leading-relaxed text-zinc-700">
        <p>
          {SITE_NAME} does not ask you to create an account. Calculator inputs
          are processed in your browser and are not sent to our servers for
          calculation.
        </p>
        <p>
          Like most websites, our host (for example Vercel) may collect basic
          server logs such as IP address, user agent, and pages requested. We do
          not sell personal information.
        </p>
        <p>
          If we later add advertising (such as Google AdSense), that provider
          may use cookies or similar technologies under its own policies. No ad
          network is loaded on the site today.
        </p>
        <p>
          Questions:{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="underline underline-offset-2"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </div>
    </article>
  );
}
