import React, { ChangeEvent, useRef, useLayoutEffect } from "react";
import * as S from "./style";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  value: string | undefined;
  setValue: (value: string) => void;
  multiline?: boolean; // 여러 줄 옵션
  // rows는 이제 자동 높이 조절로 대체되므로 제거하거나 기본값으로만 사용
};

const Input = ({ value, setValue, multiline = false, ...props }: InputProps) => {
  // textarea 요소에 접근하기 위한 ref 생성
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // value가 변경될 때마다 높이를 재조정
  useLayoutEffect(() => {
    if (multiline && textareaRef.current) {
      // 높이를 먼저 초기화해야 정확한 scrollHeight를 계산할 수 있음
      textareaRef.current.style.height = "auto";
      // 실제 내용물의 높이(scrollHeight)를 textarea의 높이로 설정
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value, multiline]); // value나 multiline prop이 바뀔 때 실행

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  if (multiline) {
    return (
      <S.Textarea
        ref={textareaRef} // ref를 textarea에 연결
        value={value}
        onChange={handleChange}
        {...props} // placeholder, className 등 나머지 props 전달
        rows={1} // 최소 높이를 위해 초기 rows를 1로 설정할 수 있음
      />
    );
  }

  return (
    <S.Input
      value={value}
      onChange={handleChange}
      {...props}
    />
  );
};

export default Input;