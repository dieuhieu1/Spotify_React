import { axiosInstance } from "@/lib/axios";

// Gọi API upload video file
export const uploadSong = async (file) => {
  try {
    const formData = new FormData();
    formData.append("fileVideo", file);

    const response = await axiosInstance.post("/file/upload/video", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Something went wrong during upload");
    }
  }
};
