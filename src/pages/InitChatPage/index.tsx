import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useChatStream, useChatRooms, fetchChatMessages } from "@/api/chat";
import { ROUTES } from "@/constants/routes.tsx";
import { getDynamicPath } from "@/utils/routes.ts";
import * as S from "./style";
import InitChat from "@/components/InitChat/InitChat";

const InitChatPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: chatRooms, refetch: refetchChatRooms } = useChatRooms();
  const { mutateAsync: chatStream, isPending } = useChatStream();

  const requestBody = location?.state;

  // chunk UI 상태
  const [botMessage, setBotMessage] = useState("");
  const bufferRef = useRef<string[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const startChat = async () => {
      if (!requestBody) {
        navigate("/main");
        return;
      }

      try {
        await chatStream({
          requestBody,
          config: {},
          onMessage: (chunk: string) => {
            bufferRef.current.push(chunk);
            const combined = bufferRef.current.join("");
            setBotMessage(combined);
            setIsTyping(true);

            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(async () => {
              // 답변이 끝났다고 판단
              setIsTyping(false);

              if (!isTyping) {
                // 채팅방 목록 새로고침
                const updatedRooms = await refetchChatRooms();

                const newChatRoom = updatedRooms?.data?.find(
                  (room) =>
                    !chatRooms?.some(
                      (existingRoom) => existingRoom.id === room.id
                    )
                );

                if (newChatRoom) {
                  await queryClient.prefetchQuery({
                    queryKey: ["chatMessages", newChatRoom.id],
                    queryFn: () => fetchChatMessages(newChatRoom.id),
                  });

                  navigate(
                    getDynamicPath(ROUTES.CHAT_ID, { id: newChatRoom.id }),
                    {
                      state: { isInit: true },
                    }
                  );
                } else {
                  console.error("새로운 채팅방을 찾지 못했습니다.");
                }
              }
            }, 1000); // 1초 동안 추가 chunk가 없으면 완료 처리
          },
        });
      } catch (error) {
        console.error("AI 채팅 요청 실패:", error);
      }
    };

    startChat();
    // eslint-disable-next-line
  }, []);

  return (
    <S.Container>
      <S.Title></S.Title>
      <S.Wrapper
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <S.Main>
          {/* 실시간 chunk UI */}
          <InitChat
            message={requestBody.message}
            botMessage={botMessage}
            isPending={isPending || isTyping}
            isTyping={isTyping}
          />
        </S.Main>
      </S.Wrapper>
    </S.Container>
  );
};

export default InitChatPage;
