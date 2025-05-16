import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import MainPlaylistSkeleton from "@/loadingSkeleton/MainPlaylistSkeleton";
import { useMusicStore } from "@/store/useMusicStore";
import { usePlayerStore } from "@/store/usePlayerStore";
import { usePlaylistStore } from "@/store/usePlaylistStore";
import { formatDuration, timeCalculator } from "@/utils/formatDuration";
import {
  Check,
  Clock,
  Ellipsis,
  Pause,
  Play,
  PlusCircleIcon,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SongSearch from "../search/SongSearch";
import toast from "react-hot-toast";

function Playlist() {
  const { playlistId } = useParams();
  const { isMainLoading, trendingSongs } = useMusicStore();
  const { currentPlaylist, deleteSongInPlaylist } = usePlaylistStore();

  const { fetchPlaylistById, updatePlaylist } = usePlaylistStore();
  const { currentSong, isPlaying, playPlaylist, togglePlay } = usePlayerStore();

  const [query, setQuery] = useState("");

  useEffect(() => {
    if (playlistId) {
      fetchPlaylistById(playlistId);
    }
  }, [fetchPlaylistById, playlistId]);

  const handlePlayPlaylist = () => {
    if (!currentPlaylist) return;
    const isCurrentPlaylistPlaying = currentPlaylist?.songs.some(
      (song) => song?.id === currentSong?.id
    );

    if (isCurrentPlaylistPlaying) {
      togglePlay();
    } else {
      playPlaylist(currentPlaylist?.songs, 0);
    }
  };

  const handlePlaySong = (index) => {
    if (!currentPlaylist) return;
    playPlaylist(currentPlaylist?.songs, index);
  };

  const handleAddSongToPlaylist = (songId) => {
    if (currentPlaylist) {
      updatePlaylist({ songIds: [songId] }, currentPlaylist.id);
    }
  };
  const handleDeleteSongFromPlaylist = async (songId) => {
    const id = Number.parseInt(playlistId.valueOf());

    await deleteSongInPlaylist(songId, id);
  };
  if (isMainLoading) {
    return <MainPlaylistSkeleton />;
  }

  return (
    <div className="h-full">
      <ScrollArea className="h-full bg-gradient-to-b from-[red] via-zinc-900/80 to-zinc-900 ">
        {/* Main Content */}
        <div className="relative min-h-full ">
          {/* BG Gradient */}
          <div className="absolute inset-0 z-0 h-full" aria-hidden="true">
            <div className="relative z-10">
              <div className="flex p-6 gap-6 pb-8">
                <img
                  src={
                    currentPlaylist?.imageURL ||
                    "https://discussions.apple.com/content/attachment/592590040"
                  }
                  alt=""
                  className="w-[240px] h-[240px] shadow-xl rounded object-cover"
                />
                <div className="flex flex-col justify-end">
                  <p className="text-sm font-medium">Playlist</p>
                  <h1 className="text-7xl font-bold my-4">
                    {currentPlaylist?.title}
                  </h1>
                  <div className="flex items-center gap-2 text-sm text-zinc-100">
                    <span className="font-medium text-white">
                      • {currentPlaylist?.creator}
                    </span>
                    <span>• {currentPlaylist?.songs?.length} Songs</span>
                    <span>• {timeCalculator(currentPlaylist?.totalHours)}</span>
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
                currentPlaylist?.songs.some(
                  (song) => song?.id === currentSong?.id
                ) ? (
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

            {/* Kiểm tra nếu Playlist không có bài hát, hiển thị giao diện tìm kiếm */}
            {currentPlaylist?.songs?.length === 0 ? (
              <div className="p-8">
                <h2 className="text-xl font-semibold mb-4">
                  Hãy tìm bài hát để thêm vào playlist của bạn
                </h2>
                <SongSearch
                  songs={trendingSongs}
                  query={query}
                  setQuery={setQuery}
                  handleAdd={handleAddSongToPlaylist}
                />
              </div>
            ) : (
              <div className="bg-black/20 backdrop-blur-sm">
                {/* Table Header */}
                <div className="grid grid-cols-[16px_4fr_2fr_1fr_0.25fr] gap-4 px-10 py-2 text-sm text-zinc-400 border-b border-white/5">
                  <div>#</div>
                  <div>Title</div>
                  <div>Released Date</div>
                  <div>
                    <Clock className="h-4 w-4" />
                  </div>
                  <div></div>
                </div>

                {/* Songs List */}
                <div className="px-6">
                  <div className="space-y-2 py-4">
                    {currentPlaylist?.songs?.map((song, index) => {
                      const isCurrentSong = currentSong?.id === song.id;

                      return (
                        <div
                          key={song.id}
                          className={`grid grid-cols-[16px_4fr_2fr_1fr_0.25fr] gap-4 px-4 py-2 text-sm text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer`}
                        >
                          <div
                            className="flex items-center justify-center group"
                            onClick={() => handlePlaySong(index)}
                          >
                            {isCurrentSong && isPlaying && (
                              <>
                                <div className="size-4 text-green-500 group-hover:hidden">
                                  ♫
                                </div>
                                <span className="group-hover:block hidden">
                                  <Pause className="h-4 w-4 text-green-500" />
                                </span>
                              </>
                            )}

                            {isCurrentSong && !isPlaying && (
                              <>
                                <span className="size-4 text-green-500 group-hover:hidden">
                                  {index + 1}
                                </span>
                                <Play className="h-4 w-4 hidden group-hover:block text-green-500" />
                              </>
                            )}

                            {!isCurrentSong && <span>{index + 1}</span>}
                          </div>

                          <div className="flex items-center gap-2 ">
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
                                className={`font-medium text-white truncate hover:underline cursor-pointer`}
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
                          <div>
                            <Button
                              onClick={() =>
                                handleDeleteSongFromPlaylist(song.id)
                              }
                            >
                              <X />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

export default Playlist;
