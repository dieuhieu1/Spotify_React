import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

export const useUploadStore = create((set) => ({
  isUploading: false,
  files: null,
  uploadResult: null,

  // Setters for uploaded state
  setIsUploaded: (status) => set({ isUploaded: status }),
  setIsImageUploaded: (status) => set({ isImageUploaded: status }),
  fetchAllFiles: async () => {
    try {
      const response = await axiosInstance.get("/file/all");
      if (response) {
        set({ files: response.data });
      }
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Something went wrong during upload");
      }
    }
  },
  // Upload song logic
  uploadFileSong: async (file) => {
    try {
      const formData = new FormData();
      formData.append("fileVideo", file);
      console.log(file);
      set({ isUploading: true });
      const response = await axiosInstance.post(
        "/file/upload/video",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      set({ isUploading: false });

      return response.data;
    } catch (error) {
      console.log(error);
      if (error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Something went wrong during upload");
      }
    }
  },

  // Delete song file logic
  deleteFile: async (id) => {
    try {
      set({ isUploading: true });
      const response = await axiosInstance.delete(`/file/delete?id=${id}`);
      set({ isUploading: false });

      return response.data;
    } catch (error) {
      console.log(error);
      if (error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Something went wrong during upload");
      }
    }
  },

  // Upload image logic
  uploadFileImage: async (file) => {
    try {
      const formData = new FormData();
      formData.append("fileImage", file);
      console.log(file);
      set({ isUploading: true });
      const response = await axiosInstance.post(
        "/file/upload/image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      set({ isUploading: false });
      return response.data;
    } catch (error) {
      console.log(error);
      if (error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Something went wrong during upload");
      }
    }
  },
}));
