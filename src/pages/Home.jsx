import FeaturedSection from "@/features/main/home/FeaturedSection";
import SectionGrid from "@/features/main/home/SectionGrid";
import Suggest from "@/features/main/home/Suggest";
import { useAuth } from "@/providers/AuthProvider";
import { updatePremium } from "@/services/apiPayment";
import { useArtistsStore } from "@/store/useArtistsStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useMusicStore } from "@/store/useMusicStore";
import { usePlayerStore } from "@/store/usePlayerStore";
import { getResponsePayment } from "@/utils/getToken";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useEffect } from "react";

function Home() {
  const { user } = useAuthStore();
  const {
    fetchSavedPlaylists,
    fetchTrendingSongs,
    isMainLoading,
    trendingSongs,
    savedPlaylists,
  } = useMusicStore();
  const { fetchArtists, artists } = useArtistsStore();
  const { initializeQueue } = usePlayerStore();
  const { isLogin } = useAuth();

  const data = getResponsePayment();
  useEffect(() => {
    const { responseCode, amount } = data;
    if (responseCode && amount) {
      updatePremium(responseCode, amount);
    }
  }, [data]);
  useEffect(() => {
    fetchSavedPlaylists();
    fetchTrendingSongs();
    fetchArtists(1, 7, "follower", "desc");
  }, [fetchArtists, fetchSavedPlaylists, fetchTrendingSongs, isLogin]);
  console.log(artists);
  useEffect(() => {
    if (savedPlaylists.length > 0 && trendingSongs.length > 0) {
      const songInSaved = savedPlaylists.flatMap((playlist) => playlist.songs);

      const allSongs = [...songInSaved, ...trendingSongs];
      const uniqueSongs = [
        ...new Map(allSongs.map((song) => [song.id, song])).values(),
      ];
      initializeQueue(uniqueSongs);
    }
  }, [trendingSongs, savedPlaylists, initializeQueue]);
  return (
    <div>
      <main className="rounded-md overflow-auto h-full bg-gradient-to-b from-stone-700 to-primary">
        <ScrollArea className="h-[calc(100vh-150px)] ">
          <div className="p-4 sm:p-6 ">
            {/* <div className="bg-gradient-to-b from-stone-900 to-primary min-h-screen text-white p-8"> */}
            <div>
              {trendingSongs && isLogin ? (
                <>
                  <h1 className="text-2xl sm:text-3xl font-bold mb-6">
                    Good afternoon
                  </h1>
                  <FeaturedSection />
                  <SectionGrid
                    title="Trending Songs"
                    songs={trendingSongs}
                    isMainLoading={isMainLoading}
                  />
                </>
              ) : (
                <Suggest />
              )}
            </div>
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}

export default Home;
