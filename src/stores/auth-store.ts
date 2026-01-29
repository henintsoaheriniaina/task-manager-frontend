import type { User } from "@/types/user";
import createSelectors from "@/utils/create-selectors";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const useAuthStoreBase = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

const useAuthStore = createSelectors(useAuthStoreBase);

export default useAuthStore;
