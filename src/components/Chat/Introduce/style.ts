import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { COLORS } from "@/constants/color";
import { media } from "@/constants/media";

export const ResponsiveBr = styled.br`
  @media (min-width: 600px) {
    display: none;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  ${media.mobile} {
    height: auto;
    padding: 24px 16px 8px 16px;
  }
`;

export const MainTitle = styled.h1`
  color: #2e3034;
  font-family: "Wanted Sans";
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 54px */

  ${media.mobile} {
    text-align: center;

    font-size: 30px;
    line-height: 140%; /* 42px */
  }
`;

export const Subtitle = styled.p`
  font-family: "Wanted Sans";
  font-size: 20px;
  color: #2e3034;
  font-weight: 500;
  line-height: 150%;
  text-align: center;

  ${media.mobile} {
    color: var(--grey-5, #808996);
    text-align: center;

    font-size: 16px;
    margin-bottom: 62px;
  }
`;

export const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 36px;
  margin: 32px 0 80px 0;

  ${media.mobile} {
    width: 100%;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 40px;
  }
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 240px;
  height: 256px;
  padding: 20px;
  box-sizing: border-box;
  border: 1px solid #a5c6ff;
  border-radius: 32px;
  cursor: pointer;

  ${media.mobile} {
    flex-direction: row;
    width: 100%;
    height: 100%;
    padding: 12px;
    align-items: flex-start;
    justify-content: flex-start;
    border-radius: 8px;
    gap: 12px;
  }
`;

export const CardIcon = styled.img`
  width: 40px;
  height: 40px;

  ${media.mobile} {
    width: 24px;
    height: 24px;
  }
`;

export const MoblieCardWrapper = styled.div`
  ${media.mobile} {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
`;
export const CardName = styled.p`
  color: #808996;
  font-size: 14px;
  font-weight: 600;
  margin: 31px 0 15px 0;

  ${media.mobile}{
    margin: 0px;
  }
`;

export const CardText = styled.p`
  color: #0f0f10;
  font-size: 18px;
  font-weight: 600;
  line-height: 150%;
`;

export const StartButton = styled.button`
  background: ${COLORS.PRIMARY};
  border: none;
  border-radius: 100px;
  color: #ffffff;
  font-size: 18px;
  padding: 15px 30px;
  width: 100%;
  height: 70px;
  box-sizing: border-box;
  cursor: pointer;
  font-family: "Wanted Sans";
  position: relative;
  overflow: hidden;

  &:hover {
    background: ${COLORS.PRIMARY900};
  }
  &:disabled {
    background: #c0cbd9;
    cursor: not-allowed;
  }
  & > span {
    position: relative;
    z-index: 2;
  }
`;

export const StartButtonCircle = styled.div`
  position: absolute;
  filter: blur(70px);
  top: -150px;
  right: 25%;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  background: #764a86;
`;
export const StartButtonCircle2 = styled.div`
  position: absolute;
  filter: blur(40px);
  bottom: -130px;
  left: 20px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #764a86;
`;
export const StartButtonCircle3 = styled.div`
  position: absolute;
  filter: blur(1000px);
  top: -250px;
  left: 0;
  width: 100%;
  height: 500px;
  border-radius: 50%;
  background: #00ffff;
`;

export const Footer = styled.footer`
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  color: #808996;
  margin-top: 20px;

  ${media.mobile}{
    margin-top: 12px;
  }
`;

export const logoStyle = css`
  width: 60px;
`;

export const textLogoStyle = css`
  width: 150px;
`;

export const boldStyle = css`
  font-weight: bold;
`;
