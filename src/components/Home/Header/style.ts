import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 0 60px;
`;

export const StyledLink = styled(Link)`
  color: #2e3034;
  font-family: "Wanted Sans";
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  margin: 0 20px;
  text-decoration: none;
  &:hover {
    color: #111827;
  }
`;

export const Header = css`
  width: 100%;
  margin-top: 30px;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;
