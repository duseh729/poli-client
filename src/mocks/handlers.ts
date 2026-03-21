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

// ── Base URL (실제 API와 동일한 URL을 매칭하기 위해 필요) ──
const BASE = "https://backend.poli.ai.kr";

// ── localStorage 유틸 ──

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

const saveChatRoomsToStorage = (rooms: ChatRoom[]) => {
  localStorage.setItem("chatRooms", JSON.stringify(rooms));
};

const getChatMessagesFromStorage = (roomId: number): ChatMessage[] => {
  const messages = localStorage.getItem(`chatMessages_${roomId}`);
  return messages ? JSON.parse(messages) : [];
};

const saveChatMessagesToStorage = (roomId: number, messages: ChatMessage[]) => {
  localStorage.setItem(`chatMessages_${roomId}`, JSON.stringify(messages));
};

const getPetitionFromStorage = (roomId: number): object | null => {
  const petition = localStorage.getItem(`petition_${roomId}`);
  return petition ? JSON.parse(petition) : null;
};

const savePetitionToStorage = (roomId: number, petition: object) => {
  localStorage.setItem(`petition_${roomId}`, JSON.stringify(petition));
};

// ── Mock 핸들러 ──

export const handlers = [
  // ────────────────────────────
  //  User 관련
  // ────────────────────────────

  http.post(`${BASE}/api/signup`, async ({ request }) => {
    const { userId, userName } = (await request.json()) as SignUpRequest;

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
  }),

  http.post(`${BASE}/api/login`, async ({ request }) => {
    const { userId } = (await request.json()) as LoginRequest;

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

  http.post(`${BASE}/user/sign-up`, async ({ request }) => {
    const { userId, userName } = (await request.json()) as SignUpRequest;
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
  }),

  http.get(`${BASE}/user`, ({ request }) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get("id") as string;
    const registeredUsers = getUsersFromStorage();

    // admin 폴백: localStorage에 없으면 자동 등록
    if (!registeredUsers[userId] && userId === "admin") {
      registeredUsers["admin"] = { userId: "admin", userName: "홍길동" };
      localStorage.setItem(
        "registeredUsers",
        JSON.stringify(registeredUsers)
      );
    }

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

  http.get(`${BASE}/user/id/exists`, ({ request }) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");
    const registeredUsers = getUsersFromStorage();

    const response: UserExistenceResponse = {
      userId: userId || "",
      exists: !!registeredUsers[userId as string],
    };

    return new HttpResponse(JSON.stringify(response), { status: 200 });
  }),

  http.post(`${BASE}/user/id/exists`, ({ request }) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");
    const registeredUsers = getUsersFromStorage();

    const response: UserExistenceResponse = {
      userId: userId || "",
      exists: !!registeredUsers[userId as string],
    };

    return new HttpResponse(JSON.stringify(response), { status: 200 });
  }),

  // ────────────────────────────
  //  Chat 관련
  // ────────────────────────────

  // 채팅방 목록 조회
  http.get(`${BASE}/chat/rooms`, () => {
    const rooms = getChatRoomsFromStorage();
    const response: ChatRoomsResponse = {
      uuid: "mock-uuid",
      rooms,
    };
    return new HttpResponse(JSON.stringify(response), { status: 200 });
  }),

  // 채팅 메시지 조회
  http.get(`${BASE}/chat/messages/:roomId`, ({ params }) => {
    const roomId = parseInt(params.roomId as string);
    const messages = getChatMessagesFromStorage(roomId);
    const response: ChatMessagesResponse = {
      uuid: "mock-uuid",
      rooms: messages,
    };
    return new HttpResponse(JSON.stringify(response), { status: 200 });
  }),

  // ★ chat/stream — SSE 스트림 응답
  http.post(`${BASE}/chat/stream`, async ({ request }) => {
    // FormData에서 request 필드 파싱
    const formData = await request.formData();
    const requestField = formData.get("request");
    let chatRequest: ChatRequest | null = null;

    if (requestField && typeof requestField === "string") {
      try {
        chatRequest = JSON.parse(requestField);
      } catch {
        // ignore
      }
    }

    const message = chatRequest?.message ?? "안녕하세요";
    const initMessage = chatRequest?.initMessage ?? "";
    let roomId = chatRequest?.roomId ?? null;

    // 새 채팅방이면 생성
    if (roomId === null) {
      const rooms = getChatRoomsFromStorage();
      const newId =
        rooms.length > 0 ? Math.max(...rooms.map((r) => r.id)) + 1 : 1;

      // initMessage가 JSON이면 파싱하여 채팅방 이름 추출
      let roomName = "새 채팅방";
      try {
        const parsed = JSON.parse(initMessage);
        // 상황 설명 등 의미 있는 필드에서 이름 추출
        roomName =
          parsed.situationDescription ||
          parsed.message ||
          message.slice(0, 30) ||
          "새 채팅방";
      } catch {
        roomName = message.slice(0, 30) || "새 채팅방";
      }

      const newRoom: ChatRoom = {
        id: newId,
        roomName,
        initMessage: initMessage || message,
      };
      rooms.push(newRoom);
      saveChatRoomsToStorage(rooms);
      roomId = newId;
    }

    // 메시지 저장
    const messages = getChatMessagesFromStorage(roomId);
    messages.push({
      roomId,
      role: "USER",
      message,
      createdAt: new Date().toISOString(),
    });

    // AI 응답 생성 — 메시지 내용에 따라 분기
    let aiResponse: string;
    const isInitialChat = chatRequest?.roomId === null;
    const isPetitionRequest = message.includes("진정서");

    if (isPetitionRequest) {
      // "진정서를 작성해줘" 등 진정서 관련 요청
      aiResponse =
        "네, 지금까지 상담 내용을 바탕으로 진정서를 작성해 드리겠습니다.\n\n" +
        "**진정서 작성이 완료되었습니다.**\n\n" +
        "아래 내용을 확인해 주세요:\n\n" +
        "- **진정인**: 홍길동\n" +
        "- **피진정인**: 판매자(성명불상)\n" +
        "- **범죄유형**: 사이버 범죄 > 인터넷 사기\n" +
        "- **피해 사이트**: 번개장터\n" +
        "- **진정죄명**: 사기죄\n" +
        "- **처벌의사**: 처벌을 원합니다\n\n" +
        "아래 **진정서 확인하기** 버튼을 눌러 상세 내용을 확인하고 수정할 수 있습니다.";

      // 진정서 mock 데이터도 저장
      savePetitionToStorage(roomId, {
        complainant: {
          name: "홍길동",
          address: "서울특별시 강남구 테헤란로 123",
          contact: "010-1234-5678",
        },
        respondent: {
          name: "판매자(성명불상)",
          contact: "번개장터 아이디: seller123",
          specialNotes: "번개장터에서 활동 중인 판매자",
        },
        crimeType: "사이버 범죄",
        crimeDetail: "인터넷 사기",
        siteName: "번개장터",
        siteUrl: "https://m.bunjang.co.kr",
        crimeName: "사기죄",
        intentToPunish: "처벌을 원합니다",
        incidentDescription:
          "중고거래 사이트에서 물건 대금 150,000원을 송금하였으나 물건을 받지 못하고 판매자와 연락이 두절됨",
        incidentDetails:
          "번개장터에서 'seller123' 아이디의 판매자에게 중고 물품을 15만원에 구매하고 계좌이체로 대금을 지불하였으나, 이후 판매자가 물건을 발송하지 않고 연락이 두절되었습니다. 카카오톡 대화 내역과 계좌이체 내역을 증거로 보유하고 있습니다.",
        evidences: [
          { fileName: "카카오톡_대화.png", fileUrl: "/mock/evidence1.png" },
          { fileName: "송금내역.png", fileUrl: "/mock/evidence2.png" },
        ],
        complaintDate: new Date().toISOString().split("T")[0],
      });
    } else if (isInitialChat) {
      // 첫 채팅 — 사건 접수 안내
      aiResponse =
        "안녕하세요, 사이버 범죄 피해 상담 AI **폴리**입니다.\n\n" +
        "말씀해 주신 사건 내용을 접수했습니다. " +
        "피해 상황을 더 자세히 파악하기 위해 몇 가지 질문을 드리겠습니다.\n\n" +
        "1. **피해 금액**은 얼마인가요?\n" +
        "2. **거래 일시**를 정확히 기억하시나요?\n" +
        "3. 판매자의 **연락처나 계좌번호**를 알고 계신가요?\n\n" +
        "이 정보들을 알려주시면 더 정확한 법률 상담을 도와드릴 수 있습니다. " +
        "궁금한 점이 있으시면 아래 **추천 질문**을 활용해 보세요!";
    } else {
      // 일반 대화
      aiResponse =
        "말씀하신 내용을 확인했습니다.\n\n" +
        "해당 사안은 **형법 제347조(사기죄)** 에 해당할 수 있습니다. " +
        "사기죄는 10년 이하의 징역 또는 2천만원 이하의 벌금에 처해질 수 있습니다.\n\n" +
        "피해 구제를 위해 다음 절차를 안내드립니다:\n\n" +
        "1. **증거 확보**: 대화 내역, 송금 내역, 게시글 캡처 등을 보관하세요\n" +
        "2. **경찰 신고**: 사이버수사대에 피해 사실을 신고하세요\n" +
        "3. **진정서 작성**: 저에게 \"진정서를 작성해줘\"라고 말씀해 주시면 진정서를 자동으로 작성해 드립니다\n\n" +
        "추가로 궁금한 점이 있으시면 언제든 물어봐 주세요!";
    }

    messages.push({
      roomId,
      role: "AI",
      message: aiResponse,
      createdAt: new Date().toISOString(),
    });
    saveChatMessagesToStorage(roomId, messages);

    // SSE 스트림 형식으로 응답 생성 — 줄 단위로 청킹 (마크다운 보존)
    const encoder = new TextEncoder();
    const chunks = aiResponse.split(/(?<=\n)/).filter((c) => c.length > 0);

    const stream = new ReadableStream({
      async start(controller) {
        // 청크별로 SSE data 이벤트 전송
        for (const chunk of chunks) {
          const sseData = `data:${JSON.stringify({ message: chunk })}\n\n`;
          controller.enqueue(encoder.encode(sseData));
          // 타이핑 효과를 위한 딜레이
          await new Promise((resolve) => setTimeout(resolve, 50));
        }

        // 스트림 종료 이벤트 (roomId만 전송, message 없음)
        const endData = `data:${JSON.stringify({ roomId })}\n\n`;
        controller.enqueue(encoder.encode(endData));
        controller.close();
      },
    });

    return new HttpResponse(stream, {
      status: 200,
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  }),

  // ★ 채팅방 삭제
  http.delete(`${BASE}/chat/rooms/:roomId`, ({ params }) => {
    const roomId = parseInt(params.roomId as string);
    const rooms = getChatRoomsFromStorage();
    const filtered = rooms.filter((r) => r.id !== roomId);
    saveChatRoomsToStorage(filtered);

    // 관련 메시지도 삭제
    localStorage.removeItem(`chatMessages_${roomId}`);
    localStorage.removeItem(`petition_${roomId}`);

    return new HttpResponse(JSON.stringify({ uuid: "mock-uuid" }), {
      status: 200,
    });
  }),

  // ★ 채팅 진행률 조회
  http.get(`${BASE}/chat/progress/:roomId`, ({ params }) => {
    const roomId = parseInt(params.roomId as string);
    const messages = getChatMessagesFromStorage(roomId);
    // 메시지 수에 따라 진행률 계산 (최대 100%)
    const percentage = Math.min(messages.length * 10, 100);
    return new HttpResponse(
      JSON.stringify({
        fulfilled: percentage >= 100,
        percentage,
      }),
      { status: 200 }
    );
  }),

  // ────────────────────────────
  //  Petition (진정서) 관련
  // ────────────────────────────

  // ★ 진정서 조회
  http.get(`${BASE}/chat/petition/:roomId`, ({ params }) => {
    const roomId = parseInt(params.roomId as string);
    const petition = getPetitionFromStorage(roomId);

    if (petition) {
      return new HttpResponse(
        JSON.stringify({ petitionJson: JSON.stringify(petition) }),
        { status: 200 }
      );
    }

    // 진정서가 없으면 빈 기본값 반환
    return new HttpResponse(
      JSON.stringify({
        petitionJson: JSON.stringify({
          complainant: { name: "", address: "", contact: "" },
          respondent: { name: "", contact: "", specialNotes: "" },
          crimeType: "",
          crimeDetail: "",
          siteName: "",
          siteUrl: "",
          crimeName: "",
          intentToPunish: "",
          incidentDescription: "",
          incidentDetails: "",
          evidences: [],
          complaintDate: new Date().toISOString().split("T")[0],
        }),
      }),
      { status: 200 }
    );
  }),

  // ★ 진정서 저장/업데이트
  http.put(`${BASE}/chat/petition/:roomId`, async ({ params, request }) => {
    const roomId = parseInt(params.roomId as string);
    const body = (await request.json()) as any;

    // initPetition이 보내는 petitionRaw(원시 텍스트)인 경우,
    // chat/stream에서 이미 구조화 데이터를 저장했으면 덮어쓰지 않음
    if (body.petitionRaw && typeof body.petitionRaw === "string") {
      const existing = getPetitionFromStorage(roomId);
      if (existing && typeof existing === "object") {
        return new HttpResponse(
          JSON.stringify({ message: "저장되었습니다." }),
          { status: 200 }
        );
      }
    }

    const petitionData = body.petitionJson || body.petitionRaw || body;
    savePetitionToStorage(roomId, petitionData);

    return new HttpResponse(JSON.stringify({ message: "저장되었습니다." }), {
      status: 200,
    });
  }),
];
