import { pageMetadata } from "@/lib/seo";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact | Figsumo",
  description:
    "Email Figsumo at hello@figsumo.com. Free calculators, no signup—just a simple mailto link.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <article className="mx-auto w-full max-w-[640px] px-4 py-8">
      <h1 className="text-2xl font-semibold tracking-tight text-[#18181b]">
        Contact
      </h1>
      <div className="mt-6 space-y-4 text-base leading-relaxed text-[#3f3f46]">
        <p>
          There is no contact form backend on {SITE_NAME}. Email us directly and
          your mail app will open with the address filled in.
        </p>
        <p>
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Figsumo feedback")}`}
            className="inline-flex h-12 items-center rounded-lg bg-[#3f3f46] px-4 text-base font-medium text-white hover:bg-[#27272a]"
          >
            Email {CONTACT_EMAIL}
          </a>
        </p>
        <p className="text-sm text-[#71717a]">
          Or copy the address: {CONTACT_EMAIL}
        </p>
      </div>
    </article>
  );
}
