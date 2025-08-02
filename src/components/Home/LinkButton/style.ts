import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const Button = styled.button`
  display: inline-flex;
  padding: 10px 20px 10px 28px;
  margin-top: 26px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  border-radius: 100px;
  background: #1e1e1e;
  color: white;
  font-weight: bold;
  font-family: "Wanted Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  &:hover {
    background: #374151;
  }
`;

export const arrowStyle = css`
  height: 24px;
  width: 24px;
`;