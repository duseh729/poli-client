/** @jsxImportSource @emotion/react */
import * as S from "./style";
import poliMain from "@/assets/poli-main-sm.svg";

const Main = () => (
  <S.Container>
    <S.LogoContainer>
      <img
        src={poliMain}
        alt="POLI"
        onError={(e) => {
          e.currentTarget.onerror = null; // 무한 루프 방지
          e.currentTarget.src = "/poli-main-sm.svg"; // 대체 이미지 경로
        }}
      />
    </S.LogoContainer>
    <S.Title>
      사이버 사기, 폴리와 함께 빠르고 든든하게
      <br />
      상담부터 진정서까지 한 번에 해결하세요!
    </S.Title>
  </S.Container>
);

export default Main;
