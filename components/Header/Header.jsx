import { FiSearch } from "react-icons/fi";
import {
  StyledButton,
  StyledHeader,
  StyledHeadline,
  StyledNav,
} from "./Header.styled";

export default function Header() {
  return (
    <StyledHeader>
      <StyledHeadline>Taste Trackr</StyledHeadline>
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
