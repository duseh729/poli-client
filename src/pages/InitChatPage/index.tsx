// InitChatPage.tsx
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useChatStream, useChatRooms, useChatMessages, fetchChatMessages } from "@/api/chat";
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

  useEffect(() => {
    const startChat = async () => {
      if (!requestBody) {
        // 예외 처리: requestBody 없으면 홈으로 보내기 등
        navigate("/main");
        return;
      }

      try {
        await chatStream({ requestBody, config: {} });

        const updatedRooms = await refetchChatRooms();

        const newChatRoom = updatedRooms?.data?.find(
          (room) =>
            !chatRooms?.some((existingRoom) => existingRoom.id === room.id)
        );

        if (newChatRoom) {
          // data prefetch for the new chat room messages
          await queryClient.prefetchQuery({
            queryKey: ["chatMessages", newChatRoom.id],
            queryFn: () => fetchChatMessages(newChatRoom.id),
          });

          navigate(getDynamicPath(ROUTES.CHAT_ID, { id: newChatRoom.id }), {
            state: { isInit: true },
          });
        } else {
          console.error("새로운 채팅방을 찾지 못했습니다.");
        }
      } catch (error) {
        console.error("AI 채팅 요청 실패:", error);
        // 에러 시 fallback 또는 에러 페이지 navigate 가능
      }
    };

    startChat();
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
          <InitChat message={requestBody?.message} isPending={isPending} />
        </S.Main>
      </S.Wrapper>
    </S.Container>
  );
};

export default InitChatPage;
