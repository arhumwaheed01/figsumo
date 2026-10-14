"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useDeferredValue,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { searchCalculators, type SearchHit } from "@/lib/search";

export function HeaderSearch() {
  const router = useRouter();
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const deferred = useDeferredValue(query);
  const hits: SearchHit[] = deferred.trim()
    ? searchCalculators(deferred, 8)
    : [];

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  useEffect(() => {
    setActive(0);
  }, [deferred]);

  function goToResults(value: string) {
    const q = value.trim();
    setOpen(false);
    if (!q) {
      router.push("/");
      return;
    }
    router.push(`/?q=${encodeURIComponent(q)}`);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (open && hits[active]) {
      router.push(hits[active].tool.path);
      setOpen(false);
      return;
    }
    goToResults(query);
  }

  return (
    <div ref={rootRef} className="relative w-[min(100%,14rem)] sm:w-[min(100%,18rem)] md:w-[min(100%,20rem)]">
      <form role="search" action="/" method="get" onSubmit={onSubmit}>
        <label htmlFor="site-search" className="sr-only">
          Search calculators
        </label>
        <div className="relative">
          <span
            className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-ink"
            aria-hidden="true"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
            </svg>
          </span>
          <input
            id="site-search"
            name="q"
            type="search"
            value={query}
            autoComplete="off"
            aria-autocomplete="list"
            aria-controls={listId}
            aria-expanded={open && hits.length > 0}
            placeholder="Search"
            className="h-10 w-full rounded-full border border-ink/20 bg-paper pl-10 pr-3 text-sm text-ink outline-none placeholder:text-ink/45 focus:border-brand focus:ring-2 focus:ring-brand/20 sm:h-11 sm:pr-4"
            onChange={(event) => {
              setQuery(event.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={(event) => {
              if (!open || hits.length === 0) return;
              if (event.key === "ArrowDown") {
                event.preventDefault();
                setActive((i) => (i + 1) % hits.length);
              } else if (event.key === "ArrowUp") {
                event.preventDefault();
                setActive((i) => (i - 1 + hits.length) % hits.length);
              } else if (event.key === "Escape") {
                setOpen(false);
              }
            }}
          />
        </div>
      </form>

      {open && query.trim() && hits.length > 0 ? (
        <ul
          id={listId}
          role="listbox"
          className="absolute right-0 z-50 mt-2 max-h-[min(24rem,70vh)] w-[min(100vw-2rem,22rem)] overflow-y-auto rounded-xl border border-ink/15 bg-paper py-2 shadow-[0_16px_40px_-16px_rgba(16,16,16,0.25)]"
        >
          {hits.map((hit, index) => (
            <li key={hit.tool.slug} role="option" aria-selected={index === active}>
              <Link
                href={hit.tool.path}
                className={`block px-4 py-2.5 text-sm ${
                  index === active
                    ? "bg-brand/[0.08] text-brand"
                    : "text-ink hover:bg-brand/[0.06] hover:text-brand"
                }`}
                onMouseEnter={() => setActive(index)}
                onClick={() => setOpen(false)}
              >
                <span className="font-semibold">{hit.tool.title}</span>
                <span className="mt-0.5 block text-xs text-ink/50">
                  {hit.category.shortTitle}
                </span>
              </Link>
            </li>
          ))}
          <li className="border-t border-ink/10 px-4 py-2">
            <button
              type="button"
              className="text-sm font-semibold text-brand hover:underline"
              onClick={() => goToResults(query)}
            >
              See all results for “{query.trim()}”
            </button>
          </li>
        </ul>
      ) : null}

      {open && query.trim() && hits.length === 0 ? (
        <div className="absolute right-0 z-50 mt-2 w-[min(100vw-2rem,22rem)] rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm text-ink/70 shadow-[0_16px_40px_-16px_rgba(16,16,16,0.25)]">
          No matches. Press Enter to search the full directory.
        </div>
      ) : null}
    </div>
  );
}
