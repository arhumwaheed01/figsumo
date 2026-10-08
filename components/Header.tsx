import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="border-b border-[#e4e4e7] bg-[#f4f4f5]">
      <div className="mx-auto flex h-14 max-w-[640px] items-center px-4">
        <Logo />
      </div>
    </header>
  );
}
