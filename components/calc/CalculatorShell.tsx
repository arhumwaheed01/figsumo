import type { ReactNode } from "react";

type CalculatorShellProps = {
  children: ReactNode;
  /** Thin brand accent along the top of the card */
  brandBar?: boolean;
  className?: string;
};

export function CalculatorShell({
  children,
  brandBar = true,
  className = "",
}: CalculatorShellProps) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border-2 border-ink/20 bg-paper ${className}`.trim()}
    >
      {brandBar ? <div className="h-1.5 w-full bg-brand" aria-hidden /> : null}
      <div className="p-5 sm:p-6">{children}</div>
    </div>
  );
}
