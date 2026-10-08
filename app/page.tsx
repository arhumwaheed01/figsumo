import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { CALCULATORS } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Free Job Calculators | Figsumo",
  description:
    "Free job calculators for paint, concrete, tile, overtime, and more. Run in your browser—free, no signup.",
  path: "/",
});

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-[640px] px-4 py-10">
      <h1 className="text-2xl font-semibold tracking-tight text-[#18181b] sm:text-3xl">
        Free calculators for real jobs.
      </h1>
      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[#71717a]">
        Pick a tool, enter the numbers, get the answer. No account needed.
      </p>

      <section id="calculators" className="mt-10 scroll-mt-20">
        <ul className="border-t border-[#e4e4e7]">
          {CALCULATORS.map((c) => (
            <li key={c.slug} className="border-b border-[#e4e4e7]">
              <Link
                href={`/${c.slug}`}
                className="flex items-center gap-3 px-1 py-4 hover:bg-[#e4e4e7]/40"
              >
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] font-medium text-[#18181b]">
                    {c.title}
                  </span>
                  <span className="mt-0.5 block text-sm text-[#71717a]">
                    {c.description}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="shrink-0 text-lg text-[#a1a1aa]"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
