import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/store/useMusicStore";
import { usePlayerStore } from "@/store/usePlayerStore";
import { formatDuration } from "@/utils/formatDuration";
import { Clock, Pause, Play } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function Album() {
  const { albumId } = useParams();
  const { fetchSongById, currentAlbum } = useMusicStore();
  const { currentSong, isPlaying, playAlbum } = usePlayerStore();
  const handlePlayAlbum = () => {
    if (!currentAlbum) return;
    const isCurrentAlbumPlaying = currentAlbum?.songs.some(
      (song) => song.id === currentSong.id
    );

    if (isCurrentAlbumPlaying) {
      playAlbum(currentAlbum?.songs, 0);
    }
  };

  const handlePlaySong = (index) => {
    if (!currentAlbum) return;
    playAlbum(currentAlbum?.songs, index);
  };
  useEffect(() => {
    if (albumId) fetchSongById(albumId);
  }, [fetchSongById, albumId]);
  // if (isLoading) return null;
  return (
    <div className="h-full">
      <ScrollArea className="h-full">
        {/* Main Content */}

        <div className="relative min-h-full">
          {/* BG Gradient */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80"
            aria-hidden="true"
          >
            {/* Content */}
            <div className="relative z-10">
              <div className="flex p-6 gap-6 pb-8">
                <img
                  src={currentSong?.imageURL}
                  alt=""
                  className="w-[240px] h-[240px] shadow-xl rounded"
                />
                <div className="flex flex-col justify-end">
                  <p className="text-sm font-medium">Song</p>
                  <h1 className="text-7xl font-bold my-4">
                    {currentSong?.name}
                  </h1>
                  <div className="flex items-center gap-2 text-sm text-zinc-100">
                    <span className="font-medium text-white">
                      • {currentSong?.artist?.[0]?.name}
                    </span>
                    <span>• {currentSong?.duration}</span>
                    <span>• {currentSong?.createdAt}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Play Button */}
            <div className="px-6 pb-4 flex items-center gap-6">
              <Button
                onClick={handlePlayAlbum}
                size="icon"
                className="w-14 h-14 rounded-full bg-gren-500 hover:bg-green-400 hover:scale-105 transition-all"
              >
                {isPlaying &&
                currentAlbum?.songs.some(
                  (song) => song.id === currentSong?.id
                ) ? (
                  <Pause className="h-7 w-7 text-black" />
                ) : (
                  <Play className="h-7 w-7 text-black" />
                )}
              </Button>
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
                  {currentSong?.map((song, index) => {
                    const isCurrentSong = currentSong?.id === song.id;
                    return (
                      <div
                        key={song.id}
                        onClick={() => handlePlaySong(index)}
                        className={`grid grid-cols-[16_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer`}
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
                        <div className="flex items-center gap-3">
                          <img src={song.imageURL} alt="" />

                          <div>
                            <div className={`font-medium text-white`}>
                              {song.title}
                            </div>
                            <div>{song.artist}</div>
                          </div>
                          <div className="flex items-center">createdAt</div>
                          <div className="flex items-center">
                            {formatDuration(song.duration)}
                          </div>
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

export default Album;
