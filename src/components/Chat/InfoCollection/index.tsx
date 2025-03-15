/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import "dayjs/locale/ko";
import dayjs, { Dayjs } from "dayjs";
import * as S from "./style.ts";
import { useChatRoomsStore } from "@/stores";
import { ChatRoom } from "@/types/chat";
import { useChatStream, useChatRooms } from "@/api/chat";
import { ROUTES } from "@/constants/routes.tsx";
import { getDynamicPath } from "@/utils/routes.ts";
import poliSmLogo from "@/assets/poli-sm-logo.svg";

const DESCRIPTION_MAX_LENGTH = 1000;

type InfoCollectionProps = {
  setIsEnableNext: (param: boolean) => void;
  isEnableNext: boolean;
};

const InfoCollection = ({
  setIsEnableNext,
  isEnableNext,
}: InfoCollectionProps) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(dayjs());
  const [situationDescription, setSituationDescription] = useState("");
  const [selectedCheckBox, setSelectedCheckBox] = useState<number | null>(null);
  const [place, setPlace] = useState("");
  const { chatRooms, setChatRooms } = useChatRoomsStore();
  const navigate = useNavigate();

  const { mutateAsync: chatStream, isPending } = useChatStream();
  const { data: currentChatRooms, refetch: refetchChatRooms } = useChatRooms();

  useEffect(() => {
    if (place && selectedDate && selectedTime && situationDescription) {
      setIsEnableNext(true);
    } else {
      setIsEnableNext(false);
    }
  }, [
    place,
    selectedDate,
    selectedTime,
    situationDescription,
    setIsEnableNext,
  ]);

  useEffect(() => {
    if (currentChatRooms) {
      setChatRooms(currentChatRooms);
    }
  }, [currentChatRooms, setChatRooms]);

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= DESCRIPTION_MAX_LENGTH) {
      setSituationDescription(value);
    }
  };

  const handleCheckBoxChange = (checkBoxNumber: number) => {
    if (selectedCheckBox === checkBoxNumber) {
      setSelectedCheckBox(null);
    } else {
      setSelectedCheckBox(checkBoxNumber);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const initMessage = {
      place,
      date: selectedDate?.toISOString().split("T")[0],
      time: selectedTime?.toISOString().split("T")[1]?.slice(0, 5),
      situation: situationDescription,
      hasReported: selectedCheckBox === 1,
      isLegalProcedureOngoing: selectedCheckBox === 2,
    };

    const requestBody = {
      initMessage: JSON.stringify(initMessage),
      roomId: null,
      message: situationDescription,
    };

    try {
      await chatStream(requestBody);
      const updatedRooms = await refetchChatRooms();

      if (updatedRooms.data) {
        const newChatRoom = updatedRooms.data.find(
          (room: ChatRoom) =>
            !chatRooms.some((existingRoom) => existingRoom.id === room.id)
        );

        if (newChatRoom) {
          navigate(getDynamicPath(ROUTES.CHAT_ID, { id: newChatRoom.id }), {
            state: {
              roomName: newChatRoom.roomName,
            },
          });
        } else {
          console.error("새로운 채팅방을 찾을 수 없습니다.");
        }
      }
    } catch (error) {
      console.error("AI 대화 생성 실패:", error);
    }
  };

  return (
    <S.Container
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
        <S.Form>
          <S.Title>
            <S.Logo src={poliSmLogo} alt="POLI" />
            <S.TitleText>
              상담을 시작하기에 앞서, 사건에 대한 정보를 입력해 주세요.
            </S.TitleText>
          </S.Title>
          <S.FormGroup>
            <S.Label>
              <S.Highlight>피해 장소 |</S.Highlight> 어디에서 피해를 겪으셨나요?
              피해를 당하신 SNS, 혹은 사이트 명을 입력해 주세요.
            </S.Label>
            <S.Input
              type="text"
              placeholder="SNS 혹은 사이트명"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
            />
          </S.FormGroup>
          <S.FormGroup>
            <S.Label>
              <S.Highlight>피해 일시 |</S.Highlight> 언제 피해를 겪으셨나요?
              날짜와 시간을 선택해 주세요.
            </S.Label>
            <S.InputRow>
              <div>
                <DatePicker
                  value={selectedDate}
                  onChange={(newDate) => setSelectedDate(newDate)}
                  format="YYYY.MM.DD"
                  slotProps={{
                    textField: {
                      placeholder: "날짜",
                      inputProps: {
                        style: {
                          color: "#0F0F10",
                          fontFamily: "Wanted Sans",
                          fontSize: "14px",
                          fontWeight: 500,
                        },
                      },
                    },
                    popper: {
                      sx: {
                        "& .MuiPaper-root": {
                          width: "340px",
                          borderRadius: "10px",
                        },
                      },
                    },
                  }}
                  sx={{
                    width: "340px",
                    "& .MuiOutlinedInput-root": {
                      height: "56px",
                      backgroundColor: "#f6f8fb",
                      borderRadius: "10px",
                      "& fieldset": {
                        borderColor: "#c0cbd9",
                      },
                      "&:hover fieldset": {
                        borderColor: "#0059ff",
                      },
                      "&.Mui-focused fieldset": {
                        border: "1px solid #0059ff",
                      },
                    },
                  }}
                />
              </div>
              <div>
                <TimePicker
                  value={selectedTime}
                  format="a hh:mm"
                  minutesStep={1}
                  ampm={true}
                  onChange={(newTime) => setSelectedTime(newTime)}
                  slotProps={{
                    textField: {
                      placeholder: "시간",
                      inputProps: {
                        style: {
                          color: "#0F0F10",
                          fontFamily: "Wanted Sans",
                          fontSize: "14px",
                          fontWeight: 500,
                        },
                      },
                    },
                    popper: {
                      sx: {
                        "& .MuiPaper-root": {
                          width: "340px",
                          borderRadius: "10px",
                        },
                        "& .MuiMultiSectionDigitalClock-root": {
                          display: "flex",
                        },
                        "& .MuiMultiSectionDigitalClockSection-root": {
                          flex: "1 1 33.33%",
                          textAlign: "center",
                          overflowY: "auto",
                          height: "200px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          "::-webkit-scrollbar": {
                            width: "8px",
                          },
                          "::-webkit-scrollbar-thumb": {
                            backgroundColor: "#c0cbd9",
                            borderRadius: "10px",
                          },
                          "::-webkit-scrollbar-track": {
                            background: "#f6f8fb",
                          },
                        },
                        "& .Mui-selected": {
                          backgroundColor: "#BDD5FF !important",
                          color: "#0F0F10 !important",
                          fontWeight: 600,
                          fontFamily: "Wanted Sans",
                          width: "100%",
                          display: "block",
                          padding: "8px 12px",
                          boxSizing: "border-box",
                          borderRadius: "7px",
                        },
                        "& .MuiTypography-root": {
                          fontSize: "22px",
                          fontWeight: 500,
                          color: "#0F0F10 !important",
                          fontFamily: "Wanted Sans",
                        },
                      },
                    },
                  }}
                  sx={{
                    width: "340px",
                    "& .MuiOutlinedInput-root": {
                      height: "56px",
                      backgroundColor: "#f6f8fb",
                      borderRadius: "10px",
                      "& fieldset": {
                        borderColor: "#c0cbd9",
                      },
                      "&:hover fieldset": {
                        borderColor: "#0059ff",
                      },
                      "&.Mui-focused fieldset": {
                        border: "1px solid #0059ff",
                      },
                    },
                  }}
                />
              </div>
            </S.InputRow>
          </S.FormGroup>
          <S.FormGroup>
            <S.Label>
              <S.Highlight>피해 상황 |</S.Highlight> 어떤 상황이고 어떤 부분이
              고민되는지 설명해 주세요.
            </S.Label>
            <S.ExampleText>
              예시. OO에게 계좌이체로 입금했는데, 약속한 물건을 아예 받지
              못했어. 돈을 돌려받을 수 있을까?
            </S.ExampleText>
            <textarea
              css={S.textAreaStyle(
                situationDescription.length >= DESCRIPTION_MAX_LENGTH
              )}
              value={situationDescription}
              onChange={handleTextAreaChange}
              rows={4}
              placeholder="어떤 피해를 어떻게 경험했는지 편하게 입력해 주세요."
            />
            <div
              css={S.charCountStyle(
                situationDescription.length === DESCRIPTION_MAX_LENGTH
              )}
            >
              {situationDescription.length}/{DESCRIPTION_MAX_LENGTH}
            </div>
          </S.FormGroup>
          <S.CheckBoxGroup>
            <S.DuplicationWrapper>
              <S.Duplication bold={true}>신고 중복 확인 &nbsp;|</S.Duplication>
              <S.Duplication bold={false}>
                &nbsp; 이미 신고가 이루어졌다면 아래 본인의 상황을 선택해 주세요
              </S.Duplication>
            </S.DuplicationWrapper>
            <S.CheckBoxLabel>
              <input
                type="checkbox"
                css={[S.hiddenCheckboxStyles, S.hiddenCheckboxCheckedStyles]}
                checked={selectedCheckBox === 1}
                onChange={() => handleCheckBoxChange(1)}
              />
              <span css={S.customCheckboxStyles} />
              1. 해당 사건을 다른 경로를 통해(신문고, 오프라인 경찰서 등) 이미
              신고했습니다.
            </S.CheckBoxLabel>
            <S.CheckBoxLabel>
              <input
                type="checkbox"
                css={[S.hiddenCheckboxStyles, S.hiddenCheckboxCheckedStyles]}
                checked={selectedCheckBox === 2}
                onChange={() => handleCheckBoxChange(2)}
              />
              <span css={S.customCheckboxStyles} />
              2. 해당 사건의 법적 절차가 이미 진행 중입니다. (법원 출석 등의
              절차)
            </S.CheckBoxLabel>
          </S.CheckBoxGroup>
        </S.Form>
        <S.StartButton
          onClick={handleSubmit}
          disabled={!isEnableNext || isPending}
        >
          사건 제출하기
        </S.StartButton>
        <S.Footer>
          폴리의 역할은 정보를 제공하는데 있으며, 형사적 상담 및 법률 상담이
          아닙니다. 본 페이지는 법적 효력이 없습니다.
        </S.Footer>
      </LocalizationProvider>
    </S.Container>
  );
};

export default InfoCollection;
