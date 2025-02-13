import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";
import toast from "react-hot-toast";

export const useSearchStore = create((set) => ({
  isSearchLoading: false,
  songs: [],
  topResults: [],
  playlists: [],
  artists: [],
  albums: [],
  error: null,
  fetchTopResults: async (query) => {
    set({ isSearchLoading: true, error: null });

    // Nếu query rỗng, làm trống danh sách và kết thúc
    if (query.trim() === "") {
      set({ topResults: [] });
      set({ isSearchLoading: false });
      return;
    }

    try {
      // Gọi API
      const response = await axiosInstance(
        `/search-by-priority?name=${query}&pageNo=1&pageSize=10`
      );

      // Kiểm tra dữ liệu trả về
      const items = response.data?.result?.items || [];
      set({ topResults: items });
    } catch (error) {
      // Báo lỗi
      set({ error: error.message });
    } finally {
      // Tắt trạng thái loading
      set({ isSearchLoading: false });
    }
  },
  findSongs: async (query) => {
    set({ isSearchLoading: true, error: null });

    // Nếu query rỗng, làm trống danh sách và kết thúc
    if (query.trim() === "") {
      set({ songs: [] });
      set({ isSearchLoading: false });
      return;
    }

    try {
      // Gọi API
      const response = await axiosInstance(
        `/songs/search?name=${query}&pageNo=1&pageSize=4`
      );

      // Kiểm tra dữ liệu trả về
      const items = response.data?.result?.items || [];
      set({ songs: items });
    } catch (error) {
      // Báo lỗi
      set({ error: error.response.data.message });
    } finally {
      // Tắt trạng thái loading
      set({ isSearchLoading: false });
    }
  },
  findPlaylists: async (query) => {
    set({ isSearchLoading: true, error: null });

    // Nếu query rỗng, làm trống danh sách và kết thúc
    if (query.trim() === "") {
      set({ playlists: [] });
      set({ isSearchLoading: false });
      return;
    }

    try {
      // Gọi API
      const response = await axiosInstance(
        `/playlists/search?title=${query}&pageNo=1&pageSize=7`
      );

      // Kiểm tra dữ liệu trả về
      const items = response.data?.result?.items || [];
      set({ playlists: items });
    } catch (error) {
      // Báo lỗi
      set({ error: error.response.data.message });
    } finally {
      // Tắt trạng thái loading
      set({ isSearchLoading: false });
    }
  },
  findArtists: async (query) => {
    set({ isSearchLoading: true, error: null });

    // Nếu query rỗng, làm trống danh sách và kết thúc
    if (query.trim() === "") {
      set({ artists: [] });
      set({ isSearchLoading: false });
      return;
    }

    try {
      // Gọi API
      const response = await axiosInstance(
        `/artists/search?name=${query}&pageNo=1&pageSize=5`
      );

      // Kiểm tra dữ liệu trả về
      const items = response.data?.result?.items || [];
      set({ artists: items });
    } catch (error) {
      // Báo lỗi
      set({ error: error.response.data.message });
    } finally {
      // Tắt trạng thái loading
      set({ isSearchLoading: false });
    }
  },
}));
