import { apiGet, apiPost } from "@/lib/axios";
import type { AssignmentResponse } from "@/types/dto";

// AssignmentController.cs -> api/assignments
export const assignmentsApi = {
  getMyAssets: () => apiGet<AssignmentResponse[]>("/api/assignments/my-assets"),
  returnAsset: (assetId: number) => apiPost<AssignmentResponse>(`/api/assignments/${assetId}/return`),
  getAll: () => apiGet<AssignmentResponse[]>("/api/assignments"),
  getById: (id: number) => apiGet<AssignmentResponse>(`/api/assignments/${id}`),
};
