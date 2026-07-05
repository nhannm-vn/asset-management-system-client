import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, LogIn } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/FormField";
import { AssetTagIllustration } from "@/components/ui/AssetTagIllustration";
import { useAuthStore } from "@/store/authStore";
import { loginSchema, type LoginFormValues } from "@/schemas/auth.schema";

export default function LoginPage() {
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema), defaultValues: { email: "", password: "" } });

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
    <div className="flex min-h-screen bg-canvas">
      {/* Panel thương hiệu — mở đầu bằng chính vật thể trung tâm của hệ
          thống: một tấm thẻ tài sản thật, thay vì hoạ tiết trừu tượng. */}
      <div className="relative hidden w-[54%] flex-col justify-between overflow-hidden bg-ink-fade px-14 py-12 text-white xl:flex">
        <div className="absolute inset-0 bg-ink-mesh" />
        <div className="absolute inset-0 bg-ledger-lines opacity-40" />

        <div className="relative flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-tag border border-brass-400/30 bg-brass-fade text-ink-900 shadow-glow">
            <Box size={17} strokeWidth={2.5} />
          </div>
          <p className="font-display text-lg font-semibold tracking-tight">AssetHub</p>
        </div>

        <div className="relative -mt-6 flex items-center justify-center py-6">
          <AssetTagIllustration className="w-full max-w-md drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)]" />
        </div>

        <div className="relative">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-brass-300">
            Inventory Ledger System
          </p>
          <h1 className="font-display text-[2.75rem] font-medium leading-[1.15] tracking-tight">
            Mỗi tài sản một tấm thẻ.
            <br />
            Mỗi lượt mượn một dòng sổ.
          </h1>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-300">
            Cấp phát, phê duyệt theo từng phòng ban, và thu hồi — theo dõi trọn
            vòng đời tài sản trong một hệ thống duy nhất.
          </p>
        </div>

        <p className="relative font-mono text-xs text-ink-400">© {new Date().getFullYear()} AssetHub</p>
      </div>

      {/* Form đăng nhập */}
      <div className="flex w-full flex-col items-center justify-center px-6 xl:w-[46%]">
        <div className="w-full max-w-[380px]">
          <div className="mb-9 flex flex-col items-center xl:items-start">
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-tag border border-ink-200 bg-white text-ink-700 shadow-card xl:hidden">
              <Box size={20} />
            </div>
            <h2 className="font-display text-[1.75rem] font-medium text-ink-900">Đăng nhập</h2>
            <p className="mt-1.5 text-sm text-ink-400">Nhập thông tin tài khoản để tiếp tục.</p>
          </div>

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
              <LogIn size={16} />
              Đăng nhập
            </Button>
          </form>

          <p className="mt-8 text-center text-xs text-ink-300 xl:text-left">
            Quên mật khẩu? Liên hệ quản trị viên hệ thống của bạn.
          </p>
        </div>
      </div>
    </div>
  );
}
