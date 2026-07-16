import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface CardProps {
  children: ReactNode;
  className?: string;
  padded?: boolean;
  /** Thẻ có thể bấm (VD: danh sách quy trình) — thêm hiệu ứng nổi nhẹ khi hover. */
  interactive?: boolean;
}

export function Card({ children, className, padded = true, interactive = false }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200/70 bg-white shadow-card transition-all duration-200",
        interactive && "hover:-translate-y-0.5 hover:border-slate-200 hover:shadow-pop",
        padded && "p-5",
        className
      )}
    >
      {children}
    </div>
  );
}
