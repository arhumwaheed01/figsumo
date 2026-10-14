import Link from "next/link";
import { calculatorCategories } from "@/lib/calculators";
import { siteConfig } from "@/lib/site";

const popular = [
  { href: "/scientific-calculator", title: "Scientific Calculator" },
  { href: "/mortgage-calculator", title: "Mortgage Calculator" },
  { href: "/bmi-calculator", title: "BMI Calculator" },
  { href: "/loan-calculator", title: "Loan Calculator" },
  { href: "/compound-interest-calculator", title: "Compound Interest Calculator" },
  { href: "/calorie-calculator", title: "Calorie Calculator" },
] as const;

export default function NotFound() {
  return (
    <article className="py-12 sm:py-16">
      <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/75">
        That URL is not a {siteConfig.name} calculator or page. Check the
        address, or pick a hub or popular tool below.
      </p>

      <form
        action="/"
        method="get"
        role="search"
        className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
      >
        <label className="sr-only" htmlFor="not-found-search">
          Search {siteConfig.name}
        </label>
        <input
          id="not-found-search"
          name="q"
          type="search"
          placeholder="Search calculators"
          className="min-w-0 flex-1 rounded-lg border border-ink/15 bg-paper px-4 py-3 text-[15px] text-ink outline-none ring-brand focus:ring-2"
        />
        <button
          type="submit"
          className="rounded-lg bg-brand px-5 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-brand/90"
        >
          Search
        </button>
      </form>

      <section className="mt-12" aria-labelledby="hubs-heading">
        <h2
          id="hubs-heading"
          className="text-sm font-bold uppercase tracking-[0.14em] text-ink/50"
        >
          Browse by category
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {calculatorCategories.map((category) => (
            <li key={category.id}>
              <Link
                href={category.path}
                className="block rounded-lg border border-ink/10 bg-paper px-4 py-3 text-[15px] font-semibold text-ink transition-colors hover:border-brand/40 hover:text-brand"
              >
                {category.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12" aria-labelledby="popular-heading">
        <h2
          id="popular-heading"
          className="text-sm font-bold uppercase tracking-[0.14em] text-ink/50"
        >
          Popular calculators
        </h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {popular.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-[15px] font-semibold text-brand hover:underline"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-12">
        <Link href="/" className="text-[15px] font-semibold text-brand hover:underline">
          Back to home
        </Link>
      </p>
    </article>
  );
}
