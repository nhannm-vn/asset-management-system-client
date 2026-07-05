import { apiDelete, apiGet, apiPost, apiPut } from "@/lib/axios";

/** Nhiều controller (Categories, Locations, Suppliers, Departments,
 * Workflows, ApprovalRoles) theo cùng khuôn REST GET/POST /{base},
 * PUT/DELETE /{base}/{id}. Factory sinh client typed cho từng resource. */
export function createCrudApi<TResponse, TCreate = Partial<TResponse>, TUpdate = TCreate>(
  basePath: string
) {
  return {
    getAll: () => apiGet<TResponse[]>(basePath),
    getById: (id: number) => apiGet<TResponse>(`${basePath}/${id}`),
    create: (payload: TCreate) => apiPost<TResponse>(basePath, payload),
    update: (id: number, payload: TUpdate) => apiPut<TResponse>(`${basePath}/${id}`, payload),
    remove: (id: number) => apiDelete<boolean>(`${basePath}/${id}`),
  };
}
