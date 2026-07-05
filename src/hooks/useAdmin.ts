import { useQuery } from "@tanstack/react-query";
import { adminApi } from "@/api/admin.api";
import { qk } from "@/lib/queryClient";

export function useDashboardSummaryQuery() {
  return useQuery({ queryKey: qk.dashboardSummary, queryFn: adminApi.getDashboardSummary });
}

export function useAssignmentReportQuery(fromDate?: string, toDate?: string, enabled = false) {
  return useQuery({
    queryKey: qk.assignmentReport(fromDate, toDate),
    queryFn: () => adminApi.getAssignmentReport(fromDate, toDate),
    enabled,
  });
}
