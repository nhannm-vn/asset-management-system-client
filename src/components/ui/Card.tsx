import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface CardProps {
  children: ReactNode;
  className?: string;
  padded?: boolean;
}

export function Card({ children, className, padded = true }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-ink-100 bg-white shadow-card transition-shadow",
        padded && "p-5",
        className
      )}
    >
      {children}
    </div>
  );
}
