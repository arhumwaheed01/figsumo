import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
} from "react";

export const ERR_GT_ZERO = "Enter a number greater than 0.";

const focusRing =
  "focus:border-[#3f3f46] focus:ring-2 focus:ring-[#3f3f46]/30";
const focusRingInvalid =
  "focus:border-red-500 focus:ring-2 focus:ring-red-500/30";

/** Label left, control right — calculator.net-style row. */
export function Field({
  label,
  htmlFor,
  children,
  hint,
  error,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
  hint?: string;
  error?: string | null;
}) {
  return (
    <div className="border-b border-[#e4e4e7] py-3 last:border-b-0">
      <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[minmax(0,11rem)_minmax(0,1fr)] sm:gap-4">
        <div>
          <label
            htmlFor={htmlFor}
            className="text-sm font-medium text-[#18181b]"
          >
            {label}
          </label>
          {hint ? (
            <p className="mt-0.5 text-xs text-[#71717a]">{hint}</p>
          ) : null}
        </div>
        <div>{children}</div>
      </div>
      {error ? (
        <p className="mt-1 text-sm text-red-600 sm:pl-[calc(11rem+1rem)]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const inputShell =
  "h-11 w-full min-w-0 rounded border bg-white px-3 text-base text-[#18181b] outline-none";

export function NumberInput({
  className = "",
  invalid = false,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }) {
  return (
    <input
      type="number"
      inputMode="decimal"
      className={`${inputShell} ${
        invalid
          ? `border-red-500 ${focusRingInvalid}`
          : `border-[#e4e4e7] ${focusRing}`
      } ${className}`}
      {...props}
    />
  );
}

export function TextInput({
  className = "",
  invalid = false,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }) {
  return (
    <input
      className={`${inputShell} ${
        invalid
          ? `border-red-500 ${focusRingInvalid}`
          : `border-[#e4e4e7] ${focusRing}`
      } ${className}`}
      {...props}
    />
  );
}

export function SelectInput({
  className = "",
  invalid = false,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean }) {
  return (
    <select
      className={`${inputShell} ${
        invalid
          ? `border-red-500 ${focusRingInvalid}`
          : `border-[#e4e4e7] ${focusRing}`
      } ${className}`}
      {...props}
    />
  );
}

/** Input with unit text immediately to the right of the field. */
export function UnitInput({
  id,
  value,
  onChange,
  unit,
  invalid = false,
  min,
  step = "any",
  inputMode = "decimal",
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  unit: string;
  invalid?: boolean;
  min?: number;
  step?: string | number;
  inputMode?: "decimal" | "numeric";
}) {
  return (
    <div className="flex items-center gap-2">
      <input
        id={id}
        type="number"
        inputMode={inputMode}
        min={min}
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputShell} max-w-[12rem] flex-1 ${
          invalid
            ? `border-red-500 ${focusRingInvalid}`
            : `border-[#e4e4e7] ${focusRing}`
        }`}
      />
      {unit ? (
        <span className="shrink-0 text-sm text-[#71717a]">{unit}</span>
      ) : null}
    </div>
  );
}

export function UnitToggle({
  value,
  onChange,
  label = "Unit",
}: {
  value: "ft" | "in";
  onChange: (unit: "ft" | "in") => void;
  label?: string;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex h-11 items-center rounded border border-[#e4e4e7] bg-white p-0.5"
    >
      {(["ft", "in"] as const).map((u) => (
        <button
          key={u}
          type="button"
          onClick={() => onChange(u)}
          className={`h-full rounded px-3 text-sm font-medium ${
            value === u
              ? "bg-[#3f3f46] text-white"
              : "text-[#71717a] hover:text-[#18181b]"
          }`}
        >
          {u}
        </button>
      ))}
    </div>
  );
}

/** Simple bordered result box — large number first. */
export function ResultCard({
  value,
  unit,
  breakdown,
}: {
  value: string;
  unit: string;
  breakdown?: string;
}) {
  return (
    <div className="border border-[#e4e4e7] bg-white px-4 py-5">
      <p className="text-4xl font-semibold tracking-tight text-[#18181b] tabular-nums">
        {value}
      </p>
      <p className="mt-1 text-sm text-[#71717a]">{unit}</p>
      {breakdown ? (
        <p className="mt-2 text-sm text-[#71717a]">{breakdown}</p>
      ) : null}
    </div>
  );
}

export function CalcForm({ children }: { children: ReactNode }) {
  return (
    <div className="border border-[#e4e4e7] bg-white px-3 sm:px-4">
      {children}
    </div>
  );
}

export function Button({
  children,
  onClick,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="h-11 rounded border border-[#e4e4e7] bg-white px-3 text-sm font-medium text-[#18181b] hover:bg-[#f4f4f5]"
    >
      {children}
    </button>
  );
}

export function isPositive(value: string): boolean {
  const n = Number(value);
  return Number.isFinite(n) && n > 0;
}

export function isNonNegative(value: string): boolean {
  const n = Number(value);
  return Number.isFinite(n) && n >= 0;
}
