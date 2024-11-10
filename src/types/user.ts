import * as Yup from "yup";
import { loginSchema, signUpSchema } from "@/schemas/user";

export type SignUpRequest = Yup.InferType<typeof signUpSchema>;
export type LoginRequest = Yup.InferType<typeof loginSchema>;

export type SignUpResponse = {
  message: string;
  userId: string;
  userName: string;
};

export type LoginResponse = {
  deleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
  userName: string;
};

export type UserExistenceResponse = {
  userId: string;
  exists: boolean;
};

export type SignUpData = {
  userId: string;
  userName: string;
};

export type LoginData = {
  userId: string;
};

export type User = {
  userId: string;
  userName: string;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  deletedAt: string | null;
};

export type UserStore = {
  userId: string | null;
  userName: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  deleted: boolean | null;
  deletedAt: string | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};
