import axios from "axios";
import { useUserStore } from "@/stores/user";
import { useLoadingStore } from "@/stores";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  (config) => {
    useLoadingStore.getState().setLoading(true);

    if (config.url?.includes("/user")) {
      delete config.headers["user-id"];
    } else {
      const userId = useUserStore.getState().userId;
      if (userId) {
        config.headers["user-id"] = userId;
      }
    }

    return config;
  },
  (error) => {
    useLoadingStore.getState().setLoading(false);
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    useLoadingStore.getState().setLoading(false);
    return response;
  },
  (error) => {
    useLoadingStore.getState().setLoading(false);
    return Promise.reject(error);
  }
);

export default API;
