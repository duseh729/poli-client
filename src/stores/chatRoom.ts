import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {  ChatRoomsStore } from "@/types/chat";


export const useChatRoomsStore = create<ChatRoomsStore>()(
  persist(
    (set) => ({
      chatRooms: [],
      setChatRooms: (chatRooms) => set({ chatRooms }),
      clearChatRooms: () => set({ chatRooms: [] }),
    }),
    {
      name: "chat-rooms-storage",
      storage: createJSONStorage(() => localStorage), 
    }
  )
);