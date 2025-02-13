import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Link, Outlet } from "react-router-dom";
import Header from "./Header";
import LeftSidebar from "./LeftSidebar";
import AudioPlayer from "@/features/player/AudioPlayer";
import PlaybackControls from "@/features/player/PlaybackControls";
import { useEffect, useState } from "react";
import { useAuth } from "@/providers/AuthProvider";

function AppLayout() {
  const [isMobile, setIsMobile] = useState(false);
  const { isLogin } = useAuth();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  return (
    <div className="bg-black h-screen flex flex-col text-white">
      {/* Header */}
      <Header />

      <ResizablePanelGroup
        direction="horizontal"
        className="flex-1 flex p-2 mb-2"
      >
        <AudioPlayer />

        {/* Left sidebar */}
        <ResizablePanel defaultSize={20}>
          <LeftSidebar />
        </ResizablePanel>

        {/* Main Layout */}
        <ResizablePanel className="mx-2 rounded-md">
          <Outlet />
        </ResizablePanel>
      </ResizablePanelGroup>
      {isLogin ? (
        <PlaybackControls />
      ) : (
        <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 text-white">
          {/* Nội dung bên trái */}
          <div>
            <h2 className="font-bold text-sm">Xem trước MyMusic</h2>
            <p className="text-sm">
              Đăng ký để nghe không giới hạn các bài hát. Không cần thẻ tín
              dụng.
            </p>
          </div>

          {/* Nút Đăng ký miễn phí */}
          <Link
            to="/login"
            className="bg-white text-black font-bold py-2 px-4 rounded-full hover:scale-105 transition-transform duration-200"
          >
            Đăng ký miễn phí
          </Link>
        </div>
      )}
    </div>
  );
}

export default AppLayout;
