import { useState, useEffect } from "react";
import { formatTime } from "@/features/player/PlaybackControls";
import { Check } from "lucide-react";

const SongSearch = ({ songs, query, setQuery, handleAdd, addedSongs }) => {
  const [filteredSongs, setFilteredSongs] = useState(songs);

  // Hàm lọc bài hát khi người dùng thay đổi query
  useEffect(() => {
    if (query.trim()) {
      const filtered = songs?.filter((song) =>
        song?.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs("");
    }
  }, [query, songs]);

  return (
    <div className="mt-2">
      {/* Ô tìm kiếm */}
      <div className="flex flex-col items-center gap-4 mb-3">
        <input
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="🔍 Tìm bài hát và tập podcast"
          className="bg-zinc-800 w-full p-3 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-zinc-600"
        />

        {/* Hiển thị danh sách bài hát */}
        <ul className="w-full">
          {filteredSongs?.length > 0 &&
            filteredSongs.map((song) => (
              <li
                key={song?.id}
                className="flex justify-between items-center py-2 px-4 hover:bg-zinc-800 rounded-md cursor-pointer"
              >
                <div className="flex items-center gap-4 w-full">
                  <img
                    src={song?.imageURL} // Thay bằng URL ảnh thật
                    alt={song?.name}
                    className="w-10 h-10 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{song?.name}</p>
                    <p className="text-sm text-gray-400">
                      {song?.artists?.[0]?.name}
                    </p>
                  </div>
                  <div className="text-gray-400 text-center flex-shrink-0 w-[120px]">
                    {song?.listener} lượt nghe
                  </div>
                  <div className="text-gray-400 text-center flex-shrink-0 w-[120px]">
                    {formatTime(song?.duration)}
                  </div>
                </div>
                {/* Conditional render for button */}
                <button
                  onClick={() => handleAdd(song?.id)} // Thêm bài hát vào playlist
                  className="flex gap-4 items-center border border-white px-4 py-2 rounded-full hover:scale-105 opacity-90 transition-all hover:opacity-100"
                >
                  {addedSongs?.includes(song.id) ? (
                    <Check className="text-green-500" size={24} />
                  ) : (
                    <span className="text-white font-bold">Thêm</span>
                  )}
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default SongSearch;
