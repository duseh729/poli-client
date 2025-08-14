import styled from "@emotion/styled";
import { motion } from "framer-motion";

export const Container = styled(motion.div)`
  width: 100%;
  height: 100%;
  padding: 40px 38px;

  overflow: auto;

  -ms-overflow-style: none; /* IE, Edge(구버전) */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }
`;

export const PetitionWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  padding: 36px;
  max-width: 968px;
  margin: auto;

  border-radius: 8px;
  border: 1.5px solid rgba(192, 214, 255, 0.75);
  background: #fff;
  box-shadow: 0 4px 16.7px 2px rgba(0, 0, 0, 0.06);
`;

export const PetitionHeaderWrapper = styled(motion.div)`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    padding: 6px 12px;
    border-radius: 5px;
    background: #caefe3;

    color: #389f73;
    font-family: "Wanted Sans";
    font-size: 13px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%; /* 18.2px */
  }

  button {
    border: 0;
    background-color: transparent;
    cursor: pointer;
  }
`;

export const PetitionTitleWrapper = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 40px 0;

  h3 {
    color: #1a1b1c;
    font-family: "Wanted Sans";
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%; /* 44.8px */

    span {
      font-size: 29px;
      font-weight: 500;
    }
  }
`;

export const PetionTitleContents = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  & > div {
    & > span {
      color: #626262;
      font-family: "Wanted Sans";
      font-size: 20px;
      font-style: normal;
      font-weight: 500;
      line-height: 140%; /* 28px */
    }

    button {
      display: flex;
      align-items: flex-end;
      padding: 8px;
      gap: 7px;

      border-radius: 8px;
      border: 0.8px solid #dddce3;
      background: #fff;

      cursor: pointer;

      img {
        width: 24px;
        height: 24px;
      }
      span {
        overflow: hidden;
        color: #404652;
        text-overflow: ellipsis;
        font-family: "Wanted Sans";
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 150%; /* 24px */
      }
    }
  }
`;

export const PetitionInfoWrapper = styled(motion.div)`
  display: flex;
  padding: 20px 0 40px 0;
  flex-direction: column;
  gap: 8px;

  border-bottom: 1px solid var(--grey-3, #e8ecf1);

  h3 {
    color: rgba(128, 128, 128, 0.71);
    font-family: "Wanted Sans";
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%; /* 25.2px */
  }
`;

export const PetitionInfoTitle = styled(motion.p)`
  color: #2d76ff;
  font-family: "Wanted Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 22.4px */
  margin-bottom: 8px;
`;

export const PetitionInfoContentsTitleWrapper = styled(motion.span)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
  min-width: 180px;

  span {
    color: #1a1b1c;
    font-family: "Wanted Sans";
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%; /* 25.2px */

    opacity: 0.6;
  }
`;

export const PetitionInfoContentsWrapper = styled(motion.span)`
  display: flex;
  flex-direction: column;
  gap: 12px;

  flex: 5;
`;

export const PetitionInfoContents = styled(motion.span)`
  color: #1a1b1c;
  font-family: "Wanted Sans";
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 25.2px */
`;

export const PetitionDefalutInfoWrapper = styled(motion.div)`
  flex: 1;

  & > div {
    display: flex;
    padding: 24px 20px;
    align-items: flex-start;

    border-radius: 8px;
    background: #f4f7f9;

    & > div {
      display: flex;
      flex-direction: column;

      gap: 10px;
      flex: 1 0 0;
      align-self: stretch;
    }
  }
`;
