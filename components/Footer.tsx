import Link from "next/link";
import { Logo } from "./Logo";
import { calculatorCategories } from "@/lib/calculators";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-ink/15 bg-paper">
      <div className="flex flex-col gap-8 py-10 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <Logo size="sm" />
          <p className="mt-3 max-w-sm text-sm text-ink/70">
            Free online calculators. Clean tools that run in your browser.
          </p>
        </div>

        <nav aria-label="Footer" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-ink/45">
              Categories
            </p>
            <ul className="mt-3 space-y-2 text-sm text-ink">
              {calculatorCategories.map((category) => (
                <li key={category.id}>
                  <Link href={category.path} className="hover:underline">
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-ink/45">
              Site
            </p>
            <ul className="mt-3 space-y-2 text-sm text-ink">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/scientific-calculator" className="hover:underline">
                  Scientific Calculator
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:underline">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <p className="border-t border-ink/10 py-4 text-xs text-ink/50">
        © 2026 Figsumo
      </p>
    </footer>
  );
}
