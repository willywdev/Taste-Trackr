import Link from "next/link";
import styled from "styled-components";

const StyledButton = styled(Link)`
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

export default StyledButton;
