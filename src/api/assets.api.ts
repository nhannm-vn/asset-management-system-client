import { apiDelete, apiGet, apiPatch, apiPost, apiPut } from "@/lib/axios";
import type {
  AssetFilter,
  AssetResponse,
  CreateAssetRequestDto,
  PagedResult,
  UpdateAssetRequestDto,
} from "@/types/dto";
import type { AssetStatus } from "@/types/enums";

// AssetsController.cs -> api/assets
export const assetsApi = {
  getAll: (filters: AssetFilter) =>
    apiGet<PagedResult<AssetResponse>>("/api/assets", {
      params: {
        keyword: filters.keyword || undefined,
        status: filters.status || undefined,
        categoryId: filters.categoryId || undefined,
        locationId: filters.locationId || undefined,
        page: filters.page,
        pageSize: filters.pageSize,
      },
    }),
  getById: (id: number) => apiGet<AssetResponse>(`/api/assets/${id}`),
  create: (payload: CreateAssetRequestDto) => apiPost<AssetResponse>("/api/assets", payload),
  update: (id: number, payload: UpdateAssetRequestDto) =>
    apiPut<AssetResponse>(`/api/assets/${id}`, payload),
  remove: (id: number) => apiDelete<boolean>(`/api/assets/${id}`),
  changeStatus: (id: number, status: AssetStatus) =>
    apiPatch<boolean>(`/api/assets/${id}/status`, null, { params: { status } }),
};
