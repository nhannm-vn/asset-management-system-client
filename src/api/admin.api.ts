import { apiGet } from "@/lib/axios";
import type { AssignmentResponse, DashboardSummaryResponse } from "@/types/dto";

// AdminController.cs -> api/admin (ADMIN only)
export const adminApi = {
  getDashboardSummary: () => apiGet<DashboardSummaryResponse>("/api/admin/dashboard/summary"),
  getAssignmentReport: (fromDate?: string, toDate?: string) =>
    apiGet<AssignmentResponse[]>("/api/admin/reports/assignments", {
      params: { fromDate, toDate },
    }),
};
