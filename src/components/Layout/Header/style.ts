import styled from "@emotion/styled";
import { media } from "@/constants/media";

export const Header = styled.header`
  display: none;

  ${media.mobile} {
    display: flex;
    align-items: center;
    gap: 16px;
    /* justify-content: flex-end; */
    padding: 0 16px;
    height: 56px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: white;
    z-index: 100;
  }
`;

export const HamburgerButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

export const Title = styled.div`
  overflow: hidden;
  color: var(--grey-8, #0f0f10);
  text-overflow: ellipsis;
  font-family: "Wanted Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 24px */
  white-space: nowrap;
`;
