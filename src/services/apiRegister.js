import { axiosInstance } from "@/lib/axios";

// Gọi API login và xử lý lỗi
export const registerAPI = async (name, email, password, dob) => {
  try {
    // Gửi yêu cầu đăng nhập
    const confirmPassword = password;
    const response = await axiosInstance.post("/auth/register", {
      name,
      email,
      password,
      confirmPassword,
      dob,
    });

    // Trả về kết quả thành công
    if (response) {
      return response.data;
    }
  } catch (error) {
    // Kiểm tra lỗi phản hồi từ API
    console.log(error);
    if (error.response) {
      throw new Error(error.response.data.message);
    }
  }
};
