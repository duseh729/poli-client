import axios from "axios";
import { useUserStore } from "@/stores/user";
import { useLoadingStore } from "@/stores";
// Axios 인스턴스 생성
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터
API.interceptors.request.use(
  (config) => {
    const skipLoading = (config as any).meta?.skipLoading !== true;

    if (skipLoading) {
      useLoadingStore.getState().setLoading(true);
    }

    // user-id 헤더 처리
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

// 응답 인터셉터
API.interceptors.response.use(
  (response) => {
    const skipLoading = (response.config as any).meta?.skipLoading !== true;
    if (skipLoading) {
      useLoadingStore.getState().setLoading(false);
    }
    return response;
  },
  (error) => {
    const skipLoading = (error.config as any).meta?.skipLoading !== true;
    if (skipLoading) {
      useLoadingStore.getState().setLoading(false);
    }
    return Promise.reject(error);
  }
);

export default API;
