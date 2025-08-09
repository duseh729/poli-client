import { COLORS } from "@/constants/color";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import TextareaAutosize from "react-textarea-autosize";

type HeadingProps = {
  level: number;
};

type ListItemProps = {
  hasHeading: boolean;
};

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 770px;
  height: 93vh;
  box-sizing: border-box;
`;

export const ChatWindow = styled.div`
  flex: 1;
  border-radius: 12px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;

  overflow: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #c0cbd9;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #f6f8fb;
  }
`;

export const MessageContainer = styled.div`
  width: 100%;
  margin: 15px 0;
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
  pointer-events: auto; /* 추가 */
  background-color: transparent;
  color: #0f0f10;
  padding: 10px 0;
  border-radius: 12px;
  word-wrap: break-word;
  white-space: pre-wrap;
  line-height: 24px;
  font-weight: 500;

  /* 마크다운 스타일링 */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0.5em 0 0.5em;
    font-weight: bold;
  }

  h1 {
    font-size: 2em;
  }
  h2 {
    font-size: 1.5em;
  }
  h3 {
    font-size: 1.3em;
  }
  h4 {
    font-size: 1.2em;
  }
  h5 {
    font-size: 1.1em;
  }
  h6 {
    font-size: 1em;
  }

  p {
  }

  strong,
  b {
    font-weight: bold;
  }

  em,
  i {
    font-style: italic;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }

  ol {
    display: flex;
    flex-direction: column;
    gap: 2em;
  }

  li {
    display: flex;
    flex-direction: column;
  }

  hr {
    margin: 1em 0;
    border: none;
    border-bottom: 1px solid #e1e4e8;
  }

  /* 체크박스 스타일링 */
  input[type="checkbox"] {
    margin-right: 0.5em;
  }

  /* 취소선 스타일링 */
  del {
    text-decoration: line-through;
    color: #6a737d;
  }

  /* 링크 스타일링 */
  a {
    color: #0366d6;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  /* 코드 블록 스타일링 */
  code {
    background-color: rgba(27, 31, 35, 0.05);
    border-radius: 3px;
    font-family:
      "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
    font-size: 85%;
    padding: 0.2em 0.4em;
    margin: 0;
  }

  pre {
    background-color: #f6f8fa;
    border-radius: 3px;
    font-family:
      "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
    font-size: 85%;
    line-height: 1.45;
    overflow: auto;
    padding: 16px;

    code {
      background-color: transparent;
      border: 0;
      display: inline;
      line-height: inherit;
      margin: 0;
      overflow: visible;
      padding: 0;
      word-wrap: normal;
    }
  }

  /* 인용구 스타일링 */
  blockquote {
    margin: 0.8em 0;
    padding: 0 1em;
    color: #6a737d;
    border-left: 0.25em solid #dfe2e5;
  }

  /* 테이블 스타일링 */
  table {
    border-collapse: collapse;
    width: 100%;
    margin: 1em 0;
    font-size: 0.9em;
  }

  th {
    background-color: #f6f8fa;
    font-weight: 600;
    text-align: left;
  }

  th,
  td {
    padding: 8px 12px;
    border: 1px solid #dfe2e5;
  }

  tr {
    background-color: white;
    border-top: 1px solid #dfe2e5;

    &:nth-of-type(2n) {
      background-color: #f6f8fa;
    }
  }

  /* 테이블 반응형 처리 */
  @media screen and (max-width: 600px) {
    table {
      display: block;
      overflow-x: auto;
      white-space: nowrap;
    }
  }

  ol,
  ul {
    padding-left: 0px;
  }
`;

export const UserMessageWrapper = styled(motion.div)`
  max-width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const BotMessageWrapper = styled(motion.div)``;

export const UserMessage = styled(motion.div)`
  padding: 16px;
  max-width: 600px;

  font-family: "Wanted Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 24px */
  border-radius: 12px;

  background-color: ${COLORS.GRAY};
`;

export const LoadingMessage = styled(motion.div)`
  color: #808996;
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  display: flex;
  align-items: center;
  gap: 6px;
`;
export const LoadingSpinner = styled.img`
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(360deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
`;

export const ChatFooter = styled.div`
  position: fixed;
  bottom: 0;
  background-color: white;
  width: 770px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 9px;
  border-radius: 30px;
  align-items: center;
  justify-content: space-between;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  padding: 18px;
  background-color: #f6f8fb;
  border: 1px solid #a5c6ff;
  border-radius: 30px;
`;

export const Textarea = styled(TextareaAutosize)`
  flex: 1;
  font-size: 16px;
  font-weight: 500;
  border: none;
  background: transparent;
  letter-spacing: -1px;
  line-height: 1.5;
  outline: none;
  resize: none;
  min-height: 30px;
  max-height: 150px;
  overflow: auto !important;
  color: black;
  font-family: "MainFont", sans-serif;
  letter-spacing: 0.5px;

  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::placeholder {
    color: #808996;
    opacity: 1;
    font-weight: 400;
  }

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const SendButton = styled.button`
  right: 15px;
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
  font-family: "Wanted Sans";

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

export const RecommendMessage = styled.button<{ disabled?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4px 10px;
  gap: 10px;
  border-radius: 14px;
  border: 1px solid #c0cbd9;
  background-color: transparent;

  font-size: 12px;
  font-family: "Wanted Sans";
  font-weight: 400;
  line-height: 150%;
  color: #808996;

  &:hover {
    border-color: ${COLORS.PRIMARY};
    color: #2e3034;
  }

  &:disabled:hover {
    border-color: #c0cbd9;
    color: #808996;
  }
`;

export const DisclaimerText = styled.p`
  color: #808996;
  font-size: 12px;
  text-align: center;
  margin-top: 10px;
`;

export const LinkText = styled.a`
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const StrongText = styled.strong`
  font-weight: 700;
  color: #2e3034;
`;

export const Heading = styled.div<HeadingProps>`
  font-size: ${({ level }) => {
    switch (level) {
      case 1:
        return "24px";
      case 2:
        return "22px";
      case 3:
        return "20px";
      case 4:
        return "18px";
      case 5:
        return "16px";
      case 6:
        return "14px";
      default:
        return "16px";
    }
  }};
  font-weight: 700;
  color: #2e3034;
  margin: 16px 0 8px 0;
`;

export const ListItem = styled.div<ListItemProps>`
  margin-left: -20px;
  color: #4e5867;
  font-size: 14px;
  line-height: 1.5;
  margin-top: 4px;
  display: flex;
  align-items: center;
`;

export const UnorderedList = styled.ul`
  padding-left: 20px;
  list-style-type: none;
  margin: 0;
  padding-top: 8px;
`;

export const OrderedList = styled.ol`
  padding-left: 20px;
  margin: 0;
  padding-top: 8px;
  list-style-position: inside;
`;

export const PreformattedCode = styled.pre`
  background-color: #f6f8fa;
  border: 1px solid #e1e4e8;
  padding: 12px;
  border-radius: 8px;
  overflow: auto;
  font-size: 14px;
  font-family: "Wanted Sans";
  font-weight: 500;
`;

export const InlineCode = styled.code`
  background-color: #f3f3f3;
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-size: 14px;
  font-family: "Wanted Sans";
  font-weight: 500;
`;

export const ProgrssWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 12px;
`;

export const ProgressBox = styled.div<{ progress: number }>`
  border: ${(props) => (props.progress === 100 ? "#004EDF" : "#c0cbd9")};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 190px;
  height: 44px;
  border-radius: 45px;
  gap: 10px;
  background-color: ${(props) =>
    props.progress === 100 ? "#E9F1FF" : "transparent"};

  border: ${(props) =>
    props.progress === 100 ? "1px solid #004EDF" : "1px solid #c0cbd9"};
`;

export const ProgressText = styled.span<{ progress: number }>`
  color: ${(props) => (props.progress === 100 ? "#0059FF" : "#2e3034")};
  font-weight: 600;
  font-size: 14px;
`;
