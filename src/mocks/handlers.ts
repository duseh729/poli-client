import { http, HttpResponse } from "msw";
import {
  ChatMessage,
  ChatRoom,
  ChatRequest,
  ChatRoomsResponse,
  ChatMessagesResponse,
} from "@/types/chat";
import {
  SignUpRequest,
  SignUpResponse,
  LoginRequest,
  LoginResponse,
  UserExistenceResponse,
} from "@/types/user";

const getUsersFromStorage = (): {
  [key: string]: { userId: string; userName: string };
} => {
  const users = localStorage.getItem("registeredUsers");
  return users ? JSON.parse(users) : {};
};

const saveUsersToStorage = (users: {
  [key: string]: { userId: string; userName: string };
}) => {
  localStorage.setItem("registeredUsers", JSON.stringify(users));
};

const getChatRoomsFromStorage = (): ChatRoom[] => {
  const rooms = localStorage.getItem("chatRooms");
  return rooms ? JSON.parse(rooms) : [];
};

const getChatMessagesFromStorage = (roomId: number): ChatMessage[] => {
  const messages = localStorage.getItem(`chatMessages_${roomId}`);
  return messages ? JSON.parse(messages) : [];
};

const saveChatMessagesToStorage = (roomId: number, messages: ChatMessage[]) => {
  localStorage.setItem(`chatMessages_${roomId}`, JSON.stringify(messages));
};

export const handlers = [
  http.post<never, SignUpRequest, any, "api/signup">(
    "api/signup",
    async ({ request }) => {
      const { userId, userName } = await request.json();

      const registeredUsers = getUsersFromStorage();

      if (registeredUsers[userId]) {
        return new HttpResponse(
          JSON.stringify({
            errorMessage: "이미 사용 중인 아이디입니다.",
          }),
          { status: 409 }
        );
      }

      registeredUsers[userId] = { userId, userName };
      saveUsersToStorage(registeredUsers);

      const response: SignUpResponse = {
        message: "성공적으로 회원가입되었습니다.",
        userId,
        userName,
      };

      return new HttpResponse(JSON.stringify(response), { status: 201 });
    }
  ),

  http.post<never, LoginRequest, any, "api/login">(
    "api/login",
    async ({ request }) => {
      const { userId } = await request.json();

      const registeredUsers = getUsersFromStorage();

      if (registeredUsers[userId]) {
        const user = registeredUsers[userId];
        const response: LoginResponse = {
          deleted: false,
          deletedAt: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          userId: user.userId,
          userName: user.userName,
        };
        return new HttpResponse(JSON.stringify(response), { status: 200 });
      } else {
        return new HttpResponse(
          JSON.stringify({
            errorMessage: "아이디를 다시 확인해주세요.",
          }),
          { status: 404 }
        );
      }
    }
  ),

  http.post<never, ChatRequest, any, "chat/stream">(
    "chat/stream",
    async ({ request }) => {
      const { message, roomId } = await request.json();
      if (roomId === null) {
        return new HttpResponse(JSON.stringify({ error: "Invalid roomId" }), {
          status: 400,
        });
      }
      const messages = getChatMessagesFromStorage(roomId);
      const newMessage: ChatMessage = {
        roomId,
        message,
        createdAt: new Date().toISOString(),
        role: "USER",
      };
      messages.push(newMessage);

      const aiMessage: ChatMessage = {
        roomId,
        message: `AI response to: ${message}`,
        createdAt: new Date().toISOString(),
        role: "AI",
      };
      messages.push(aiMessage);

      saveChatMessagesToStorage(roomId, messages);

      return new HttpResponse(JSON.stringify({ success: true }), {
        status: 200,
      });
    }
  ),

  http.get<never, never, any, "chat/rooms">("chat/rooms", () => {
    const rooms = getChatRoomsFromStorage();
    const response: ChatRoomsResponse = {
      uuid: "mock-uuid",
      rooms,
    };
    return new HttpResponse(JSON.stringify(response), { status: 200 });
  }),

  http.get<{ roomId: string }, never, any, "chat/messages/:roomId">(
    "chat/messages/:roomId",
    ({ params }) => {
      const roomId = parseInt(params.roomId);
      const messages = getChatMessagesFromStorage(roomId);
      const response: ChatMessagesResponse = {
        uuid: "mock-uuid",
        rooms: messages,
      };
      return new HttpResponse(JSON.stringify(response), { status: 200 });
    }
  ),

  http.post<never, SignUpRequest, any, "user/sign-up">(
    "user/sign-up",
    async ({ request }) => {
      const { userId, userName } = await request.json();
      const registeredUsers = getUsersFromStorage();

      if (registeredUsers[userId]) {
        return new HttpResponse(
          JSON.stringify({
            errorMessage: "이미 사용 중인 아이디입니다.",
          }),
          { status: 409 }
        );
      }

      registeredUsers[userId] = { userId, userName };
      saveUsersToStorage(registeredUsers);

      const response: SignUpResponse = {
        message: "성공적으로 회원가입되었습니다.",
        userId,
        userName,
      };

      return new HttpResponse(JSON.stringify(response), { status: 201 });
    }
  ),

  http.get<{ userId: string }, never, any, "user">("user", ({ request }) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get("id") as string;
    const registeredUsers = getUsersFromStorage();

    if (registeredUsers[userId]) {
      const user = registeredUsers[userId];
      const response: LoginResponse = {
        deleted: false,
        deletedAt: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: user.userId,
        userName: user.userName,
      };
      return new HttpResponse(JSON.stringify(response), { status: 200 });
    } else {
      return new HttpResponse(
        JSON.stringify({
          errorMessage: "아이디를 다시 확인해주세요.",
        }),
        { status: 404 }
      );
    }
  }),

  http.get<never, never, any, "user/id/exists">(
    "user/id/exists",
    ({ request }) => {
      const url = new URL(request.url);
      const userId = url.searchParams.get("userId");
      const registeredUsers = getUsersFromStorage();

      const response: UserExistenceResponse = {
        userId: userId || "",
        exists: !!registeredUsers[userId as string],
      };

      return new HttpResponse(JSON.stringify(response), { status: 200 });
    }
  ),
];
