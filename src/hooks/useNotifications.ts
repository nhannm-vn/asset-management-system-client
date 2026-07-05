import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as signalR from "@microsoft/signalr";
import { notificationsApi } from "@/api/notifications.api";
import { qk } from "@/lib/queryClient";
import { useAuthStore } from "@/store/authStore";

export function useNotificationsQuery(enabled: boolean) {
  return useQuery({
    queryKey: qk.notifications,
    queryFn: notificationsApi.getMy,
    enabled,
    refetchInterval: enabled ? 30_000 : false,
  });
}

export function useUnreadCountQuery(enabled: boolean) {
  return useQuery({
    queryKey: qk.unreadCount,
    queryFn: notificationsApi.getUnreadCount,
    enabled,
    refetchInterval: enabled ? 30_000 : false,
  });
}

export function useMarkAsRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => notificationsApi.markAsRead(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.notifications });
      qc.invalidateQueries({ queryKey: qk.unreadCount });
    },
  });
}

export function useMarkAllAsRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => notificationsApi.markAllAsRead(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.notifications });
      qc.invalidateQueries({ queryKey: qk.unreadCount });
    },
  });
}

/** Kết nối tới NotificationHub (xem NotificationHub.cs) và invalidate cache
 * mỗi khi có thông báo mới đẩy về, thay vì chờ tới lượt polling kế tiếp. */
export function useNotificationRealtime(enabled: boolean) {
  const qc = useQueryClient();
  const userId = useAuthStore((s) => s.user?.id);

  useEffect(() => {
    if (!enabled) return;

    const hubUrl = import.meta.env.VITE_HUB_URL || "/hubs/notifications";
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, { withCredentials: true })
      .withAutomaticReconnect()
      .build();

    connection.on("ReceiveNotification", () => {
      qc.invalidateQueries({ queryKey: qk.notifications });
      qc.invalidateQueries({ queryKey: qk.unreadCount });
    });

    connection.start().catch(() => {
      // backend có thể chưa bật CORS cho SignalR - polling ở trên vẫn chạy bình thường
    });

    return () => {
      connection.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, userId]);
}
