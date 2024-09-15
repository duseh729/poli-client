/** @jsxImportSource @emotion/react */
import * as S from "./Header.ts";
import poliSmLogo from "@/assets/poli-sm-logo.svg";

const Header = () => (
  <header css={S.headerStyle}>
    <S.Container>
      <div css={S.logoContainerStyle}>
        <img src={poliSmLogo} alt="POLI" css={S.logoStyle} />
        <span css={S.logoTextStyle}>POLI</span>
      </div>
      <div>
        <S.StyledLink to="/login">로그인</S.StyledLink>
        <S.StyledLink to="/signup">회원가입</S.StyledLink>
      </div>
    </S.Container>
  </header>
);

export default Header;