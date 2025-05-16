import { Button } from "@/components/ui/button";
import { usePlayerStore } from "@/store/usePlayerStore";
import { Pause, Play } from "lucide-react";

const PlayButtonSong = ({ song }) => {
  const { currentSong, isPlaying, setCurrentSong, togglePlay } =
    usePlayerStore();
  const isCurrentSong = currentSong?.id === song.id;

  const handlePlay = () => {
    if (isCurrentSong) togglePlay();
    else setCurrentSong(song);
  };

  return (
    <Button
      size={"icon"}
      onClick={handlePlay}
      className={`absolute bottom-4 right-2 bg-green-500 
        rounded-[50%] w-[30px] h-[30px] hover:bg-green-400 hover:scale-105 transition-all 
        opacity-0 translate-y-2 group-hover:translate-y-0 ${
          isCurrentSong ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
    >
      {isCurrentSong && isPlaying ? (
        <Pause className="size-5 text-black" />
      ) : (
        <Play className="size-5 text-black" />
      )}
    </Button>
  );
};
export default PlayButtonSong;
