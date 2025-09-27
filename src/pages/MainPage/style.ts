import styled from "@emotion/styled";
import { motion } from "framer-motion";

export const Container = styled(motion.div)`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

export const Main = styled.div`
  width: 100%;
  max-width: 770px;
`;
