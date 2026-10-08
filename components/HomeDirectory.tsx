"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CALCULATORS, HOME_GROUPS, getCalculator } from "@/lib/site";

export function HomeDirectory() {
  const [query, setQuery] = useState("");

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    return HOME_GROUPS.map((group) => {
      const items = group.slugs
        .map((slug) => getCalculator(slug)!)
        .filter((c) => {
          if (!q) return true;
          return (
            c.title.toLowerCase().includes(q) ||
            c.shortTitle.toLowerCase().includes(q) ||
            c.description.toLowerCase().includes(q)
          );
        });
      return { name: group.name, items };
    }).filter((g) => g.items.length > 0);
  }, [query]);

  return (
    <div>
      <label htmlFor="calc-search" className="sr-only">
        Search calculators
      </label>
      <input
        id="calc-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search calculators"
        className="h-12 w-full rounded border border-[#e4e4e7] bg-white px-3 text-base text-[#18181b] outline-none focus:border-[#3f3f46] focus:ring-2 focus:ring-[#3f3f46]/30"
      />

      <div className="mt-8 space-y-8">
        {groups.length === 0 ? (
          <p className="text-sm text-[#71717a]">No calculators match that search.</p>
        ) : (
          groups.map((group) => (
            <section key={group.name}>
              <h2 className="text-sm font-semibold text-[#18181b]">{group.name}</h2>
              <ul className="mt-2 space-y-1">
                {group.items.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/${c.slug}`}
                      className="text-[15px] text-[#3f3f46] underline-offset-2 hover:underline"
                    >
                      {c.shortTitle}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))
        )}
      </div>

      {/* Keep full list in DOM for SEO when filtering empties a group — all links remain in footer. */}
      <noscript>
        <ul>
          {CALCULATORS.map((c) => (
            <li key={c.slug}>
              <a href={`/${c.slug}`}>{c.title}</a>
            </li>
          ))}
        </ul>
      </noscript>
    </div>
  );
}
