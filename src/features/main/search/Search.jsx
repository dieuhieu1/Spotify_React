import { formatTime } from "@/features/player/PlaybackControls";
import SearchSkeleton from "@/LoadingSkel/SearchSkeleton";
import { useSearchStore } from "@/store/useSearchStore";
import SectionGrid from "../home/SectionGrid";
import PlayButtonArtist from "../home/PlayBtnArtists";
import PlayButtonPlaylist from "../home/PlayButtonPlaylist";
import PlayButtonSong from "../home/PlayBtnSong";

const Search = () => {
  const {
    topResults = [],
    songs = [],
    error,
    artists = [],
    playlists = [],
  } = useSearchStore();
  const renderPlayButton = (type, data) => {
    console.log(type, data);
    switch (type) {
      case "Artist":
        return <PlayButtonArtist artist={data} />;
      case "Playlist":
        return <PlayButtonPlaylist playlist={data} />;
      case "Song":
        return <PlayButtonSong song={data} />;
      default:
        return null;
    }
  };
  console.log(playlists);
  return (
    <>
      <div className="bg-primary text-white h-[calc(100vh-200px)] p-6 font-sans overflow-auto">
        {/* Tabs */}
        <div className="flex gap-3 mb-6">
          {["Tất cả", "Nghệ sĩ", "Bài hát", "Playlist"].map((tab) => (
            <button
              key={tab}
              className="bg-gray-700 text-white py-1 px-4 rounded-full hover:bg-gray-600 transition"
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Kết quả hàng đầu */}
        <div className="flex flex-row gap-[18%]">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">
            Kết quả hàng đầu
          </h2>
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Bài hát</h2>
        </div>

        <div className="flex">
          {topResults.length > 0 ? (
            <div className="flex items-start flex-col justify-center bg-bgPrimary hover:bg-bgHover cursor-pointer rounded-lg p-8 gap-4 w-[30%] group transition-all relative">
              <img
                src={topResults?.[0]?.response?.imageURL}
                alt={topResults?.[0]?.response?.name}
                className="w-24 h-24 rounded-full aspect-square object-cover"
              />

              <div>
                <h3 className="font-bold text-4xl">
                  {topResults?.[0]?.response?.name ||
                    topResults?.[0]?.response?.title}
                </h3>
                <p className="text-gray-400 text-lg mt-2">
                  {topResults?.[0]?.type} •{" "}
                  {topResults?.[0]?.response?.creator || ""}
                </p>
              </div>
              {renderPlayButton(
                topResults?.[0]?.type,
                topResults?.[0]?.response
              )}
            </div>
          ) : (
            <div className="flex items-start flex-col justify-center bg-bgPrimary hover:bg-bgHover cursor-pointer rounded-lg p-8 gap-4 w-[30%]">
              <img
                src="https://via.placeholder.com/150"
                alt=""
                className="w-24 h-24 rounded-full aspect-square object-cover"
              />

              <div>
                <h3 className="font-bold text-4xl">
                  Không có tìm kiếm phù hợp
                </h3>
                <p className="text-gray-400 text-lg">
                  {" "}
                  Không có kết quả phù hợp
                </p>
              </div>
            </div>
          )}

          {/* Danh sách bài hát */}
          {songs.length > 0 ? (
            <div className="ml-3 w-[70%]">
              <ul>
                {songs.map((song) => (
                  <li
                    key={song.id}
                    className="flex justify-between items-center py-2 px-4 hover:bg-bgHover cursor-pointer rounded-lg transition ml-4 relative group"
                  >
                    <div className="flex gap-4">
                      <img
                        src={song?.imageURL}
                        alt={song?.name}
                        className="w-10 h-10 object-cover rounded-sm "
                      />
                      <div>
                        <h3 className="font-semibold">{song?.name}</h3>
                        <p className="text-sm text-gray-400">
                          {song?.artists?.[0]?.name || ""}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-400">
                      {formatTime(song?.duration)}
                    </span>
                    <PlayButtonSong song={song} />
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="ml-14">Không có bài hát trùng khớp</p>
          )}
        </div>
        {/* Danh sách album */}
        {playlists.length > 0 ? (
          <>
            <div className="mt-8">
              <SectionGrid
                playlists={playlists}
                title={"Có sự xuất hiện của HIEUTHUHAI"}
              />
            </div>
          </>
        ) : (
          // <div className="mt-8">
          //   <h2 className="text-xl font-bold mb-4">
          //     Có sự xuất hiện của HIEUTHUHAI
          //   </h2>
          //   <SectionGrid songs={songs} />
          // </div>
          <div className="mt-4 h-[200px]">
            <SectionGrid title={"Không tìm thấy Danh Sách Phát trùng khớp"} />
          </div>
        )}
        {artists.length > 0 ? (
          <>
            <div className="mt-8">
              <SectionGrid artists={artists} title={"Nghệ Sĩ"} />
            </div>
          </>
        ) : (
          // <div className="mt-8">
          //   <h2 className="text-xl font-bold mb-4">
          //     Có sự xuất hiện của HIEUTHUHAI
          //   </h2>
          //   <SectionGrid songs={songs} />
          // </div>
          <div className="mt-4 h-[200px]">
            <SectionGrid title={"Không tìm thấy Nghệ Sĩ trùng khớp"} />
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
