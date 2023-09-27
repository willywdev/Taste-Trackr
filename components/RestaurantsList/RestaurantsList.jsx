import { useRouter } from "next/router";
import styled from "styled-components";
import {
  StyledArticle,
  StyledArticleHeadline,
  StyledTextSection,
} from "../StyledArticle/Article.styled";

export default function RestaurantsList({ restaurantsData, handleDelete }) {
  const router = useRouter();

  function setColor(valueFromDB) {
    if (valueFromDB === "red") {
      return "🔴";
    }
    if (valueFromDB === "yellow") {
      return "🟡";
    }
    if (valueFromDB === "green") {
      return "🟢";
    }
  }

  return restaurantsData.map((restaurant) => (
    <StyledArticle key={restaurant._id}>
      <StyledArticleHeadline>
        <h3>{restaurant.restaurant}</h3>
        <FlexDiv>
          <ScaledPen>
            <button
              type="button"
              onClick={() => router.push(`/${restaurant._id}`)}>
              ✏️
            </button>
          </ScaledPen>

          <button type="button" onClick={() => handleDelete(restaurant._id)}>
            🗑️
          </button>
        </FlexDiv>
      </StyledArticleHeadline>

      <StyledTextSection>
        <BetweenDetails>
          <p>Rating: {setColor(restaurant.rating)}</p>
          <p>Date: {restaurant.date}</p>
        </BetweenDetails>
        <p>{restaurant.text}</p>
        {restaurant.city && <p>{restaurant.city}</p>}
      </StyledTextSection>
    </StyledArticle>
  ));
}

const BetweenDetails = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 1rem;
`;

const FlexDiv = styled.div`
  display: flex;
  margin-right: 1rem;
  gap: 0.5rem;
`;

const ScaledPen = styled.span`
  transform: scaleX(-1);
`;
