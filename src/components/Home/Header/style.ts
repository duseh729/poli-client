import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import { media } from "@/constants/media";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 21px 60px 20px 60px;

  ${media.mobile}{
    padding: 20px 16px;
    height: 56px;
  }
`;

export const StyledLink = styled(Link)`
  color: #2e3034;
  
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  padding: 0px 16px;
  text-decoration: none;
  &:hover {
    color: #111827;
  }
`;

export const Header = css`
  width: 100%;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;
