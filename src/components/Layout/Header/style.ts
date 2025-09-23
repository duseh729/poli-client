import styled from "@emotion/styled";
import { media } from "@/constants/media";

export const Header = styled.header`
  display: none;

  ${media.mobile} {
    display: flex;
    align-items: center;
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