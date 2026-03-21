/** @jsxImportSource @emotion/react */
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

// 1. 회전 애니메이션 정의
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// 2. 화면 중앙 정렬 컨테이너
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 화면 전체 높이 */
  width: 100%;
  background-color: #ffffff; /* 배경색 (필요시 변경) */
  position: absolute; /* 혹시 모를 레이아웃 겹침 방지 */
  top: 0;
  left: 0;
  z-index: 999; /* 다른 요소보다 위에 뜨도록 */
`;

// 3. 스피너 스타일
const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid rgba(0, 89, 255, 0.1); /* 연한 파란색 배경 */
  border-left-color: #0059ff; /* 진한 파란색 (POLI 포인트 컬러) */
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const Text = styled.p`
  margin-top: 16px;
  color: #808996;
  font-size: 14px;
  font-weight: 500;
  font-family: "Wanted Sans", sans-serif;
`;

const Loading = () => {
  return (
    <Container>
      <Spinner />
      <Text>페이지를 불러오는 중입니다...</Text>
    </Container>
  );
};

export default Loading;