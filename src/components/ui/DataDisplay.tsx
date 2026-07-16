import type { ReactNode } from "react";
import { Inbox, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

export function Table({ children, className }: { children: ReactNode; className?: string }) {
  // Table luôn nằm trong 1 <Card padded={false} className="overflow-hidden">
  // nên KHÔNG tự vẽ viền/bo góc riêng ở đây — tránh viền lồng viền, để Card
  // cha là nguồn duy nhất quyết định đường viền ngoài cùng.
  return (
    <div className="overflow-x-auto">
      <table className={cn("w-full text-sm", className)}>{children}</table>
    </div>
  );
}

export function Thead({ children }: { children: ReactNode }) {
  return (
    <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
      <tr className="[&>th]:px-4 [&>th]:py-3">{children}</tr>
    </thead>
  );
}

export function Tbody({ children }: { children: ReactNode }) {
  return (
    <tbody className="divide-y divide-slate-100 bg-white [&>tr:hover]:bg-indigo-50/40 [&>tr>td]:px-4 [&>tr>td]:py-3.5 [&>tr]:transition-colors [&>tr]:duration-150">
      {children}
    </tbody>
  );
}

/** Skeleton loader cho bảng — mượt hơn spinner khi tải dữ liệu server. */
export function TableSkeleton({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <tbody className="divide-y divide-slate-100 bg-white [&>tr>td]:px-4 [&>tr>td]:py-3.5">
      {Array.from({ length: rows }).map((_, r) => (
        <tr key={r}>
          {Array.from({ length: cols }).map((__, c) => (
            <td key={c}>
              <div
                className="h-4 animate-pulse rounded bg-slate-100"
                style={{ width: `${55 + ((r * 13 + c * 27) % 40)}%` }}
              />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export function Spinner({ label = "Đang tải…", className }: { label?: string; className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-2 py-14 text-slate-400", className)}>
      <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-200 border-t-indigo-500" />
      <span className="text-sm">{label}</span>
    </div>
  );
}

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: ReactNode;
  icon?: LucideIcon;
}

export function EmptyState({
  title = "Chưa có dữ liệu",
  description,
  action,
  icon: Icon = Inbox,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      {/* Khung "khay trống" cách điệu — viền đứt nét + icon nổi ở giữa, tạo
          cảm giác được thiết kế thay vì chỉ 1 icon tròn đơn sắc thông thường. */}
      <div className="relative mb-1 flex h-20 w-20 items-center justify-center">
        <div className="absolute inset-0 rounded-2xl border-2 border-dashed border-slate-200" />
        <div className="absolute inset-3 rounded-xl bg-slate-50" />
        <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-card">
          <Icon size={18} className="text-indigo-400" />
        </div>
      </div>
      <p className="text-sm font-semibold text-slate-700">{title}</p>
      {description && <p className="max-w-sm text-xs text-slate-400">{description}</p>}
      {action && <div className="mt-1">{action}</div>}
    </div>
  );
}

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}

export function PageHeader({ eyebrow, title, description, actions }: PageHeaderProps) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
      <div>
        {eyebrow && (
          <p className="mb-1.5 font-mono text-[11px] font-semibold uppercase tracking-widest text-indigo-600">
            {eyebrow}
          </p>
        )}
        <h1 className="text-[1.75rem] font-medium tracking-tight text-slate-900">{title}</h1>
        {description && <p className="mt-1.5 text-sm text-slate-500">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
