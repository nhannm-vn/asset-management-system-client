import { apiGet, apiPost, apiPut } from "@/lib/axios";
import type { AssetRequestResponse } from "@/types/dto";

// AssetRequestController.cs -> api/asset-requests
export const assetRequestsApi = {
  create: (assetId: number, workflowId: number) =>
    apiPost<AssetRequestResponse>("/api/asset-requests", { assetId, workflowId }),
  getMyRequests: () => apiGet<AssetRequestResponse[]>("/api/asset-requests/my-requests"),
  getAllForAdmin: () => apiGet<AssetRequestResponse[]>("/api/asset-requests/admin/all"),
  getById: (id: number) => apiGet<AssetRequestResponse>(`/api/asset-requests/${id}`),
  cancel: (id: number) => apiPut<boolean>(`/api/asset-requests/${id}/cancel`),
};
