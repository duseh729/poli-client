import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { media } from "@/constants/media";

export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h1`
  color: #2e3034;
  text-align: center;
  font-family: "Wanted Sans";
  font-size: 42px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 33.6px */

  ${media.mobile} {
    /* Title/1 */
    font-size: 26px;
    font-weight: 600;
    line-height: 150%; /* 39px */
  }
`;

export const ResponsiveBr = styled.br`
  @media (min-width: 600px) {
    display: none;
  }
`;

export const TextLogo = css`
  height: 150px;
  width: 340px;
`;

export const Container = styled.main`
  margin-top: 50px;
`;
