import Link from "next/link";
import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-[#f4f4f5]">
      <div className="mx-auto flex h-12 max-w-[640px] items-center justify-between px-4">
        <Logo />
        <Link
          href="/#calculators"
          className="text-sm text-zinc-600 hover:text-zinc-900"
        >
          All calculators
        </Link>
      </div>
    </header>
  );
}
