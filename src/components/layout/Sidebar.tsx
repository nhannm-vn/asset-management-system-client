import { NavLink } from "react-router-dom";
import { Box } from "lucide-react";
import { cn } from "@/lib/cn";
import { NAV_SECTIONS, type NavSection } from "./navConfig";
import { useAuthStore, useIsAdmin } from "@/store/authStore";

function NavGroup({ section }: { section: NavSection }) {
  return (
    <div className="flex flex-col gap-0.5">
      {section.items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            cn(
              "group flex items-center gap-2.5 rounded-xl px-3 py-2 text-[14px] font-medium transition-all duration-200",
              isActive ? "bg-white text-indigo-700" : "text-slate-400 hover:bg-white/[0.06] hover:text-white"
            )
          }
        >
          {({ isActive }) => (
            <>
              <item.icon
                size={16}
                className={cn(
                  "shrink-0 transition-colors",
                  isActive ? "text-indigo-600" : "text-slate-500 group-hover:text-slate-300"
                )}
              />
              {item.label}
            </>
          )}
        </NavLink>
      ))}
    </div>
  );
}

export function Sidebar() {
  const user = useAuthStore((s) => s.user);
  const isAdmin = useIsAdmin();
  const role = isAdmin ? "ADMIN" : "USER";

  // Lọc trước theo role, giữ lại section (kèm items đã lọc) để biết chính
  // xác section kế tiếp có phải là 1 bước trong luồng thiết lập hay không —
  // cần thiết để vẽ đúng đường nối dọc liền mạch giữa các bước.
  const visibleSections = NAV_SECTIONS.filter((s) => !s.roles || s.roles.includes(role)).reduce<NavSection[]>(
    (acc, section) => {
      const items = section.items.filter((i) => i.roles.includes(role));
      if (items.length > 0) acc.push({ ...section, items });
      return acc;
    },
    []
  );

  return (
    // Sidebar tối (#1D1D1F — đúng màu đen của Apple, không phải navy) đối
    // lập với vùng nội dung trắng — 2 mảng đen/trắng rõ ràng, xanh dương chỉ
    // dùng làm điểm nhấn hành động, giống hệ màu thật của macOS (Music,
    // TV, Podcasts): thanh điều hướng tối bên trái + khung nội dung sáng.
    <aside className="hidden w-64 shrink-0 flex-col bg-slate-900 lg:flex">
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white">
          <Box size={16} strokeWidth={2.5} className="text-indigo-600" />
        </div>
        <p className="text-[15px] font-semibold tracking-tight text-white">AssetHub</p>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-2">
        {isAdmin && (
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
            Luồng thiết lập hệ thống
          </p>
        )}

        {visibleSections.map((section, idx) => {
          const isStep = typeof section.step === "number";
          const nextIsStep = typeof visibleSections[idx + 1]?.step === "number";

          return (
            <div key={idx} className={cn("relative", isStep ? "pb-5 pl-6" : "mb-5")}>
              {/* Chip số bước — căn theo cùng hệ toạ độ với đường nối bên dưới */}
              {isStep && (
                <span className="absolute left-0 top-0 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-indigo-500 text-[10px] font-bold text-white">
                  {section.step}
                </span>
              )}
              {/* Đường nối dọc xuống bước kế tiếp — chạy xuyên qua phần đệm
                  (pb-5) nên nối liền mạch, không đứt đoạn giữa các bước */}
              {isStep && nextIsStep && (
                <span className="absolute bottom-0 left-[9px] top-5 w-px bg-white/10" />
              )}

              {section.title && (
                <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  {section.title}
                </p>
              )}

              <NavGroup section={section} />
            </div>
          );
        })}
      </nav>

      <div className="border-t border-white/10 px-4 py-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-white">
            {(user?.email || "?").slice(0, 1).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-white">{user?.email}</p>
            <p className="text-[11px] text-slate-500">{isAdmin ? "Quản trị viên" : "Nhân viên"}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
