import styled from "styled-components";
import {
  StyledArticle,
  StyledArticleHeadline,
  StyledTextSection,
} from "../StyledArticle/Article.styled";

export default function RestaurantsList({ restaurantsData }) {
  function handleEdit() {
    console.log("edit");
  }

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
          <button type="button" onClick={handleEdit}>
            ✏️
          </button>
          <button type="button">🗑️</button>
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

/* {filteredRestaurants
    ? filteredRestaurants.map((restaurant) => (
        <StyledArticle key={restaurant._id}>
          <StyledArticleHeadline>
            <h3>{restaurant.restaurant}</h3>
            <FlexDiv>
              <button type="button" onClick={handleEdit}>
                ✏️
              </button>
              <button type="button">🗑️</button>
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
      ))
    : restaurantsData.map((restaurant) => (
        <StyledArticle key={restaurant._id}>
          <StyledArticleHeadline>
            <h3>{restaurant.restaurant}</h3>
            <FlexDiv>
              <button type="button" onClick={handleEdit}>
                ✏️
              </button>
              <button type="button">🗑️</button>
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
      ))} */
