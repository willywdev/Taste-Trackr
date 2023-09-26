import styled from "styled-components";

export const StyledHeader = styled.header`
  position: fixed;
  background-color: #03071e;
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
