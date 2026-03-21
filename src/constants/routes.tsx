import { lazy } from "react";

// ✨ 1. HomePage는 '즉시 로딩' 유지 (LCP 속도 방어)
import HomePage from "@/pages/HomePage";

// ✨ 2. 나머지 페이지는 '지연 로딩'으로 변경 (클릭할 때 다운로드)
const ChatPage = lazy(() => import("@/pages/ChatPage"));
const InitChatPage = lazy(() => import("@/pages/InitChatPage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const MainPage = lazy(() => import("@/pages/MainPage"));
const PetitionPage = lazy(() => import("@/pages/PetitionPage"));
const SignUpPage = lazy(() => import("@/pages/SignUpPage"));

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",

  MAIN: "/main",
  CHAT_ID: "/chat/:id",
  INIT_CHAT: "/init-chat",
  PETITION: "/petition/:id"
} as const;

export const PUBLIC_ROUTES = [
  { path: ROUTES.HOME, element: <HomePage /> }, // 즉시 뜸
  { path: ROUTES.LOGIN, element: <LoginPage /> },
  { path: ROUTES.SIGNUP, element: <SignUpPage /> }, 
] as const;

export const PRIVATE_ROUTES = [
  { path: ROUTES.MAIN, element: <MainPage /> },
  { path: ROUTES.CHAT_ID, element: <ChatPage /> },
  { path: ROUTES.INIT_CHAT, element: <InitChatPage /> },
  { path: ROUTES.PETITION, element: <PetitionPage /> },
] as const;