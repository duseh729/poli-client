/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router-dom";
import * as S from "./LinkButton.ts";
import blueRightArrow from "@/assets/blue-right-arrow.svg";

const LinkButton = () => {
  const navigate = useNavigate();

  return (
    <S.Button onClick={() => navigate("/login")}>
      시작하기
      <img src={blueRightArrow} alt="Arrow" css={S.arrowStyle} />
    </S.Button>
  );
};

export default LinkButton;