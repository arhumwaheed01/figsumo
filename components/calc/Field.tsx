"use client";

import type { InputHTMLAttributes, SelectHTMLAttributes } from "react";

const inputClass =
  "w-full rounded-lg border border-ink/15 bg-paper px-3 py-2.5 text-sm text-ink outline-none placeholder:text-ink/45 focus:border-brand focus:ring-2 focus:ring-brand/20";

type BaseProps = {
  label: string;
  name: string;
  suffix?: string;
  prefix?: string;
};

type NumberFieldProps = BaseProps & {
  type: "number";
  value: string;
  onChange: (value: string) => void;
  min?: number;
  max?: number;
  step?: string;
  placeholder?: string;
};

type TextFieldProps = BaseProps & {
  type: "text";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

type DateFieldProps = BaseProps & {
  type: "date";
  value: string;
  onChange: (value: string) => void;
};

type SelectFieldProps = BaseProps & {
  type: "select";
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
};

export type FieldProps =
  | NumberFieldProps
  | TextFieldProps
  | DateFieldProps
  | SelectFieldProps;

function FieldControl(props: FieldProps) {
  const { name, type } = props;

  if (type === "select") {
    const selectProps: SelectHTMLAttributes<HTMLSelectElement> = {
      id: name,
      name,
      value: props.value,
      onChange: (e) => props.onChange(e.target.value),
      className: inputClass,
    };
    return (
      <select {...selectProps}>
        {props.options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  }

  const inputProps: InputHTMLAttributes<HTMLInputElement> = {
    id: name,
    name,
    type,
    value: props.value,
    onChange: (e) => props.onChange(e.target.value),
    className: inputClass,
  };

  if (type === "number") {
    if (props.min !== undefined) inputProps.min = props.min;
    if (props.max !== undefined) inputProps.max = props.max;
    if (props.step !== undefined) inputProps.step = props.step;
    if (props.placeholder) inputProps.placeholder = props.placeholder;
  } else if (type === "text" && props.placeholder) {
    inputProps.placeholder = props.placeholder;
  }

  return <input {...inputProps} />;
}

export function Field(props: FieldProps) {
  const { label, name, suffix, prefix } = props;

  return (
    <div className="min-w-0">
      <label htmlFor={name} className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
      </label>
      <div className="flex items-stretch gap-2">
        {prefix ? (
          <span className="flex shrink-0 items-center rounded-lg border border-ink/15 bg-ink/[0.04] px-3 text-sm font-semibold text-ink/70">
            {prefix}
          </span>
        ) : null}
        <div className="min-w-0 flex-1">
          <FieldControl {...props} />
        </div>
        {suffix ? (
          <span className="flex shrink-0 items-center text-sm text-ink/60">
            {suffix}
          </span>
        ) : null}
      </div>
    </div>
  );
}
