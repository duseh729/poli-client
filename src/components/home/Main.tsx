/** @jsxImportSource @emotion/react */
import * as S from "./Main.ts";
import poliLgLogo from "@/assets/poli-lg-logo.svg";
import poliLgText from "@/assets/poli-lg-text.svg";

const Main = () => (
  <main css={S.mainStyle}>
    <S.LogoContainer>
      <img src={poliLgLogo} alt="POLI" css={S.logoStyle} />
      <img src={poliLgText} alt="POLI Text" css={S.textLogoStyle} />
    </S.LogoContainer>
    <S.TitleContainer>
      <S.Title>사이버범죄 대응의 모든 것을 해결해주는 POLI,</S.Title>
      <S.Subtitle>상담부터 진술서 작성까지 한 번에 경험해보세요.</S.Subtitle>
    </S.TitleContainer>
  </main>
);

export default Main;