import { Button } from "@/components/ui/button";
import { useMusicStore } from "@/store/useMusicStore";
import { usePlayerStore } from "@/store/usePlayerStore";
import { Pause, Play } from "lucide-react";

const PlayButtonArtist = ({ artist }) => {
  const { isPlaying, togglePlay, playArtist, currentSong } = usePlayerStore();
  const { current, setCurrent } = useMusicStore();
  const isCurrentArtist = artist?.id === current?.id;

  const handlePlay = () => {
    if (!current) return;
    if (current?.id !== artist?.id) {
      setCurrent(artist);
    }
    handleLogicSong();
  };
  const handleLogicSong = () => {
    const isCurrentArtistPlaying = artist?.songs?.some((song) => {
      console.log(song, currentSong);
      return song?.id === currentSong?.id;
    });
    console.log(isCurrentArtistPlaying);
    if (isCurrentArtistPlaying) {
      togglePlay(); // Nếu bài hát trong playlist đang phát, thì toggle play/pause
    } else {
      console.log("Choi playlist moi", current);
      console.log(artist);
      playArtist(artist?.songs, 0); // Nếu không, phát playlist từ bài đầu tiên
    }
  };

  return (
    <Button
      onClick={handlePlay}
      className={`absolute bottom-4 right-2 bg-green-500 
        rounded-[50%] w-[20px] h-auto hover:bg-green-400 hover:scale-105 transition-all 
        opacity-0 translate-y-2 group-hover:translate-y-0 ${
          isCurrentArtist ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
    >
      {isCurrentArtist && isPlaying ? (
        <Pause className="size-5 text-black" />
      ) : (
        <Play className="size-5 text-black" />
      )}
    </Button>
  );
};

export default PlayButtonArtist;
