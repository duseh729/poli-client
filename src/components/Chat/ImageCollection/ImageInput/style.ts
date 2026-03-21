import { media } from "@/constants/media";
import styled from "@emotion/styled";

export const ResponsiveBr = styled.br`
  display: none;
  ${media.mobile} {
    display: block;
  }
`

export const ImageInputContainer = styled.div`
  display: flex;
  padding: 20px 12px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: stretch;

  border-radius: 10px;
  border: 1px dashed var(--grey-4, #c0cbd9);
  background: var(--bg-2, #f6f8fb);
`;

export const ImageInputText = styled.span`
  overflow: hidden;
  color: var(--grey-8, #0f0f10);
  text-align: center;
  text-overflow: ellipsis;

  /* subtitle/3 */
  
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 21px */

  margin-top: 12px;

  ${media.mobile}{
    font-size: 13px;
    margin-top: 6px;
  }
`;

export const ImageInputLimitedText = styled.span`
  color: var(--grey-5, #808996);
  text-align: center;

  /* caption/2 */
  
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 18px */

  ${media.mobile}{
    font-size: 10px;
  }
`;

export const ImageInputButton = styled.button`
  display: flex;
  width: 177px;
  padding: 12px;
  justify-content: center;
  align-items: center;

  margin-top: 24px;

  border-radius: 10px;
  border: 1px solid var(--main-line, #a5c6ff);
  background: var(--bg-3, #e9f1ff);

  overflow: hidden;
  color: var(--main-emphasis, #004edf);
  text-overflow: ellipsis;

  /* body/2 */
  
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 21px */

  cursor: pointer;
`;

export const ImageInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 40px;
  max-height: 100px;
  overflow-y: scroll;
  margin-top: 20px;

  scrollbar-width: thin;

  ${media.mobile}{
    min-height: 0px;
    margin-top: ${({ fileLength }: { fileLength: number }) => (fileLength > 0 ? '20px' : '0px')};
  }
`;

export const ImageInputList = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ImageInputListBlur = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;

  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #fff 100%);
  /* 이벤트 자체를 없애버리는  */
  pointer-events: none;
`;
