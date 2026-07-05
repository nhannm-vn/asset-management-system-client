import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-150 " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas " +
    "active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100",
  {
    variants: {
      variant: {
        primary:
          "bg-ink-fade text-white shadow-soft hover:shadow-pop hover:brightness-110 focus-visible:ring-ink-700",
        accent:
          "bg-brass-fade text-ink-900 shadow-soft hover:shadow-glow hover:brightness-105 focus-visible:ring-brass-500",
        danger: "bg-clay-500 text-white shadow-soft hover:bg-clay-600 hover:shadow-pop focus-visible:ring-clay-500",
        ghost: "bg-transparent text-ink-700 hover:bg-ink-50 focus-visible:ring-ink-300",
        outline:
          "bg-white text-ink-700 border border-ink-200 hover:border-ink-300 hover:bg-ink-25 focus-visible:ring-ink-300",
      },
      size: {
        sm: "h-8 px-3 text-xs gap-1.5",
        md: "h-10 px-4 text-sm gap-2",
        lg: "h-11 px-5 text-sm gap-2",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
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
