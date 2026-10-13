import Link from "next/link";

export function RelatedLinks({
  items,
}: {
  items: { href: string; title: string }[];
}) {
  if (!items.length) return null;
  return (
    <section aria-labelledby="related-calcs" className="mt-6">
      <div className="rounded-xl border border-ink/10 bg-ink/[0.03] p-4">
        <h2 id="related-calcs" className="text-sm font-bold text-ink">
          Related
        </h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="inline-flex rounded-lg border border-brand/30 bg-paper px-3 py-2 text-sm font-semibold text-brand hover:bg-brand hover:text-paper"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
