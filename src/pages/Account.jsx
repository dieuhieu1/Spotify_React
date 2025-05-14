import User from "@/features/auth/User/User";
import { useAuth } from "@/providers/AuthProvider";
import Logo from "@/UI/Logo";
import { ChevronRight, Pencil, RotateCcw } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Account = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-800 to-black text-white">
      {/* Header */}
      <div className="flex bg-primary h-[300px] flex-col justify-center  p-8">
        <div className="flex justify-between mb-8">
          <Link to="/">
            <Logo />
          </Link>
          <User />
        </div>
        <div className="flex items-center gap-6">
          {/* Profile Icon */}
          <div className="w-36 h-36 bg-gray-700 flex items-center justify-center rounded-full">
            <img src="" alt="" />
          </div>

          {/* Profile Name */}
          <div>
            <h1 className="text-6xl font-bold">loser hieu</h1>
            <p className="text-gray-400 mt-2">
              3 danh sách phát công khai •{" "}
              <span className="text-white font-semibold">5 đang theo dõi</span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center flex-col gap-4 mt-5">
        <div className="bg-gray-800 text-white p-4 rounded-lg w-full max-w-md ">
          {/* Header */}
          <h2 className="text-lg font-bold mb-4">Tài khoản</h2>

          {/* Option List */}
          <Link to="/profile" className="space-y-4">
            {/* Chỉnh sửa hồ sơ */}
            <div className="flex items-center justify-between cursor-pointer hover:bg-gray-700 p-2 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="bg-gray-600 p-2 rounded">
                  <Pencil className="w-5 h-5 text-gray-300" />
                </div>
                <span className="text-sm font-medium">Chỉnh sửa hồ sơ</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </Link>
        </div>
        <div className="bg-gray-800 text-white p-4 rounded-lg w-full max-w-md">
          {/* Header */}
          <h2 className="text-lg font-bold mb-4">Đăng ký Premium</h2>

          {/* Subscription Option */}
          <Link
            to="/premium"
            className="flex items-center justify-between cursor-pointer hover:bg-gray-700 p-2 rounded-lg"
          >
            <div className="flex items-center gap-2">
              {/* Icon */}
              <div className="bg-gray-600 p-2 rounded">
                {/* Icon Spotify hoặc thay thế bằng một hình ảnh */}
                <img
                  src="https://png.pngtree.com/png-vector/20191113/ourmid/pngtree-premium-quality-label-icon-flat-style-png-image_1977936.jpg"
                  alt="Spotify"
                  className="w-5 h-5"
                />
              </div>

              {/* Text */}
              <span className="text-sm font-medium">
                Khám phá các gói đăng ký
              </span>
            </div>
            {/* Chevron Right */}
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Account;
