import { Button } from "@/components/ui/button";
import { useMusicStore } from "@/store/useMusicStore";
import { usePlayerStore } from "@/store/usePlayerStore";
import { Pause, Play } from "lucide-react";

const PlayButtonPlaylist = ({ playlist }) => {
  const { isPlaying, togglePlay, playPlaylist, currentSong } = usePlayerStore();

  const { current, setCurrent } = useMusicStore();
  const isCurrentPlaylist = playlist?.id === current?.id;

  const handlePlay = () => {
    if (!current) return;
    if (playlist?.id !== current?.id) {
      setCurrent(playlist);
    }
    handleLogicSong();
  };
  const handleLogicSong = () => {
    const isCurrentPlaylistPlaying = playlist?.songs?.some((song) => {
      return song?.id === currentSong?.id;
    });
    if (isCurrentPlaylistPlaying) {
      togglePlay(); // Nếu bài hát trong playlist đang phát, thì toggle play/pause
    } else {
      console.log("Choi playlist moi", current);
      playPlaylist(playlist?.songs, 0); // Nếu không, phát playlist từ bài đầu tiên
    }
  };

  return (
    <Button
      onClick={handlePlay}
      className={`absolute bottom-3 right-2 bg-green-500 
        rounded-[50%] w-[20px] h-auto hover:bg-green-400 hover:scale-105 transition-all 
        opacity-0 translate-y-2 group-hover:translate-y-0 ${
          isCurrentPlaylist
            ? "opacity-100"
            : "opacity-0 group-hover:opacity-100"
        }`}
    >
      {isCurrentPlaylist && isPlaying ? (
        <Pause className="size-5 text-black" />
      ) : (
        <Play className="size-5 text-black" />
      )}
    </Button>
  );
};

export default PlayButtonPlaylist;
