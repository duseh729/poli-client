import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 30px 0;
`;

export const Subtitle = styled.p`
  font-size: 18px;
  color: #2e3034;
  font-weight: 500;
  line-height: 150%;
  text-align: center;
`;

export const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 36px;
  margin: 100px 0 200px 0;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 220px;
  height: 220px;
  padding: 20px;
  border: 1px solid #a5c6ff;
  border-radius: 32px;
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
  background: linear-gradient(to right, #0072ff, #00c6ff);
  border: none;
  border-radius: 30px;
  color: #ffffff;
  font-size: 18px;
  padding: 15px 30px;
  margin-top: 58px;
  width: 100%;
  cursor: pointer;
  &:hover {
    background: linear-gradient(to right, #00c6ff, #0072ff);
  }
  &:disabled {
    background: #c0cbd9;
    cursor: not-allowed;
  }
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