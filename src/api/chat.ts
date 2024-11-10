import API from "./axios.ts";
import {
  ChatMessage,
  ChatMessagesResponse,
  ChatRequest,
  ChatRoom,
  ChatRoomsResponse,
} from "@/types/chat";

export const chatStream = async (requestBody: ChatRequest) => {
  const response = await API.post("/chat/stream", requestBody, {
    headers: {
      Accept: "text/event-stream",
    },
    responseType: "stream",
  });
  return response;
};

export const getChatRooms = async (): Promise<ChatRoom[]> => {
  const response = await API.get<ChatRoomsResponse>("/chat/rooms");
  return response.data.rooms;
};

export const getChatMessages = async (
  roomId: number
): Promise<ChatMessage[]> => {
  const response = await API.get<ChatMessagesResponse>(
    `/chat/messages/${roomId}`
  );
  return response.data.rooms;
};

export const removeChatRoom = async (
  roomId: number
): Promise<{ uuid: string }> => {
  const response = await API.delete<{ uuid: string }>(`/chat/rooms/${roomId}`);
  return response.data;
};
