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
import loadingSpinner from "@/assets/loading-spinner.svg";
import type { ChatMessage } from "@/types/chat";
import * as S from "./style";
import "highlight.js/styles/github.css";

type ChatProps = {
  messages: ChatMessage[];
  roomId: number;
  isInit: boolean;
};

const BLOCK_SIZE = 7; // 한 번에 붙일 글자 수 (조정 가능)
const TICK_DELAY_MS = 5; // 반복 간격(ms) — 작을수록 더 빠름

const Chat = ({ messages: initialMessages, roomId, isInit }: ChatProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  const { mutateAsync: chatStream, isPending } = useChatStream();
  const { data: messagesData, isLoading } = useChatMessages(roomId);
  const { refetch } = useChatRooms();

  // const { data } = useChatRoomProgress(roomId);
  // const { fulfilled, percentage } = data ?? {};
  // const showProgress = !fulfilled;
  // const progress = percentage ?? 0;

  const chatFooterRef = useRef<HTMLDivElement>(null);
  const [footerHeight, setFooterHeight] = useState(0);

  // 타이핑 관련
  const [currentBotMessage, setCurrentBotMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const bufferRef = useRef<string[]>([]); // 표시 대기 중인 글자들
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const currentBotMessageRef = useRef(""); // 전체 누적 원문
  const streamingRef = useRef(false); // 스트리밍이 서버측에서 아직 진행중인지
  const streamEndedRef = useRef(false); // 서버에서 종료 신호(=null chunk) 받았는지
  const appendedFinalRef = useRef(false); // 이미 최종 메시지를 로컬에 추가했는지 중복방지

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

  /**
   * 외부 데이터(messagesData)로 덮어쓰기 제어
   * - 스트리밍/타이핑 중이면 덮어쓰지 않음 (로컬 애니메이션 우선)
   */
  useEffect(() => {
    if (!isLoading && messagesData) {
      if (streamingRef.current || isTyping) {
        return;
      }
      setChatMessages(messagesData);
    } else {
      if (!streamingRef.current && !isTyping) {
        setChatMessages(initialMessages);
      }
    }
  }, [isLoading, messagesData, initialMessages, isTyping]);

  /** 타이핑 루프 시작 */
  const startTypingLoop = () => {
    if (intervalRef.current) return; // 이미 동작 중이면 무시

    intervalRef.current = setInterval(() => {
      const buf = bufferRef.current;
      if (buf.length > 0) {
        // BLOCK_SIZE만큼 꺼내서 붙임
        const take = buf.splice(0, BLOCK_SIZE).join("");
        setCurrentBotMessage((prev) => prev + take);
      } else {
        // 버퍼 비었음
        if (streamEndedRef.current) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          setIsTyping(false);

          if (!appendedFinalRef.current) {
            appendedFinalRef.current = true;
            setChatMessages((prev) => [
              ...prev,
              {
                createdAt: new Date().toISOString(),
                message: currentBotMessageRef.current,
                role: "AI",
              },
            ]);
            currentBotMessageRef.current = "";
            setCurrentBotMessage("");
          }
        } else {
          // 버퍼 비었지만 스트림은 아직 끝나지 않음 -> 잠시 멈추고 interval 정리.
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          // 대기: 새로운 chunk가 오면 startTypingLoop가 다시 호출되어 재개됨
        }
      }
    }, TICK_DELAY_MS);
  };

  useEffect(() => {
    // console.log("Chat component mounted", isTyping);
  }, [isTyping])

  /** 메시지 전송 */
  const handleSend = async () => {
    // if (isPending || isTyping) return;

    if (inputValue.trim() !== "") {
      const userMessage: ChatMessage = {
        createdAt: new Date().toISOString(),
        message: inputValue,
        role: "USER",
      };
      setChatMessages((prevMessages) => [...prevMessages, userMessage]);
      setInputValue("");

      try {
        // 초기화
        streamingRef.current = true;
        streamEndedRef.current = false;
        appendedFinalRef.current = false;
        bufferRef.current = [];
        currentBotMessageRef.current = "";
        setCurrentBotMessage("");
        setIsTyping(false);

        const responseBody = { message: inputValue, initMessage: "{}", roomId };
        await chatStream({
          requestBody: responseBody,
          config: { meta: { skipLoading: true } },
          onMessage: (chunk: string | null) => {
            // 스트림 종료 신호
            if (chunk === null) {
              streamingRef.current = false;
              streamEndedRef.current = true;
              // don't force finalize here — let the typing loop drain buffer and finalize
              return;
            }

            if (chunk) {
              // 들어오는 chunk를 한 글자 단위로 버퍼에 넣음
              bufferRef.current.push(...chunk.split(""));
              // 전체 텍스트 누적
              currentBotMessageRef.current += chunk;

              // 타이핑 상태 세팅 및 루프 시작
              if (!isTyping) {
                setIsTyping(true);
                startTypingLoop();
              } else {
                // 이미 타이핑 중이면 루프가 소비중 -> do nothing
                // But ensure interval is running (in case it was cleared when buffer momentarily emptied)
                if (!intervalRef.current) {
                  startTypingLoop();
                }
              }
            }
          },
        });

        // chatStream 종료 후에 메타/방 목록은 한 번 갱신
        // (실제 메시지 내용은 typing이 끝날 때 로컬에 추가되므로 messagesData가 와도 덮어쓰지 않음)
        await refetch();
      } catch (error) {
        console.error("chat stream error:", error);
        // 실패 시 정리
        streamingRef.current = false;
        streamEndedRef.current = true;
        bufferRef.current = [];
        currentBotMessageRef.current = "";
        setIsTyping(false);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
    }
  };

  /** 항상 아래로 스크롤 */
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [chatMessages, currentBotMessage]);

  /** 정렬해서 렌더 (원본 배열 변경 금지) */
  const sortedMessages = [...chatMessages].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  /** 언마운트시 클린업 */
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

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
                <S.BotIcon src={poliChat} alt="AI" />
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

        {isTyping && currentBotMessage !== "" && (
          <S.MessageContainer>
            <S.BotIcon src={poliChat} alt="AI" />
            <S.Message {...animationProps}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {`${currentBotMessage}`}
              </ReactMarkdown>
            </S.Message>
          </S.MessageContainer>
        )}

        {!isTyping && isPending && (
          <S.MessageContainer>
            <S.BotIcon src={poliChat} alt="AI" />
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
              {progress === 100 && <img src={progressOn} alt="progress-on" />}
              <S.ProgressText progress={progress}>
                {`진정서 작성 중  ${progress}%`}
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
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey && !isPending) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              disabled={isPending || isTyping}
            />
            <S.SendButton
              onClick={handleSend}
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

export default Chat;
