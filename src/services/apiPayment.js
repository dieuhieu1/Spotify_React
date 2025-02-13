import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";

export const paymentAPI = async (month) => {
  try {
    // Gửi yêu cầu đăng nhập
    const response = await axiosInstance.get(
      `/payment/vn-pay?premiumType=${month}-month`
    );
    if (response) {
      return response.data.result;
    }
  } catch (error) {
    // Kiểm tra lỗi phản hồi từ API
    console.log(error);
    if (error.response) {
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
export const updatePremium = async (responseCode, amount) => {
  console.log("responseCode: ", typeof responseCode, responseCode);
  console.log("amount: ", typeof amount, amount);

  try {
    const response = await axiosInstance.post("/payment/vn-pay-callback", {
      responseCode,
      amount,
    });
    toast.success(response.data.message);

    if (response) {
      return response.data.message;
    }
  } catch (error) {
    // Kiểm tra lỗi phản hồi từ API
    console.log(error);
    // if (error.response) {
    //   if (error.response.status === 401) {
    //     throw new Error(error.response.data.message);
    //   }
    //   if (error.response.status === 404) {
    //     throw new Error(error.response.data.message);
    //   }
    // } else if (error.request) {
    //   throw new Error("Không thể kết nối đến máy chủ, vui lòng thử lại!");
    // } else {
    //   throw new Error("Lỗi không xác định!");
    // }
  }
};
