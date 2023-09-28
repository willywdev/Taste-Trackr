import styled from "styled-components";

export const StyledInput = styled.input`
  background-color: transparent;
  color: white;
  outline: 2px solid #52ffbd;
  border-radius: 10px;
  border: none;
  padding-left: 5px;

  @media (max-width: 768px) {
    outline: 1px solid #52ffbd;
    width: 4rem;
  }
`;
