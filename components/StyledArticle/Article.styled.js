import styled from "styled-components";

export const StyledArticle = styled.article`
  outline: 1px solid #52ffbd;
  margin-bottom: 1rem;
  border-radius: 10px;
  padding-bottom: 1px;
`;

export const StyledArticleHeadline = styled.div`
  background-color: #52ffbd;
  color: #03071e;
  width: calc(100% - 1rem);
  border-radius: 10px 10px 0 0;
  padding-left: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    background: none;
    border: none;
    padding: 5px;
    border-radius: 8px;
    font-size: 1.1rem;
    cursor: pointer;
    transform: scaleX(-1);

    &:hover {
      background-color: #03071e;
    }
  }
`;

export const StyledTextSection = styled.div`
  padding-left: 1rem;
  margin-top: -0.5rem;
`;
