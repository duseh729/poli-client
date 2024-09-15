import axios from "axios";
import { useUserStore } from "@/stores/user";


const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  (config) => {
    if (config.url?.includes("/user")) {
      delete config.headers["user-id"];
    }
    else{
      const userId = useUserStore.getState().userId;
      if (userId) {
        config.headers["user-id"] = userId;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
