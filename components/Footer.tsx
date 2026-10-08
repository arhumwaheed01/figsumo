import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[#e4e4e7]">
      <div className="mx-auto flex max-w-[640px] flex-wrap items-center gap-x-5 gap-y-1 px-4 py-4 text-xs text-[#71717a]">
        <Link href="/about" className="hover:text-[#18181b]">
          About
        </Link>
        <Link href="/privacy" className="hover:text-[#18181b]">
          Privacy
        </Link>
        <Link href="/contact" className="hover:text-[#18181b]">
          Contact
        </Link>
      </div>
    </footer>
  );
}
