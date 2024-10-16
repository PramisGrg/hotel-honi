import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const token = Cookies.get("token");

const axiosAuthInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    // "Content-Type": "application/json",
    "Content-Type": "multipart/form-data",
  },
});

export default axiosInstance;
export { axiosAuthInstance };
