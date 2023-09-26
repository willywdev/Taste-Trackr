import { FiSearch } from "react-icons/fi";
import StyledButton from "../StyledButton/Button.styled";
import { StyledLink } from "../StyledLink/Link.styled";
import { StyledHeader, StyledHeadline, StyledNav } from "./Header.styled";

export default function Header() {
  return (
    <StyledHeader>
      <StyledHeadline>
        <StyledLink href="/">Taste Trackr</StyledLink>
      </StyledHeadline>
      <StyledNav>
        <StyledButton href="/">
          <FiSearch />
        </StyledButton>
        <StyledButton href="/">Login</StyledButton>
        <StyledButton href="/">Sign up</StyledButton>
      </StyledNav>
    </StyledHeader>
  );
}
