/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import { Locale, ko as localeKo } from "date-fns/locale";
import * as S from "./style.ts";
import { useChatRoomsStore } from "@/stores";
import { ChatRoom } from "@/types/chat";
import { chatStream, getChatRooms } from "@/api/chat";
import { ROUTES } from "@/constants/routes.ts";
import { getDynamicPath } from "@/utils/routes.ts";
import poliSmLogo from "@/assets/poli-sm-logo.svg";

registerLocale("ko", localeKo as unknown as Locale);

const DESCRIPTION_MAX_LENGTH = 1000;

type InfoCollectionProps = {
  setIsEnableNext: (param: boolean) => void;
  isEnableNext: boolean;
};

const InfoCollection = ({
  setIsEnableNext,
  isEnableNext,
}: InfoCollectionProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [situationDescription, setSituationDescription] = useState("");
  const [selectedCheckBox, setSelectedCheckBox] = useState<number | null>(null);
  const [place, setPlace] = useState("");
  const { chatRooms, setChatRooms } = useChatRoomsStore();
  const navigate = useNavigate();

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
      const response = await chatStream(requestBody);
      if (response) {
        const updatedChatRooms = await getChatRooms();

        const newChatRoom = updatedChatRooms.find(
          (room: ChatRoom) =>
            !chatRooms.some((existingRoom) => existingRoom.id === room.id)
        );

        setChatRooms(updatedChatRooms);

        if (newChatRoom) {
          navigate(getDynamicPath(ROUTES.CHAT_ID, { id: newChatRoom.id }));
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
              <S.CustomDatePicker
                selected={selectedDate}
                onChange={(date: Date | null) => setSelectedDate(date)}
                dateFormat="yyyy.MM.dd"
                locale="ko"
                placeholderText="날짜"
              />
            </div>
            <div>
              <S.CustomDatePicker
                selected={selectedTime}
                onChange={(date: Date | null) => setSelectedTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="시간"
                dateFormat="h:mm aa"
                locale="ko"
                placeholderText="시간을 입력해 주세요."
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
            예시. OO에게 계좌이체로 입금했는데, 약속한 물건을 아예 받지 못했어.
            돈을 돌려받을 수 있을까?
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
            2. 해당 사건의 법적 절차가 이미 진행 중입니다. (법원 출석 등의 절차)
          </S.CheckBoxLabel>
        </S.CheckBoxGroup>
        <S.StartButton onClick={handleSubmit} disabled={!isEnableNext}>
          사건 제출하기
        </S.StartButton>
        <S.Footer>
          폴리의 역할은 정보를 제공하는데 있으며, 형사적 상담 및 법률 상담이
          아닙니다. 본 페이지는 법적 효력이 없습니다.
        </S.Footer>
      </S.Form>
    </S.Container>
  );
};

export default InfoCollection;
