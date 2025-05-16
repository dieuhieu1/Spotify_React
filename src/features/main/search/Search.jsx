import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import TopResults from "./TopResults";
import SearchArtist from "./SearchArtist";
import SearchSong from "./SearchSong";
import SearchPlaylist from "./SearchPlaylist";
import TopResultsSkeleton from "@/loadingSkeleton/TopResultsSkeleton";
import { useSearchStore } from "@/store/useSearchStore";

const Search = () => {
  const { isSearchLoading } = useSearchStore();
  const [searchParams] = useSearchParams();
  const [selectedTab, setSelectedTab] = useState("Tất cả");
  // console.log(artists);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };
  if (!searchParams.get("query") || isSearchLoading) {
    return <TopResultsSkeleton />;
  }
  return (
    <>
      <div className="bg-primary text-white h-[calc(100vh-200px)] p-6 font-sans overflow-auto">
        {/* Tabs */}
        <div className="flex gap-3 mb-6">
          {["Tất cả", "Nghệ sĩ", "Bài hát", "Playlist"].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`py-1 px-4 rounded-full transition ${
                selectedTab === tab
                  ? "bg-gray-600 text-white"
                  : "bg-gray-700 text-white hover:bg-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {selectedTab === "Tất cả" && <TopResults />}
        {selectedTab === "Nghệ sĩ" && <SearchArtist />}
        {selectedTab === "Bài hát" && <SearchSong />}
        {selectedTab === "Playlist" && <SearchPlaylist />}
      </div>
    </>
  );
};

export default Search;
