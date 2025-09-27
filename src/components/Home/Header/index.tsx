/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as S from "./style";
import poliText from "@/assets/poli-text.svg";
import poliSmText from "@/assets/poli-text-sm.svg"; // 모바일 로고 import
import { media } from "@/constants/media";
import useWindowWidth from "@/hooks/useWindowWidth"; // hook import

const Header = () => {
  const width = useWindowWidth();
  const isMobile = width <= 600;

  return (
    <header css={S.Header}>
      <S.Container>
        <S.LogoContainer>
          <img src={isMobile ? poliSmText : poliText} alt="POLI-TEXT" />
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
};

export default Header;
