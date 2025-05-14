import { useAuth } from "@/providers/AuthProvider";
import { logOut } from "@/services/apiLogOut";
import { useAuthStore } from "@/store/useAuthStore";
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function User() {
  const { user, reset } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { setIsLogin } = useAuth();
  const navigate = useNavigate();
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLogout = () => {
    // Xử lý đăng xuất
    logOut();
    reset();
    sessionStorage.removeItem("authToken");
    setIsLogin(false);
    navigate("/"); // Chuyển hướng về trang đăng nhập hoặc làm mới trang
  };

  return (
    <div className="relative">
      {/* User Avatar */}
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-full hover:bg-gray-700 transition focus:outline-none"
      >
        <img
          src={
            user?.imageURL ||
            "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
          } // Thay bằng ảnh đại diện người dùng
          alt="User Avatar"
          className="w-8 h-8 rounded-full object-cover"
        />
        <span className="text-sm font-medium text-white">{user?.name}</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <Link
            to="/account"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Account
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
