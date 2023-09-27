import Searchbar from "@/components/Searchbar/Searchbar";
import {
  StyledArticle,
  StyledArticleHeadline,
  StyledTextSection,
} from "@/components/StyledArticle/Article.styled";
import StyledButton from "@/components/StyledLinkButton/LinkButton.styled";
import { StyledSection } from "@/components/StyledSection/Section.styled";
import { useSession } from "next-auth/react";
import styled from "styled-components";

export default function restaurantsPage({
  isLoading,
  error,
  restaurantsData,
  searchValue,
  handleSearchValue,
}) {
  const { data } = useSession();
  if (data) {
    console.log(data.user.email);
  }
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
  }
  if (!data) {
    return (
      <main>
        <StyledSection>
          <h2>You must be logged in, to create new Ratings</h2>
        </StyledSection>
      </main>
    );
  }
  if (isLoading) {
    return (
      <main>
        <StyledSection>
          <h2>Is loading ...</h2>
        </StyledSection>
      </main>
    );
  }
  if (error) {
    return (
      <main>
        <StyledSection>
          <h2>Something went wrong: {error.message}</h2>
        </StyledSection>
      </main>
    );
  }

  return (
    <>
      <main>
        <StyledSection>
          <StyledButton href="restaurants/create">
            Create new Rating
          </StyledButton>
          <BetweenDiv>
            <h2>Restaurants:</h2>
            <Searchbar
              handleSearchValue={handleSearchValue}
              searchValue={searchValue}
            />
          </BetweenDiv>
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
                      <button type="button">✏️</button>
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

const BetweenDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BetweenDetails = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 1rem;
`;
