import { axiosInstance } from "@/lib/axios";

// Gọi API login và xử lý lỗi
export const loginAPI = async (email, password) => {
  // Kiểm tra mật khẩu có ít nhất 5 ký tự không
  if (password.length < 5) {
    throw new Error("Mật khẩu phải có ít nhất 5 ký tự!");
  }

  try {
    // Gửi yêu cầu đăng nhập
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });

    // Trả về kết quả thành công
    if (response) {
      return response.data;
    }
  } catch (error) {
    // Kiểm tra lỗi phản hồi từ API
    console.log(error);
    if (error.response) {
      // Lỗi trả về từ server (ví dụ: sai mật khẩu, email không tồn tại)
      if (error.response.status === 401) {
        throw new Error(error.response.data.message);
      }
      if (error.response.status === 404) {
        throw new Error(error.response.data.message);
      }
    } else if (error.request) {
      throw new Error("Không thể kết nối đến máy chủ, vui lòng thử lại!");
    } else {
      throw new Error("Lỗi không xác định!");
    }
  }
};
