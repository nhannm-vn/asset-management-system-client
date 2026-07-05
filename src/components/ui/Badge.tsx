import type { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import type { BadgeColor } from "@/types/enums";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset",
  {
    variants: {
      color: {
        moss: "bg-moss-50 text-moss-600 ring-moss-100",
        brass: "bg-brass-50 text-brass-700 ring-brass-100",
        clay: "bg-clay-50 text-clay-600 ring-clay-100",
        ink: "bg-ink-50 text-ink-700 ring-ink-100",
        gray: "bg-gray-100 text-gray-600 ring-gray-200",
      } satisfies Record<BadgeColor, string>,
    },
    defaultVariants: { color: "gray" },
  }
);

interface BadgeProps extends VariantProps<typeof badgeVariants> {
  children: ReactNode;
  className?: string;
}

export function Badge({ color, children, className }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ color }), className)}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {children}
    </span>
  );
}
