import { create } from "zustand";

export const usePlayerStore = create((set, get) => ({
  currentSong: null,
  isPlaying: false,
  queue: [],
  currentIndex: -1,
  trendingSongs: [],
  setTrendingSongs: (songs) => {
    set({ trendingSongs: songs });
  },
  setQueue: (songs) => {
    set({ queue: songs });
  },
  initializeQueue: (songs) => {
    set({
      queue: songs,
      currentSong: get().currentSong || songs[0],
      currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex,
    });
  },
  playArtist: (songs, startIndex = 0) => {
    if (songs.length === 0) {
      return;
    }

    const song = songs[startIndex];

    set({
      queue: [...songs],
      currentSong: song,
      currentIndex: startIndex,
      isPlaying: true,
    });
  },
  playPlaylist: (songs, startIndex = 0) => {
    if (songs.length === 0) {
      return;
    }
    const song = songs[startIndex];
    set({
      queue: [...songs],
      currentSong: song,
      currentIndex: startIndex,
      isPlaying: true,
    });
    console.log("Playing playlist, currentSong:", song);
  },
  playSong: (song) => {
    if (song === null) {
      return;
    }
    set({
      queue: get().trendingSongs.filter((item) => item.id !== song.id),
      currentSong: song,
      isPlaying: true,
    });
    console.log("Playing playlist, currentSong:", song);
  },
  setCurrentSong: (song = null) => {
    if (!song) return;

    const songIndex = get().queue.findIndex((s) => s.id === song.id);

    set({
      currentSong: song,
      isPlaying: true,
      currentIndex: songIndex !== -1 ? songIndex : get().currentIndex,
    });
  },
  togglePlay: () => {
    const willStartPlaying = !get().isPlaying;

    set({
      isPlaying: willStartPlaying,
    });
  },
  playNext: () => {
    const { currentIndex, queue } = get();
    const nextIndex = currentIndex + 1;
    // Neu khong con next Song de play
    console.log(get().trendingSongs);
    if (nextIndex < queue.length) {
      const nextSong = queue[nextIndex];
      set({
        currentSong: nextSong,
        currentIndex: nextIndex,
        isPlaying: true,
      });
    } else {
      set({ isPlaying: false });
    }
  },
  playPrevious: () => {
    const { currentIndex, queue } = get();
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      const prevSong = queue[prevIndex];
      set({
        currentIndex: prevIndex,
        currentSong: prevSong,
        isPlaying: true,
      });
    }
  },
}));
