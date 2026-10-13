import Link from "next/link";
import type { CalculatorCategory } from "@/lib/calculators";

export function CategoryIndex({ category }: { category: CalculatorCategory }) {
  return (
    <article className="py-10 sm:py-14">
      <header className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-brand">
          <Link href="/" className="hover:underline">
            Figsumo
          </Link>
          {" / "}
          Calculators
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-5xl">
          {category.title}
        </h1>
        <p className="text-body mt-4 text-lg">
          {category.description} Pick a calculator to open a full interactive
          tool with clear results.
        </p>
        <p className="mt-3 text-base font-bold text-ink">
          {category.items.length} calculators in this category
        </p>
      </header>

      <div className="mt-10 overflow-hidden rounded-2xl border border-ink/15 bg-paper shadow-[0_8px_30px_-18px_rgba(16,16,16,0.35)]">
        <div className="border-b border-ink/10 bg-brand px-5 py-3.5 text-white sm:px-6">
          <h2 className="text-base font-bold text-white sm:text-lg">
            All {category.title}
          </h2>
        </div>
        <ul className="grid gap-x-6 gap-y-1 p-4 sm:grid-cols-2 sm:p-6 lg:grid-cols-3">
          {category.items.map((item) => (
            <li key={item.slug}>
              <Link
                href={item.path}
                className="group flex flex-col rounded-lg px-3 py-3 transition-colors hover:bg-brand/[0.06]"
              >
                <span className="text-[15px] font-bold text-brand group-hover:text-ink sm:text-base">
                  {item.title}
                </span>
                <span className="mt-1 text-sm leading-snug text-ink/65">
                  {item.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
