import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginDialog = ({ isDialogOpen, setIsDialogOpen }) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    // Kích hoạt animation khi modal mở
    if (isDialogOpen) {
      setTimeout(() => setShow(true), 50); // Delay nhỏ để kích hoạt transition
    } else {
      setShow(false);
    }
  }, [isDialogOpen]);

  if (!isDialogOpen) return null;
  const handleOverlayClick = (e) => {
    // Kiểm tra nếu click vào vùng overlay (nền mờ)
    if (e.target === e.currentTarget) {
      setIsDialogOpen(false);
    }
  };
  return (
    <div
      onClick={(e) => handleOverlayClick(e)}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 trasition-all"
    >
      {/* Hộp thoại chính */}
      <div
        className={`bg-gradient-to-t from-primary to-[#074799] p-6 rounded-lg w-96 text-white shadow-lg relative transform transition-all duration-500 ${
          show ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        }`}
      >
        {/* Hình ảnh */}
        <div className="w-full h-48 mb-4">
          <img
            src="https://cdn1.tuoitre.vn/thumb_w/1200/471584752817336320/2024/8/29/hieuthuhai-6-1724922106140134622997-0-0-994-1897-crop-17249221855301721383554.jpg" // Thay bằng link hình ảnh thực tế
            alt="Spotify Free"
            className="w-full h-full object-cover rounded-md"
          />
        </div>

        {/* Nội dung */}
        <h2 className="text-2xl font-bold mb-2 text-center">
          Bắt đầu nghe bằng tài khoản cá nhân
        </h2>
        <div className="flex flex-col gap-3 items-center mt-4">
          <button
            className="w-full py-2 bg-[#009990] text-black font-bold rounded-full hover:bg-[#5db8b2] transition"
            onClick={() => navigate("/login")}
          >
            Đăng ký miễn phí
          </button>
        </div>

        {/* Đăng nhập */}
        <p className="text-sm text-gray-300 mt-4 text-center">
          Bạn đã có tài khoản?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-white font-semibold underline hover:text-gray-200"
          >
            Đăng nhập
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginDialog;
