import { pageMetadata } from "@/lib/seo";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Privacy | Figsumo",
  description:
    "Figsumo has no accounts and does not save calculator inputs. Free tools, no signup.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <article className="mx-auto w-full max-w-[640px] px-4 py-8">
      <h1 className="text-2xl font-semibold tracking-tight text-[#18181b]">
        Privacy
      </h1>
      <div className="mt-6 space-y-4 text-base leading-relaxed text-[#3f3f46]">
        <p>
          {SITE_NAME} does not require an account. Calculator inputs are handled
          in your browser and are not saved on our servers.
        </p>
        <p>
          Like most websites, the host may keep basic request logs (such as IP
          address, browser type, and pages viewed) for reliability and security.
          We do not sell personal information.
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
