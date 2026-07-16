import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";
import App from "./App";
import { queryClient } from "@/lib/queryClient";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <Toaster
        position="bottom-right"
        closeButton
        toastOptions={{
          unstyled: true,
          classNames: {
            toast:
              "flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white px-4 py-3.5 shadow-pop w-full",
            title: "text-[14px] font-medium text-slate-900",
            closeButton:
              "!bg-slate-100 !border-none !text-slate-500 hover:!bg-slate-200 !rounded-full !left-auto !right-2 !top-2",
            success: "!border-emerald-100 [&_[data-icon]]:!text-emerald-500",
            error: "!border-red-100 [&_[data-icon]]:!text-red-500",
            warning: "!border-amber-100 [&_[data-icon]]:!text-amber-500",
            info: "!border-indigo-100 [&_[data-icon]]:!text-indigo-500",
          },
        }}
      />
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  </React.StrictMode>
);
