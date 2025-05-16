import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/store/useMusicStore";
import { usePlayerStore } from "@/store/usePlayerStore";
import { formatDuration } from "@/utils/formatDuration";
import {
  Check,
  Ellipsis,
  Pause,
  Play,
  PlusCircleIcon,
  TicketCheck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlaylistMenu from "./AddDetail";
import SongList from "./SongList";

const Track = () => {
  const { trackId } = useParams();
  const {
    fetchSongById,
    isMainLoading,
    current,
    fetchArtistById,
    trendingSongs,
  } = useMusicStore();
  const { currentSong, isPlaying, togglePlay, playSong } = usePlayerStore();

  const [showDetail, setShowDetail] = useState(false);

  const handleShow = () => {
    setShowDetail((showDetail) => !showDetail);
  };

  useEffect(() => {
    if (trackId) {
      fetchSongById(trackId);
    }
  }, [fetchSongById, trackId]);

  const handlePlaySong = () => {
    if (!current) return;
    const iscurrentSong = currentSong?.id === current?.id;
    if (iscurrentSong) {
      togglePlay();
    } else {
      playSong(current, 0);
    }
  };
  console.log(current);
  // if (isMainLoading) {
  //   return <MainPlaylistSkeleton />;
  // }
  return (
    <div className="h-full">
      <ScrollArea className="h-full bg-gradient-to-b from-[red] via-zinc-900/80 to-zinc-900 ">
        {/* Main Content */}

        <div className="relative min-h-full ">
          {/* BG Gradient */}
          {/* bg-gradient-to-b from-[red] via-zinc-900/80 to-zinc-900  */}
          <div className="absolute inset-0  z-0 h-full" aria-hidden="true">
            {/* Content */}
            <div className="relative z-10">
              <div className="flex p-6 gap-6 pb-8">
                <img
                  src={current?.imageURL}
                  alt=""
                  className="w-[240px] h-[240px] shadow-xl rounded object-cover"
                />
                <div className="flex flex-col justify-end">
                  <p className="text-sm font-medium">Song</p>
                  <h1 className="text-7xl font-bold my-4">{current?.name}</h1>
                  <div className="flex items-center gap-2 text-sm text-zinc-100">
                    <span className="font-medium text-white">
                      • {current?.artists?.[0]?.name}
                    </span>
                    <span>• {current?.album?.name} Songs</span>
                    <span>• {current?.createdAt}</span>
                    <span>• {formatDuration(current?.duration)}</span>
                    <span>• {current?.listener} lượt nghe</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Play Button */}
            <div className="px-6 pb-4 flex items-center gap-6">
              <Button
                onClick={handlePlaySong}
                size="icon"
                className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all"
              >
                {isPlaying ? (
                  <Pause className="h-7 w-7 text-black" />
                ) : (
                  <Play className="h-7 w-7 text-black" />
                )}
              </Button>
              <div
                className="hover:scale-105 transition-all cursor-pointer"
                onClick={() => handleShow()}
              >
                <Ellipsis size={32} />
              </div>
              <PlaylistMenu showDetail={showDetail} />
            </div>

            <SongList />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Track;
