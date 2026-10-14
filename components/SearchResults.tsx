import Link from "next/link";
import { searchCalculators } from "@/lib/search";

export function SearchResults({ query }: { query: string }) {
  const q = query.trim();
  const hits = searchCalculators(q);

  return (
    <section
      className="border-b border-ink/10 py-10 sm:py-12"
      aria-labelledby="search-results-heading"
    >
      <h2
        id="search-results-heading"
        className="text-2xl font-bold tracking-tight text-ink sm:text-3xl"
      >
        {q ? `Results for “${q}”` : "Search calculators"}
      </h2>
      <p className="mt-2 text-base text-ink/70">
        {q
          ? hits.length === 0
            ? "No calculators matched. Try a shorter word, like mortgage, BMI, or tax."
            : `${hits.length} calculator${hits.length === 1 ? "" : "s"} found.`
          : "Type a topic in the header search, then press Enter."}
      </p>

      {hits.length > 0 ? (
        <ul className="mt-6 divide-y divide-ink/10 overflow-hidden rounded-xl border border-ink/15 bg-paper">
          {hits.map(({ tool, category }) => (
            <li key={tool.slug}>
              <Link
                href={tool.path}
                className="flex flex-col gap-1 px-4 py-3.5 transition-colors hover:bg-brand/[0.06] sm:flex-row sm:items-baseline sm:justify-between sm:gap-4 sm:px-5"
              >
                <span className="text-[15px] font-semibold text-ink hover:text-brand sm:text-base">
                  {tool.title}
                </span>
                <span className="shrink-0 text-sm text-ink/55">
                  {category.shortTitle}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}

      {q && hits.length === 0 ? (
        <p className="mt-6">
          <Link
            href="/"
            className="text-[15px] font-semibold text-brand hover:underline"
          >
            Browse all calculators
          </Link>
        </p>
      ) : null}
    </section>
  );
}
