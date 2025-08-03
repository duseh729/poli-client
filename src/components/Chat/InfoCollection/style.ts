import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { motion } from "framer-motion";
import { COLORS } from "@/constants/color";

export const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const Form = styled.form`
  border-radius: 20px;
  width: 770px;
  height: auto;
  border: 1px solid #a5c6ff;
`;

export const Title = styled.h2`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #a5c6ff;
`;

export const FormGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 34px;
  padding: 24px;
`;

export const FormGroup = styled.div`
  /* margin-top: 24px;
  margin-bottom: 34px; */
`;

export const Label = styled.label`
  display: block;
  font-size: 16px;
  color: #808996;
  margin: 0 0 16px 0;
  font-weight: 500;
`;

export const Highlight = styled.span`
  color: #0f0f10;
  font-weight: 600;
`;

export const Input = styled.input`
  width: 340px;
  height: 56px;
  padding: 10px;
  border: 1px solid #c0cbd9;
  border-radius: 10px;
  background-color: #f6f8fb;
  color: #0f0f10;
  box-sizing: border-box;
`;

export const InputRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

export const textAreaStyle = (isMaxLength: boolean) => css`
  font-family: "MainFont", sans-serif;
  letter-spacing: 0.3px;
  width: 100%;
  height: 140px;
  resize: none;
  padding: 20px;
  border: 1px solid ${isMaxLength ? "#F04443 !important" : "#c0cbd9"};
  border-radius: 10px;
  background-color: #f6f8fb;
  color: #0f0f10;
  font-weight: 500;
  line-height: 24px;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  ::placeholder {
    color: #afafaf;
  }
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const charCountStyle = (isMaxLength: boolean) => css`
  text-align: right;
  font-size: 12px;
  color: ${isMaxLength ? "#F04443" : "#999"};
  margin-top: 7px;
  font-weight: 500;
`;

export const ExampleText = styled.p`
  font-size: 14px;
  color: #808996;
  margin: 20px 0;
`;

export const CheckBoxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
`;

export const CheckBoxLabel = styled.label`
  color: var(--grey-6, #4e5867);
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
`;

export const hiddenCheckboxStyles = css`
  display: none;
`;

export const customCheckboxStyles = css`
  display: inline-block;
  width: 18px;
  height: 18px;
  margin-right: 15px;
  border: 2px solid var(--grey-6, #4e5867);
  border-radius: 50%;
  position: relative;
  cursor: pointer;
  margin-top: 3px;
  &:before {
    content: "";
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--grey-6, ${COLORS.PRIMARY});
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
  }
`;

export const hiddenCheckboxCheckedStyles = css`
  &:checked + span:before {
    opacity: 1;
  }
`;

export const StartButton = styled.button`
  background: ${COLORS.PRIMARY};
  border: none;
  border-radius: 100px;
  color: #ffffff;
  font-size: 18px;
  padding: 15px 30px;
  margin-top: 40px;
  width: 100%;
  height: 70px;
  box-sizing: border-box;
  cursor: pointer;
  font-family: "Wanted Sans";

  &:hover {
    background: ${COLORS.PRIMARY900};
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
  margin-top: 12px;
`;

export const Logo = styled.img`
  height: 43px;
  width: 43px;
`;

export const TitleText = styled.span`
  font-size: 22px;
  color: #0f0f10;
  font-weight: 600;
  text-align: center;
  padding: 20px 24px;
`;

export const Duplication = styled.div<{ bold?: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.bold ? "#0F0F10" : "#808996")};
`;

export const DuplicationWrapper = styled.div`
  display: flex;
  margin-bottom: 10px;
`;
