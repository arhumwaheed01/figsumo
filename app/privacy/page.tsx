import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Privacy",
  description:
    "Figsumo privacy policy: no accounts required, and calculator inputs stay in your browser.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <article className="py-12">
      <h1 className="text-3xl font-semibold tracking-tight text-ink">Privacy</h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/80">
        Figsumo does not require an account. Calculator inputs stay in your
        browser and are not saved on our servers.
      </p>
    </article>
  );
}
