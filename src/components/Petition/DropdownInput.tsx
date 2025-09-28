import { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import expand from "@/assets/expand.svg";
import reduce from "@/assets/reduce.svg";

interface DropdownInputProps {
  value: string;
  setValue: (value: string) => void;
  options: string[];
  placeholder?: string;
}

const DropdownInput = ({
  value,
  setValue,
  options,
  placeholder,
}: DropdownInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: string) => {
    setValue(option);
    setIsOpen(false);
  };

  return (
    <Container ref={containerRef}>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
      />

      <Arrow src={expand} isOpen={isOpen} />

      {isOpen && (
        <Options>
          {options.map((opt, index) => (
            <Option key={index} onClick={() => handleSelect(opt)}>
              {opt}
            </Option>
          ))}
        </Options>
      )}
    </Container>
  );
};

export default DropdownInput;

// 스타일
const Container = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;

  border: 1px solid #c0cbd9;
  border-radius: 10px;
  background: #F6F8FB;

  overflow: hidden;
  color: var(--grey-8, #0f0f10);
  text-overflow: ellipsis;

  /* body/1 */
  font-family: "Wanted Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 24px */
  &:focus {
    border: 1px solid #288ff6;
  }
`;

const Options = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  background: #fff;
  border: 1px solid #c0cbd9;
  border-radius: 6px;
  margin: 4px 0 0 0;
  padding: 0;
  list-style: none;
  z-index: 10;
`;

const Option = styled.li`
  display: flex;
  height: 48px;
  padding: 8px 12px;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  align-self: stretch;

  &:hover {
    background: var(--Input-Color-Hover-Background, #f3f5f7);
  }

  color: var(--Input-Color-Default-Text, #4b5362);

  font-family: "Wanted Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 24px */
`;

const Arrow = styled.img<{ isOpen: boolean }>`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%)
    rotate(${(props) => (props.isOpen ? "180deg" : "0deg")});
  transition: transform 0.2s;
  pointer-events: none;
`;
