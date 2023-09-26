import Link from "next/link";
import styled from "styled-components";

export const StyledLink = styled(Link)`
  all: unset;
  cursor: pointer;
  color: #52ffbd;

  &:hover {
    color: white;
  }
`;
