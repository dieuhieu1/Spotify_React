import { useState } from "react";
import { useMusicStore } from "@/store/useMusicStore";
import { useAuthStore } from "@/store/useAuthStore";
import { usePlaylistStore } from "@/store/usePlaylistStore";
import toast from "react-hot-toast";
import SongSearch from "../search/SongSearch";
import EditPlaylistModal from "./EditPlaylistModal ";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";

const EmptyPlaylist = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { trendingSongs } = useMusicStore();
  const { addPlaylist } = usePlaylistStore();
  const [addedSongs, setAddedSongs] = useState([]);
  const [songIds, setSongIds] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [query, setQuery] = useState("");
  const [file, setFile] = useState(null);
  const [playlist, setPlaylist] = useState({
    title: "Danh sách phát của tôi",
    description: "",
    imageURL: "",
    songIds: [],
  });

  const handleCreate = async () => {
    if (file) {
      playlist.imageURL = file.url;
    }
    console.log(playlist);
    const result = await addPlaylist(playlist);
    if (result) {
      toast.success("Playlist created successfully");
      navigate("/");
    } else {
      toast.error("Failed to create playlist");
    }
  };

  const handleAdd = (songId) => {
    console.log(songId);
    if (!songIds.includes(songId)) {
      const selectedSongs = [...songIds, songId];
      setSongIds(selectedSongs);
      setAddedSongs((prev) => [...prev, songId]);
      setPlaylist({ ...playlist, songIds: selectedSongs });
    }
  };

  return (
    <ScrollArea className="bg-zinc-900 text-white min-h-screen">
      {/* Header Playlist */}
      <div className="bg-gradient-to-b from-zinc-800 to-zinc-900 p-8 flex items-center gap-6">
        <div
          className="w-48 h-48 bg-zinc-700 flex items-center justify-center rounded-md"
          onClick={() => setShowModal(true)}
        >
          {file ? (
            <img
              src={file?.url}
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
            {playlist.title}
          </h1>
          <p className="text-gray-400">{user?.name} •</p>
        </div>
      </div>

      {/* Nội dung playlist */}
      <div className="p-8">
        <h2 className="text-xl font-semibold mb-4">
          Hãy cùng tìm nội dung cho danh sách phát của bạn
        </h2>

        {/* Component tìm kiếm bài hát */}
        <SongSearch
          songs={trendingSongs}
          query={query}
          setQuery={setQuery}
          handleAdd={handleAdd}
          addedSongs={addedSongs}
        />
        {/* Footer */}
        <div className="flex justify-center p-6">
          <button
            className="bg-white text-black font-bold py-2 px-4 rounded-full hover:bg-gray-200 transition"
            onClick={() => handleCreate()}
          >
            Lưu danh sách phát
          </button>
        </div>
      </div>

      {showModal && (
        <EditPlaylistModal
          onClose={() => setShowModal(false)}
          playlist={playlist}
          setPlaylist={setPlaylist}
          file={file}
          setFile={setFile}
        />
      )}
    </ScrollArea>
  );
};

export default EmptyPlaylist;
