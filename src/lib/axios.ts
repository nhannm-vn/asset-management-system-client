import axios, { type InternalAxiosRequestConfig } from "axios";
import type { ApiError } from "@/types/dto";

// Mặc định để trống (rỗng = same-origin) để mọi request đi qua Vite dev
// proxy (xem vite.config.ts) — bắt buộc vì cookie access_token/refresh_token
// của backend có SameSite=Strict, chỉ được gửi khi request same-origin.
// Chỉ set VITE_API_BASE_URL khi build production và có reverse proxy/CORS
// riêng phía server.
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

interface RetryableConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// Response thành công của BE luôn có dạng { data, statusCode, message }
// (ApiResponse<T>, xem ApiResponse.cs + BaseController.Success()). Interceptor
// "mở" sẵn field data lồng bên trong để nơi gọi nhận thẳng về T, không phải
// lặp lại .data.data mỗi lần gọi API.
apiClient.interceptors.response.use(
  (response) => response.data?.data,
  async (error) => {
    const original = error.config as RetryableConfig | undefined;
    const status: number | undefined = error.response?.status;
    const apiMessage: string | undefined = error.response?.data?.message;

    if (
      status === 401 &&
      original &&
      !original._retry &&
      !original.url?.includes("/auth/login") &&
      !original.url?.includes("/auth/refresh-token")
    ) {
      original._retry = true;
      try {
        // RefreshToken endpoint đọc RefreshToken từ body (không phải cookie),
        // nên ta lưu tạm giá trị nhận về lúc login để gửi lại khi cần.
        const cachedRefreshToken = localStorage.getItem("ams_refresh_token");
        await apiClient.post("/api/auth/refresh-token", {
          refreshToken: cachedRefreshToken,
        });
        return apiClient(original);
      } catch (refreshError) {
        window.dispatchEvent(new CustomEvent("auth:expired"));
        return Promise.reject(refreshError);
      }
    }

    if (status === 401) {
      window.dispatchEvent(new CustomEvent("auth:expired"));
    }

    const normalized: ApiError = {
      status,
      message: apiMessage || error.message || "Đã có lỗi xảy ra",
    };
    return Promise.reject(normalized);
  }
);

// axios gõ kiểu trả về Promise<AxiosResponse<T>>, nhưng interceptor ở trên đã
// "mở" response về thẳng T lúc runtime. Các hàm nhỏ này khai đúng kiểu để
// toàn bộ lớp api/* nhận về Promise<T> sạch sẽ, không phải ép kiểu lặp lại.
export function apiGet<T>(url: string, config?: Parameters<typeof apiClient.get>[1]): Promise<T> {
  return apiClient.get(url, config) as unknown as Promise<T>;
}
export function apiPost<T>(url: string, body?: unknown, config?: Parameters<typeof apiClient.post>[2]): Promise<T> {
  return apiClient.post(url, body, config) as unknown as Promise<T>;
}
export function apiPut<T>(url: string, body?: unknown, config?: Parameters<typeof apiClient.put>[2]): Promise<T> {
  return apiClient.put(url, body, config) as unknown as Promise<T>;
}
export function apiPatch<T>(url: string, body?: unknown, config?: Parameters<typeof apiClient.patch>[2]): Promise<T> {
  return apiClient.patch(url, body, config) as unknown as Promise<T>;
}
export function apiDelete<T>(url: string, config?: Parameters<typeof apiClient.delete>[1]): Promise<T> {
  return apiClient.delete(url, config) as unknown as Promise<T>;
}
