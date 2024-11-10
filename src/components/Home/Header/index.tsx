/** @jsxImportSource @emotion/react */
import * as S from "./style";
import poliSmLogo from "@/assets/poli-sm-logo.svg";

const Header = () => (
  <header css={S.Header}>
    <S.Container>
      <S.LogoContainer>
        <S.Logo src={poliSmLogo} alt="POLI" />
        <S.LogoText>POLI</S.LogoText>
      </S.LogoContainer>
      <div>
        <S.StyledLink to="/login">로그인</S.StyledLink>
        <S.StyledLink to="/signup">회원가입</S.StyledLink>
      </div>
    </S.Container>
  </header>
);

export default Header;