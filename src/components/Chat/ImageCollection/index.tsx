/** @jsxImportSource @emotion/react */
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "../InfoCollection/style.ts";
import ImageInput from "@/components/Chat/ImageCollection/ImageInput/index.tsx";
import { Evidence } from "@/types/petition.ts";

type ImageCollectionProps = {
  initMessage: any; // MainPage에서 전달
  situationDescription: string;
};

const ImageCollection = ({
  initMessage,
  situationDescription,
}: ImageCollectionProps) => {
  const navigate = useNavigate();
  const footerRef = useRef<HTMLDivElement>(null);
  const [formHeight, setFormHeight] = useState(0);

  const [files, setFiles] = useState<(File | Evidence)[]>([]);

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

    navigate("/init-chat", { state: { requestBody, files } });
  };

  return (
    <S.Container
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <S.FormContainer>
        <S.FormWrapper formHeight={formHeight}>
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
                  <S.Highlight>증거 자료 |</S.Highlight>
                  <S.ResponsiveBr /> 피해 상황에 대한 증거 자료를 가지고 있나요?
                  관련 증거 자료를 업로드해 주세요.
                </S.Label>
                <S.ExampleText>
                  예시. 판매 게시글 캡처, 판매자와의 대화(채팅) 내역, 계좌이체
                  영수증 및 송금 내역, 판매자 계좌번호 및 닉네임(확보 시), 기타
                  판매자 관련 정보(확보 시) 이미지를 올려주세요.
                </S.ExampleText>
                <ImageInput files={files} setFiles={setFiles} />
              </S.FormGroup>
            </S.FormGroupWrapper>
          </S.Form>
        </S.FormWrapper>
      </S.FormContainer>

      <S.FooterWrapper ref={footerRef}>
        <S.StartButton onClick={handleSubmit}>사건 제출하기</S.StartButton>
        <S.Footer>
          폴리가 제공한 법률상담에 대해 어떠한 민사, 형사상의 책임도 지지
          않습니다. 최종 결정에는 반드시 변호사의 조력을 받으십시오.
        </S.Footer>
      </S.FooterWrapper>
    </S.Container>
  );
};

export default ImageCollection;
