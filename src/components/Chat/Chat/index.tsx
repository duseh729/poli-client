import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import {
  useChatMessages,
  useChatRoomProgress,
  useChatRooms,
  useChatStream,
} from "@/api/chat";
import chatArrow from "@/assets/chat-arrow.svg";
import poliChat from "@/assets/poli-chat-icon-sm.svg";
import progressOn from "@/assets/progress-on.svg";
import userChat from "@/assets/user-chat-icon.svg";
import loadingSpinner from "@/assets/loading-spinner.svg";
import type { ChatMessage } from "@/types/chat";
import * as S from "./style";
import "highlight.js/styles/github.css";

type ChatProps = {
  messages: ChatMessage[];
  roomId: number;
  isInit: boolean;
};

const Chat = ({ messages: initialMessages, roomId, isInit }: ChatProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  const { mutateAsync: chatStream, isPending } = useChatStream();
  const { data: messagesData, isLoading } = useChatMessages(roomId);
  const { data } = useChatRoomProgress(roomId);
  const { fulfilled, percentage } = data ?? {};

  const { refetch } = useChatRooms();

  const showProgress = !fulfilled;
  const progress = percentage ?? 0;

  const chatFooterRef = useRef<HTMLDivElement>(null);
  const [footerHeight, setFooterHeight] = useState(0);

  const animationProps = isInit
    ? {}
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.5 },
      };

  useEffect(() => {
    if (chatFooterRef.current) {
      setFooterHeight(chatFooterRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    if (!isLoading && messagesData) {
      setChatMessages(messagesData);
    } else {
      setChatMessages(initialMessages);
    }
  }, [isLoading, messagesData, initialMessages]);

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
        await chatStream({
          requestBody: responseBody,
          config: { meta: { skipLoading: true } },
        });
        await refetch(); // 채팅방 목록을 새로고침하여 최신 상태 반영
      } catch (error) {
        console.error("error", error);
      }
    }
  };

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const sortedMessages = chatMessages.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return (
    <S.ChatContainer>
      <S.ChatWindow ref={chatWindowRef} style={{ paddingBottom: footerHeight }}>
        {sortedMessages.map((message, index) => (
          <S.MessageContainer key={index}>
            {message.role === "USER" ? (
              <S.UserMessageWrapper>
                <S.UserMessage {...animationProps}>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}
                  >
                    {message.message || ""}
                  </ReactMarkdown>
                </S.UserMessage>
              </S.UserMessageWrapper>
            ) : (
              <S.BotMessageWrapper>
                <S.BotIcon src={poliChat} alt="Bot" />
                <S.Message {...animationProps}>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}
                    components={{
                      a: ({ node, ...props }) => (
                        <a
                          {...props}
                          target="_blank"
                          rel="noopener noreferrer"
                        />
                      ),
                    }}
                  >
                    {message.message || ""}
                  </ReactMarkdown>
                </S.Message>
              </S.BotMessageWrapper>
            )}
          </S.MessageContainer>
        ))}
        {isPending && (
          <S.MessageContainer>
            <S.BotIcon src={poliChat} alt="Bot" />
            <S.LoadingMessage
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              가장 도움을 줄 수 있는 답변을 준비하고 있습니다.{" "}
              <S.LoadingSpinner src={loadingSpinner} alt="Loading" />
            </S.LoadingMessage>
          </S.MessageContainer>
        )}
      </S.ChatWindow>
      <S.ChatFooter ref={chatFooterRef}>
        {showProgress && (
          <S.ProgrssWrapper>
            <S.ProgressBox progress={progress}>
              {progress === 100 && <img src={progressOn} alt="progress-on" />}
              <S.ProgressText
                progress={progress}
              >{`진정서 작성 중  ${progress}%`}</S.ProgressText>
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
      </S.ChatFooter>
    </S.ChatContainer>
  );
};

export default Chat;
