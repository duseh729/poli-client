import {
  AnchorHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
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
import check2 from "@/assets/check2.svg";
import loadingSpinner from "@/assets/loading-spinner.svg";
import type { ChatMessage } from "@/types/chat";
import * as S from "./style";
import "highlight.js/styles/github.css";
import { COLORS } from "@/constants/color";
import { useNavigate } from "react-router-dom";
import { getPetition, initPetition } from "@/api/petition";
import { useComplaintStore } from "@/stores/petition";
import Complaint from "@/types/petition";

type ChatProps = {
  messages: ChatMessage[];
  roomId: number;
  isInit: boolean;
};

const BLOCK_SIZE = 2; // 한 번에 붙일 글자 수 (조정 가능)
const TICK_DELAY_MS = 30; // 반복 간격(ms) — 작을수록 더 빠름

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

  // 스크롤 변수
  const [autoScroll, setAutoScroll] = useState(true);

  const [isPetition, setIsPetition] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (chatFooterRef.current) {
      setFooterHeight(chatFooterRef.current.offsetHeight);
    }
  }, [isPetition]);

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
      if (streamEndedRef.current) {
        // 스트림 끝났고 버퍼도 완전히 비었음 → finalize
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setIsTyping(false);

        if (!appendedFinalRef.current) {
          appendedFinalRef.current = true;

          const finalText = currentBotMessageRef.current;

          setChatMessages((prev) => [
            ...prev,
            {
              createdAt: new Date().toISOString(),
              message: currentBotMessageRef.current,
              role: "AI",
            },
          ]);

          // ✅ 최종 텍스트에서 체크
          if (
            finalText.includes("진정서 작성이 완료되었습니다.") ||
            finalText.includes("진정서가 완성되었습니다. ")
          ) {
            (async () => {
              try {
                await initPetition(roomId, finalText);
                setIsPetition(true);
              } catch (err) {
                console.error(err);
              }
            })();
          } else {
            // console.log("진정서가 발행되는 시점 아님");
          }

          currentBotMessageRef.current = "";
          setCurrentBotMessage("");
        }
      }
      // ❌ else 구문에서 interval 끄지 않음
      // 스트림이 진행 중일 수 있으므로 그냥 대기만 한다.
    }
  }, TICK_DELAY_MS);
};


  useEffect(()=>{
    // console.log(currentBotMessage)
  }, [currentBotMessage])

  useEffect(() => {
    // console.log("Chat component mounted", isTyping);
  }, [isTyping]);

  /** 메시지 전송 */
  const handleSend = async (value?: string) => {
    // if (isPending || isTyping) return;
    const messageToSend = value ?? inputValue;

    if (messageToSend.trim() !== "") {
      const userMessage: ChatMessage = {
        createdAt: new Date().toISOString(),
        message: messageToSend,
        role: "USER",
      };
      setChatMessages((prevMessages) => [...prevMessages, userMessage]);
      setInputValue("");

      setAutoScroll(true);
      try {
        // 초기화
        streamingRef.current = true;
        streamEndedRef.current = false;
        appendedFinalRef.current = false;
        bufferRef.current = [];
        currentBotMessageRef.current = "";
        setCurrentBotMessage("");
        setIsTyping(false);

        const responseBody = {
          message: messageToSend,
          initMessage: "{}",
          roomId,
        };
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
  }, [chatMessages, currentBotMessage, autoScroll, isPetition]);

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

  useEffect(() => {
    setIsPetition(false);
    // console.log(roomId)
    const fetchPetition = async () => {
      try {
        const res = await getPetition(roomId);
        // console.log(isPetition)
        setIsPetition(true);
      } catch (error) {
        // console.error(error);
      }
    };

    fetchPetition();
  }, [roomId]);

  const recommendMessages = [
    { constents: "진정서가 뭐야?" },
    { constents: "범인을 잡으면 돈을 돌려 받을 수 있어?" },
    { constents: "나와 비슷한 사례를 출처와 함께 공유해줘." },
    { constents: "진정서를 작성해줘." },
  ];

  const CustomLink: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> =
    useCallback(
      ({ children, ...props }) => (
        <a {...props} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      ),
      []
    );

  return (
    <S.ChatContainer>
      <S.ChatWindow
        ref={chatWindowRef}
        style={{ paddingBottom: `${footerHeight + 60}px` }}
      >
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
                components={{
                  a: CustomLink,
                }}
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
        {isPetition ? (
          <S.PetitionButton
            onClick={() => {
              navigate(`/petition/${roomId}`);
            }}
          >
            <img src={check2} />
            진정서 확인하기
          </S.PetitionButton>
        ) : null}
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
            <div
              style={{ display: "flex", width: "100%", marginBottom: "18px" }}
            >
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
                onClick={() => {
                  handleSend(inputValue);
                }}
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
                    onClick={() => {
                      handleSend(msg.constents);
                    }}
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

export default Chat;
