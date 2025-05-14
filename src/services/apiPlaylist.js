import { axiosInstance } from "@/lib/axios";

// Gọi API login và xử lý lỗi
export const createPlaylist = async (playlistData) => {
  try {
    const response = await axiosInstance.post("/playlist", playlistData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data.result;
  } catch (error) {
    console.log(error);
  }
};
export const updatePlaylist = async (formData, playlistId) => {
  try {
    const response = await axiosInstance.put(
      `/playlist/${playlistId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response.data.result);
    return response.data.result;
  } catch (error) {
    console.log(error);
  }
};
