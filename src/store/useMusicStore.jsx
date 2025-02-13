import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useMusicStore = create((set) => ({
  users: [],
  albums: [],
  songs: [],
  playlists: [],
  current: {},
  artists: [],
  genres: [],
  suggestSongs: [],
  currentArtist: [],
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
  featuresPlaylists: [],
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
      const response = await axiosInstance.get("/user/saved-playlists");
      console.log(response.data);
      set({
        savedPlaylists: response.data.result,
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
        "/songs/sorted-by-viewer?pageNo=1&pageSize=6&viewerSortOrder=desc"
      );
      set({ trendingSongs: response.data.result.items });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isMainLoading: false });
    }
  },
  fetchMadeForYouSongs: async () => {},
  fetchFeaturedPlaylists: async () => {
    set({ isMainLoading: true, error: null });
    try {
      const response = await axiosInstance.get(
        "/playlists/sorted-by-viewer?pageNo=1&pageSize=6&viewerSortOrder=desc"
      );
      set({ featuresPlaylists: response.data.result.items });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isMainLoading: false });
    }
  },
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
      const response = await axiosInstance.get(`/song/${songId}`);
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
      const response = await axiosInstance.delete(`/song/${id}`);
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
  addSong: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post("/song", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
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
  // Artists in DashBoard
  fetchArtists: async (startPage, sizeOfPage) => {
    set({ isLoading: false, error: null });
    try {
      const response = await axiosInstance.get(
        `artists?pageNo=${startPage}&pageSize=${sizeOfPage}&nameSortOrder=asc`
      );

      set({ artists: response.data.result.items });
    } catch (error) {
      console.log(error.message);
    } finally {
      set({ isLoading: false });
    }
  },
  fetchArtistById: async (artistId) => {
    set({ isLoading: false, error: null });
    try {
      const response = await axiosInstance.get(`/artist/${artistId}`);

      set({ currentArtist: response.data.result });
    } catch (error) {
      console.log(error.message);
    } finally {
      set({ isLoading: false });
    }
  },
  addArtist: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post("/artist", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      set((state) => ({ artists: [...state.artists, response.data.result] }));

      toast.success("Artist deleted successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Error deleting song");
    } finally {
      set({ isLoading: false });
    }
  },
  deleteArtists: async (artistId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.delete(`/artist/${artistId}`);
      set((state) => ({
        artists: state.artists.filter((artist) => artist.id !== artistId),
      }));
      toast.success("Song deleted successfully!");
    } catch (error) {
      console.log(error);

      toast.error("Error deleting song");
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
      const response = await axiosInstance.post("/album", formData, {
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
      const response = await axiosInstance.delete(`/artist/${albumId}`);
      set((state) => ({
        albums: state.albums.filter((artist) => album.id !== albumId),
      }));
      toast.success("Album deleted successfully!");
    } catch (error) {
      console.log(error);

      toast.error("Error deleting song");
    } finally {
      set({ isLoading: false });
    }
  },

  // Playlists in DashBoard
  fetchPlaylists: async (startPage, sizeOfPage) => {
    // Data fetch logic...
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(
        `/playlists?pageNo=${startPage}&pageSize=${sizeOfPage}&titleSortOrder=asc`
      );

      set({ playlists: response.data.result.items });
    } catch (error) {
      set({ error: error.response });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchPlaylistById: async (id) => {
    set({ isMainLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/playlist/${id}`);
      set({ current: response.data.result });
    } catch (error) {
      set({ error: error.response });
    } finally {
      set({ isMainLoading: false });
    }
  },
  addPlaylist: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post("/playlist", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      set((state) => ({
        playlists: [...state.playlists, response.data.result],
      }));

      toast.success("Playlist created successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Error deleting song");
    } finally {
      set({ isLoading: false });
    }
  },
  deletePlaylist: async (playlistId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.delete(`/playlist/${playlistId}`);
      set((state) => ({
        playlists: state.playlists.filter(
          (playlist) => playlist.id !== playlistId
        ),
      }));
      toast.success("Playlist deleted successfully!");
    } catch (error) {
      console.log(error);

      toast.error("Error deleting playlist");
    } finally {
      set({ isLoading: false });
    }
  },

  // Users in Dashboard
  fetchUsers: async (startPage, sizeOfPage) => {
    // Data fetch logic...
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
  // fetchUsersById: async (userId) => {
  //   set({ isLoading: true, error: null });
  //   try {
  //     const response = await axiosInstance.get(`/user/${userId}`);
  //     set({ user: response.data.result });
  //   } catch (error) {
  //     set({ error: error.response });
  //   } finally {
  //     set({ isLoading: false });
  //   }
  // },
  addUser: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post("/user", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      set((state) => ({
        users: [...state.users, response.data.result],
      }));

      toast.success("Users created successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Error creating user");
    } finally {
      set({ isLoading: false });
    }
  },
  deleteUser: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.delete(`/user/${userId}`);
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
