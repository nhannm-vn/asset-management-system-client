import { create } from "zustand";
import { authApi } from "@/api/auth.api";
import { userFromToken } from "@/lib/jwt";
import type { AuthUser } from "@/types/dto";

const STORAGE_USER_KEY = "ams_user";
const STORAGE_REFRESH_KEY = "ams_refresh_token";

function loadStoredUser(): AuthUser | null {
  const raw = localStorage.getItem(STORAGE_USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

interface AuthState {
  user: AuthUser | null;
  checking: boolean;
  login: (email: string, password: string) => Promise<AuthUser | null>;
  logout: () => Promise<void>;
  clearSession: () => void;
  setChecking: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: loadStoredUser(),
  checking: true,

  login: async (email, password) => {
    const result = await authApi.login(email, password);
    const decoded = userFromToken(result.accessToken);
    if (result.refreshToken) {
      localStorage.setItem(STORAGE_REFRESH_KEY, result.refreshToken);
    }
    if (decoded) {
      localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(decoded));
    }
    set({ user: decoded });
    return decoded;
  },

  logout: async () => {
    try {
      await authApi.logout();
    } catch {
      // dù API lỗi vẫn xóa phiên cục bộ
    }
    get().clearSession();
  },

  clearSession: () => {
    localStorage.removeItem(STORAGE_USER_KEY);
    localStorage.removeItem(STORAGE_REFRESH_KEY);
    set({ user: null });
  },

  setChecking: (value) => set({ checking: value }),
}));

export function useIsAuthenticated() {
  return useAuthStore((s) => !!s.user);
}
export function useIsAdmin() {
  return useAuthStore((s) => s.user?.role === "ADMIN");
}

window.addEventListener("auth:expired", () => {
  useAuthStore.getState().clearSession();
});
