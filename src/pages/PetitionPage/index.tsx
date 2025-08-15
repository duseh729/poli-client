import * as S from "./style";
import close from "@/assets/close.svg";
import exportIcon from "@/assets/exportIcon.svg";
import edit from "@/assets/edit.svg";
import Complaint, { ComplaintData } from "@/types/petition";

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
  crimeDetail: "인터넷 사기",
  siteName: "중고나라",
  siteUrl: "https://joonggonara.com",
  crimeName: "사기죄",
  intentToPunish: true,
  incidentDescription: "피해자가 거래 대금을 송금했으나 물품을 받지 못함.",
  incidentDetails:
    "2025년 8월 1일, 중고나라를 통해 카메라 거래를 진행. 김철수라는 인물에게 50만원을 송금했으나 물품을 보내주지 않고 잠적함.",
  evidences: [
    { fileName: "송금내역.png", fileUrl: "/evidence/송금내역.png" },
    { fileName: "채팅기록.jpg", fileUrl: "/evidence/채팅기록.jpg" },
  ],
};

// 클래스 인스턴스 생성 예시
const complaintInstance = new Complaint(mockComplaint);

const PetitionPage = () => {
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
              <span>2025.08.26(화)</span>
            </div>

            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <div style={{ display: "flex", gap: 8 }}>
                <button>
                  <img src={edit} alt="진정서 수정" />
                  <span>내용 수정</span>
                </button>
                <button>
                  <img src={exportIcon} alt="진정서 내보내기" />
                  <span>내보내기</span>
                </button>
              </div>
            </div>
          </S.PetionTitleContents>
        </S.PetitionTitleWrapper>

        {/* 사건 기본 정보 */}
        <S.PetitionInfoWrapper
          style={{ borderTop: "1px solid var(--grey-3, #e8ecf1)" }}
        >
          <h3>사건 기본 정보</h3>

          <div style={{ display: "flex", gap: 28 }}>
            <S.PetitionDefalutInfoWrapper>
              <S.PetitionInfoTitle>진정인(본인)</S.PetitionInfoTitle>

              <S.BasicColumnWrapper>
                <S.BasicWrapper>
                  <S.PetitionInfoContents>이름:</S.PetitionInfoContents>
                  <S.PetitionInfoContents>
                    {complaintInstance.complainant.name}
                  </S.PetitionInfoContents>
                </S.BasicWrapper>

                <S.BasicWrapper>
                  <S.PetitionInfoContents>주소:</S.PetitionInfoContents>
                  <S.PetitionInfoContents>
                    {complaintInstance.complainant.address}
                  </S.PetitionInfoContents>
                </S.BasicWrapper>

                <S.BasicWrapper>
                  <S.PetitionInfoContents>연락처:</S.PetitionInfoContents>
                  <S.PetitionInfoContents>
                    {complaintInstance.complainant.contact}
                  </S.PetitionInfoContents>
                </S.BasicWrapper>
              </S.BasicColumnWrapper>
            </S.PetitionDefalutInfoWrapper>
            <S.PetitionDefalutInfoWrapper>
              <S.PetitionInfoTitle>피진정인(가해자)</S.PetitionInfoTitle>

              <S.BasicColumnWrapper>
                <S.BasicWrapper>
                  <S.PetitionInfoContents>이름(닉네임):</S.PetitionInfoContents>
                  <S.PetitionInfoContents>
                    {complaintInstance.respondent.name}
                  </S.PetitionInfoContents>
                </S.BasicWrapper>
                <S.BasicWrapper>
                  <S.PetitionInfoContents>연락처:</S.PetitionInfoContents>
                  <S.PetitionInfoContents>
                    {complaintInstance.respondent.contact}
                  </S.PetitionInfoContents>
                </S.BasicWrapper>
                <S.BasicWrapper>
                  <S.PetitionInfoContents>특이사항:</S.PetitionInfoContents>
                  <S.PetitionInfoContents>
                    {complaintInstance.respondent.specialNotes}
                  </S.PetitionInfoContents>
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
              <S.PetitionInfoContents>
                {complaintInstance.crimeType}
              </S.PetitionInfoContents>
            </S.Wrapper>

            <S.Wrapper>
              <S.PetitionInfoContentsTitle>
                세부유형
              </S.PetitionInfoContentsTitle>
              <S.PetitionInfoContents>
                {complaintInstance.crimeDetail}
              </S.PetitionInfoContents>
            </S.Wrapper>
          </S.ColumnWrapper>
        </S.PetitionInfoWrapper>

        {/* 상세 피해 상황 */}
        <S.PetitionInfoWrapper>
          <h3>상세 피해 상황</h3>

          {/* 피해장소, 진정취지 wrapper */}
          <div style={{ display: "flex" }}>
            {/* 피해장소 */}
            <div style={{ flex: 1 }}>
              <S.PetitionInfoTitle>피해장소</S.PetitionInfoTitle>

              <S.ColumnWrapper>
                <S.Wrapper>
                  <S.PetitionInfoContentsTitle>사이트명</S.PetitionInfoContentsTitle>
                  <S.PetitionInfoContents>
                    {complaintInstance.siteName}
                  </S.PetitionInfoContents>
                </S.Wrapper>
                <S.Wrapper>
                  <S.PetitionInfoContentsTitle>사이트 주소</S.PetitionInfoContentsTitle>
                  <S.PetitionInfoContents>
                    {complaintInstance.siteUrl}
                  </S.PetitionInfoContents>
                </S.Wrapper>
              </S.ColumnWrapper>
            </div>
            {/* 진정취지 */}

            <div style={{ flex: 1 }}>
              <S.PetitionInfoTitle>진정취지</S.PetitionInfoTitle>

              <div style={{ display: "flex" }}>
                <S.ColumnWrapper>
                  <S.Wrapper>
                    <S.PetitionInfoContentsTitle>진정죄명</S.PetitionInfoContentsTitle>
                    <S.PetitionInfoContents>
                      {complaintInstance.crimeName}
                    </S.PetitionInfoContents>
                  </S.Wrapper>
                  <S.Wrapper>
                    <S.PetitionInfoContentsTitle>처벌의사</S.PetitionInfoContentsTitle>
                    <S.PetitionInfoContents>
                      {complaintInstance.intentToPunish
                        ? "처벌 원함"
                        : "처벌 원치 않음"}
                    </S.PetitionInfoContents>
                  </S.Wrapper>
                </S.ColumnWrapper>
              </div>
            </div>
          </div>
          {/* 피해상황 */}
          <S.PetitionInfoTitle>피해상황</S.PetitionInfoTitle>

          <S.ColumnWrapper>
            <S.Wrapper>
              <S.PetitionInfoContentsTitle>피해사실</S.PetitionInfoContentsTitle>
              <S.PetitionInfoContents>
                {complaintInstance.incidentDescription}
              </S.PetitionInfoContents>
            </S.Wrapper>
            <S.Wrapper>
              <S.PetitionInfoContentsTitle>피해상황</S.PetitionInfoContentsTitle>
              <S.PetitionInfoContents>
                {complaintInstance.incidentDetails}
              </S.PetitionInfoContents>
            </S.Wrapper>
          </S.ColumnWrapper>
        </S.PetitionInfoWrapper>

        {/* 부가 정보 */}
        <S.PetitionInfoWrapper>
          <h3>부가 정보</h3>
          <S.PetitionInfoTitle>증거자료</S.PetitionInfoTitle>

          <div style={{ display: "flex" }}>
            <S.PetitionInfoContentsTitleWrapper>
              <S.PetitionInfoContentsTitle>증거자료</S.PetitionInfoContentsTitle>
            </S.PetitionInfoContentsTitleWrapper>

            <S.PetitionInfoContentsWrapper>
              {complaintInstance?.evidences.map((evidence, index) => {
                return (
                  <S.PetitionInfoContents>
                    {evidence.fileName}
                  </S.PetitionInfoContents>
                );
              })}
            </S.PetitionInfoContentsWrapper>
          </div>
        </S.PetitionInfoWrapper>
      </S.PetitionWrapper>
    </S.Container>
  );
};

export default PetitionPage;
