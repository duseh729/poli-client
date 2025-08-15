import React from "react";
import { ChangeEvent } from "react";
import * as S from "./style";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  value: string | undefined;
  setValue: (value: string) => void;
  multiline?: boolean; // 여러 줄 옵션
  rows?: number; // 기본 줄 수
};

const Input = ({ value, setValue, multiline = false, rows = 3 }: InputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  if (multiline) {
    return (
      <S.Textarea
        value={value}
        onChange={handleChange}
        rows={rows}
      />
    );
  }

  return (
    <S.Input
      value={value}
      onChange={handleChange}
    />
  );
};

export default Input;
