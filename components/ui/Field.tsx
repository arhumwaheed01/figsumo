import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
} from "react";

export const ERR_GT_ZERO = "Enter a number greater than 0.";

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
    <div className="space-y-1">
      <label
        htmlFor={htmlFor}
        className="block text-[15px] font-medium text-zinc-800"
      >
        {label}
      </label>
      {hint ? <p className="text-sm text-zinc-500">{hint}</p> : null}
      {children}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}

const inputBase =
  "w-full rounded border bg-white py-3 text-base text-zinc-900 outline-none";

export function NumberInput({
  className = "",
  invalid = false,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }) {
  return (
    <input
      type="number"
      inputMode="decimal"
      className={`${inputBase} px-3 ${
        invalid
          ? "border-red-500 focus:border-red-600"
          : "border-zinc-300 focus:border-zinc-500"
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
      className={`${inputBase} px-3 ${
        invalid
          ? "border-red-500 focus:border-red-600"
          : "border-zinc-300 focus:border-zinc-500"
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
      className={`${inputBase} px-3 ${
        invalid
          ? "border-red-500 focus:border-red-600"
          : "border-zinc-300 focus:border-zinc-500"
      } ${className}`}
      {...props}
    />
  );
}

/** Number field with unit on the right inside the control. */
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
      className={`flex items-stretch overflow-hidden rounded border bg-white ${
        invalid
          ? "border-red-500 focus-within:border-red-600"
          : "border-zinc-300 focus-within:border-zinc-500"
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
        className="min-w-0 flex-1 border-0 bg-transparent py-3 pl-3 pr-2 text-base text-zinc-900 outline-none"
      />
      <span className="flex shrink-0 items-center pr-3 text-sm text-zinc-500">
        {unit}
      </span>
    </div>
  );
}

/** Compact feet / inches toggle — use only where both units are common. */
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
      className="inline-flex rounded border border-zinc-300 bg-white p-0.5"
    >
      {(["ft", "in"] as const).map((u) => (
        <button
          key={u}
          type="button"
          onClick={() => onChange(u)}
          className={`rounded px-3 py-1.5 text-sm font-medium ${
            value === u
              ? "bg-zinc-700 text-white"
              : "text-zinc-600 hover:text-zinc-900"
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
    <div className="rounded border border-zinc-200 bg-white px-4 py-5 text-center shadow-sm">
      <p className="text-4xl font-semibold tracking-tight text-zinc-900 tabular-nums">
        {value}
      </p>
      <p className="mt-1 text-base text-zinc-500">{unit}</p>
      {breakdown ? (
        <p className="mt-3 text-sm text-zinc-600">{breakdown}</p>
      ) : null}
    </div>
  );
}

export function CalcForm({ children }: { children: ReactNode }) {
  return <div className="space-y-4">{children}</div>;
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
      className="rounded border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50"
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
