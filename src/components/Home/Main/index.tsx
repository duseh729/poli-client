/** @jsxImportSource @emotion/react */
import * as S from "./style";
import poliMain from "@/assets/poli-main-sm.png";

const Main = () => (
  <S.Container>
    <S.LogoContainer>
      <img src={poliMain} alt="POLI" />
    </S.LogoContainer>
    <S.Title>
      사이버범죄 대응의 모든 것을 해결해주는 POLI,
      <br />
      상담부터 진술서 작성까지 한 번에 경험해보세요.
    </S.Title>
  </S.Container>
);

export default Main;
