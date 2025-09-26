import { media } from "@/constants/media";
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

  ${media.mobile} {
    padding: 12px 16px;
  }
`;

export const ResponsiveBr = styled.br`
  display: none;

  ${media.mobile} {
    display: block;
  }
`;

export const ColumnWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const BasicColumnWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const BasicWrapper = styled(motion.div)`
  display: flex;
  flex-direction: row;
  width: 100%;
  overflow-wrap: anywhere;
  word-break: break-all;

  & > span:first-of-type {
    flex: 1;
  }
  & > span:last-of-type {
    flex: 2;
  }
`;

export const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: flex-start;

  ${media.mobile}{
    display: block
  }

  & > :first-child {
    flex: 1;
    min-width: 170px;
  }
  & > :last-child {
    flex: 5;
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

  ${media.mobile} {
    padding: 16px;
  }
`;

export const PdfWrapper = styled(motion.div)`
  padding: 0px 20px;

  ${media.mobile} {
    padding: 0;
  }
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

  ${media.mobile} {
    margin: 16px 0px 20px 0px;
  }

  h3 {
    color: #1a1b1c;
    font-family: "Wanted Sans";
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%; /* 44.8px */

    ${media.mobile} {
      font-size: 22px;
    }

    span {
      font-size: 29px;
      font-weight: 500;

      ${media.mobile} {
        font-size: 22px;
      }
    }
  }
`;

export const PetionTitleContents = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  ${media.mobile} {
    flex-direction: column;
    gap: 16px;
  }

  & > div {
    & > span {
      color: #626262;
      font-family: "Wanted Sans";
      font-size: 20px;
      font-style: normal;
      font-weight: 500;
      line-height: 140%; /* 28px */
    }
  }
`;

export const PetitionButtonWrapper = styled(motion.div)`
  display: flex;
  gap: 8px;

  ${media.mobile} {
    width: 100%;
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

    ${media.mobile} {
      flex: 1;
      justify-content: center;
    }

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
`;

export const PetitionInfoWrapper = styled(motion.div)`
  display: flex;
  padding: 20px 0 40px 0;
  flex-direction: column;
  gap: 8px;
  width: 100%;

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

export const PetitionInfoFlex = styled(motion.div)`
  display: flex;
  flex-direction: row;
  gap: 20px;
  
  ${media.mobile} {
    flex-direction: column;
    gap: 24px;
  }
  ` 

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
  min-width: 170px;

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

export const PetitionInfoContentsTitle = styled.span`
  color: #1a1b1c;
  font-family: "Wanted Sans";
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 25.2px */

  opacity: 0.6;
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

  overflow-wrap: anywhere;
  word-break: break-all;

  cursor: pointer;
`;

export const PetitionDefalutInfoWrapper = styled(motion.div)`
  flex: 1;

  & > div {
    display: flex;
    padding: 24px 20px;
    align-items: flex-start;

    border-radius: 8px;
    background: #f4f7f9;
  }
`;

export const InputWrapper = styled.div`
  display: flex;

  ${media.mobile}{
    flex-direction: column;
    gap: 8px;
  }
`