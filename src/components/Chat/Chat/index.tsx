/** @jsxImportSource @emotion/react */
import { useState, useRef, useEffect } from "react";
import * as S from "./style";
import chatArrow from "@/assets/chat-arrow.svg";
import userChat from "@/assets/user-chat-icon.svg";
import { chatStream, getChatMessages } from "@/api/chat";
import poliChat from "@/assets/poli-chat-icon.svg";
import { ChatMessage } from "@/types/chat";

type ChatProps = {
  messages: ChatMessage[];
  roomId: number;
};

const Chat = ({ messages, roomId }: ChatProps) => {
  const [inputValue, setInputValue] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setChatMessages(messages);
  }, [messages]);

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
        const response = await chatStream(responseBody);
        if (response) {
          const updatedMessages = await getChatMessages(roomId);
          setChatMessages(updatedMessages);
        }
      } catch (error) {
        console.error("error", error);
      } finally {
        setIsLoading(false);
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
                  {getFormatText(message.message)}
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
                  {getFormatText(message.message)}
                </S.Message>
              </>
            )}
          </S.MessageContainer>
        ))}
      </S.ChatWindow>
      <S.InputContainer>
        <S.InputWrapper>
          <S.Textarea
            value={inputValue}
            placeholder="친구에게 말하듯이 편하게, 사건에 대해 말해 주세요."
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey && !isLoading) {
                e.preventDefault();
                handleSend();
              }
            }}
            disabled={isLoading}
          />
          <S.SendButton
            onClick={handleSend}
            disabled={isLoading || inputValue.length === 0}
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

const getFormatText = (text: string | null) => {
  if (!text) return "";

  const lines = text.split("\n");
  let currentHeading = "";

  return lines.map((line, index) => {
    if (line.startsWith("#")) {
      const hashes = line.match(/^#+/)?.[0];
      const level = hashes ? hashes.length : 1;
      const content = line.replace(/^#+\s*/, "");
      currentHeading = content;
      return (
        <S.Heading key={index} level={level}>
          {content}
        </S.Heading>
      );
    }

    if (line.startsWith("-")) {
      const content = line.replace(/^-\s*/, "");
      return (
        <S.ListItem key={index} hasHeading={!!currentHeading}>
          {content}
        </S.ListItem>
      );
    }

    const linkMatch = line.match(/\[(.*?)\]\((.*?)\)/);
    if (linkMatch) {
      const [_, text, url] = linkMatch;
      return (
        <S.LinkText
          key={index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {text}
        </S.LinkText>
      );
    }

    if (line.startsWith("**") && line.endsWith("**")) {
      return (
        <S.StrongText key={index}>
          {line.substring(2, line.length - 2)}
        </S.StrongText>
      );
    }

    return <div key={index}>{line}</div>;
  });
};
