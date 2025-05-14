import { useAuth } from "@/providers/AuthProvider";
import { useSearchStore } from "@/store/useSearchStore";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const { fetchTopResults, findSongs, findPlaylists, findArtists } =
    useSearchStore();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { isLogin } = useAuth();
  const { isDialogOpen, setIsDialogOpen } = useAuth();

  useEffect(() => {
    if (query.trim()) {
      const timer = setTimeout(() => {
        fetchTopResults(query);
        findSongs(query);
        findPlaylists(query);
        findArtists(query);
      }, 500); // Debounce 500ms
      return () => clearTimeout(timer);
    } else {
      fetchTopResults("");
      findSongs("");
      findPlaylists("");
      findArtists("");
    }
  }, [fetchTopResults, findArtists, findPlaylists, findSongs, query]);

  return (
    <div>
      <div className="relative w-full max-w-md mx-auto">
        <div className="relative w-[450px] w-">
          <input
            type="text"
            placeholder="Bạn muốn phát nội dung gì?"
            className="w-full px-[50px] py-4 bg-[#121212] border border-black text-white rounded-full opacity-80 placeholder-white placeholder-opacity-80 cursor-pointer transition-opacity duration-100 hover:opacity-100 hover:border-white"
            onClick={() =>
              isLogin ? navigate("/search") : setIsDialogOpen(true)
            }
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="absolute left-6 top-1/2 -translate-y-1/2">
            <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
