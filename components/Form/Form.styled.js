import styled from "styled-components";

export const StyledForm = styled.form`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;

  button {
    margin-top: 1rem;
  }
`;

export const StyledTextarea = styled.textarea`
  width: 300px;
  background-color: transparent;
  color: white;
  outline: 2px solid #52ffbd;
  border-radius: 10px;
  border: none;
  padding-left: 5px;

  &:focus {
    border: none;
    outline: 1px solid #52ffbd;
  }
`;
