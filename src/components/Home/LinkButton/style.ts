import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const Button = styled.button`
  display: inline-flex;
  padding: 10px 44px 10px 52px;
  margin-top: 30px;
  justify-content: center;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  border-radius: 100px;
  background: #1e1e1e;
  color: white;
  font-weight: bold;
  font-family: "Wanted Sans";
  font-size: 26px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  cursor: pointer;
  &:hover {
    background: #374151;
  }
`;

export const arrowStyle = css`
  height: 24px;
  width: 24px;
`;
