import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "About Figsumo — free online calculators that run in your browser for planning and everyday math.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <article className="py-12">
      <h1 className="text-3xl font-semibold tracking-tight text-ink">About</h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/80">
        Figsumo is a free calculator site. Tools run in your browser. Results are
        for planning; double-check when accuracy matters.
      </p>
    </article>
  );
}
