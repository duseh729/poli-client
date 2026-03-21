import type { ChatRoom, ChatMessage } from "@/types/chat";

// ── 시드 채팅방 ──
const SEED_ROOMS: ChatRoom[] = [
    {
        id: 1,
        roomName: "인터넷 사기 상담",
        initMessage:
            "중고거래 사이트에서 물건을 구매했는데 판매자가 물건을 보내지 않고 연락이 두절되었습니다.",
    },
    {
        id: 2,
        roomName: "사이버 명예훼손 상담",
        initMessage:
            "온라인 커뮤니티에서 누군가가 저에 대한 허위 사실을 유포하고 있습니다.",
    },
];

// ── 시드 메시지 ──
const SEED_MESSAGES: Record<number, ChatMessage[]> = {
    1: [
        {
            roomId: 1,
            role: "USER",
            message:
                "중고거래 사이트에서 물건을 구매했는데 판매자가 물건을 보내지 않고 연락이 두절되었습니다.",
            createdAt: "2026-02-20T10:00:00.000Z",
        },
        {
            roomId: 1,
            role: "AI",
            message:
                "안녕하세요, 사이버 범죄 피해 상담을 도와드리겠습니다.\n\n말씀하신 내용을 정리하면, 중고거래 사이트에서 물건 대금을 지불했으나 판매자가 물건을 보내지 않고 연락이 두절된 상황이시군요.\n\n이 경우 **인터넷 사기**에 해당할 수 있습니다. 몇 가지 사항을 확인해 드릴게요:\n\n1. 거래한 사이트 이름이 어떻게 되나요?\n2. 판매자의 아이디나 연락처를 알고 계신가요?\n3. 송금 내역이나 대화 기록 등 증거자료가 있으신가요?",
            createdAt: "2026-02-20T10:00:05.000Z",
        },
        {
            roomId: 1,
            role: "USER",
            message:
                "번개장터에서 거래했고, 판매자 아이디는 'seller123'이에요. 카카오톡 대화 캡처와 송금 내역 캡처가 있습니다.",
            createdAt: "2026-02-20T10:01:00.000Z",
        },
        {
            roomId: 1,
            role: "AI",
            message:
                "증거 자료를 잘 보관하고 계시네요! 이제 진정서 작성을 도와드리겠습니다.\n\n다음 정보들을 추가로 알려주시면 진정서를 더 정확하게 작성할 수 있습니다:\n\n- **피해 금액**: 얼마를 송금하셨나요?\n- **거래 날짜**: 언제 거래하셨나요?\n- **피해자(본인) 연락처**: 진정서에 기재할 연락처\n\n이 정보들을 알려주시면 바로 진정서 초안을 작성해 드리겠습니다.",
            createdAt: "2026-02-20T10:01:10.000Z",
        },
        {
            roomId: 1,
            role: "USER",
            message: "15만원을 2월 15일에 송금했어요. 제 연락처는 010-1234-5678입니다.",
            createdAt: "2026-02-20T10:02:00.000Z",
        },
        {
            roomId: 1,
            role: "AI",
            message:
                "감사합니다. 정리해 드리겠습니다.\n\n**진정서 요약:**\n- 범죄유형: 사이버 범죄 > 인터넷 사기\n- 피해 사이트: 번개장터\n- 피해 금액: 150,000원\n- 거래 일자: 2026년 2월 15일\n- 증거자료: 카카오톡 대화 캡처, 송금 내역 캡처\n\n진정서를 작성할 준비가 되셨으면 말씀해 주세요!",
            createdAt: "2026-02-20T10:02:15.000Z",
        },
    ],
    2: [
        {
            roomId: 2,
            role: "USER",
            message:
                "온라인 커뮤니티에서 누군가가 저에 대한 허위 사실을 유포하고 있습니다.",
            createdAt: "2026-02-21T14:00:00.000Z",
        },
        {
            roomId: 2,
            role: "AI",
            message:
                "안녕하세요, 사이버 명예훼손 관련 상담을 도와드리겠습니다.\n\n온라인에서 허위 사실이 유포되고 있는 상황이시군요. 이 경우 **정보통신망법상 명예훼손** 또는 **형법상 명예훼손**에 해당할 수 있습니다.\n\n몇 가지 확인해야 할 사항이 있습니다:\n\n1. 어떤 커뮤니티에서 발생했나요?\n2. 어떤 내용의 글이 게시되었나요?\n3. 게시물의 URL이나 캡처 화면이 있으신가요?\n4. 작성자의 아이디나 정보를 알고 계신가요?",
            createdAt: "2026-02-21T14:00:08.000Z",
        },
        {
            roomId: 2,
            role: "USER",
            message:
                "디시인사이드에서요. 제 실명과 직장을 언급하면서 제가 횡령을 했다는 거짓 글을 올렸어요. 캡처는 해뒀습니다.",
            createdAt: "2026-02-21T14:01:00.000Z",
        },
        {
            roomId: 2,
            role: "AI",
            message:
                "실명과 직장 정보까지 언급하며 허위 사실을 유포한 것은 매우 심각한 **사이버 명예훼손**에 해당합니다.\n\n**법적 근거:**\n- 정보통신망법 제70조 (명예훼손): 허위 사실 유포 시 7년 이하 징역, 10년 이하 자격정지, 5천만원 이하 벌금\n\n캡처 화면을 잘 보관해 주세요. 추가로 다음 증거도 확보하시면 좋습니다:\n- 게시물 URL\n- 게시 일시\n- 가능하다면 작성자 닉네임/아이디\n\n진정서 작성을 도와드릴까요?",
            createdAt: "2026-02-21T14:01:12.000Z",
        },
    ],
};

// ── 시드 진정서 데이터 ──
const SEED_PETITIONS: Record<number, object> = {
    1: {
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
            "2026년 2월 15일 번개장터에서 'seller123' 아이디의 판매자에게 중고 물품을 15만원에 구매하고 계좌이체로 대금을 지불하였으나, 이후 판매자가 물건을 발송하지 않고 연락이 두절되었습니다. 카카오톡 대화 내역과 계좌이체 내역을 증거로 보유하고 있습니다.",
        evidences: [
            { fileName: "카카오톡_대화.png", fileUrl: "/mock/evidence1.png" },
            { fileName: "송금내역.png", fileUrl: "/mock/evidence2.png" },
        ],
        complaintDate: "2026-02-24",
    },
};

/**
 * Mock 모드 시작 시 localStorage에 샘플 데이터를 주입합니다.
 * 이미 데이터가 있으면 덮어쓰지 않습니다.
 */
export function seedMockData() {
    // 유저 — 항상 최신 계정으로 덮어쓰기
    localStorage.setItem(
        "registeredUsers",
        JSON.stringify({
            admin: { userId: "admin", userName: "홍길동" },
        })
    );

    // 채팅방
    if (!localStorage.getItem("chatRooms")) {
        localStorage.setItem("chatRooms", JSON.stringify(SEED_ROOMS));
    }

    // 채팅 메시지
    for (const [roomId, messages] of Object.entries(SEED_MESSAGES)) {
        const key = `chatMessages_${roomId}`;
        if (!localStorage.getItem(key)) {
            localStorage.setItem(key, JSON.stringify(messages));
        }
    }

    // 진정서
    for (const [roomId, petition] of Object.entries(SEED_PETITIONS)) {
        const key = `petition_${roomId}`;
        if (!localStorage.getItem(key)) {
            localStorage.setItem(key, JSON.stringify(petition));
        }
    }

    console.log("[MSW] Seed data initialized");
}
