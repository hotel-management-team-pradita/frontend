import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5173/api",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

export default axiosInstance;
