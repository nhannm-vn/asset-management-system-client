import { useEffect } from "react";
import { notificationsApi } from "@/api/notifications.api";
import { useAuthStore } from "@/store/authStore";

/** Cookie access_token là HttpOnly nên FE không đọc được trực tiếp — chỉ có
 * thể "thăm dò" phiên đăng nhập còn hiệu lực hay không bằng 1 API cần
 * Authorize nhẹ nhàng, chạy đúng 1 lần khi app khởi động. */
export function useSessionBootstrap() {
  const user = useAuthStore((s) => s.user);
  const clearSession = useAuthStore((s) => s.clearSession);
  const setChecking = useAuthStore((s) => s.setChecking);

  useEffect(() => {
    let alive = true;
    async function verify() {
      if (!user) {
        setChecking(false);
        return;
      }
      try {
        await notificationsApi.getUnreadCount();
      } catch (err) {
        const status = (err as { status?: number })?.status;
        if (alive && status === 401) clearSession();
      } finally {
        if (alive) setChecking(false);
      }
    }
    verify();
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
