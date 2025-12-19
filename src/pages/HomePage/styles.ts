/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

// 접근성을 유지하며 요소를 숨기는 스타일
export const visuallyHidden = css`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;
