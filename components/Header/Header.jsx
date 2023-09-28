import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { AiOutlineGoogle } from "react-icons/ai";
import useSWR from "swr";
import { StyledLink } from "../StyledLink/Link.styled";
import StyledLinkButton from "../StyledLinkButton/LinkButton.styled";
import UserInfo from "../UserInfo/UserInfo";
import { StyledHeader, StyledHeadline, StyledNav } from "./Header.styled";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Header() {
  const { data, status } = useSession();
  const [userCreated, setUserCreated] = useState(false);

  const { data: user } = useSWR(
    data ? `/api/user?email=${data.user.email}` : null,
    fetcher
  );

  useEffect(() => {
    if (user && user?.length === 0 && !userCreated) {
      (async () => {
        const userData = {
          name: data?.user?.name,
          email: data?.user?.email,
          image: data?.user?.image,
        };
        await fetch("/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        // Set userCreated to true to prevent further attempts
        setUserCreated(true);
      })();
    }
  }, [user, data, userCreated]);

  return (
    <StyledHeader>
      <StyledHeadline>
        <StyledLink href="/">Taste Trackr</StyledLink>
      </StyledHeadline>

      {status === "authenticated" ? <UserInfo email={data.user.email} /> : ""}
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
