"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { calculatorCategories } from "@/lib/calculators";
import { Logo } from "./Logo";

function columnClass(count: number) {
  if (count > 40) {
    return "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5";
  }
  if (count > 12) return "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
  if (count > 6) return "grid-cols-2 lg:grid-cols-3";
  return "grid-cols-1 sm:grid-cols-2";
}

export function Header() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const baseId = useId();

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpenId(null);
      }
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenId(null);
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const openCategory =
    calculatorCategories.find((category) => category.id === openId) ?? null;

  return (
    <header
      ref={rootRef}
      className="sticky top-0 z-40 border-b border-ink/15 bg-paper"
      onMouseLeave={() => setOpenId(null)}
    >
      <div className="relative w-full">
        <div className="grid h-16 w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 sm:gap-4">
          <Logo />

          <nav aria-label="Calculators" className="min-w-0">
            <ul className="hidden items-center justify-center gap-0.5 xl:flex">
              {calculatorCategories.map((category) => {
                const isOpen = openId === category.id;
                return (
                  <li key={category.id}>
                    <button
                      type="button"
                      className={`inline-flex h-10 items-center gap-1 rounded-md px-2.5 text-sm font-semibold text-ink transition-colors hover:bg-ink/[0.04] hover:text-brand ${
                        isOpen ? "bg-ink/[0.04] text-brand" : ""
                      }`}
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                      aria-controls={`${baseId}-${category.id}`}
                      onMouseEnter={() => setOpenId(category.id)}
                      onFocus={() => setOpenId(category.id)}
                      onClick={() =>
                        setOpenId((current) =>
                          current === category.id ? null : category.id,
                        )
                      }
                    >
                      {category.shortTitle}
                      <Chevron open={isOpen} />
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="flex justify-center xl:hidden">
              <button
                type="button"
                className="inline-flex h-10 items-center gap-2 rounded-md border border-ink/15 px-3 text-sm font-semibold text-ink"
                aria-expanded={mobileOpen}
                aria-controls={`${baseId}-mobile`}
                onClick={() => setMobileOpen((v) => !v)}
              >
                Calculators
                <Chevron open={mobileOpen} />
              </button>
            </div>
          </nav>

          <form
            className="w-[min(100%,14rem)] sm:w-[min(100%,18rem)] md:w-[min(100%,20rem)]"
            role="search"
            action="/"
            method="get"
          >
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
                placeholder="Search"
                className="h-10 w-full rounded-full border border-ink/20 bg-paper pl-10 pr-3 text-sm text-ink outline-none placeholder:text-ink/45 focus:border-brand focus:ring-2 focus:ring-brand/20 sm:h-11 sm:pr-4"
              />
            </div>
          </form>
        </div>

        {openCategory ? (
          <div
            id={`${baseId}-${openCategory.id}`}
            role="menu"
            className="absolute inset-x-0 top-full z-50 hidden pt-2 xl:block"
          >
            <div className="overflow-hidden rounded-xl border border-ink/15 bg-paper shadow-[0_16px_40px_-16px_rgba(16,16,16,0.25)]">
              <div className="border-b border-ink/10 px-5 py-3">
                <Link
                  href={openCategory.path}
                  role="menuitem"
                  className="text-sm font-bold text-ink hover:text-brand"
                  onClick={() => setOpenId(null)}
                >
                  {openCategory.title}
                </Link>
              </div>
              <ul
                className={`grid max-h-[min(32rem,70vh)] gap-x-3 overflow-y-auto p-3 sm:p-4 ${columnClass(
                  openCategory.items.length,
                )}`}
              >
                {openCategory.items.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={item.path}
                      role="menuitem"
                      className="block rounded-lg px-3 py-1.5 text-[13px] leading-snug text-ink hover:bg-brand/[0.06] hover:text-brand"
                      onClick={() => setOpenId(null)}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
      </div>

      {mobileOpen ? (
        <div
          id={`${baseId}-mobile`}
          className="fixed inset-x-0 top-16 z-50 max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-ink/15 bg-paper xl:hidden"
        >
          <div className="mx-auto w-full max-w-[1440px] px-[var(--page-pad)] py-3">
            {calculatorCategories.map((category) => (
              <details key={category.id} className="border-b border-ink/10 py-2">
                <summary className="cursor-pointer list-none py-2 text-sm font-bold text-ink marker:content-none">
                  <span className="flex items-center justify-between gap-3">
                    {category.title}
                    <span className="text-ink/40" aria-hidden="true">
                      +
                    </span>
                  </span>
                </summary>
                <ul className="pb-2 pl-1">
                  <li>
                    <Link
                      href={category.path}
                      className="block rounded-lg px-3 py-2 text-sm font-semibold text-brand"
                      onClick={() => setMobileOpen(false)}
                    >
                      View all
                    </Link>
                  </li>
                  {category.items.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={item.path}
                        className="block rounded-lg px-3 py-2 text-sm text-ink hover:bg-brand/[0.06]"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className={`transition-transform ${open ? "rotate-180" : ""}`}
    >
      <path
        d="M2.5 4.5L6 8l3.5-3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
