import Searchbar from "@/components/Searchbar/Searchbar";
import {
  StyledArticle,
  StyledArticleHeadline,
  StyledTextSection,
} from "@/components/StyledArticle/Article.styled";
import StyledButton from "@/components/StyledLinkButton/LinkButton.styled";
import { StyledSection } from "@/components/StyledSection/Section.styled";
import { useSession } from "next-auth/react";
import { ClimbingBoxLoader } from "react-spinners";
import styled from "styled-components";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function restaurantsPage({ searchValue, handleSearchValue }) {
  const { data, status } = useSession();
  const email = data?.user?.email;
  console.log(email);
  const {
    data: restaurantsData,
    isLoading,
    error,
  } = useSWR(
    email ? `/api/restaurants?email=${data.user.email}` : null,
    fetcher
  );
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

  function handleEdit() {
    console.log("edit");
  }

  if (!data && status !== "authenticated") {
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
          <StyledLoading>
            <h2>Is loading ...</h2>
            <ClimbingBoxLoader color="#52ffbd" />
          </StyledLoading>
        </StyledSection>
      </main>
    );
  }
  if (error) {
    return (
      <main>
        <StyledSection>
          <StyledLoading>
            <h2>Something went wrong 🤕</h2>
          </StyledLoading>
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
              ))}
        </StyledSection>
      </main>
    </>
  );
}

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

const FlexDiv = styled.div`
  display: flex;
  margin-right: 1rem;
  gap: 0.5rem;
`;

const StyledLoading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
