import Link from "next/link";
import { Logo } from "./Logo";
import { calculatorCategories } from "@/lib/calculators";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-ink/10 bg-paper">
      <div className="grid gap-10 px-1 py-14 sm:gap-12 sm:py-16 lg:grid-cols-12 lg:gap-10 lg:py-20">
        <div className="lg:col-span-5">
          <Logo size="sm" />
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-ink/70">
            Free online calculators for finance, fitness, math, and everyday
            planning. Tools run in your browser — no account required.
          </p>
        </div>

        <nav
          aria-label="Footer"
          className="grid gap-10 sm:grid-cols-2 lg:col-span-7 lg:gap-12"
        >
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink/50">
              Categories
            </p>
            <ul className="mt-5 space-y-3 text-[15px] font-medium text-ink/85">
              {calculatorCategories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={category.path}
                    className="transition-colors hover:text-brand"
                  >
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink/50">
              Site
            </p>
            <ul className="mt-5 space-y-3 text-[15px] font-medium text-ink/85">
              <li>
                <Link href="/" className="transition-colors hover:text-brand">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/scientific-calculator"
                  className="transition-colors hover:text-brand"
                >
                  Scientific Calculator
                </Link>
              </li>
              <li>
                <Link href="/about" className="transition-colors hover:text-brand">
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="transition-colors hover:text-brand"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="transition-colors hover:text-brand"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div className="border-t border-ink/10 py-6">
        <p className="text-sm text-ink/45">© 2026 Figsumo</p>
      </div>
    </footer>
  );
}
