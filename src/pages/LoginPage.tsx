import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, ShieldCheck, Workflow, PackageCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/FormField";
import { HeroIllustration } from "@/components/ui/HeroIllustration";
import { useAuthStore } from "@/store/authStore";
import { loginSchema, type LoginFormValues } from "@/schemas/auth.schema";

const FEATURES = [
  { icon: PackageCheck, text: "Theo dõi tài sản theo thời gian thực" },
  { icon: Workflow, text: "Quy trình phê duyệt theo từng phòng ban" },
  { icon: ShieldCheck, text: "Nhật ký đầy đủ cho mọi lượt bàn giao" },
];

export default function LoginPage() {
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = handleSubmit(async ({ email, password }) => {
    try {
      const user = await login(email, password);
      const from = (location.state as { from?: { pathname?: string } } | undefined)?.from?.pathname;
      const redirectTo = from || (user?.role === "ADMIN" ? "/dashboard" : "/assets");
      navigate(redirectTo, { replace: true });
      toast.success("Đăng nhập thành công");
    } catch (err) {
      toast.error((err as { message?: string })?.message || "Đăng nhập thất bại");
    }
  });

  return (
    <div className="flex min-h-screen bg-white">
      {/* Panel bên trái — nền gradient indigo rất nhạt để không bị "trống
          trải", làm nổi bật minh họa trắng đặt phía trên, hài hòa với màu
          thương hiệu dùng ở nút bấm/nav bên phải. */}
      <div className="relative hidden w-[55%] flex-col justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-white px-16 xl:flex">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-indigo-100/60 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-amber-50/60 blur-3xl" />

        <div className="relative mx-auto w-full max-w-md">
          <div className="mb-8 flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 shadow-sm shadow-indigo-600/25">
              <Box size={17} strokeWidth={2.5} className="text-white" />
            </div>
            <p className="text-[16px] font-semibold tracking-tight text-slate-900">AssetHub</p>
          </div>

          <HeroIllustration className="w-full drop-shadow-[0_20px_35px_rgba(79,70,229,0.12)]" />

          <h2 className="mt-10 text-[28px] font-semibold leading-[1.25] tracking-tight text-slate-900">
            Mỗi tài sản một hồ sơ,
            <br />
            mọi lượt bàn giao một dòng nhật ký.
          </h2>

          <ul className="mt-8 flex flex-col gap-3.5">
            {FEATURES.map((f) => (
              <li key={f.text} className="flex items-center gap-3">
                <div className="shadow-xs flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white">
                  <f.icon size={15} className="text-indigo-600" />
                </div>
                <span className="text-[14px] text-slate-600">{f.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Form đăng nhập */}
      <div className="flex w-full flex-col items-center justify-center bg-white px-6 py-12 xl:w-[45%]">
        <div className="w-full max-w-[380px]">
          <div className="mb-8 flex flex-col items-center text-center xl:items-start xl:text-left">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-600/20 xl:hidden">
              <Box size={22} className="text-white" strokeWidth={2} />
            </div>
            <h1 className="text-[22px] font-semibold tracking-tight text-slate-900">Đăng nhập AssetHub</h1>
            <p className="mt-1.5 text-[15px] text-slate-500">Hệ thống quản lý tài sản nội bộ</p>
          </div>

          <div className="rounded-2xl border border-slate-200/70 bg-white p-8 shadow-card xl:border-none xl:p-0 xl:shadow-none">
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              <TextField
                label="Email"
                type="email"
                placeholder="ban@congty.com"
                autoFocus
                required
                error={errors.email?.message}
                {...register("email")}
              />
              <TextField
                label="Mật khẩu"
                type="password"
                placeholder="••••••••"
                required
                error={errors.password?.message}
                {...register("password")}
              />

              <Button type="submit" size="lg" className="mt-2 w-full" loading={isSubmitting}>
                Đăng nhập
              </Button>
            </form>
          </div>

          <p className="mt-6 text-center text-[13px] text-slate-400 xl:text-left">
            Quên mật khẩu? Liên hệ quản trị viên hệ thống của bạn.
          </p>
        </div>
      </div>
    </div>
  );
}
