import ChatPage from "@/pages/ChatPage";
import HomePage from "@/pages/HomePage";
import InitChatPage from "@/pages/InitChatPage";
import LoginPage from "@/pages/LoginPage";
import MainPage from "@/pages/MainPage";
import PetitionPage from "@/pages/PetitionPage";
import SignUpPage from "@/pages/SignUpPage";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",

  MAIN: "/main",
  CHAT_ID: "/chat/:id",
  INIT_CHAT: "/init-chat",
  PETITION: "/petition"
} as const;

export const PUBLIC_ROUTES = [
  { path: ROUTES.HOME, element: <HomePage /> },
  { path: ROUTES.LOGIN, element: <LoginPage /> },
  { path: ROUTES.SIGNUP, element: <SignUpPage /> },
] as const;

export const PRIVATE_ROUTES = [
  { path: ROUTES.MAIN, element: <MainPage /> },
  { path: ROUTES.CHAT_ID, element: <ChatPage /> },
  { path: ROUTES.INIT_CHAT, element: <InitChatPage /> },
  { path: ROUTES.PETITION, element: <PetitionPage /> },
] as const;
