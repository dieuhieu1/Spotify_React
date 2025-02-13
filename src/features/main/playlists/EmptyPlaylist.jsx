import { formatTime } from "@/features/player/PlaybackControls";
import { useAuth } from "@/providers/AuthProvider";
import { useAuthStore } from "@/store/useAuthStore";
import { useSearchStore } from "@/store/useSearchStore";
import { useEffect, useState } from "react";
import EditPlaylistModal from "./EditPlaylistModal ";
import { createPlaylist, updatePlaylist } from "@/services/apiPlaylist";
import { getUserInfo } from "@/services/apiUserInfo";

const EmptyPlaylist = () => {
  const { user } = useAuthStore();
  const [songsAdd, setSongsAdd] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { findSongs, songs } = useSearchStore();
  const [description, setDescription] = useState("");
  const [query, setQuery] = useState("");
  const [title, setTitle] = useState("Danh sách phát của tôi");
  const [files, setFiles] = useState({
    image: null,
  });

  const handleCreate = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("songs", songsAdd);
    formData.append("image", files.image);
    formData.append("creator", user.name);
    console.log(user?.createdPlaylists);

    const res = await createPlaylist(formData);
  };
  const handleAdd = (name) => {
    setSongsAdd((prev) => [...prev, name]);
    console.log(songsAdd);
  };
  useEffect(() => {
    if (query.trim()) {
      const timer = setTimeout(() => {
        findSongs(query);
      }, 500); // Debounce 500ms
      return () => clearTimeout(timer); // Clear timeout nếu query thay đổi trước khi timeout
    } else {
      findSongs("");
    }
  }, [query]);

  return (
    <div className="bg-zinc-900 text-white min-h-screen">
      {/* Header Playlist */}
      <div className="bg-gradient-to-b from-zinc-800 to-zinc-900 p-8 flex items-center gap-6">
        <div
          className="w-48 h-48 bg-zinc-700 flex items-center justify-center rounded-md"
          onClick={() => setShowModal(true)}
        >
          {/* Placeholder cho hình ảnh playlist */}
          {files?.image ? (
            <img
              src={files?.image}
              alt=""
              className="w-full h-full object-cover rounded-md"
            />
          ) : (
            <span className="text-5xl">🎵</span>
          )}
        </div>
        <div>
          <p className="uppercase text-sm text-gray-400 font-medium mb-2">
            Playlist
          </p>
          <h1
            className="text-6xl font-bold mb-2 hover:underline cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            {title}
          </h1>
          <p className="text-gray-400">{user?.name} •</p>
        </div>
      </div>

      {/* Nội dung playlist */}
      <div className="p-8">
        <h2 className="text-xl font-semibold mb-4">
          Hãy cùng tìm nội dung cho danh sách phát của bạn
        </h2>
        {/* Ô tìm kiếm */}
        <div className="flex items-center gap-4">
          <input
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="🔍 Tìm bài hát và tập podcast"
            className="bg-zinc-800 w-full p-3 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-zinc-600"
          />
        </div>
      </div>
      <ul>
        {songs?.length > 0 &&
          songs?.map((song) => (
            <li
              key={song?.id}
              className={`flex justify-between items-center py-2 hover:bg-zinc-800 rounded-md p-2 mx-8 cursor-pointer ${
                song?.active ? "bg-zinc-800" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <img
                  src={song?.imageURL} // Thay bằng URL ảnh thật
                  alt={song?.name}
                  className="w-10 h-10 object-cover rounded-md"
                />
                <div>
                  <p className="font-medium">{song?.name}</p>
                  <p className="text-sm text-gray-400">
                    {song?.artists?.[0]?.name}
                  </p>
                </div>
              </div>
              <span className="text-gray-400">{song?.listener} lượt nghe</span>
              <div className="flex gap-6 items-center">
                <span className="text-gray-400">
                  {formatTime(song?.duration)}
                </span>
              </div>
              <button
                onClick={() => handleAdd(song.name)}
                className="flex gap-6 items-center border border-white px-4 py-2 rounded-full hover:scale-105 
              opacity-90 transition-all hover:opacity-100"
              >
                <span className="text-white font-bold">Thêm</span>
              </button>
            </li>
          ))}
      </ul>
      {/* Footer */}
      <div className="flex justify-center p-6">
        <button
          className="bg-white text-black font-bold py-2 px-4 rounded-full hover:bg-gray-200 transition"
          onClick={() => handleCreate()}
        >
          Lưu danh sách phát
        </button>
      </div>
      {showModal && (
        <EditPlaylistModal
          onClose={() => setShowModal(false)}
          title={title}
          setTitle={setTitle}
          files={files}
          setFiles={setFiles}
          setDescription={setDescription}
        />
      )}
    </div>
  );
};

export default EmptyPlaylist;
