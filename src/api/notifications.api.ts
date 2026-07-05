import { apiGet, apiPatch } from "@/lib/axios";
import type { NotificationResponse } from "@/types/dto";

// NotificationController.cs -> api/notifications
export const notificationsApi = {
  getMy: () => apiGet<NotificationResponse[]>("/api/notifications/my"),
  getUnreadCount: () => apiGet<number>("/api/notifications/unread-count"),
  markAsRead: (id: number) => apiPatch<boolean>(`/api/notifications/${id}/read`),
  markAllAsRead: () => apiPatch<boolean>("/api/notifications/read-all"),
};
