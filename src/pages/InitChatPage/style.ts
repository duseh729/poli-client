import styled from "@emotion/styled";
import { motion } from "framer-motion";

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const Wrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  padding: 0 40px;
  height: 72px;
  color: #0f0f10;
  font-size: 20px;
  font-weight: 700;
  border-bottom: 1px solid #dddce3;
`;
