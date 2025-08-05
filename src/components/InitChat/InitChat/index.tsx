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
  isPending: boolean;
};

const InitChat = ({ message, isPending }: ChatProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const chatWindowRef = useRef<HTMLDivElement>(null);

  const showProgress = true;
  const progress = 0;

  const chatFooterRef = useRef<HTMLDivElement>(null);
  const [footerHeight, setFooterHeight] = useState(0);
  
  useEffect(() => {
    if (chatFooterRef.current) {
      setFooterHeight(chatFooterRef.current.offsetHeight);
    }
  }, [chatFooterRef.current]);

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
      </S.ChatWindow>
      <S.ChatFooter ref={chatFooterRef}>
        {showProgress && (
          <S.ProgrssWrapper>
            <S.ProgressBox progress={progress}>
              {progress === 0 ? null : <img src={progressOn} alt="progress-on" />}
              <S.ProgressText progress={progress}>
                진정서 작성 중 0%
              </S.ProgressText>
            </S.ProgressBox>
          </S.ProgrssWrapper>
        )}
        <S.InputContainer>
          <S.InputWrapper>
            <S.Textarea
              value={inputValue}
              placeholder="친구에게 말하듯이 편하게, 사건에 대해 말해 주세요."
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isPending}
            />
            <S.SendButton disabled={isPending || inputValue.length === 0}>
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
