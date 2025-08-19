import { useRef, useState } from "react";
import toast from "react-hot-toast";
import * as S from "./style";
import poliInput from "@/assets/poli-input.svg";
import check from "@/assets/check.svg";
import cancel from "@/assets/cancel.svg";
import { COLORS } from "@/constants/color.ts";

export interface Evidence {
  fileName: string;
  fileUrl: string;
}

interface ImageInputProps {
  files?: (File | Evidence)[];
  setFiles: (files: (File | Evidence)[]) => void;
}

const MAX_FILE_SIZE = 400 * 1024 * 1024;
const allowedTypes = [
  "image/heic",
  "application/pdf",
  "image/jpg",
  "image/jpeg",
  "image/png",
];

const ImageInput = ({ files = [], setFiles }: ImageInputProps) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = (e: any) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const isValidFile = (file: File) => {
    const allowedExtensions = ["heic", "pdf", "jpg", "jpeg", "png"];
    const ext = file.name.split(".").pop()?.toLowerCase() || "";
    return allowedExtensions.includes(ext);
  };

  const handleFiles = (inputFiles: File[]) => {
    const existingTotalSize = files.reduce((acc, f) => {
      if ("size" in f) return acc + f.size; // File인 경우만 size 합산
      return acc;
    }, 0);

    const newFilesTotalSize = inputFiles.reduce((acc, f) => acc + f.size, 0);
    if (existingTotalSize + newFilesTotalSize > MAX_FILE_SIZE) {
      toast.error("파일 총 용량이 400MB를 초과했습니다.");
      return;
    }

    for (const file of inputFiles) {
      if (!allowedTypes.includes(file.type) && !isValidFile(file)) {
        toast.error(`${file.name} 파일 형식은 지원하지 않습니다.`);
        return;
      }
    }

    setFiles([...files, ...inputFiles]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const inputFiles = Array.from(e.target.files);
    handleFiles(inputFiles);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleRemove = (index: number) => {
    if (!Array.isArray(files)) return; // files가 단일 File이면 무시
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div style={{ position: "relative" }}>
      <S.ImageInputContainer
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setDragActive(false);
        }}
        onDrop={handleDrop}
        style={{
          borderColor: dragActive ? COLORS.PRIMARY : undefined,
          background: dragActive ? "#E9F1FF" : undefined,
        }}
      >
        <img style={{ padding: 12 }} src={poliInput} alt="poli input" />
        <S.ImageInputText>
          업로드할 파일을 선택하거나 여기로 끌어다 놓으세요.
        </S.ImageInputText>
        <S.ImageInputLimitedText>
          업로드 가능한 파일 유형: heic, pdf, jpg, jpeg, png | 최대 400MB
        </S.ImageInputLimitedText>
        <S.ImageInputButton onClick={handleButtonClick}>
          찾기
        </S.ImageInputButton>
      </S.ImageInputContainer>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        multiple
      />

      <S.ImageInputWrapper>
        {Array.isArray(files) && files.length > 0
          ? files.map((f, index) => {
              const fileName = f instanceof File ? f.name : f.fileName;
              const fileUrl =
                f instanceof File ? URL.createObjectURL(f) : f.fileUrl;

              return (
                <>
                  <S.ImageInputList key={index}>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 4 }}
                    >
                      <img src={check} alt="check" />
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => window.open(fileUrl, "_blank")}
                      >
                        {fileName}
                      </span>
                    </div>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => handleRemove(index)}
                    >
                      <img src={cancel} alt="cancel" />
                    </div>
                  </S.ImageInputList>
                </>
              );
            })
          : null}
      </S.ImageInputWrapper>
      {files.length >= 4 ? <S.ImageInputListBlur /> : null}
    </div>
  );
};

export default ImageInput;
