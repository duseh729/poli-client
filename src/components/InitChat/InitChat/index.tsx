import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import * as S from "./style";
import chatArrow from "@/assets/chat-arrow.svg";
import poliChat from "@/assets/poli-chat-icon-sm.svg";
import progressOn from "@/assets/progress-on.svg";
import "highlight.js/styles/github.css";
import loadingSpinner from "@/assets/loading-spinner.svg";
import { COLORS } from "@/constants/color";

type ChatProps = {
  message: string;
  botMessage: string;
  isPending: boolean;
  isTyping: boolean;
};

const InitChat = ({ message, botMessage, isPending, isTyping }: ChatProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  // const showProgress = true;
  // const progress = 0;

  const chatFooterRef = useRef<HTMLDivElement>(null);
  const [footerHeight, setFooterHeight] = useState(0);

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
      // 휠을 위로 굴릴 경우 자동 스크롤 끔
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
    { constents: "진정서를 만들어줘." },
  ];

  return (
    <S.ChatContainer>
      <S.ChatWindow ref={chatWindowRef} style={{ paddingBottom: footerHeight }}>
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
          </S.MessageContainer>
        )}
        {!isTyping && isPending && (
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
        {/* {showProgress && (
          <S.ProgrssWrapper>
            <S.ProgressBox progress={progress}>
              {progress === 0 ? null : <img src={progressOn} alt="progress-on" />}
              <S.ProgressText progress={progress}>
                진정서 작성 중 0%
              </S.ProgressText>
            </S.ProgressBox>
          </S.ProgrssWrapper>
        )} */}
        <S.InputContainer>
          <S.InputWrapper>
            <div
              style={{ display: "flex", width: "100%", marginBottom: "18px" }}
            >
              <S.Textarea
                value={inputValue}
                placeholder="친구에게 말하듯이 편하게, 사건에 대해 말해 주세요."
                disabled={isPending || isTyping}
              />
              <S.SendButton
                disabled={isPending || isTyping || inputValue.length === 0}
              >
                <img src={chatArrow} alt="send" />
              </S.SendButton>
            </div>
            {/* 추천 질문 영역 */}
            <div style={{ display: "flex", gap: "8px" }}>
              <div
                style={{
                  borderRadius: 16,
                  padding: "4px 10px",
                  backgroundColor: `${COLORS.GRAY4}`,
                  fontSize: 12,
                  fontFamily: "Wanted Sans",
                  fontWeight: 400,
                  lineHeight: "150%",
                  color: "#fff",
                }}
              >
                추천 질문
              </div>
              {recommendMessages.map((msg, index) => {
                return (
                  <S.RecommendMessage
                    key={index}
                    disabled={isPending || isTyping}
                  >
                    {msg.constents}
                  </S.RecommendMessage>
                );
              })}
            </div>
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
