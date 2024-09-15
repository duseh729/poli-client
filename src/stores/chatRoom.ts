import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ChatRoom } from "@/types/chat";

type ChatRoomsStore = {
  chatRooms: ChatRoom[];
  setChatRooms: (chatRooms: ChatRoom[]) => void;
  clearChatRooms: () => void;
};

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