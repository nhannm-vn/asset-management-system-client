import {
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/cn";

const controlClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 h-10 text-[15px] text-slate-900 placeholder:text-slate-400 " +
  "focus:outline-none focus:ring-4 focus:ring-indigo-600/15 focus:border-indigo-500 transition-all duration-200 " +
  "disabled:bg-slate-50 disabled:text-slate-300";

interface FieldChromeProps {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
}

function FieldChrome({ label, hint, error, required, children }: FieldChromeProps & { children: ReactNode }) {
  return (
    <label className="block">
      {label && (
        <span className="mb-1.5 flex items-center gap-1 text-xs font-semibold text-slate-600">
          {label}
          {required && <span className="text-red-500">*</span>}
        </span>
      )}
      {children}
      {hint && !error && <span className="mt-1 block text-xs text-slate-400">{hint}</span>}
      {error && <span className="mt-1 block text-xs text-red-500">{error}</span>}
    </label>
  );
}

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & FieldChromeProps;

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, hint, error, required, className, ...rest }, ref) => (
    <FieldChrome label={label} hint={hint} error={error} required={required}>
      <input ref={ref} className={cn(controlClass, error && "border-red-300", className)} {...rest} />
    </FieldChrome>
  )
);
TextField.displayName = "TextField";

type TextAreaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & FieldChromeProps;

export const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  ({ label, hint, error, required, className, rows = 3, ...rest }, ref) => (
    <FieldChrome label={label} hint={hint} error={error} required={required}>
      <textarea
        ref={ref}
        rows={rows}
        className={cn(controlClass, "h-auto py-2", error && "border-red-300", className)}
        {...rest}
      />
    </FieldChrome>
  )
);
TextAreaField.displayName = "TextAreaField";

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & FieldChromeProps;

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, hint, error, required, className, children, ...rest }, ref) => (
    <FieldChrome label={label} hint={hint} error={error} required={required}>
      <select ref={ref} className={cn(controlClass, "pr-8", error && "border-red-300", className)} {...rest}>
        {children}
      </select>
    </FieldChrome>
  )
);
SelectField.displayName = "SelectField";

// Input/Select trần (không nhãn) dùng cho thanh filter, ô tìm kiếm nhanh…
export const PlainInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...rest }, ref) => <input ref={ref} className={cn(controlClass, className)} {...rest} />
);
PlainInput.displayName = "PlainInput";

export const PlainSelect = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...rest }, ref) => (
    <select ref={ref} className={cn(controlClass, "pr-8", className)} {...rest}>
      {children}
    </select>
  )
);
PlainSelect.displayName = "PlainSelect";
