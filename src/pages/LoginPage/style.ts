import { media } from "@/constants/media";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  ${media.mobile} {
    padding: 0 16px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 410px;
  width: 100%;
  border-radius: 8px;
`;

export const Title = styled.header`
  display: flex;
  color: #2e3034;
  font-weight: 700;
  font-size: 40px;
  margin-bottom: 32px;
  line-height: 150%;

  ${media.mobile} {
    font-size: 28px;
  }
`;

export const InputContainer = styled.div`
  max-width: 410px;
  width: 100%;
`;

export const InputWrapper = styled.div`
  position: relative;
`;

export const Input = styled.input<{ hasError?: boolean }>`
  width: 100%;
  height: 70px;
  border: 1px solid ${({ hasError }) => (hasError ? "red" : "#808996")};
  border-radius: 35px;
  font-size: 22px;
  padding: 0 20px;
  &:focus {
    outline: none;
    border-color: ${({ hasError }) => (hasError ? "red" : "#3b82f6")};
  }
  &:focus + .focus-text {
    opacity: 1;
    top: 0;
  }

  ${media.mobile} {
    height: 54px;
    font-size: 18px;
  }
`;

export const FocusText = styled.span<{ hasError?: boolean }>`
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  font-size: 14px;
  color: ${({ hasError }) => (hasError ? "#f04443" : "#3b82f6")};
  opacity: 0;
  transition: all 0.2s ease;
  background-color: white;
`;

export const Button = styled.button`
  width: 100%;
  height: 70px;
  background-color: #0059ff;
  color: white;
  border: none;
  border-radius: 35px;
  font-size: 26px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 48px;
  font-family: "Wanted Sans";
  &:hover {
    background-color: #3b82f6;
  }

  ${media.mobile} {
    height: 54px;
    font-size: 18px;
  }
`;

export const Text = styled.p`
  font-size: 16px;
  color: #4e5867;
  font-weight: 500;
`;

export const StyledLink = styled(Link)`
  color: #0059ff;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
`;

export const ErrorText = styled.div`
  color: #f04443;
  font-size: 17px;
  display: flex;
  align-items: center;
  font-weight: 500;
  min-height: 20px;
  padding-left: 17px;

  ${media.mobile} {
    min-height: 12px;
    font-size: 12px;
  }
`;
