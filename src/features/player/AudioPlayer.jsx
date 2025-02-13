import { usePlayerStore } from "@/store/usePlayerStore";
import { useEffect, useRef } from "react";

const AudioPlayer = () => {
  const audioRef = useRef(null);
  const prevSongRef = useRef(null);
  const { currentSong, isPlaying, playNext } = usePlayerStore();

  // Handle Toggle Play
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying, currentSong]);

  // Handle song ends
  useEffect(() => {
    const audio = audioRef.current;

    const handleEnded = () => {
      // Play next song when the current song ends
      playNext();
    };

    if (audio) {
      audio.addEventListener("ended", handleEnded);
    }

    // Cleanup event listener when component is unmounted or song changes
    return () => {
      if (audio) {
        audio.removeEventListener("ended", handleEnded);
      }
    };
  }, [playNext]);

  // Handle Song Changes
  useEffect(() => {
    if (!audioRef.current || !currentSong) return;

    const audio = audioRef.current;

    // Check if this is a new song
    const isSongChange = prevSongRef.current !== currentSong?.fileSongURL;
    if (isSongChange) {
      // Set new song source
      audio.src = currentSong?.fileSongURL;
      audio.currentTime = 0; // Reset the playback position

      prevSongRef.current = currentSong?.fileSongURL; // Update the previous song reference

      if (isPlaying) {
        audio.play(); // Play new song if it's supposed to be playing
      }
    }
  }, [currentSong, isPlaying]);

  return <audio ref={audioRef} />;
};

export default AudioPlayer;
