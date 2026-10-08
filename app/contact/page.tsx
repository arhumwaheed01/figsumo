import { pageMetadata } from "@/lib/seo";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Email Figsumo at hello@figsumo.com. No contact form backend.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <article className="mx-auto w-full max-w-[640px] px-4 py-8">
      <h1 className="text-2xl font-semibold tracking-tight text-[#18181b]">
        Contact
      </h1>
      <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#3f3f46]">
        <p>
          There is no contact form backend on {SITE_NAME}. Email us directly:
        </p>
        <p>
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Figsumo feedback")}`}
            className="underline underline-offset-2"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
      </div>
    </article>
  );
}
