import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import {
  useChatMessages,
  useChatRoomProgress,
  useChatStream,
} from "@/api/chat";
import chatArrow from "@/assets/chat-arrow.svg";
import poliChat from "@/assets/poli-chat-icon.svg";
import progressOn from "@/assets/progress-on.svg";
import userChat from "@/assets/user-chat-icon.svg";
import type { ChatMessage } from "@/types/chat";
import * as S from "./style";
import "highlight.js/styles/github.css";

type ChatProps = {
  messages: ChatMessage[];
  roomId: number;
};

const Chat = ({ messages: initialMessages, roomId }: ChatProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  const { mutateAsync: chatStream, isPending } = useChatStream();
  const { data: messagesData, isLoading } = useChatMessages(roomId);
  const { data } = useChatRoomProgress(roomId);
  const { fulfilled, percentage } = data ?? {};

  const showProgress = !fulfilled;
  const progress = percentage ?? 0;

  useEffect(() => {
    setChatMessages(initialMessages);
  }, [initialMessages]);

  useEffect(() => {
    if (!isLoading && messagesData) {
      setChatMessages(messagesData);
    }
  }, [isLoading, messagesData]);

  const handleSend = async () => {
    if (inputValue.trim() !== "") {
      const userMessage: ChatMessage = {
        createdAt: new Date().toISOString(),
        message: inputValue,
        role: "USER",
      };
      setChatMessages((prevMessages) => [...prevMessages, userMessage]);
      setInputValue("");

      try {
        const responseBody = { message: inputValue, initMessage: "{}", roomId };
        await chatStream(responseBody);
      } catch (error) {
        console.error("error", error);
      }
    }
  };

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, []);

  const sortedMessages = chatMessages.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return (
    <S.ChatContainer>
      <S.ChatWindow ref={chatWindowRef}>
        {sortedMessages.map((message, index) => (
          <S.MessageContainer key={index}>
            {message.role === "USER" ? (
              <>
                <S.UserIcon src={userChat} alt="User" />
                <S.Message
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}
                  >
                    {message.message || ""}
                  </ReactMarkdown>
                </S.Message>
              </>
            ) : (
              <>
                <S.BotIcon src={poliChat} alt="Bot" />
                <S.Message
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}
                  >
                    {message.message || ""}
                  </ReactMarkdown>
                </S.Message>
              </>
            )}
          </S.MessageContainer>
        ))}
      </S.ChatWindow>
      {showProgress && (
        <S.ProgrssWrapper>
          <S.ProgressBox progress={progress}>
            {progress === 100 && <img src={progressOn} alt="progress-on" />}
            <S.ProgressText
              progress={progress}
            >{`진정서 확인  ${progress}%`}</S.ProgressText>
          </S.ProgressBox>
        </S.ProgrssWrapper>
      )}
      <S.InputContainer>
        <S.InputWrapper>
          <S.Textarea
            value={inputValue}
            placeholder="친구에게 말하듯이 편하게, 사건에 대해 말해 주세요."
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey && !isPending) {
                e.preventDefault();
                handleSend();
              }
            }}
            disabled={isPending}
          />
          <S.SendButton
            onClick={handleSend}
            disabled={isPending || inputValue.length === 0}
          >
            <img src={chatArrow} alt="send" />
          </S.SendButton>
        </S.InputWrapper>
        <S.DisclaimerText>
          폴리가 제공한 법률상담에 대해 어떠한 민사, 형사상의 책임도 지지
          않습니다. 최종 결정에는 반드시 변호사의 조력을 받으십시오.
        </S.DisclaimerText>
      </S.InputContainer>
    </S.ChatContainer>
  );
};

export default Chat;
