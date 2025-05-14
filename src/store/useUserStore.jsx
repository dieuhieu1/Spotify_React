import toast from "react-hot-toast";
import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

const useUserStore = create((set) => ({
  users: [],
  isLoading: false,
  error: null,

  // Fetch users logic
  fetchUsers: async (startPage, sizeOfPage) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(
        `/users?pageNo=${startPage}&pageSize=${sizeOfPage}&nameSortOrder=asc`
      );
      set({ users: response.data.result.items });
    } catch (error) {
      set({ error: error.response });
    } finally {
      set({ isLoading: false });
    }
  },

  // Add a user logic
  addUser: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post("/users", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      set((state) => ({
        users: [...state.users, response.data.result],
      }));

      toast.success("User created successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Error creating user");
    } finally {
      set({ isLoading: false });
    }
  },

  // Delete a user logic
  deleteUser: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.delete(`/users/${userId}`);
      set((state) => ({
        users: state.users.filter((user) => user.id !== userId),
      }));
      toast.success("User deleted successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Error deleting user");
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useUserStore;
