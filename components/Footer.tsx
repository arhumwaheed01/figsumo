import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200">
      <div className="mx-auto flex max-w-[640px] flex-wrap items-center gap-x-4 gap-y-1 px-4 py-5 text-xs text-zinc-500">
        <span>© 2026 {SITE_NAME}</span>
        <Link href="/about" className="hover:text-zinc-800">
          About
        </Link>
        <Link href="/privacy" className="hover:text-zinc-800">
          Privacy
        </Link>
        <Link href="/contact" className="hover:text-zinc-800">
          Contact
        </Link>
      </div>
    </footer>
  );
}
