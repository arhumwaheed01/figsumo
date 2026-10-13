import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Contact",
  description: `Contact Figsumo at ${siteConfig.email}.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <article className="py-12">
      <h1 className="text-3xl font-semibold tracking-tight text-ink">Contact</h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/80">
        Email{" "}
        <a
          href={`mailto:${siteConfig.email}`}
          className="underline underline-offset-2"
        >
          {siteConfig.email}
        </a>
        .
      </p>
    </article>
  );
}
