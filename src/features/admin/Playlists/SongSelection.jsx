import { useState } from "react";
import { X } from "lucide-react";

const SongSelection = ({ playlist, setPlaylist, songs }) => {
  const [selectedSongIds, setelectedSongIds] = useState(playlist.songIds || []);
  const [searchTerm, setSearchTerm] = useState(""); // Search term for filtering
  const [filteredSongs, setFilteredSongs] = useState([]); // Filtered artists based on search

  // Handle artist selection
  const handleSelectSong = (songId) => {
    if (!selectedSongIds.includes(songId)) {
      const updatedSongs = [...selectedSongIds, songId];
      setelectedSongIds(updatedSongs);
      setPlaylist({ ...playlist, songIds: updatedSongs });
    }
  };

  // Handle removing artist from the selected list
  const handleRemoveSong = (songId) => {
    const updatedSongs = selectedSongIds.filter((id) => id !== songId);
    setelectedSongIds(updatedSongs);
    setPlaylist({ ...playlist, songIds: updatedSongs });
  };

  // Filter artists based on search term
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);

    // Filter the artists based on the search term
    const filtered = songs.filter((song) =>
      song.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredSongs(filtered);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-white">Artists </label>

      {/* Search input for filtering artists */}
      <input
        type="text"
        placeholder="Search artists..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full p-2 bg-zinc-800 border border-zinc-700 text-white rounded-md"
      />

      {/* Dropdown with filtered artists */}
      {searchTerm && filteredSongs.length > 0 && (
        <div className="bg-zinc-800 border border-zinc-700 text-white shadow-md rounded-md mt-2">
          {filteredSongs.map((song) => (
            <div
              key={song._id}
              onClick={() => {
                handleSelectSong(song.id);
                setSearchTerm("");
              }}
              className="px-4 py-2 hover:bg-zinc-700 cursor-pointer rounded-md"
            >
              {song.name}
            </div>
          ))}
        </div>
      )}

      {/* Display selected artists with a remove button */}
      <div className="mt-4 flex flex-wrap">
        {selectedSongIds.map((id) => {
          const song = songs.find((item) => item.id === id);
          console.log(song);
          return song ? (
            <div
              key={song.id}
              className="flex items-center bg-gray-200 px-3 py-1 rounded-full mr-2 mb-2"
            >
              <span className="text-sm text-gray-700">{song.name}</span>
              <X
                className="ml-2 text-gray-500 cursor-pointer hover:text-red-500"
                onClick={() => handleRemoveSong(song.id)} // Remove artist by ID
              />
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
};

export default SongSelection;
