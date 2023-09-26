import Link from "next/link";
import styled from "styled-components";

export const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  border-bottom: 1px solid #52ffbd;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const StyledHeadline = styled.h1`
  padding-left: 2rem;
  color: #52ffbd;
  user-select: none;
  font-size: 1.7rem;
`;

export const StyledNav = styled.nav`
  padding-right: 2rem;
  display: flex;
  gap: 1rem;
`;

export const StyledButton = styled(Link)`
  font-size: 1rem;
  color: #52ffbd;
  text-decoration: none;
  padding: 0.4rem 0.8rem 0.4rem 0.8rem;
  outline: 2px solid #52ffbd;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #52ffbd;
    color: #03071e;
  }
`;
