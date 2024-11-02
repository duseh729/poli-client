/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as S from "./style";
import { getChatMessages } from "@/api/chat";
import { ChatMessage } from "@/types/chat";
import Chat from "@/components/Chat/Chat";

const ChatPage = () => {
  const { id } = useParams<{ id: string }>();
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const consultationId = parseInt(id!, 10);
        const chatMessages = await getChatMessages(consultationId);
        setMessages(chatMessages.filter((message) => message !== null));
      } catch (error) {
        console.error("채팅방 메시지 조회 실패:", error);
      }
    };

    fetchMessages();
  }, [id]);

  return (
    <S.Container
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <S.Main>
        <Chat messages={messages} roomId={parseInt(id!, 10)} />
      </S.Main>
    </S.Container>
  );
};

export default ChatPage;
