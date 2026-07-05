import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface AssetTagProps {
  children: ReactNode;
  className?: string;
  tone?: "ink" | "brass";
}

// Yếu tố nhận diện riêng của app: mã tài sản hiển thị như thẻ treo vật lý
// (asset tag) — có lỗ đục ở đầu, font mono như số serial thật.
export function AssetTag({ children, className, tone = "ink" }: AssetTagProps) {
  const toneClass =
    tone === "brass"
      ? "border-brass-300 bg-brass-50 text-brass-800"
      : "border-ink-200 bg-white text-ink-700";

  return (
    <span
      className={cn(
        "relative inline-flex items-center gap-1.5 rounded-tag border pl-4 pr-2.5 py-1 font-mono text-xs font-medium",
        toneClass,
        className
      )}
    >
      <span
        className={cn(
          "absolute left-1.5 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full border",
          tone === "brass" ? "border-brass-400 bg-brass-100" : "border-ink-300 bg-canvas"
        )}
      />
      {children}
    </span>
  );
}
