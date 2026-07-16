import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-canvas">
      <Sidebar />

      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 animate-[fadein_.2s_ease-out] bg-slate-900/40 backdrop-blur-[1px]"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative h-full w-64 animate-[slidein_.2s_ease-out] [&>aside]:flex">
            <Sidebar />
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute right-3 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white"
              type="button"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      <div className="flex min-h-screen flex-1 flex-col">
        <div className="flex items-center gap-3 border-b border-slate-100 bg-white px-4 py-3 lg:hidden">
          <button onClick={() => setMobileOpen(true)} className="text-slate-600" type="button">
            <Menu size={20} />
          </button>
          <p className="text-base font-medium tracking-tight text-slate-900">AssetHub</p>
        </div>
        <Topbar />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div key={location.pathname} className="page-enter mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
