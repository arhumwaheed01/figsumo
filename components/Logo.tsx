import Link from "next/link";

type LogoProps = {
  className?: string;
};

export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="40" height="40" rx="8" fill="#3f3f46" />
      {/* Right-angle ruler */}
      <path
        d="M10 28V12h3v13h13v3H10z"
        fill="#ffffff"
      />
      <path
        d="M13 15h2M13 18h2M13 21h2M13 24h2M16 28v-2M19 28v-2M22 28v-2"
        stroke="#3f3f46"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 text-zinc-900 no-underline ${className}`}
    >
      <LogoMark />
      <span className="text-base font-semibold tracking-tight">Figsumo</span>
    </Link>
  );
}
