import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import MainPlaylistSkeleton from "@/LoadingSkel/MainPlaylistSkeleton";
import { useMusicStore } from "@/store/useMusicStore";
import { usePlayerStore } from "@/store/usePlayerStore";
import { formatDuration, timeCalculator } from "@/utils/formatDuration";
import { Check, Clock, Pause, Play, PlusCircleIcon } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function Playlist() {
  const { playlistId } = useParams();
  const { fetchPlaylistById, isMainLoading, current } = useMusicStore();
  const { currentSong, isPlaying, playPlaylist, togglePlay } = usePlayerStore();
  useEffect(() => {
    if (playlistId) {
      fetchPlaylistById(playlistId);
    }
  }, [fetchPlaylistById, playlistId]);
  const handlePlayPlaylist = () => {
    if (!current) return;

    // Neu tim thay bai hat trong album thi choi tiep
    // Khong thi choi lai tu dau
    const isCurrentPlaylistPlaying = current?.songs.some(
      (song) => song?.id === currentSong?.id
    );

    if (isCurrentPlaylistPlaying) {
      togglePlay();
    } else {
      playPlaylist(current?.songs, 0);
    }
  };

  const handlePlaySong = (index) => {
    if (!current) return;
    playPlaylist(current?.songs, index);
  };
  // if (isLoading) return null;
  if (isMainLoading) {
    return <MainPlaylistSkeleton />;
  }
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
                  src={
                    current?.imageURL ||
                    "https://discussions.apple.com/content/attachment/592590040"
                  }
                  alt=""
                  className="w-[240px] h-[240px] shadow-xl rounded object-cover"
                />
                <div className="flex flex-col justify-end">
                  <p className="text-sm font-medium">Playlist</p>
                  <h1 className="text-7xl font-bold my-4">{current?.title}</h1>
                  <div className="flex items-center gap-2 text-sm text-zinc-100">
                    <span className="font-medium text-white">
                      • {current?.creator}
                    </span>
                    <span>• {current?.songs?.length} Songs</span>
                    <span>• {timeCalculator(current?.totalHours)}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Play Button */}
            <div className="px-6 pb-4 flex items-center gap-6">
              <Button
                onClick={handlePlayPlaylist}
                size="icon"
                className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all"
              >
                {isPlaying &&
                current?.songs.some((song) => song?.id === currentSong?.id) ? (
                  <Pause className="h-7 w-7 text-black" />
                ) : (
                  <Play className="h-7 w-7 text-black" />
                )}
              </Button>
              <div
                onClick={handlePlaySong}
                className="rounded-full hover:scale-105 transition-all cursor-pointer"
              >
                {isPlaying ? (
                  <Check className="text-black" size={32} />
                ) : (
                  <PlusCircleIcon className=" text-black" size={32} />
                )}
              </div>
            </div>

            {/* Table Section */}
            <div className="bg-black/20 backdrop-blur-sm">
              {/* Table Header */}
              <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm text-zinc-400 border-b border-white/5">
                <div>#</div>
                <div>Title</div>
                <div>Released Date</div>
                <div>
                  <Clock className="h-4 w-4" />
                </div>
              </div>

              {/* Songs List */}
              <div className="px-6">
                <div className="space-y-2 py-4">
                  {current?.songs?.map((song, index) => {
                    const isCurrentSong = currentSong?.id === song.id;

                    return (
                      <div
                        onClick={() => handlePlaySong(index)}
                        key={song.id}
                        className={`grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer`}
                      >
                        <div className="flex items-center justify-center">
                          {isCurrentSong && isPlaying ? (
                            <div className="size-4 text-green-500">♫</div>
                          ) : (
                            <span className="group-hover:hidden">
                              {index + 1}
                            </span>
                          )}
                          {!isCurrentSong && (
                            <Play className="h-4 w-4 hidden group-hover:block" />
                          )}
                        </div>
                        <div className="flex items-center gap-3 ">
                          <img
                            src={
                              song.imageURL ||
                              "https://discussions.apple.com/content/attachment/592590040"
                            }
                            alt=""
                            className="w-[40px] h-[40px]"
                          />

                          <div>
                            <div
                              className={`font-medium text-white  truncate hover:underline cursor-pointer`}
                            >
                              {song.name}
                            </div>
                            <div className="text-sm text-zinc-400 truncate hover:underline cursor-pointer">
                              {song?.artists?.[0]?.name}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {song.createdAt}
                        </div>
                        <div className="flex items-center">
                          {formatDuration(song.duration)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

export default Playlist;
