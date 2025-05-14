import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "@/lib/axios";

export const useArtistsStore = create((set) => ({
  currentArtist: [],
  artists: [],
  isLoading: false,
  error: null,

  // Fetch list of artists with pagination
  fetchArtists: async (startPage, sizeOfPage, sortBy, sortOrder) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(
        `artists?pageNo=${startPage}&pageSize=${sizeOfPage}&sortBy=${sortBy}-${sortOrder}`
      );
      set({ artists: response.data.result.items });
    } catch (error) {
      console.log(error.message);
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  // Fetch a single artist by ID
  fetchArtistById: async (artistId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/artists/${artistId}`);
      set({ currentArtist: response.data.result });
    } catch (error) {
      console.log(error.message);
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  // Add a new artist
  addArtist: async (artistData) => {
    set({ isLoading: true, error: null });
    try {
      console.log(artistData);
      const response = await axiosInstance.post("/artists", artistData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      set((state) => ({
        artists: [...state.artists, response.data.result],
      }));
      toast.success("Artist added successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Error adding artist");
    } finally {
      set({ isLoading: false });
    }
  },

  // Delete an artist
  deleteArtist: async (artistId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.delete(`/artists/${artistId}`);
      set((state) => ({
        artists: state.artists.filter((artist) => artist.id !== artistId),
      }));
      toast.success("Artist deleted successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Error deleting artist");
    } finally {
      set({ isLoading: false });
    }
  },
}));
