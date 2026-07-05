import { NavLink } from "react-router-dom";
import { Box } from "lucide-react";
import { cn } from "@/lib/cn";
import { NAV_SECTIONS } from "./navConfig";
import { useAuthStore, useIsAdmin } from "@/store/authStore";

export function Sidebar() {
  const user = useAuthStore((s) => s.user);
  const isAdmin = useIsAdmin();
  const role = isAdmin ? "ADMIN" : "USER";

  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col bg-ink-fade text-ink-100 relative">
      <div className="pointer-events-none absolute inset-0 bg-ledger-lines opacity-[0.35]" />

      <div className="relative flex items-center gap-2.5 px-5 py-5 border-b border-white/10">
        <div className="flex h-9 w-9 items-center justify-center rounded-tag border border-brass-400/30 bg-brass-fade shadow-glow text-ink-900">
          <Box size={17} strokeWidth={2.5} />
        </div>
        <div>
          <p className="font-display text-base font-medium tracking-tight text-white">AssetHub</p>
          <p className="text-[10px] font-mono uppercase tracking-widest text-ink-400">Inventory Ledger</p>
        </div>
      </div>

      <nav className="relative flex-1 overflow-y-auto px-3 py-4">
        {NAV_SECTIONS.filter((s) => !s.roles || s.roles.includes(role)).map((section, idx) => {
          const items = section.items.filter((i) => i.roles.includes(role));
          if (items.length === 0) return null;
          return (
            <div key={idx} className="mb-5">
              {section.title && (
                <p className="mb-2 px-3 font-mono text-[10px] font-semibold uppercase tracking-widest text-ink-500">
                  {section.title}
                </p>
              )}
              <div className="flex flex-col gap-0.5">
                {items.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150",
                        isActive
                          ? "bg-brass-fade text-ink-900 shadow-glow"
                          : "text-ink-200 hover:bg-white/[0.06] hover:text-white"
                      )
                    }
                  >
                    <item.icon size={16} className="shrink-0" />
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>
          );
        })}
      </nav>

      <div className="relative border-t border-white/10 px-4 py-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-700 text-xs font-semibold text-white ring-1 ring-white/10">
            {(user?.email || "?").slice(0, 1).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-white">{user?.email}</p>
            <p className="text-[10px] uppercase tracking-wide text-ink-400">
              {isAdmin ? "Quản trị viên" : "Nhân viên"}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
