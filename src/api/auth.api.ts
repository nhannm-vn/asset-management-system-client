import { apiPost } from "@/lib/axios";
import type { LoginResponse } from "@/types/dto";

// AuthController.cs -> api/auth
export const authApi = {
  login: (email: string, password: string) =>
    apiPost<LoginResponse>("/api/auth/login", { email, password }),
  refreshToken: (refreshToken: string | null) =>
    apiPost<LoginResponse>("/api/auth/refresh-token", { refreshToken }),
  logout: () => apiPost<boolean>("/api/auth/logout"),
};
