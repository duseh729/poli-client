import styled from "@emotion/styled";
import { motion } from "framer-motion";
import TextareaAutosize from "react-textarea-autosize";

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1000px;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
`;

export const ChatWindow = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  border-radius: 12px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
`;

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px 0;
`;

export const UserIcon = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-bottom: 5px;
`;

export const BotIcon = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-bottom: 5px;
`;

export const Message = styled(motion.div)`
  background-color: transparent;
  color: #0f0f10;
  padding: 10px 0;
  border-radius: 12px;
  max-width: 70%;
  word-wrap: break-word;
  white-space: pre-wrap;
  line-height: 24px;
  font-weight: 500;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-radius: 30px;
  align-items: center;
  justify-content: space-between;
`;

export const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;
`;

export const Textarea = styled(TextareaAutosize)`
  flex: 1;
  padding: 20px 25px;
  border: 1px solid #a5c6ff;
  border-radius: 30px;
  font-size: 16px;
  background-color: #f6f8fb;
  outline: none;
  resize: none;
  min-height: 30px;
  max-height: 150px;
  overflow: auto !important;
  color: black;
  &::placeholder {
    color: #808996;
    opacity: 1;
  }
`;

export const SendButton = styled.button`
  position: absolute; /* Position absolute */
  right: 15px; /* Adjust right spacing as needed */
  box-sizing: border-box;
  width: 30px;
  height: 30px;
  padding: 10px;
  background-color: #0072ff;
  color: #fff;
  border: none;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #0059ff;
  }

  &:disabled {
    background-color: #e8ecf1;
    cursor: not-allowed;
  }

  & img {
    width: 15px;
    height: 15px;
  }
`;

export const DisclaimerText = styled.p`
  color: #808996;
  font-size: 12px;
  text-align: center;
  margin-top: 10px;
`;
