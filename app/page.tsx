import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { CALCULATORS, SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const metadata = pageMetadata({
  title: `${SITE_NAME} — Free Calculators`,
  description:
    "Free calculators for jobs people actually search. Concrete, paint, tile, overtime, age, GPA, postage, and tip.",
  path: "/",
});

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-[640px] px-4 py-8">
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
        {SITE_NAME}
      </h1>
      <p className="mt-2 text-[15px] text-zinc-600">{SITE_TAGLINE}</p>

      <section id="calculators" className="mt-8 scroll-mt-16">
        <ul className="divide-y divide-zinc-200 border-t border-b border-zinc-200">
          {CALCULATORS.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/${c.slug}`}
                className="block py-3 hover:bg-zinc-50/80"
              >
                <span className="text-[15px] font-medium text-zinc-900">
                  {c.title}
                </span>
                <span className="mt-0.5 block text-sm text-zinc-500">
                  {c.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
