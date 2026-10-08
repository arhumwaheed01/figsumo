import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
} from "react";

export const ERR_GT_ZERO = "Enter a number greater than 0.";

const focusRing =
  "focus-within:border-[#3f3f46] focus-within:ring-2 focus-within:ring-[#3f3f46]/30";
const focusRingInvalid =
  "focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/30";

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
    <div className="space-y-1.5">
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-[#18181b]"
      >
        {label}
      </label>
      {hint ? <p className="text-sm text-[#71717a]">{hint}</p> : null}
      {children}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}

const inputShell =
  "h-12 w-full rounded-lg border bg-white text-base text-[#18181b] outline-none";

export function NumberInput({
  className = "",
  invalid = false,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }) {
  return (
    <input
      type="number"
      inputMode="decimal"
      className={`${inputShell} px-3 ${
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
      className={`${inputShell} px-3 ${
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
      className={`${inputShell} px-3 ${
        invalid
          ? `border-red-500 ${focusRingInvalid}`
          : `border-[#e4e4e7] ${focusRing}`
      } ${className}`}
      {...props}
    />
  );
}

/** Number field with unit on the right inside the control. 48px tall. */
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
    <div
      className={`flex h-12 items-stretch overflow-hidden rounded-lg border bg-white ${
        invalid
          ? `border-red-500 ${focusRingInvalid}`
          : `border-[#e4e4e7] ${focusRing}`
      }`}
    >
      <input
        id={id}
        type="number"
        inputMode={inputMode}
        min={min}
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-w-0 flex-1 border-0 bg-transparent px-3 text-base text-[#18181b] outline-none"
      />
      <span className="flex shrink-0 items-center pr-3 text-sm text-[#71717a]">
        {unit}
      </span>
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
      className="inline-flex h-12 items-center rounded-lg border border-[#e4e4e7] bg-white p-1"
    >
      {(["ft", "in"] as const).map((u) => (
        <button
          key={u}
          type="button"
          onClick={() => onChange(u)}
          className={`h-full rounded-md px-3 text-sm font-medium ${
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
    <div className="rounded-2xl border border-[#e4e4e7] bg-white px-5 py-6 text-center">
      <p
        className="font-semibold tracking-tight text-[#18181b] tabular-nums"
        style={{ fontSize: 40, lineHeight: 1.1 }}
      >
        {value}
      </p>
      <p className="mt-1.5 text-base text-[#71717a]">{unit}</p>
      {breakdown ? (
        <p className="mt-3 text-sm leading-snug text-[#71717a]">{breakdown}</p>
      ) : null}
    </div>
  );
}

/** White form card: 16px radius, 1px border. */
export function CalcForm({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-4 rounded-2xl border border-[#e4e4e7] bg-white p-4 sm:p-5">
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
      className="h-12 rounded-lg border border-[#e4e4e7] bg-white px-4 text-sm font-medium text-[#18181b] hover:bg-[#f4f4f5]"
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
