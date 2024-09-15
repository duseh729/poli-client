export type ChatRole = "USER" | "AI";

export type ChatMessage = {
  roomId?: number | null;
  role: ChatRole;
  message: string | null;
  createdAt: string;
};
export type ChatRoom = {
  id: number;
  roomName: string;
  initMessage: string;
};

export type ChatRequest = {
  initMessage: string;
  roomId: number | null;
  message: string;
};

export type ChatResponse = {
  roomId: number;
  message: string;
};

export type ChatRoomsResponse = {
  uuid: string;
  rooms: ChatRoom[];
};

export type ChatMessagesResponse = {
  uuid: string;
  rooms: ChatMessage[];
};


export type ChatRoomsStore = {
  chatRooms: ChatRoom[];
  setChatRooms: (chatRooms: ChatRoom[]) => void;
  clearChatRooms: () => void;
};