import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { motion } from "framer-motion";
import { COLORS } from "@/constants/color";
import { media } from "@/constants/media";

export const ResponsiveBr = styled.br`
  display: none;
  ${media.mobile} {
    display: block;
  }
`;

export const Container = styled(motion.div)`
  height: 100%;
  width: 100%;
  position: relative;
`;

export const FormContainer = styled.div`
  ${media.mobile} {
    padding: 8px 16px;
  }
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 770px;
  height: ${(props: { formHeight: number }) =>
    `calc(100vh - ${props.formHeight}px)`};

  ${media.mobile} {
    overflow: auto;
    min-width: auto;
    padding-bottom: 120px;
    height: auto;
  }
`;

export const Form = styled.form`
  border-radius: 20px;
  max-width: 770px;
  width: 100%;
  /* height: auto; */
  border: 1px solid #a5c6ff;

  ${media.mobile} {
    width: 100%;
  }
`;

export const Title = styled.h2`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #a5c6ff;
`;

export const FormGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
  font-weight: 600;
  line-height: 150%; /* 27px */

  ${media.mobile} {
    font-family: "Wanted Sans";
    font-size: 14px;
    margin-bottom: 12px;
  }
`;

export const Highlight = styled.span`
  color: #0f0f10;
  font-weight: 600;
  line-height: 150%;
  font-family: "Wanted Sans";
  ${media.mobile} {
    font-size: 16px;
  }
`;

export const Input = styled.input`
  width: 100%;
  max-width: 340px;
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
  /* justify-content: space-between; */
  gap: 10px;

  ${media.mobile} {
    flex-direction: column;
  }
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
  line-height: 150%;
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
  margin: 12px 0 10px 0;
  line-height: 150%;
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

export const FooterWrapper = styled.div`
  position: absolute;
  bottom: 0;
  background: white;
  width: 100%;
  padding-bottom: 15px;

  ${media.mobile} {
    position: fixed;
    width: 100%;
    padding: 16px 16px 8px 16px;
    box-shadow: 0 -1px 12px 0 rgba(0, 0, 0, 0.16);
  }
`;

export const StartButton = styled.button`
  background: ${COLORS.PRIMARY};
  border: none;
  border-radius: 100px;
  color: #ffffff;
  font-size: 18px;
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

  ${media.mobile} {
    height: 54px;
    width: 100%;
  }
`;

export const Footer = styled.footer`
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  color: #808996;
  margin-top: 12px;
  line-height: 150%;
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
  line-height: 150%; /* 27px */
  font-family: "Wanted Sans";

  ${media.mobile} {
    font-size: 18px;
    text-align: left;
  }
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
