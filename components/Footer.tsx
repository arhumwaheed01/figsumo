import Link from "next/link";
import { CALCULATORS } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[#e4e4e7] bg-[#f4f4f5]">
      <div className="mx-auto max-w-[640px] px-4 py-8 text-sm text-[#71717a]">
        <nav className="flex flex-wrap gap-x-4 gap-y-1">
          <Link href="/about" className="hover:text-[#18181b]">
            About
          </Link>
          <Link href="/privacy" className="hover:text-[#18181b]">
            Privacy
          </Link>
          <Link href="/contact" className="hover:text-[#18181b]">
            Contact
          </Link>
        </nav>
        <p className="mt-4 text-xs font-medium uppercase tracking-wide text-[#a1a1aa]">
          Calculators
        </p>
        <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
          {CALCULATORS.map((c) => (
            <li key={c.slug}>
              <Link href={`/${c.slug}`} className="hover:text-[#18181b]">
                {c.shortTitle}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
