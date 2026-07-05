import { apiDelete, apiGet, apiPost, apiPut } from "@/lib/axios";
import type { CreateUserRequest, UpdateUserRequest, UserResponse } from "@/types/dto";

// UserController.cs -> api/users (ADMIN only)
export const usersApi = {
  getAll: () => apiGet<UserResponse[]>("/api/users"),
  getById: (id: number) => apiGet<UserResponse>(`/api/users/${id}`),
  create: (payload: CreateUserRequest) => apiPost<UserResponse>("/api/users", payload),
  update: (id: number, payload: UpdateUserRequest) => apiPut<UserResponse>(`/api/users/${id}`, payload),
  remove: (id: number) => apiDelete<boolean>(`/api/users/${id}`),
  changePassword: (id: number, newPassword: string) =>
    apiPut<boolean>(`/api/users/${id}/change-password`, { newPassword }),
  assignDepartment: (id: number, departmentId: number) =>
    apiPut<boolean>(`/api/users/${id}/assign-department`, { departmentId }),
};
