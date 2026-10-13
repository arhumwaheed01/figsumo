import Link from "next/link";
import type { CalculatorCategory } from "@/lib/calculators";

export function CategoryIndex({ category }: { category: CalculatorCategory }) {
  return (
    <article className="py-10 sm:py-12">
      <header className="max-w-3xl">
        <p className="text-sm font-semibold tracking-wide text-brand">
          <Link href="/" className="hover:underline">
            Figsumo
          </Link>
          {" / "}
          Calculators
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {category.title}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-ink/70 sm:text-lg">
          {category.description}
        </p>
      </header>

      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {category.items.map((item) => (
          <li key={item.slug}>
            <Link
              href={item.path}
              className="block h-full rounded-xl border border-ink/15 px-5 py-4 transition-colors hover:border-brand/40 hover:bg-brand/[0.04]"
            >
              <span className="text-base font-semibold text-ink">
                {item.title}
              </span>
              <span className="mt-1 block text-sm leading-relaxed text-ink/60">
                {item.description}
              </span>
              <span className="mt-3 inline-block text-xs font-semibold uppercase tracking-wide text-brand">
                Open
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
