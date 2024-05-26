import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "localhost:5173/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
