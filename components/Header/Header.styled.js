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
  z-index: 10;
`;
export const StyledHeadline = styled.h1`
  padding-left: 2rem;
  color: #52ffbd;
  user-select: none;
  font-size: 1.7rem;

  @media (max-width: 768px) {
    padding-left: 0.5rem;
    font-size: 1.2rem;
  }
`;

export const StyledNav = styled.nav`
  padding-right: 2rem;
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    padding-right: 0.7rem;
    gap: 0.6rem;
  }
`;
