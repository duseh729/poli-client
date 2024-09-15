import API from "./axios.ts";
import {
  SignUpRequest,
  SignUpResponse,
  UserExistenceResponse,
  LoginResponse,
  LoginRequest,
} from "@/types/user";


export const signUp = async (data: SignUpRequest): Promise<SignUpResponse> => {
  const response = await API.post<SignUpResponse>("/user/sign-up", data);
  return response.data;
};

export const logIn = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await API.get<LoginResponse>(`/user?id=${data.userId}`);
  return response.data;
};

export const checkUserExistence = async (
  userId: string
): Promise<UserExistenceResponse> => {
  const response = await API.get<UserExistenceResponse>(
    `/user/id/exists?userId=${userId}`
  );
  return response.data;
};