/** @jsxImportSource @emotion/react */
import * as S from "./style";
import { visuallyHidden } from "@/pages/HomePage/styles";

const Main = () => (
  <S.Container>
    <h1 css={visuallyHidden}>사이버 사기 상담 및 진정서 작성 도우미 폴리</h1>
    <S.LogoContainer>
      <img
        src="/poli-main-sm.webp"
        alt="POLI"
        fetchpriority="high"
        loading="eager"
        width={385}
        height={220}
      />
    </S.LogoContainer>
    <S.Title>
      사이버 사기, 폴리와 함께 <S.ResponsiveBr />
      빠르고 든든하게
      <br />
      상담부터 진정서까지 <S.ResponsiveBr />한 번에 해결하세요!
    </S.Title>
  </S.Container>
);

export default Main;
