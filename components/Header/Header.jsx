import { signIn, signOut, useSession } from "next-auth/react";
import { AiOutlineGoogle } from "react-icons/ai";
import { StyledLink } from "../StyledLink/Link.styled";
import StyledLinkButton from "../StyledLinkButton/LinkButton.styled";
import UserInfo from "../UserInfo/UserInfo";
import { StyledHeader, StyledHeadline, StyledNav } from "./Header.styled";

export default function Header() {
  const { data, status } = useSession();

  return (
    <StyledHeader>
      <StyledHeadline>
        <StyledLink href="/">Taste Trackr</StyledLink>
      </StyledHeadline>

      {status === "authenticated" ? (
        <UserInfo image={data.user.image} name={data.user.name} />
      ) : (
        ""
      )}
      <StyledNav>
        {status === "authenticated" ? (
          <>
            <StyledLinkButton href="/restaurants">
              My Restaurants
            </StyledLinkButton>
            <StyledLinkButton
              href="/"
              onClick={async () => {
                await signOut("google");
              }}>
              Logout
            </StyledLinkButton>
          </>
        ) : (
          <StyledLinkButton href="/" onClick={() => signIn("google")}>
            <AiOutlineGoogle />
            Login with Google
          </StyledLinkButton>
        )}
      </StyledNav>
    </StyledHeader>
  );
}
