import FeaturedSection from "@/features/main/home/FeaturedSection";
import SectionGrid from "@/features/main/home/SectionGrid";
import Suggest from "@/features/main/home/Suggest";
import { useAuth } from "@/providers/AuthProvider";
import { updatePremium } from "@/services/apiPayment";
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
    fetchFeaturedPlaylists,
    isMainLoading,
    trendingSongs,
    savedPlaylists,
    featuresPlaylists,
  } = useMusicStore();
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
    if (isLogin) {
      fetchFeaturedPlaylists();
      fetchSavedPlaylists();
      fetchTrendingSongs();
    }
  }, [
    fetchFeaturedPlaylists,
    fetchSavedPlaylists,
    fetchTrendingSongs,
    isLogin,
  ]);

  useEffect(() => {
    if (
      savedPlaylists.length > 0 &&
      trendingSongs.length > 0 &&
      featuresPlaylists.length > 0
    ) {
      const songInSaved = savedPlaylists.flatMap((playlist) => playlist.songs);
      const songsInFeatured = featuresPlaylists.flatMap(
        (playlist) => playlist.songs
      );
      const allSongs = [...songInSaved, ...trendingSongs, ...songsInFeatured];
      const uniqueSongs = [
        ...new Map(allSongs.map((song) => [song.id, song])).values(),
      ];
      initializeQueue(uniqueSongs);
    }
  }, [trendingSongs, savedPlaylists, featuresPlaylists, initializeQueue]);
  return (
    <div>
      {featuresPlaylists && isLogin ? (
        <main className="rounded-md overflow-auto h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="p-4 sm:p-6">
              <h1 className="text-2xl sm:text-3xl font-bold mb-6">
                Good afternoon
              </h1>
              <FeaturedSection />

              <div className="space-y-8">
                <SectionGrid
                  title={`Made For ${user?.name}`}
                  playlists={featuresPlaylists}
                  isMainLoading={isMainLoading}
                />
                <SectionGrid
                  title="Trending Songs"
                  songs={trendingSongs}
                  isMainLoading={isMainLoading}
                />
              </div>
            </div>
          </ScrollArea>
        </main>
      ) : (
        <Suggest />
      )}
    </div>
  );
}

export default Home;
