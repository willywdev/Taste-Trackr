import { StyledLink } from "../StyledLink/Link.styled";
import StyledLinkButton from "../StyledLinkButton/LinkButton.styled";
import { StyledHeader, StyledHeadline, StyledNav } from "./Header.styled";

export default function Header({ isLoggedIn }) {
  return (
    <StyledHeader>
      <StyledHeadline>
        <StyledLink href="/">Taste Trackr</StyledLink>
      </StyledHeadline>
      <StyledNav>
        <StyledLinkButton href="/restaurants">My Restaurants</StyledLinkButton>
        {isLoggedIn ? (
          <StyledLinkButton href="/">Logout</StyledLinkButton>
        ) : (
          <StyledLinkButton href="/">Login</StyledLinkButton>
        )}
      </StyledNav>
    </StyledHeader>
  );
}
