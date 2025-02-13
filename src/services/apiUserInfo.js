import axios from "axios";

export const getUserInfo = async (token) => {
  try {
    const response = await axios.get("/myInfo", {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "*/*",
      },
    });
    console.log(response.data); // Xử lý dữ liệu trả về
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
  }
};
