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
      className="overflow-hidden rounded-xl border border-ink/15 bg-paper shadow-[0_8px_24px_-16px_rgba(16,16,16,0.35)]"
    >
      <div className="border-b border-brand/20 bg-brand px-4 py-3.5 text-white">
        <h2
          id="related-sidebar-heading"
          className="text-sm font-bold tracking-wide text-white"
        >
          Related calculators
        </h2>
        {categoryTitle && categoryHref ? (
          <Link
            href={categoryHref}
            className="mt-1 block text-xs font-semibold text-white/90 underline-offset-2 hover:text-white hover:underline"
          >
            View all {categoryTitle}
          </Link>
        ) : null}
      </div>
      <nav aria-label="Related calculators">
        <ul className="max-h-[min(36rem,70vh)] divide-y divide-ink/10 overflow-y-auto py-1">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block px-4 py-3 text-[15px] font-semibold text-ink transition-colors hover:bg-brand/[0.08] hover:text-brand"
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
