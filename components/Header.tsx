import Link from "next/link";
import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#e4e4e7] bg-[#f4f4f5]">
      <div className="mx-auto flex h-14 max-w-[640px] items-center justify-between px-4">
        <Logo />
        <Link
          href="/#calculators"
          className="text-sm text-[#71717a] hover:text-[#18181b]"
        >
          All calculators
        </Link>
      </div>
    </header>
  );
}
