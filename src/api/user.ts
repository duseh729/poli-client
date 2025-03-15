import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import API from "./axios.ts";
import {
  SignUpRequest,
  SignUpResponse,
  UserExistenceResponse,
  LoginResponse,
  LoginRequest,
} from "@/types/user";

export const useSignUp = () => {
  return useMutation<SignUpResponse, Error, SignUpRequest>({
    mutationFn: async (data) => {
      const copy = { ...data, email: "123@naver.com" };
      const response = await API.post<SignUpResponse>("/user/sign-up", copy);
      return response.data;
    },
    onSuccess: () => {
      toast.success("회원가입이 완료되었습니다", {
        duration: 2000,
        style: {
          background: "#28a745",
          color: "#fff",
          fontSize: "16px",
        },
      });
    },
    onError: (error: Error) => {
      toast.error(error.message, {
        duration: 2000,
        style: {
          background: "#dc3545",
          color: "#fff",
          fontSize: "16px",
        },
      });
    },
  });
};

export const useLogIn = () => {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: async (data) => {
      const response = await API.get<LoginResponse>(`/user?id=${data.userId}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("로그인에 성공했습니다", {
        duration: 2000,
        style: {
          background: "#28a745",
          color: "#fff",
          fontSize: "16px",
        },
      });
    },
    onError: (error: Error) => {
      toast.error(error.message, {
        duration: 2000,
        style: {
          background: "#dc3545",
          color: "#fff",
          fontSize: "16px",
        },
      });
    },
  });
};

export const useCheckUserExistence = () => {
  return useMutation<UserExistenceResponse, Error, string>({
    mutationFn: async (userId) => {
      const response = await API.post<UserExistenceResponse>(
        `/user/id/exists?userId=${userId}`
      );
      return response.data;
    },
  });
};
