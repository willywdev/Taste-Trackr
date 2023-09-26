import styled from "styled-components";
import { StyledLink } from "../StyledLink/Link.styled";
import { StyledSection } from "../StyledSection/Section.styled";

export default function Landing() {
  return (
    <StyledSection>
      <h2>Welcome to Taste Trackr 👨🏻‍🍳</h2>
      <p>
        Track your personal ratings of the restaurants you visit or order often.
      </p>
      <StyledList>
        <li>✅ Nobody sees your ratings. They are just for you!</li>
        <li>
          ✅ Use the search to quickly find a restaurant you rated before.
        </li>
        <li>✅ Tried a restaurant again and found it better? Update it 👍🏻</li>
      </StyledList>
      <p>
        Crafted together with a lot 🐈 by{" "}
        <StyledLink href="https://github.com/willywdev" target="_blank">
          willywdev
        </StyledLink>
        .
      </p>
    </StyledSection>
  );
}

const StyledList = styled.ul`
  list-style-type: none;

  li {
    margin-bottom: 2px;
  }
`;
