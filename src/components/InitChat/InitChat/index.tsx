import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import * as S from "../../Chat/Chat/style";
import chatArrow from "@/assets/chat-arrow.svg";
import poliChat from "@/assets/poli-chat-icon-sm.svg";
import "highlight.js/styles/github.css";
import loadingSpinner from "@/assets/loading-spinner.svg";
import { COLORS } from "@/constants/color";
import useWindowWidth from "@/hooks/useWindowWidth";

type ChatProps = {
  message: string;
  botMessage: string;
  isPending: boolean;
  isTyping: boolean;
  handleSend: (message: string) => void;
};

const InitChat = ({
  message,
  botMessage,
  isPending,
  isTyping,
  handleSend,
}: ChatProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  const chatFooterRef = useRef<HTMLDivElement>(null);
  const [footerHeight, setFooterHeight] = useState(0);

  const [showRecommendMessages, setShowRecommendMessages] = useState(false);
  const width = useWindowWidth();
  const recommendRef = useRef<HTMLDivElement>(null);
  const recommendButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (width > 600) {
      setShowRecommendMessages(true);
    } else {
      setShowRecommendMessages(false);
    }
  }, [width]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        recommendRef.current &&
        !recommendRef.current.contains(event.target as Node) &&
        recommendButtonRef.current &&
        !recommendButtonRef.current.contains(event.target as Node)
      ) {
        setShowRecommendMessages(false);
      }
    };

    if (showRecommendMessages && width <= 600) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showRecommendMessages, width]);

  useEffect(() => {
    if (chatFooterRef.current) {
      setFooterHeight(chatFooterRef.current.offsetHeight);
    }
  }, [chatFooterRef.current]);

  useEffect(() => {
    const chatWindow = chatWindowRef.current;
    if (!chatWindow) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = chatWindow;
      const nearBottom = scrollHeight - scrollTop - clientHeight < 1;
      if (nearBottom) {
        setAutoScroll(true);
      } else {
        setAutoScroll(false);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY < 0) {
        setAutoScroll(false);
      }
    };

    chatWindow.addEventListener("scroll", handleScroll);
    chatWindow.addEventListener("wheel", handleWheel);

    return () => {
      chatWindow.removeEventListener("scroll", handleScroll);
      chatWindow.removeEventListener("wheel", handleWheel);
    };
  }, []);

  useEffect(() => {
    if (autoScroll && chatWindowRef.current) {
      chatWindowRef.current.scrollTo({
        top: chatWindowRef.current.scrollHeight,
      });
    }
  }, [botMessage, autoScroll]);

  const recommendMessages = [
    { constents: "진정서가 뭐야?" },
    { constents: "범인을 잡으면 돈을 돌려 받을 수 있어?" },
    { constents: "나와 비슷한 사례를 출처와 함께 공유해줘." },
    { constents: "진정서를 작성해줘." },
  ];

  const handleLocalSend = () => {
    if (inputValue.trim() !== "") {
      handleSend(inputValue);
      setInputValue("");
    }
  };

  return (
    <S.ChatContainer>
      <S.ChatWindow
        ref={chatWindowRef}
        style={{ paddingBottom: `${footerHeight + 60}px` }}
      >
        <S.MessageContainer>
          <S.UserMessageWrapper>
            <S.UserMessage
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {message}
              </ReactMarkdown>
            </S.UserMessage>
          </S.UserMessageWrapper>
        </S.MessageContainer>
        {isTyping && botMessage && (
          <S.MessageContainer>
            <S.BotMessageWrapper>
              <S.BotIcon src={poliChat} alt="Bot" />
              <S.Message
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                  components={{
                    a: ({ node, ...props }) => (
                      <a {...props} target="_blank" rel="noopener noreferrer" />
                    ),
                  }}
                >
                  {botMessage}
                </ReactMarkdown>
              </S.Message>
            </S.BotMessageWrapper>
          </S.MessageContainer>
        )}
        {!isTyping && isPending && (
          <S.MessageContainer>
            <S.BotMessageWrapper>
              <S.BotIcon src={poliChat} alt="Bot" />
              <S.LoadingMessage
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                가장 도움을 줄 수 있는 답변을 준비하고 있습니다.{" "}
                <S.LoadingSpinner src={loadingSpinner} alt="Loading" />
              </S.LoadingMessage>
            </S.BotMessageWrapper>
          </S.MessageContainer>
        )}
      </S.ChatWindow>
      <S.ChatFooter ref={chatFooterRef}>
        <S.InputContainer>
          <S.InputWrapper>
            <div
              style={{ display: "flex", width: "100%", marginBottom: "18px" }}
            >
              <S.Textarea
                value={inputValue}
                placeholder={
                  width <= 600
                    ? "사건에 대해 말해주세요"
                    : "친구에게 말하듯이 편하게, 사건에 대해 말해 주세요."
                }
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (
                    e.key === "Enter" &&
                    !e.shiftKey &&
                    !isPending &&
                    !isTyping
                  ) {
                    e.preventDefault();
                    handleLocalSend();
                  }
                }}
              />
              <S.SendButton
                onClick={handleLocalSend}
                disabled={isPending || isTyping || inputValue.length === 0}
              >
                <img src={chatArrow} alt="send" />
              </S.SendButton>
            </div>
            {/* 추천 질문 영역 */}
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <S.RecommendButton
                ref={recommendButtonRef}
                onClick={() => {
                  if (width <= 600) {
                    setShowRecommendMessages((prev) => !prev);
                  }
                }}
                showRecommendMessages={showRecommendMessages}
              >
                추천 질문
              </S.RecommendButton>
              {width > 600 &&
                showRecommendMessages &&
                recommendMessages.map((msg, index) => {
                  return (
                    <S.RecommendMessage
                      key={index}
                      onClick={() => handleSend(msg.constents)}
                      disabled={isPending || isTyping}
                    >
                      {msg.constents}
                    </S.RecommendMessage>
                  );
                })}
            </div>
            {width <= 600 && showRecommendMessages && (
              <S.RecommendContainer ref={recommendRef}>
                {recommendMessages.map((msg, index) => (
                  <S.RecommendMessage
                    key={index}
                    onClick={() => {
                      handleSend(msg.constents);
                      setShowRecommendMessages(false); // Hide after selection
                    }}
                    disabled={isPending || isTyping}
                  >
                    {msg.constents}
                  </S.RecommendMessage>
                ))}
              </S.RecommendContainer>
            )}
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

export default InitChat;
