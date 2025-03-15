import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import API from "./axios.ts";
import {
  ChatMessage,
  ChatMessagesResponse,
  ChatRequest,
  ChatRoom,
  ChatRoomsResponse,
} from "@/types/chat";
import { CHAT_KEY } from "@/constants/queryKey.ts";

export const useChatStream = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (requestBody: ChatRequest) => {
      const response = await API.post("/chat/stream", requestBody, {
        headers: { Accept: "text/event-stream" },
        responseType: "stream",
      });
      return response;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [CHAT_KEY.CHAT_MESSAGES, variables.roomId],
      });
    },
  });
};

export const useChatRooms = () => {
  return useQuery<ChatRoom[]>({
    queryKey: [CHAT_KEY.CAHT_ROOMS],
    queryFn: async () => {
      const response = await API.get<ChatRoomsResponse>("/chat/rooms");
      return response.data.rooms;
    },
  });
};

export const useChatMessages = (roomId: number) => {
  return useQuery<ChatMessage[]>({
    queryKey: [CHAT_KEY.CHAT_MESSAGES, roomId],
    queryFn: async () => {
      const response = await API.get<ChatMessagesResponse>(
        `/chat/messages/${roomId}`
      );
      return response.data.rooms;
    },
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
      queryClient.invalidateQueries({ queryKey: [CHAT_KEY.CAHT_ROOMS] });
    },
  });
};
