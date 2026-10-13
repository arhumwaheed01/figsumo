import Link from "next/link";
import { calculatorCategories } from "@/lib/calculators";

/** Featured count for large categories on the homepage. */
const FEATURED = 15;

function listColumns(count: number) {
  if (count <= 3) return "sm:grid-cols-1 md:grid-cols-3";
  if (count <= 6) return "sm:grid-cols-2 lg:grid-cols-3";
  if (count <= 10) return "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
  return "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
}

export function HomeDirectory() {
  return (
    <section
      className="border-t border-ink/10 py-10 sm:py-14"
      aria-labelledby="directory-heading"
    >
      <div className="mb-7 max-w-3xl">
        <h2
          id="directory-heading"
          className="text-2xl font-bold tracking-tight text-ink sm:text-3xl"
        >
          Free online calculators
        </h2>
        <p className="text-body mt-2">
          Browse every category below. Each tool opens on its own page with
          inputs, results, charts, and related calculators.
        </p>
      </div>

      <div className="space-y-6">
        {calculatorCategories.map((category) => {
          const showAll = category.items.length <= FEATURED;
          const featured = showAll
            ? category.items
            : category.items.slice(0, FEATURED);
          const more = category.items.length - featured.length;
          const cols = listColumns(featured.length);

          return (
            <section
              key={category.id}
              aria-labelledby={`cat-${category.id}`}
              className="overflow-hidden rounded-xl border border-ink/15 bg-paper"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 bg-brand px-4 py-3 text-white sm:px-5">
                <h3
                  id={`cat-${category.id}`}
                  className="text-base font-bold text-white sm:text-lg"
                >
                  <Link
                    href={category.path}
                    className="text-white hover:text-white hover:underline"
                  >
                    {category.title}
                  </Link>
                </h3>
                <Link
                  href={category.path}
                  className="text-sm font-semibold text-white/90 hover:text-white hover:underline"
                >
                  View all {category.items.length}
                </Link>
              </div>

              <div className="px-4 py-4 sm:px-5">
                <p className="mb-3 text-sm text-ink/70">{category.description}</p>
                <ul className={`grid gap-x-6 gap-y-1 ${cols}`}>
                  {featured.map((item) => (
                    <li key={item.slug} className="min-w-0">
                      <Link
                        href={item.path}
                        className="group inline-flex max-w-full items-start gap-2 py-1 text-[15px] font-semibold leading-snug text-brand hover:text-ink"
                      >
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand group-hover:bg-ink"
                          aria-hidden
                        />
                        <span className="min-w-0">{item.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                {more > 0 ? (
                  <p className="mt-3 text-sm font-semibold text-ink/70">
                    +{more} more —{" "}
                    <Link
                      href={category.path}
                      className="text-brand underline underline-offset-2"
                    >
                      see full list
                    </Link>
                  </p>
                ) : null}
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
}
