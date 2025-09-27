import { useEffect, useLayoutEffect, useState } from "react";
import { useRef } from "react";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import * as S from "./style";
import close from "@/assets/close.svg";
import exportIcon from "@/assets/exportIcon.svg";
import edit from "@/assets/edit.svg";
import petitionUpdateIcon from "@/assets/petition-update.svg";
import Complaint, { ComplaintData, Evidence } from "@/types/petition";
import buttonCheck from "@/assets/button-check.svg";
import "dayjs/locale/ko";
import Input from "@/components/Petition/Input";
import ImageInput from "@/components/Chat/ImageCollection/ImageInput";
import DropdownInput from "@/components/Petition/DropdownInput";
import { getPetition, updatePetition } from "@/api/petition";

// 성공 모달 프롭 타입
interface SuccessModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

// 성공 모달 컴포넌트
const SuccessModal = ({ onClose, onConfirm }: SuccessModalProps) => (
  <S.ModalBackground onClick={onClose}>
    <S.ModalContainer onClick={(e) => e.stopPropagation()}>
      <S.ModalIcon>
        <img src={petitionUpdateIcon} alt="Update Success" />
      </S.ModalIcon>
      <S.ModalTitle>진정서 수정을 완료하였습니다.</S.ModalTitle>
      <S.ModalText>
        확인 버튼을 누르시면
        <br />
        진정서 확인 페이지로 이동합니다.
      </S.ModalText>
      <S.ModalButton onClick={onConfirm}>확인</S.ModalButton>
    </S.ModalContainer>
  </S.ModalBackground>
);

const PetitionPage = () => {
  const { id } = useParams<{ id: string }>();
  const [complaint, setComplaint] = useState<Complaint>(
    new Complaint({
      complaintDate: "",
      complainant: { name: "", address: "", contact: "" },
      respondent: { name: "", contact: "", specialNotes: "" },
      crimeType: "",
      crimeDetail: "",
      siteName: "",
      siteUrl: "",
      crimeName: "",
      intentToPunish: "",
      incidentDescription: "",
      incidentDetails: "",
      evidences: [],
    })
  );

  const [isUpdate, setIsUpdate] = useState(false);
  const [isFloatingVisible, setIsFloatingVisible] = useState(false);

  const [complainantName, setComplainantName] = useState(
    complaint?.complainant?.name || ""
  );
  const [complainantAddress, setComplainantAddress] = useState(
    complaint?.complainant?.address || ""
  );
  const [complainantContact, setComplainantContact] = useState(
    complaint?.complainant?.contact || ""
  );
  const [respondentName, setRespondentName] = useState(
    complaint?.respondent?.name || ""
  );
  const [respondentContact, setRespondentContact] = useState(
    complaint?.respondent?.contact || ""
  );
  const [respondentSpecialNotes, setRespondentSpecialNotes] = useState(
    complaint?.respondent?.specialNotes || ""
  );

  const [crimeType, setCrimeType] = useState(complaint?.crimeType || "");
  const [crimeDetail, setCrimeDetail] = useState(complaint?.crimeDetail || "");
  const [siteName, setSiteName] = useState(complaint?.siteName || "");
  const [siteUrl, setSiteUrl] = useState(complaint?.siteUrl || "");
  const [crimeName, setCrimeName] = useState(complaint?.crimeName || "");
  const [intentToPunish, setIntentToPunish] = useState(
    complaint?.intentToPunish || ""
  );
  const [incidentDescription, setIncidentDescription] = useState(
    complaint?.incidentDescription || ""
  );
  const [incidentDetails, setIncidentDetails] = useState(
    complaint?.incidentDetails || ""
  );

  const [evidences, setEvidences] = useState<(File | Evidence)[]>(
    complaint?.evidences || []
  );

  const [complaintDate, setComplaintDate] = useState<string | null>(
    complaint?.complaintDate || null
  );

  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false); // 모달 상태 추가

  const navigate = useNavigate();

  const pdfRef = useRef<HTMLDivElement>(null);
  const buttonWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFloatingVisible(!entry.isIntersecting);
      },
      { rootMargin: "-56px 0px 0px 0px" }
    );

    const currentRef = buttonWrapperRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const putPetition = async () => {
    const serverPayload: ComplaintData = {
      complainant: {
        name: complainantName,
        address: complainantAddress,
        contact: complainantContact,
      },
      respondent: {
        name: respondentName,
        contact: respondentContact,
        specialNotes: respondentSpecialNotes,
      },
      crimeType,
      crimeDetail,
      siteName,
      siteUrl,
      crimeName,
      intentToPunish,
      incidentDescription,
      incidentDetails,
      evidences,
      complaintDate: complaint?.complaintDate || "",
    };

    const payloadString = JSON.stringify(serverPayload);
    await updatePetition(Number(id), payloadString);
  };

  const toggleIsUpdate = async () => {
    try {
      if (isUpdate) {
        await putPetition();
        setIsUpdate(false); // 수정 모드 종료
        setIsSuccessModalVisible(true); // 성공 모달 띄우기
      } else {
        setIsUpdate(true); // 수정 모드 시작
      }
    } catch (err) {
      console.error("Failed to update petition:", err);
    }
  };

  const handleConfirmModal = () => {
    setIsSuccessModalVisible(false);
    // 필요하다면 여기서 다른 페이지로 navigate
    // navigate(`/petition/${id}`); // 예: 확인 페이지로 이동
  };

  const handleDownload = async () => {
    if (!pdfRef.current) return;

    const isMobile = window.innerWidth < 1024;
    const pdfElement = pdfRef.current;

    if (!isMobile) {
      // 데스크톱 환경에서는 기존 로직을 사용합니다.
      try {
        const canvas = await html2canvas(pdfElement, {
          ignoreElements: (element) =>
            element.classList.contains("pdf-ignore"),
        });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210;
        const pageHeight = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        pdf.save("download.pdf");
      } catch (error) {
        console.error("PDF generation failed:", error);
      }
      return;
    }

    // 모바일 환경에서는 UI 깨짐 방지를 위해 복제해서 사용합니다.
    const clone = pdfElement.cloneNode(true) as HTMLElement;
    clone.style.position = "absolute";
    clone.style.left = "-9999px";
    clone.style.top = "0px";
    clone.style.width = "960px";
    clone.style.padding = "0px 20px"
    document.body.appendChild(clone);

    try {
      const canvas = await html2canvas(clone, {
        ignoreElements: (element) => element.classList.contains("pdf-ignore"),
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save("download.pdf");
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      document.body.removeChild(clone);
    }
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

  // 진정서 조회
  useEffect(() => {
    if (!id) return;

    const fetchPetition = async () => {
      try {
        const petition = await getPetition(Number(id));
        let parsedPetition;
        if (typeof petition === "string") {
          parsedPetition = JSON.parse(petition);
        } else {
          parsedPetition = petition;
        }

        const dataToUse = parsedPetition.extracted_data ?? parsedPetition;
        const complaintObj = new Complaint(dataToUse);
        setComplaint(complaintObj);
      } catch (err) {
        console.error("getPetition error:", err);
      }
    };

    fetchPetition();
  }, [id]);

  useEffect(() => {
    if (!complaint) return;

    setComplainantName(complaint.complainant?.name || "");
    setComplainantAddress(complaint.complainant?.address || "");
    setComplainantContact(complaint.complainant?.contact || "");
    setRespondentName(complaint.respondent?.name || "");
    setRespondentContact(complaint.respondent?.contact || "");
    setRespondentSpecialNotes(complaint.respondent?.specialNotes || "");
    setCrimeType(complaint.crimeType || "");
    setCrimeDetail(complaint.crimeDetail || "");
    setSiteName(complaint.siteName || "");
    setSiteUrl(complaint.siteUrl || "");
    setCrimeName(complaint.crimeName || "");
    setIntentToPunish(complaint.intentToPunish || "");
    setIncidentDescription(complaint.incidentDescription || "");
    setIncidentDetails(complaint.incidentDetails || "");
    setEvidences(complaint.evidences || []);
    setComplaintDate(complaint.complaintDate || null);
  }, [complaint]);

  const handleData = (data: string) => {
    return data.length == 0 ? "미입력" : data;
  };

  return (
    <S.Container>
      {isSuccessModalVisible && (
        <SuccessModal
          onClose={() => setIsSuccessModalVisible(false)}
          onConfirm={handleConfirmModal}
        />
      )}

      <S.PetitionWrapper>
        <S.PdfWrapper ref={pdfRef}>
          {/* 헤더 영역 */}
          <S.PetitionHeaderWrapper className="pdf-ignore">
            <span>작성완료</span>
            <button
              onClick={() => {
                navigate(-1);
              }}
            >
              <img src={close} alt="진정서 끄기" />
            </button>
          </S.PetitionHeaderWrapper>
          {/* 진정서 제목 영역 */}
          <S.PetitionTitleWrapper>
            <div>
              <h3>
                진정서 : <S.ResponsiveBr isUpdate={isUpdate}></S.ResponsiveBr>
                <span>당근마켓 사기 사건</span>
              </h3>
            </div>

            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
              <S.PetionTitleContents>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
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
                        value={complaintDate ? dayjs(complaintDate) : null}
                        onChange={(newDate) => {
                          complaint?.update({
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
                                width: "100%",
                                maxWidth: "450px",
                                borderRadius: "10px",
                              },
                            },
                          },
                        }}
                        sx={{
                          width: "100%",
                          maxWidth: "450px",
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
                    <span>{complaint.complaintDate}</span>
                  )}
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                  }}
                  className="pdf-ignore"
                >
                  <S.PetitionButtonWrapper ref={buttonWrapperRef}>
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
                        <button onClick={handleDownload}>
                          <img src={exportIcon} alt="진정서 내보내기" />
                          <span>내보내기</span>
                        </button>
                      </>
                    )}
                  </S.PetitionButtonWrapper>
                </div>
              </S.PetionTitleContents>
            </LocalizationProvider>
          </S.PetitionTitleWrapper>

          {/* 사건 기본 정보 */}
          <S.PetitionInfoWrapper
            style={{ borderTop: "1px solid var(--grey-3, #e8ecf1)" }}
          >
            <h3>사건 기본 정보</h3>

            <S.PetitionInfoFlex>
              <S.PetitionDefalutInfoWrapper>
                <S.PetitionInfoTitle>진정인(본인)</S.PetitionInfoTitle>

                <S.BasicColumnWrapper>
                  <S.BasicWrapper isUpdate={isUpdate}>
                    <S.PetitionInfoContents>이름:</S.PetitionInfoContents>
                    {isUpdate ? (
                      <Input
                        value={complainantName}
                        setValue={(newValue) => setComplainantName(newValue)}
                      />
                    ) : (
                      <S.PetitionInfoContents>
                        {handleData(complainantName)}
                      </S.PetitionInfoContents>
                    )}
                  </S.BasicWrapper>

                  <S.BasicWrapper isUpdate={isUpdate}>
                    <S.PetitionInfoContents>주소:</S.PetitionInfoContents>
                    {isUpdate ? (
                      <Input
                        value={complainantAddress}
                        setValue={(newValue) => setComplainantAddress(newValue)}
                      />
                    ) : (
                      <S.PetitionInfoContents>
                        {handleData(complainantAddress)}
                      </S.PetitionInfoContents>
                    )}
                  </S.BasicWrapper>

                  <S.BasicWrapper isUpdate={isUpdate}>
                    <S.PetitionInfoContents>연락처:</S.PetitionInfoContents>
                    {isUpdate ? (
                      <Input
                        value={complainantContact}
                        setValue={(newValue) => setComplainantContact(newValue)}
                      />
                    ) : (
                      <S.PetitionInfoContents>
                        {handleData(complainantContact)}
                      </S.PetitionInfoContents>
                    )}
                  </S.BasicWrapper>
                </S.BasicColumnWrapper>
              </S.PetitionDefalutInfoWrapper>
              <S.PetitionDefalutInfoWrapper>
                <S.PetitionInfoTitle>피진정인(가해자)</S.PetitionInfoTitle>

                <S.BasicColumnWrapper>
                  <S.BasicWrapper isUpdate={isUpdate}>
                    <S.PetitionInfoContents>
                      이름(닉네임):
                    </S.PetitionInfoContents>
                    {isUpdate ? (
                      <Input
                        value={respondentName}
                        setValue={(newValue) => setRespondentName(newValue)}
                      />
                    ) : (
                      <S.PetitionInfoContents>
                        {handleData(respondentName)}
                      </S.PetitionInfoContents>
                    )}
                  </S.BasicWrapper>
                  <S.BasicWrapper isUpdate={isUpdate}>
                    <S.PetitionInfoContents>연락처:</S.PetitionInfoContents>
                    {isUpdate ? (
                      <Input
                        value={respondentContact}
                        setValue={(newValue) => setRespondentContact(newValue)}
                      />
                    ) : (
                      <S.PetitionInfoContents>
                        {handleData(respondentContact)}
                      </S.PetitionInfoContents>
                    )}
                  </S.BasicWrapper>
                  <S.BasicWrapper isUpdate={isUpdate}>
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
                        {handleData(respondentSpecialNotes)}
                      </S.PetitionInfoContents>
                    )}
                  </S.BasicWrapper>
                </S.BasicColumnWrapper>
              </S.PetitionDefalutInfoWrapper>
            </S.PetitionInfoFlex>
          </S.PetitionInfoWrapper>

          {/* 사건 유형 정보 */}
          <S.PetitionInfoWrapper>
            <h3>사건 유형 정보</h3>
            <S.PetitionInfoTitle>범죄유형</S.PetitionInfoTitle>

            <S.ColumnWrapper>
              <S.Wrapper isUpdate={isUpdate}>
                <S.PetitionInfoContentsTitle>
                  범죄유형
                </S.PetitionInfoContentsTitle>
                <S.ResponsiveBr isUpdate={isUpdate} />
                <S.PetitionInfoContents>{crimeType}</S.PetitionInfoContents>
              </S.Wrapper>

              <S.Wrapper isUpdate={isUpdate}>
                <S.PetitionInfoContentsTitle>
                  세부유형
                </S.PetitionInfoContentsTitle>
                <S.ResponsiveBr isUpdate={isUpdate} />
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
            <S.RowColumnWrapper isUpdate={isUpdate}>
              {/* 피해장소 */}
              <div style={{ flex: "1 1 0", minWidth: 0 }}>
                <S.PetitionInfoTitle>피해장소</S.PetitionInfoTitle>

                <S.ColumnWrapper>
                  <S.Wrapper isUpdate={isUpdate}>
                    <S.PetitionInfoContentsTitle>
                      사이트명
                    </S.PetitionInfoContentsTitle>
                    <S.ResponsiveBr isUpdate={isUpdate} />
                    {isUpdate ? (
                      <Input
                        value={siteName}
                        setValue={(newValue) => setSiteName(newValue)}
                      />
                    ) : (
                      <S.PetitionInfoContents>
                        {handleData(siteName)}
                      </S.PetitionInfoContents>
                    )}
                  </S.Wrapper>
                  <S.Wrapper isUpdate={isUpdate}>
                    <S.PetitionInfoContentsTitle>
                      사이트 주소
                    </S.PetitionInfoContentsTitle>
                    <S.ResponsiveBr isUpdate={isUpdate} />
                    {isUpdate ? (
                      <Input
                        value={siteUrl}
                        setValue={(newValue) => setSiteUrl(newValue)}
                      />
                    ) : (
                      <S.PetitionInfoContents>
                        {handleData(siteUrl)}
                      </S.PetitionInfoContents>
                    )}
                  </S.Wrapper>
                </S.ColumnWrapper>
              </div>
              {/* 진정취지 */}

              <div style={{ flex: "1 1 0", minWidth: 0 }}>
                <S.PetitionInfoTitle>진정취지</S.PetitionInfoTitle>

                <S.ColumnWrapper>
                  <S.Wrapper isUpdate={isUpdate}>
                    <S.PetitionInfoContentsTitle>
                      진정죄명
                    </S.PetitionInfoContentsTitle>
                    <S.ResponsiveBr isUpdate={isUpdate} />
                    {isUpdate ? (
                      <Input
                        value={crimeName}
                        setValue={(newValue) => setCrimeName(newValue)}
                      />
                    ) : (
                      <S.PetitionInfoContents>
                        {handleData(crimeName)}
                      </S.PetitionInfoContents>
                    )}
                  </S.Wrapper>
                  <S.Wrapper isUpdate={isUpdate}>
                    <S.PetitionInfoContentsTitle>
                      처벌의사
                    </S.PetitionInfoContentsTitle>
                    <S.ResponsiveBr isUpdate={isUpdate} />
                    {isUpdate ? (
                      <Input
                        value={intentToPunish}
                        setValue={(newValue) => setIntentToPunish(newValue)}
                      />
                    ) : (
                      <S.PetitionInfoContents>
                        {handleData(intentToPunish)}
                      </S.PetitionInfoContents>
                    )}
                  </S.Wrapper>
                </S.ColumnWrapper>
              </div>
            </S.RowColumnWrapper>
            {/* 피해상황 */}
            <S.PetitionInfoTitle>피해상황</S.PetitionInfoTitle>

            <S.ColumnWrapper>
              <S.Wrapper isUpdate={isUpdate}>
                <S.PetitionInfoContentsTitle>
                  피해사실
                </S.PetitionInfoContentsTitle>
                <S.ResponsiveBr isUpdate={isUpdate} />
                {isUpdate ? (
                  <Input
                    value={incidentDescription}
                    setValue={(newValue) => setIncidentDescription(newValue)}
                  />
                ) : (
                  <S.PetitionInfoContents>
                    {handleData(incidentDescription)}
                  </S.PetitionInfoContents>
                )}
              </S.Wrapper>
              <S.Wrapper isUpdate={isUpdate}>
                <S.PetitionInfoContentsTitle>
                  피해상황
                </S.PetitionInfoContentsTitle>
                <S.ResponsiveBr isUpdate={isUpdate} />
                {isUpdate ? (
                  <Input
                    value={incidentDetails}
                    setValue={(newValue) => setIncidentDetails(newValue)}
                    multiline={true}
                  />
                ) : (
                  <S.PetitionInfoContents>
                    {handleData(incidentDetails)}
                  </S.PetitionInfoContents>
                )}
              </S.Wrapper>
            </S.ColumnWrapper>
          </S.PetitionInfoWrapper>

          {/* 부가 정보 */}
          <S.PetitionInfoWrapper>
            <h3>부가 정보</h3>
            <S.PetitionInfoTitle>증거자료</S.PetitionInfoTitle>

            <S.InputWrapper>
              <S.PetitionInfoContentsTitleWrapper>
                <S.PetitionInfoContentsTitle>
                  증거자료
                </S.PetitionInfoContentsTitle>
              </S.PetitionInfoContentsTitleWrapper>

              <S.PetitionInfoContentsWrapper>
                {isUpdate ? (
                  <ImageInput
                    files={evidences}
                    setFiles={setEvidences}
                    isBlur={false}
                  />
                ) : (
                  complaint?.evidences
                    ?.filter((evidence) => evidence.fileName && evidence.fileUrl)
                    .map((evidence, index) => (
                      <S.PetitionInfoContents
                        key={index}
                        onClick={() => window.open(evidence.fileUrl, "_blank")}
                      >
                        {evidence.fileName}
                      </S.PetitionInfoContents>
                    ))
                )}
              </S.PetitionInfoContentsWrapper>
            </S.InputWrapper>
          </S.PetitionInfoWrapper>
        </S.PdfWrapper>
      </S.PetitionWrapper>
      <S.ResponsiveBr></S.ResponsiveBr>
      <S.ResponsiveBr></S.ResponsiveBr>
      <S.ResponsiveBr></S.ResponsiveBr>
      <S.ResponsiveBr></S.ResponsiveBr>
      <S.ResponsiveBr></S.ResponsiveBr>
      {isFloatingVisible && (
        <S.FloatingContainer className={isFloatingVisible ? "visible" : ""}>
          <S.FloatingContent>
            <S.FloatingButtonWrapper>
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
                  <button onClick={handleDownload}>
                    <img src={exportIcon} alt="진정서 내보내기" />
                    <span>내보내기</span>
                  </button>
                </>
              )}
            </S.FloatingButtonWrapper>
          </S.FloatingContent>
            <S.FloatingClose>
              <button onClick={() => navigate(-1)}>
                <img src={close} alt="이전 페이지로 가기" />
              </button>
            </S.FloatingClose>
        </S.FloatingContainer>
      )}
    </S.Container>
  );
};

export default PetitionPage;
