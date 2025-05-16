import { Button } from "@/components/ui/button";
import SectionGridSkeleton from "@/loadingSkeleton/SectionGridSkeleton";

import PlayButtonSong from "../playController/PlayBtnSong";
import PlayButtonPlaylist from "../playController/PlayButtonPlaylist";
import { useNavigate } from "react-router-dom";
import PlayButtonArtist from "../playController/PlayBtnArtists";

const SectionGrid = ({ songs, playlists, title, isMainLoading, artists }) => {
  const navigate = useNavigate();
  if (isMainLoading) return <SectionGridSkeleton />;
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
        <Button
          variant="link"
          className="text-sm text-zinc-400 hover:text-white"
        >
          Show all
        </Button>
      </div>
      {songs && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(6,_200px)] gap-4">
          {songs?.slice(0, 10).map((song) => (
            <div
              key={song?.id}
              className="bg-zinc-800/40 p-4 rounded-md hover:bg-zinc-700/40 transition-all group cursor-pointer relative"
            >
              <div className="relative mb-4">
                <div className="aspect-square rounded-md shadow-lg overflow-hidden">
                  <img
                    onClick={() => navigate(`/track/${song.id}`)}
                    src={song?.imageURL}
                    alt={song?.name}
                    className="w-full h-full object-cover transition-transform duration-300 
                  group-hover:scale-105"
                  />
                </div>
              </div>
              <h3 className="font-medium mb-2 truncate">{song?.name}</h3>
              <p className="text-sm text-zinc-400 truncate">
                {song?.artists?.[0]?.name}
              </p>
              <div onClick={(e) => e.stopPropagation()}>
                <PlayButtonSong song={song} />
              </div>
            </div>
          ))}
        </div>
      )}

      {playlists && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(6,_200px)] gap-4">
          {playlists
            ?.slice(0, 6) // Giới hạn chỉ lấy 4 phần tử
            .map((playlist) => (
              <div
                key={playlist?.id}
                className="bg-zinc-800/40 p-4 rounded-md hover:bg-zinc-700/40 transition-all group cursor-pointer relative"
              >
                <div className=" mb-4">
                  <div className="aspect-square rounded-md shadow-lg overflow-hidden">
                    <img
                      onClick={() => navigate(`/playlist/${playlist.id}`)}
                      src={
                        playlist?.imageURL ||
                        "https://discussions.apple.com/content/attachment/592590040"
                      }
                      alt={playlist?.title}
                      className="w-full h-full object-cover transition-transform duration-300 
                  group-hover:scale-105"
                    />
                  </div>
                </div>
                <h3 className="font-medium mb-2 truncate">{playlist?.title}</h3>
                <p className="text-sm text-zinc-400 truncate">
                  {playlist?.creator}
                </p>
                <div onClick={(e) => e.stopPropagation()}>
                  <PlayButtonPlaylist playlist={playlist} />
                </div>
              </div>
            ))}
        </div>
      )}

      {artists && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(6,_200px)] gap-4">
          {artists
            ?.slice(0, 10) // Giới hạn chỉ lấy 4 phần tử
            .map((artist) => (
              <div
                key={artist?.id}
                className="bg-zinc-800/40 p-4 rounded-md hover:bg-zinc-700/40 transition-all group cursor-pointer relative"
              >
                <div className="relative mb-4">
                  <div className="aspect-square rounded-md shadow-lg overflow-hidden">
                    <img
                      onClick={() => navigate(`/artist/${artist.id}`)}
                      src={artist?.imageURL}
                      alt={artist?.name}
                      className="w-full h-full object-cover transition-transform duration-300 
                  group-hover:scale-105"
                    />
                  </div>
                </div>
                <h3 className="font-medium mb-2 truncate">{artist?.name}</h3>
                <p className="text-sm text-zinc-400 truncate">Nghệ sĩ</p>
                <div onClick={(e) => e.stopPropagation()}>
                  <PlayButtonArtist artist={artist} />
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
export default SectionGrid;
