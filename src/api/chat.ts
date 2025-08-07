import { CHAT_KEY } from "@/constants/queryKey.ts";
import type {
  ChatMessage,
  ChatMessagesResponse,
  ChatRequest,
  ChatRoom,
  ChatRoomsResponse,
  MutationVariables,
} from "@/types/chat";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import API from "./axios.ts";
import { useChatRoomsStore } from "@/stores/chatRoom.ts";
import { useUserStore } from "@/stores/user.ts";

export const useChatStream = () => {
  const userId = useUserStore.getState().userId;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ requestBody, onMessage }: MutationVariables) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}chat/stream`,
        {
          method: "POST",
          headers: {
            Accept: "text/event-stream",
            "Content-Type": "application/json",
            "user-id": userId ?? "",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";

      let hasReceivedMessage = false;
      
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        buffer += chunk;

        const events = buffer.split("\n\n");
        for (let i = 0; i < events.length - 1; i++) {
          const line = events[i].trim();
          if (!line.startsWith("data:")) continue;

          const jsonString = line.replace("data:", "").trim();

          try {
            const data = JSON.parse(jsonString);
            if (data.message && onMessage) {
              hasReceivedMessage = true;
              onMessage(data.message); // 👈 콜백으로 전달
            } else if (
              hasReceivedMessage &&
              data.roomId &&
              !data.message &&
              onMessage
            ) {
              onMessage(null); // 첫 message 이후에만 마지막 신호로 처리
            }
          } catch (err) {
            console.error("파싱 실패", err);
          }
        }

        buffer = events[events.length - 1];
      }

      return true;
    },

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [CHAT_KEY.CHAT_MESSAGES, variables.requestBody.roomId],
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
      setTimeout(() => {
        // 재연결 로직 (예: mutate 다시 호출)
      }, 3000);
    },
  });
};

export const useChatRooms = () => {
  const setChatRooms = useChatRoomsStore((state) => state.setChatRooms);

  return useQuery<ChatRoom[]>({
    queryKey: [CHAT_KEY.CAHT_ROOMS],
    queryFn: async () => {
      const response = await API.get<ChatRoomsResponse>("/chat/rooms");
      const rooms = response.data.rooms;
      setChatRooms(rooms);
      return rooms;
    },
    refetchOnWindowFocus: false, // 필요 시 true로
  });
};

export const fetchChatMessages = async (roomId: number) => {
  const response = await API.get<ChatMessagesResponse>(
    `/chat/messages/${roomId}`
  );
  return response.data.rooms;
};

export const useChatMessages = (roomId: number) => {
  return useQuery<ChatMessage[]>({
    queryKey: [CHAT_KEY.CHAT_MESSAGES, roomId],
    queryFn: () => fetchChatMessages(roomId),
  });
};

export const useRemoveChatRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (roomId: number) => {
      const response = await API.delete<{ uuid: string }>(
        `/chat/rooms/${roomId}`
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("선택한 채팅방이 삭제되었습니다", {
        duration: 2000,
        style: {
          background: "#28a745",
          color: "#fff",
          fontSize: "16px",
        },
      });
      queryClient.invalidateQueries({ queryKey: [CHAT_KEY.CAHT_ROOMS] });
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

export const useChatRoomProgress = (roomId: number) => {
  return useQuery({
    queryKey: [CHAT_KEY.CHAT_ROOM_PROGRESS, roomId],
    queryFn: async () => {
      const response = await API.get<{
        fulfilled: boolean;
        percentage: number;
      }>(`/chat/progress/${roomId}`);
      return response.data;
    },
  });
};
