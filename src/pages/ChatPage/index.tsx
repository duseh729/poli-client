/** @jsxImportSource @emotion/react */
import { useParams, useLocation } from "react-router-dom";
import * as S from "./style";
import { useChatMessages } from "@/api/chat";
import Chat from "@/components/Chat/Chat";
import { useChatRoomsStore } from "@/stores";

const ChatPage = () => {
  const { id } = useParams<{ id: string }>();
  const chatRooms = useChatRoomsStore((state) => state.chatRooms);
  const currentRoom = chatRooms.find((room) => room.id == Number(id));

  const {
    data: messages = [],
    error,
    isLoading,
  } = useChatMessages(parseInt(id!, 10));

  if (isLoading) {
    return null;
  }

  if (error instanceof Error) {
    return <div>error</div>;
  }

  return (
    <S.Container>
      <S.Title>{currentRoom?.roomName}</S.Title>
      <S.Wrapper
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <S.Main>
          <Chat
            messages={messages}
            roomId={parseInt(id!, 10)}
            key={parseInt(id!, 10)}
          />
        </S.Main>
      </S.Wrapper>
    </S.Container>
  );
};

export default ChatPage;
