import { useState } from "react";
import * as S from "./style";
import close from "@/assets/close.svg";
import exportIcon from "@/assets/exportIcon.svg";
import edit from "@/assets/edit.svg";
import Complaint, { ComplaintData } from "@/types/petition";
import buttonCheck from "@/assets/button-check.svg";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import "dayjs/locale/ko";
import dayjs, { Dayjs } from "dayjs";
import Input from "@/components/Petition/Input";
import ImageInput from "@/components/Chat/ImageCollection/ImageInput";
import DropdownInput from "@/components/Petition/DropdownInput";

const mockComplaint: ComplaintData = {
  complainant: {
    name: "홍길동",
    address: "서울특별시 강남구 역삼동 123-45",
    contact: "010-1234-5678",
  },
  respondent: {
    name: "김철수",
    contact: "010-9876-5432",
    specialNotes: "사기 전과 있음",
  },
  crimeType: "사이버 범죄",
  crimeDetail: "직거래사기",
  siteName: "중고나라",
  siteUrl: "https://joonggonara.com",
  crimeName: "사기죄",
  intentToPunish: "진정인은 피진정인을 진정하오니 처벌 요청",
  incidentDescription: "피해자가 거래 대금을 송금했으나 물품을 받지 못함.",
  incidentDetails:
    "2025년 8월 1일, 중고나라를 통해 카메라 거래를 진행. 김철수라는 인물에게 50만원을 송금했으나 물품을 보내주지 않고 잠적함.",
  evidences: [
    { fileName: "송금내역.png", fileUrl: "/evidence/송금내역.png" },
    { fileName: "채팅기록.jpg", fileUrl: "/evidence/채팅기록.jpg" },
  ],
  complaintDate: "2025-07-29",
};

// 클래스 인스턴스 생성 예시
const complaintInstance = new Complaint(mockComplaint);

const PetitionPage = () => {
  const [isUpdate, setIsUpdate] = useState(false);

  const [complainantName, setComplainantName] = useState(
    complaintInstance.complainant.name
  );
  const [complainantAddress, setComplainantAddress] = useState(
    complaintInstance.complainant.address
  );
  const [complainantContact, setComplainantContact] = useState(
    complaintInstance.complainant.contact
  );
  const [respondentName, setRespondentName] = useState(
    complaintInstance.respondent.name
  );
  const [respondentContact, setRespondentContact] = useState(
    complaintInstance.respondent.contact
  );
  const [respondentSpecialNotes, setRespondentSpecialNotes] = useState(
    complaintInstance.respondent.specialNotes
  );

  const [crimeType, setCrimeType] = useState(complaintInstance.crimeType);
  const [crimeDetail, setCrimeDetail] = useState(complaintInstance.crimeDetail);
  const [siteName, setSiteName] = useState(complaintInstance.siteName);
  const [siteUrl, setSiteUrl] = useState(complaintInstance.siteUrl);
  const [crimeName, setCrimeName] = useState(complaintInstance.crimeName);
  const [intentToPunish, setIntentToPunish] = useState(
    complaintInstance.intentToPunish
  );
  const [incidentDescription, setIncidentDescription] = useState(
    complaintInstance.incidentDescription
  );
  const [incidentDetails, setIncidentDetails] = useState(
    complaintInstance.incidentDetails
  );

  const [evidences, setEvidences] = useState(complaintInstance.evidences);

  const toggleIsUpdate = () => {
    setIsUpdate(!isUpdate);
  };

  const crimeOptions = [
    "직거래사기",
    "게임사기",
    "쇼핑몰사기",
    "이메일 무역사기",
    "로맨스스캠",
    "인터넷 투자 사기",
    "조건만남 사기",
    "기타 사이버사기",
  ];

  return (
    <S.Container>
      <S.PetitionWrapper>
        {/* 헤더 영역 */}
        <S.PetitionHeaderWrapper>
          <span>작성완료</span>
          <button>
            <img src={close} alt="진정서 끄기" />
          </button>
        </S.PetitionHeaderWrapper>

        {/* 진정서 제목 영역 */}
        <S.PetitionTitleWrapper>
          <div>
            <h3>
              진정서 : <span>당근마켓 사기 사건</span>
            </h3>
          </div>

          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
            <S.PetionTitleContents>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: "rgba(128, 128, 128, 0.71)",
                  }}
                >
                  신고일자
                </span>
                {isUpdate ? (
                  <div>
                    <DatePicker
                      value={
                        complaintInstance.complaintDate
                          ? dayjs(complaintInstance.complaintDate)
                          : null
                      }
                      onChange={(newDate) => {
                        complaintInstance.update({
                          complaintDate: newDate
                            ? dayjs(newDate).format("YYYY-MM-DD")
                            : "",
                        });
                      }}
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
                ) : (
                  <span>{complaintInstance.complaintDate}</span>
                )}
              </div>

              <div style={{ display: "flex", alignItems: "flex-end" }}>
                <div style={{ display: "flex", gap: 8 }}>
                  {isUpdate ? (
                    <button onClick={toggleIsUpdate}>
                      <img src={buttonCheck} alt="진정서 수정 완료" />
                      <span>수정 완료</span>
                    </button>
                  ) : (
                    <>
                      <button onClick={toggleIsUpdate}>
                        <img src={edit} alt="진정서 수정" />
                        <span>내용 수정</span>
                      </button>
                      <button>
                        <img src={exportIcon} alt="진정서 내보내기" />
                        <span>내보내기</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </S.PetionTitleContents>
          </LocalizationProvider>
        </S.PetitionTitleWrapper>

        {/* 사건 기본 정보 */}
        <S.PetitionInfoWrapper
          style={{ borderTop: "1px solid var(--grey-3, #e8ecf1)" }}
        >
          <h3>사건 기본 정보</h3>

          <div style={{ display: "flex", gap: 20 }}>
            <S.PetitionDefalutInfoWrapper>
              <S.PetitionInfoTitle>진정인(본인)</S.PetitionInfoTitle>

              <S.BasicColumnWrapper>
                <S.BasicWrapper>
                  <S.PetitionInfoContents>이름:</S.PetitionInfoContents>
                  {isUpdate ? (
                    <Input
                      value={complainantName}
                      setValue={(newValue) => setComplainantName(newValue)}
                    />
                  ) : (
                    <S.PetitionInfoContents>
                      {complainantName}
                    </S.PetitionInfoContents>
                  )}
                </S.BasicWrapper>

                <S.BasicWrapper>
                  <S.PetitionInfoContents>주소:</S.PetitionInfoContents>
                  {isUpdate ? (
                    <Input
                      value={complainantAddress}
                      setValue={(newValue) => setComplainantAddress(newValue)}
                    />
                  ) : (
                    <S.PetitionInfoContents>
                      {complainantAddress}
                    </S.PetitionInfoContents>
                  )}
                </S.BasicWrapper>

                <S.BasicWrapper>
                  <S.PetitionInfoContents>연락처:</S.PetitionInfoContents>
                  {isUpdate ? (
                    <Input
                      value={complainantContact}
                      setValue={(newValue) => setComplainantContact(newValue)}
                    />
                  ) : (
                    <S.PetitionInfoContents>
                      {complainantContact}
                    </S.PetitionInfoContents>
                  )}
                </S.BasicWrapper>
              </S.BasicColumnWrapper>
            </S.PetitionDefalutInfoWrapper>
            <S.PetitionDefalutInfoWrapper>
              <S.PetitionInfoTitle>피진정인(가해자)</S.PetitionInfoTitle>

              <S.BasicColumnWrapper>
                <S.BasicWrapper>
                  <S.PetitionInfoContents>이름(닉네임):</S.PetitionInfoContents>
                  {isUpdate ? (
                    <Input
                      value={respondentName}
                      setValue={(newValue) => setRespondentName(newValue)}
                    />
                  ) : (
                    <S.PetitionInfoContents>
                      {respondentName}
                    </S.PetitionInfoContents>
                  )}
                </S.BasicWrapper>
                <S.BasicWrapper>
                  <S.PetitionInfoContents>연락처:</S.PetitionInfoContents>
                  {isUpdate ? (
                    <Input
                      value={respondentContact}
                      setValue={(newValue) => setRespondentContact(newValue)}
                    />
                  ) : (
                    <S.PetitionInfoContents>
                      {respondentContact}
                    </S.PetitionInfoContents>
                  )}
                </S.BasicWrapper>
                <S.BasicWrapper>
                  <S.PetitionInfoContents>특이사항:</S.PetitionInfoContents>
                  {isUpdate ? (
                    <Input
                      value={respondentSpecialNotes}
                      setValue={(newValue) =>
                        setRespondentSpecialNotes(newValue)
                      }
                    />
                  ) : (
                    <S.PetitionInfoContents>
                      {respondentSpecialNotes}
                    </S.PetitionInfoContents>
                  )}
                </S.BasicWrapper>
              </S.BasicColumnWrapper>
            </S.PetitionDefalutInfoWrapper>
          </div>
        </S.PetitionInfoWrapper>

        {/* 사건 유형 정보 */}
        <S.PetitionInfoWrapper>
          <h3>사건 유형 정보</h3>
          <S.PetitionInfoTitle>범죄유형</S.PetitionInfoTitle>

          <S.ColumnWrapper>
            <S.Wrapper>
              <S.PetitionInfoContentsTitle>
                범죄유형
              </S.PetitionInfoContentsTitle>
              <S.PetitionInfoContents>{crimeType}</S.PetitionInfoContents>
            </S.Wrapper>

            <S.Wrapper>
              <S.PetitionInfoContentsTitle>
                세부유형
              </S.PetitionInfoContentsTitle>
              {isUpdate ? (
                <DropdownInput
                  value={crimeDetail}
                  setValue={setCrimeDetail}
                  options={crimeOptions}
                  placeholder="범죄명을 선택하세요"
                />
              ) : (
                <S.PetitionInfoContents>{crimeDetail}</S.PetitionInfoContents>
              )}
            </S.Wrapper>
          </S.ColumnWrapper>
        </S.PetitionInfoWrapper>

        {/* 상세 피해 상황 */}
        <S.PetitionInfoWrapper>
          <h3>상세 피해 상황</h3>

          {/* 피해장소, 진정취지 wrapper */}
          <div style={{ display: "flex", gap: 28 }}>
            {/* 피해장소 */}
            <div style={{ flex: "1 1 0", minWidth: 0 }}>
              <S.PetitionInfoTitle>피해장소</S.PetitionInfoTitle>

              <S.ColumnWrapper>
                <S.Wrapper>
                  <S.PetitionInfoContentsTitle>
                    사이트명
                  </S.PetitionInfoContentsTitle>
                  {isUpdate ? (
                    <Input
                      value={siteName}
                      setValue={(newValue) => setSiteName(newValue)}
                    />
                  ) : (
                    <S.PetitionInfoContents>{siteName}</S.PetitionInfoContents>
                  )}
                </S.Wrapper>
                <S.Wrapper>
                  <S.PetitionInfoContentsTitle>
                    사이트 주소
                  </S.PetitionInfoContentsTitle>
                  {isUpdate ? (
                    <Input
                      value={siteUrl}
                      setValue={(newValue) => setSiteUrl(newValue)}
                    />
                  ) : (
                    <S.PetitionInfoContents>{siteUrl}</S.PetitionInfoContents>
                  )}
                </S.Wrapper>
              </S.ColumnWrapper>
            </div>
            {/* 진정취지 */}

            <div style={{ flex: "1 1 0", minWidth: 0 }}>
              <S.PetitionInfoTitle>진정취지</S.PetitionInfoTitle>

              <div style={{ display: "flex" }}>
                <S.ColumnWrapper>
                  <S.Wrapper>
                    <S.PetitionInfoContentsTitle>
                      진정죄명
                    </S.PetitionInfoContentsTitle>
                    {isUpdate ? (
                      <Input
                        value={crimeName}
                        setValue={(newValue) => setCrimeName(newValue)}
                      />
                    ) : (
                      <S.PetitionInfoContents>
                        {crimeName}
                      </S.PetitionInfoContents>
                    )}
                  </S.Wrapper>
                  <S.Wrapper>
                    <S.PetitionInfoContentsTitle>
                      처벌의사
                    </S.PetitionInfoContentsTitle>
                    {isUpdate ? (
                      <Input
                        value={intentToPunish}
                        setValue={(newValue) => setIntentToPunish(newValue)}
                      />
                    ) : (
                      <S.PetitionInfoContents>
                        {intentToPunish}
                      </S.PetitionInfoContents>
                    )}
                  </S.Wrapper>
                </S.ColumnWrapper>
              </div>
            </div>
          </div>
          {/* 피해상황 */}
          <S.PetitionInfoTitle>피해상황</S.PetitionInfoTitle>

          <S.ColumnWrapper>
            <S.Wrapper>
              <S.PetitionInfoContentsTitle>
                피해사실
              </S.PetitionInfoContentsTitle>
              {isUpdate ? (
                <Input
                  value={incidentDescription}
                  setValue={(newValue) => setIncidentDescription(newValue)}
                />
              ) : (
                <S.PetitionInfoContents>
                  {incidentDescription}
                </S.PetitionInfoContents>
              )}
            </S.Wrapper>
            <S.Wrapper>
              <S.PetitionInfoContentsTitle>
                피해상황
              </S.PetitionInfoContentsTitle>
              {isUpdate ? (
                <Input
                  value={incidentDetails}
                  setValue={(newValue) => setIncidentDetails(newValue)}
                  multiline={true}
                />
              ) : (
                <S.PetitionInfoContents>
                  {incidentDetails}
                </S.PetitionInfoContents>
              )}
            </S.Wrapper>
          </S.ColumnWrapper>
        </S.PetitionInfoWrapper>

        {/* 부가 정보 */}
        <S.PetitionInfoWrapper>
          <h3>부가 정보</h3>
          <S.PetitionInfoTitle>증거자료</S.PetitionInfoTitle>

          <div style={{ display: "flex" }}>
            <S.PetitionInfoContentsTitleWrapper>
              <S.PetitionInfoContentsTitle>
                증거자료
              </S.PetitionInfoContentsTitle>
            </S.PetitionInfoContentsTitleWrapper>

            <S.PetitionInfoContentsWrapper>
              {isUpdate ? (
                <ImageInput files={evidences} setFiles={setEvidences} />
              ) : (
                complaintInstance?.evidences.map((evidence, index) => {
                  return (
                    <S.PetitionInfoContents>
                      {evidence.fileName}
                    </S.PetitionInfoContents>
                  );
                })
              )}
            </S.PetitionInfoContentsWrapper>
          </div>
        </S.PetitionInfoWrapper>
      </S.PetitionWrapper>
    </S.Container>
  );
};

export default PetitionPage;
