import Link from "next/link";

export type RelatedItem = {
  href: string;
  title: string;
};

export function RelatedSidebar({
  items,
  categoryTitle,
  categoryHref,
}: {
  items: RelatedItem[];
  categoryTitle?: string;
  categoryHref?: string;
}) {
  if (!items.length) return null;

  return (
    <aside
      aria-labelledby="related-sidebar-heading"
      className="rounded-xl border border-ink/15 bg-paper"
    >
      <div className="border-b border-ink/10 bg-ink/[0.03] px-4 py-3">
        <h2
          id="related-sidebar-heading"
          className="text-sm font-bold tracking-wide text-ink"
        >
          Related calculators
        </h2>
        {categoryTitle && categoryHref ? (
          <Link
            href={categoryHref}
            className="mt-1 block text-xs font-semibold text-brand hover:underline"
          >
            All {categoryTitle}
          </Link>
        ) : null}
      </div>
      <nav aria-label="Related calculators">
        <ul className="divide-y divide-ink/8 py-1">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-brand/[0.06] hover:text-brand"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
