import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

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
        `/songs/search?pageNo=1&pageSize=20&search=name~${query}`
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
        `/playlists/search?pageNo=1&pageSize=20&search=name~${query}`
      );

      console.log(response);
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
        `/artists/search?pageNo=1&pageSize=20&search=name~${query}`
      );
      console.log(response);
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
