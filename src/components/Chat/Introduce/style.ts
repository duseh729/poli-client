import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { COLORS } from "@/constants/color";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 82px 0 28px 0;
`;

export const Subtitle = styled.p`
  font-size: 18px;
  color: #2e3034;
  font-weight: 500;
  line-height: 150%;
`;

export const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 36px;
  margin: 32px 0 80px 0;
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
`;

export const CardIcon = styled.img`
  width: 40px;
  height: 40px;
`;

export const CardName = styled.span`
  color: #808996;
  font-size: 14px;
  font-weight: 600;
  margin: 31px 0 15px 0;
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
  border-radius: 30px;
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
  background: #00FFFF;
`;

export const Footer = styled.footer`
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  color: #808996;
  margin-top: 20px;
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
