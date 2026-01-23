import type { User } from "@/types/user";
import createSelectors from "@/utils/create-selectors";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStoreBase = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));

const useAuthStore = createSelectors(useAuthStoreBase);

export default useAuthStore;
