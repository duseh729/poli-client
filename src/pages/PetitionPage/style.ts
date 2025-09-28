import { media } from "@/constants/media";
import styled from "@emotion/styled";
import { m, motion } from "framer-motion";

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

export const ResponsiveBr = styled.br<{ isUpdate?: boolean }>`
  display: none;

  ${media.mobile} {
    display: ${({ isUpdate }) => (isUpdate ? "none" : "block")};
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

export const BasicWrapper = styled(motion.div)<{ isUpdate?: boolean }>`
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

  ${({ isUpdate }) =>
    isUpdate &&
    `
    ${media.mobile} {
        flex-direction: column;
        gap: 8px;

        & > span:first-of-type {
            flex: none;
        }
        & > span:last-of-type {
            flex: none;
        }
        & > *:last-child {
            width: 100%;
        }
    }
  `}
`;

export const Wrapper = styled(motion.div)<{ isUpdate?: boolean }>`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: flex-start;

  & > :first-child {
    flex: 1;
    min-width: 170px;
  }
  & > :last-child {
    flex: 5;
  }

  ${media.mobile} {
    display: block;
  }

  ${({ isUpdate }) =>
    isUpdate &&
    `
    ${media.mobile} {
        display: flex;
        flex-direction: column;
        gap: 8px;

        & > :first-child {
            flex: none;
            min-width: auto;
        }
        & > :last-child {
            flex: none;
            width: 100%;
        }
    }
  `}
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
    width: 70%;

    ${media.mobile} {
      width: 100%;
    }

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

export const PetitionDateTextWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;

  span {
    font-family: "Wanted Sans";
    line-height: 140%; /* 22.4px */
  }

  span:nth-child(2) {
    ${media.mobile} {
      font-size: 16px;
    }
  }

  div{
    display: flex;
    align-items: center;
  }
`;

export const PetitionButtonWrapper = styled(motion.div)`
  display: flex;
  justify-content: flex-end;
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

    ${media.mobile} {
      font-size: 16px;
    }
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
`;

export const PetitionInfoTitle = styled(motion.p)`
  color: #2d76ff;
  font-family: "Wanted Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 22.4px */
  margin-bottom: 8px;

  ${media.mobile} {
    font-size: 14px;
  }
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

  ${media.mobile}{
    font-size: 14px;
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

  overflow-wrap: anywhere;
  word-break: break-all;

  cursor: pointer;

  ${media.mobile} {
    font-size: 16px;
  }
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

  ${media.mobile} {
    flex-direction: column;
    gap: 8px;
  }
`;

// 피해장소, 진정취지 wrapper
export const RowColumnWrapper = styled.div<{ isUpdate?: boolean }>`
  display: flex;
  gap: 28px;

  ${({ isUpdate }) =>
    isUpdate &&
    `${media.mobile}{
    flex-direction: column;
    gap: 16px;
    }`}
`;

export const FloatingButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;

  & > button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 8px;
    gap: 7px;
    flex: 1;

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
`;

export const FloatingContainer = styled.div`
  display: none;

  ${media.mobile} {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;

    display: flex;
    justify-content: center;

    padding: 16px 16px 8px 16px;
    background: white;
    border-top: 1px solid #eaeaea;

    transition: transform 0.3s ease-in-out;
    transform: translateY(100%);

    &.visible {
      transform: translateY(0);
    }
  }
`;

export const FloatingContent = styled.div`
  width: 100%;
  max-width: 968px; /* Align with main content */
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const FloatingClose = styled.div`
  display: flex;
  position: absolute;
  top: -48px;
  justify-content: center;

  button {
    display: flex;
    padding: 3px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    /* Shadow-Btn-floating */
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.16);

    border: none;
    border-radius: 50%;
    background-color: white;
  }
`;

// 모달

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background-color: white;
  padding: 46px 16px 22px 16px;
  border-radius: 12px;
  width: 90%;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

export const ModalIcon = styled.div`
  display: flex;
  width: 75px;
  height: 75px;
  justify-content: center;
  align-items: center;

  margin-bottom: 18px;
`;

export const ModalTitle = styled.h2`
  color: #1a1b1c;
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 25.2px */
`;

export const ModalText = styled.p`
  color: #9098a4;
  text-align: center;
  font-family: "Wanted Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 160%; /* 25.6px */

  margin-bottom: 28px;
`;

export const ModalButton = styled.button`
  width: 100%;
  padding: 16px 10px;
  background-color: #0059ff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;
