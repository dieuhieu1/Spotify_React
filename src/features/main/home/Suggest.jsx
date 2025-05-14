import { useMusicStore } from "@/store/useMusicStore";

import PlayBtn from "./PlayBtn";
import LoginDialog from "@/UI/LoginDialog";

import { useAuth } from "@/providers/AuthProvider";
import { useArtistsStore } from "@/store/useArtistsStore";

const Suggest = () => {
  const { artists } = useArtistsStore();
  const { trendingSongs } = useMusicStore();
  const { isDialogOpen, setIsDialogOpen } = useAuth();

  return (
    <div className="mb-16">
      {/* Phần Nghệ sĩ phổ biến */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Bài hát phổ biến</h2>
          <span className="text-sm text-green-400 hover:underline cursor-pointer">
            Hiện tất cả
          </span>
        </div>

        <div className="grid grid-cols-6 gap-2">
          {trendingSongs.map((song) => (
            <div
              onClick={() => setIsDialogOpen(true)}
              key={song.id}
              className="flex flex-col hover:bg-zinc-700/40 transition-all cursor-pointer relative group p-3 rounded-md"
            >
              <div className="aspect-square shadow-sm rounded-md shadow-black overflow-hidden">
                <img
                  src={song.imageURL}
                  alt={song.name}
                  className="w-full h-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105 "
                />
              </div>

              <p className="text-md font-semibold mt-2">{song.name}</p>
              <p className="text-sm text-gray-400">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(6,_200px)] gap-2">
          {artists?.map((artist) => (
            <div
              onClick={() => setIsDialogOpen(true)}
              key={artist?.id}
              className=" p-2 rounded-md w-[100%] hover:bg-zinc-700/40 transition-all cursor-pointer relative group"
            >
              <div className="aspect-square rounded-full shadow-sm  shadow-black overflow-hidden">
                <img
                  src={
                    artist?.imageURL ||
                    "https://discussions.apple.com/content/attachment/592590040"
                  }
                  alt={artist?.name}
                  className="w-full h-full object-cover transition-transform duration-300 
                group-hover:scale-105 "
                />
              </div>
              <div className="mt-2">
                <p className="text-md font-semibold">{artist?.name}</p>
                <p className="text-sm text-gray-400">Nghệ sĩ</p>
              </div>
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
