import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 " +
    "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-600/20 " +
    "active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100",
  {
    variants: {
      variant: {
        primary: "bg-indigo-600 text-white hover:bg-indigo-700",
        accent: "bg-indigo-50 text-indigo-600 hover:bg-indigo-100",
        danger: "bg-red-600 text-white hover:bg-red-700",
        ghost: "bg-transparent text-slate-600 hover:bg-slate-100",
        outline: "bg-white text-slate-800 border border-slate-200 hover:bg-slate-50",
      },
      size: {
        sm: "h-8 px-3.5 text-[13px] gap-1.5",
        md: "h-9 px-5 text-[14px] gap-2",
        lg: "h-11 px-6 text-[15px] gap-2",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, disabled, children, type = "button", ...rest }, ref) => (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      className={cn(buttonVariants({ variant, size }), className)}
      {...rest}
    >
      {loading && <Loader2 size={15} className="animate-spin" />}
      {children}
    </button>
  )
);
Button.displayName = "Button";
