import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/spotify/v1",
});
// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
