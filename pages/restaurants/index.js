import {
  StyledArticle,
  StyledArticleHeadline,
  StyledTextSection,
} from "@/components/StyledArticle/Article.styled";
import StyledButton from "@/components/StyledLinkButton/LinkButton.styled";
import { StyledSection } from "@/components/StyledSection/Section.styled";
import styled from "styled-components";

export default function restaurantsPage({
  isLoading,
  error,
  restaurantsData,
  searchValue,
}) {
  let filteredRestaurants;

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

  if (searchValue) {
    filteredRestaurants = restaurantsData.filter(
      (restaurant) =>
        restaurant.restaurant.toLowerCase().includes(searchValue) ||
        restaurant.city.toLowerCase().includes(searchValue) ||
        restaurant.rating.toLowerCase().includes(searchValue) ||
        restaurant.text.toLowerCase().includes(searchValue)
    );

    console.log(filteredRestaurants);
  }

  if (isLoading) {
    return <h2>Is loading ...</h2>;
  }
  if (error) {
    return <h2>Something went wrong: {error.message}</h2>;
  }

  return (
    <>
      <main>
        <StyledSection>
          <StyledButton href="restaurants/create">
            Create new Rating
          </StyledButton>

          <h2>Restaurants:</h2>
          {filteredRestaurants
            ? filteredRestaurants.map((restaurant) => (
                <StyledArticle key={restaurant._id}>
                  <StyledArticleHeadline>
                    <h3>{restaurant.restaurant}</h3>
                    <FlexDiv>
                      <button type="button">✏️</button>
                      <button type="button">🗑️</button>
                    </FlexDiv>
                  </StyledArticleHeadline>

                  <StyledTextSection>
                    <p>Rating: {setColor(restaurant.rating)}</p>
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
                      <button type="button">✏️</button>
                      <button type="button">🗑️</button>
                    </FlexDiv>
                  </StyledArticleHeadline>

                  <StyledTextSection>
                    <p>Rating: {setColor(restaurant.rating)}</p>
                    <p>{restaurant.text}</p>
                    {restaurant.city && <p>{restaurant.city}</p>}
                  </StyledTextSection>
                </StyledArticle>
              ))}
        </StyledSection>
      </main>
    </>
  );
}

const FlexDiv = styled.div`
  display: flex;
  gap: 7.777px;
  margin-right: 1rem;
`;
