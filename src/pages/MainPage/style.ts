import styled from "@emotion/styled";
import { motion } from "framer-motion";

export const Container = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
`;
