import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import * as S from "./style";
import chatArrow from "@/assets/chat-arrow.svg";
import userChat from "@/assets/user-chat-icon.svg";
import { useChatStream, useChatMessages } from "@/api/chat";
import poliChat from "@/assets/poli-chat-icon.svg";
import progressOn from "@/assets/progress-on.svg";
import { ChatMessage } from "@/types/chat";
import "highlight.js/styles/github.css";

type ChatProps = {
  messages: ChatMessage[];
  roomId: number;
};

const Chat = ({ messages: initialMessages, roomId }: ChatProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [progress, setProgress] = useState<number>(0);
  const [showProgress, setShowProgress] = useState<boolean>(false);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  const { mutateAsync: chatStream, isPending } = useChatStream();
  const { data: messagesData, isLoading } = useChatMessages(roomId);

  useEffect(() => {
    setShowProgress(false);
    setProgress(0);
  }, [roomId]);

  useEffect(() => {
    setChatMessages(initialMessages);
  }, [initialMessages]);

  useEffect(() => {
    if (!isLoading && messagesData) {
      setChatMessages(messagesData);

      if (chatWindowRef.current) {
        chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        setProgress(100);
      }
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
      setShowProgress(true);
      setProgress(0);

      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 5;
        });
      }, 200);

      try {
        const responseBody = { message: inputValue, initMessage: "{}", roomId };
        await chatStream(responseBody);
      } catch (error) {
        console.error("error", error);
      }

      return () => clearInterval(progressInterval);
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

  const markdownComponents = {
    h1: ({ children }: any) => <S.Heading level={1}>{children}</S.Heading>,
    h2: ({ children }: any) => <S.Heading level={2}>{children}</S.Heading>,
    h3: ({ children }: any) => <S.Heading level={3}>{children}</S.Heading>,
    h4: ({ children }: any) => <S.Heading level={4}>{children}</S.Heading>,
    h5: ({ children }: any) => <S.Heading level={5}>{children}</S.Heading>,
    h6: ({ children }: any) => <S.Heading level={6}>{children}</S.Heading>,
    strong: ({ children }: any) => <S.StrongText>{children}</S.StrongText>,
    p: ({ children }: any) => <p>{children}</p>,
    code: ({ inline, className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <S.PreformattedCode>
          <code className={className} {...props}>
            {children}
          </code>
        </S.PreformattedCode>
      ) : (
        <S.InlineCode {...props}>{children}</S.InlineCode>
      );
    },
    ul: ({ children }: any) => <S.UnorderedList>{children}</S.UnorderedList>,
    ol: ({ children }: any) => <S.OrderedList>{children}</S.OrderedList>,
    li: ({ children }: any) => (
      <S.ListItem hasHeading={false}>{children}</S.ListItem>
    ),
  };

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
                    components={markdownComponents}
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
                    components={markdownComponents}
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
