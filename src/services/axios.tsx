import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_HOTEL_HONI_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const token = Cookies.get("token");
console.log({ token }, "😅");
const axiosAuthInstance = axios.create({
  baseURL: import.meta.env.VITE_HOTEL_HONI_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
export { axiosAuthInstance };
