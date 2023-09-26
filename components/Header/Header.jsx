import { FiSearch } from "react-icons/fi";
import { StyledButton } from "../StyledButton/Button.styled";
import { StyledLink } from "../StyledLink/Link.styled";
import StyledLinkButton from "../StyledLinkButton/LinkButton.styled";
import {
  StyledHeader,
  StyledHeadline,
  StyledNav,
  StyledSearchbar,
} from "./Header.styled";

export default function Header({
  handleSearchClicked,
  isSearchClicked,
  handleSearchValue,
}) {
  function toggleSearchBar(event) {
    event.preventDefault();
    handleSearchClicked();
  }

  function handleSearchInput(event) {
    const searchValue = event.target.value.toLowerCase();
    handleSearchValue(searchValue);
  }

  return (
    <StyledHeader>
      <StyledHeadline>
        <StyledLink href="/">Taste Trackr</StyledLink>
      </StyledHeadline>
      <StyledNav>
        {isSearchClicked && (
          <StyledSearchbar type="text" onChange={handleSearchInput} />
        )}
        <StyledButton onClick={toggleSearchBar}>
          <FiSearch />
        </StyledButton>
        <StyledLinkButton href="/">Login</StyledLinkButton>
        <StyledLinkButton href="/">Sign up</StyledLinkButton>
      </StyledNav>
    </StyledHeader>
  );
}
