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

export const StyledInput = styled.input`
  border-radius: 10px;
  border: none;
  height: 1.3rem;
  width: 300px;

  &:focus {
    border: none;
    outline: 1px solid #52ffbd;
  }
`;

export const StyledTextarea = styled.textarea`
  border-radius: 10px;
  border: none;
  width: 300px;

  &:focus {
    border: none;
    outline: 1px solid #52ffbd;
  }
`;
