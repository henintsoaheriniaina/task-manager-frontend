import api from "@/axios/api";
import type { LoginInput } from "@/schemas/auth-schemas";
import useAuthStore from "@/stores/auth-store";
import type { User } from "@/types/user";

export const authService = {
  login: async (credentials: LoginInput): Promise<void> => {
    try {
      const { data } = await api.post<{ user: User }>(
        "/auth/login",
        credentials,
      );
      useAuthStore.use.setUser()(data.user);
    } catch (error: any) {
      throw error.response?.data?.message || "Erreur de connexion";
    }
  },

  logout: async (): Promise<void> => {
    try {
      await api.post("/auth/logout");
    } finally {
      useAuthStore.use.logout()();
    }
  },
};
