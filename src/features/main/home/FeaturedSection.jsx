import PlayButton from "@/features/main/playController/PlayButtonPlaylist";
import FeaturedGridSkeleton from "@/loadingSkeleton/FeaturedGridSkeleton";
import { useAuthStore } from "@/store/useAuthStore";
import { useMusicStore } from "@/store/useMusicStore";
import { useNavigate } from "react-router-dom";

const FeaturedSection = () => {
  const navigate = useNavigate();
  const { isMainLoading, savedPlaylists } = useMusicStore();
  const { user } = useAuthStore();
  // Nếu đang tải, trả về skeleton
  if (isMainLoading) return <FeaturedGridSkeleton />;
  const combinedPlaylists = [
    ...(savedPlaylists || []),
    ...(user?.createdPlaylists || []),
  ];
  return (
    <>
      {/* Kiểm tra nếu có playlists */}
      {combinedPlaylists && combinedPlaylists.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {combinedPlaylists.map((playlist) => (
            <div
              onClick={() => navigate(`/playlist/${playlist.id}`)}
              key={playlist?.id}
              className="flex items-center bg-zinc-800/50 rounded-md overflow-hidden
            hover:bg-zinc-700/50 transition-colors group cursor-pointer relative"
            >
              {/* Kiểm tra và render ảnh playlist */}
              <img
                src={
                  playlist?.imageURL ||
                  "https://discussions.apple.com/content/attachment/592590040"
                } // Dự phòng ảnh mặc định nếu không có imageURL
                alt={playlist?.title || "Playlist Image"}
                className="w-16 sm:w-20 h-16 sm:h-20 object-cover flex-shrink-0"
              />
              <div className="flex-1 p-4">
                {/* Tiêu đề danh sách phát */}
                <p className="font-medium truncate">
                  {playlist?.title || "Danh sách phát không tên"}
                </p>
                <p className="text-sm text-zinc-400 truncate">
                  {playlist?.artist ||
                    playlist?.creator ||
                    "Nghệ sĩ không xác định"}
                </p>
              </div>
              {/* Nút Play */}
              <PlayButton playlist={playlist} />
            </div>
          ))}
        </div>
      ) : (
        // Nếu không có playlist, hiển thị thông báo
        ""
      )}
    </>
  );
};

export default FeaturedSection;
