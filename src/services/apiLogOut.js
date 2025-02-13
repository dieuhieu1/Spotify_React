import axios from "axios";

export const logOut = async () => {
  try {
    const response = await axios.post("/logout", {});
    console.log(response.data); // Xử lý dữ liệu trả về
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
  }
};
