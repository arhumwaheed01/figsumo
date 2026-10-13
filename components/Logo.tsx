import Link from "next/link";

export function CalculatorMark({
  className = "h-8 w-8",
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="7" fill="#2563EB" />
      <rect
        x="8"
        y="7"
        width="16"
        height="18"
        rx="2"
        stroke="#FFFFFF"
        strokeWidth="1.5"
      />
      <rect x="10.5" y="9.5" width="11" height="3.5" rx="0.75" fill="#FFFFFF" />
      <circle cx="12" cy="17" r="1.15" fill="#FFFFFF" />
      <circle cx="16" cy="17" r="1.15" fill="#FFFFFF" />
      <circle cx="20" cy="17" r="1.15" fill="#FFFFFF" />
      <circle cx="12" cy="21.25" r="1.15" fill="#FFFFFF" />
      <circle cx="16" cy="21.25" r="1.15" fill="#FFFFFF" />
      <circle cx="20" cy="21.25" r="1.15" fill="#FFFFFF" />
    </svg>
  );
}

export function Logo({
  className = "",
  size = "md",
}: {
  className?: string;
  size?: "md" | "sm";
}) {
  const mark = size === "sm" ? "h-7 w-7" : "h-8 w-8";
  const text = size === "sm" ? "text-base" : "text-lg";

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 text-ink no-underline ${className}`}
    >
      <CalculatorMark className={mark} />
      <span className={`${text} font-semibold tracking-tight`}>Figsumo</span>
    </Link>
  );
}
