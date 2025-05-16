import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  isAdmin: false,
  isLoading: false,
  error: null,
  user: null,
  email: "",
  userPlaylists: [],
  forgotPasswordToken: "",
  checkAdminStatus: async () => {
    set({ isLoading: true, error: null });

    try {
      const token = sessionStorage.getItem("authToken");
      if (token) {
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;
      }

      const response = await axiosInstance.get("/auth/myInfo");
      const userData = response.data.result;

      const isAdmin = userData.roles?.some(
        (role) => role.description === "Admin Role"
      );
      set({
        user: userData,
        userPlaylists: userData.createdPlaylists,
        isAdmin: isAdmin || false,
      });
    } catch (error) {
      set({
        isAdmin: false,
        error: error.data.message || error,
      });
    } finally {
      set({ isLoading: false });
    }
  },
  forgotPassword: async (email) => {
    try {
      set({ isLoading: true });
      const response = await axiosInstance.post(
        "/auth/forgot-password",
        email,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      set({ email: response.data.result.email });
      set({ isLoading: false });
    } catch (error) {
      set({
        error: error.response || error,
      });
    } finally {
      set({ isLoading: false });
    }
  },
  verifyCode: async (verificationData) => {
    try {
      set({ isLoading: true });
      const response = await axiosInstance.post(
        "/auth/forgot-password/verify-code",
        verificationData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      set({
        isLoading: false,
        forgotPasswordToken: response.data.result.forgotPassword,
      });
    } catch (error) {
      set({
        error: error.response || error,
      });
    } finally {
      set({ isLoading: false });
    }
  },
  reset: () =>
    set({
      isAdmin: false,
      isLoading: false,
      error: null,
      user: null,
      userPlaylists: [],
    }),
}));
