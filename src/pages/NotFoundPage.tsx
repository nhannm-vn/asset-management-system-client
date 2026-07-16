import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { LostTagIllustration } from "@/components/ui/LostTagIllustration";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-canvas px-6 text-center">
      <LostTagIllustration className="w-40" />
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Không tìm thấy trang</h1>
        <p className="mt-1 text-sm text-slate-500">Trang bạn tìm không tồn tại hoặc đã bị di chuyển.</p>
      </div>
      <Link to="/">
        <Button>Về trang chủ</Button>
      </Link>
    </div>
  );
}
