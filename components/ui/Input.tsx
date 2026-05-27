import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes, type ReactNode } from "react";

interface FieldWrapperProps {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
  htmlFor?: string;
}

export function FieldWrapper({ label, error, hint, required, className = "", children, htmlFor }: FieldWrapperProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={htmlFor} className="text-sm font-medium text-grey-700">
          {label}
          {required && <span className="text-danger ml-1" aria-hidden="true">*</span>}
        </label>
      )}
      {children}
      {error && <p className="text-xs text-danger mt-0.5" role="alert">{error}</p>}
      {hint && !error && <p className="text-xs text-text-muted mt-0.5">{hint}</p>}
    </div>
  );
}

const inputBaseClasses =
  "w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm text-text-heading placeholder:text-grey-400 transition-colors duration-150 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 disabled:bg-grey-50 disabled:cursor-not-allowed";

const inputErrorClasses =
  "border-danger focus:border-danger focus:ring-red-100";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  wrapperClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, hint, wrapperClassName, className = "", id, ...rest },
  ref
) {
  return (
    <FieldWrapper label={label} error={error} hint={hint} required={rest.required} className={wrapperClassName} htmlFor={id}>
      <input
        ref={ref}
        id={id}
        className={`${inputBaseClasses} ${error ? inputErrorClasses : ""} ${className}`}
        {...rest}
      />
    </FieldWrapper>
  );
});

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  wrapperClassName?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, error, hint, wrapperClassName, className = "", id, rows = 5, ...rest },
  ref
) {
  return (
    <FieldWrapper label={label} error={error} hint={hint} required={rest.required} className={wrapperClassName} htmlFor={id}>
      <textarea
        ref={ref}
        id={id}
        rows={rows}
        className={`${inputBaseClasses} resize-y min-h-[120px] ${error ? inputErrorClasses : ""} ${className}`}
        {...rest}
      />
    </FieldWrapper>
  );
});

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  wrapperClassName?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, error, hint, wrapperClassName, className = "", id, options, placeholder, ...rest },
  ref
) {
  return (
    <FieldWrapper label={label} error={error} hint={hint} required={rest.required} className={wrapperClassName} htmlFor={id}>
      <select
        ref={ref}
        id={id}
        className={`${inputBaseClasses} ${error ? inputErrorClasses : ""} ${className}`}
        {...rest}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
});
