import Link from "next/link";

/** 28px grey rounded square with a white calculator glyph. */
export function LogoMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg
      className={className}
      width={28}
      height={28}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="28" height="28" rx="6" fill="#3f3f46" />
      <rect
        x="7"
        y="6"
        width="14"
        height="16"
        rx="1.5"
        stroke="#ffffff"
        strokeWidth="1.5"
        fill="none"
      />
      <rect x="9.25" y="8.25" width="9.5" height="2.75" rx="0.5" fill="#ffffff" />
      <circle cx="10.5" cy="14.5" r="1.1" fill="#ffffff" />
      <circle cx="14" cy="14.5" r="1.1" fill="#ffffff" />
      <circle cx="17.5" cy="14.5" r="1.1" fill="#ffffff" />
      <circle cx="12.25" cy="18" r="1.1" fill="#ffffff" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 no-underline ${className}`}
    >
      <LogoMark />
      <span className="text-base font-semibold tracking-tight text-[#18181b]">
        Figsumo
      </span>
    </Link>
  );
}
