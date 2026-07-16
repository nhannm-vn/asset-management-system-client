import type { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import type { BadgeColor } from "@/types/enums";

// Mỗi trạng thái 1 màu riêng (nền nhạt + chữ đậm cùng tông) — giúp quét mắt
// nhanh trạng thái trong bảng dài mà không cần đọc từng chữ.
const badgeVariants = cva("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold", {
  variants: {
    color: {
      emerald: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-100",
      indigo: "bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-100",
      amber: "bg-amber-50 text-amber-800 ring-1 ring-inset ring-amber-200",
      red: "bg-red-50 text-red-700 ring-1 ring-inset ring-red-100",
      slate: "bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-200",
      gray: "bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-200",
    } satisfies Record<BadgeColor, string>,
  },
  defaultVariants: { color: "gray" },
});

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
