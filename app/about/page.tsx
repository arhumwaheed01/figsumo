import { pageMetadata } from "@/lib/seo";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Figsumo is a small free calculator site. No accounts, no database—just tools that run in your browser.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <article className="mx-auto w-full max-w-[640px] px-4 py-8">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
        About {SITE_NAME}
      </h1>
      <div className="mt-6 space-y-4 text-base leading-relaxed text-zinc-700">
        <p>{SITE_TAGLINE}</p>
        <p>
          {SITE_NAME} is a narrow site: a handful of calculators people actually
          search for, with the formula and an example on every page. Math runs
          in your browser. There is no account system and no database.
        </p>
        <p>
          Results are estimates for planning. Building codes, school policies,
          payroll rules, and postage rates vary. When it matters, double-check
          with a professional or the official source.
        </p>
      </div>
    </article>
  );
}
