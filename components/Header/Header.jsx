import { FiSearch } from "react-icons/fi";
import { StyledLink } from "../StyledLink/Link.styled";
import StyledButton from "../StyledLinkButton/LinkButton.styled";
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
