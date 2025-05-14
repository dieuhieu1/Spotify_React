import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useMusicStore = create((set) => ({
  albums: [],
  songs: [],
  playlists: [],
  current: {},
  genres: [],
  suggestSongs: [],
  isLoading: false,
  isMainLoading: false,
  error: null,
  newSong: {},
  stats: {
    totalSongs: 0,
    totalUsers: 0,
    totalArtists: 0,
    totalAlbums: 0,
  },
  trendingSongs: [],
  savedPlaylists: [],
  // isSongsLoading: false,
  // isStatsLoading: false,

  fetchSongsByGenre: async (genredId) => {
    set({ isMainLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/songs/genre/${genredId}`);
      set({
        suggestSongs: response.data.result,
      });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isMainLoading: false });
    }
  },
  fetchSavedPlaylists: async () => {
    set({ isMainLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/users/saved-playlists");
      console.log(response.data);
      set({
        savedPlaylists: response.data.result.items,
      });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isMainLoading: false });
    }
  },
  fetchTrendingSongs: async () => {
    set({ isMainLoading: true, error: null });
    try {
      const response = await axiosInstance.get(
        "/songs?pageNo=1&pageSize=7&viewerSortOrder=desc"
      );
      set({ trendingSongs: response.data.result.items });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isMainLoading: false });
    }
  },
  fetchMadeForYouSongs: async () => {},

  //set Current
  setCurrent: (element) => {
    set({ current: element });
  },
  // Admin API Data
  fetchStats: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/auth/stats");
      set({ stats: response.data.result });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  // Songs in Dashboard
  fetchSongs: async (startPage, sizeOfPage) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(
        `/songs?pageNo=${startPage}&pageSize=${sizeOfPage}&nameSortOrder=asc`
      );
      set({ songs: response.data.result.items });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchSongById: async (songId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/songs/${songId}`);
      set({ current: response.data.result });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  deleteSong: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.delete(`/songs/${id}`);
      set((state) => ({
        songs: state.songs.filter((song) => song.id !== id),
      }));
      toast.success("Song deleted successfully!");
    } catch (error) {
      console.log(error);

      toast.error("Error deleting song");
    } finally {
      set({ isLoading: false });
    }
  },
  addSong: async (songData) => {
    set({ isLoading: true, error: null });
    try {
      console.log(songData);
      const response = await axiosInstance.post("/songs", songData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      set((state) => ({ songs: [...state.songs, response.data.result] }));

      toast.success("Artist created successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Error deleting song");
    } finally {
      set({ isLoading: false });
    }
  },
  updateSong: async (id, songData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.put(`/songs/${id}`, songData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Cập nhật bài hát trong mảng 'songs'
      set((state) => {
        const updatedSongs = state.songs.map((song) =>
          song.id === id ? { ...song, ...response.data.result } : song
        );
        return { songs: updatedSongs }; // Trả về mảng 'songs' đã cập nhật
      });

      toast.success("Song updated successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Error updating song");
    } finally {
      set({ isLoading: false });
    }
  },

  // Albums in DashBoard
  fetchAlbums: async (startPage, sizeOfPage) => {
    set({ isLoading: false, error: null });
    try {
      const response = await axiosInstance.get(
        `albums?pageNo=${startPage}&pageSize=${sizeOfPage}&nameSortOrder=asc`
      );

      set({ albums: response.data.result.items });
    } catch (error) {
      console.log(error.message);
    } finally {
      set({ isLoading: false });
    }
  },
  addAlbum: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post("/albums", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      set((state) => ({ albums: [...state.albums, response.data.result] }));

      toast.success("Album created successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Error deleting song");
    } finally {
      set({ isLoading: false });
    }
  },
  deleteAlbum: async (albumId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.delete(`/albums/${albumId}`);
      set((state) => ({
        albums: state.albums.filter((album) => album.id !== albumId),
      }));
      toast.success("Album deleted successfully!");
    } catch (error) {
      console.log(error);

      toast.error("Error deleting song");
    } finally {
      set({ isLoading: false });
    }
  },
}));
