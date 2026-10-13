import Link from "next/link";
import { Logo } from "./Logo";
import { calculatorCategories } from "@/lib/calculators";

export function Footer() {
  return (
    <footer className="mt-auto mb-[5px] overflow-hidden rounded-[8px] bg-brand text-white">
      <div className="grid gap-10 px-6 py-12 sm:gap-12 sm:px-8 sm:py-14 lg:grid-cols-12 lg:gap-10 lg:px-10 lg:py-16">
        <div className="lg:col-span-5">
          <Logo size="sm" inverted />
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/85">
            Free online calculators for finance, fitness, math, and everyday
            planning. Tools run in your browser — no account required.
          </p>
        </div>

        <nav
          aria-label="Footer"
          className="grid gap-10 sm:grid-cols-2 lg:col-span-7 lg:gap-12"
        >
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/70">
              Categories
            </p>
            <ul className="mt-5 space-y-3 text-[15px] font-medium text-white">
              {calculatorCategories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={category.path}
                    className="transition-colors hover:text-white/80"
                  >
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/70">
              Site
            </p>
            <ul className="mt-5 space-y-3 text-[15px] font-medium text-white">
              <li>
                <Link href="/" className="transition-colors hover:text-white/80">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/scientific-calculator"
                  className="transition-colors hover:text-white/80"
                >
                  Scientific Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="transition-colors hover:text-white/80"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="transition-colors hover:text-white/80"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="transition-colors hover:text-white/80"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div className="border-t border-white/20 px-6 py-6 sm:px-8 lg:px-10">
        <p className="text-center text-sm text-white/80">© 2026 FigSumo</p>
      </div>
    </footer>
  );
}
