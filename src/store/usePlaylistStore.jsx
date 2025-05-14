import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "@/lib/axios";

// Define the store
export const usePlaylistStore = create((set) => ({
  playlists: [],
  currentPlaylist: null,
  isLoading: false,
  error: null,

  // Fetch playlists with pagination
  fetchPlaylists: async (startPage, sizeOfPage) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(
        `/playlists?pageNo=${startPage}&pageSize=${sizeOfPage}&titleSortOrder=asc`
      );
      set({ playlists: response.data.result.items });
    } catch (error) {
      set({ error: error.response || error.message });
      toast.error("Failed to fetch playlists.");
    } finally {
      set({ isLoading: false });
    }
  },

  // Fetch a single playlist by ID
  fetchPlaylistById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/playlists/${id}`);
      set({ currentPlaylist: response.data.result });
    } catch (error) {
      set({ error: error.response || error.message });
      toast.error("Failed to fetch playlist.");
    } finally {
      set({ isLoading: false });
    }
  },

  // Add a new playlist
  addPlaylist: async (playlistData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post("/playlists", playlistData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      set((state) => ({
        playlists: [...state.playlists, response.data.result],
      }));
      toast.success("Playlist created successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Error creating playlist.");
    } finally {
      set({ isLoading: false });
    }
  },
  // Update playlist
  updatePlaylist: async (playlistId, updatedData) => {
    set({ isLoading: true, error: null });
    try {
      const result = await axiosInstance.put(
        `/playlists/${playlistId}`,
        updatedData
      );

      if (result) {
        toast.success("Playlist updated successfully!");

        set((state) => ({
          isLoading: false,
          playlists: state.playlists.map((playlist) =>
            playlist.id === playlistId
              ? { ...playlist, ...result.data }
              : playlist
          ),
        }));
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating playlist.");
      set({ isLoading: false, error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  // Delete a playlist
  deletePlaylist: async (playlistId) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.delete(`/playlists/${playlistId}`);
      set((state) => ({
        playlists: state.playlists.filter(
          (playlist) => playlist.id !== playlistId
        ),
      }));
      toast.success("Playlist deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Error deleting playlist.");
    } finally {
      set({ isLoading: false });
    }
  },
}));
