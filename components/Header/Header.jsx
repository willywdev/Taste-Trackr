import { FiSearch } from "react-icons/fi";
import { StyledButton } from "../StyledButton/Button.styled";
import { StyledLink } from "../StyledLink/Link.styled";
import StyledLinkButton from "../StyledLinkButton/LinkButton.styled";
import { StyledHeader, StyledHeadline, StyledNav } from "./Header.styled";

export default function Header({ handleSearchClicked, isSearchClicked }) {
  function toggleSearchBar(event) {
    event.preventDefault();
    handleSearchClicked();
  }

  function handleSearchInput(event) {
    console.log(event.target.value);
  }

  return (
    <StyledHeader>
      <StyledHeadline>
        <StyledLink href="/">Taste Trackr</StyledLink>
      </StyledHeadline>
      <StyledNav>
        {isSearchClicked && <input type="text" onChange={handleSearchInput} />}
        <StyledButton onClick={toggleSearchBar}>
          <FiSearch />
        </StyledButton>
        <StyledLinkButton href="/">Login</StyledLinkButton>
        <StyledLinkButton href="/">Sign up</StyledLinkButton>
      </StyledNav>
    </StyledHeader>
  );
}
