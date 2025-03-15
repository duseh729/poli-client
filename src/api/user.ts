import { useMutation } from "@tanstack/react-query";
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
  });
};

export const useLogIn = () => {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: async (data) => {
      const response = await API.get<LoginResponse>(`/user?id=${data.userId}`);
      return response.data;
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
