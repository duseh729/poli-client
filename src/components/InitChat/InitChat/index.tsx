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
            <S.Textarea
              value={inputValue}
              placeholder="친구에게 말하듯이 편하게, 사건에 대해 말해 주세요."
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isPending || isTyping}
            />
            <S.SendButton
              disabled={isPending || isTyping || inputValue.length === 0}
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

export default InitChat;
