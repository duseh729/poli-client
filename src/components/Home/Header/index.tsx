/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"; // css import 추가
import * as S from "./style";
import poliText from "@/assets/poli-text.svg";
import { media } from "@/constants/media";

const Header = () => (
  <header css={S.Header}>
    <S.Container>
      <S.LogoContainer>
        <img src={poliText} alt="POLI-TEXT" />
      </S.LogoContainer>
      <div>
        <S.StyledLink to="/login">로그인</S.StyledLink>
        <S.StyledLink
          to="/signup"
          // css prop을 사용하여 직접 스타일링
          css={css`
            ${media.mobile} {
              display: none;
            }
          `}
        >
          회원가입
        </S.StyledLink>
      </div>
    </S.Container>
  </header>
);

export default Header;