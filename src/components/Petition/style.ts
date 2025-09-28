// style.ts
import { media } from "@/constants/media";
import styled from "@emotion/styled";

export const Input = styled.input`
  border-radius: 10px;
  border: 1px solid #c0cbd9;
  background: #fff;
  padding: 12px;
  color: #0f0f10;

  font-family: "Wanted Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;

  ${media.mobile} {
    font-size: 14px;
  }
`;

export const Textarea = styled.textarea`
  border-radius: 10px;
  border: 1px solid #c0cbd9;
  background: #F6F8FB;
  padding: 12px;
  color: #0f0f10;

  font-family: "Wanted Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  resize: none;
  ${media.mobile} {
    font-size: 14px;
  }
`;
