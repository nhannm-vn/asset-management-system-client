import { apiGet, apiPost } from "@/lib/axios";
import type {
  AdminRequestSummary,
  ApprovalHistoryEntry,
  PendingApprovalResponse,
} from "@/types/dto";

// ApprovalController.cs -> api/approvals
export const approvalsApi = {
  getPending: () => apiGet<PendingApprovalResponse[]>("/api/approvals/pending"),
  approve: (requestId: number, comment?: string) =>
    apiPost<boolean>(`/api/approvals/${requestId}/approve`, { comment }),
  reject: (requestId: number, comment?: string) =>
    apiPost<boolean>(`/api/approvals/${requestId}/reject`, { comment }),
  getHistory: (requestId: number) =>
    apiGet<ApprovalHistoryEntry[]>(`/api/approvals/request/${requestId}/history`),
  getAllRequestsAdmin: () => apiGet<AdminRequestSummary[]>("/api/approvals/admin/requests"),
  getRequestDetailAdmin: (requestId: number) =>
    apiGet<AdminRequestSummary>(`/api/approvals/admin/requests/${requestId}`),
  getHistoryAdmin: (requestId: number) =>
    apiGet<ApprovalHistoryEntry[]>(`/api/approvals/admin/requests/${requestId}/history`),
};
