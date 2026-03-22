import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useChatStream, useChatRooms, fetchChatMessages } from "@/api/chat";
import { ROUTES } from "@/constants/routes.tsx";
import { getDynamicPath } from "@/utils/routes.ts";
import * as S from "./style";
import InitChat from "@/components/InitChat/InitChat";
import { ChatRequest } from "@/types/chat";
import SEO from "@/components/Common/SEO";

interface InitChatState {
  requestBody: ChatRequest;
  files?: File[];
}

const BLOCK_SIZE = 2; // 한 번에 보여줄 글자 수
const TICK_DELAY_MS = 30; // 글자 붙이는 간격(ms)

const InitChatPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: chatRooms, refetch: refetchChatRooms } = useChatRooms();
  const { mutateAsync: chatStream, isPending } = useChatStream();

  const { requestBody, files } = (location.state as InitChatState) || {};

  // UI 상태
  const [botMessage, setBotMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(
    null
  );

  // 내부 제어용 Ref
  const bufferRef = useRef<string[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const streamEndedRef = useRef(false);

  // 버퍼에서 조금씩 글자 꺼내 화면에 붙이는 함수
  const startTypingLoop = () => {
    if (intervalRef.current) return; // 이미 실행 중이면 중복 실행 방지

    intervalRef.current = setInterval(() => {
      const buf = bufferRef.current;
      if (buf.length > 0) {
        const take = buf.splice(0, BLOCK_SIZE).join("");
        setBotMessage((prev) => prev + take);
      } else {
        // 버퍼가 비었을 때 스트림이 끝났다면 타이핑 종료
        if (streamEndedRef.current) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          setIsTyping(false);

          navigateToChatRoom();
        } else {
          // 아직 끝나지 않은 경우 → 잠시 멈췄다가 재개
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
        }
      }
    }, TICK_DELAY_MS);
  };

  const navigateToChatRoom = async () => {
    const updatedRooms = await refetchChatRooms();
    const newChatRoom = updatedRooms?.data?.find(
      (room) => !chatRooms?.some((existingRoom) => existingRoom.id === room.id)
    );

    if (newChatRoom) {
      await queryClient.prefetchQuery({
        queryKey: ["chatMessages", newChatRoom.id],
        queryFn: () => fetchChatMessages(newChatRoom.id),
      });

      const path = getDynamicPath(ROUTES.CHAT_ID, { id: newChatRoom.id });

      if (!isTyping) {
        navigate(path, { state: { isInit: true } });
      } else {
        setPendingNavigation(path);
      }
    } else {
      console.error("새로운 채팅방을 찾지 못했습니다.");
    }
  };

  // isTyping이 false가 되고 pendingNavigation이 있으면 네비게이션 실행
  useEffect(() => {
    if (!isTyping && pendingNavigation) {
      navigate(pendingNavigation, { state: { isInit: true } });
      setPendingNavigation(null);
    }
  }, [isTyping, pendingNavigation, navigate]);

  useEffect(() => {
    const startChat = async () => {
      if (!requestBody) {
        navigate("/main");
        return;
      }

      try {
        // 초기화
        setBotMessage("");
        bufferRef.current = [];
        streamEndedRef.current = false;
        setIsTyping(false);

        await chatStream({
          requestBody,
          files,
          config: {},
          onMessage: (chunk: string | null) => {
            if (chunk === null) {
              // 스트림 끝
              streamEndedRef.current = true;
              return;
            }

            if (chunk) {
              // 들어온 chunk를 글자 단위로 버퍼에 넣기
              bufferRef.current.push(...chunk.split(""));

              // 타이핑 시작
              if (!isTyping) {
                setIsTyping(true);
                startTypingLoop();
              } else if (!intervalRef.current) {
                startTypingLoop();
              }
            }
          },
        });

        // 스트림이 완전히 끝난 후 채팅방 이동 처리
      } catch (error) {
        console.error("AI 채팅 요청 실패:", error);
      }
    };

    startChat();

    // 컴포넌트 언마운트 시 인터벌 정리
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SEO title="초기 채팅" noindex={true} />

      <S.Container>
        <S.Wrapper
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <InitChat
            message={requestBody.message}
            botMessage={botMessage}
            isPending={isPending || isTyping}
            isTyping={isTyping}
          />
        </S.Wrapper>
      </S.Container>
    </>
  );
};

export default InitChatPage;
