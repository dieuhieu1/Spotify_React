import { useMusicStore } from "@/store/useMusicStore";

import PlayBtn from "./PlayBtn";
import LoginDialog from "@/UI/LoginDialog";
import { useEffect, useState } from "react";
import { useAuth } from "@/providers/AuthProvider";

const Suggest = () => {
  const {
    fetchTrendingSongs,
    fetchFeaturedPlaylists,
    trendingSongs,
    featuresPlaylists,
  } = useMusicStore();
  const { isDialogOpen, setIsDialogOpen } = useAuth();

  useEffect(() => {
    fetchFeaturedPlaylists(1, 10);
    fetchTrendingSongs();
  }, [fetchFeaturedPlaylists, fetchTrendingSongs]);
  return (
    <div className="bg-gradient-to-b from-stone-900 to-primary min-h-screen text-white p-8">
      {/* Phần Nghệ sĩ phổ biến */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Bài hát phổ biến</h2>
          <span className="text-sm text-green-400 hover:underline cursor-pointer">
            Hiện tất cả
          </span>
        </div>

        <div className="grid grid-cols-6 gap-4">
          {trendingSongs.map((song) => (
            <div
              onClick={() => setIsDialogOpen(true)}
              key={song.id}
              className="flex flex-col items-center hover:bg-zinc-700/40 transition-all cursor-pointer rounded-md relative group"
            >
              <img
                src={song.imageURL}
                alt={song.name}
                className="w-[230px] h-[230px] aspect-square object-cover rounded-full mb-2 p-2"
              />
              <p className="text-sm font-semibold text-center">{song.name}</p>
              <p className="text-xs text-gray-400">
                {song?.artists?.[0]?.name}
              </p>
              <PlayBtn />
            </div>
          ))}
        </div>
      </section>

      {/* Phần Album và đĩa đơn nổi tiếng */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Danh sách phát nổi tiếng</h2>
          <span className="text-sm text-green-400 hover:underline cursor-pointer">
            Hiện tất cả
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(6,_200px)] gap-4">
          {featuresPlaylists?.map((playlist) => (
            <div
              onClick={() => setIsDialogOpen(true)}
              key={playlist?.id}
              className=" p-4 rounded-md w-[100%] hover:bg-zinc-700/40 transition-all cursor-pointer relative group"
            >
              <div className="aspect-square rounded-md shadow-lg overflow-hidden">
                <img
                  src={
                    playlist?.imageURL ||
                    "https://discussions.apple.com/content/attachment/592590040"
                  }
                  alt={playlist?.title}
                  className="w-full h-full object-cover transition-transform duration-300 
                group-hover:scale-105 "
                />
              </div>

              <h3 className="font-medium mb-2 truncate">{playlist?.title}</h3>
              <p className="text-sm text-zinc-400 truncate">
                {playlist?.creator}
              </p>
              <PlayBtn />
            </div>
          ))}
        </div>
      </section>
      <LoginDialog
        className="text-white"
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
    </div>
  );
};

export default Suggest;
