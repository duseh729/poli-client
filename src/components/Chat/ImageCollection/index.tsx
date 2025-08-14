/** @jsxImportSource @emotion/react */
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import poliInput from "@/assets/poli-input.svg";
import check from "@/assets/check.svg";
import cancel from "@/assets/cancel.svg";
import * as S from "../InfoCollection/style.ts";
import { COLORS } from "@/constants/color.ts";
import toast from "react-hot-toast";

type ImageCollectionProps = {
  initMessage: any; // MainPage에서 전달
  situationDescription: string;
};

const MAX_FILE_SIZE = 400 * 1024 * 1024;
// const MAX_FILE_SIZE = 1;

const allowedTypes = [
  "image/heic",
  "application/pdf",
  "image/jpg",
  "image/jpeg",
  "image/png",
];

const ImageCollection = ({
  initMessage,
  situationDescription,
}: ImageCollectionProps) => {
  const navigate = useNavigate();
  const footerRef = useRef<HTMLDivElement>(null);
  const [formHeight, setFormHeight] = useState(0);

  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = (e: any) => {
    e.preventDefault();
    fileInputRef.current?.click(); // 숨겨진 input 클릭
  };

  // 드래그 오버 시
  const handleDragOver = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  // 드래그 영역 벗어날 시
  const handleDragLeave = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  // 특정 확장자인지 검사
  const isValidFile = (file: File) => {
    const allowedExtensions = ["heic", "pdf", "jpg", "jpeg", "png"];
    const ext = file.name.split(".").pop()?.toLowerCase() || "";
    return allowedExtensions.includes(ext);
  };

  const handleFileChange = (e: any) => {
    const inputFiles: File[] = Array.from(e.target.files);

    // 기존에 있는 파일 크기 합산
    const existingTotalSize = files.reduce((acc, file) => acc + file.size, 0);
    // 새로 선택한 파일 크기 합산
    const newFilesTotalSize = inputFiles.reduce(
      (acc, file) => acc + file.size,
      0
    );
    const totalSize = existingTotalSize + newFilesTotalSize;

    // 용량 확인 로직
    if (totalSize > MAX_FILE_SIZE) {
      toast.error("파일 총 용량이 400MB를 초과했습니다.", {
        duration: 2000,
        style: {
          background: "#dc3545",
          color: "#fff",
          fontSize: "16px",
        },
      });
      e.target.value = ""; // 선택한 파일 초기화
      return;
    }
    // 특정 파일 확장자인지 검사하는 로직
    for (const file of inputFiles) {
      if (!allowedTypes.includes(file.type) && !isValidFile(file)) {
        toast.error(`${file.name} 파일 형식은 지원하지 않습니다.`, {
          duration: 3000,
          style: {
            background: "#dc3545",
            color: "#fff",
            fontSize: "16px",
          },
        });
        e.target.value = "";
        return;
      }
    }

    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 0) {
      setFiles((prev) => [...prev, ...inputFiles]);
    }
  };

  // 드롭 시
  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFiles: File[] = Array.from(e.dataTransfer.files);

    // 기존에 있는 파일 크기 합산
    const existingTotalSize = files.reduce((acc, file) => acc + file.size, 0);
    // 새로 선택한 파일 크기 합산
    const newFilesTotalSize = droppedFiles.reduce(
      (acc, file) => acc + file.size,
      0
    );
    const totalSize = existingTotalSize + newFilesTotalSize;

    if (totalSize > MAX_FILE_SIZE) {
      toast.error("파일 총 용량이 400MB를 초과했습니다.", {
        duration: 2000,
        style: {
          background: "#dc3545",
          color: "#fff",
          fontSize: "16px",
        },
      });
      return; // 드롭 무시
    }
    // 특정 파일 확장자인지 검사하는 로직
    for (const file of droppedFiles) {
      if (!allowedTypes.includes(file.type) && !isValidFile(file)) {
        toast.error(`${file.name} 파일 형식은 지원하지 않습니다.`, {
          duration: 3000,
          style: {
            background: "#dc3545",
            color: "#fff",
            fontSize: "16px",
          },
        });
        e.target.value = "";
        return;
      }
    }

    if (droppedFiles.length > 0) {
      setFiles((prev) => [...prev, ...droppedFiles]);
    }
  };

  useEffect(() => {
    if (footerRef.current) {
      setFormHeight(footerRef.current.offsetHeight);
    }
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const requestBody = {
      initMessage: JSON.stringify(initMessage),
      roomId: null,
      message: situationDescription,
    };

    navigate("/init-chat", { state: requestBody });
  };

  return (
    <S.Container
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <S.FormWrapper style={{ height: `calc(100vh - ${formHeight}px)` }}>
        <S.Form>
          <S.Title>
            <S.TitleText>
              상담을 시작하기에 앞서, 사건에 대한 정보를 입력해 주세요. (2/2)
            </S.TitleText>
          </S.Title>

          {/* initMessage 확인용 출력 */}
          <S.FormGroupWrapper>
            <S.FormGroup>
              <S.Label>
                <S.Highlight>증거 자료 |</S.Highlight> 피해 상황에 대한 증거
                자료를 가지고 있나요? 관련 증거 자료를 업로드해 주세요.
              </S.Label>
              <S.ExampleText>
                예시. 판매 게시글 캡처, 판매자와의 대화(채팅) 내역, 계좌이체
                영수증 및 송금 내역, 판매자 계좌번호 및 닉네임(확보 시), 기타
                판매자 관련 정보(확보 시) 이미지를 올려주세요.
              </S.ExampleText>
            </S.FormGroup>
            <S.ImageInputContainer
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              style={{
                borderColor: dragActive ? COLORS.PRIMARY : undefined,
                background: dragActive ? "#E9F1FF" : undefined,
              }}
            >
              <img
                style={{ padding: 12 }}
                src={poliInput}
                alt="poli input image"
              />
              <S.ImageInputText>
                업로드할 파일을 선택하거나 여기로 끌어다 놓으세요.
              </S.ImageInputText>
              <S.ImageInputLimitedText>
                업로드 가능한 파일 유형 : heic, pdf, jpg, jpeg, png | 최대
                400mb까지 업로드 가능
              </S.ImageInputLimitedText>
              <S.ImageInputButton
                onClick={handleButtonClick}
                style={{
                  background: dragActive
                    ? "linear-gradient(0deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.05) 100%), #E9F1FF"
                    : undefined,
                }}
              >
                증거 자료 찾기
              </S.ImageInputButton>
            </S.ImageInputContainer>

            {/* 숨겨진 파일 입력창 */}
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
              multiple
            />

            <div style={{ position: "relative" }}>
              <S.ImageInputWrapper>
                {files.length > 0 ? (
                  files.map((file, index) => {
                    const fileUrl = URL.createObjectURL(file);

                    return (
                      <S.ImageInputList key={index}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <img src={check} alt="check" />
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={() => window.open(fileUrl, "_blank")}
                          >
                            {file?.name}
                          </span>
                        </div>
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            setFiles(files.filter((_, i) => i !== index))
                          }
                        >
                          <img src={cancel} alt="cancel" />
                        </div>
                      </S.ImageInputList>
                    );
                  })
                ) : (
                  <div>파일이 없습니다</div>
                )}
              </S.ImageInputWrapper>
              <S.ImageInputListBlur />
            </div>
          </S.FormGroupWrapper>
        </S.Form>
      </S.FormWrapper>

      <S.FooterWrapper ref={footerRef}>
        <S.StartButton onClick={handleSubmit}>사건 제출하기</S.StartButton>
        <S.Footer>
          폴리의 역할은 정보를 제공하는데 있으며, 형사적 상담 및 법률 상담이
          아닙니다. 본 페이지는 법적 효력이 없습니다.
        </S.Footer>
      </S.FooterWrapper>
    </S.Container>
  );
};

export default ImageCollection;
