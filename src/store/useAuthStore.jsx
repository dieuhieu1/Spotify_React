import { axiosInstance } from "@/lib/axios";

import { create } from "zustand";

export const useAuthStore = create((set) => ({
  isAdmin: false,
  isLoading: false,
  error: null,
  user: null,
  checkAdminStatus: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/auth/myInfo");
      set({ user: response.data.result });
      if (response.data.result.roles[0].description === "Admin Role") {
        set({ isAdmin: true });
      }
    } catch (error) {
      set({ isAdmin: false, error: error.response });
    } finally {
      set({ isLoading: false });
    }
  },
  reset: () => {},
}));
