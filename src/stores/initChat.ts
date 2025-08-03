import { ChatMessage } from "@/types/chat";
import create from "zustand";

interface InitChatState {
  initChatId: number | null;
  initMessages: ChatMessage[]; // 타입 정의에 맞게 수정
  setInitChat: (id: number, messages: ChatMessage[]) => void;
  clearInitChat: () => void;
}

export const useInitChatStore = create<InitChatState>((set) => ({
  initChatId: null,
  initMessages: [],
  setInitChat: (id, messages) => set({ initChatId: id, initMessages: messages }),
  clearInitChat: () => set({ initChatId: null, initMessages: [] }),
}));