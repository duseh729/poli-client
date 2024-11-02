import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 410px;
  border-radius: 8px;
`;

export const LogoContainer = styled.div`
  display: flex;
  width: 180px;
  justify-content: space-between;
  margin-bottom: 63px;
`;

export const InputContainer = styled.div`
  width: 410px;
`;

export const InputWrapper = styled.div`
  position: relative;
`;

export const Input = styled.input`
  width: 100%;
  padding: 20px;
  border: 1px solid #808996;
  border-radius: 35px;
  font-size: 16px;
  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
  &:focus + .focus-text {
    opacity: 1;
    top: 0;
  }
`;

export const FocusText = styled.span`
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  font-size: 14px;
  color: #3b82f6;
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
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 48px;
  &:hover {
    background-color: #3b82f6;
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
  margin: 5px 0 0 20px;
  font-weight: 600;
  min-height: 34px;
`;
